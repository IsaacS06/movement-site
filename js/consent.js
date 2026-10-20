/* ============================================================
   MOVEMENT CHURCH - COOKIE CONSENT + GOOGLE ANALYTICS
   ------------------------------------------------------------
   Google Analytics only loads after a visitor clicks "Accept".
   Their choice is remembered on their device. The "Cookie
   settings" link in every footer opens the banner again.

   SET YOUR ID: replace G-XXXXXXXXXX below with your Google
   Analytics 4 measurement ID (Admin > Data streams > Web).
   Until then, nothing is sent to Google.
   ============================================================ */

(function () {
  "use strict";

  var GA_ID = "G-XXXXXXXXXX";
  var KEY = "mvConsent";            // "granted" or "denied"
  var hasId = /^G-[A-Z0-9]+$/.test(GA_ID) && GA_ID !== "G-XXXXXXXXXX";

  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  /* ---- Google Analytics, loaded only with consent ---- */
  var gaLoaded = false;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function loadAnalytics() {
    if (!hasId || gaLoaded) return;
    gaLoaded = true;
    gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    gtag("js", new Date());
    gtag("config", GA_ID);
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
  }

  function stopAnalytics() {
    if (gaLoaded) gtag("consent", "update", { analytics_storage: "denied" });
    /* remove any Google Analytics cookies already set */
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (/^_ga/.test(name)) {
        var host = location.hostname.replace(/^www\./, "");
        ["", "; domain=" + location.hostname, "; domain=." + host].forEach(function (d) {
          document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d;
        });
      }
    });
  }

  /* ---- the banner ---- */
  var banner;
  function showBanner() {
    if (banner) { banner.hidden = false; banner.querySelector("button").focus(); return; }
    banner = document.createElement("div");
    banner.className = "consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Cookie choices");
    banner.innerHTML =
      '<p><strong>Cookies, just for counting visits.</strong> With your OK we use Google Analytics to see which pages are helpful. ' +
      'No ads, and nothing loads unless you say yes. <a href="privacy.html#cookies">Privacy policy</a></p>' +
      '<div class="consent-btns">' +
        '<button type="button" class="pill" data-choice="granted">Accept</button>' +
        '<button type="button" class="pill pill--ghost" data-choice="denied">Decline</button>' +
      "</div>";
    banner.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-choice]");
      if (!btn) return;
      var choice = btn.getAttribute("data-choice");
      setChoice(choice);
      if (choice === "granted") loadAnalytics(); else stopAnalytics();
      banner.hidden = true;
      if (window.mvToast) window.mvToast(choice === "granted"
        ? "Thanks! Analytics is on. You can change this any time in Cookie settings."
        : "Analytics is off. Nothing is sent to Google.", "success");
    });
    document.body.appendChild(banner);
  }

  /* footer "Cookie settings" links */
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("[data-cookie-settings]")) { e.preventDefault(); showBanner(); }
  });

  var choice = getChoice();
  if (choice === "granted") loadAnalytics();
  else if (choice !== "denied" && hasId) {   // no ID yet = nothing to ask about
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showBanner);
    else showBanner();
  }
})();
