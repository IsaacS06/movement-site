# Compliance, Accessibility & Trust Audit — Movement Church website

**Scope:** every file in this repository (17 HTML pages, `css/style.css`, 13 scripts in `js/`, 93 images in `img/`, 10 videos in `media/`, `docs/`, `robots.txt`, `sitemap.xml`).
**Audited:** October 20, 2026 · **Standard used:** WCAG 2.1 AA, PIPEDA principles, CASL, CRA receipting guidance, AODA.
**Phase 1 only — nothing in the site has been changed.** Proposed fixes are listed for approval.

Legend: ✅ pass · ⚠️ partial · ❌ missing / failing

> **How this site is built (affects several items):** it's a static site. It has **no forms of its own** — every form (Plan a Visit, prayer, care, teams, baptism, youth, events, groups) opens on **Planning Center Church Center**, and online giving opens on **Tithe.ly**. Those pages can't be audited from this repository; items 5, 12 and 13 note what to check there.

---

## Summary

| # | Item | Status |
|---|------|--------|
| 1 | Colour contrast | ❌ |
| 2 | Alt text | ✅ |
| 3 | General accessibility | ⚠️ |
| 4 | Button & link labels | ⚠️ |
| 5 | Keyboard-friendly forms & widgets | ⚠️ |
| 6 | Privacy policy | ⚠️ |
| 7 | Terms of use | ❌ |
| 8 | Cookies policy | ⚠️ |
| 9 | Cookie consent | ⚠️ |
| 10 | Tracking scripts | ✅ |
| 11 | Third-party embeds | ⚠️ |
| 12 | Form consent / CASL | ⚠️ |
| 13 | Data minimisation | ⚠️ (external) |
| 14 | Image copyright & children | ⚠️ |
| 15 | Song lyrics & music | ⚠️ |
| 16 | Testimonials | ✅ |
| 17 | Unsupported claims | ⚠️ |
| 18 | Organisation details | ❌ |
| 19 | Local laws | ⚠️ |
| 20 | Leftover template content | ⚠️ |

No online store or paid ticketing exists on this site. **Event registrations open on Church Center — if any events charge a fee, you may want a refund/cancellation note on those event pages** (your decision).

---

## 1. Colour contrast — ❌

Measured with the WCAG relative-luminance formula against the actual CSS values in `css/style.css` (`:root`, lines 9–21).

