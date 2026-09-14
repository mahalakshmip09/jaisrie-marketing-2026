/* ==========================================================================
   ANIMATION.JS
   Two self-contained interactive features:
   - Animated number counters, triggered once each enters the viewport
   - FAQ accordion (single or multi open, controlled by data attribute)
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initCounters();
    initAccordion();
  });

  /* ---------- Animated counters ---------- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var run = function (el) {
      var target = parseFloat(el.getAttribute("data-counter"));
      var decimals = (el.getAttribute("data-counter").split(".")[1] || "").length;
      var suffix = el.getAttribute("data-suffix") || "";

      if (reduceMotion) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }

      var duration = 1800;
      var start = null;

      function step(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        var value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- FAQ accordion ---------- */
  function initAccordion() {
    var accordions = document.querySelectorAll("[data-accordion]");
    accordions.forEach(function (accordion) {
      var items = accordion.querySelectorAll(".accordion-item");
      items.forEach(function (item) {
        var trigger = item.querySelector(".accordion-trigger");
        var panel = item.querySelector(".accordion-panel");
        if (!trigger || !panel) return;

        trigger.addEventListener("click", function () {
          var isOpen = item.classList.contains("is-open");

          /* Close siblings for a single-open accordion */
          if (accordion.getAttribute("data-accordion") === "single") {
            items.forEach(function (sibling) {
              if (sibling !== item) {
                sibling.classList.remove("is-open");
                var sibPanel = sibling.querySelector(".accordion-panel");
                if (sibPanel) sibPanel.style.maxHeight = null;
                var sibTrigger = sibling.querySelector(".accordion-trigger");
                if (sibTrigger) sibTrigger.setAttribute("aria-expanded", "false");
              }
            });
          }

          item.classList.toggle("is-open", !isOpen);
          trigger.setAttribute("aria-expanded", (!isOpen).toString());
          panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
        });
      });
    });
  }
})();
