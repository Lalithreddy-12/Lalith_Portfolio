document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('nav');
  const scrollBtn = document.querySelector('.scroll-button a');
  const body = document.body;
  const navBar = document.querySelector('.navbar');
  const menuBtn = document.querySelector('.menu-btn');
  const cancelBtn = document.querySelector('.cancel-btn');
  const navLinks = document.querySelectorAll('.menu li a');
  const sections = document.querySelectorAll('section');

  // ==== Sticky Nav + Scroll Button ====
  function handleScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    nav.classList.toggle('sticky', scrollY > 20);
    scrollBtn.classList.toggle('visible', scrollY > 20);

    // Scroll reveal effect
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const revealPoint = 150;

      if (rect.top < window.innerHeight - revealPoint) {
        section.classList.add('visible-section');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  handleScroll(); // Initial check

  // ==== Mobile Nav Menu ====
  function toggleNavMenu(show) {
    navBar.classList.toggle('active', show);
    menuBtn.classList.toggle('hidden-btn', show);
    scrollBtn.classList.toggle('disable-scroll-btn', show);
    body.style.overflow = show ? 'hidden' : 'auto';
  }

  menuBtn.addEventListener('click', () => toggleNavMenu(true));
  cancelBtn.addEventListener('click', () => toggleNavMenu(false));

  navLinks.forEach((link) =>
    link.addEventListener('click', () => toggleNavMenu(false))
  );

  document.addEventListener('click', (e) => {
    const isInsideMenu = e.target.closest('.navbar') || e.target.closest('.menu-btn');
    if (navBar.classList.contains('active') && !isInsideMenu) {
      toggleNavMenu(false);
    }
  });

  // ==== Smooth Scrolling ====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));

      if (targetElement) {
        const headerOffset = nav.offsetHeight;
        const offsetTop = targetElement.offsetTop - headerOffset;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });

  // ==== Scroll to Top ====
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // ==== Accessibility ====
  [menuBtn, cancelBtn].forEach((btn, index) =>
    btn.addEventListener('keydown', (e) => {
      if (['Enter', ' '].includes(e.key)) {
        e.preventDefault();
        toggleNavMenu(index === 0); // menuBtn = true, cancelBtn = false
      }
    })
  );
});
