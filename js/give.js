/* ============================================================
   MOVEMENT CHURCH - COPY BUTTONS
   Any <button data-copy="..."> copies that text. It says
   "Copied" and shows a success message; if the browser won't
   allow copying, an error message shows the text instead so it
   can be copied by hand. (Messages come from js/toast.js.)
   ============================================================ */

(function () {
  "use strict";

  var buttons = document.querySelectorAll("[data-copy]");
  if (!buttons.length) return;

  function toast(msg, type) { if (window.mvToast) window.mvToast(msg, type); }

  /* older browsers / non-secure pages: copy through a hidden text box */
  function fallbackCopy(text) {
    var box = document.createElement("textarea");
    box.value = text;
    box.setAttribute("readonly", "");
    box.style.position = "fixed";
    box.style.opacity = "0";
    document.body.appendChild(box);
    box.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(box);
    return ok;
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  /* what to call the thing in the message */
  function describe(text) {
    if (text.indexOf("@") !== -1) return "Email address";
    if (/^[\d\s().-]+$/.test(text)) return "Phone number";
    return "Address";
  }

  Array.prototype.forEach.call(buttons, function (btn) {
    var label = btn.textContent;
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      copy(text).then(function (ok) {
        if (ok) {
          btn.textContent = "Copied";
          btn.classList.add("is-copied");
          toast(describe(text) + " copied: " + text, "success");
          setTimeout(function () { btn.textContent = label; btn.classList.remove("is-copied"); }, 1800);
        } else {
          toast("Couldn’t copy automatically. Here it is to copy by hand: " + text, "error");
        }
      });
    });
  });
})();
