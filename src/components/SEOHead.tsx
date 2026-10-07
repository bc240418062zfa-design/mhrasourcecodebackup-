import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
}

const ROUTE_SEO: Record<string, { title: string; description: string; keywords?: string }> = {
  '/': {
    title: 'MIHORA | Sovereign Engineering & Datacenter Infrastructure',
    description: 'MIHORA.TECH, founded by M. Matti ul Hasnain and Omema Iqbal, engineers resilient digital systems, physical server infrastructure, automation pipelines, and 24/7 global telemetry operations across Pakistan, UK, and worldwide.',
    keywords: 'sovereign engineering, datacenter infrastructure, MIHORA, MIHORA.TECH, M. Matti ul Hasnain, Omema Iqbal, founded by M. Matti ul Hasnain and Omema Iqbal, Matti ul Hasnain, Omema, physical datacenter, digital infrastructure, cloud architecture',
  },
  '/company': {
    title: 'Leadership & Founders | M. Matti ul Hasnain & Omema Iqbal | MIHORA.TECH',
    description: 'Learn about MIHORA.TECH, founded by M. Matti ul Hasnain and Omema Iqbal. Dual engineering hubs across London (UK) and Islamabad (Pakistan) delivering sovereign technology globally.',
    keywords: 'M. Matti ul Hasnain, Omema Iqbal, MIHORA founders, founded by M. Matti ul Hasnain, Omema Iqbal MIHORA, MIHORA leadership, tech company Pakistan, sovereign systems, dual hub engineering',
  },
  '/engineering': {
    title: 'Sovereign Engineering & Datacenter Infrastructure | MIHORA.TECH',
    description: 'Silicon to cloud sovereign engineering stack, physical datacenter infrastructure, hardware-software integration, and 24/7 reliability axioms.',
    keywords: 'sovereign engineering, datacenter infrastructure, 9-layer stack, physical datacenter, hardware-software stack, SCADA, telemetry, site reliability, MIHORA engineering',
  },
  '/services': {
    title: 'Datacenter Infrastructure & Sovereign Engineering Services | MIHORA.TECH',
    description: 'Physical datacenter infrastructure, digital systems, automation pipelines, on-site field engineering, and 24/7 managed SRE by MIHORA.TECH.',
    keywords: 'datacenter infrastructure, sovereign engineering, server racks, fiber splicing, automation orchestration, managed SRE, enterprise switches, MIHORA services',
  },
  '/solutions': {
    title: 'Sovereign Technical Solutions & Modernization | MIHORA.TECH',
    description: 'Deconstructing legacy monoliths, autonomous business engines, multi-site infrastructure deployments, and remote operations.',
    keywords: 'legacy deconstruction, business automation, edge IoT, remote operations, custom hardware bridges, MIHORA solutions',
  },
  '/industries': {
    title: 'Industry Systems: Healthcare, EdTech, Retail & Telecom | MIHORA.TECH',
    description: 'Tailored mission-critical architectures for healthcare DICOM/HL7, high-density campus EdTech, retail inventory sync, and multi-tenant tech.',
    keywords: 'healthcare tech, HIPAA systems, campus wireless, retail edge POS, logistics telemetry, MIHORA industries',
  },
  '/insights': {
    title: 'Technical Papers, Architectural Blueprints & Insights | MIHORA.TECH',
    description: 'Deep-dive architectural papers, benchmark telemetry, and field reports authored by MIHORA.TECH principal engineers.',
    keywords: 'technical whitepapers, systems research, datacenter benchmarks, latency optimization, MIHORA insights',
  },
  '/careers': {
    title: 'Careers in Sovereign Engineering & Systems Design | MIHORA.TECH',
    description: 'Join MIHORA.TECH, founded by M. Matti ul Hasnain and Omema Iqbal, as a systems architect, firmware specialist, distributed systems engineer, or field engineering technician.',
    keywords: 'engineering jobs, tech careers Pakistan, systems architect, site reliability jobs, MIHORA careers',
  },
  '/contact': {
    title: 'Dispatch Architectural Engineering & Consulting | MIHORA.TECH',
    description: 'Initiate urgent engineering dispatch, schedule an architectural consultation, or connect directly with MIHORA.TECH founders and engineers.',
    keywords: 'contact engineers, emergency tech dispatch, RFP submission, architecture consult, MIHORA contact',
  },
  '/legal': {
    title: 'Security Compliance, ISO 27001 & Legal Governance | MIHORA.TECH',
    description: 'Data sovereignty, SOC 2 Type II compliance standards, strict confidentiality protocols, and operational terms.',
    keywords: 'security compliance, ISO 27001, SOC 2, data sovereignty, SLA guarantees',
  },
  '/docs': {
    title: 'Technical Documentation & Systems Architecture Codex | MIHORA.TECH',
    description: 'Official engineering documentation, 9-layer sovereign stack specifications, fiber splicing standards, and dual-hub telemetry protocols of MIHORA.TECH.',
    keywords: 'MIHORA documentation, systems architecture codex, 9-layer stack, datacenter specifications, fiber optic splicing, SRE telemetry, M. Matti ul Hasnain, Omema Iqbal',
  },
  '/faq': {
    title: 'Knowledge Base & Official FAQ | MIHORA.TECH — Founded by M. Matti ul Hasnain & Omema Iqbal',
    description: 'Definitive answers to frequently asked questions about MIHORA.TECH, founders M. Matti ul Hasnain & Omema Iqbal, dual UK-Pakistan command hubs, datacenter hardware, and services.',
    keywords: 'MIHORA FAQ, who is MIHORA, MIHORA founders, M. Matti ul Hasnain, Omema Iqbal, MIHORA technology, datacenter deployment, sovereign systems engineering, London Islamabad hubs',
  },
};

export function SEOHead({ title, description, keywords, canonicalPath }: SEOProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const config = ROUTE_SEO[currentPath] || {
    title: 'MIHORA.TECH | Founded by M. Matti ul Hasnain & Omema Iqbal',
    description: 'Technology Without Boundaries. Founded by M. Matti ul Hasnain and Omema Iqbal. Digital systems. Physical infrastructure. Global delivery.',
  };

  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalKeywords = keywords || config.keywords || 'MIHORA, MIHORA.TECH, M. Matti ul Hasnain, Omema Iqbal, sovereign engineering, digital infrastructure';
  const cleanPath = canonicalPath || currentPath;
  const finalCanonical = `https://mihora.tech${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = finalTitle;

    // 2. Helper to set or update meta tag
    const setMeta = (selector: string, attribute: 'name' | 'property', name: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 3. Update Standard Meta
    setMeta('meta[name="description"]', 'name', 'description', finalDescription);
    setMeta('meta[name="keywords"]', 'name', 'keywords', finalKeywords);

    // 4. Update OpenGraph Meta
    setMeta('meta[property="og:title"]', 'property', 'og:title', finalTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', finalDescription);
    setMeta('meta[property="og:url"]', 'property', 'og:url', finalCanonical);

    // 5. Update Twitter Meta
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', finalTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', finalDescription);

    // 6. Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = finalCanonical;
    }
  }, [finalTitle, finalDescription, finalKeywords, finalCanonical]);

  return null;
}
