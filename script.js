/* ============================================================
   Brian Gichigo — Portfolio JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Typing Effect for Hero Section ────────────────────── */
  function initTypingEffect() {
    const heroContent = document.querySelector('.hero__content');
    const h1 = heroContent?.querySelector('h1');
    const leadP = heroContent?.querySelector('.lead');
    
    if (!h1 || !leadP) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animation if user prefers reduced motion
      h1.style.opacity = '1';
      leadP.style.opacity = '1';
      return;
    }

    // Store original text content
    const h1Text = h1.textContent;
    const leadText = leadP.textContent;

    // Clear the elements
    h1.textContent = '';
    leadP.textContent = '';

   // Add cursor styling (ONLY for h1)
    const style = document.createElement('style');
    style.textContent = `
        .hero__content h1.typing::after {
        content: '';
        display: inline-block;
        width: 2px;
        height: 1em;
        background-color: var(--accent);
        margin-left: 2px;
        animation: typingCursor 0.6s step-end infinite;
        vertical-align: middle;
      }

      @keyframes typingCursor {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }

     .hero__content h1.typing {
        min-height: 1em;
      }
    `;
    document.head.appendChild(style);

    // Add typing class to show cursor
    h1.classList.add('typing');

    // Typing settings
    const charSpeed = 30; // ms per character
    const lineDelay = 600; // ms delay between h1 and lead
    let currentIndex = 0;

    // Type h1
    function typeH1() {
      if (currentIndex < h1Text.length) {
        h1.textContent += h1Text[currentIndex];
        currentIndex++;
        setTimeout(typeH1, charSpeed);
      } else {
        // h1 complete, remove cursor and start lead
        h1.classList.remove('typing');
        setTimeout(typeLead, lineDelay);
      }
    }

    // Type lead paragraph (without cursor)
    function typeLead() {
      let leadIndex = 0;
       leadP.classList.add('typing');

      function typeChar() {
        if (leadIndex < leadText.length) {
          leadP.textContent += leadText[leadIndex];
          leadIndex++;
          setTimeout(typeChar, charSpeed);
             } else {
          // All done
          leadP.classList.remove('typing');
        }
        }
      }

      typeChar();
    }

    // Start typing effect when the page loads
    window.addEventListener('load', typeH1, { once: true });
    
    // Fallback in case load event doesn't fire in time
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      typeH1();
    }
  }

  initTypingEffect();

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
