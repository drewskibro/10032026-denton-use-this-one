// ============================================
// WEIGHT LOSS PAGE JAVASCRIPT
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
  const item = button.closest('.wl-faq-item');
  const isActive = item.classList.contains('wl-faq-active');
  
  // Close all FAQs
  document.querySelectorAll('.wl-faq-item').forEach(faq => {
    faq.classList.remove('wl-faq-active');
  });
  
  // Open clicked FAQ if it wasn't active
  if (!isActive) {
    item.classList.add('wl-faq-active');
  }
}

// ============================================
// CALCULATOR FUNCTIONALITY
// ============================================
const calculator = {
  weightUnit: 'kg',
  heightUnit: 'cm',
  
  init() {
    this.setupToggleButtons();
    this.setupForm();
  },
  
  setupToggleButtons() {
    // Weight unit toggles
    document.querySelectorAll('.wl-calculator-input-wrapper')[0]
      .querySelectorAll('.wl-calculator-toggle-btn')
      .forEach(btn => {
        btn.addEventListener('click', () => {
          this.weightUnit = btn.dataset.unit;
          this.updateToggleState(btn);
        });
      });
    
    // Height unit toggles
    document.querySelectorAll('.wl-calculator-input-wrapper')[1]
      .querySelectorAll('.wl-calculator-toggle-btn')
      .forEach(btn => {
        btn.addEventListener('click', () => {
          this.heightUnit = btn.dataset.unit;
          this.updateToggleState(btn);
        });
      });
  },
  
  updateToggleState(activeBtn) {
    const parent = activeBtn.parentElement;
    parent.querySelectorAll('.wl-calculator-toggle-btn').forEach(btn => {
      btn.classList.remove('wl-calculator-toggle-active');
    });
    activeBtn.classList.add('wl-calculator-toggle-active');
  },
  
  setupForm() {
    const form = document.getElementById('weightLossCalculator');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.calculate();
    });
  },
  
  calculate() {
    const weightInput = parseFloat(document.getElementById('weightInput').value);
    const heightInput = parseFloat(document.getElementById('heightInput').value);
    
    if (!weightInput || !heightInput) {
      alert('Please enter both weight and height');
      return;
    }
    
    // Convert to kg and cm
    let weightKg = weightInput;
    let heightCm = heightInput;
    
    if (this.weightUnit === 'st') {
      weightKg = weightInput * 6.35029; // stone to kg
    }
    
    if (this.heightUnit === 'ft') {
      heightCm = heightInput * 30.48; // feet to cm
    }
    
    // Calculate BMI
    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);
    
    // Determine BMI category
    let category = 'Normal';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 18.5 && bmi < 25) category = 'Normal';
    else if (bmi >= 25 && bmi < 30) category = 'Overweight';
    else category = 'Obese';
    
    // Calculate weight loss projections (10-15%)
    const lossMin = (weightKg * 0.10).toFixed(1);
    const lossMax = (weightKg * 0.15).toFixed(1);
    const targetMin = (weightKg - lossMax).toFixed(1);
    const targetMax = (weightKg - lossMin).toFixed(1);
    
    // Update results
    document.getElementById('bmiNumber').textContent = bmi;
    document.getElementById('bmiCategory').textContent = category;
    document.getElementById('projectionRange').textContent = 
      `${targetMax} - ${targetMin} ${this.weightUnit}`;
    
    // Show results
    document.getElementById('calculatorResults').style.display = 'block';
    
    // Smooth scroll to results
    document.getElementById('calculatorResults').scrollIntoView({ 
      behavior: 'smooth', 
      block: 'nearest' 
    });
  }
};

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  calculator.init();
});
