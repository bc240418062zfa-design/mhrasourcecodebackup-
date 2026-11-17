import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  schemaData?: Record<string, unknown> | Record<string, unknown>[];
}

const ROUTE_SEO: Record<string, { title: string; description: string; keywords?: string }> = {
  '/': {
    title: 'MIHORA.TECH — Sovereign Engineering & Datacenter Infrastructure | Founded by M. Matti ul Hasnain & Omema Iqbal',
    description: 'MIHORA.TECH, founded by M. Matti ul Hasnain and Omema Iqbal, engineers sovereign digital systems, physical datacenter infrastructure, automation pipelines, and 24/7 SRE operations across London (UK) and Islamabad (Pakistan).',
    keywords: 'MIHORA, MIHORA.TECH, M. Matti ul Hasnain, Omema Iqbal, sovereign engineering, datacenter infrastructure, fiber optic fusion splicing, 24/7 telemetry, London Islamabad dual hub',
  },
  '/company': {
    title: 'Company & Founders | M. Matti ul Hasnain & Omema Iqbal | MIHORA.TECH',
    description: 'Learn about MIHORA.TECH, co-founded by M. Matti ul Hasnain (Principal Systems Architect) and Omema Iqbal (Operations Director). Dual engineering command hubs in London and Islamabad.',
    keywords: 'M. Matti ul Hasnain, Omema Iqbal, MIHORA founders, MIHORA leadership, MIHORA.TECH, dual hub engineering, London Islamabad',
  },
  '/our-story': {
    title: 'Our Story | Founding Thesis & Dual-Hub Continuity | MIHORA.TECH',
    description: 'Discover why M. Matti ul Hasnain and Omema Iqbal founded MIHORA.TECH to eliminate fragile handoffs across software platforms and physical datacenter optics.',
    keywords: 'MIHORA story, M. Matti ul Hasnain, Omema Iqbal, London Islamabad command hubs, sovereign systems thesis',
  },
  '/security': {
    title: 'Zero-Trust Security, HSM Custody & ISO 27001 Architecture | MIHORA.TECH',
    description: 'Explore client-owned FIPS 140-3 HSM key custody, optical SCADA data diodes, TPM 2.0 attestation, ISO 27001 alignment, and UK-GDPR residency governance.',
    keywords: 'MIHORA security, FIPS 140-3 HSM custody, optical data diode, ISO 27001, UK GDPR sovereign infrastructure',
  },
  '/tools': {
    title: 'Engineering Calculators: SLA Downtime, Optical Loss & TCO | MIHORA.TECH',
    description: 'Interactive technical calculators for 99.999% SLA downtime budgets, TIA-568-D single-mode fiber attenuation, and 5-year sovereign infrastructure vs cloud TCO.',
    keywords: 'SLA downtime calculator, optical fiber loss calculator, TIA-568-D link budget, sovereign TCO calculator',
  },
  '/glossary': {
    title: 'Sovereign Systems & Optical Infrastructure Glossary | MIHORA.TECH',
    description: 'Searchable engineering glossary defining OTDR testing, OS2 single-mode fiber, EVPN-VXLAN, optical data diodes, 2N power, and sovereign custody.',
    keywords: 'OTDR glossary, OS2 single-mode fiber definition, EVPN-VXLAN, optical data diode, sovereign custody',
  },
  '/compare': {
    title: 'Architecture Comparison: Sovereign Custody vs. Hyperscale Cloud | MIHORA.TECH',
    description: 'Direct technical trade-off comparison evaluating MIHORA Full-Span Sovereign Custody against hyperscale public cloud lock-in and fragmented agencies.',
    keywords: 'sovereign infrastructure vs public cloud, cloud repatriation comparison, full-span engineering custody',
  },
  '/press': {
    title: 'Press Kit, Verified Factsheet & Technical Citations | MIHORA.TECH',
    description: 'Canonical corporate boilerplate, founder biographies for M. Matti ul Hasnain and Omema Iqbal, SVG marks, and copyable technical citations.',
    keywords: 'MIHORA press kit, MIHORA corporate factsheet, M. Matti ul Hasnain bio, Omema Iqbal bio',
  },
  '/engineering': {
    title: '9-Layer Sovereign Engineering Stack & Hardware Architecture | MIHORA.TECH',
    description: 'Explore the 9-Layer MIHORA Sovereign Engineering Stack spanning bare-metal silicon, optical DWDM backbones, EVPN-VXLAN networking, SCADA edge gateways, and autonomous SRE.',
    keywords: '9-layer stack, sovereign engineering, datacenter architecture, SCADA telemetry, subsea cable routes, MIHORA engineering',
  },
  '/services': {
    title: 'Engineering & Datacenter Infrastructure Services | MIHORA.TECH',
    description: 'Five integrated divisions: Digital Systems Engineering, Automation & Intelligence, Physical Datacenter Infrastructure, Field Engineering Rigs, and 24/7 Managed SRE.',
    keywords: 'datacenter infrastructure, sovereign engineering services, server racks, fiber splicing, managed SRE, field engineering',
  },
  '/services/digital-engineering': {
    title: 'Digital Systems Engineering & Sovereign Cloud Platforms | MIHORA.TECH',
    description: 'High-concurrency Go/TypeScript microservices, partitioned databases, and zero-trust cryptographic API meshes engineered with full source sovereignty.',
  },
  '/services/automation-intelligence': {
    title: 'Automation & Applied Intelligence | SCADA & Private AI | MIHORA.TECH',
    description: 'Deterministic event-driven Kafka workflows, optically isolated SCADA edge bridges, and air-gapped on-premise inference architectures.',
  },
  '/services/physical-infrastructure': {
    title: 'Physical Datacenter Infrastructure & Optical Fiber Backbones | MIHORA.TECH',
    description: 'Tier III/IV server rack deployments, core-alignment optical fiber splicing (<=0.03 dB), EVPN-VXLAN spine-leaf fabrics, and 2N power topology.',
  },
  '/services/field-engineering': {
    title: 'Tactical Field Engineering & 4-Hour Emergency Dispatch | MIHORA.TECH',
    description: 'Certified on-site engineering teams with Fujikura fusion splicers, Fluke DSX-8000 certifiers, industrial surveillance, and 4-hour emergency SLA dispatch.',
  },
  '/services/managed-sre': {
    title: '24/7 Managed Technology & Follow-the-Sun SRE | MIHORA.TECH',
    description: 'Continuous NOC/SOC observability rotating across London and Islamabad hubs with sub-15-minute P1 incident containment and 99.999% availability SLAs.',
  },
  '/solutions': {
    title: 'Enterprise Sovereign Solutions & RFP Specifier | MIHORA.TECH',
    description: 'Operational bottleneck diagnostics, 6 core architectural pillars, and the interactive Sovereign Infrastructure RFP Specifier.',
  },
  '/how-it-works': {
    title: 'How It Works — 5-Phase Sovereign Engineering Methodology | MIHORA.TECH',
    description: 'Discover how MIHORA.TECH designs, fabricates, certifies, cuts over, and operates mission-critical digital and physical systems with zero downtime.',
  },
  '/case-studies': {
    title: 'Enterprise Case Studies & Field Deployment Benchmarks | MIHORA.TECH',
    description: 'Verified post-deployment architectures and quantitative telemetry across banking RTGS repatriation, 1,400 km DWDM fiber restoration, and grid SCADA security.',
  },
  '/industries': {
    title: 'Industries & Mission-Critical Sectors Served | MIHORA.TECH',
    description: 'Sovereign digital and physical infrastructure for Financial Settlement, Healthcare Diagnostics, Logistics Edge Networks, Energy SCADA, Telecom, and Enterprise SaaS.',
  },
  '/insights': {
    title: 'Engineering Papers, Research & Industry Dispatches | MIHORA.TECH',
    description: 'Technical whitepapers, empirical optical and kernel benchmarks, and Google Search-grounded infrastructure intelligence from MIHORA R&D Labs.',
  },
  '/resources': {
    title: 'Engineering Knowledge Hub & Open Standards Reference | MIHORA.TECH',
    description: 'Centralized technical reference: optical splice budgets, Uptime Tier math, Systems Architecture Codex, interactive tools, and whitepaper citations.',
  },
  '/partnerships': {
    title: 'Strategic Partnerships, Carrier Peering & Colocation Alliances | MIHORA.TECH',
    description: 'Collaborate with MIHORA.TECH on carrier interconnectivity, sovereign colocation deployments, hardware integrations, and enterprise delivery alliances.',
  },
  '/careers': {
    title: 'Engineering Careers & Global Relocation | MIHORA.TECH',
    description: 'Join MIHORA.TECH as a distributed systems engineer, physical datacenter specialist, automation architect, or 24/7 SRE operator across UK and Pakistan hubs.',
  },
  '/contact': {
    title: 'Contact & Architectural Dispatch | London & Islamabad Hubs | MIHORA.TECH',
    description: 'Schedule an architectural consultation or initiate urgent engineering dispatch directly with MIHORA.TECH command centers in London and Islamabad.',
  },
  '/docs': {
    title: 'Systems Architecture Codex & Technical Documentation | MIHORA.TECH',
    description: 'Official engineering documentation covering the 9-Layer Sovereign Stack, fiber splice tolerances, SCADA Modbus bridges, and dual-hub quorum specs.',
  },
  '/faq': {
    title: 'Verified Entity FAQ & Knowledge Base | MIHORA.TECH',
    description: 'Direct answers regarding MIHORA.TECH, founders M. Matti ul Hasnain and Omema Iqbal, London and Islamabad hubs, physical hardware capabilities, and SLAs.',
  },
  '/status': {
    title: 'Live Infrastructure Telemetry & System Status (99.999% SLA) | MIHORA.TECH',
    description: 'Real-time operational telemetry, 90-day uptime records, London-Islamabad corridor RTT, and maintenance journal for MIHORA.TECH core systems.',
  },
  '/legal': {
    title: 'Legal Governance, Security Protocols & ISO Compliance | MIHORA.TECH',
    description: 'Corporate governance, data sovereignty frameworks, ISO 27001 security controls, privacy, terms of service, and engineering disclaimers.',
  },
  '/privacy': {
    title: 'Privacy Policy & Sovereign Data Handling | MIHORA.TECH',
    description: 'MIHORA.TECH privacy policy detailing zero-leakage telemetry governance, GDPR/UK-GDPR alignment, and jurisdictional data custody.',
  },
  '/terms': {
    title: 'Terms of Service & Engineering Engagement Terms | MIHORA.TECH',
    description: 'Standard terms governing use of MIHORA.TECH web platforms, engineering consultation, intellectual property custody, and SLA deliverables.',
  },
  '/disclaimer': {
    title: 'Technical Disclaimer & Architectural Disclosure | MIHORA.TECH',
    description: 'Scope and warranty boundaries for published technical specifications, reference schematics, and infrastructure advisory materials.',
  },
};

export function SEOHead({ title, description, keywords, canonicalPath, schemaData }: SEOProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const normalizedPath = currentPath.length > 1 && currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
  const config = ROUTE_SEO[normalizedPath] || {
    title: 'MIHORA.TECH — Sovereign Engineering & Datacenter Infrastructure',
    description: 'Founded by M. Matti ul Hasnain and Omema Iqbal. Digital systems engineering, physical datacenter infrastructure, and 24/7 telemetry across London and Islamabad.',
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

    setMeta('meta[property="og:title"]', 'property', 'og:title', finalTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', finalDescription);
    setMeta('meta[property="og:url"]', 'property', 'og:url', finalCanonical);

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', finalTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', finalDescription);
    setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', finalCanonical);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = finalCanonical;

    // Route-specific WebPage + custom JSON-LD
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

    const payload = schemaData
      ? Array.isArray(schemaData)
        ? [basePageSchema, ...schemaData]
        : [basePageSchema, schemaData]
      : basePageSchema;

    const script = document.createElement('script');
    script.id = routeScriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(payload);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById(routeScriptId);
      if (cleanup) cleanup.remove();
    };
  }, [finalTitle, finalDescription, finalKeywords, finalCanonical, schemaData]);

  return null;
}
