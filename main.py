"""
Hackathon Scraper — Devfolio + Devpost  (v5 — both use Playwright)
===================================================================
Devpost blocked the JSON API, so both sites now use browser scrolling.
Two browser windows open one after the other.

Install once:
  pip install playwright
  python -m playwright install chromium
"""

import asyncio, json, csv
from pathlib import Path
from datetime import datetime
from playwright.async_api import async_playwright, TimeoutError as PWTimeout

OUTPUT_DIR     = Path(__file__).parent
SCROLL_WAIT_MS = 3000
MAX_STALE      = 8
CHECKPOINT_N   = 100

FIELDS = ["source","name","url","dates","location","status",
          "prize","participants","themes","image","raw"]

def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}", flush=True)

def save(records, csv_path, json_path, label=""):
    with open(csv_path, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS, extrasaction="ignore")
        w.writeheader()
        w.writerows(records)
    json_path.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    log(f"  💾  {len(records)} records saved {label}")


# ══════════════════════════════════════════════════════════════════════════════
#  Generic scroll-scraper  (reused for both sites)
# ══════════════════════════════════════════════════════════════════════════════

async def scroll_and_extract(config: dict, csv_path, json_path, existing: list) -> list:
    """
    config keys:
      name          – display name e.g. "Devpost"
      url           – page to open
      card_selectors– list of CSS selectors to count cards
      extract_js    – JS string returning list of dicts
      fallback_js   – JS string returning list of URLs (backup)
      url_filter    – substring that must appear in harvested URLs
      source_tag    – value for the "source" column
    """
    seen_urls   = {r["url"] for r in existing}
    all_records = list(existing)
    last_chk    = len(all_records)
    source      = config["source_tag"]

    log("=" * 60)
    log(f"{config['name']}  — Playwright scroll scraper")
    log("=" * 60)

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=False, slow_mo=40,
            args=["--no-sandbox","--disable-dev-shm-usage",
                  "--disable-blink-features=AutomationControlled"],
        )
        ctx = await browser.new_context(
            viewport={"width":1440,"height":900},
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            ),
            locale="en-US",
        )
        page = await ctx.new_page()
        await page.add_init_script(
            "Object.defineProperty(navigator,'webdriver',{get:()=>undefined});"
        )

        log(f"Navigating to {config['url']} ...")
        try:
            await page.goto(config["url"], wait_until="domcontentloaded", timeout=90_000)
        except PWTimeout:
            log("  Timeout — continuing anyway")
        await page.wait_for_timeout(5000)

        # ── Wait for first cards ──────────────────────────────────────────────
        log("Waiting for cards (up to 90 s)...")
        for _ in range(30):
            for sel in config["card_selectors"]:
                try:
                    n = await page.locator(sel).count()
                    if n > 0:
                        log(f"  First cards: {n}  (selector: {sel})")
                        goto_scroll = True
                        break
                except: pass
            else:
                await page.wait_for_timeout(3000)
                continue
            break
        else:
            log("  No cards found — saving debug page")
            debug = OUTPUT_DIR / f"debug_{source}.html"
            debug.write_text(await page.content(), encoding="utf-8")
            log(f"  Saved {debug}")
            await browser.close()
            return all_records

        # Dismiss overlays
        for sel in ["button:has-text('Accept')","button:has-text('Got it')",
                    "button:has-text('OK')", "[aria-label='Close']",
                    "[class*='cookie'] button","[class*='Cookie'] button"]:
            try:
                b = page.locator(sel).first
                if await b.is_visible(timeout=400): await b.click()
            except: pass

        # ── Scroll loop ───────────────────────────────────────────────────────
        async def count_cards():
            for sel in config["card_selectors"]:
                try:
                    n = await page.locator(sel).count()
                    if n > 0: return n
                except: pass
            return 0

        async def do_extract():
            try:
                return await page.evaluate(config["extract_js"])
            except Exception as e:
                log(f"  JS error: {e} — URL fallback")
                try:
                    urls = await page.evaluate(config["fallback_js"])
                    filt = config.get("url_filter","")
                    return [{"source":source,"name":u.rstrip("/").split("/")[-1],
                             "url":u,"dates":"","location":"","status":"","prize":"",
                             "participants":"","themes":"","image":"","raw":""}
                            for u in urls if filt in u]
                except: return []

        stale, prev, peak, rnd = 0, 0, 0, 0
        try:
            while stale < MAX_STALE:
                rnd += 1
                cur = await count_cards()

                if peak > 50 and cur < peak * 0.5:
                    log(f"  ⚠️  Page reset ({peak}→{cur}). Extracting & stopping.")
                    break
                peak = max(peak, cur)

                if cur > prev:
                    log(f"  Round {rnd:3d} | {cur} cards (+{cur-prev})")
                    stale = 0; prev = cur
                else:
                    stale += 1
                    log(f"  Round {rnd:3d} | {cur} cards (stale {stale}/{MAX_STALE})")

                if cur - last_chk >= CHECKPOINT_N or stale >= MAX_STALE - 1:
                    batch = await do_extract()
                    added = 0
                    for rec in batch:
                        u = rec.get("url","")
                        if u and u not in seen_urls:
                            seen_urls.add(u)
                            all_records.append(rec)
                            added += 1
                    if added:
                        last_chk = cur
                        save(all_records, csv_path, json_path, f"(+{added} from {source})")

                await page.evaluate("""
                    window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
                    document.querySelectorAll('main,[role=main],[class*=scroll],[class*=Scroll],[class*=container],[class*=Container]')
                        .forEach(el=>{ if(el.scrollHeight>el.clientHeight) el.scrollTo({top:el.scrollHeight,behavior:'smooth'}); });
                """)
                await page.wait_for_timeout(SCROLL_WAIT_MS)

        except Exception as e:
            log(f"  Scroll error: {e}")

        # Final extract
        batch = await do_extract()
        for rec in batch:
            u = rec.get("url","")
            if u and u not in seen_urls:
                seen_urls.add(u)
                all_records.append(rec)

        await browser.close()

    added_total = len(all_records) - len(existing)
    log(f"{config['name']} done: {added_total} new hackathons")
    return all_records


