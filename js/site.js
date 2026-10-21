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

  /* The photos glide across on their own (no sideways scrolling to fight
     with). They pause while hovered or keyboard-focused, while the photo
     viewer is open, and when the strip is off screen. With "reduce motion"
     on they stay still and can be swiped/scrolled instead. */
  if (rail) {
    var track = document.createElement("div");
    track.className = "rail-track";
    rail.appendChild(track);

    var makeCard = function (photo, index, copy) {
      var card = document.createElement("button");
      card.className = "rail-item";
      card.type = "button";
      card.innerHTML =
        '<img src="' + attr(photo.file) + '" alt="' + attr(plainText(photo.alt || photo.caption)) + '" draggable="false" loading="lazy">' +
        '<span class="zoom" aria-hidden="true">+</span>' +
        '<figcaption>' + photo.caption + '</figcaption>';
      if (copy) {
        /* the second set is only there to make the loop seamless */
        card.setAttribute("aria-hidden", "true");
        card.tabIndex = -1;
      } else {
        card.setAttribute("role", "listitem");
        card.setAttribute("aria-label", "Enlarge photo: " + plainText(photo.caption));
      }
      card.addEventListener("click", function () { openViewer(index); });
      track.appendChild(card);
    };
    PHOTOS.forEach(function (p, i) { makeCard(p, i, false); });

    if (!reduceMotion) {
      PHOTOS.forEach(function (p, i) { makeCard(p, i, true); });
      rail.classList.add("is-auto");

      var x = 0, speed = 0, last = 0, hovering = false, visible = true;
      var TOP_SPEED = 38;                                   // pixels per second
      var loopWidth = function () { return track.scrollWidth / 2; };

      rail.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hovering = true; });
      rail.addEventListener("pointerleave", function () { hovering = false; });

      /* keyboard: bring the focused photo into view */
      rail.addEventListener("focusin", function (e) {
        var card = e.target.closest(".rail-item");
        if (!card) return;
        var left = card.offsetLeft + x, right = left + card.offsetWidth;
        if (left < 0 || right > rail.clientWidth) x = -(card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2);
        track.style.transform = "translate3d(" + x + "px,0,0)";
      });

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(rail);
      }

      var tick = function (t) {
        var dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
        last = t;
        var paused = hovering || rail.contains(document.activeElement) ||
                     (viewer && viewer.hasAttribute("open")) || !visible || document.hidden;
        speed += ((paused ? 0 : TOP_SPEED) - speed) * Math.min(dt * 4, 1);   // ease to a stop and back
        if (speed > 0.05) {
          var w = loopWidth();
          x -= speed * dt;
          if (w && -x >= w) x += w;
          if (x > 0) x -= w;
          track.style.transform = "translate3d(" + x.toFixed(2) + "px,0,0)";
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
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
    viewerImg.alt = plainText(photo.alt || photo.caption);
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
        '<span class="tile-img"><img src="' + attr(item.photo) + '" alt="' + attr(item.alt ? plainText(item.alt) : plainText(item.name) + " at Movement Church") + '" loading="lazy"></span>' +
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
