/* ============================================================
   MOVEMENT CHURCH - YOUTH PAGE
     1. the background video (big screens only)
     2. countdown to the next Wednesday night
     3. "3 types of nights" cards tilt toward the mouse
     4. photo collages drift as you scroll
     5. FAQ search
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* ---------- 1. VIDEO ----------
     Not loaded for people who've asked for less motion or less
     data (data-saver); they see the poster image instead. */
  var video = document.getElementById("youthVideo");
  var saveData = navigator.connection && navigator.connection.saveData;
  if (video && !reduceMotion && !saveData) {
    video.src = video.getAttribute("data-src");
    var p = video.play();
    if (p && p.catch) p.catch(function () {});   // autoplay blocked: the poster stays
    /* pause while hovered or while keyboard focus is in the hero (WCAG 2.2.2) */
    var hero = video.parentNode;
    var resume = function () { if (!hero.matches(":hover") && !hero.contains(document.activeElement)) { var q = video.play(); if (q && q.catch) q.catch(function () {}); } };
    hero.addEventListener("mouseenter", function () { video.pause(); });
    hero.addEventListener("mouseleave", resume);
    hero.addEventListener("focusin", function () { video.pause(); });
    hero.addEventListener("focusout", function () { setTimeout(resume, 0); });
  }


  /* ---------- 2. COUNTDOWN ----------
     Youth is Wednesdays 6:30-8:30pm (the visitor's local time,
     which for nearly everyone is Woodstock time). */
  var countTime = document.getElementById("youthCountTime");
  var countBox = document.getElementById("youthCount");
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tick() {
    var now = new Date();
    var start = new Date(now);
    start.setHours(18, 30, 0, 0);
    start.setDate(now.getDate() + ((3 - now.getDay() + 7) % 7));   // 3 = Wednesday
    var end = new Date(start); end.setHours(20, 30, 0, 0);
    if (now >= end) start.setDate(start.getDate() + 7);             // tonight's already over
    if (now >= start && now < end) {
      countBox.classList.add("is-live");
      countTime.textContent = "We’re on right now!";
      return;
    }
    countBox.classList.remove("is-live");
    var s = Math.floor((start - now) / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600); s -= h * 3600;
    var m = Math.floor(s / 60); s -= m * 60;
    countTime.textContent = (d ? d + "d " : "") + pad(h) + "h " + pad(m) + "m " + pad(s) + "s";
  }
  if (countTime && countBox) { tick(); setInterval(tick, 1000); }


  /* ---------- 3. TILT ---------- */
  var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
  if (!reduceMotion && canHover) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-tilt]"), function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(900px) rotateY(" + (x * 10) + "deg) rotateX(" + (-y * 10) + "deg) translateY(-6px)";
        card.style.setProperty("--gx", (x + 0.5) * 100 + "%");
        card.style.setProperty("--gy", (y + 0.5) * 100 + "%");
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }


  /* ---------- 4. FLOATING COLLAGES ---------- */
  var floats = document.querySelectorAll(".y-float");
  if (floats.length && !reduceMotion) {
    var ticking = false;
    var drift = function () {
      ticking = false;
      var mid = window.innerHeight / 2;
      Array.prototype.forEach.call(floats, function (img) {
        var r = img.getBoundingClientRect();
        var offset = (r.top + r.height / 2 - mid) * parseFloat(img.getAttribute("data-speed") || 0);
        img.style.translate = "0 " + offset.toFixed(1) + "px";
      });
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(drift); }
    }, { passive: true });
    drift();
  }


  /* ---------- 5. FAQ SEARCH ---------- */
  var search = document.getElementById("youthSearch");
  var faq = document.getElementById("youthFaq");
  var none = document.getElementById("youthNoResult");
  if (search && faq) {
    var items = faq.querySelectorAll("details");
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      var shown = 0;
      Array.prototype.forEach.call(items, function (d) {
        var hit = !q || d.textContent.toLowerCase().indexOf(q) !== -1;
        d.hidden = !hit;
        if (hit) shown++;
        if (q && hit && !d.dataset.wasOpen) { d.dataset.wasOpen = d.open ? "1" : "0"; d.open = true; }
        if (!q && d.dataset.wasOpen) { d.open = d.dataset.wasOpen === "1"; delete d.dataset.wasOpen; }
      });
      none.hidden = shown !== 0;
    });
  }
})();
