/* ============================================================
   MOVEMENT CHURCH - MOBILE MENU
   On phones and tablets the nav links are tucked away; the menu
   button shows them as a dropdown under the nav bar.
   ============================================================ */

(function () {
  "use strict";

  var nav = document.querySelector(".nav");
  var btn = nav && nav.querySelector(".nav-toggle");
  var menu = document.getElementById("navMenu");
  if (!btn || !menu) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Menu");
  }

  btn.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  /* close it when a link is chosen, Escape is pressed, or someone taps outside */
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); btn.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (nav.classList.contains("is-open") && !nav.contains(e.target)) setOpen(false);
  });

  /* dropdowns (Ministries, Get involved): click/tap toggles; on desktop they
     also open on hover and keyboard focus (that part is CSS) */
  var groups = menu.querySelectorAll(".nav-group");
  function closeGroups(except) {
    Array.prototype.forEach.call(groups, function (g) {
      if (g === except) return;
      g.classList.remove("is-open");
      g.querySelector(".nav-group-btn").setAttribute("aria-expanded", "false");
    });
  }
  Array.prototype.forEach.call(groups, function (g) {
    var gb = g.querySelector(".nav-group-btn");
    gb.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !g.classList.contains("is-open");
      closeGroups(g);
      g.classList.toggle("is-open", open);
      gb.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest || !e.target.closest(".nav-group")) closeGroups(null);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeGroups(null);
  });

  /* ---- the nav tucks away ----
     - scrolling down past the nav's height hides it; scrolling up shows it
     - on phones, a finger swiping up that starts on the nav bar hides it
       straight away (checked while the finger moves, since browsers often
       cancel the touch once the page scrolls)
     - a wheel/trackpad scroll down over the bar hides it too
     - swipe down from the top edge, or scroll up, to bring it back
     Lives here (not in scroll.js) so it also works with "reduce motion". */
  var lastY = window.scrollY, lockUntil = 0, startY = null;
  function menuOpen() { return nav.classList.contains("is-open") || !!nav.querySelector(".nav-group.is-open"); }
  function hideNav(lock) {
    if (menuOpen()) return;
    nav.classList.add("nav--hidden");
    if (lock) lockUntil = Date.now() + 900;      // ignore the little bounce after a swipe
  }
  function showNav() { nav.classList.remove("nav--hidden"); }
  window.mvHideNav = hideNav;

  window.addEventListener("scroll", function () {
    var y = window.scrollY, dy = y - lastY;
    if (Math.abs(dy) > 3) {
      if (dy > 0 && y > nav.offsetHeight + 4) hideNav(false);
      else if (dy < 0 && Date.now() > lockUntil) showNav();
      lastY = y;
    }
    nav.classList.toggle("nav--scrolled", y > 10);
  }, { passive: true });

  function overNav(t) {
    var r = nav.getBoundingClientRect();
    return !nav.classList.contains("nav--hidden") && t.clientY >= r.top - 4 && t.clientY <= r.bottom + 8;
  }
  var edgeY = null;
  document.addEventListener("touchstart", function (e) {
    var t = e.touches[0];
    startY = (e.touches.length === 1 && overNav(t)) ? t.clientY : null;
    edgeY = (nav.classList.contains("nav--hidden") && t.clientY < 48) ? t.clientY : null;
  }, { passive: true });
  document.addEventListener("touchmove", function (e) {
    var y = e.touches[0].clientY;
    if (startY !== null && startY - y > 16) { hideNav(true); startY = null; }
    if (edgeY !== null && y - edgeY > 25) { showNav(); edgeY = null; }
  }, { passive: true });
  document.addEventListener("touchend", function () { startY = edgeY = null; }, { passive: true });
  document.addEventListener("touchcancel", function () { startY = edgeY = null; }, { passive: true });

  nav.addEventListener("wheel", function (e) { if (e.deltaY > 4) hideNav(true); }, { passive: true });
  nav.addEventListener("focusin", showNav);   // keyboard users always get the nav back

  /* back on a wide screen the links show normally, so reset */
  window.matchMedia("(min-width: 1081px)").addEventListener("change", function (mq) {
    if (mq.matches) setOpen(false);
  });
})();
