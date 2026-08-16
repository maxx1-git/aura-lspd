/* AURA CFW — components.js
 * Accordion, Toast, Modal — all UI only.
 */
(function () {
  "use strict";

  /* ---------- Accordion ---------- */
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-accordion-trigger]");
    if (!trigger) return;
    var item = trigger.closest(".accordion__item");
    if (!item) return;
    var panel = item.querySelector(".accordion__panel");
    var isOpen = item.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (panel) {
      panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : "0px";
    }
  });

  /* ---------- Toast API ---------- */
  window.AuraToast = {
    show: function (opts) {
      var region = document.querySelector(".toast-region");
      if (!region) return;
      var kind = (opts && opts.kind) || "info";
      var el = document.createElement("div");
      el.className = "toast is-" + kind;
      el.setAttribute("role", kind === "danger" ? "alert" : "status");
      el.innerHTML =
        '<div>' +
          (opts.title ? '<div class="toast__title"></div>' : "") +
          '<div class="toast__msg"></div>' +
        '</div>';
      if (opts.title) el.querySelector(".toast__title").textContent = opts.title;
      el.querySelector(".toast__msg").textContent = opts.message || "";
      region.appendChild(el);
      var timeout = opts.duration || 3800;
      setTimeout(function () {
        el.classList.add("is-leaving");
        setTimeout(function () { el.remove(); }, 260);
      }, timeout);
    },
  };

  /* ---------- Modal ---------- */
  function openModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal(m) {
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  document.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-modal-open]");
    if (opener) {
      e.preventDefault();
      openModal(opener.getAttribute("data-modal-open"));
      return;
    }
    if (e.target.matches(".modal") || e.target.closest("[data-modal-close]")) {
      var m = e.target.closest(".modal");
      if (m) closeModal(m);
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var open = document.querySelector(".modal.is-open");
      if (open) closeModal(open);
    }
  });
})();