| Status | Pair | Ratio | Needs | Where (file:line) | Proposed fix |
|---|---|---|---|---|---|
| ❌ | Muted grey text `--ink3 #8a9298` on `--paper` | **2.94:1** | 4.5 | `css/style.css` 84, 120, 133, 180, 222, 248, 320, 324 (footer copyright & legal links), 588 (staff roles), 663, 807, 809, 904, 1169, 1194 (breadcrumbs), 1242 | Darken `--ink3` to `#646d73` (4.91:1 on paper, 4.52:1 on paper2 — verified) |
| ❌ | `--ink3` on `--paper2 #eceee9` | **2.70:1** | 4.5 | same rules inside grey sections | as above |
| ❌ | Teal small text `--teal #0d8b84` on paper (section kicks, links, `.way-link`, `.inline-link`, `.impact-n`, verse cites…) | **3.87:1** | 4.5 | 28 rules use `color:var(--teal)` | Add `--teal-text:#0a706a` (5.52:1 on paper, 5.08:1 on paper2, 4.90:1 on teal-soft — verified) for text; keep `#0d8b84` for large headings/fills |
| ❌ | Teal small text on paper2 | **3.56:1** | 4.5 | same, grey sections | as above |
| ❌ | Teal cite on `--teal-soft` (verse cites, job checklist) | **3.44:1** | 4.5 | `.verse cite`, `.vcard cite` | use `--teal-text` |
| ❌ | **Orange headline words** `.hot #ff5a3c` on paper (large text) | **2.88:1** | 3.0 | every page's `<h1>/<h2>` with `class="hot"` | Darken text use to `#e2401f` (3.92:1, passes large text) or `#d23a1b` (4.48:1); keep `#ff5a3c` for decorative fills |
| ❌ | White text on orange buttons/badges (`.pill--hot`, `.badge`, `.way--feature`, `.res-alert`, `.jbtn--next`, selected map stop) | **3.10:1** | 4.5 (14px bold isn't "large") | `css/style.css` 57, 240, 380, 470, 506, 648, 696, 889, 1160 | Use a deeper orange for filled buttons: `#d93d1f` with white 4.53:1 (verified) |
| ❌ | White on teal (pill hover, teal value cards, "Copied" state) | **4.16:1** | 4.5 | `.pill:hover`, `.copy.is-copied`, `.value--teal` | Hover/fill teal `#0a706a` (white on it 5.93:1) |
| ❌ | Youth search placeholder (40% white) on card | **3.53:1** | 4.5 | `css/style.css` 1128 | raise to 60% white |
| ⚠️ | UI component borders `--line #d7dbd5` on paper (planner option buttons, place buttons, FAQ circles, cards) | ≈1.3:1 | 3.0 (1.4.11) | `.opt` 224–226, `.place-btn`, `.jump a`, `.copy` | Option/place buttons: border `#858d93` (≈3.1:1). Decorative card borders are exempt. |
| ✅ | Body text ink on paper | 16.9:1 | | | |
| ✅ | Secondary text `--ink2` on paper / paper2 | 6.3 / 5.8:1 | | | |
| ✅ | Dark sections, youth page text, mint/lime kicks, toasts, map labels, kids/youth tags | 5.2–17.5:1 | | | |
| ✅ | Focus outline (teal) on light / dark / youth backgrounds | 3.9 / 4.4 / 4.7:1 | 3.0 | `:focus-visible` line 36 | |
| ✅ | Text over photos/video (bands, tiles, rail captions, value cards, hero overlays) | dark gradients ≥ .88 behind all text | | | spot-check after any photo swap |

---

## 2. Alt text — ✅

| Status | Finding | Where | Note / fix |
|---|---|---|---|
| ✅ | No `<img>` is missing an `alt` attribute (all 17 pages scanned) | — | |
| ✅ | No filename-style alt text (`IMG_…`, `.jpg`) | — | |
| ✅ | Meaningful images described (staff names, Next Steps photos, impact, teams, groups, kids, place photos) | `about.html` 405–413 etc.; JS-built tiles `js/site.js` 274, map cards `js/visit.js` | |
| ✅ | Decorative images use `alt=""` (nav logo beside its text, background bands, hero collages inside `aria-hidden`, youth collages) | e.g. `care.html` 172, `give.html` 123 | logo link has `aria-label="Movement Church home"` |
| ⚠️ | Video posters/loops: about & give talking videos have `aria-label`s; looping decorative clips are `aria-hidden` | `about.html` 173, `give.html` 168 | fine; see item 3 for captions |

---

## 3. General accessibility — ⚠️

| Status | Check | Where | What's wrong | Proposed fix |
|---|---|---|---|---|
| ✅ | `lang` attribute | all pages `<html lang="en">` | — | optional: `en-CA` |
| ✅ | One `<h1>` per page | all 17 | — | |
| ⚠️ | Logical heading order | `404.html` 121, `care.html` 151, `club56.html` 155, `groups.html` 153 | jumps h1 → h3 (cards with no h2 above) | add a visually-hidden or visible `<h2>` for those card groups |
| ✅ | Landmarks | all pages: `header`, `nav`, `main`, `footer`, breadcrumb `nav` | — | |
| ✅ | Visible focus styles | `css/style.css` 36 | — | |
| ✅ | Skip-to-content link | all pages | — | |
| ❌ | **Captions/transcripts for videos with speech** | `index.html` 299 & `visit.html` 252 (`sunday-film.mp4`, 3:31), `baptism.html` 176 (`baptism-film.mp4`, 3:11) | no `<track kind="captions">` and no transcript | add `.vtt` captions (or a transcript link); I can create files once you supply/approve the text |
| ⚠️ | Talking videos with burned-in (open) captions | `about.html` 173, `give.html` 168 | open captions are acceptable; no text transcript | optional transcript |
| ✅ | No autoplaying media **with sound** | all videos start `muted` | — | |
| ⚠️ | Moving content > 5 s needs pause | youth hero video `youth.html` 138 has no pause control (by request); scrolling marquees (`.ticker`, `.y-marquee`) have no pause | WCAG 2.2.2 | add a small pause control for marquees + youth video, **or** accept risk (they stop entirely with "reduce motion") |
| ✅ | Reduced-motion respected (intro, scroll effects, videos, marquees) | `js/scroll.js`, `js/media.js`, CSS media query | — | |

---

## 4. Button & link labels — ⚠️

| Status | Finding | Where | Proposed fix |
|---|---|---|---|
| ⚠️ | Standalone **"Learn more"** button (no context for screen-reader link lists) | `youth.html` 286 → `give.html` | "Learn more about giving" (or `aria-label`) |
| ⚠️ | Repeated **"See it on the map"** ×4 with identical text, different targets | `kids.html` (age cards) | add `aria-label="See the Nursery on the map"` etc. |
| ✅ | Kids "Learn more" resource links contain the resource title inside the link | `kids.html` resources | — |
| ✅ | Icon-only buttons labelled: social icons, menu toggle, lightbox prev/next/close, toast dismiss, video pause/play, map | all pages, `js/*.js` | — |
| ✅ | No "click here" anywhere | — | — |

---

## 5. Keyboard-friendly forms & widgets — ⚠️

| Status | Finding | Where | Proposed fix |
|---|---|---|---|
| ✅ | Only on-site input (youth FAQ search) has a `<label>` | `youth.html` 303 | — |
| ✅ | No-result state announced in text, not colour | `youth.html` "No questions match…" | add `role="status"` for announcement |
| ✅ | Nav dropdowns, mobile menu (Esc closes), planner buttons (`aria-pressed`), ministry tiles (`aria-expanded`), Next Steps tabs (arrow keys), map list buttons, FAQ `<details>` all work by keyboard | `js/nav.js`, `js/site.js`, `js/about.js`, `js/visit.js` | — |
| ⚠️ | **Photo viewer (modal) has no focus trap** — Tab can move behind the open dialog | `js/site.js` ~140–180, `index.html` 300 | trap Tab inside `#lb` while open (focus already moves in & returns) |
| ⚠️ | Photo rail is drag-scrolled; keyboard users can Tab through items but there are no arrow-key controls | `index.html` rail, `js/site.js` | acceptable; optional prev/next buttons |
| ⚠️ | Map shapes are mouse-only (keyboard uses the list below, which is equivalent) | `js/visit.js` | acceptable (equivalent alternative provided) |
| ⚠️ | External forms (Church Center, Tithe.ly) | — | **check on those platforms**: labels, error messages, keyboard use |

---

## 6. Privacy policy — ⚠️

`privacy.html` exists ✅ and is linked in every footer ✅ (e.g. `index.html` 350).

| Status | Requirement | Where | Gap | Proposed fix |
|---|---|---|---|---|
| ✅ | What's collected (forms, prayer, registrations, donations, kids check-in, analytics) | `privacy.html` "What we collect" | — | |
| ✅ | Why it's used | "How we use it" | — | |
| ⚠️ | Who it's shared with | `privacy.html` 175 ("Services we use") | names Planning Center, Tithe.ly, Google, YouTube/Facebook; **email/SMS provider not named**; cross-border storage mentioned generally | add `[EMAIL/TEXT SERVICE]` placeholder, confirm list |
| ❌ | **How long it's kept** | `privacy.html` 192 ("Keeping it safe") | says "only as long as we need it" — no periods | add `[RETENTION PERIODS]` e.g. donation records `[7 years — confirm with CRA guidance]`, prayer requests `[X]`, kids check-in `[X]` |
| ⚠️ | Privacy contact | `privacy.html` 205 | uses general info@ — **no named privacy officer** | `[PRIVACY OFFICER NAME/TITLE]` |
| ⚠️ | Legal name of organisation | `privacy.html` "Who we are" | "Movement Church" — legal/registered name unknown | `[LEGAL NAME]` |
| ⚠️ | PIPEDA principles (accountability, consent, limiting collection, accuracy, safeguards, openness, access, challenging compliance) | throughout | mostly covered; accuracy & breach notification not mentioned | add short sections |
| ⚠️ | Prayer request visibility | — | doesn't say **who sees prayer requests** | add "[prayer team / pastors]" statement |

---

## 7. Terms of use — ❌

| Status | Finding | Proposed fix |
|---|---|---|
| ❌ | No terms page exists and none is linked in the footer | Draft `terms.html` (acceptable use, content ownership/© & photo use, external-links disclaimer, crisis-resources disclaimer, limitation of liability, governing law Ontario) with `[PLACEHOLDERS]`; link in every footer |

---

## 8. Cookies policy — ⚠️

`privacy.html` 184 ("Cookies & analytics") explains the approach but **doesn't list cookies individually**.

| Name | Set by | Type | When | Listed? |
|---|---|---|---|---|
| `_ga`, `_ga_<ID>` | Google Analytics | cookie, analytics, ~2 years | only after **Accept** (and only once a real GA ID is set) | ⚠️ not by name |
| `mvConsent` | this site (`js/consent.js`) | localStorage, essential | after a choice | ⚠️ mentioned, not by name |
| `mvIntro` | this site (inline script) | sessionStorage, essential | each visit | ⚠️ mentioned, not by name |
| `NID`, `AEC`, `__Secure-*` (typical) | **Google Maps embed** on `visit.html` 212 | third-party cookies | **on page load, without consent** | ❌ not mentioned |
| none (IP address shared) | Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) | request only | every page load | ✅ mentioned |

