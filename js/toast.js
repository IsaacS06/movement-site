/* ============================================================
   MOVEMENT CHURCH - SUCCESS & ERROR MESSAGES
   A small message that pops up at the bottom of the screen.
   Any script can call:

     mvToast("Email copied", "success");
     mvToast("That didn't work", "error");
     mvToast("Heads up", "info");

   Messages are read out by screen readers (errors right away,
   others politely) and disappear after a few seconds.
   Also tells visitors when they lose or regain their connection.
   ============================================================ */

(function () {
  "use strict";

  var box;
  function holder() {
    if (box) return box;
    box = document.createElement("div");
    box.className = "toasts";
    document.body.appendChild(box);
    return box;
  }

  var icons = {
    success: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    error: '<path d="M12 7v6M12 16.5v.5"/><circle cx="12" cy="12" r="9"/>',
    info: '<path d="M12 11v6M12 7.5v.5"/><circle cx="12" cy="12" r="9"/>'
  };

  window.mvToast = function (message, type, ms) {
    type = icons[type] ? type : "info";
    var t = document.createElement("div");
    t.className = "toast toast--" + type;
    t.setAttribute("role", type === "error" ? "alert" : "status");
    t.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true">' + icons[type] + "</svg>" +
      '<span class="toast-msg"></span>' +
      '<button type="button" class="toast-x" aria-label="Dismiss message">&#10005;</button>';
    t.querySelector(".toast-msg").textContent = message;
    holder().appendChild(t);

    var close = function () {
      if (!t.parentNode) return;
      t.classList.add("is-leaving");
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 250);
    };
    t.querySelector(".toast-x").addEventListener("click", close);
    setTimeout(close, ms || (type === "error" ? 8000 : 3500));
    return t;
  };

  /* connection lost / back */
  window.addEventListener("offline", function () {
    mvToast("You’re offline. Videos, maps and sign-up forms need a connection.", "error");
  });
  window.addEventListener("online", function () {
    mvToast("You’re back online.", "success");
  });
})();
