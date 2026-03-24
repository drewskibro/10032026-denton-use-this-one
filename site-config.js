/*  ============================================
    SITE CONFIGURATION
    ============================================
    To create a new site, duplicate this repository
    and edit ONLY this file. All pages read from
    this config at runtime.
    ============================================ */

window.SITE_CONFIG = {

  /* ── Business Identity ── */
  pharmacyName:   'Denton Pharmacy',
  pharmacyShort:  'Denton Pharmacy',
  tagline:        'Your trusted partner in health and wellness across Denton, Manchester, and beyond.',

  /* ── Location ── */
  location:       'Denton',
  area:           'Manchester',
  locationLabel:  'Denton, UK',
  serviceArea:    'Denton &amp; Manchester',
  serviceAreaText:'Denton & Manchester',        // plain-text version (no HTML entities)
  addressLine1:   '14-16 Ashton Road',
  addressLine2:   'Denton, Manchester M34 3EX',

  /* ── Contact ── */
  phone:          '0161 336 2548',
  phoneTel:       '01613362548',                // digits only, used in tel: links
  email:          'hello@dentonpharmacy.co.uk',

  /* ── Opening Hours ── */
  hoursWeekday:   'Mon-Fri: 9am-6pm',
  hoursSaturday:  'Sat: 9am-1pm',

  /* ── Social Links ── */
  facebookUrl:    'https://facebook.com',
  instagramUrl:   'https://instagram.com',
  twitterUrl:     'https://twitter.com',
  linkedinUrl:    'https://linkedin.com',

  /* ── Brand Assets ── */
  logoUrl:        'https://c.animaapp.com/mmkb8h2ui2OjBW/img/uploaded-asset-1772035181152-0.png',
  footerLogoUrl:  'https://c.animaapp.com/mmkb8h2ui2OjBW/img/uploaded-asset-1771250493402-0.png',

  /* ── Google Reviews ── */
  googleRating:   '4.7',
  googleReviews:  '89',
  trustBarRating: '4.9',

  /* ── Lead Pharmacist ── */
  pharmacistName: 'Ahmed Al-Liabi',
  pharmacistRole: 'Lead Pharmacist &amp; Independent Prescriber',
  pharmacistYears:'15+',

  /* ── Registration / Legal ── */
  gphcNumber:     '1091169',
  companyReg:     '06703027',
  established:    'Since 2008',
  copyrightYear:  '2024',

  /* ── Stats (homepage) ── */
  statPatients:   '5,000+',
  statExperience: '15+',

  /* ── Colors (injected as CSS custom properties) ── */
  colors: {
    brandPrimary:    '#3f73ae',
    brandSecondary:  '#79bc2e',
    brandDark:       '#2a507a',
    brandBg:         '#e0e4e5',
    brandLight:      '#f5f7f8',
    navBg:           '#0a6dd4',
    navBottomBg:     '#085db5',
    navGreen:        '#79bc2e',
    navGreenDark:    '#65a324',
  }
};
