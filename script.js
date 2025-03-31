document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const nav = document.querySelector('nav');
  const scrollBtn = document.querySelector('.scroll-button a');
  const body = document.body;
  const navBar = document.querySelector('.navbar');
  const menuBtn = document.querySelector('.menu-btn');
  const cancelBtn = document.querySelector('.cancel-btn');
  const navLinks = document.querySelectorAll('.menu li a');

  // ===== Sticky Navigation =====
  function handleScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollPosition > 20) {
      nav.classList.add('sticky');
      scrollBtn.style.display = 'block';
    } else {
      nav.classList.remove('sticky');
      scrollBtn.style.display = 'none';
    }
  }

  // Throttle scroll event for better performance
  let isScrolling;
  window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(handleScroll, 50);
  }, false);

  // Initial check
  handleScroll();

  // ===== Mobile Navigation =====
  function toggleNavMenu(show) {
    if (show) {
      navBar.classList.add('active');
      menuBtn.style.opacity = '0';
      menuBtn.style.pointerEvents = 'none';
      body.style.overflow = 'hidden';
      scrollBtn.style.pointerEvents = 'none';
    } else {
      navBar.classList.remove('active');
      menuBtn.style.opacity = '1';
      menuBtn.style.pointerEvents = 'auto';
      body.style.overflow = 'auto';
      scrollBtn.style.pointerEvents = 'auto';
    }
  }

  // Event Listeners
  menuBtn.addEventListener('click', () => toggleNavMenu(true));
  cancelBtn.addEventListener('click', () => toggleNavMenu(false));

  // Close menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleNavMenu(false));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navBar.classList.contains('active') && 
        !e.target.closest('.navbar') && 
        !e.target.closest('.menu-btn')) {
      toggleNavMenu(false);
    }
  });

  // ===== Smooth Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = nav.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Scroll to Top Button =====
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===== Accessibility Improvements =====
  // Add keyboard navigation for menu
  menuBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleNavMenu(true);
    }
  });

  cancelBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleNavMenu(false);
    }
  });
});