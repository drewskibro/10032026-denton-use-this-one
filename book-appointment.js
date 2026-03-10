// ============================================
// BOOK APPOINTMENT PAGE JAVASCRIPT
// ============================================

// Menu logic is handled by mega-menu.js

// ============================================
// FAQ ACCORDION
// ============================================
function toggleFAQ(button) {
  const item = button.closest('.book-faq-item');
  const isActive = item.classList.contains('active');
  
  // Close all FAQs
  document.querySelectorAll('.book-faq-item').forEach(faq => {
    faq.classList.remove('active');
  });
  
  // Open clicked FAQ if it wasn't active
  if (!isActive) {
    item.classList.add('active');
  }
}

// ============================================
// SCROLL TO BOOKING
// ============================================
function scrollToBooking() {
  const bookingSection = document.getElementById('booking-widget');
  if (bookingSection) {
    bookingSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}