**Fix:** add a cookie table (or a separate `cookies.html`) listing the above; update when GA ID is added.

---

## 9. Cookie consent — ⚠️

| Status | Check | Where | Gap | Proposed fix |
|---|---|---|---|---|
| ✅ | Analytics doesn't load before consent | `js/consent.js` | — | |
| ✅ | Choice can be changed later | footer "Cookie settings" on every page; `privacy.html` | — | |
| ✅ | Declining removes `_ga` cookies | `js/consent.js` `stopAnalytics()` | — | |
| ⚠️ | **Accept and Decline not equal prominence** (filled vs outline) | `js/consent.js` 67–68 | — | style both buttons identically |
| ❌ | **Google Maps iframe loads (and sets cookies) without consent** | `visit.html` 212 | — | click-to-load placeholder ("Show map — loads Google Maps") or gate behind consent |
| ⚠️ | Banner currently never appears | `js/consent.js` (GA ID is `G-XXXXXXXXXX`) | by design until ID added; once maps are consent-gated the banner should also cover them | — |

---

## 10. Tracking — ✅

| Script | Where | Necessary? | Status |
|---|---|---|---|
| Google Analytics 4 (gtag.js) | `js/consent.js` — loads only after consent; ID placeholder, so **currently inactive** | optional | ✅ |
| Google Tag Manager, Meta Pixel, Hotjar, TikTok, LinkedIn, etc. | — | — | ✅ none present |

