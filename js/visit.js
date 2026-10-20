/* ============================================================
   MOVEMENT CHURCH - VISIT PAGE: INTERACTIVE BUILDING MAP
   ------------------------------------------------------------
   The map is the floor plan (img/floor-plan.png) with clickable
   room shapes drawn over it. Pick a room on the map or from the
   list, and it lights up, shows a card, and draws the walk to it
   from the front doors.

   TO EDIT A ROOM: change its entry in PLACES below.
     name   – what it's called
     group  – "welcome", "worship", "kids", "youth" or "other" (sets its colour)
     text   – one or two sentences for the card
     photo  – optional, any image in img/
     shape  – the outline, in floor-plan pixels (see note below)
     label  – where the name sits on the map  [x, y]
     labelWide – optional: a different spot for the sideways desktop map only
     labelVertical – true turns the label on its side on the upright phone map
              (for long, thin spaces like hallways)
     route  – the walk from the front doors, as [x, y] points
     hidden – true leaves it off the buttons under the map (it still shows,
              labelled and clickable, on the map itself)

   EASIEST WAY TO DRAW A SHAPE: open visit.html?edit in the browser,
   click the room's corners on the map, and copy the shape it gives you
   (see SHAPE EDITOR at the bottom of this file).
     small  – true uses a smaller label, for small spaces (two words or more
              go on two lines)
     labelScale – optional, e.g. 0.85 makes just this label 15% smaller
     chip   – true puts the label on a solid pill, for labels over busy areas

   Coordinates are pixels on the original floor-plan PDF rendered
   1553 px wide: x runs left to right, y runs top (stage) to bottom.
   ============================================================ */

