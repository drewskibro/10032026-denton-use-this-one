// ============================================
// MEGA MENU JAVASCRIPT
// ============================================

// Mobile Menu Toggle Function (Global)
window.toggleMobileMenu = function() {
  const menuList = document.querySelector('.mega-menu-list');
  const mobileToggle = document.querySelector('.mega-menu-mobile-toggle');
  const body = document.body;

  if (menuList) {
    menuList.classList.toggle('mobile-open');
    
    // Toggle scroll lock on body
    if (menuList.classList.contains('mobile-open')) {
      body.style.overflow = 'hidden';
      if (mobileToggle) mobileToggle.classList.add('active');
    } else {
      body.style.overflow = '';
      if (mobileToggle) mobileToggle.classList.remove('active');
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const nav = document.querySelector('.mega-menu-nav');
    const menuList = document.querySelector('.mega-menu-list');
    const mobileToggle = document.querySelector('.mega-menu-mobile-toggle');
    
    // If menu is open and click is outside nav container
    if (menuList && menuList.classList.contains('mobile-open')) {
      if (nav && !nav.contains(event.target)) {
        // Close menu
        menuList.classList.remove('mobile-open');
        document.body.style.overflow = '';
        if (mobileToggle) mobileToggle.classList.remove('active');
      }
    }
  });

  // Handle mobile dropdown toggles
  const dropdownLinks = document.querySelectorAll('.mega-menu-has-dropdown > .mega-menu-link');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default on mobile
      if (window.innerWidth < 1024) {
        e.preventDefault();
        const parent = this.parentElement;
        
        // Close other dropdowns
        document.querySelectorAll('.mega-menu-has-dropdown').forEach(item => {
          if (item !== parent) {
            item.classList.remove('mobile-dropdown-open');
          }
        });

        parent.classList.toggle('mobile-dropdown-open');
      }
    });
  });

  // Add scroll effect to nav
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('.mega-menu-nav');
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });

  // Active State Logic
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll('.mega-menu-link');

  menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Check if current path matches link href
    // Handle root path '/' matching 'index.html'
    if (href === currentPath || 
       (currentPath === '/' && href === 'index.html') ||
       (currentPath.endsWith(href) && href !== '#')) {
      
      link.classList.add('active');
      
      // If it's inside a dropdown (though these are main links), 
      // we might want to highlight the parent. 
      // But for the main mega menu structure, the links are top-level.
      // If we had dropdown links, we'd check their parents.
    }
  });
});
