// Main JavaScript for Starpikx One-Page Scrolling Website with Flip Magazine

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
  
  function prevSlideFunc() {
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
      prevSlideFunc();
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
  
  // ==================== FLIP MAGAZINE (Turn.js) ====================
  
  // Wait for jQuery and Turn.js to load
  if (typeof jQuery !== 'undefined' && typeof jQuery.fn.turn !== 'undefined') {
    
    const $flipbook = $('#flipbook');
    
    // Initialize Turn.js
    $flipbook.turn({
      width: 1200,
      height: 700,
      autoCenter: true,
      acceleration: true,
      gradients: true,
      elevation: 50,
      duration: 1000,
      pages: 12 // Total pages including covers
    });
    
    // Update page indicator
    function updatePageIndicator() {
      const currentPage = $flipbook.turn('page');
      const totalPages = $flipbook.turn('pages');
      
      // Display as spread numbers (cover is 1, then pairs)
      const displayPage = Math.ceil(currentPage / 2);
      const displayTotal = Math.ceil(totalPages / 2);
      
      $('#current-page').text(displayPage);
      $('#total-pages').text(displayTotal);
      
      // Update button states
      const prevButton = $('#prev-page');
      const nextButton = $('#next-page');
      
      if (currentPage === 1) {
        prevButton.prop('disabled', true);
      } else {
        prevButton.prop('disabled', false);
      }
      
      if (currentPage === totalPages) {
        nextButton.prop('disabled', true);
      } else {
        nextButton.prop('disabled', false);
      }
    }
    
    // Listen for page turn events
    $flipbook.bind('turned', function(event, page, view) {
      updatePageIndicator();
    });
    
    // Navigation buttons
    $('#prev-page').click(function() {
      $flipbook.turn('previous');
    });
    
    $('#next-page').click(function() {
      $flipbook.turn('next');
    });
    
    // Initialize page indicator
    updatePageIndicator();
    
    // Responsive magazine
    function resizeMagazine() {
      const windowWidth = $(window).width();
      let magazineWidth, magazineHeight;
      
      if (windowWidth > 1024) {
        magazineWidth = 1200;
        magazineHeight = 700;
      } else if (windowWidth > 768) {
        magazineWidth = 900;
        magazineHeight = 600;
      } else if (windowWidth > 480) {
        magazineWidth = 600;
        magazineHeight = 500;
      } else {
        magazineWidth = windowWidth - 40;
        magazineHeight = 450;
      }
      
      $flipbook.turn('size', magazineWidth, magazineHeight);
    }
    
    $(window).resize(function() {
      resizeMagazine();
    });
    
    // Initial resize
    resizeMagazine();
    
    // Keyboard navigation
    $(document).keydown(function(e){
      if (e.keyCode == 37) { // Left arrow
        $flipbook.turn('previous');
      } else if (e.keyCode == 39) { // Right arrow
        $flipbook.turn('next');
      }
    });
    
  } else {
    console.warn('Turn.js or jQuery not loaded. Magazine flip will not work.');
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