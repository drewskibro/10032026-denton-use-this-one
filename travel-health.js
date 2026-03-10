// ============================================
// TRAVEL HEALTH PAGE JAVASCRIPT
// ============================================

// Menu logic is handled by mega-menu.js

// ============================================
// FAQ ACCORDION
// ============================================
function toggleFAQ(button) {
  const item = button.closest('.travel-faq-item');
  const isActive = item.classList.contains('travel-faq-active');
  
  // Close all FAQs
  document.querySelectorAll('.travel-faq-item').forEach(faq => {
    faq.classList.remove('travel-faq-active');
  });
  
  // Open clicked FAQ if it wasn't active
  if (!isActive) {
    item.classList.add('travel-faq-active');
  }
}
