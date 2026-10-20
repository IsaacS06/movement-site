/* ============================================================
   MOVEMENT CHURCH - ABOUT PAGE
   Fades each .reveal block up as it scrolls into view.
   Without this file everything simply shows straight away.
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  /* style.css only hides .reveal blocks once this class is on <html> */
  document.documentElement.classList.add("js");

  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add("is-in");
      watcher.unobserve(el);                 // only animate once
      setTimeout(function () { el.style.transitionDelay = ""; }, 1000);  // so hovers aren't delayed later
    });
  }, { rootMargin: "0px 0px -8% 0px" });

  var blocks = document.querySelectorAll(".reveal");
  for (var i = 0; i < blocks.length; i++) {
    /* cards in the same row arrive one after another */
    blocks[i].style.transitionDelay = (i % 3) * 80 + "ms";
    watcher.observe(blocks[i]);
  }
})();


/* ============================================================
   NEXT STEPS JOURNEY
   Turns the four steps into tabs on a track from "Attending" to
   "Belonging". It plays through on its own (7 seconds a step)
   until someone clicks, swipes or uses the arrow keys, then it
   stays where they put it.
   ============================================================ */

(function () {
  "use strict";

  var journey = document.getElementById("journey");
  if (!journey) return;

  var stops = journey.querySelectorAll(".stop");
  var steps = journey.querySelectorAll(".step");
  var fill = document.getElementById("trackFill");
  var prevBtn = document.getElementById("jPrev");
  var nextBtn = document.getElementById("jNext");
  var nextLabel = document.getElementById("jNextLabel");
  var total = stops.length;
  var current = 0;

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function show(index, moveFocus) {
    current = (index + total) % total;

    for (var i = 0; i < total; i++) {
      var on = i === current;
      stops[i].setAttribute("aria-selected", on ? "true" : "false");
      stops[i].tabIndex = on ? 0 : -1;
      stops[i].classList.toggle("is-done", i < current);
      steps[i].hidden = !on;
    }

    /* the line fills up to the current stop */
    fill.style.width = (current / (total - 1)) * 100 + "%";

    /* the next button names what's coming */
    nextLabel.textContent = current === total - 1
      ? "Back to the start"
      : "Next: " + stops[current + 1].querySelector(".stop-name").textContent;

    if (moveFocus) stops[current].focus();
  }

  /* Anyone taking control stops the auto-play for good */
  function takeOver() {
    journey.classList.remove("is-playing", "is-paused");
  }

  /* -- clicks -- */
  for (var i = 0; i < total; i++) {
    stops[i].addEventListener("click", (function (n) {
      return function () { takeOver(); show(n); };
    })(i));
  }
  prevBtn.addEventListener("click", function () { takeOver(); show(current - 1); });
  nextBtn.addEventListener("click", function () { takeOver(); show(current + 1); });

  /* -- arrow keys on the track (standard tab behaviour) -- */
  journey.querySelector(".track").addEventListener("keydown", function (e) {
    var to = null;
    if (e.key === "ArrowRight") to = current + 1;
    else if (e.key === "ArrowLeft") to = current - 1;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = total - 1;
    if (to === null) return;
    e.preventDefault();
    takeOver();
    show(to, true);
  });

  /* -- swipe the photo/words left or right on a phone -- */
  var touchX = null;
  journey.addEventListener("touchstart", function (e) {
    touchX = e.touches[0].clientX;
  }, { passive: true });
  journey.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) < 50) return;
    takeOver();
    show(dx < 0 ? current + 1 : current - 1);
  });

  /* -- auto-play: the timer bar under the active stop drives it -- */
  if (!reduceMotion) {
    journey.addEventListener("animationend", function (e) {
      if (e.animationName !== "stepTimer" || !journey.classList.contains("is-playing")) return;
      show(current + 1);
    });

    /* hold still while the mouse is over it */
    journey.addEventListener("mouseenter", function () { journey.classList.add("is-paused"); });
    journey.addEventListener("mouseleave", function () { journey.classList.remove("is-paused"); });

    /* only start once it's on screen, and pause when scrolled away */
    if ("IntersectionObserver" in window) {
      var started = false;
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !started) {
          started = true;
          journey.classList.add("is-playing");
        }
        journey.classList.toggle("is-paused", !visible);
      }, { threshold: 0.4 }).observe(journey);
    }
  }

  journey.classList.add("is-ready");
  show(0);
})();


/* ============================================================
   VALUES: hovering (or tabbing to) a card lights its letter in
   the MOVEMENT word above the cards.
   ============================================================ */

(function () {
  "use strict";
  var letters = document.querySelectorAll(".spell span");
  var cards = document.querySelectorAll(".values .value");
  if (!letters.length || letters.length !== cards.length) return;

  Array.prototype.forEach.call(cards, function (card, i) {
    var on = function () { letters[i].classList.add("is-lit"); };
    var off = function () { letters[i].classList.remove("is-lit"); };
    card.addEventListener("mouseenter", on);
    card.addEventListener("mouseleave", off);
    card.addEventListener("focusin", on);
    card.addEventListener("focusout", off);
  });
})();
