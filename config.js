/* ============================================================
   CONFIGURATION — EDIT THIS FILE ONLY
   ------------------------------------------------------------
   The doctor / developer can change the WhatsApp number, the
   disease list, and the branding text here without touching
   the rest of the application.
   ============================================================ */

(function (root) {
  "use strict";

  /* Doctor's WhatsApp number in international format, digits only.
     No spaces, no "+", no dashes. */
  var DOCTOR_WHATSAPP = "923002259848";

  /* Disease / case types shown in the consultation dropdown.
     Edit freely according to the cases handled by the doctor. */
  var DISEASE_OPTIONS = [
    "Cancer (All Types)",
    "Cerebral Palsy (Child)",
    "Congenital Diseases",
    "Thalassemia Dialysis",
    "Gangrene",
  ];

  /* Branding text used in the page and in the WhatsApp message. */
  var BRAND_NAME = "*Homeopathic Care*";

  /* Expose everywhere (browser globals + Node for tests). */
  root.DOCTOR_WHATSAPP = DOCTOR_WHATSAPP;
  root.DISEASE_OPTIONS = DISEASE_OPTIONS;
  root.BRAND_NAME = BRAND_NAME;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { DOCTOR_WHATSAPP, DISEASE_OPTIONS, BRAND_NAME };
  }
})(typeof globalThis !== "undefined" ? globalThis : this);