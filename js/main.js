/* ===================================================
   MAIN.JS — Navegación, Scroll Reveal, Menú Mobile
   Portfolio Rebeca Taboada Maldonado
   =================================================== */

(function () {
  'use strict';

  // ── DOM Elements ──────────────────────────────────
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.navbar__link');
  const sections = document.querySelectorAll('section[id]');
  const reveals = document.querySelectorAll('.reveal, .reveal-stagger');

  // ── Navbar scroll effect ──────────────────────────
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  // ── Active link tracking ──────────────────────────
  function updateActiveLink() {
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('is-active');
          }
        });
      }
    });
  }

  // ── Mobile menu toggle ────────────────────────────
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('is-open');

    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.add('is-open');
      navToggle.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('.navbar__link, .btn').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // ── Scroll Reveal (Intersection Observer) ─────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once revealed, stop observing for performance
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  reveals.forEach((el) => {
    revealObserver.observe(el);
  });

  // TikTok: ver js/videos.js (portada + reproductor al tocar)

  // ── Smooth anchor scrolling ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPos = targetEl.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth',
        });
      }
    });
  });

  // ── Brand card click → scroll to case study ───────
  document.querySelectorAll('.brand-card').forEach((card) => {
    card.addEventListener('click', function (e) {
      // The href already handles this, but ensure smooth scroll
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPos = targetEl.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth',
        });
      }
    });
  });

  // ── Event Listeners ───────────────────────────────
  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    updateActiveLink();
  }, { passive: true });

  navToggle.addEventListener('click', toggleMobileMenu);

  // Initial calls
  handleNavbarScroll();
  updateActiveLink();

  // ── Keyboard accessibility for mobile menu ────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

})();
