/* ============================================================
   MOVEMENT CHURCH - LOOPING VIDEOS
   Any <video data-loop> (the silent background clips) gets a
   small pause/play button, as accessibility guidelines ask for
   anything that moves for more than 5 seconds. They start paused
   for people who've turned on "reduce motion" on their device.
   Add data-sound to a talking video to give it a "Sound on" button.
   Add data-autoplay to a video player to start it (muted) when it
   scrolls into view.
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  Array.prototype.forEach.call(document.querySelectorAll("video[data-loop], video[data-autoplay]"), function (video) {
    /* the youth hero only loads its video on big screens; no video, no button */
    if (!video.getAttribute("src") && !video.querySelector("source")) return;
    var holder = video.parentNode;
    if (getComputedStyle(holder).position === "static") holder.style.position = "relative";

    /* players with their own controls (data-autoplay) don't need the extra pause button */
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "loop-btn";
    if (!video.hasAttribute("data-autoplay")) holder.appendChild(btn);

    function show() {
      var paused = video.paused;
      btn.setAttribute("aria-label", paused ? "Play background video" : "Pause background video");
      btn.innerHTML = paused
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
    }

    btn.addEventListener("click", function () {
      if (video.paused) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
      else video.pause();
    });
    video.addEventListener("play", show);
    video.addEventListener("pause", show);

    /* talking videos (data-sound) play silently with their captions; this
       button turns the sound on, starting the message from the top */
    if (video.hasAttribute("data-sound")) {
      var snd = document.createElement("button");
      snd.type = "button";
      snd.className = "sound-btn";
      holder.appendChild(snd);
      var started = false;
      var showSound = function () {
        snd.innerHTML = video.muted
          ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4zM16 9l5 6M21 9l-5 6"/></svg><span>Sound on</span>'
          : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg><span>Sound off</span>';
      };
      snd.addEventListener("click", function () {
        video.muted = !video.muted;
        if (!video.muted && !started) { started = true; video.currentTime = 0; }
        if (!video.muted && video.paused) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
        showSound();
      });
      showSound();
    }

    if (reduceMotion) { video.removeAttribute("autoplay"); video.pause(); }
    show();

    /* if the video file can't load, say so on the video itself */
    var failed = false;
    var onFail = function () {
      if (failed) return;
      failed = true;
      var msg = document.createElement("p");
      msg.className = "video-error";
      msg.setAttribute("role", "status");
      msg.textContent = "This video couldn’t load. Check your connection and refresh the page.";
      holder.appendChild(msg);
      if (btn.parentNode) btn.parentNode.removeChild(btn);
    };
    video.addEventListener("error", onFail);
    Array.prototype.forEach.call(video.querySelectorAll("source"), function (src) { src.addEventListener("error", onFail); });

    /* data-autoplay: start (muted) when it scrolls into view, pause when it
       leaves - so it only downloads for people who actually reach it */
    if (video.hasAttribute("data-autoplay") && !reduceMotion && "IntersectionObserver" in window) {
      video.muted = true;
      var userPaused = false;
      video.addEventListener("pause", function () { if (inView) userPaused = true; });
      video.addEventListener("play", function () { userPaused = false; });
      var inView = false;
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView && !userPaused) {
          if (video.preload === "none") video.preload = "auto";
          var p = video.play(); if (p && p.catch) p.catch(function () {});
        } else if (!inView && !video.paused) {
          video.pause(); userPaused = false;
        }
      }, { threshold: 0.35 }).observe(video);
    }
  });
})();
