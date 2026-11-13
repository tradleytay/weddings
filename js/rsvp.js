(function () {
  "use strict";

  function initRsvp() {
    var config = window.WEDDING;
    var button = document.getElementById("rsvpButton");
    var help = document.getElementById("rsvpHelp");
    if (!config || !button || !help) return;

    document.querySelector("[data-rsvp-deadline]").textContent = config.rsvp.deadline;
    var number = String(config.rsvp.whatsappNumber || "").replace(/\D/g, "");
    if (!number) {
      button.setAttribute("aria-disabled", "true");
      button.classList.add("is-disabled");
      button.addEventListener("click", function (event) {
        event.preventDefault();
      });
      return;
    }

    button.removeAttribute("aria-disabled");
    button.classList.remove("is-disabled");

    function updateLink() {
      var selected = document.querySelector('input[name="rsvpResponse"]:checked');
      var accepted = !selected || selected.value === "accept";
      var text = accepted
        ? "Hello " + config.couple.names + "! I would like to confirm my attendance at your wedding on " + config.couple.dateLabel + ". Thank you for the invitation."
        : "Hello " + config.couple.names + ". Thank you so much for the invitation to your wedding on " + config.couple.dateLabel + ". Regretfully, I am unable to attend. Wishing you a beautiful celebration.";
      button.href = "https://wa.me/" + number + "?text=" + encodeURIComponent(text);
      button.target = "_blank";
      button.rel = "noopener noreferrer";
      help.textContent = "Your WhatsApp message is ready. You can review it before sending.";
    }

    document.querySelectorAll('input[name="rsvpResponse"]').forEach(function (input) {
      input.addEventListener("change", updateLink);
    });
    updateLink();
  }

  document.addEventListener("DOMContentLoaded", initRsvp);
})();
