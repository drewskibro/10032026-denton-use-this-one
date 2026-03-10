document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.denton-nav');
  const mobileBtn = document.getElementById('denton-mobile-btn');
  const mobileMenu = document.getElementById('denton-mobile-menu');

  // ── Search Overlay (created dynamically so it works on all pages) ──
  const searchBtn = document.getElementById('denton-search-btn');
  if (searchBtn) {
    // Inject overlay HTML into body
    const overlayEl = document.createElement('div');
    overlayEl.className = 'denton-search-overlay';
    overlayEl.id = 'denton-search-overlay';
    overlayEl.setAttribute('role', 'dialog');
    overlayEl.setAttribute('aria-modal', 'true');
    overlayEl.setAttribute('aria-label', 'Search');
    overlayEl.innerHTML = `
      <button class="denton-search-close" id="denton-search-close" aria-label="Close search">
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path></svg>
        Close
      </button>
      <div class="denton-search-inner">
        <span class="denton-search-label">What are you looking for?</span>
        <div class="denton-search-input-row">
          <input type="text" class="denton-search-input" id="denton-search-input" placeholder="e.g. weight loss, travel vaccines…" autocomplete="off" spellcheck="false" />
          <button class="denton-search-submit" aria-label="Submit search">
            <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
          </button>
        </div>
        <p class="denton-search-hint"><strong>Popular:</strong> Weight Loss · Travel Vaccines · Yellow Fever · NHS Services · Hair Loss</p>
      </div>
    `;
    document.body.appendChild(overlayEl);

    const searchOverlay = overlayEl;
    const searchClose = document.getElementById('denton-search-close');
    const searchInput = document.getElementById('denton-search-input');

    const openSearch = () => {
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput && searchInput.focus(), 120);
    };

    const closeSearch = () => {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    searchBtn.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);

    // Close on backdrop click
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) closeSearch();
    });

    // ── Search Functionality ──
    const searchSubmit = overlayEl.querySelector('.denton-search-submit');
    
    const performSearch = () => {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;

      // Search mapping: keywords → page URLs
      const searchMap = {
        'weight loss': '/weight-loss.html',
        'weight': '/weight-loss.html',
        'obesity': '/weight-loss.html',
        'wegovy': '/weight-loss.html',
        'mounjaro': '/weight-loss.html',
        'travel': '/travel-health.html',
        'travel health': '/travel-health.html',
        'travel vaccines': '/travel-health.html',
        'travel vaccination': '/travel-health.html',
        'yellow fever': '/yellow-fever.html',
        'typhoid': '/typhoid.html',
        'hepatitis': '/hepatitis.html',
        'rabies': '/rabies.html',
        'brazil': '/travel-brazil.html',
        'india': '/travel-india.html',
        'thailand': '/travel-thailand.html',
        'vietnam': '/travel-vietnam.html',
        'kenya': '/travel-kenya.html',
        'cape verde': '/travel-cape-verde.html',
        'nhs': '/nhs-services.html',
        'nhs services': '/nhs-services.html',
        'prescriptions': '/nhs-services.html',
        'pharmacy first': '/nhs-services.html',
        'flu': '/nhs-services.html',
        'flu jab': '/nhs-services.html',
        'flu vaccination': '/nhs-services.html',
        'hair loss': '/hair-loss.html',
        'hair': '/hair-loss.html',
        'finasteride': '/hair-loss.html',
        'ear wax': '/ear-wax-removal.html',
        'ear wax removal': '/ear-wax-removal.html',
        'microsuction': '/ear-wax-removal.html',
        'book': '/book-appointment.html',
        'appointment': '/book-appointment.html',
        'book appointment': '/book-appointment.html',
        'consultation': '/book-appointment.html',
        'switch': '/switch-provider.html',
        'switch provider': '/switch-provider.html',
        'register': '/switch-provider.html',
        'team': '/team.html',
        'about': '/team.html',
        'staff': '/team.html',
        'blog': '/blog.html'
      };

      // Find matching page
      let targetPage = null;
      for (const [keyword, url] of Object.entries(searchMap)) {
        if (query.includes(keyword)) {
          targetPage = url;
          break;
        }
      }

      // Navigate to page or show no results
      if (targetPage) {
        window.location.href = targetPage;
      } else {
        // Show "no results" feedback
        searchInput.value = '';
        searchInput.placeholder = 'No results found. Try: weight loss, travel vaccines, NHS services…';
        setTimeout(() => {
          searchInput.placeholder = 'e.g. weight loss, travel vaccines…';
        }, 3000);
      }
    };

    // Submit on button click
    if (searchSubmit) {
      searchSubmit.addEventListener('click', performSearch);
    }

    // Submit on Enter key
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          performSearch();
        }
      });
    }
  }

  if (!mobileBtn || !mobileMenu) return;

  const mobileIcon = mobileBtn.querySelector('svg');

  // ── Scroll Effect + Compact on scroll ──
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 10);
    nav.classList.toggle('nav-compact', y > 80);
  }, { passive: true });

  // ── Mobile Menu Toggle ──
  mobileBtn.addEventListener('click', () => {
    const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    const opening = !isExpanded;

    mobileMenu.classList.toggle('active', opening);
    mobileBtn.setAttribute('aria-expanded', opening);

    if (opening) {
      mobileIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
      document.body.style.overflow = 'hidden';
    } else {
      mobileIcon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>';
      document.body.style.overflow = '';
    }
  });

  // ── Accordion Sections ──
  const accordionBtns = document.querySelectorAll('.denton-mobile-accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const accordion = btn.closest('.denton-mobile-accordion');
      const isOpen = accordion.classList.contains('open');

      // Close all open accordions
      document.querySelectorAll('.denton-mobile-accordion.open').forEach(a => a.classList.remove('open'));

      // Open the clicked one if it was closed
      if (!isOpen) {
        accordion.classList.add('open');
      }
    });
  });

  // ── Close mobile menu on link click ──
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileBtn.setAttribute('aria-expanded', 'false');
      mobileIcon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>';
      document.body.style.overflow = '';
    });
  });
});
