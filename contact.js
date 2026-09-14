/* ==========================================================================
   CONTACT.JS
   Client-side validation for the contact form. No backend is wired up —
   on a valid submit it shows a success message and resets the form. Swap
   the section marked TODO for a real fetch() call to your backend or
   form service (e.g. Formspree, Google Sheets endpoint, etc.).
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var status = form.querySelector("[data-form-status]");
    var mobilePattern = /^[6-9]\d{9}$/; // Indian 10-digit mobile numbers
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var validators = {
      name: function (v) { return v.trim().length >= 3 || "Please enter your full name."; },
      mobile: function (v) { return mobilePattern.test(v.trim()) || "Enter a valid 10-digit mobile number."; },
      email: function (v) { return v.trim() === "" || emailPattern.test(v.trim()) || "Enter a valid email address."; },
      city: function (v) { return v.trim().length >= 2 || "Please enter your city."; },
      service: function (v) { return v.trim() !== "" || "Please select a service."; },
      message: function (v) { return v.trim().length >= 10 || "Message should be at least 10 characters."; }
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      Object.keys(validators).forEach(function (name) {
        var field = form.elements[name];
        if (!field) return;
        var result = validators[name](field.value);
        var group = field.closest(".form-group");
        var errorEl = group ? group.querySelector(".field-error") : null;

        if (result !== true) {
          valid = false;
          if (group) group.classList.add("has-error");
          if (errorEl) errorEl.textContent = result;
        } else {
          if (group) group.classList.remove("has-error");
          if (errorEl) errorEl.textContent = "";
        }
      });

      if (!valid) {
        showStatus("Please fix the highlighted fields and try again.", false);
        return;
      }

      /* TODO: replace with a real submission call, e.g.
         fetch("/api/contact", { method:"POST", body: new FormData(form) }) */
      showStatus("Thank you! Your enquiry has been received. Our team will call you back shortly.", true);
      form.reset();
    });

    /* Live-clear errors as the person types */
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        var group = field.closest(".form-group");
        if (group) group.classList.remove("has-error");
      });
    });

    function showStatus(message, success) {
      if (!status) return;
      status.textContent = message;
      status.classList.remove("is-success", "is-error");
      status.classList.add(success ? "is-success" : "is-error");
      status.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
})();
