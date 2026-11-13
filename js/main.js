(function () {
  "use strict";

  function initSite() {
    var config = window.WEDDING;
    if (!config) return;

    document.querySelectorAll("[data-wedding-date]").forEach(function (element) {
      element.textContent = config.couple.dateLabel;
    });
    document.querySelectorAll("[data-first-name]").forEach(function (element) {
      element.textContent = config.couple.firstName;
    });
    document.querySelectorAll("[data-second-name]").forEach(function (element) {
      element.textContent = config.couple.secondName;
    });
    document.title = config.couple.names + " — " + config.couple.dateLabel;
    document.querySelector("[data-ceremony-time]").textContent = config.ceremony.time;
    document.querySelector("[data-ceremony-venue]").textContent = config.ceremony.venue;
    document.querySelector("[data-ceremony-location]").textContent = config.ceremony.location;
    document.querySelector("[data-reception-time]").textContent = config.reception.time;
    document.querySelector("[data-reception-venue]").textContent = config.reception.venue;
    document.querySelector("[data-reception-location]").textContent = config.reception.location;
    document.getElementById("ceremonyMap").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(config.ceremony.mapQuery);
    document.getElementById("receptionMap").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(config.reception.mapQuery);

    var heroImage = document.getElementById("heroImage");
    heroImage.style.backgroundImage = 'url("' + config.heroImage + '")';
    var rsvpImage = document.querySelector(".rsvp-section__image");
    rsvpImage.style.backgroundImage = 'url("' + config.gallery[7].src + '")';

    var shell = document.getElementById("siteShell");
    var welcome = document.getElementById("welcome");
    var openButton = document.getElementById("openInvitation");
    var skipButton = document.getElementById("skipOpening");
    var opened = false;

    function openInvitation(animate) {
      if (opened) return;
      opened = true;
      welcome.classList.add("is-opening");
      shell.inert = false;
      shell.setAttribute("aria-hidden", "false");
      document.body.classList.add("invitation-open");
      document.dispatchEvent(new Event("wedding:invitation-opened"));
      if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        welcome.hidden = true;
        document.getElementById("our-day").focus({ preventScroll: true });
        return;
      }
      window.setTimeout(function () {
        welcome.hidden = true;
        document.getElementById("our-day").focus({ preventScroll: true });
      }, 780);
    }

    openButton.addEventListener("click", function () { openInvitation(true); });
    skipButton.addEventListener("click", function () { openInvitation(false); });

    var navToggle = document.getElementById("navToggle");
    var siteNav = document.getElementById("siteNav");
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      siteNav.classList.toggle("is-open", !expanded);
    });
    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
      });
    });

    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14 });
      document.querySelectorAll("[data-reveal]").forEach(function (element) {
        revealObserver.observe(element);
      });
    } else {
      document.querySelectorAll("[data-reveal]").forEach(function (element) {
        element.classList.add("is-visible");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", initSite);
})();
