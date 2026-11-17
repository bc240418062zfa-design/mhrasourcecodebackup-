import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  schemaData?: Record<string, unknown> | Record<string, unknown>[];
}

const ROUTE_SEO: Record<string, { label: string; title: string; description: string; keywords?: string }> = {
  '/': {
    label: 'Home',
    title: 'MIHORA.TECH — Sovereign Engineering & Datacenter Systems',
    description: 'Co-founded by M. Matti ul Hasnain & Omema Iqbal across London & Islamabad. Custom software platforms, OTDR-verified optical fiber, and 24/7 SRE.',
    keywords: 'MIHORA, MIHORA.TECH, M. Matti ul Hasnain, Omema Iqbal, sovereign engineering, datacenter infrastructure, fiber optic fusion splicing, London Islamabad',
  },
  '/company': {
    label: 'Company & Founders',
    title: 'Company & Founders | M. Matti ul Hasnain & Omema Iqbal',
    description: 'About MIHORA.TECH, co-founded by M. Matti ul Hasnain (Principal Systems Architect) and Omema Iqbal (Operations Director) in London & Islamabad.',
    keywords: 'M. Matti ul Hasnain, Omema Iqbal, MIHORA founders, MIHORA leadership, MIHORA.TECH, London Islamabad',
  },
  '/our-story': {
    label: 'Our Story',
    title: 'Our Story | Founding Thesis & Dual-Hub Continuity | MIHORA',
    description: 'Why M. Matti ul Hasnain and Omema Iqbal founded MIHORA.TECH to unify software platforms, physical datacenter optics, and 24/7 SRE custody.',
  },
  '/security': {
    label: 'Security & Trust Center',
    title: 'Zero-Trust Security, HSM Custody & ISO 27001 | MIHORA.TECH',
    description: 'Client-owned FIPS 140-3 HSM key custody, optical SCADA data diodes, TPM 2.0 attestation, ISO 27001 controls, and UK-GDPR governance.',
  },
  '/tools': {
    label: 'Engineering Calculators',
    title: 'SLA Downtime, Optical Fiber Loss & TCO Calculators | MIHORA',
    description: 'Interactive engineering tools for 99.999% SLA downtime budgets, TIA-568-D OS2 optical link attenuation, and 5-year sovereign cloud TCO.',
  },
  '/glossary': {
    label: 'Engineering Glossary',
    title: 'Sovereign Systems & Optical Fiber Glossary | MIHORA.TECH',
    description: 'Authoritative engineering definitions for OTDR testing, OS2 single-mode fiber, EVPN-VXLAN, optical data diodes, 2N power, and sovereign custody.',
  },
  '/compare': {
    label: 'Architecture Comparison',
    title: 'Sovereign Custody vs. Hyperscale Cloud Matrix | MIHORA.TECH',
    description: 'Technical comparison matrix weighing MIHORA full-span engineering custody against hyperscale public cloud lock-in and fragmented agencies.',
  },
  '/press': {
    label: 'Press Kit',
    title: 'Press Kit, Verified Factsheet & Citations | MIHORA.TECH',
    description: 'Canonical boilerplate, founder biographies for M. Matti ul Hasnain & Omema Iqbal, SVG marks, and BibTeX technical monograph citations.',
  },
  '/engineering': {
    label: 'Engineering Stack',
    title: '9-Layer Sovereign Engineering Stack & Hardware | MIHORA.TECH',
    description: 'Explore MIHORA’s 9-Layer Sovereign Stack spanning bare-metal silicon, OS2 optical backbones, EVPN-VXLAN fabrics, SCADA diodes, and 24/7 SRE.',
  },
  '/services': {
    label: 'Services',
    title: 'Engineering & Datacenter Infrastructure Services | MIHORA',
    description: 'Five integrated divisions: Digital Engineering, Automation & AI, Physical Datacenters, Field Engineering Rigs, and 24/7 Managed SRE.',
  },
  '/services/digital-engineering': {
    label: 'Digital Systems Engineering',
    title: 'Digital Systems Engineering & Sovereign Cloud | MIHORA.TECH',
    description: 'High-concurrency Go & TypeScript microservices, partitioned PostgreSQL, and zero-trust API meshes built with 100% client source ownership.',
  },
  '/services/automation-intelligence': {
    label: 'Automation & Intelligence',
    title: 'Automation & Applied Intelligence | SCADA & AI | MIHORA',
    description: 'Deterministic Kafka/Temporal orchestration, optically isolated industrial SCADA bridges, and air-gapped on-premise inference systems.',
  },
  '/services/physical-infrastructure': {
    label: 'Physical Infrastructure',
    title: 'Physical Datacenter Racks & Optical Fiber | MIHORA.TECH',
    description: 'Tier III/IV 42U server racks, core-alignment optical fiber splicing (<=0.03 dB), EVPN-VXLAN spine-leaf fabrics, and 2N power topology.',
  },
  '/services/field-engineering': {
    label: 'Field Engineering',
    title: 'Tactical Field Engineering & 4-Hour Dispatch | MIHORA.TECH',
    description: 'Certified on-site engineering teams with Fujikura fusion splicers, EXFO OTDRs, Fluke DSX-8000 analyzers, and 4-hour emergency SLA dispatch.',
  },
  '/services/managed-sre': {
    label: '24/7 Managed SRE',
    title: '24/7 Managed SRE & Follow-the-Sun Telemetry | MIHORA.TECH',
    description: 'Continuous NOC/SOC observability rotating across London and Islamabad hubs with <15m P1 containment and 99.999% uptime SLAs.',
  },
  '/solutions': {
    label: 'Enterprise Solutions',
    title: 'Enterprise Sovereign Solutions & RFP Specifier | MIHORA',
    description: 'Operational bottleneck diagnostics, 6 core architectural pillars, and interactive Sovereign Infrastructure RFP Builder.',
  },
  '/how-it-works': {
    label: 'How It Works',
    title: 'How It Works — 5-Phase Engineering Methodology | MIHORA',
    description: 'Discover how MIHORA.TECH designs, builds, certifies with OTDR, cuts over without downtime, and operates sovereign systems 24/7.',
  },
  '/case-studies': {
    label: 'Case Studies',
    title: 'Enterprise Case Studies & Field Benchmarks | MIHORA.TECH',
    description: 'Verified deployment metrics across sovereign banking RTGS repatriation, 1,200-site SD-WAN rollouts, and industrial SCADA isolation.',
  },
  '/industries': {
    label: 'Industries Served',
    title: 'Industries & Mission-Critical Sectors Served | MIHORA.TECH',
    description: 'Sovereign digital and physical infrastructure for Financial Settlement, Healthcare Diagnostics, Energy Grids, Logistics, Telecom, and SaaS.',
  },
  '/insights': {
    label: 'Insights & Research',
    title: 'Engineering Papers & Field Insights | MIHORA.TECH',
    description: 'Technical whitepapers, empirical optical jitter benchmarks, and live Google Search-grounded infrastructure intelligence from MIHORA Labs.',
  },
  '/resources': {
    label: 'Resources Hub',
    title: 'Engineering Knowledge Hub & Open Standards | MIHORA.TECH',
    description: 'Reference tables for TIA-568-D fiber attenuation, Uptime Tier downtime math, Architecture Codex, and sovereign sizing calculators.',
  },
  '/partnerships': {
    label: 'Partnerships',
    title: 'Strategic Partnerships, Peering & Colocation | MIHORA.TECH',
    description: 'Partner with MIHORA.TECH on Tier-1 carrier BGP peering, sovereign colocation suites, hardware OEM integrations, and enterprise delivery.',
  },
  '/careers': {
    label: 'Careers',
    title: 'Engineering Careers & UK/Pakistan Relocation | MIHORA.TECH',
    description: 'Join MIHORA.TECH as a distributed systems engineer, field fiber specialist, automation architect, or 24/7 SRE operator.',
  },
  '/contact': {
    label: 'Contact & Dispatch',
    title: 'Contact & Architectural Dispatch | London & Islamabad',
    description: 'Schedule an architectural consultation or initiate urgent dispatch directly with MIHORA.TECH hubs in London and Islamabad.',
  },
  '/docs': {
    label: 'Technical Docs',
    title: 'Systems Architecture Codex & Technical Docs | MIHORA.TECH',
    description: 'Official MIHORA.TECH engineering documentation: 9-Layer Sovereign Stack, optical splice tolerances, and dual-hub quorum schemas.',
  },
  '/faq': {
    label: 'Verified Entity FAQ',
    title: 'Verified Entity FAQ & Knowledge Base | MIHORA.TECH',
    description: 'Direct answers on MIHORA.TECH, founders M. Matti ul Hasnain & Omema Iqbal, London & Islamabad hubs, physical infrastructure, and SLAs.',
  },
  '/status': {
    label: 'System Status',
    title: 'Live Infrastructure Status (99.999% SLA) | MIHORA.TECH',
    description: 'Real-time operational telemetry, 90-day uptime records, London-Islamabad corridor latency, and incident journal for MIHORA.TECH.',
  },
  '/legal': {
    label: 'Legal & Compliance',
    title: 'Legal Governance, Security & ISO Compliance | MIHORA.TECH',
    description: 'Corporate governance, UK-GDPR / EU-GDPR sovereignty frameworks, ISO 27001 controls, privacy, and engineering terms.',
  },
  '/privacy': {
    label: 'Privacy Policy',
    title: 'Privacy Policy & Sovereign Data Custody | MIHORA.TECH',
    description: 'MIHORA.TECH privacy policy detailing zero-leakage telemetry governance, UK/EU GDPR alignment, and client cryptographic custody.',
  },
  '/terms': {
    label: 'Terms of Service',
    title: 'Terms of Service & IP Ownership Terms | MIHORA.TECH',
    description: 'Master commercial terms governing MIHORA.TECH platforms, source IP custody, 99.999% SLA schedules, and engineering consultations.',
  },
  '/disclaimer': {
    label: 'Technical Disclaimer',
    title: 'Technical Disclaimer & Benchmark Scope | MIHORA.TECH',
    description: 'Scope and warranty boundaries governing published optical specifications, latency measurements, and reference diagrams.',
  },
};

