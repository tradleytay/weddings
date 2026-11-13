(function () {
  "use strict";

  function initCountdown() {
    var config = window.WEDDING;
    var clock = document.getElementById("countdownClock");
    var message = document.getElementById("countdownMessage");
    if (!config || !clock || !message) return;

    var target = new Date(config.couple.weddingDate).getTime();
    var fields = {
      days: clock.querySelector("[data-days]"),
      hours: clock.querySelector("[data-hours]"),
      minutes: clock.querySelector("[data-minutes]"),
      seconds: clock.querySelector("[data-seconds]")
    };

    function update() {
      var remaining = target - Date.now();
      if (remaining <= 0) {
        clock.hidden = true;
        message.textContent = "The day has arrived — let the celebration begin.";
        return false;
      }

      var seconds = Math.floor(remaining / 1000);
      var values = {
        days: Math.floor(seconds / 86400),
        hours: Math.floor((seconds % 86400) / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: seconds % 60
      };

      Object.keys(fields).forEach(function (unit) {
        fields[unit].textContent = String(values[unit]).padStart(2, "0");
      });
      return true;
    }

    if (!update()) return;
    var countdownInterval = window.setInterval(function () {
      if (!update()) window.clearInterval(countdownInterval);
    }, 1000);
  }

  document.addEventListener("DOMContentLoaded", initCountdown);
})();