# ══════════════════════════════════════════════════════════════════════════════
#  Site configs
# ══════════════════════════════════════════════════════════════════════════════

DEVPOST_CONFIG = {
    "name": "Devpost",
    "source_tag": "devpost",
    "url": "https://devpost.com/hackathons",
    "url_filter": "devpost.com",
    "card_selectors": [
        "article.hackathon-tile",
        "article[class*='hackathon']",
        "div[class*='hackathon-tile']",
        "li[class*='hackathon']",
        "a[href*='devpost.com/'][class*='tile']",
        ".container-hackathons article",
        "article",
    ],
    "extract_js": """
    () => {
        function txt(el){ return el ? (el.innerText||'').trim() : ''; }

        // Devpost renders <article class="hackathon-tile ...">
        let cards = [...document.querySelectorAll('article.hackathon-tile, article[class*="hackathon"], div[class*="hackathon-tile"]')];
        if (!cards.length) cards = [...document.querySelectorAll('article')];

        const results = [];
        const seen    = new Set();

        for (const card of cards) {
            try {
                const anchor = card.querySelector('a[href*="devpost.com"]') || card.closest('a');
                let url = anchor ? anchor.href : '';
                if (!url || seen.has(url)) continue;
                seen.add(url);

                const nameEl = card.querySelector('h1,h2,h3,h4,[class*="title"],[class*="name"]');
                const name   = txt(nameEl) || url.split('/').pop();

                const dateEl = card.querySelector('time,[class*="date"],[class*="deadline"],[class*="period"]');
                const dates  = txt(dateEl);

                const locEl  = card.querySelector('[class*="location"],[class*="hosted"],[class*="city"]');
                const location = txt(locEl);

                const statusEl = card.querySelector('[class*="status"],[class*="open"],[class*="label"],[class*="badge"]');
                const status   = txt(statusEl);

                const prizeEl = card.querySelector('[class*="prize"],[class*="award"],[class*="total"]');
                const prize   = txt(prizeEl);

                const partEl = card.querySelector('[class*="participant"],[class*="registrant"],[class*="member"]');
                const participants = txt(partEl);

                const themeEls = [...card.querySelectorAll('[class*="theme"],[class*="tag"],[class*="category"]')];
                const themes   = themeEls.map(e=>(e.innerText||'').trim()).filter(Boolean).join(', ');

                const imgEl = card.querySelector('img');
                const image = imgEl ? (imgEl.dataset.src || imgEl.src || '') : '';

                const raw = (card.innerText||'').replace(/\\s+/g,' ').trim().slice(0,400);

                results.push({source:'devpost',name,url,dates,location,status,prize,participants,themes,image,raw});
            } catch(e) {}
        }
        return results;
    }
    """,
    "fallback_js": """
    () => [...new Set(
        [...document.querySelectorAll('a[href]')]
            .map(a=>a.href)
            .filter(u=> u.includes('devpost.com') && !u.includes('info.devpost') && u !== 'https://devpost.com/hackathons' && u.split('/').length > 4)
    )]
    """,
}

