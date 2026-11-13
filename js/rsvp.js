(function () {
  "use strict";

  function initRsvp() {
    var config = window.WEDDING;
    var button = document.getElementById("rsvpButton");
    var help = document.getElementById("rsvpHelp");
    var nameInput = document.getElementById("guestName");
    if (!config || !button || !help || !nameInput) return;

    document.querySelector("[data-rsvp-deadline]").textContent = config.rsvp.deadline;
    var number = String(config.rsvp.whatsappNumber || "").replace(/\D/g, "");
    function disableButton(message) {
      button.setAttribute("aria-disabled", "true");
      button.classList.add("is-disabled");
      button.href = "#";
      button.removeAttribute("target");
      help.textContent = message;
    }

    function updateLink() {
      if (!number) {
        disableButton("Our WhatsApp RSVP number will be added soon. Please check back for the link.");
        return;
      }

      var guestName = nameInput.value.trim();
      if (!guestName) {
        disableButton("Enter your name to prepare your WhatsApp RSVP.");
        return;
      }
      if (guestName.length < 4) {
        disableButton("Please enter a name with at least 4 characters.");
        return;
      }

      var selected = document.querySelector('input[name="rsvpResponse"]:checked');
      var accepted = !selected || selected.value === "accept";
      var text = accepted
        ? "Hello " + config.couple.names + "! My name is " + guestName + ", and I joyfully accept your invitation to the wedding on " + config.couple.dateLabel + ". Thank you."
        : "Hello " + config.couple.names + ". My name is " + guestName + ". Thank you so much for the invitation to your wedding on " + config.couple.dateLabel + ". Regretfully, I am unable to attend. Wishing you a beautiful celebration.";
      button.href = "https://wa.me/" + number + "?text=" + encodeURIComponent(text);
      button.target = "_blank";
      button.rel = "noopener noreferrer";
      button.removeAttribute("aria-disabled");
      button.classList.remove("is-disabled");
      help.textContent = "Your WhatsApp message is ready. You can review it before sending.";
    }

    button.addEventListener("click", function (event) {
      if (button.getAttribute("aria-disabled") === "true") event.preventDefault();
    });
    nameInput.addEventListener("input", updateLink);
    document.querySelectorAll('input[name="rsvpResponse"]').forEach(function (input) {
      input.addEventListener("change", updateLink);
    });
    updateLink();
  }

  document.addEventListener("DOMContentLoaded", initRsvp);
})();
