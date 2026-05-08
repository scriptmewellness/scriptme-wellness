/* =========================================================
   SCRIPT ME WELLNESS — Main JavaScript
   ========================================================= */

(function () {
  'use strict';

  /* ====== MOBILE NAV ====== */
  const menuToggle = document.querySelector('.menu-toggle');
  const navDrawer = document.querySelector('.nav-drawer');
  const navBackdrop = document.querySelector('.nav-drawer-backdrop');

  function closeNav() {
    if (!menuToggle) return;
    menuToggle.classList.remove('is-open');
    if (navDrawer) navDrawer.classList.remove('is-open');
    if (navBackdrop) navBackdrop.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  function openNav() {
    if (!menuToggle) return;
    menuToggle.classList.add('is-open');
    if (navDrawer) navDrawer.classList.add('is-open');
    if (navBackdrop) navBackdrop.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  if (menuToggle && navDrawer) {
    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.classList.contains('is-open');
      if (isOpen) closeNav(); else openNav();
    });

    // Close on link click
    navDrawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });

    // Close on close button click
    const closeButton = navDrawer.querySelector('.nav-drawer__close');
    if (closeButton) {
      closeButton.addEventListener('click', closeNav);
    }

    // Close on backdrop click
    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeNav);
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuToggle.classList.contains('is-open')) {
        closeNav();
      }
    });
  }

  /* ====== TABS ====== */
  const tabsRoot = document.querySelector('[data-tabs]');
  if (tabsRoot) {
    const buttons = tabsRoot.querySelectorAll('.tabs__btn');
    const panels = tabsRoot.querySelectorAll('.tab-panel');

    function activateTab(target, scrollIntoView) {
      let activated = false;
      buttons.forEach(function (b) {
        const active = b.dataset.tab === target;
        if (active) activated = true;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      panels.forEach(function (panel) {
        const isMatch = panel.dataset.panel === target;
        panel.classList.toggle('is-active', isMatch);
        panel.hidden = !isMatch;
      });
      if (activated && scrollIntoView) {
        // Scroll the tabs section into view, accounting for sticky header
        const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
        const top = tabsRoot.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
      return activated;
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateTab(btn.dataset.tab, false);
        // Scroll to the top of the tabs container on tab change
        const target = document.querySelector('.section-header') || tabsRoot;
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Activate tab on initial load if URL has matching hash
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      activateTab(hash, true);
    }

    // Listen for hash changes (e.g. clicking a link to #thyroid while already on the page)
    window.addEventListener('hashchange', function () {
      const hash = window.location.hash.replace('#', '');
      if (hash) activateTab(hash, true);
    });
  }

  /* ====== ACCORDIONS ====== */
  document.querySelectorAll('.accordion').forEach(function (acc) {
    const items = acc.querySelectorAll('.accordion__item');
    items.forEach(function (item) {
      const btn = item.querySelector('.accordion__btn');
      const panel = item.querySelector('.accordion__panel');
      if (!btn || !panel) return;

      btn.addEventListener('click', function () {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        panel.style.maxHeight = isOpen ? '0' : panel.scrollHeight + 'px';
      });
    });
  });

  /* ====== TAB PANELS — mobile accordion behavior ====== */
  // The service tab panels double as accordion items at narrow viewports.
  // Each panel's mobile trigger button toggles aria-expanded; CSS handles visibility.
  document.querySelectorAll('.tab-panel__mobile-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      // Toggle just this panel; leave others alone (matches 504westmain behavior)
      trigger.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    });
  });

  /* ====== REVEAL ON SCROLL ====== */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ====== SCROLL TO BOOKING SECTION ON HASH ====== */
  // If page loads with #book-emily in URL, scroll to the calendar smoothly
  if (window.location.hash === '#book-emily') {
    const section = document.getElementById('book-emily');
    if (section) {
      setTimeout(function () {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

})();
