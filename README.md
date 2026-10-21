# Movement Church — website

Plain HTML, CSS and JavaScript. No PHP, no WordPress, no React, no build step,
no npm. Open `index.html` in a browser and it works.

```
movement-site/
├─ index.html          the home page — all the wording lives here
├─ about.html          mission, values, history, beliefs and staff
├─ give.html           ways to give, impact, financial statements, giving FAQ
├─ visit.html          times, directions, interactive building map
├─ care.html, teams.html, groups.html, job-opportunities.html
├─ kids.html, club56.html, youth.html, baptism.html   ministry pages
├─ media/              video: the youth page loop and baptism clips
├─ css/
│  └─ style.css        every style. Colours are at the very top.
├─ js/
│  ├─ content.js       ← the photos, captions, ministries and planner
│  └─ site.js          the behaviour (you rarely need to touch this)
└─ img/                85 images (staff headshots in img/staff/)
```

## Looking at it

Double-click `index.html`. That's genuinely it.

One caveat: some browsers block local files from loading each other. If
anything looks unstyled, run a tiny local server instead:

```bash
cd ~/Documents/movement-site && python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Where to change things

| You want to change… | Open this | Look for |
|---|---|---|
| Any wording on the page | `index.html` | the section comments in CAPITALS |
| Service times, address, phone | `index.html` | the hero and footer sections (the footer is repeated in `about.html`) |
| About page: values, beliefs, staff | `about.html` | the section comments in CAPITALS |
| Give page: giving links, impact, FAQ | `give.html` | the section comments in CAPITALS (the Tithe.ly link appears 3 times) |
| Financial statements PDF | `give.html` | the ACCOUNTABILITY section |
| Building map rooms (names, photos, routes) | `js/visit.js` | `PLACES` at the top |
| Ministry pages (care, teams, kids, youth…) | the page's own `.html` file | the section comments in CAPITALS |
| The nav or footer | **every** `.html` file | the NAV and FOOTER comments (they're copied on each page) |
| Photos in the big word | `index.html` | the five `<span class="word-layer">` lines |
| Photos in the sliding rail | `js/content.js` | `photos:` |
| Ministry tiles | `js/content.js` | `ministries:` |
| Planner buttons and answers | `js/content.js` | `plans:` |
| Arrival / finish times | `js/content.js` | `services:` |
| Colours | `css/style.css` | the `:root` block at the top |

### Changing a colour

Everything is driven by the variables at the top of `style.css`:

```css
:root{
  --paper:#f6f7f5;   /* page background */
  --ink:#12161a;     /* main text       */
  --teal:#0d8b84;    /* the green accent */
  --hot:#ff5a3c;     /* the orange accent */
}
```

Change `--hot` once and every orange button on the site changes.

### Adding a photo to the rail

1. Put the image in `img/` — say `img/easter.webp`.
2. Open `js/content.js` and add a line inside `photos:`:

```js
{ file: "img/easter.webp", caption: "Easter morning" },
```

Keep the comma. That's the whole job.

## If the page goes blank

You almost certainly lost a quote mark or a comma in `js/content.js`.
Right-click the page → **Inspect** → **Console**, and the error names the
exact line.

## Putting it online

Upload the whole folder to any web host. It's static files, so anything works
— Netlify, Cloudflare Pages, GitHub Pages, or plain FTP to shared hosting.
There's no database and nothing to configure.

## Still to sort out

- The **Groups, Care, Club 56 and Youth** tiles use Sunday-morning photos,
  because Sunday A.M. was the only folder of photos available. They aren't
  photos of those ministries.
- The **planner timings** — service length, which door each group uses, the
  Club 56 grade split — were written as plausible placeholders, not confirmed
  facts. Worth checking before this goes live.
- The address reads **65 Lansdowne Ave** (from the Visit page). The MOVE Conf
  popup on the current site says 85.

**Seeing an old version?** Every page links its CSS and JS with `?v=14`. After changing any of them, raise that number on all pages (search and replace `?v=14`) so browsers fetch the new files. To preview locally without caching, run `python3 serve.py` and open http://localhost:8000 (or use VS Code's Live Server).


### Adding photos (keep the site fast)
Photos are stored as **WebP** (much smaller than JPG). To add one:
```
cwebp -q 78 -resize 1600 0 my-photo.jpg -o img/my-photo.webp
```
(or export WebP from Lightroom/Photoshop at ~1600px wide, quality ~78) and reference `img/my-photo.webp`.
Keep a JPG only if it's used as a page's social-share image (`og:image`).

## Search engines, analytics & legal

| What | Where | Notes |
|---|---|---|
| **Google Analytics ID** | `js/consent.js` | Replace `G-XXXXXXXXXX` on the line marked SET YOUR ID. Until then nothing is sent to Google and no cookie banner shows. |
| Cookie banner | `js/consent.js` | Analytics only loads after a visitor clicks Accept. "Cookie settings" in every footer reopens it. |
| Privacy policy | `privacy.html` | Plain-language, written for PIPEDA. **Have leadership (ideally a lawyer) review it before launch** and update the date at the top when it changes. |
| Sitemap | `sitemap.xml` | Lists every page. Add a `<url>` line when you add a page. Submit it in Google Search Console. |
| Robots | `robots.txt` | Allows everything and points to the sitemap. |
| 404 page | `404.html` | Most hosts (Netlify, GitHub Pages, Cloudflare Pages) use it automatically. On Apache add `ErrorDocument 404 /404.html` to `.htaccess`. |
| Church details for Google | `index.html` | The `application/ld+json` block near the top (address, phone, socials). |
| Breadcrumbs | each page | The visible trail is just under the nav; a matching `BreadcrumbList` block is in the page's `<head>`. |

All page addresses (canonical links, sitemap, structured data) assume the site lives at
**https://www.wearemovement.ca/**. If it moves, search all files for that address and replace it.

### Adding a new page – checklist
1. Copy an existing page and change the `<title>`, `<meta name="description">`, `og:` tags and `rel="canonical"`.
2. Update the breadcrumb (visible trail and the `BreadcrumbList` block).
3. Give every meaningful image real `alt` text (`alt=""` only for decoration).
4. Add it to the nav/footer on **every** page if it should be linked there, and to `sitemap.xml`.
