/* ============================================================
   MOVEMENT CHURCH - GIVE PAGE
   The "Copy" buttons: any <button data-copy="..."> copies that
   text and briefly says "Copied". If copying isn't allowed, the
   buttons hide themselves (the links beside them still work).
   ============================================================ */

(function () {
  "use strict";

  var buttons = document.querySelectorAll("[data-copy]");
  if (!buttons.length) return;

  if (!navigator.clipboard || !window.isSecureContext) {
    for (var j = 0; j < buttons.length; j++) buttons[j].hidden = true;
    return;
  }

  Array.prototype.forEach.call(buttons, function (btn) {
    var label = btn.textContent;
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(btn.getAttribute("data-copy")).then(function () {
        btn.textContent = "Copied";
        btn.classList.add("is-copied");
        setTimeout(function () {
          btn.textContent = label;
          btn.classList.remove("is-copied");
        }, 1800);
      });
    });
  });
})();
