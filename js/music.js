(function () {
  "use strict";

  function initMusic() {
    var config = window.WEDDING;
    var audio = document.getElementById("weddingAudio");
    var button = document.getElementById("musicToggle");
    var label = document.getElementById("musicLabel");
    if (!config || !audio || !button || !label) return;

    audio.src = config.music.path;
    audio.setAttribute("aria-label", config.music.title);

    function setPlaying(playing) {
      button.classList.toggle("is-playing", playing);
      button.setAttribute("aria-pressed", String(playing));
      button.setAttribute("aria-label", playing ? "Pause wedding music" : "Play wedding music");
      label.textContent = playing ? "Pause our song" : "Play our song";
    }

    function showAudioError() {
      setPlaying(false);
      label.textContent = "Song unavailable";
      button.setAttribute("aria-label", "Wedding music is unavailable");
      button.disabled = true;
    }

    button.addEventListener("click", function () {
      if (audio.paused) {
        audio.play().catch(function () {
          label.textContent = "Could not play song";
        });
      } else {
        audio.pause();
      }
    });
    audio.addEventListener("play", function () { setPlaying(true); });
    audio.addEventListener("pause", function () { setPlaying(false); });
    audio.addEventListener("error", showAudioError);

    document.addEventListener("wedding:invitation-opened", function () {
      audio.play().catch(function () {
        label.textContent = "Play our song";
      });
    }, { once: true });
  }

  document.addEventListener("DOMContentLoaded", initMusic);
})();
