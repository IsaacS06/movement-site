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

  /* back on a wide screen the links show normally, so reset */
  window.matchMedia("(min-width: 1081px)").addEventListener("change", function (mq) {
    if (mq.matches) setOpen(false);
  });
})();