DEVFOLIO_CONFIG = {
    "name": "Devfolio",
    "source_tag": "devfolio",
    "url": "https://devfolio.co/search?primary_filter=hackathons",
    "url_filter": "devfolio.co",
    "card_selectors": [
        "a[href*='/hackathons/']",
        "div[class*='HackathonCard']",
        "div[class*='hackathon-card']",
        "div[class*='SearchCard']",
        "div[class*='search-card']",
    ],
    "extract_js": """
    () => {
        function txt(el){ return el ? (el.innerText||'').trim() : ''; }

        const sels = [
            'a[href*="/hackathons/"]',
            'div[class*="HackathonCard"]',
            'div[class*="hackathon-card"]',
            'div[class*="SearchCard"]',
            'div[class*="search-card"]',
        ];
        let cards = [];
        for (const s of sels) {
            const found = [...document.querySelectorAll(s)];
            if (found.length > cards.length) cards = found;
        }

        const results = [];
        const seen    = new Set();

        for (const card of cards) {
            try {
                const anchor = card.matches('a[href]') ? card : card.querySelector('a[href]');
                let url = anchor ? anchor.href : '';
                if (!url || !url.includes('devfolio.co') || seen.has(url)) continue;
                seen.add(url);

                const nameEl   = card.querySelector('h1,h2,h3,h4,strong,[class*="title"],[class*="name"],[class*="Title"],[class*="Name"]');
                const name     = txt(nameEl) || url.replace(/\\/+$/,'').split('/').pop();
                const dateEl   = card.querySelector('time,[class*="date"],[class*="Date"]');
                const dates    = txt(dateEl);
                const locEl    = card.querySelector('[class*="location"],[class*="Location"],[class*="city"],[class*="City"]');
                const location = txt(locEl);
                const statEl   = card.querySelector('[class*="badge"],[class*="Badge"],[class*="status"],[class*="Status"],[class*="tag"],[class*="Tag"]');
                const status   = txt(statEl);
                const prizeEl  = card.querySelector('[class*="prize"],[class*="Prize"]');
                const prize    = txt(prizeEl);
                const imgEl    = card.querySelector('img');
                const image    = imgEl ? (imgEl.dataset.src||imgEl.src||'') : '';
                const raw      = (card.innerText||'').replace(/\\s+/g,' ').trim().slice(0,400);

                results.push({source:'devfolio',name,url,dates,location,status,prize,
                              participants:'',themes:'',image,raw});
            } catch(e) {}
        }
        return results;
    }
    """,
    "fallback_js": """
    () => [...new Set(
        [...document.querySelectorAll('a[href*="/hackathons/"]')]
            .map(a=>a.href)
            .filter(u=>u.includes('devfolio.co'))
    )]
    """,
}


# ══════════════════════════════════════════════════════════════════════════════
#  MAIN
# ══════════════════════════════════════════════════════════════════════════════

async def main():
    ts        = datetime.now().strftime("%Y%m%d_%H%M%S")
    csv_path  = OUTPUT_DIR / f"hackathons_{ts}.csv"
    json_path = OUTPUT_DIR / f"hackathons_{ts}.json"

    log("╔══════════════════════════════════════════╗")
    log("║  Hackathon Scraper — Devpost + Devfolio  ║")
    log("╚══════════════════════════════════════════╝")
    log(f"Output: {csv_path.name}")
    log("")

    # ── Devpost first ─────────────────────────────────────────────────────────
    records = []
    try:
        records = await scroll_and_extract(DEVPOST_CONFIG, csv_path, json_path, records)
    except Exception as e:
        log(f"Devpost error: {e}")

    # ── Devfolio second ───────────────────────────────────────────────────────
    try:
        records = await scroll_and_extract(DEVFOLIO_CONFIG, csv_path, json_path, records)
    except Exception as e:
        log(f"Devfolio error: {e}")

    # ── Final save ────────────────────────────────────────────────────────────
    save(records, csv_path, json_path, "(FINAL)")

    dp  = sum(1 for r in records if r["source"]=="devpost")
    df  = sum(1 for r in records if r["source"]=="devfolio")

    log("")
    log("╔══════════════════════════════════════════╗")
    log(f"║  ✅  DONE! {len(records)} total hackathons")
    log(f"║     Devpost  : {dp}")
    log(f"║     Devfolio : {df}")
    log(f"║  CSV  → {csv_path.name}")
    log(f"║  JSON → {json_path.name}")
    log("╚══════════════════════════════════════════╝")

if __name__ == "__main__":
    asyncio.run(main())