---

## 11. Third-party embeds — ⚠️

| Embed | Where | Cookies? | Status | Proposed fix |
|---|---|---|---|---|
| **Google Maps iframe** | `visit.html` 212 | yes | ❌ loads before consent | click-to-load / consent-gate (item 9) |
| Google Fonts | `<head>` of all pages | no cookies, sends IP to Google | ⚠️ | self-host the two fonts in `/fonts` (removes the request entirely) |
| YouTube | links only (`youtube.com/@MovementChurchCanada`, testimony playlist) — **no embeds** | none until clicked | ✅ | if embedded later use `youtube-nocookie.com` + consent |
| Facebook / Instagram | links only | none until clicked | ✅ | |
| Church Center / Planning Center forms & events | links only | none on this site | ✅ | |
| Tithe.ly giving | link only | none on this site | ✅ | |
| Google Docs (counselling list) | link only (`crisis-support.html`, `marriage-resources.html`) | none until clicked | ✅ | |
| Lenis smooth-scroll library | self-hosted `js/vendor/lenis.min.js` | none | ✅ | |
| Video files | self-hosted `media/` | none | ✅ | |

---

## 12. Form consent / CASL — ⚠️

| Status | Finding | Where | Proposed fix |
|---|---|---|---|
| ✅ | No on-site forms collect personal data | — | — |
| ⚠️ | **"You'll automatically be added to receive email and text updates"** when attending or filling out Plan a Visit — no opt-in checkbox | `youth.html` 219 and 319 (FAQ) | CASL generally needs express or implied consent (implied from an inquiry lasts 6 months). Recommend: on the Church Center Youth form, add an **unchecked** "Send me email/text updates" box, and on this page reword to "you can sign up to receive…" + mention unsubscribing. **Lawyer/leadership decision.** |
| ⚠️ | Unsubscribe path not mentioned on the site | `privacy.html` "Your choices" says you can withdraw | confirm every Planning Center email/SMS includes unsubscribe (they do by default) |
| ⚠️ | External forms must state purpose + link to privacy policy | Church Center forms | **check each form on Church Center**: add a one-line purpose + link to `privacy.html` |

