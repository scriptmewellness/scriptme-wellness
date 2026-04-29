/* =========================================================
   SCRIPT ME WELLNESS — Main JavaScript
   ========================================================= */

(function () {
  'use strict';

  /* ====== MOBILE NAV ====== */
  const menuToggle = document.querySelector('.menu-toggle');
  const navDrawer = document.querySelector('.nav-drawer');

  if (menuToggle && navDrawer) {
    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.classList.toggle('is-open');
      navDrawer.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close drawer on link click
    navDrawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menuToggle.classList.remove('is-open');
        navDrawer.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
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

  /* ====== CONTACT FORM (Formspree-ready, with mailto fallback) ====== */
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // If the form has an action attribute (Formspree), let it submit normally.
      // If not, fall back to mailto.
      if (!contactForm.getAttribute('action')) {
        e.preventDefault();
        const data = new FormData(contactForm);
        const subject = encodeURIComponent('Website inquiry from ' + (data.get('name') || ''));
        const body = encodeURIComponent(
          'Name: ' + (data.get('name') || '') + '\n' +
          'Email: ' + (data.get('email') || '') + '\n' +
          'Phone: ' + (data.get('phone') || '') + '\n\n' +
          (data.get('message') || '')
        );
        window.location.href = 'mailto:admin@scriptmewellness.com?subject=' + subject + '&body=' + body;
      }
    });
  }
})();