(function () {
  "use strict";

  /* The walk every route starts with: canopy -> front doors -> lobby */
  var FROM_DOORS = [[400, 1015], [548, 975], [860, 975]];
  /* ...then down the main hallway to a given height */
  function hall(y) { return FROM_DOORS.concat([[900, 1150], [860, 1258], [860, y]]); }

  var PLACES = [
    {
      id: "entrance", name: "Main entrance", group: "welcome",
      text: "Front doors. There&rsquo;s a team in lanyards who will spot you and walk you in.",
      photo: "img/place-doors.jpg",
      shape: "M287,877 L545,877 L545,1153 L287,1153 Z", label: [416, 1015],
      route: [[400, 1015], [548, 975]]
    },
    {
      id: "lobby", name: "Lobby", group: "welcome",
      text: "Just inside the front doors. The auditorium doors are straight ahead.",
      photo: "img/place-auditorium-doors.jpg",
      shape: "M548,898 L1003,898 L1003,968 L1168,968 L1168,1050 L1001,1050 L1001,1240 L1019,1240 L1019,1300 L961,1300 L961,1240 L903,1240 L903,1244 L822,1244 L822,1050 L548,1050 Z", label: [860, 975],
      route: FROM_DOORS
    },
    {
      id: "auditorium", name: "Auditorium", group: "worship",
      text: "Where Sunday services happen, at 9:00 and 11:00 AM. Sit wherever you want.",
      photo: "img/place-auditorium.jpg",
      shape: "M482,255 L592,250 Q861,385 1130,250 L1243,255 L1243,888 L482,888 Z", label: [861, 620],
      route: FROM_DOORS.concat([[860, 895], [860, 700]])
    },
    {
      id: "stage", name: "Stage", group: "worship",
      text: "Where the band leads worship and the message is shared.",
      shape: "M592,250 L620,172 L620,95 L1105,95 L1105,175 L1130,250 Q861,385 592,250 Z", label: [861, 205],
      route: FROM_DOORS.concat([[860, 895], [860, 380]])
    },
    {
      id: "backstage", name: "Backstage", group: "worship", hidden: true,
      text: "Behind the stage, where the band and production team get ready. Team only.",
      shape: "M485,52 L1240,52 L1240,250 L1130,250 L1105,175 L1105,95 L620,95 L620,172 L592,250 L485,250 Z", label: [540, 160], small: true,
      route: FROM_DOORS.concat([[860, 895], [860, 760], [1190, 640], [1190, 230]])
    },
    {
      id: "hallway", name: "Kids Hallway", group: "kids",
      text: "Home to Movement Kids. Check in at the kiosk just inside the lobby, then head down here.",
      shape: "M903,1244 L903,2325 L820,2325 L820,2028 L794,2003 L794,1722 L819,1697 L819,1244 Z", label: [861, 1824], labelVertical: true,
      route: hall(2300)
    },

    {
      id: "cafe", name: "Caf\u00e9", group: "welcome",
      text: "The coffee corner in the lobby. Grab a coffee before you find your seats.",
      photo: "img/place-cafe.jpg",
      shape: "M1003,900 L1166,900 L1166,968 L1003,968 Z", label: [1085, 934],
      route: FROM_DOORS.concat([[1000, 950]])
    },
    {
      id: "welcome-desk", name: "Welcome desk", group: "welcome",
      text: "Guest Services. Our team is here to answer any questions you may have.",
      photo: "img/place-guest-services.jpg",
      shape: "M738,1052 L822,1052 L822,1208 L790,1208 L776,1180 L738,1116 Z", label: [784, 1120], small: true,
      route: FROM_DOORS.concat([[780, 1040]])
    },
    {
      id: "offices", name: "Offices", group: "other",
      text: "The church offices.",
      shape: "M547,1057 L738,1057 L738,1116 L776,1180 L790,1208 L816,1208 L816,1398 L547,1398 Z", label: [660, 1240],
      route: FROM_DOORS.concat([[640, 1050]])
    },

    /* ---- Rooms still to be named: tell the web team what each number is ---- */
    { id: "r5", name: "2s & 3s", group: "kids", text: "Movement Kids room for 2 and 3 year olds.", shape: "M664,1410 L819,1410 L819,1697 L794,1722 L664,1722 Z", label: [740, 1564], route: hall(1632).concat([[819, 1632]]) },
    { id: "r6", name: "Nursery", group: "kids", text: "The Movement Kids nursery, for our littlest ones.", shape: "M462,1722 L726,1722 L726,1776 L794,1776 L794,1906 L608,1906 L578,1936 L462,1936 Z", label: [600, 1830], route: hall(1804).concat([[794, 1804]]) },
    { id: "kids-bathroom", name: "Kids Bathroom", group: "kids", small: true, text: "A bathroom just for kids, inside the kids\u2019 area.", shape: "M728,1722 L794,1722 L794,1774 L728,1774 Z", label: [761, 1748], route: hall(1804).concat([[794, 1804], [712, 1792], [712, 1736], [728, 1736]]) },
    { id: "r7", name: "Storage Closet", group: "other", hidden: true, small: true, text: "Staff only.", shape: "M462,1938 L576,1938 L576,2004 L462,2004 Z", label: [519, 1971], route: hall(1804).concat([[794, 1804], [600, 1880], [562, 1925], [562, 1950]]) },
    { id: "r8", name: "4s & 5s", group: "kids", text: "Movement Kids room for 4 and 5 year olds.", shape: "M610,1908 L794,1908 L794,2003 L580,2003 L580,1938 Z", label: [690, 1956], route: hall(1928).concat([[794, 1928]]) },
    { id: "r9", name: "Club 56", group: "youth", text: "Grades 5 &amp; 6 head to Club 56 during the service.", shape: "M664,2003 L794,2003 L820,2028 L820,2325 L664,2325 Z", label: [740, 2167], route: hall(2134).concat([[820, 2134]]) },
    { id: "r10", name: "Kids Auditorium", group: "kids", text: "Where Movement Kids gathers during both services.", shape: "M905,1402 L1275,1402 L1275,2003 L905,2003 Z", label: [1090, 1705], route: hall(1570).concat([[905, 1570]]) },
    { id: "r11", name: "Kitchen", group: "other", small: true, text: "The church kitchen.", shape: "M907,2007 L1061,2007 L1061,2105 L907,2105 Z", label: [984, 2056], route: hall(1870).concat([[905, 1870], [1037, 1975], [1037, 2015]]) },
    { id: "r12", name: "Offices", group: "other", small: true, text: "Staff offices.", shape: "M907,2109 L1061,2109 L1061,2218 L907,2218 Z", label: [984, 2163], labelWide: [1022, 2163], route: hall(2204).concat([[905, 2204]]) },
    { id: "r13", name: "Kids Bathroom", group: "kids", small: true, text: "A bathroom just for kids, off the Kids Hallway.", shape: "M907,2222 L1061,2222 L1061,2326 L907,2326 Z", label: [984, 2274], route: hall(2240).concat([[905, 2240]]) },
    { id: "family-bathroom", name: "Family Bathroom", group: "other", small: true, labelScale: 0.85, text: "A private bathroom with room for the whole family.", shape: "M906,1242 L959,1242 L959,1298 L906,1298 Z", label: [932, 1270], route: FROM_DOORS.concat([[900, 1150], [990, 1270], [961, 1283]]) },
    { id: "janitorial", name: "Janitorial Closet", group: "other", hidden: true, small: true, text: "Staff only.", shape: "M906,1302 L981,1302 L981,1398 L906,1398 Z", label: [944, 1350], route: hall(1320).concat([[905, 1320]]) },
    { id: "r15", name: "Utility Room", group: "other", hidden: true, small: true, text: "Furnace and electrical. Staff only.", shape: "M986,1302 L1168,1302 L1168,1398 L986,1398 Z", label: [1077, 1350], route: FROM_DOORS.concat([[900, 1150], [990, 1270], [1004, 1290], [1004, 1314]]) },
    { id: "wr1", name: "Women's Bathroom", group: "other", text: "Just off the lobby.", shape: "M1003,1059 L1063,1059 L1063,1094 L1067,1094 L1067,1059 L1165,1059 L1167,1175 L1020,1175 L1020,1136 L1036,1136 L1036,1088 L1030,1088 L1030,1109 L1003,1109", label: [1110, 1117], small: true, route: FROM_DOORS.concat([[1080, 1040]]) },
    { id: "wr2", name: "Men's Bathroom", group: "other", text: "Just off the lobby.", shape: "M1019,1269 L1019,1181 L1112,1181 L1112,1244 L1116,1244 L1116,1181 L1168,1181 L1168,1298 L1053,1298 L1053,1264 L1049,1264 L1049,1298 L1021,1298 L1019,1298", label: [1078, 1238], small: true, route: FROM_DOORS.concat([[900, 1150], [990, 1270], [1032, 1282]]) }
  ];

  /* The floor-plan image covers this area of the original drawing */
  var PLAN = { x: 270, y: 25, w: 1020, h: 2375 };

  /* A place without a "label" gets its name in the middle of its corners */
  PLACES.forEach(function (p) {
    if (p.label) return;
    var pts = (p.shape.match(/-?[\d.]+,-?[\d.]+/g) || []).map(function (xy) { return xy.split(",").map(Number); });
    var cx = 0, cy = 0;
    pts.forEach(function (q) { cx += q[0]; cy += q[1]; });
    p.label = pts.length ? [Math.round(cx / pts.length), Math.round(cy / pts.length)] : [0, 0];
  });
  var NS = "http://www.w3.org/2000/svg";

  var mapBox = document.getElementById("mapCanvas");
  var listBox = document.getElementById("placeList");
  var card = document.getElementById("placeCard");
  if (!mapBox || !listBox || !card) return;

  var svg, rotGroup, routeLine, routeDot, labelsGroup, hereMark;
  var shapes = {}, labels = {}, buttons = {}, chips = {};
  var current = null;
  var wide = window.matchMedia("(min-width: 900px)");

  function el(name, attrs, parent) {
    var node = document.createElementNS(NS, name);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  /* "Women's Bathroom" -> ["Women's", "Bathroom"]: split where the two lines come out
     closest in length. Only for small labels; others stay on one line. */
  function labelLines(p) {
    var name = p.name.replace(/&rsquo;/g, "\u2019");
    var words = name.split(" ");
    if (!p.small || words.length < 2) return [name];
    var best = 1, bestDiff = Infinity;
    for (var i = 1; i < words.length; i++) {
      var diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
      if (diff < bestDiff) { bestDiff = diff; best = i; }
    }
    return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
  }

  /* Shrink any label that's wider or taller than its room (in whichever
     way the map is currently turned), down to a readable minimum. */
  function fitLabels() {
    PLACES.forEach(function (p) {
      var text = labels[p.id];
      if (!text || !text.getBBox) return;
      text.style.fontSize = "";                       // back to the CSS size first
      var pts = (p.shape.match(/-?[\d.]+,-?[\d.]+/g) || []).map(function (xy) { return place(xy.split(",").map(Number)); });
      if (!pts.length) return;
      var xs = pts.map(function (q) { return q[0]; }), ys = pts.map(function (q) { return q[1]; });
      var roomW = Math.max.apply(null, xs) - Math.min.apply(null, xs);
      var roomH = Math.max.apply(null, ys) - Math.min.apply(null, ys);
      var box;
      try { box = text.getBBox(); } catch (e) { return; }
      if (!box.width) return;
      var size = parseFloat(getComputedStyle(text).fontSize) || 26;
      if (text.getAttribute("transform")) { var t = roomW; roomW = roomH; roomH = t; }   // label is turned on its side
      var fit = Math.min(1, (roomW * 0.9) / box.width, (roomH * 0.9) / box.height) * (p.labelScale || 1);
      if (fit < 1) text.style.fontSize = Math.max(12, Math.floor(size * fit)) + "px";
    });
  }

  /* Fit each pill snugly around its label */
  function sizeChips() {
    Object.keys(chips).forEach(function (id) {
      var box;
      try { box = labels[id].getBBox(); } catch (e) { return; }
      if (!box.width) return;
      var padX = box.height * 0.55, padY = box.height * 0.22;
      chips[id].setAttribute("x", box.x - padX);
      chips[id].setAttribute("y", box.y - padY);
      chips[id].setAttribute("width", box.width + padX * 2);
      chips[id].setAttribute("height", box.height + padY * 2);
      chips[id].setAttribute("rx", (box.height + padY * 2) / 2);
    });
  }

  /* On wide screens the building is turned on its side so it fits
     the page: (x, y) on the plan becomes (y, -x). */
  function place(pt) {
    return wide.matches ? [pt[1], -pt[0]] : pt;
  }

  function layout() {
    if (wide.matches) {
      svg.setAttribute("viewBox", [PLAN.y, -(PLAN.x + PLAN.w), PLAN.h, PLAN.w].join(" "));
      rotGroup.setAttribute("transform", "rotate(-90)");
    } else {
      svg.setAttribute("viewBox", [PLAN.x, PLAN.y, PLAN.w, PLAN.h].join(" "));
      rotGroup.removeAttribute("transform");
    }
    PLACES.forEach(function (p) {
      var xy = place(wide.matches && p.labelWide ? p.labelWide : p.label);
      labels[p.id].setAttribute("x", xy[0]);
      labels[p.id].setAttribute("y", xy[1]);
      /* each line has to be told where to start too */
      Array.prototype.forEach.call(labels[p.id].querySelectorAll("tspan"), function (span) {
        span.setAttribute("x", xy[0]);
      });
      if (p.labelVertical && !wide.matches) labels[p.id].setAttribute("transform", "rotate(-90 " + xy[0] + " " + xy[1] + ")");
      else labels[p.id].removeAttribute("transform");
    });
    fitLabels();
    sizeChips();
    var here = place([400, 1015]);
    hereMark.setAttribute("transform", "translate(" + here[0] + "," + here[1] + ")");
    mapBox.classList.toggle("is-wide", wide.matches);
  }

  /* ---- build the map ---- */
  svg = el("svg", { "class": "map-svg", role: "img", "aria-label": "Floor plan of Movement Church" });
  rotGroup = el("g", {}, svg);
  var roomsGroup = el("g", { "class": "map-rooms" }, rotGroup);
  var planImg = el("image", { href: "img/floor-plan.png", x: PLAN.x, y: PLAN.y, width: PLAN.w, height: PLAN.h, "class": "map-plan" }, rotGroup);
  planImg.addEventListener("error", function () {
    var msg = document.createElement("p");
    msg.className = "map-error";
    msg.setAttribute("role", "status");
    msg.textContent = "The floor plan couldn’t load. Refresh the page to try again — the list of places below still works.";
    mapBox.appendChild(msg);
  });
  routeLine = el("polyline", { "class": "map-route", fill: "none" }, rotGroup);
  routeDot = el("circle", { "class": "map-route-end", r: 16 }, rotGroup);
  labelsGroup = el("g", { "class": "map-labels", "aria-hidden": "true" }, svg);

  /* "You are here" pulse at the front doors */
  hereMark = el("g", { "class": "map-here", "aria-hidden": "true" }, svg);
  el("circle", { r: 34, "class": "map-here-pulse" }, hereMark);
  el("circle", { r: 15, "class": "map-here-dot" }, hereMark);

  PLACES.forEach(function (p) {
    var shape = el("path", { d: p.shape, "class": "map-room map-room--" + p.group, "data-id": p.id }, roomsGroup);
    shape.addEventListener("click", function () { if (!mapBox.classList.contains("is-editing")) select(p.id, true); });
    shape.addEventListener("mouseenter", function () { mapBox.classList.add("is-hovering"); shape.classList.add("is-hover"); labels[p.id].classList.add("is-hover"); });
    shape.addEventListener("mouseleave", function () { mapBox.classList.remove("is-hovering"); shape.classList.remove("is-hover"); labels[p.id].classList.remove("is-hover"); });
    shapes[p.id] = shape;

    if (p.chip) chips[p.id] = el("rect", { "class": "map-chip map-chip--" + p.group }, labelsGroup);
    var text = el("text", { "class": "map-label map-label--" + p.group + (p.small ? " map-label--small" : "") + (p.chip ? " map-label--chip" : ""), "text-anchor": "middle", "dominant-baseline": "middle" }, labelsGroup);
    /* small labels with more than one word go on two balanced lines */
    labelLines(p).forEach(function (line, i, all) {
      var span = el("tspan", { dy: i === 0 ? (-(all.length - 1) * 0.55) + "em" : "1.1em" }, text);
      span.textContent = line;
    });
    labels[p.id] = text;

    /* the list (this is also how keyboard and screen-reader users choose) */
    if (p.hidden) return;
    var li = document.createElement("li");
    var b = document.createElement("button");
    b.type = "button";
    b.className = "place-btn place-btn--" + p.group;
    b.innerHTML = p.name;
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", function () { select(p.id, false); });
    li.appendChild(b);
    listBox.appendChild(li);
    buttons[p.id] = b;
  });

  mapBox.appendChild(svg);
  layout();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fitLabels(); sizeChips(); });
  if (wide.addEventListener) wide.addEventListener("change", function () { layout(); if (current) drawRoute(current); });

  /* ---- choosing a place ---- */
  function drawRoute(p) {
    var pts = (p.route || []).map(function (pt) { return pt.join(","); }).join(" ");
    routeLine.setAttribute("points", pts);
    var last = p.route && p.route[p.route.length - 1];
    if (last) { routeDot.setAttribute("cx", last[0]); routeDot.setAttribute("cy", last[1]); }
    /* restart the "walking" animation */
    routeLine.classList.remove("is-on");
    routeDot.classList.remove("is-on");
    void routeLine.getBoundingClientRect();
    var len = 0;
    try { len = routeLine.getTotalLength(); } catch (e) {}
    routeLine.style.setProperty("--len", len || 2000);
    routeLine.classList.add("is-on");
    routeDot.classList.add("is-on");
  }

  function select(id, fromMap) {
    var p = PLACES.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    if (current) {
      shapes[current.id].classList.remove("is-on");
      labels[current.id].classList.remove("is-on");
      if (chips[current.id]) chips[current.id].classList.remove("is-on");
      if (buttons[current.id]) buttons[current.id].setAttribute("aria-pressed", "false");
    }
    current = p;
    shapes[id].classList.add("is-on");
    labels[id].classList.add("is-on");
    if (chips[id]) chips[id].classList.add("is-on");
    if (buttons[id]) buttons[id].setAttribute("aria-pressed", "true");
    drawRoute(p);

    card.innerHTML =
      (p.photo ? '<img class="place-photo" src="' + p.photo + '" alt="' + p.name.replace(/"/g, "&quot;") + ' at Movement Church">' : "") +
      '<div class="place-body">' +
        '<span class="place-tag place-tag--' + p.group + '">' + groupName(p.group) + "</span>" +
        "<h3>" + p.name + "</h3>" +
        "<p>" + (p.text || "") + "</p>" +
        (p.route && p.route.length > 2 ? '<p class="place-hint"><span class="place-hint-line" aria-hidden="true"></span> The orange line shows the walk from the front doors.</p>' : "") +
      "</div>";
    card.classList.remove("is-empty");
    card.classList.remove("is-in");
    void card.offsetWidth;
    card.classList.add("is-in");

    /* on phones, picking from the map brings the card into view */
    if (fromMap && !wide.matches) {
      if (window.mvLenis) window.mvLenis.scrollTo(card, { offset: -100 });
      else card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function groupName(g) {
    return { welcome: "Welcome", worship: "Worship", kids: "Kids", youth: "Youth", other: "Building" }[g] || "Building";
  }

  /* start on the front doors, so the first thing you see is where you'll walk in -
     unless the link asked for a room, e.g. visit.html#map-r6 opens the Nursery */
  var asked = (location.hash.match(/^#map-(.+)$/) || [])[1];
  if (asked && shapes[asked]) {
    select(asked, false);
    setTimeout(function () {
      /* go through the smooth scroller when it's running (js/scroll.js) */
      if (window.mvLenis) window.mvLenis.scrollTo(mapBox, { offset: -120 });
      else mapBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  } else {
    select("entrance", false);
  }


  /* ==========================================================
     SHAPE EDITOR - open the page as visit.html?edit
     Click the corners of a room on the map, in order, then copy
     the shape text into that room's "shape" in PLACES above.
     The label spot shows too (the middle of your corners).
     ========================================================== */
  if (!/[?&]edit\b/.test(location.search)) return;

  mapBox.classList.add("is-editing");
  var pts = [];
  var editLine = el("polygon", { "class": "map-edit-shape" }, rotGroup);
  var editDots = el("g", {}, rotGroup);
  var panel = document.createElement("div");
  panel.className = "map-editor";
  panel.innerHTML =
    "<strong>Shape editor</strong>" +
    "<p>Click the corners of a room in order. Then copy the shape into that room in js/visit.js.</p>" +
    '<code id="edShape">Click the map to start</code>' +
    '<code id="edLabel"></code>' +
    '<div class="map-editor-btns">' +
      '<button type="button" id="edCopy">Copy shape</button>' +
      '<button type="button" id="edUndo">Undo</button>' +
      '<button type="button" id="edClear">Clear</button>' +
    "</div>";
  document.body.appendChild(panel);
  var shapeOut = panel.querySelector("#edShape");
  var labelOut = panel.querySelector("#edLabel");

  function shapeText() {
    return pts.length ? "M" + pts.map(function (p) { return p.join(","); }).join(" L") + " Z" : "";
  }
  function redraw() {
    editLine.setAttribute("points", pts.map(function (p) { return p.join(","); }).join(" "));
    editDots.innerHTML = "";
    pts.forEach(function (p) { el("circle", { cx: p[0], cy: p[1], r: 2.5, "class": "map-edit-dot" }, editDots); });
    shapeOut.textContent = pts.length ? 'shape: "' + shapeText() + '",' : "Click the map to start";
    if (pts.length) {
      var cx = 0, cy = 0;
      pts.forEach(function (p) { cx += p[0]; cy += p[1]; });
      labelOut.textContent = "label: [" + Math.round(cx / pts.length) + ", " + Math.round(cy / pts.length) + "],";
    } else {
      labelOut.textContent = "";
    }
  }

  /* turn a click into floor-plan pixels (works whichever way the map is turned) */
  svg.addEventListener("click", function (e) {
    var m = rotGroup.getScreenCTM();
    if (!m) return;
    var pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    var p = pt.matrixTransform(m.inverse());
    pts.push([Math.round(p.x), Math.round(p.y)]);
    redraw();
  }, true);

  panel.querySelector("#edUndo").addEventListener("click", function () { pts.pop(); redraw(); });
  panel.querySelector("#edClear").addEventListener("click", function () { pts = []; redraw(); });
  panel.querySelector("#edCopy").addEventListener("click", function () {
    var txt = shapeText();
    if (!txt) return;
    var btn = this;
    var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy shape"; }, 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () { window.prompt("Copy this:", txt); });
    else window.prompt("Copy this:", txt);
  });
})();
