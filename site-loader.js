/* ============================================
   SITE LOADER
   ============================================
   Reads window.SITE_CONFIG and:
   1. Injects CSS color variables
   2. Builds the shared navigation
   3. Builds the shared footer
   4. Replaces [data-site] placeholders in page content
   5. Updates all tel: links (href + display text)
   6. Global text replacement (pharmacy name, location, etc.)
   7. Updates <title> via template
   8. Updates <meta description> via template
   ============================================ */

(function () {
  'use strict';
  const C = window.SITE_CONFIG;
  if (!C) { console.warn('SITE_CONFIG not found'); return; }

  /* ── 1. Inject color overrides as CSS custom properties ── */
  (function injectColors() {
    const co = C.colors;
    if (!co) return;
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --brand-primary:    ${co.brandPrimary};
        --brand-secondary:  ${co.brandSecondary};
        --brand-dark:       ${co.brandDark};
        --brand-bg:         ${co.brandBg};
        --brand-light:      ${co.brandLight};
        --brand-purple:     ${co.brandPrimary};
        --brand-accent:     ${co.brandSecondary};
        --dp-primary:       ${co.brandPrimary};
        --dp-primary-dark:  ${co.brandDark};
        --dp-green:         ${co.navGreen};
        --dp-green-dark:    ${co.navGreenDark};
        --dp-nav-bg:        ${co.navBg};
        --dp-nav-bottom-bg: ${co.navBottomBg};
      }
    `;
    document.head.appendChild(style);
  })();

  /* ── 2. Build Navigation ── */
  (function buildNav() {
    const target = document.getElementById('site-nav');
    if (!target) return;

    target.className = 'denton-nav';
    target.innerHTML = `
    <!-- TRUST BAR -->
    <div class="denton-nav-trust-bar">
      <div class="denton-container">
        <div class="denton-trust-items">
          <div class="denton-trust-item">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
            <span>GPhC Registered</span>
          </div>
          <div class="denton-trust-divider"></div>
          <div class="denton-trust-item">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
            <span>NHS Partner</span>
          </div>
          <div class="denton-trust-divider"></div>
          <div class="denton-trust-item denton-trust-item--rating">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            <span><strong>${C.trustBarRating}</strong> Google Reviews</span>
          </div>
        </div>
      </div>
    </div>

    <!-- TOP BAR -->
    <div class="denton-nav-top">
      <div class="denton-container">
        <a href="index.html" class="denton-logo">
          <img src="${C.logoUrl}" alt="${C.pharmacyName}" class="denton-logo-img" />
        </a>
        <div class="denton-top-actions">
          <a href="tel:${C.phoneTel}" class="denton-top-link denton-top-link--phone">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
            ${C.phone}
          </a>
          <a href="nhs-services.html" class="denton-top-link denton-top-link--nhs">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
            NHS Nominate
          </a>
          <a href="book-appointment.html" class="denton-book-btn">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
            Book Consultation
          </a>
          <button class="denton-search-btn" id="denton-search-btn" aria-label="Search">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
            <span class="denton-search-btn-text">Search services&hellip;</span>
          </button>
        </div>
        <button class="denton-mobile-toggle" id="denton-mobile-btn" aria-label="Toggle menu" aria-expanded="false">
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
        </button>
      </div>
    </div>

    <!-- BOTTOM NAV -->
    <div class="denton-nav-bottom">
      <div class="denton-container">
        <div class="denton-desktop-menu">
          <div class="denton-menu-item">
            <a href="index.html" class="denton-menu-btn">Home</a>
          </div>
          <div class="denton-menu-item group">
            <button class="denton-menu-btn">
              Weight Loss
              <svg class="arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
            </button>
            <div class="denton-dropdown">
              <div class="denton-dropdown-header">
                <h3>Medical Weight Loss</h3>
                <p>Evidence-based treatments that work</p>
              </div>
              <div class="denton-dropdown-content">
                <a href="weight-loss.html" class="denton-dropdown-link">
                  <div class="denton-link-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div>
                  <div class="denton-link-text"><h4>GLP-1 Treatments</h4><p>Prescription medications like Wegovy &amp; Mounjaro</p></div>
                </a>
                <a href="weight-loss.html" class="denton-dropdown-link">
                  <div class="denton-link-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div>
                  <div class="denton-link-text"><h4>Personal Support</h4><p>Weekly check-ins with our expert pharmacist</p></div>
                </a>
                <a href="book-appointment.html" class="denton-dropdown-link">
                  <div class="denton-link-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div>
                  <div class="denton-link-text"><h4>Free Consultation</h4><p>Book your no-obligation assessment today</p></div>
                </a>
              </div>
              <div class="denton-dropdown-footer">
                <a href="weight-loss.html" class="denton-footer-link">View all weight loss services <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></a>
              </div>
            </div>
          </div>
          <div class="denton-menu-item group">
            <button class="denton-menu-btn">
              Travel
              <svg class="arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
            </button>
            <div class="denton-dropdown wide">
              <div class="denton-dropdown-header teal"><h3>Travel Vaccinations</h3><p>Official Yellow Fever Centre</p></div>
              <div class="denton-dropdown-row">
                <div class="denton-dropdown-col">
                  <div class="denton-menu-section-title">Services</div>
                  <a href="travel-health.html" class="denton-dropdown-link">
                    <div class="denton-link-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div>
                    <div class="denton-link-text"><h4>All Vaccinations</h4><p>Hepatitis, Typhoid, Rabies, Japanese Encephalitis</p></div>
                  </a>
                  <a href="yellow-fever.html" class="denton-dropdown-link">
                    <div class="denton-link-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div>
                    <div class="denton-link-text"><h4>Yellow Fever Centre</h4><p>Official certificates for Africa &amp; South America</p></div>
                  </a>
                  <a href="travel-health.html" class="denton-dropdown-link">
                    <div class="denton-link-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div>
                    <div class="denton-link-text"><h4>Travel Advice</h4><p>Destination-specific health recommendations</p></div>
                  </a>
                </div>
                <div class="denton-dropdown-col bg-gray">
                  <div class="denton-menu-section-title">Popular Destinations</div>
                  <div class="denton-destinations-grid">
                    <a href="travel-thailand.html" class="denton-destination-link"><img src="https://flagcdn.com/w40/th.png" alt="Thailand" class="denton-destination-flag"><span>Thailand</span></a>
                    <a href="travel-india.html" class="denton-destination-link"><img src="https://flagcdn.com/w40/in.png" alt="India" class="denton-destination-flag"><span>India</span></a>
                    <a href="travel-vietnam.html" class="denton-destination-link"><img src="https://flagcdn.com/w40/vn.png" alt="Vietnam" class="denton-destination-flag"><span>Vietnam</span></a>
                    <a href="travel-kenya.html" class="denton-destination-link"><img src="https://flagcdn.com/w40/ke.png" alt="Kenya" class="denton-destination-flag"><span>Kenya</span></a>
                    <a href="travel-brazil.html" class="denton-destination-link"><img src="https://flagcdn.com/w40/br.png" alt="Brazil" class="denton-destination-flag"><span>Brazil</span></a>
                    <a href="travel-cape-verde.html" class="denton-destination-link"><img src="https://flagcdn.com/w40/cv.png" alt="Cape Verde" class="denton-destination-flag"><span>Cape Verde</span></a>
                  </div>
                </div>
              </div>
              <div class="denton-dropdown-footer">
                <a href="travel-health.html" class="denton-footer-link">Explore all travel destinations <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></a>
              </div>
            </div>
          </div>
          <div class="denton-menu-item group">
            <button class="denton-menu-btn">
              Services
              <svg class="arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
            </button>
            <div class="denton-dropdown">
              <div class="denton-dropdown-header teal"><h3>Pharmacy Services</h3><p>NHS &amp; private healthcare solutions</p></div>
              <div class="denton-dropdown-content">
                <a href="nhs-services.html" class="denton-dropdown-link">
                  <div class="denton-link-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div>
                  <div class="denton-link-text"><h4>NHS Prescriptions</h4><p>Fast collection &amp; delivery service</p></div>
                </a>
                <a href="ear-wax-removal.html" class="denton-dropdown-link">
                  <div class="denton-link-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div>
                  <div class="denton-link-text"><h4>Ear Wax Removal</h4><p>Professional microsuction clinic</p></div>
                </a>
                <a href="book-appointment.html" class="denton-dropdown-link">
                  <div class="denton-link-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div>
                  <div class="denton-link-text"><h4>Pharmacy First</h4><p>Care for 7 common conditions</p></div>
                </a>
                <a href="blood-testing.html" class="denton-dropdown-link">
                  <div class="denton-link-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div>
                  <div class="denton-link-text"><h4>Blood Testing</h4><p>Private health checks &amp; diagnostic panels</p></div>
                </a>
              </div>
              <div class="denton-dropdown-footer">
                <a href="nhs-services.html" class="denton-footer-link">View all pharmacy services <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></a>
              </div>
            </div>
          </div>
          <div class="denton-menu-item">
            <a href="blog.html" class="denton-menu-btn">Hub</a>
          </div>
        </div>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <div class="denton-mobile-menu" id="denton-mobile-menu">
      <div class="denton-mobile-nav">
        <a href="index.html" class="denton-mobile-link">Home</a>
        <div class="denton-mobile-accordion">
          <button class="denton-mobile-accordion-btn">Weight Loss <svg class="denton-mobile-accordion-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></button>
          <div class="denton-mobile-accordion-content">
            <a href="weight-loss.html" class="denton-mobile-sub-link">GLP-1 Treatments</a>
            <a href="weight-loss.html" class="denton-mobile-sub-link">Personal Support</a>
            <a href="book-appointment.html" class="denton-mobile-sub-link">Free Consultation</a>
          </div>
        </div>
        <div class="denton-mobile-accordion">
          <button class="denton-mobile-accordion-btn">Travel <svg class="denton-mobile-accordion-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></button>
          <div class="denton-mobile-accordion-content">
            <a href="travel-health.html" class="denton-mobile-sub-link">All Vaccinations</a>
            <a href="yellow-fever.html" class="denton-mobile-sub-link">Yellow Fever Centre</a>
            <a href="travel-health.html" class="denton-mobile-sub-link">Travel Advice</a>
            <div class="denton-mobile-sub-divider">Popular Destinations</div>
            <a href="travel-thailand.html" class="denton-mobile-sub-link">Thailand</a>
            <a href="travel-india.html" class="denton-mobile-sub-link">India</a>
            <a href="travel-vietnam.html" class="denton-mobile-sub-link">Vietnam</a>
            <a href="travel-kenya.html" class="denton-mobile-sub-link">Kenya</a>
            <a href="travel-brazil.html" class="denton-mobile-sub-link">Brazil</a>
            <a href="travel-cape-verde.html" class="denton-mobile-sub-link">Cape Verde</a>
          </div>
        </div>
        <div class="denton-mobile-accordion">
          <button class="denton-mobile-accordion-btn">Services <svg class="denton-mobile-accordion-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></button>
          <div class="denton-mobile-accordion-content">
            <a href="nhs-services.html" class="denton-mobile-sub-link">NHS Prescriptions</a>
            <a href="ear-wax-removal.html" class="denton-mobile-sub-link">Ear Wax Removal</a>
            <a href="book-appointment.html" class="denton-mobile-sub-link">Pharmacy First</a>
            <a href="blood-testing.html" class="denton-mobile-sub-link">Blood Testing</a>
          </div>
        </div>
        <a href="blog.html" class="denton-mobile-link">Hub</a>
      </div>
      <div class="denton-mobile-cta">
        <a href="tel:${C.phoneTel}" class="denton-mobile-cta-phone">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
          ${C.phone}
        </a>
        <a href="nhs-services.html" class="denton-mobile-cta-nhs">NHS Nominate</a>
        <a href="book-appointment.html" class="denton-mobile-cta-book">Book Consultation</a>
      </div>
    </div>
    `;
  })();

  /* ── 3. Build Footer ── */
  (function buildFooter() {
    const target = document.getElementById('site-footer');
    if (!target) return;

    target.className = 'footer-section';
    target.innerHTML = `
    <div class="footer-gradient-bg"></div>
    <div class="section-container">
      <div class="footer-main">
        <div class="footer-column footer-brand">
          <a href="index.html" class="footer-logo">
            <img src="${C.footerLogoUrl}" alt="${C.pharmacyName}" class="logo-image" />
          </a>
          <p class="footer-tagline">${C.tagline}</p>
          <div class="footer-social">
            <a href="${C.facebookUrl}" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="${C.instagramUrl}" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="${C.twitterUrl}" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="${C.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div class="footer-column">
          <h3 class="footer-column-title">Our Services</h3>
          <ul class="footer-links">
            <li><a href="weight-loss.html" class="footer-link">Weight Loss Treatment</a></li>
            <li><a href="travel-health.html" class="footer-link">Travel Health Clinic</a></li>
            <li><a href="ear-wax-removal.html" class="footer-link">Ear Wax Removal</a></li>
            <li><a href="hair-loss.html" class="footer-link">Hair Loss Treatment</a></li>
            <li><a href="smoking-cessation.html" class="footer-link">Smoking Cessation</a></li>
            <li><a href="flu-jab.html" class="footer-link">Flu Vaccinations</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3 class="footer-column-title">Quick Links</h3>
          <ul class="footer-links">
            <li><a href="team.html" class="footer-link">About Us</a></li>
            <li><a href="team.html" class="footer-link">Our Team</a></li>
            <li><a href="reviews.html" class="footer-link">Patient Reviews</a></li>
            <li><a href="blog.html" class="footer-link">Health Hub</a></li>
            <li><a href="faq.html" class="footer-link">FAQs</a></li>
            <li><a href="contact.html" class="footer-link">Contact Us</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3 class="footer-column-title">Get in Touch</h3>
          <ul class="footer-contact">
            <li class="footer-contact-item">
              <div class="footer-contact-icon"><i class="fas fa-map-marker-alt"></i></div>
              <div class="footer-contact-text">
                <span>${C.addressLine1}</span>
                <span>${C.addressLine2}</span>
              </div>
            </li>
            <li class="footer-contact-item">
              <div class="footer-contact-icon"><i class="fas fa-phone"></i></div>
              <div class="footer-contact-text"><a href="tel:${C.phoneTel}">${C.phone}</a></div>
            </li>
            <li class="footer-contact-item">
              <div class="footer-contact-icon"><i class="fas fa-envelope"></i></div>
              <div class="footer-contact-text"><a href="mailto:${C.email}">${C.email}</a></div>
            </li>
            <li class="footer-contact-item">
              <div class="footer-contact-icon"><i class="fas fa-clock"></i></div>
              <div class="footer-contact-text">
                <span>${C.hoursWeekday}</span>
                <span>${C.hoursSaturday}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-certifications">
        <div class="footer-cert-item">
          <div class="footer-cert-icon"><i class="fas fa-shield-halved"></i></div>
          <div class="footer-cert-text"><span class="footer-cert-label">GPhC Registered</span><span class="footer-cert-number">${C.gphcNumber}</span></div>
        </div>
        <div class="footer-cert-divider"></div>
        <div class="footer-cert-item">
          <div class="footer-cert-icon"><i class="fas fa-building"></i></div>
          <div class="footer-cert-text"><span class="footer-cert-label">Company Reg</span><span class="footer-cert-number">${C.companyReg}</span></div>
        </div>
        <div class="footer-cert-divider"></div>
        <div class="footer-cert-item">
          <div class="footer-cert-icon"><i class="fas fa-calendar-check"></i></div>
          <div class="footer-cert-text"><span class="footer-cert-label">Established</span><span class="footer-cert-number">${C.established}</span></div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-left">
          <p class="footer-copyright">&copy; ${C.copyrightYear} ${C.pharmacyName}. All rights reserved.</p>
        </div>
        <div class="footer-bottom-right">
          <a href="privacy-policy.html" class="footer-legal-link">Privacy Policy</a>
          <span class="footer-legal-divider">&bull;</span>
          <a href="terms-conditions.html" class="footer-legal-link">Terms &amp; Conditions</a>
          <span class="footer-legal-divider">&bull;</span>
          <a href="cookie-policy.html" class="footer-legal-link">Cookie Policy</a>
        </div>
      </div>
    </div>
    `;
  })();

  /* ── 4. Replace [data-site] placeholders ── */
  (function replacePlaceholders() {
    document.querySelectorAll('[data-site]').forEach(function (el) {
      var key = el.getAttribute('data-site');
      var value = C[key];
      if (value === undefined) return;

      // For links, also update href if it's a tel: or mailto: link
      if (el.tagName === 'A') {
        if (key === 'phone' || key === 'phoneTel') {
          el.href = 'tel:' + C.phoneTel;
        } else if (key === 'email') {
          el.href = 'mailto:' + C.email;
        }
      }

      // For images, update src and alt
      if (el.tagName === 'IMG') {
        el.src = value;
        if (key === 'logoUrl' || key === 'footerLogoUrl') {
          el.alt = C.pharmacyName;
        }
        return;
      }

      el.innerHTML = value;
    });
  })();

  /* ── 5. Update all tel: links site-wide (href + display text) ── */
  (function updateTelLinks() {
    var phoneRegex = /\d[\d\s]{8,}/g; // matches sequences of digits/spaces (phone numbers)
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.href = 'tel:' + C.phoneTel;
      // Update visible phone numbers inside the link's text nodes
      var walker = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null, false);
      var node;
      while ((node = walker.nextNode())) {
        if (phoneRegex.test(node.textContent)) {
          node.textContent = node.textContent.replace(phoneRegex, C.phone);
        }
        phoneRegex.lastIndex = 0;
      }
    });
  })();

  /* ── 6. Global text replacement for business-specific strings ── */
  /*    Replaces default values in body copy, alt text, etc.       */
  (function globalTextReplace() {
    // Define replacements: [defaultValue, configValue]
    // Order matters: replace longer strings first to avoid partial matches
    var replacements = [
      ['Denton Pharmacy',       C.pharmacyName],
      ['Easy Pharmacy Ashford', C.pharmacyName],
      ['Denton &amp; Manchester', C.serviceArea],
      ['Denton & Manchester',   C.serviceAreaText],
      ['Denton, Manchester',    C.location + ', ' + C.area],
      ['Denton, UK',            C.locationLabel],
    ];

    // Replace in text nodes throughout the body
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var text = node.textContent;
      var changed = false;
      for (var i = 0; i < replacements.length; i++) {
        if (text.indexOf(replacements[i][0]) !== -1) {
          text = text.split(replacements[i][0]).join(replacements[i][1]);
          changed = true;
        }
      }
      if (changed) node.textContent = text;
    }

    // Replace in alt attributes
    document.querySelectorAll('[alt]').forEach(function (el) {
      var alt = el.getAttribute('alt');
      for (var i = 0; i < replacements.length; i++) {
        alt = alt.split(replacements[i][0]).join(replacements[i][1]);
      }
      el.setAttribute('alt', alt);
    });
  })();

  /* ── 7. Update <title> via template ── */
  (function updateTitle() {
    var tpl = document.documentElement.getAttribute('data-title-template');
    if (tpl) {
      document.title = tpl
        .replace(/\{pharmacyName\}/g, C.pharmacyName)
        .replace(/\{location\}/g, C.location)
        .replace(/\{area\}/g, C.area)
        .replace(/\{serviceArea\}/g, C.serviceAreaText);
    }
  })();

  /* ── 8. Update <meta name="description"> via template ── */
  (function updateMeta() {
    var meta = document.querySelector('meta[name="description"]');
    if (!meta) return;
    var tpl = meta.getAttribute('data-template');
    if (!tpl) return;
    meta.content = tpl
      .replace(/\{pharmacyName\}/g, C.pharmacyName)
      .replace(/\{pharmacyShort\}/g, C.pharmacyShort)
      .replace(/\{location\}/g, C.location)
      .replace(/\{area\}/g, C.area)
      .replace(/\{serviceArea\}/g, C.serviceAreaText)
      .replace(/\{pharmacistName\}/g, C.pharmacistName)
      .replace(/\{phone\}/g, C.phone);
  })();

})();