export function SEOHead({ title, description, keywords, canonicalPath, ogType = 'website', schemaData }: SEOProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const normalizedPath = currentPath.length > 1 && currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
  const config = ROUTE_SEO[normalizedPath] || {
    label: 'Engineering',
    title: 'MIHORA.TECH — Sovereign Engineering & Datacenter Systems',
    description: 'Co-founded by M. Matti ul Hasnain and Omema Iqbal. Custom digital systems, physical datacenter infrastructure, and 24/7 telemetry across London and Islamabad.',
  };

  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalKeywords =
    keywords ||
    config.keywords ||
    'MIHORA, MIHORA.TECH, M. Matti ul Hasnain, Omema Iqbal, sovereign engineering, datacenter infrastructure';

  const cleanPath = canonicalPath || normalizedPath;
  let formattedPath = cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath;
  if (formattedPath !== '/' && !formattedPath.endsWith('/')) {
    formattedPath += '/';
  }
  const finalCanonical = `https://mihora.tech${formattedPath}`;

  useEffect(() => {
    document.title = finalTitle;

    const setMeta = (selector: string, attribute: 'name' | 'property', name: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="title"]', 'name', 'title', finalTitle);
    setMeta('meta[name="description"]', 'name', 'description', finalDescription);
    setMeta('meta[name="keywords"]', 'name', 'keywords', finalKeywords);

    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMeta('meta[property="og:title"]', 'property', 'og:title', finalTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', finalDescription);
    setMeta('meta[property="og:url"]', 'property', 'og:url', finalCanonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', 'https://mihora.tech/og-image.jpg');

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', finalTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', finalDescription);
    setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', finalCanonical);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', 'https://mihora.tech/og-image.jpg');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = finalCanonical;

    const routeScriptId = 'mihora-route-jsonld';
    const prev = document.getElementById(routeScriptId);
    if (prev) prev.remove();

    const basePageSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${finalCanonical}#webpage`,
      url: finalCanonical,
      name: finalTitle,
      description: finalDescription,
      isPartOf: { '@id': 'https://mihora.tech/#website' },
      about: { '@id': 'https://mihora.tech/#organization' },
    };

    const breadcrumbItems: Record<string, unknown>[] = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mihora.tech/',
      },
    ];
    if (formattedPath !== '/') {
      const segments = formattedPath.replace(/^\/|\/$/g, '').split('/');
      if (segments.length > 1 && segments[0] === 'services') {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://mihora.tech/services/',
        });
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: config.label,
          item: finalCanonical,
        });
      } else {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: config.label,
          item: finalCanonical,
        });
      }
    }

    const breadcrumbSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${finalCanonical}#breadcrumb`,
      itemListElement: breadcrumbItems,
    };

    const extraSchemas = schemaData
      ? Array.isArray(schemaData)
        ? schemaData
        : [schemaData]
      : [];

    const payload = [basePageSchema, breadcrumbSchema, ...extraSchemas];

    const script = document.createElement('script');
    script.id = routeScriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(payload);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById(routeScriptId);
      if (cleanup) cleanup.remove();
    };
  }, [finalTitle, finalDescription, finalKeywords, finalCanonical, ogType, schemaData, formattedPath, config.label]);

  return null;
}
