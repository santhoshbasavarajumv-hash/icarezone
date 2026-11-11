/**
 * Dynamically updates document title, meta description, OpenGraph,
 * and canonical links based on the current page context for improved SEO.
 */
export interface SEOOptions {
  title: string;
  description: string;
  path?: string;
}

export function updatePageSEO({ title, description, path = '' }: SEOOptions): void {
  if (typeof document === 'undefined') return;

  // 1. Update Document Title
  document.title = title;

  // 2. Helper to set or create meta tag
  const setMetaTag = (attrName: string, attrValue: string, content: string) => {
    let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Standard Description
  setMetaTag('name', 'description', description);

  // 4. OpenGraph Tags
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  
  if (typeof window !== 'undefined') {
    const canonicalUrl = `${window.location.origin}${path.startsWith('/') ? path : `/${path}`}`;
    setMetaTag('property', 'og:url', canonicalUrl);

    // 5. Canonical Link Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);
  }

  // 6. Twitter Card Tags
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', description);
}

/**
 * Returns SEO metadata configuration for any given page tab in iCare zone.
 */
export function getSEOMetadataForTab(tab: string, param?: any): SEOOptions {
  switch (tab) {
    case 'services':
      return {
        title: 'Apple Device Repair Services in Mysuru | iCare zone',
        description: 'Explore our specialized repair services for iPhones, iPads, MacBooks, and Apple Watches in Mysuru. Battery replacement, camera repair, and diagnostics.',
        path: '/services'
      };

    case 'book':
      return {
        title: 'Book Apple Repair Appointment | iCare zone Mysuru',
        description: 'Reserve your priority workbench repair slot at iCare zone in Kuvempu Nagara, Mysuru. Fast turnaround and professional diagnostics for your Apple device.',
        path: '/book'
      };

    case 'confirmation':
      return {
        title: param ? `Booking #${param} Status | iCare zone Mysuru` : 'Track Appointment Status | iCare zone Mysuru',
        description: 'Track your Apple device repair appointment with iCare zone Mysuru. View intake details, workshop location, and real-time repair progress.',
        path: param ? `/confirmation?ref=${param}` : '/confirmation'
      };

    case 'about':
      return {
        title: 'About iCare zone Mysuru | Independent Apple Repair Experts',
        description: "Learn about iCare zone, Mysuru's trusted independent Apple repair facility. 4.9★ rated based on 694 verified Google reviews in Kuvempu Nagara.",
        path: '/about'
      };

    case 'contact':
      return {
        title: 'Contact iCare zone Mysuru | Directions, Phone & Hours',
        description: 'Visit iCare zone in Kuvempu Nagara, Mysuru opposite Pizza Hut. Call 080508 04656, get Google Maps directions, or chat on WhatsApp.',
        path: '/contact'
      };

    case 'privacy':
      return {
        title: 'Privacy Policy | Apple Repair Experts – iCare zone',
        description: 'Read how iCare zone protects your personal and device data during diagnostics and technical repairs at our Mysuru workshop.',
        path: '/privacy'
      };

    case 'terms':
      return {
        title: 'Terms of Service | Apple Repair Experts – iCare zone',
        description: 'Review terms, intake agreements, and independent technical service policies for Apple repairs at iCare zone in Mysuru.',
        path: '/terms'
      };

    case 'home':
    default:
      return {
        title: 'Apple Repair Experts – iCare zone | Mysuru Phone & Apple Repair',
        description: 'Expert Apple device repair in Kuvempu Nagara, Mysuru. Reliable iPhone, iPad, Mac & Watch repairs. 4.9★ rated (694 reviews). Book your appointment online.',
        path: '/'
      };
  }
}
