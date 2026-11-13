(function () {
  "use strict";

  function initGallery() {
    var config = window.WEDDING;
    var grid = document.getElementById("galleryGrid");
    var lightbox = document.getElementById("lightbox");
    if (!config || !grid || !lightbox) return;

    var images = config.gallery;
    var activeIndex = 0;
    var returnFocus = null;
    var imageElement = document.getElementById("lightboxImage");
    var caption = document.getElementById("lightboxCaption");
    var closeButton = document.getElementById("lightboxClose");

    images.forEach(function (photo, index) {
      var item = document.createElement("figure");
      item.className = "gallery-item";
      item.setAttribute("data-reveal", "");
      var button = document.createElement("button");
      button.className = "gallery-item__button";
      button.type = "button";
      button.setAttribute("aria-label", "View photograph " + (index + 1) + ": " + photo.alt);
      var img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt;
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 360;
      img.height = 480;
      button.appendChild(img);
      var mark = document.createElement("span");
      mark.className = "gallery-item__mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "View photograph ↗";
      button.appendChild(mark);
      item.appendChild(button);
      grid.appendChild(item);
      button.addEventListener("click", function () {
        openLightbox(index, button);
      });
    });

    function showPhoto(index) {
      activeIndex = (index + images.length) % images.length;
      var photo = images[activeIndex];
      imageElement.src = photo.src;
      imageElement.alt = photo.alt;
      caption.textContent = (activeIndex + 1) + " / " + images.length;
    }

    function openLightbox(index, source) {
      returnFocus = source;
      showPhoto(index);
      lightbox.hidden = false;
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      closeButton.focus();
    }

    function closeLightbox() {
      if (lightbox.hidden) return;
      lightbox.hidden = true;
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      imageElement.removeAttribute("src");
      if (returnFocus) returnFocus.focus();
    }

    document.getElementById("lightboxPrev").addEventListener("click", function () {
      showPhoto(activeIndex - 1);
    });
    document.getElementById("lightboxNext").addEventListener("click", function () {
      showPhoto(activeIndex + 1);
    });
    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (event) {
      if (lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPhoto(activeIndex - 1);
      if (event.key === "ArrowRight") showPhoto(activeIndex + 1);
      if (event.key === "Tab") {
        var controls = lightbox.querySelectorAll("button");
        var first = controls[0];
        var last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initGallery);
})();
