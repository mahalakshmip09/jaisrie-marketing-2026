/* ==========================================================================
   MAIN.JS
   Core site behaviour shared by every page:
   - Sticky header shadow on scroll
   - Mobile navigation toggle
   - Smooth scroll for in-page anchors
   - Scroll-reveal animations (IntersectionObserver)
   - Native lazy-loading fallback for data-src images
   - Back-to-top button
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initStickyHeader();
    initMobileNav();
    initSmoothScroll();
    initScrollReveal();
    initLazyImages();
    initBackToTop();
    setYear();
  }

  /* ---------- Sticky header ---------- */
  function initStickyHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 12) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile navigation ---------- */
  function initMobileNav() {
    var toggle = document.querySelector(".menu-toggle");
    var mobileNav = document.querySelector(".mobile-nav");
    if (!toggle || !mobileNav) return;

    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      toggle.classList.toggle("is-active", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    /* Close menu whenever a link inside it is used */
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Smooth scroll for same-page anchors ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var targetId = link.getAttribute("href");
        if (targetId.length < 2) return;
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        var headerH = document.querySelector(".site-header")
          ? document.querySelector(".site-header").offsetHeight
          : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
  }

  /* ---------- Scroll reveal via IntersectionObserver ---------- */
  function initScrollReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el, i) {
      el.style.setProperty("--delay", (i % 6) * 80 + "ms");
      observer.observe(el);
    });
  }

  /* ---------- Lazy-load images marked with data-src ---------- */
  function initLazyImages() {
    var images = document.querySelectorAll("img[data-src]");
    if (!images.length) return;

    if (!("IntersectionObserver" in window)) {
      images.forEach(loadImage);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px 0px" }
    );

    images.forEach(function (img) { observer.observe(img); });

    function loadImage(img) {
      img.src = img.getAttribute("data-src");
      img.addEventListener("load", function () { img.classList.add("is-loaded"); });
      img.removeAttribute("data-src");
    }
  }

  /* ---------- Back to top button ---------- */
  function initBackToTop() {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;
    window.addEventListener(
      "scroll",
      function () {
        btn.classList.toggle("is-visible", window.scrollY > 500);
      },
      { passive: true }
    );
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }
})();