---

## 13. Collect only necessary data — ⚠️ (can't audit here)

| Status | Finding | Proposed action |
|---|---|---|
| ⚠️ | All forms are on Church Center; fields not visible from this repo | Review: Plan a Visit, Request Prayer (`forms/194030`), Talk with a Supporter (`forms/411635`), Join a Team, Baptism, Youth Plan a Visit — remove unneeded fields (e.g. birthdate, address) |
| ⚠️ | **Prayer request form** — site doesn't say who reads requests | `care.html` "Request Prayer" card | add "Your request is seen only by [our prayer team/pastors]" on the card and form; make name/contact optional |

---

## 14. Image copyright & identifiable children — ⚠️

**Sources (from this project's history):** Sunday photo archive on "Isaac's Drive" (church's own photography), the church's current website (`wearemovement.ca` / its asset export), and the church's own staff portraits. **No stock (Unsplash etc.) images are used.** The current website's care page used Unsplash images — they were deliberately *not* carried over.

| Status | Image(s) | Used on | Concern |
|---|---|---|---|
| ⚠️ confirm consent | `kids-hero.jpg` (children dancing) | `kids.html` | identifiable children |
| ⚠️ confirm consent | `kids-laughing.jpg`, `club56-room.jpg` | `about.html` (values cards) | identifiable children/preteens |
| ⚠️ confirm consent | `give-club56.jpg` (two Club 56 students), `club56-collage.png` | `give.html`, `club56.html` | identifiable preteens |
| ⚠️ confirm consent | `youth-collage-1/2/3.png`, `youth-room.jpg`, `youth-hands.jpg`, `worship-students.jpg`, `media/youth-video-loop.mp4` | `youth.html`, `about.html` | identifiable teens |
| ⚠️ confirm consent | `kids-family.jpg` (dad carrying children), `visit-arrive.jpg` (family with toddlers — social-share image) | `kids.html`, `visit.html` meta | identifiable young children |
| ⚠️ confirm consent | `kids.jpg`, `kids2.jpg` — **visiting Watoto Children's Choir** | `index.html` rail & "Movement Kids" tile (`js/content.js` 44, 120) | identifiable children from an outside organisation — need Watoto's permission; also `kids2.jpg` represents *Movement Kids* though it's Watoto |
| ⚠️ confirm | Baptism clips & photos (`media/baptism-*.mp4`, `baptism-*.jpg`, `give-baptism.jpg`) | `baptism.html`, `give.html` | individuals in a personal faith moment — confirm their consent (ages 12+ may include minors) |
| ℹ️ | Unused images still in the repo: `baptism-joy.jpg`, `baptism2.jpg`, `karaoke.jpg`, `lobby.jpg`, `team-huddle.jpg`, `worship-lights.jpg`, `youth-hug.jpg`, `youth-worship.jpg` | none | decide whether to delete (several show minors) |
| ✅ | Staff photos | `about.html` | staff consent assumed — confirm |

---

## 15. Song lyrics & music — ⚠️

| Status | Item | Where | Note |
|---|---|---|---|
| ⚠️ | Photo with projected lyrics "When You Speak Mountains Move / I Believe" | `img/hands.jpg` → `index.html` 165, 248 | incidental lyric excerpt in a photo; usually low-risk, but CCLI's Church Copyright Licence covers projection in services, **not** website reproduction — consider a photo without legible lyrics |
| ⚠️ | Photos with legible screens: `kids-hero.jpg` ("Praise the Lord"), `place-auditorium.jpg` ("JESUS"), `step-identity.jpg`, `teams-worship.jpg` | various | short phrases — likely fine; confirm none show full lyric lines |
| ⚠️ | **Videos likely containing worship music**: `media/sunday-film.mp4` (home/visit), `media/baptism-film.mp4`, `media/youth-video-loop.mp4`, `media/about-loop.mp4` / `give-loop.mp4` (background music?) | `index.html`, `visit.html`, `baptism.html`, `youth.html`, `about.html`, `give.html` | worship songs in recorded video need a **CCLI Streaming Licence** (or equivalent); any commercial/background music needs a sync licence or royalty-free source — **confirm what's licensed** |
| ℹ️ | `karaoke.jpg` shows "Let it go" (Disney) lyrics on screen | unused | delete or keep unused |
| ✅ | No lyrics or chord charts as page text | — | |

---

## 16. Testimonials — ✅

| Status | Finding |
|---|---|
| ✅ | No testimonials, reviews or star ratings on the site |
| ✅ | Only quote: "Within reach of those who feel far from God." (`about.html`, Lead Pastors) — taken from the pastors' own bio text, attributed in context |
| ✅ | Baptism testimonies link to the church's own YouTube playlist |
| ✅ | No lorem ipsum / placeholder names |

---

## 17. Unsupported claims — ⚠️ (all come from the church's own current website; please confirm)

| Claim | Where | Source shown? |
|---|---|---|
| "1,000+ — People gathering here every week" | `index.html` 276 | ❌ |
| "grown from a church of 300 to a thriving community of over 1,000" / timeline "300 → 1,000+ in a decade" | `about.html` 346, 354 | ❌ |
| "hundreds have made the decision to follow Jesus" | `about.html` 346 | ❌ |
| "feeds over 80 people twice a week through the soup kitchen" + "80+ people fed twice a week" chip | `give.html` ~292 | ❌ |
| "22 church plants across Canada" + chip; partners in Italy, Ukraine, France | `give.html` ~302 | ❌ |
| "Est. 1928" / "Nearly a century" | `about.html`, `index.html` | ✅ historical |
| No "#1"/"best"-style claims | — | ✅ |

**Proposed:** keep (they're the church's own figures) but confirm they're current; optionally add "as of [YEAR]".

---

## 18. Real organisation details — ❌

| Status | Requirement | Where | Gap | Proposed fix |
|---|---|---|---|---|
| ✅ | Physical address, email, phone in every footer | e.g. `index.html` footer | — | |
| ⚠️ | **Legal name** | footer "© 2026 Movement Church" | registered legal name unknown (may differ, e.g. former "Calvary Church Woodstock" or a denominational name) | `[LEGAL NAME]` in footer/privacy/terms |
| ❌ | **CRA charitable registration number** on the Give page | `give.html` | missing | add "Charitable registration no. `[#########RR0001]`" near giving options & FAQ |
| ⚠️ | **Receipting policy** | `give.html` 353–354, 374 | says annual receipts for "eligible donations" — doesn't say what's eligible (e.g. no receipt for gifts with advantage, cash without name, minimum amount) or when receipts are issued | add short receipting policy `[CONFIRM POLICY]` |

---

## 19. Local laws (Ontario / Canada) — ⚠️

| Law | Applies? | Status | Notes |
|---|---|---|---|
| **AODA / IASR** (WCAG 2.0 AA for websites) | Legally required for Ontario organisations with **50+ employees**; the staff list suggests fewer, so likely not mandatory — the Ontario Human Rights Code duty to accommodate still applies | ⚠️ | site targets 2.1 AA; fix items 1, 3, 4, 5 |
| **PIPEDA** | Applies to *commercial* activity; most church activity is non-commercial, but following PIPEDA is best practice and expected by donors | ⚠️ | item 6 |
| **CASL** | Applies to commercial electronic messages; registered charities have a fundraising exemption, but event/program reminders aren't fundraising → treat as needing consent + unsubscribe | ⚠️ | item 12 (youth auto-add wording) |
| **CRA receipting** | Official receipts must contain prescribed info; publishing the registration number builds donor trust | ❌ | item 18 |
| **Quebec Law 25** | Only if targeting Quebec residents — not the case | ✅ | consent-first analytics already aligns |
| Pages targeting other regions | Uganda/Ukraine/Italy/France appear only as missions descriptions | ✅ | — |
| Time zone label "11am EST" (summer is EDT) | `visit.html`, `youth.html` | ⚠️ minor | use "Eastern Time" |

---

## 20. Leftover template content — ⚠️

| Status | Finding | Where | Proposed fix |
|---|---|---|---|
| ✅ | No `href="#"` dummy links, no empty links | all pages | — |
| ✅ | No broken internal links (all local `.html`, image, video and script references resolve) | all pages | — |
| ✅ | No default theme copyright notices; footer © 2026 Movement Church | footers | — |
| ⚠️ | Google Analytics ID is the placeholder `G-XXXXXXXXXX` | `js/consent.js` | intentional until you add your ID |
| ⚠️ | Link still points to the **old site**: "Movement Middle School" → `wearemovement.ca/middleschool` | `give.html` 282 | point to `club56.html` / `youth.html` or remove when old site retires |
| ℹ️ | `img/yourfile.jpg` appears only as an example in an editing-instructions comment | `js/content.js` 11 | fine |
| ⚠️ | 8 unused images in `img/` | see item 14 | delete after you decide |
| ℹ️ | `README.md` says "21 images" in the folder tree | `README.md` | update text |

---

## Proposed Phase 2 changes (awaiting approval)

**Code fixes I'd make directly**
1. Contrast: new `--ink3`, `--teal-text`, deeper text-orange and button-orange tokens; apply across CSS (items 1).
2. Headings: add `<h2>` where cards jump h1→h3 (4 pages).
3. Labels: "Learn more about giving"; unique `aria-label`s on "See it on the map".
4. Photo viewer focus trap; `role="status"` on youth no-results.
5. Consent: equal-prominence Accept/Decline; **click-to-load Google Map** gated by consent; add the map to the cookie banner wording.
6. Pause control for marquees (and optionally the youth video).
7. Footer: add "Terms of Use" link on every page; `[LEGAL NAME]` placeholder.
8. Give page: CRA registration number + receipting policy with `[PLACEHOLDERS]`.
9. Youth page: CASL-safer wording for updates sign-up.
10. Prayer request card: "who sees your request" line.
11. Middle School link fix; "Eastern Time"; README cleanup.
12. Optional: self-host Google Fonts (removes the last third-party request on page load).

**Policy pages I'd draft with `[PLACEHOLDERS]`** (never inventing facts)
- Update `privacy.html` (retention, privacy officer, prayer visibility, email/SMS provider, breach & accuracy).
- New `terms.html`.
- Cookie list (section in privacy or new `cookies.html`).

**Not changed without your decision:** any image, claim, or video (items 14, 15, 17), and the 8 unused images.

**Commits (one per group):** contrast · headings & labels · keyboard & motion controls · consent & map gating · policy pages & footer links · giving details & content fixes.

---

# Phase 2 — status after fixes (October 20, 2026)

Constraint applied: **nothing changes visually** except the approved text changes. Every page was screenshotted at 1440px and 390px before and after each group of changes and compared pixel by pixel. **Restore point:** git tag `pre-compliance-audit` (commit `c195b7d`).

| # | Item | Was | Now | What changed |
|---|------|-----|-----|--------------|
| 1 | Colour contrast | ❌ | ⚠️ accepted risk | `--ink3` → `#646d73` (4.9:1 / 4.5:1). **Teal small text (3.9:1), orange headline words (2.9:1), white on orange buttons (3.1:1) and white on teal (4.2:1) are accepted risk to preserve brand colours** — the organisation is likely under the AODA 50-employee threshold. Youth search placeholder and light UI borders also left as-is (visual change). |
| 2 | Alt text | ✅ | ✅ | Watoto photos now identify the visiting Watoto Children's Choir. |
| 3 | General accessibility | ⚠️ | ⚠️ | Hidden `<h2>`s fix heading order (404, care, club56, groups); `lang="en-CA"`; caption tracks added (captions text still TODO); marquees and youth hero video pause on hover/focus. |
| 4 | Button & link labels | ⚠️ | ✅ | aria-labels on "Learn more" (youth) and each "See it on the map" (kids). |
| 5 | Keyboard & widgets | ⚠️ | ✅ (on-site) | Focus trap in the photo viewer; youth FAQ no-results is a `role="status"`. External forms still to check. |
| 6 | Privacy policy | ⚠️ | ⚠️ placeholders | Retention, accuracy, breach, prayer visibility, email/SMS provider, privacy officer, legal name + CRA number added — **fill the [PLACEHOLDERS]**. |
| 7 | Terms of use | ❌ | ⚠️ placeholders | `terms.html` created, linked from the privacy policy (not the footer, by request). |
| 8 | Cookies policy | ⚠️ | ✅ | Cookie list table in `privacy.html` (`_ga`, `mvConsent`, `mvIntro`, Google Maps cookies, self-hosted fonts note). |
| 9 | Cookie consent | ⚠️ | ⚠️ | Accept/Decline now equal prominence. **Google Map still loads before consent — left as-is by decision and disclosed in the cookie list.** |
| 10 | Tracking | ✅ | ✅ | — |
| 11 | Third-party embeds | ⚠️ | ⚠️ | Google Fonts now self-hosted (no request to Google; pixel-identical). Google Map unchanged (see 9). |
| 12 | Form consent / CASL | ⚠️ | ⚠️ | Youth wording is now opt-in with unsubscribe. Church Center forms still to check. |
| 13 | Data minimisation | ⚠️ | ⚠️ external | Church Center forms still to review. |
| 14 | Image copyright & children | ⚠️ | ⚠️ | **Watoto: resolved — permission obtained from Watoto for livestream and social media use.** Photos renamed `watoto-choir-1/2.jpg`. 8 unused images deleted. Other photos of identifiable children/teens still need consent confirmed. |
| 15 | Song lyrics & music | ⚠️ | ⚠️ | Unchanged — confirm CCLI Streaming Licence. |
| 16 | Testimonials | ✅ | ✅ | — |
| 17 | Unsupported claims | ⚠️ | ⚠️ | Unchanged by request — confirm figures are current. |
| 18 | Organisation details | ❌ | ⚠️ placeholders | CRA registration no. 89813 7559 RR0001 + CRA verification link + receipting policy on Give; also on privacy and terms. Legal name still a placeholder. |
| 19 | Local laws | ⚠️ | ⚠️ | "EST" → "Eastern Time"; see items 1, 6, 12, 18. |
| 20 | Leftover content | ⚠️ | ✅ | Middle School link → `club56.html`; README image count fixed; unused images removed. GA ID placeholder remains until you add it. |

### Not done — visual change required
- Teal small text, orange headline words, white-on-orange and white-on-teal buttons (contrast) — accepted risk.
- Youth search placeholder contrast (3.5:1).
- UI component borders (option buttons, place buttons, FAQ circles) under 3:1.
- Visible pause buttons for marquees / youth video (hover/focus pause added instead).
- Consent-gating the Google Map (would replace the map with a click-to-load placeholder).
