/* AURA CFW — main.js
 * Navbar mobile toggle, active link, footer year.
 * Also injects a global toast region so toast.js can use it anywhere.
 */
(function () {
  "use strict";

  // Mobile nav toggle
  document.addEventListener("click", function (e) {
    var toggle = e.target.closest("[data-nav-toggle]");
    if (toggle) {
      var nav = toggle.closest(".navbar");
      if (nav) nav.classList.toggle("is-open");
      return;
    }
    // Close on link click (mobile)
    if (e.target.closest(".nav__link")) {
      var openNav = document.querySelector(".navbar.is-open");
      if (openNav) openNav.classList.remove("is-open");
    }
  });

  // Mark active nav link based on current path
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach(function (a) {
    var target = (a.getAttribute("href") || "").split("/").pop();
    if (target && target === path) a.classList.add("is-active");
  });

  // Footer year
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();

  // Toast region
  if (!document.querySelector(".toast-region")) {
    var region = document.createElement("div");
    region.className = "toast-region";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    document.body.appendChild(region);
  }
})();


// User profile dropdown (navbar)
(function () {
    const toggle = document.querySelector('[data-user-menu-toggle]');
    if (!toggle) return;

    const dropdown = document.querySelector('[data-user-menu-dropdown]');
    if (!dropdown) return;

    const closeMenu = () => {
        dropdown.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        dropdown.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMenu() : openMenu();
    });

    document.addEventListener('click', (e) => {
        if (toggle.getAttribute('aria-expanded') === 'true' &&
            !dropdown.contains(e.target) &&
            !toggle.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            toggle.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (toggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
        }
    });
})();