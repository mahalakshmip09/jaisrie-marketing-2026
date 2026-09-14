/* ==========================================================================
   SLIDER.JS
   Lightweight auto-playing testimonial slider with prev/next buttons and
   dot navigation. Works on any element matching [data-slider].
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-slider]").forEach(setupSlider);
  });

  function setupSlider(root) {
    var track = root.querySelector("[data-slider-track]");
    var slides = root.querySelectorAll("[data-slider-slide]");
    var prevBtn = root.querySelector("[data-slider-prev]");
    var nextBtn = root.querySelector("[data-slider-next]");
    var dotsWrap = root.querySelector("[data-slider-dots]");
    if (!track || !slides.length) return;

    var index = 0;
    var autoPlayDelay = parseInt(root.getAttribute("data-autoplay"), 10) || 5000;
    var timer = null;

    /* Build dot navigation */
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
        if (i === 0) dot.classList.add("is-active");
        dot.addEventListener("click", function () {
          goTo(i);
          restartAutoplay();
        });
        dotsWrap.appendChild(dot);
      });
    }

    function update() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      if (dotsWrap) {
        dotsWrap.querySelectorAll("button").forEach(function (d, i) {
          d.classList.toggle("is-active", i === index);
        });
      }
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restartAutoplay(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restartAutoplay(); });

    function startAutoplay() {
      var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;
      timer = setInterval(next, autoPlayDelay);
    }
    function restartAutoplay() {
      clearInterval(timer);
      startAutoplay();
    }

    /* Pause on hover / touch */
    root.addEventListener("mouseenter", function () { clearInterval(timer); });
    root.addEventListener("mouseleave", startAutoplay);

    update();
    startAutoplay();
  }
})();
