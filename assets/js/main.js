// Main JavaScript for Starpikx Magazine-Style Website

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== NAVIGATION ====================
  
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetPage = this.getAttribute('data-page');
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      // Switch pages
      pages.forEach(page => {
        page.classList.remove('active');
      });
      
      const targetElement = document.getElementById(`page-${targetPage}`);
      if (targetElement) {
        targetElement.classList.add('active');
      }
    });
  });
  
  // ==================== SLIDESHOW ====================
  
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.slide-btn.prev');
  const nextBtn = document.querySelector('.slide-btn.next');
  
  let currentSlide = 0;
  let slideInterval;
  
  function showSlide(index) {
    // Remove active from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active to current
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
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
  
  function stopSlideshow() {
    clearInterval(slideInterval);
  }
  
  // Button controls
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
  
  // Indicator controls
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      stopSlideshow();
      currentSlide = index;
      showSlide(currentSlide);
      startSlideshow();
    });
  });
  
  // Pause on hover
  const slideshowHero = document.querySelector('.slideshow-hero');
  if (slideshowHero) {
    slideshowHero.addEventListener('mouseenter', stopSlideshow);
    slideshowHero.addEventListener('mouseleave', startSlideshow);
  }
  
  // Start slideshow
  startSlideshow();
  
  // ==================== MAGAZINE FLIP ====================
  
  const magazineSpreads = document.querySelectorAll('.magazine-spread');
  const prevPageBtn = document.querySelector('.mag-nav.prev-page');
  const nextPageBtn = document.querySelector('.mag-nav.next-page');
  const currentPageElement = document.querySelector('.current-page');
  const totalPagesElement = document.querySelector('.total-pages');
  
  let currentSpread = 0;
  
  // Set total pages
  if (totalPagesElement) {
    totalPagesElement.textContent = magazineSpreads.length;
  }
  
  function showSpread(index) {
    // Ensure index is within bounds
    if (index < 0) index = 0;
    if (index >= magazineSpreads.length) index = magazineSpreads.length - 1;
    
    currentSpread = index;
    
    // Update all spreads
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
  
  function updateMagazineButtons() {
    if (prevPageBtn) {
      prevPageBtn.style.opacity = currentSpread === 0 ? '0.3' : '1';
      prevPageBtn.style.pointerEvents = currentSpread === 0 ? 'none' : 'all';
    }
    
    if (nextPageBtn) {
      nextPageBtn.style.opacity = currentSpread === magazineSpreads.length - 1 ? '0.3' : '1';
      nextPageBtn.style.pointerEvents = currentSpread === magazineSpreads.length - 1 ? 'none' : 'all';
    }
  }
  
  // Navigation buttons
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
  
  // Keyboard navigation for magazine
  document.addEventListener('keydown', function(e) {
    const archivePage = document.getElementById('page-archive');
    if (archivePage && archivePage.classList.contains('active')) {
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
  
  // Initialize magazine
  if (magazineSpreads.length > 0) {
    showSpread(0);
  }
  
  // ==================== TOUCH SWIPE SUPPORT ====================
  
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
  
  // ==================== SCROLL TO ENTER (OPTIONAL) ====================
  
  let scrollTimeout;
  const homePage = document.getElementById('page-home');
  const archiveLink = document.querySelector('[data-page="archive"]');
  
  if (homePage) {
    window.addEventListener('wheel', function(e) {
      if (homePage.classList.contains('active')) {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(function() {
          if (e.deltaY > 0 && archiveLink) {
            // Scrolling down - go to archive
            archiveLink.click();
          }
        }, 100);
      }
    }, { passive: true });
  }
  
  // ==================== PRELOAD IMAGES ====================
  
  function preloadImages() {
    const images = [
      'assets/ps1.jpeg',
      'assets/ps2.jpg',
      'assets/ps3.jpg',
      'assets/ps4.jpeg',
      'assets/one.jpg',
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
  
  // ==================== SMOOTH PERFORMANCE ====================
  
  // Disable transitions during resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      document.body.classList.remove('resize-animation-stopper');
    }, 400);
  });
  
  // Add CSS for resize animation stopper
  const style = document.createElement('style');
  style.textContent = `
    .resize-animation-stopper * {
      transition: none !important;
      animation: none !important;
    }
  `;
  document.head.appendChild(style);
  
  // ==================== CONSOLE BRANDING ====================
  
  console.log('%c🌟 STARPIKX', 'font-size: 24px; font-weight: bold; color: #fff; background: #000; padding: 10px 20px;');
  console.log('%cJohannesburg, South Africa', 'font-size: 12px; color: #999;');
  console.log('%cstarpikx@gmail.com', 'font-size: 12px; color: #666;');
  
});

// ==================== PAGE VISIBILITY ====================

// Pause slideshow when tab is hidden
document.addEventListener('visibilitychange', function() {
  const slideshowHero = document.querySelector('.slideshow-hero');
  
  if (document.hidden) {
    // Page is hidden
    if (slideshowHero) {
      const event = new Event('mouseenter');
      slideshowHero.dispatchEvent(event);
    }
  } else {
    // Page is visible
    if (slideshowHero) {
      const event = new Event('mouseleave');
      slideshowHero.dispatchEvent(event);
    }
  }
});