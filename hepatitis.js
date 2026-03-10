// ============================================
// HEPATITIS PAGE JAVASCRIPT
// ============================================

// Mobile Menu Toggle
function toggleMobileMenu() {
  const menuList = document.querySelector('.mega-menu-list');
  menuList.classList.toggle('mobile-open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  const nav = document.querySelector('.mega-menu-nav');
  const toggle = document.querySelector('.mega-menu-mobile-toggle');
  const menuList = document.querySelector('.mega-menu-list');
  
  if (!nav.contains(event.target) && menuList.classList.contains('mobile-open')) {
    menuList.classList.remove('mobile-open');
  }
});

// Handle mobile dropdown toggles
document.querySelectorAll('.mega-menu-has-dropdown > .mega-menu-link').forEach(link => {
  link.addEventListener('click', function(e) {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      const parent = this.parentElement;
      parent.classList.toggle('mobile-dropdown-open');
    }
  });
});

// Add scroll effect to nav
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.mega-menu-nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ============================================
// FAQ ACCORDION
// ============================================
function toggleFAQ(button) {
  const item = button.closest('.hep-faq-item');
  const isActive = item.classList.contains('travel-faq-active');
  
  // Close all FAQs
  document.querySelectorAll('.hep-faq-item').forEach(faq => {
    faq.classList.remove('travel-faq-active');
  });
  
  // Open clicked FAQ if it wasn't active
  if (!isActive) {
    item.classList.add('travel-faq-active');
  }
}
