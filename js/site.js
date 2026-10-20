/* ============================================================
   MOVEMENT CHURCH — BEHAVIOUR
   ------------------------------------------------------------
   This file makes things move. You shouldn't need to edit it to
   change words or photos — those all live in js/content.js.

   Four things happen here:
     1. the big word cycles through photos
     2. the photo rail drags, and opens a viewer
     3. the "first Sunday" planner updates as you click
     4. the ministry tiles open and close

   Plain JavaScript. No jQuery, no framework, no build step.
   ============================================================ */

(function () {
  "use strict";

  /* Everything comes from js/content.js */
  var C = window.CONTENT || {};
  var PHOTOS = C.photos || [];
  var PLANS = C.plans || [];
  var SERVICES = C.services || [];
  var MINISTRIES = C.ministries || [];
  var SERVICE_LENGTH = C.serviceLength || "about 70 minutes";

  /* Respect the visitor's "reduce motion" setting */
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Turn "A &mdash; B" into plain text, for alt text and labels */
  function plainText(html) {
    var box = document.createElement("div");
    box.innerHTML = String(html == null ? "" : html);
    return box.textContent || "";
  }

  /* Make a string safe to drop inside an HTML attribute */
  function attr(value) {
    return String(value == null ? "" : value).replace(/"/g, "&quot;");
  }


  /* ==========================================================
     1. THE BIG WORD
     The <span>s are already in index.html. We just swap which
     one is visible every few seconds; CSS does the fade.
     ========================================================== */
  var wordLayers = document.querySelectorAll("#word .word-layer");

  if (wordLayers.length > 1 && !reduceMotion) {
    var currentLayer = 0;

    setInterval(function () {
      if (document.hidden) return;           // don't animate in a background tab
      wordLayers[currentLayer].classList.remove("is-on");
      currentLayer = (currentLayer + 1) % wordLayers.length;
      wordLayers[currentLayer].classList.add("is-on");
    }, 3800);                                 // 3.8 seconds per photo
  }


  /* ==========================================================
     2. THE PHOTO RAIL
     ========================================================== */
  var rail = document.getElementById("rail");
  var didDrag = false;    // true while dragging, so a drag doesn't open the viewer

  if (rail) {
    PHOTOS.forEach(function (photo, index) {
      var card = document.createElement("button");
      card.className = "rail-item";
      card.type = "button";
      card.setAttribute("role", "listitem");
      card.setAttribute("aria-label", "Enlarge photo: " + plainText(photo.caption));

      card.innerHTML =
        '<img src="' + attr(photo.file) + '" alt="' + attr(plainText(photo.caption)) + '" draggable="false" loading="lazy">' +
        '<span class="zoom" aria-hidden="true">+</span>' +
        '<figcaption>' + photo.caption + '</figcaption>';

      card.addEventListener("click", function () {
        if (!didDrag) openViewer(index);
      });

      rail.appendChild(card);
    });

    /* Drag with the mouse. Touch screens scroll on their own. */
    var isDown = false;
    var startX = 0;
    var startScroll = 0;

    rail.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return;
      isDown = true;
      didDrag = false;
      startX = e.clientX;
      startScroll = rail.scrollLeft;
      rail.classList.add("is-dragging");
    });

    window.addEventListener("pointermove", function (e) {
      if (!isDown) return;
      var moved = e.clientX - startX;
      if (Math.abs(moved) > 4) didDrag = true;   // 4px of slop, so a shaky click still counts as a click
      rail.scrollLeft = startScroll - moved;
    });

    window.addEventListener("pointerup", function () {
      if (!isDown) return;
      isDown = false;
      rail.classList.remove("is-dragging");
      setTimeout(function () { didDrag = false; }, 0);
    });
  }


  /* ==========================================================
     3. THE PHOTO VIEWER (lightbox)
     ========================================================== */
  var viewer = document.getElementById("lb");
  var viewerImg = document.getElementById("lbImg");
  var viewerCap = document.getElementById("lbCap");
  var viewerClose = document.getElementById("lbX");
  var viewerPrev = document.getElementById("lbPrev");
  var viewerNext = document.getElementById("lbNext");

  var viewerIndex = 0;
  var focusBeforeViewer = null;

  function paintViewer() {
    var photo = PHOTOS[viewerIndex];
    if (!photo) return;
    viewerImg.src = photo.file;
    viewerImg.alt = plainText(photo.caption);
    viewerCap.innerHTML = photo.caption;
  }

  function openViewer(index) {
    if (!viewer) return;
    viewerIndex = index;
    focusBeforeViewer = document.activeElement;
    paintViewer();
    viewer.setAttribute("open", "");
    document.body.style.overflow = "hidden";    // stop the page scrolling behind
    viewerClose.focus();
  }

  function closeViewer() {
    viewer.removeAttribute("open");
    document.body.style.overflow = "";
    if (focusBeforeViewer && focusBeforeViewer.focus) focusBeforeViewer.focus();
  }

  function stepViewer(direction) {
    viewerIndex = (viewerIndex + direction + PHOTOS.length) % PHOTOS.length;
    paintViewer();
  }

  if (viewer) {
    viewerClose.addEventListener("click", closeViewer);
    viewerPrev.addEventListener("click", function () { stepViewer(-1); });
    viewerNext.addEventListener("click", function () { stepViewer(1); });

    /* Click the dark area to close */
    viewer.addEventListener("click", function (e) {
      if (e.target === viewer) closeViewer();
    });

    /* Esc closes, arrow keys move */
    document.addEventListener("keydown", function (e) {
      if (!viewer.hasAttribute("open")) return;
      /* keep Tab inside the open viewer */
      if (e.key === "Tab") {
        var f = viewer.querySelectorAll("button:not([hidden])");
        if (f.length) {
          var first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
          else if (!viewer.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
        }
        return;
      }
      if (e.key === "Escape") closeViewer();
      else if (e.key === "ArrowLeft") stepViewer(-1);
      else if (e.key === "ArrowRight") stepViewer(1);
    });
  }


  /* ==========================================================
     4. THE "BUILD YOUR FIRST SUNDAY" PLANNER
     ========================================================== */
  var whoOpts = document.getElementById("whoOpts");
  var svcOpts = document.getElementById("svcOpts");
  var planImg = document.getElementById("planImg");
  var planTitle = document.getElementById("planTitle");
  var planBadge = document.getElementById("planBadge");
  var outArrive = document.getElementById("fArrive");
  var outWalk = document.getElementById("fWalk");
  var outKids = document.getElementById("fKids");
  var outOut = document.getElementById("fOut");
  var planNote = document.getElementById("planNote");

  var chosenPlan = 0;
  var chosenService = 0;

  /* Build one row of buttons */
  function buildOptions(host, list, getChosen, setChosen) {
    if (!host) return;

    list.forEach(function (item, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "opt";
      button.textContent = plainText(item.label);
      button.setAttribute("aria-pressed", index === getChosen() ? "true" : "false");

      button.addEventListener("click", function () {
        setChosen(index);
        var all = host.querySelectorAll(".opt");
        for (var i = 0; i < all.length; i++) {
          all[i].setAttribute("aria-pressed", i === index ? "true" : "false");
        }
        paintPlan();
      });

      host.appendChild(button);
    });
  }

  buildOptions(whoOpts, PLANS,
    function () { return chosenPlan; },
    function (i) { chosenPlan = i; });

  buildOptions(svcOpts, SERVICES,
    function () { return chosenService; },
    function (i) { chosenService = i; });

  /* Fill the card from whatever is currently chosen */
  function paintPlan() {
    var plan = PLANS[chosenPlan];
    var service = SERVICES[chosenService];
    if (!plan || !service || !planImg) return;

    /* Fade the photo out and back in when it changes */
    if (plan.photo && planImg.getAttribute("src") !== plan.photo) {
      planImg.style.opacity = "0";
      setTimeout(function () {
        planImg.src = plan.photo;
        planImg.style.opacity = "1";
      }, reduceMotion ? 0 : 160);
    }

    planImg.alt = plainText(plan.title) + " at Movement Church";
    planBadge.textContent = plainText(service.label) + " service";
    planTitle.textContent = plainText(plan.title);

    outArrive.innerHTML = "<b>" + service.arrive + "</b> &mdash; 15 minutes early is plenty. Parking is free.";
    outWalk.innerHTML = plan.walk;
    outKids.innerHTML = plan.kids;
    outOut.innerHTML = "<b>" + service.out + "</b> &mdash; the service runs " + SERVICE_LENGTH + ".";
    planNote.innerHTML = plan.note;
  }

  if (PLANS.length && SERVICES.length) paintPlan();


  /* ==========================================================
     5. THE MINISTRY TILES
     First tap opens the tile. Second tap follows the link.
     ========================================================== */
  var tiles = document.getElementById("tiles");

  if (tiles) {
    MINISTRIES.forEach(function (item) {
      var tile = document.createElement("button");
      tile.type = "button";
      tile.className = "tile";
      tile.setAttribute("aria-expanded", "false");

      tile.innerHTML =
        '<span class="tile-plus" aria-hidden="true">+</span>' +
        '<span class="tile-img"><img src="' + attr(item.photo) + '" alt="' + attr(plainText(item.name)) + ' at Movement Church" loading="lazy"></span>' +
        '<span class="tile-cap">' +
          '<span class="tile-age">' + item.age + '</span>' +
          '<h3>' + item.name + '</h3>' +
          '<span class="tile-more">' +
            '<p>' + item.text + '</p>' +
            '<span>Visit the ' + plainText(item.name) + ' page &#8599;</span>' +
          '</span>' +
        '</span>';

      tile.addEventListener("click", function () {
        var alreadyOpen = tile.getAttribute("aria-expanded") === "true";

        if (alreadyOpen && item.url) {
          window.location.href = item.url;
          return;
        }

        /* Close the others, open this one */
        var all = tiles.querySelectorAll(".tile");
        for (var i = 0; i < all.length; i++) {
          all[i].setAttribute("aria-expanded", "false");
        }
        tile.setAttribute("aria-expanded", "true");
      });

      tiles.appendChild(tile);
    });
  }

})();
