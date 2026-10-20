/* ============================================================
   MOVEMENT CHURCH - PAGE INTRO
   The Movement "M" draws itself on a dark screen, flashes orange,
   then flies up into the logo in the nav while the page appears.

   - Plays once per visit (the first page someone opens).
   - Click, tap or press any key to skip.
   - Skipped for anyone with "reduce motion" turned on.
   The decision to play is made by the small script in <head>,
   which adds class="has-intro" to <html>.
   ============================================================ */

(function () {
  "use strict";

  var root = document.documentElement;
  var intro = document.getElementById("intro");
  if (!intro) return;
  if (!root.classList.contains("has-intro")) {
    intro.parentNode.removeChild(intro);
    return;
  }

  var mark = intro.querySelector(".intro-mark");
  var navLogo = document.querySelector(".nav-logo img");
  var timers = [];
  var finished = false;

  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function cleanUp() {
    if (finished) return;
    finished = true;
    timers.forEach(clearTimeout);
    root.classList.remove("has-intro");
    if (intro.parentNode) intro.parentNode.removeChild(intro);
    document.removeEventListener("keydown", skip);
  }

  /* fly the M to wherever the nav logo sits, shrinking to its size */
  function flyToNav() {
    if (navLogo) {
      var from = mark.getBoundingClientRect();
      var to = navLogo.getBoundingClientRect();
      var scale = to.width / from.width;
      var dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      var dy = (to.top + to.height / 2) - (from.top + from.height / 2);
      mark.style.transform = "translate(" + dx + "px," + dy + "px) scale(" + scale + ")";
    }
    intro.classList.add("is-leaving");
    later(cleanUp, 750);
  }

  function skip() {
    if (intro.classList.contains("is-leaving")) return cleanUp();
    timers.forEach(clearTimeout);
    timers = [];
    intro.classList.add("is-drawn", "is-lit");
    flyToNav();
  }

  intro.addEventListener("click", skip);
  document.addEventListener("keydown", skip);

  /* the timeline (milliseconds) */
  later(function () { intro.classList.add("is-drawn"); }, 150);   // the line sweeps along the M (1s)
  later(function () { intro.classList.add("is-lit"); }, 1200);    // M turns orange with a little pop
  later(flyToNav, 1600);                                          // up into the nav, page fades in
})();
