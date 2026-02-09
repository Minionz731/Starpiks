// Main JavaScript for starpikx single-page website
document.addEventListener('DOMContentLoaded', function() {
  
  // Set current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    observer.observe(element);
  });

  // Roving gallery controls
  const rovingWrap = document.querySelector('.roving-wrap');
  const rovingTrack = document.querySelector('.roving-track');

  if (rovingWrap && rovingTrack) {
    // Pause/resume helpers
    const pause = () => {
      rovingTrack.classList.add('paused');
    };
    
    const resume = () => {
      rovingTrack.classList.remove('paused');
    };

    // Pause on pointer down
    rovingWrap.addEventListener('pointerdown', pause);
    document.addEventListener('pointerup', resume);

    // Touch events for mobile
    rovingWrap.addEventListener('touchstart', pause, { passive: true });
    rovingWrap.addEventListener('touchend', resume, { passive: true });

    // Respect reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rovingTrack.style.animation = 'none';
    }
  }

  // Active navigation highlighting
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Lazy loading for images (if needed)
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Prevent empty href navigation
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', e => e.preventDefault());
  });

  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
    // Escape key closes any overlays (if you add modals later)
    if (e.key === 'Escape') {
      // Handle escape key
    }
    
    // Home key scrolls to top
    if (e.key === 'Home' && e.ctrlKey) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // End key scrolls to bottom
    if (e.key === 'End' && e.ctrlKey) {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  });

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Add parallax effect to hero (optional enhancement)
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', debounce(function() {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    }, 10));
  }

  // Console message (optional branding)
  console.log('%c🌟 starpikx Productions', 'font-size: 20px; font-weight: bold; color: #fff;');
  console.log('%cMore than just photography', 'font-size: 14px; color: #bdbdbd;');
  console.log('%cWebsite: https://starpikx.com', 'font-size: 12px; color: #888;');
});

// Add loading class removal
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});