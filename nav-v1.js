document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('.nav-wrapper');
  const mobileBtn = document.getElementById('nav-mobile-btn');
  const mobileMenu = document.getElementById('nav-mobile-menu');
  const mobileIcon = mobileBtn.querySelector('i');

  // Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  mobileBtn.addEventListener('click', () => {
    const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    
    mobileMenu.classList.toggle('active');
    mobileBtn.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle Icon
    if (!isExpanded) {
      // Switch to Close Icon
      mobileIcon.className = 'fas fa-times';
      document.body.style.overflow = 'hidden';
    } else {
      // Switch to Hamburger Icon
      mobileIcon.className = 'fas fa-bars';
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu when clicking links
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileBtn.setAttribute('aria-expanded', 'false');
      mobileIcon.className = 'fas fa-bars';
      document.body.style.overflow = '';
    });
  });
});
