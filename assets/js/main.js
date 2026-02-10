// Main JavaScript for Starpikx One-Page Scrolling Website

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== SMOOTH SCROLL NAVIGATION ====================
  
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active Navigation Highlighting
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
  
  // Header Scroll Effect
  const header = document.querySelector('.main-nav');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // ==================== SLIDESHOW ====================
  
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.slide-btn.prev');
  const nextBtn = document.querySelector('.slide-btn.next');
  
  let currentSlide = 0;
  let slideInterval;
  
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  
  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  function stopSlideshow() {
    clearInterval(slideInterval);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      stopSlideshow();
      nextSlide();
      startSlideshow();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      stopSlideshow();
      prevSlide();
      startSlideshow();
    });
  }
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      stopSlideshow();
      currentSlide = index;
      showSlide(currentSlide);
      startSlideshow();
    });
  });
  
  const slideshowHero = document.querySelector('.slideshow-hero');
  if (slideshowHero) {
    slideshowHero.addEventListener('mouseenter', stopSlideshow);
    slideshowHero.addEventListener('mouseleave', startSlideshow);
  }
  
  startSlideshow();
  
  // ==================== MAGAZINE OPENING & FLIPPING ====================
  
  const openCoverBtn = document.getElementById('open-cover');
  const coverPage = document.getElementById('cover-page');
  const magazinePages = document.getElementById('magazine-pages');
  const magazineSpreads = document.querySelectorAll('.magazine-spread');
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  const currentPageElement = document.querySelector('.current-page');
  const totalPagesElement = document.querySelector('.total-pages');
  
  let currentSpread = 0;
  let magazineOpened = false;
  
  // Set total pages
  if (totalPagesElement) {
    totalPagesElement.textContent = magazineSpreads.length;
  }
  
  // Open Magazine Cover
  if (openCoverBtn) {
    openCoverBtn.addEventListener('click', function() {
      magazineOpened = true;
      
      // Hide cover
      coverPage.classList.add('opened');
      
      // Show magazine pages after animation
      setTimeout(function() {
        magazinePages.classList.add('opened');
      }, 600);
    });
  }
  
  // Show Spread Function
  function showSpread(index) {
    if (index < 0) index = 0;
    if (index >= magazineSpreads.length) index = magazineSpreads.length - 1;
    
    currentSpread = index;
    
    magazineSpreads.forEach((spread, i) => {
      spread.classList.remove('active', 'exiting');
      
      if (i === currentSpread) {
        spread.classList.add('active');
      } else if (i < currentSpread) {
        spread.classList.add('exiting');
      }
    });
    
    // Update page counter
    if (currentPageElement) {
      currentPageElement.textContent = currentSpread + 1;
    }
    
    // Update button states
    updateMagazineButtons();
  }
  
  // Update Magazine Navigation Buttons
  function updateMagazineButtons() {
    if (prevPageBtn) {
      if (currentSpread === 0) {
        prevPageBtn.disabled = true;
        prevPageBtn.style.opacity = '0.3';
      } else {
        prevPageBtn.disabled = false;
        prevPageBtn.style.opacity = '1';
      }
    }
    
    if (nextPageBtn) {
      if (currentSpread === magazineSpreads.length - 1) {
        nextPageBtn.disabled = true;
        nextPageBtn.style.opacity = '0.3';
      } else {
        nextPageBtn.disabled = false;
        nextPageBtn.style.opacity = '1';
      }
    }
  }
  
  // Navigation Buttons
  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', function() {
      if (currentSpread < magazineSpreads.length - 1) {
        showSpread(currentSpread + 1);
      }
    });
  }
  
  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', function() {
      if (currentSpread > 0) {
        showSpread(currentSpread - 1);
      }
    });
  }
  
  // Keyboard Navigation for Magazine
  document.addEventListener('keydown', function(e) {
    if (magazineOpened && magazinePages.classList.contains('opened')) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentSpread < magazineSpreads.length - 1) {
          showSpread(currentSpread + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentSpread > 0) {
          showSpread(currentSpread - 1);
        }
      }
    }
  });
  
  // Touch Swipe Support for Magazine
  let touchStartX = 0;
  let touchEndX = 0;
  
  const magazineWrapper = document.querySelector('.magazine-wrapper');
  
  if (magazineWrapper) {
    magazineWrapper.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    magazineWrapper.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swiped left - next page
      if (currentSpread < magazineSpreads.length - 1) {
        showSpread(currentSpread + 1);
      }
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swiped right - previous page
      if (currentSpread > 0) {
        showSpread(currentSpread - 1);
      }
    }
  }
  
  // Initialize magazine
  if (magazineSpreads.length > 0) {
    showSpread(0);
  }
  
  // ==================== BACK TO TOP BUTTON ====================
  
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
  
  // ==================== FADE-IN ANIMATIONS ====================
  
  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe spreads for fade-in
  const spreads = document.querySelectorAll('.spread');
  spreads.forEach(spread => {
    spread.style.opacity = '0';
    spread.style.transform = 'translateY(30px)';
    spread.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeObserver.observe(spread);
  });
  
  // Observe portfolio items
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeObserver.observe(item);
  });
  
  // ==================== PAGE VISIBILITY ====================
  
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      if (slideshowHero) {
        stopSlideshow();
      }
    } else {
      if (slideshowHero) {
        startSlideshow();
      }
    }
  });
  
  // ==================== PERFORMANCE OPTIMIZATION ====================
  
  let resizeTimer;
  window.addEventListener('resize', function() {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      document.body.classList.remove('resize-animation-stopper');
    }, 400);
  });
  
  const style = document.createElement('style');
  style.textContent = `
    .resize-animation-stopper * {
      transition: none !important;
      animation: none !important;
    }
  `;
  document.head.appendChild(style);
  
  // ==================== PRELOAD IMAGES ====================
  
  function preloadImages() {
    const images = [
      'assets/ps1.jpeg',
      'assets/ps2.jpg',
      'assets/ps3.jpg',
      'assets/ps4.jpeg',
      'assets/one.jpg',
      'assets/logo.jpg',
      'assets/studio.jpg',
      'assets/standard.jpg',
      'assets/personalised.jpg',
      'assets/lifestyle.jpg',
      'assets/ps5.jpg',
      'assets/events1.jpg',
      'assets/client.jpeg'
    ];
    
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  preloadImages();
  
  // ==================== CONSOLE BRANDING ====================
  
  console.log('%c🌟 STARPIKX', 'font-size: 24px; font-weight: bold; color: #fff; background: #000; padding: 10px 20px;');
  console.log('%cJohannesburg, South Africa', 'font-size: 12px; color: #999;');
  console.log('%cstarpikx@gmail.com', 'font-size: 12px; color: #666;');
  
});