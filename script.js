/* ============================================================
   Application logic
   - Populates the disease dropdown from DISEASE_OPTIONS
   - Validates the consultation form
   - Builds and opens the WhatsApp Click-to-Chat URL
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     WhatsApp message + URL building
     ---------------------------------------------------------- */

  var WA_LINK = "https://wa.me/" + DOCTOR_WHATSAPP + "?text=";

  /* Exactly 36 underscores */
  var SEPARATOR = "____________________________________";

  function buildWhatsAppMessage(data) {
    return (
      "*_New Consultation Request_*\n" +
      SEPARATOR +
      "\n\n" +
      "*Patient Information*\n\n" +
      "*Name:* " +
      data.name +
      "\n" +
      "*Age:* " +
      data.age +
      "\n" +
      "*City:* " +
      data.city +
      "\n" +
      "*Country:* " +
      data.country +
      "\n\n" +
      "*Case Type:*\n" +
      data.caseType +
      "\n\n" +
      "*Patient Message:*\n" +
      data.message +
      "\n" +
      SEPARATOR +
      "\n\n" +
      "_Submitted via " +
      BRAND_NAME +
      "_"
    );
  }

  function buildWhatsAppUrl(data) {
    var message = buildWhatsAppMessage(data);

    return WA_LINK + encodeURIComponent(message);
  }

  function openWhatsApp(url) {
    return Boolean(window.open(url, "_blank", "noopener,noreferrer"));
  }

  /* ----------------------------------------------------------
     Expose helpers for Node tests
     ---------------------------------------------------------- */

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      buildWhatsAppMessage: buildWhatsAppMessage,
      buildWhatsAppUrl: buildWhatsAppUrl,
      openWhatsApp: openWhatsApp,
      WA_LINK: WA_LINK,
      SEPARATOR: SEPARATOR,
    };

    return;
  }

  /* ----------------------------------------------------------
     DOM plumbing
     ---------------------------------------------------------- */

  var form = document.getElementById("consultation-form");
  var nameInput = document.getElementById("field-name");
  var ageInput = document.getElementById("field-age");
  var cityInput = document.getElementById("field-city");
  var countryInput = document.getElementById("field-country");
  var caseSelect = document.getElementById("field-case");
  var messageInput = document.getElementById("field-message");
  var submitHint = document.querySelector(".submit-hint");

  ageInput.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  });

  /* ----------------------------------------------------------
     Populate disease dropdown
     ---------------------------------------------------------- */

  var placeholderOption = document.createElement("option");

  placeholderOption.value = "";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  placeholderOption.textContent = "Select your case";

  caseSelect.appendChild(placeholderOption);

  DISEASE_OPTIONS.forEach(function (item) {
    var option = document.createElement("option");

    option.value = item;
    option.textContent = item;

    caseSelect.appendChild(option);
  });

  /* ----------------------------------------------------------
     Submit hint
     ---------------------------------------------------------- */

  function setHint(message) {
    if (!message) {
      submitHint.classList.remove("is-visible");
      submitHint.textContent = "";
      return;
    }

    submitHint.textContent = message;
    submitHint.classList.add("is-visible");
  }

  /* ----------------------------------------------------------
     Validation
     ---------------------------------------------------------- */

  var validators = [
    {
      input: nameInput,
      field: "name",

      test: function () {
        return /^\S.*\S$|^\S$/.test(nameInput.value.trim());
      },

      message: "Please enter your name.",
    },

    {
      input: ageInput,
      field: "age",

      test: function () {
        return ageInput.value !== "" && Number(ageInput.value) > 0 && Number(ageInput.value) <= 120;
      },

      message: "Please enter a valid age.",
    },

    {
      input: cityInput,
      field: "city",

      test: function () {
        return /^\S.*\S$|^\S$/.test(cityInput.value.trim());
      },

      message: "Please enter your city.",
    },

    {
      input: countryInput,
      field: "country",

      test: function () {
        return /^\S.*\S$|^\S$/.test(countryInput.value.trim());
      },

      message: "Please enter your country.",
    },

    {
      input: caseSelect,
      field: "case",

      test: function () {
        return caseSelect.value !== "";
      },

      message: "Please select a case type.",
    },

    {
      input: messageInput,
      field: "message",

      test: function () {
        return messageInput.value.trim().length >= 10;
      },

      message: "Please tell us a little about your concern.",
    },
  ];

  function setFieldError(validator, hasError) {
    var errorEl = document.getElementById(
      "error-" + validator.field
    );

    var fieldWrapper = validator.input.closest(".field");

    if (fieldWrapper) {
      fieldWrapper.classList.toggle("is-invalid", hasError);
    }

    if (hasError) {
      validator.input.setAttribute("aria-invalid", "true");

      if (errorEl) {
        errorEl.textContent = validator.message;
      }
    } else {
      validator.input.removeAttribute("aria-invalid");

      if (errorEl) {
        errorEl.textContent = "";
      }
    }
  }

  validators.forEach(function (validator) {
    validator.input.addEventListener("input", function () {
      var showError = !validator.test();

      if (validator.field === "message") {
        showError = false;
      }

      setFieldError(validator, showError);
    });

    validator.input.addEventListener("change", function () {
      var showError = !validator.test();

      if (validator.field === "message") {
        showError = false;
      }

      setFieldError(validator, showError);
    });
  });

  /* ----------------------------------------------------------
     Form submission
     ---------------------------------------------------------- */

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    setHint("");

    var firstInvalid = null;

    validators.forEach(function (validator) {
      var invalid = !validator.test();
      var showError = invalid;

      if (validator.field === "message") {
        showError = messageInput.value.trim().length === 0;
      }

      setFieldError(validator, showError);

      if (invalid && !firstInvalid) {
        firstInvalid = validator.input;
      }
    });

    /*
     * Do not open WhatsApp when the form is invalid.
     */
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    /* --------------------------------------------------------
       Build consultation data
       -------------------------------------------------------- */

    var consultationData = {
      name: nameInput.value.trim(),
      age: ageInput.value.trim(),
      city: cityInput.value.trim(),
      country: countryInput.value.trim(),
      caseType: caseSelect.value.trim(),
      message: messageInput.value.trim(),
    };

    /* --------------------------------------------------------
       Build WhatsApp URL and open WhatsApp
       -------------------------------------------------------- */

    var url = buildWhatsAppUrl(consultationData);

    if (openWhatsApp(url)) {
      setHint(
        "WhatsApp is opening — your message is ready. Press Send in WhatsApp to deliver it to the doctor."
      );
    } else {
      setHint(
        "WhatsApp could not be opened automatically. Please allow pop-ups for this website and try again."
      );
    }
  });

  /* ----------------------------------------------------------
     Mobile navigation toggle
     ---------------------------------------------------------- */

  var navToggle = document.querySelector(".nav-toggle");
  var siteHeader = document.querySelector(".site-header");
  var siteNav = document.getElementById("site-nav");

  function closeNav() {
    siteHeader.classList.remove("is-open");

    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  navToggle.addEventListener("click", function () {
    var isOpen = siteHeader.classList.toggle("is-open");

    navToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  /* Close mobile menu after selecting a navigation link */
  siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  /* Close mobile menu when viewport becomes desktop-sized */
  window.addEventListener("resize", function () {
    if (window.innerWidth > 720) {
      closeNav();
    }
  });

  /* Close mobile menu when clicking outside the header */
  document.addEventListener("click", function (event) {
    if (
      siteHeader.classList.contains("is-open") &&
      !siteHeader.contains(event.target)
    ) {
      closeNav();
    }
  });

  /* ----------------------------------------------------------
     Reveal-on-scroll
     ---------------------------------------------------------- */

  document.documentElement.classList.add("js");

  var reveals = document.querySelectorAll(".reveal");

  if (
    reveals.length &&
    "IntersectionObserver" in window
  ) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();