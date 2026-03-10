// ============================================
// HAIR LOSS PAGE JAVASCRIPT
// ============================================

// Menu logic is handled by mega-menu.js

// ============================================
// FAQ ACCORDION
// ============================================
function toggleFAQ(button) {
  const item = button.closest('.hairloss-faq-item');
  const isActive = item.classList.contains('active');
  
  // Close all FAQs
  document.querySelectorAll('.hairloss-faq-item').forEach(faq => {
    faq.classList.remove('active');
    const icon = faq.querySelector('.icon i');
    if(icon) {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    }
  });
  
  // Open clicked FAQ if it wasn't active
  if (!isActive) {
    item.classList.add('active');
    const icon = item.querySelector('.icon i');
    if(icon) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
    }
  }
}
