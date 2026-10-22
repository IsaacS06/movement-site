/* ============================================================
   MOVEMENT CHURCH - SCROLLING
   Runs on every page:
     1. smooth, weighted scrolling (Lenis, js/vendor/lenis.min.js)
     2. headings, cards and photos fade up as you reach them;
        headlines rise word by word; marquees speed up as you scroll
     3. photo bands and header images drift slower (parallax)
     4. a thin progress bar along the top
     5. the nav tucks away scrolling down, returns scrolling up
   All of it is off for people who've asked for reduced motion,
   and the smooth scrolling is skipped on touch screens.
   ============================================================ */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (reduceMotion) return;


  /* ---------- 1. SMOOTH SCROLLING ---------- */
  var lenis = null;
  if (finePointer && window.Lenis) {
    /* lerp = how quickly it catches up to your wheel (higher = lighter, snappier) */
    lenis = new window.Lenis({ lerp: 0.16, smoothWheel: true, wheelMultiplier: 1.05 });
    window.mvLenis = lenis;
    var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    /* on-page links (#faq, #map...) glide there, stopping below the sticky nav */
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -90 });
      history.pushState(null, "", id);
      if (id === "#main") target.setAttribute("tabindex", "-1"), target.focus({ preventScroll: true });
    });
  }


  /* ---------- 2. REVEAL ON SCROLL ----------
     Anything with class="reveal" fades up, plus these common pieces,
     so new pages get it automatically. */
  var AUTO = [
    ".sec-head", ".way", ".impact", ".team", ".age", ".book", ".vcard", ".stat", ".tile", ".fact-card",
    ".final", ".plan-grid > *", ".rail-head", ".band-in", ".value", ".person", ".timeline", ".history-txt",
    ".pastors-txt", ".faq details", ".y-head", ".y-night", ".y-ticket", ".y-give", ".getting-here", ".job-card",
    ".job-body > h4", ".legal-body > h2", ".club-banner", ".bap-intro > *", ".ready-txt", ".ready-film",
    ".film-frame", ".purpose-txt", ".purpose-film", ".spell", ".nf-code", ".res-alert", ".y-wall-in", ".y-final-in"
  ].join(",");
  /* photos get an extra "unveil" */
  var PHOTOS = [
    ".impact-img img", ".history-img img", ".pastors-img img", ".give-hero-img img", ".give-hero-img video",
    ".y-give-img", ".person-img img", ".club-banner img", ".bap-side", ".kids-family", ".step-img img",
    ".about-hero .collage img"
  ].join(",");

  if ("IntersectionObserver" in window) {
    root.classList.add("js");   /* style.css only hides things once this is on */

    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal, " + AUTO));
    var imgs = Array.prototype.slice.call(document.querySelectorAll(PHOTOS));
    els.forEach(function (el) { el.classList.add("reveal"); });
    imgs.forEach(function (el) { el.classList.add("reveal-img"); });

    /* when it's finished, drop the reveal styles so hover effects work normally */
    var cleanUp = function (el) {
      setTimeout(function () {
        el.classList.remove("reveal", "reveal-img", "is-in");
        el.style.transitionDelay = "";
      }, 1300);
    };

    var watcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        /* things side by side arrive one after another */
        var sibs = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
        el.style.transitionDelay = Math.min(sibs % 4, 3) * 90 + "ms";
        el.classList.add("is-in");
        watcher.unobserve(el);
        cleanUp(el);
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    els.concat(imgs).forEach(function (el) { watcher.observe(el); });
  }


  /* ---------- 2b. HEADLINES RISE WORD BY WORD ----------
     Each word slides up from behind a mask. Coloured words (spans inside
     the heading) keep their colour. */
  var HEADS = "main h1:not(.vh):not(.y-title), .sec-head h2, .y-head h2, .ready-txt h2, .final h2, .history-txt h2, .pastors-txt h2, .y-about h2, .y-ticket h2, .y-give h2, .y-wall h2, .y-final h2, .online h2, .getting-txt h2";
  if ("IntersectionObserver" in window) {
    var heads = Array.prototype.slice.call(document.querySelectorAll(HEADS));
    var splitWords = function (node, counter) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var parts = child.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement("span"); w.className = "w";
            var wi = document.createElement("span"); wi.className = "wi";
            wi.style.setProperty("--i", counter.n++);
            wi.textContent = part;
            w.appendChild(wi); frag.appendChild(w);
          });
          child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== "BR") {
          splitWords(child, counter);
        }
      });
    };
    var headWatch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var h = entry.target;
        headWatch.unobserve(h);
        /* if the intro "M" is still covering the page, wait for it to finish */
        var go = function () {
          if (root.classList.contains("has-intro")) return setTimeout(go, 120);
          h.classList.add("split-in");
        };
        go();
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    heads.forEach(function (h) {
      if (h.classList.contains("split")) return;
      splitWords(h, { n: 0 });
      h.classList.add("split");
      headWatch.observe(h);
    });
  }


  /* ---------- 2c. MARQUEES SPEED UP WITH YOUR SCROLL ---------- */
  var marquees = Array.prototype.slice.call(document.querySelectorAll(".ticker-track, .y-marquee-track, .y-badge svg"));
  var boost = 0, prevY = window.scrollY;
  var applied = 0, anims = [];
  if (marquees.length && document.body.getAnimations) {
    marquees.forEach(function (el) { anims = anims.concat(el.getAnimations()); });
    var spin = function () {
      var y = window.scrollY;
      var v = lenis ? Math.abs(lenis.velocity || 0) : Math.abs(y - prevY);
      prevY = y;
      boost += (Math.min(v * 0.35, 5) - boost) * 0.08;        // ease toward the target speed
      /* only touch the animations when the speed has really changed:
         setting playbackRate every frame makes Safari stutter */
      if (Math.abs(boost - applied) > 0.04 || (boost < 0.01 && applied !== 0)) {
        applied = boost < 0.01 ? 0 : boost;
        anims.forEach(function (anim) { anim.playbackRate = 1 + applied; });
      }
      requestAnimationFrame(spin);
    };
    requestAnimationFrame(spin);
  }


  /* ---------- 3. PARALLAX ----------
     [data-parallax="0.1"] moves at a slightly different speed to the page.
     These get it automatically: */
  var PARALLAX = { ".band-bg img": 0.12, ".bap-hero-bg": 0.15, ".ready-bg": 0.1, ".y-final-bg": 0.12, ".give-hero-img": -0.05 };
  Object.keys(PARALLAX).forEach(function (sel) {
    Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
      if (!el.hasAttribute("data-parallax")) el.setAttribute("data-parallax", PARALLAX[sel]);
    });
  });
  var movers = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var bigImgs = Array.prototype.filter.call(movers, function (el) { return parseFloat(el.getAttribute("data-parallax")) > 0; });
  bigImgs.forEach(function (el) { el.classList.add("parallax-oversize"); });   /* a touch bigger, so edges never show */


  /* ---------- 4. PROGRESS BAR + 5. NAV ---------- */
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);

  var nav = document.querySelector(".nav");
  var lastY = window.scrollY;

  var ticking = false;
  function update() {
    ticking = false;
    var y = window.scrollY;
    var max = root.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";

    var vh = window.innerHeight;
    movers.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;   // off screen: skip
      var offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.getAttribute("data-parallax"));
      /* never move a photo further than its spare edge, so its frame never shows a gap */
      if (el.classList.contains("parallax-oversize") && el.parentNode) {
        var spare = Math.max(0, (el.offsetHeight * 1.24 - el.parentNode.clientHeight) / 2) - 2;
        offset = Math.max(-spare, Math.min(spare, offset));
      }
      el.style.translate = "0 " + offset.toFixed(1) + "px";
    });

    /* (the nav hiding on scroll lives in js/nav.js) */
    lastY = y;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  if (lenis) lenis.on("scroll", onScroll);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
