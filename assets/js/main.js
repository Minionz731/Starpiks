// starpikx — main.js

// ==================== LOADER ====================

(function () {
  const loader = document.getElementById('loader-overlay');
  if (!loader) return;

  document.body.style.overflow = 'hidden';

  function dismiss() {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }

  setTimeout(dismiss, 1500);
  loader.addEventListener('click', dismiss, { once: true });
})();

// ==================== NAVIGATION ====================

document.addEventListener('DOMContentLoaded', function () {

  const nav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll: nav style + active link
  window.addEventListener('scroll', function () {
    // Scrolled state
    nav.classList.toggle('scrolled', window.pageYOffset > 60);

    // Active section highlight
    let current = '';
    sections.forEach(function (section) {
      if (window.pageYOffset >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    // Back to top
    const btn = document.getElementById('back-to-top');
    if (btn) btn.classList.toggle('visible', window.pageYOffset > 500);
  });

  // Smooth scroll for nav links
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 72,
          behavior: 'smooth'
        });
      }
    });
  });

  // Also smooth scroll the logo
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== HAMBURGER MENU ====================

  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        closeMenu();
        if (target) {
          setTimeout(function () {
            window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
          }, 300);
        }
      });
    });
  }

  // ==================== BACK TO TOP ====================

  const backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== BENTO FADE-IN ====================

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.bento-card').forEach(function (card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.7s ease ' + (i * 0.1) + 's, transform 0.7s ease ' + (i * 0.1) + 's';
    observer.observe(card);
  });

  // Portfolio CTA fade-in
  const portfolioInner = document.querySelector('.portfolio-inner');
  if (portfolioInner) {
    portfolioInner.style.opacity = '0';
    portfolioInner.style.transform = 'translateY(20px)';
    portfolioInner.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(portfolioInner);
  }

  // ==================== RESIZE ANIMATION STOPPER ====================

  let resizeTimer;
  window.addEventListener('resize', function () {
    document.body.classList.add('no-transition');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      document.body.classList.remove('no-transition');
    }, 400);
  });

  const noTransStyle = document.createElement('style');
  noTransStyle.textContent = '.no-transition * { transition: none !important; animation: none !important; }';
  document.head.appendChild(noTransStyle);

});
