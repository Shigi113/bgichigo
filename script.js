/* ============================================================
   Brian Gichigo — Portfolio JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Preloader ─────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const minLoadTime = 2500;
    const startTime = Date.now();

    window.addEventListener('load', function () {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 600); // Fully remove from DOM after CSS transition
      }, remaining);
    });
  }

  /* ── Mobile nav toggle ─────────────────────────────────── */
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggle || !navLinks) return;

  function openMenu() {
    navLinks.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.classList.add('open');
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('open');
  }

  // Hamburger / X click
  toggle.addEventListener('click', function () {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close when any nav link is clicked (single-page scroll)
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside the nav
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Scroll-spy: highlight active nav link ──────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  function setActive() {
    let current = '';
    sections.forEach(function (sec) {
      if (window.scrollY >= sec.offsetTop - 96) {
        current = sec.getAttribute('id');
      }
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive(); // run once on load

})();
function handleContact(event) {
    event.preventDefault();

    const name    = document.getElementById('contactName').value;
    const email   = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    // Opens user's email client with pre-filled message
    const mailtoLink = `mailto:brianndungu844@gmail.com`
        + `?subject=Portfolio Inquiry from ${encodeURIComponent(name)}`
        + `&body=${encodeURIComponent(message)}%0A%0AReply to: ${encodeURIComponent(email)}`;

    window.location.href = mailtoLink;
}
