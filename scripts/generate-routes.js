import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.log('[generate-routes] No dist/index.html found, skipping route generation.');
  process.exit(0);
}

const templateHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const navLinks = [
  { href: '/services/', label: 'Services' },
  { href: '/solutions/', label: 'Solutions' },
  { href: '/engineering/', label: 'Engineering' },
  { href: '/how-it-works/', label: 'How It Works' },
  { href: '/case-studies/', label: 'Case Studies' },
  { href: '/resources/', label: 'Resources' },
  { href: '/company/', label: 'Company & Founders' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/status/', label: 'Status (99.999%)' }
];

function escapeJsonLd(obj) {
  return JSON.stringify(obj, null, 2).replace(/</g, '\\u003c');
}

function buildHeader() {
  const linksHtml = navLinks
    .map(
      (link) =>
        `<a href="${link.href}" style="color: #94a3b8; text-decoration: none; font-size: 13px; font-weight: 600; padding: 4px 8px;">${link.label}</a>`
    )
    .join(' ');

  return `
    <header style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); background: rgba(7, 10, 18, 0.94); padding: 14px 24px; position: sticky; top: 0; z-index: 50;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <a href="/" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #f8fafc; font-weight: 800; font-size: 18px;">
          <img src="/mihora-icon.svg" alt="MIHORA.TECH" width="36" height="24" style="height: 26px; width: auto;" />
          <span>MIHORA<span style="color: #f59e0b;">.TECH</span></span>
        </a>
        <nav style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
          ${linksHtml}
          <a href="/contact/" style="background: #2563eb; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; font-family: 'JetBrains Mono', monospace; padding: 7px 14px; border-radius: 8px; letter-spacing: 0.04em;">Contact Us</a>
        </nav>
      </div>
    </header>`;
}

function buildFooter() {
  return `
    <footer style="border-top: 1px solid rgba(255, 255, 255, 0.1); background: #04060a; padding: 48px 24px 32px; margin-top: 64px; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #cbd5e1;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; padding-bottom: 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
          <div>
            <div style="font-weight: 800; font-size: 18px; color: #ffffff; margin-bottom: 10px;">
              MIHORA<span style="color: #f59e0b;">.TECH</span>
            </div>
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0 0 12px;">
              <strong style="color: #f8fafc;">MIHORA.TECH</strong> is an international sovereign engineering authority operating synchronized command hubs across London (United Kingdom) and Islamabad (Pakistan).
            </p>
            <p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #f59e0b; font-weight: 700; margin: 0;">
              CO-FOUNDED BY M. MATTI UL HASNAIN &amp; OMEMA IQBAL
            </p>
          </div>
          <div>
            <h4 style="font-size: 12px; font-family: 'JetBrains Mono', monospace; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">Command Hubs</h4>
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0 0 8px;">
              <strong style="color: #f8fafc;">London Command (UK):</strong> 128 City Road, London EC2A 4NE, United Kingdom
            </p>
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0;">
              <strong style="color: #f8fafc;">Islamabad Systems (PK):</strong> Blue Area, Islamabad 44000, Pakistan
            </p>
          </div>
          <div>
            <h4 style="font-size: 12px; font-family: 'JetBrains Mono', monospace; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">Executive Leadership</h4>
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0 0 8px;">
              <a href="/company/" style="color: #60a5fa; text-decoration: underline; font-weight: 600;">M. Matti ul Hasnain</a><br />
              <span style="font-size: 12px; color: #94a3b8;">Co-Founder &amp; Principal Systems Architect</span>
            </p>
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0;">
              <a href="/company/" style="color: #60a5fa; text-decoration: underline; font-weight: 600;">Omema Iqbal</a><br />
              <span style="font-size: 12px; color: #94a3b8;">Co-Founder &amp; Operations Director</span>
            </p>
          </div>
          <div>
            <h4 style="font-size: 12px; font-family: 'JetBrains Mono', monospace; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">Direct Dispatch &amp; AI Index</h4>
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0 0 6px;">
              Executive: <a href="mailto:hr@mihora.tech" style="color: #60a5fa; font-weight: 600;">hr@mihora.tech</a>
            </p>
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0 0 6px;">
              Dispatch: <a href="mailto:dispatch@mihora.tech" style="color: #60a5fa; font-weight: 600;">dispatch@mihora.tech</a>
            </p>
            <p style="font-size: 12px; color: #34d399; font-family: 'JetBrains Mono', monospace; font-weight: 700; margin: 8px 0 6px;">
              99.999% SLA Uptime Verified
            </p>
            <p style="font-size: 12px; font-family: 'JetBrains Mono', monospace; margin: 0;">
              <a href="/llms.txt" style="color: #38bdf8; text-decoration: none;">llms.txt</a> &middot; <a href="/llms-full.txt" style="color: #38bdf8; text-decoration: none;">llms-full.txt</a>
            </p>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; padding-top: 24px; font-size: 12px; color: #94a3b8;">
          <div>
            &copy; 2026 MIHORA.TECH (PRIVATE) LIMITED. ALL RIGHTS RESERVED.
          </div>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="/privacy/" style="color: #94a3b8; text-decoration: none;">Privacy Policy</a>
            <a href="/terms/" style="color: #94a3b8; text-decoration: none;">Terms of Service</a>
            <a href="/disclaimer/" style="color: #94a3b8; text-decoration: none;">Disclaimer</a>
            <a href="/legal/" style="color: #94a3b8; text-decoration: none;">ISO 27001 Governance</a>
          </div>
        </div>
      </div>
    </footer>`;
}

function buildFounderBanner() {
  return `
    <div style="background: #0c111d; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 14px; padding: 24px; margin: 32px 0;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #f59e0b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
        Executive Stewardship &bull; Dual-Hub Governance
      </div>
      <h3 style="font-size: 20px; color: #ffffff; margin: 0 0 12px; font-weight: 800;">
        MIHORA.TECH &mdash; Co-Founded by M. Matti ul Hasnain &amp; Omema Iqbal
      </h3>
      <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0 0 16px;">
        MIHORA.TECH was co-founded by <strong style="color: #ffffff;">M. Matti ul Hasnain</strong> (Principal Systems Architect) and <strong style="color: #ffffff;">Omema Iqbal</strong> (Operations Director). Operating synchronized sovereign engineering command centers in London (United Kingdom) and Islamabad (Pakistan), MIHORA guarantees 99.999% quorum uptime across software, optical fiber, and Tier III/IV datacenters.
      </p>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="/company/" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; padding: 8px 16px; border-radius: 8px;">Read Founders&apos; Biography &rarr;</a>
        <a href="/faq/" style="display: inline-block; background: rgba(255,255,255,0.06); color: #f8fafc; border: 1px solid rgba(255,255,255,0.16); text-decoration: none; font-size: 12px; font-weight: 700; padding: 8px 16px; border-radius: 8px;">Verified Entity FAQ</a>
      </div>
    </div>`;
}

function wrapPage(eyebrow, h1, lead, extraHtml = '') {
  return `
    <div style="max-width: 1040px; margin: 0 auto; padding: 48px 24px; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f8fafc; line-height: 1.7;">
      <div style="color: #f59e0b; font-size: 12px; font-weight: 700; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px;">
        ${eyebrow}
      </div>
      <h1 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 40px; font-weight: 800; color: #ffffff; line-height: 1.12; margin: 0 0 18px; letter-spacing: -0.02em;">
        ${h1}
      </h1>
      <p style="font-size: 18px; color: #cbd5e1; line-height: 1.7; margin: 0 0 28px;">
        ${lead}
      </p>
      ${buildFounderBanner()}
      ${extraHtml}
    </div>`;
}

function buildRouteJsonLd(route) {
  const canonicalUrl = `https://mihora.tech/${route.path}/`;
  const parts = route.path.split('/');
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mihora.tech/' }
  ];

  let accum = 'https://mihora.tech';
  parts.forEach((segment, idx) => {
    accum += `/${segment}`;
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: idx + 2,
      name: idx === parts.length - 1 ? route.breadcrumbName || route.title.split('|')[0].trim() : segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      item: `${accum}/`
    });
  });

  const graph = [
    {
      '@type': route.schemaType || 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: route.title,
      description: route.description,
      isPartOf: { '@id': 'https://mihora.tech/#website' },
      about: { '@id': 'https://mihora.tech/#organization' },
      inLanguage: 'en-US'
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbItems
    }
  ];

  if (route.extraSchema) {
    graph.push(...(Array.isArray(route.extraSchema) ? route.extraSchema : [route.extraSchema]));
  }

  return `<script type="application/ld+json">\n${escapeJsonLd({ '@context': 'https://schema.org', '@graph': graph })}\n    </script>`;
}

const routes = [
  {
    path: 'company',
    schemaType: 'AboutPage',
    breadcrumbName: 'Company & Founders',
    title: 'Company & Founders | M. Matti ul Hasnain & Omema Iqbal | MIHORA.TECH',
    description: 'Co-founded by M. Matti ul Hasnain and Omema Iqbal. Explore MIHORA.TECH governance across London (UK) & Islamabad (PK) hubs.',
    keywords: 'M. Matti ul Hasnain, Omema Iqbal, Matti ul Hasnain, MIHORA founders, MIHORA leadership, MIHORA.TECH',
    renderContent: () =>
      wrapPage(
        'Corporate Profile &bull; Co-Founded by M. Matti ul Hasnain & Omema Iqbal',
        'Company &amp; Executive Leadership',
        '<strong style="color:#ffffff;">MIHORA.TECH</strong> was co-founded by <strong style="color:#ffffff;">M. Matti ul Hasnain</strong> and <strong style="color:#ffffff;">Omema Iqbal</strong> to pioneer sovereign systems engineering, mission-critical datacenter infrastructure, and 24/7 global telemetry operations.',
        `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 40px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
              <img src="/founder-matti.jpg" alt="M. Matti ul Hasnain - Co-Founder & Principal Systems Architect of MIHORA.TECH" width="80" height="80" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover;" />
              <div>
                <span style="font-family: monospace; font-size: 11px; color: #60a5fa; font-weight: 700;">CO-FOUNDER</span>
                <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 4px 0 2px;">M. Matti ul Hasnain</h2>
                <p style="font-size: 12px; font-family: monospace; color: #94a3b8; margin: 0;">PRINCIPAL SYSTEMS ARCHITECT</p>
              </div>
            </div>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65;">
              <strong style="color:#ffffff;">M. Matti ul Hasnain</strong> leads the architecture of MIHORA&apos;s 9-layer sovereign stack, physical datacenter hardware topologies, low-latency Go &amp; TypeScript microservices, optical fiber fusion splicing (&le; 0.03 dB loss), and continuous SRE reliability protocols.
            </p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
              <img src="/founder-omema.jpg" alt="Omema Iqbal - Co-Founder & Operations Director of MIHORA.TECH" width="80" height="80" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover;" />
              <div>
                <span style="font-family: monospace; font-size: 11px; color: #f59e0b; font-weight: 700;">CO-FOUNDER</span>
                <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 4px 0 2px;">Omema Iqbal</h2>
                <p style="font-size: 12px; font-family: monospace; color: #94a3b8; margin: 0;">OPERATIONS DIRECTOR</p>
              </div>
            </div>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65;">
              <strong style="color:#ffffff;">Omema Iqbal</strong> directs dual-hub operational governance between London (UK) and Islamabad (Pakistan), ISO 27001 / UK-GDPR regulatory compliance, international enterprise delivery, and 24/7 watchdesk staffing.
            </p>
          </div>
        </div>`
      )
  },
  {
    path: 'faq',
    schemaType: 'FAQPage',
    breadcrumbName: 'Verified Entity FAQ',
    title: 'Verified Entity FAQ & Answers | MIHORA.TECH',
    description: 'Official answers about MIHORA.TECH, founders M. Matti ul Hasnain & Omema Iqbal, London-Islamabad hubs, and optical/SLA commitments.',
    keywords: 'MIHORA FAQ, who founded MIHORA, M. Matti ul Hasnain, Omema Iqbal, MIHORA.TECH',
    extraSchema: {
      '@type': 'FAQPage',
      '@id': 'https://mihora.tech/faq/#faqpage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who founded MIHORA.TECH?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MIHORA.TECH (Private) Limited was co-founded by M. Matti ul Hasnain (Co-Founder & Principal Systems Architect) and Omema Iqbal (Co-Founder & Operations Director), operating dual command hubs in London (UK) and Islamabad (Pakistan).'
          }
        },
        {
          '@type': 'Question',
          name: 'Does MIHORA.TECH deploy physical server racks and optical fiber?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Certified MIHORA engineers deploy Tier III/IV 42U–48U racks, 2N redundant PDUs, Cat6A shielded copper, and Fujikura core-alignment OS2 fiber splicing verified via EXFO bidirectional OTDR traces (<= 0.03 dB mean splice loss).'
          }
        },
        {
          '@type': 'Question',
          name: 'Do clients retain source code and cryptographic key custody?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All software repositories, Terraform manifests, optical OTDR records, and FIPS 140-3 HSM encryption root keys remain exclusively under client ownership.'
          }
        }
      ]
    },
    renderContent: () =>
      wrapPage(
        'Verified Entity Knowledge Base &bull; Direct Answers',
        'Frequently Asked Questions (FAQ)',
        'Definitive corporate answers regarding MIHORA.TECH, leadership by M. Matti ul Hasnain and Omema Iqbal, engineering capabilities, dual command hubs, and ISO 27001 compliance.',
        `<div style="display: flex; flex-direction: column; gap: 18px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 24px;">
            <h2 style="font-size: 18px; font-weight: 800; color: #60a5fa; margin: 0 0 8px;">What is MIHORA.TECH and who founded it?</h2>
            <p style="font-size: 15px; color: #cbd5e1; margin: 0;">MIHORA.TECH was founded by M. Matti ul Hasnain (Co-Founder &amp; Principal Systems Architect) and Omema Iqbal (Co-Founder &amp; Operations Director). It engineers resilient software platforms, physical datacenter infrastructure, optical fiber trunks, automation pipelines, and 24/7 SRE from London (UK) and Islamabad (Pakistan).</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 24px;">
            <h2 style="font-size: 18px; font-weight: 800; color: #60a5fa; margin: 0 0 8px;">Does MIHORA.TECH deploy physical server racks and fiber optics?</h2>
            <p style="font-size: 15px; color: #cbd5e1; margin: 0;">Yes. Physical infrastructure is core to MIHORA.TECH. Technicians execute tier-grade server rack deployments, fusion splicing (&le; 0.03 dB mean loss), shielded Cat6A cabling, and bidirectional EXFO OTDR link certification worldwide.</p>
          </div>
        </div>`
      )
  },
  {
    path: 'docs',
    schemaType: 'TechArticle',
    breadcrumbName: 'Documentation Codex',
    title: 'Technical Documentation & Architecture Codex | MIHORA.TECH',
    description: '9-layer sovereign stack codex, core-alignment optical tolerances (<= 0.03 dB), and dual-hub SRE runbooks by MIHORA.TECH.',
    keywords: 'MIHORA documentation, systems architecture codex, 9-layer stack, fiber optic splicing, SRE telemetry',
    renderContent: () =>
      wrapPage(
        'Architectural Codex &bull; Verified System Specifications',
        'Systems Architecture Codex &amp; Documentation',
        'Exhaustive architectural specifications governing the 9-layer sovereign stack, datacenter hardware tolerances, TIA-568-D fiber testing, and dual-hub quorum protocols.'
      )
  },
  {
    path: 'engineering',
    schemaType: 'TechArticle',
    breadcrumbName: '9-Layer Engineering',
    title: 'Sovereign Engineering & 9-Layer Infrastructure | MIHORA.TECH',
    description: 'Deep-stack sovereign engineering spanning physical datacenter racks, OS2 optical fiber, Go/TypeScript platforms, and 24/7 SRE.',
    keywords: 'sovereign engineering, datacenter infrastructure, MIHORA engineering, 9-layer stack, server racks',
    renderContent: () =>
      wrapPage(
        'Sovereign Engineering &bull; Physical Glass to Cloud',
        'Sovereign Engineering &amp; 9-Layer Stack',
        'MIHORA.TECH delivers unified nine-layer technology infrastructure spanning physical server racks, optical fiber trunks, distributed microservices, and 24/7 site reliability telemetry.'
      )
  },
  {
    path: 'services',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Engineering Services',
    title: 'Datacenter & Sovereign Engineering Services | MIHORA.TECH',
    description: 'Five core engineering divisions: Digital Systems, Automation & AI, Physical Datacenters, Field Dispatch Rigs, and 24/7 SRE.',
    keywords: 'datacenter services, sovereign engineering services, server rack deployment, fiber optic certification, managed SRE',
    renderContent: () =>
      wrapPage(
        'Service Capabilities &bull; Five Integrated Divisions',
        'Engineering &amp; Infrastructure Services',
        'Five core service divisions delivered under one accountable spine: Digital Systems, Automation Intelligence, Physical Datacenters, Field Engineering, and 24/7 Managed SRE.',
        `<ul style="font-size: 15px; color: #cbd5e1; line-height: 2.2; padding-left: 20px;">
          <li><a href="/services/digital-engineering/" style="color: #60a5fa; font-weight: 700;">01 &middot; Digital Systems Engineering &rarr;</a></li>
          <li><a href="/services/automation-intelligence/" style="color: #60a5fa; font-weight: 700;">02 &middot; Automation &amp; Workflow Intelligence &rarr;</a></li>
          <li><a href="/services/physical-infrastructure/" style="color: #60a5fa; font-weight: 700;">03 &middot; Physical Datacenter Infrastructure &rarr;</a></li>
          <li><a href="/services/field-engineering/" style="color: #60a5fa; font-weight: 700;">04 &middot; Field Engineering &amp; Optical Certification &rarr;</a></li>
          <li><a href="/services/managed-sre/" style="color: #60a5fa; font-weight: 700;">05 &middot; 24/7 Managed Technology &amp; SRE &rarr;</a></li>
        </ul>`
      )
  },
  {
    path: 'services/digital-engineering',
    schemaType: 'Service',
    breadcrumbName: 'Digital Engineering',
    title: 'Digital Systems Engineering & Microservices | MIHORA.TECH',
    description: 'High-concurrency Go/TypeScript backends, partitioned PostgreSQL clusters, mTLS v1.3 APIs, and React enterprise apps with full IP.',
    keywords: 'digital systems engineering, distributed microservices, Go TypeScript backend, zero-trust API mesh',
    extraSchema: {
      '@type': 'Service',
      name: 'Digital Systems Engineering',
      provider: { '@id': 'https://mihora.tech/#organization' },
      areaServed: 'Global',
      description: 'High-concurrency Go and TypeScript microservices, partitioned PostgreSQL topologies, and mTLS v1.3 gateways.'
    },
    renderContent: () =>
      wrapPage(
        'Division 01 &bull; Software & Platforms',
        'Digital Systems Engineering',
        'Production-hardened distributed backends, high-throughput Go and TypeScript microservices, PostgreSQL replication topologies, and zero-trust API meshes built for sub-10ms P99 latency.'
      )
  },
  {
    path: 'services/automation-intelligence',
    schemaType: 'Service',
    breadcrumbName: 'Automation & AI',
    title: 'Automation & Applied Intelligence Pipelines | MIHORA.TECH',
    description: 'Deterministic Kafka/Temporal orchestration, Modbus/OPC-UA industrial SCADA bridges, and air-gapped on-premise AI inference.',
    keywords: 'SCADA automation, Modbus OPC-UA telemetry, event-driven workflow automation, air-gapped AI',
    extraSchema: {
      '@type': 'Service',
      name: 'Automation & Applied Intelligence',
      provider: { '@id': 'https://mihora.tech/#organization' },
      areaServed: 'Global',
      description: 'Idempotent Kafka/Temporal event buses, optical SCADA bridges, and private inference clusters.'
    },
    renderContent: () =>
      wrapPage(
        'Division 02 &bull; Telemetry & Workflows',
        'Automation &amp; Intelligence Pipelines',
        'Deterministic workflow orchestration bridging legacy industrial Modbus/OPC-UA PLCs with real-time observability and cryptographically audited private AI routing.'
      )
  },
  {
    path: 'services/physical-infrastructure',
    schemaType: 'Service',
    breadcrumbName: 'Physical Infrastructure',
    title: 'Physical Datacenter Racks & OS2 Fiber | MIHORA.TECH',
    description: 'Tier III/IV 42U/48U server racks, 2N PDU power, NVMe-oF SAN fabrics, and Fujikura core-alignment OS2 splicing (<= 0.03 dB).',
    keywords: 'physical datacenter infrastructure, server rack buildout, core-alignment fiber splicing, Cat6A cabling',
    extraSchema: {
      '@type': 'Service',
      name: 'Physical Datacenter Infrastructure',
      provider: { '@id': 'https://mihora.tech/#organization' },
      areaServed: 'Global',
      description: 'Tier III/IV server rack build-outs, 2N dual-bus power, EVPN-VXLAN switching, and OS2 fusion splicing.'
    },
    renderContent: () =>
      wrapPage(
        'Division 03 &bull; Hardware & Optics',
        'Physical Datacenter Infrastructure',
        'Tier-III and Tier-IV datacenter construction, 42U high-density cabinet dressing, N+1/2N dual-bus power topologies, NVMe SAN fabrics, and core-alignment single-mode OS2 fiber splicing.'
      )
  },
  {
    path: 'services/field-engineering',
    schemaType: 'Service',
    breadcrumbName: 'Field Engineering',
    title: 'Tactical Field Engineering & 4h Dispatch | MIHORA.TECH',
    description: 'Rapid field crews with Fujikura splicers, EXFO OTDRs, and Fluke DSX-8000 analyzers serving UK, EMEA, and South Asia corridors.',
    keywords: 'field engineering dispatch, OTDR fiber certification, Fluke DSX-8000 testing, multi-site IT rollout',
    extraSchema: {
      '@type': 'Service',
      name: 'Tactical Field Engineering & Certification',
      provider: { '@id': 'https://mihora.tech/#organization' },
      areaServed: ['GB', 'PK', 'AE'],
      description: '4-hour emergency field break-fix dispatch, EXFO OTDR sweeps, and Fluke DSX-8000 copper testing.'
    },
    renderContent: () =>
      wrapPage(
        'Division 04 &bull; Kinetic Field Operations',
        'Field Engineering &amp; Optical Certification',
        '4-hour emergency hardware break-fix dispatch, multi-site SD-WAN and CCTV over-fiber rollouts, and signed ANSI/TIA-568-D link certification dossiers.'
      )
  },
  {
    path: 'services/managed-sre',
    schemaType: 'Service',
    breadcrumbName: 'Managed SRE',
    title: '24/7 Managed SRE & Dual-Hub NOC Command | MIHORA.TECH',
    description: 'Continuous follow-the-sun SRE across London (UTC+0) & Islamabad (UTC+5) NOCs guaranteeing 99.999% availability and <15m P1 response.',
    keywords: '24/7 managed SRE, site reliability engineering, dual NOC London Islamabad, 99.999 SLA uptime',
    extraSchema: {
      '@type': 'Service',
      name: '24/7 Managed SRE & Telemetry Command',
      provider: { '@id': 'https://mihora.tech/#organization' },
      areaServed: 'Global',
      description: 'Synchronized London and Islamabad watchdesk SRE operations with 99.999% uptime SLA.'
    },
    renderContent: () =>
      wrapPage(
        'Division 05 &bull; Continuous Custody',
        'Managed Reliability &amp; 24/7 SRE',
        'Unbroken monitoring spanning silicon thermals, optical attenuation alarms, and Kubernetes container health across London and Islamabad operations desks.'
      )
  },
  {
    path: 'how-it-works',
    schemaType: 'HowTo',
    breadcrumbName: 'How It Works',
    title: 'How It Works | 5-Phase Sovereign Delivery | MIHORA.TECH',
    description: 'Follow MIHORA.TECH 5-phase engineering methodology from discovery & 9-layer blueprinting through OTDR certification & 24/7 SRE.',
    keywords: 'how MIHORA works, engineering methodology, datacenter deployment phases, zero downtime cutover',
    extraSchema: {
      '@type': 'HowTo',
      name: 'MIHORA.TECH 5-Phase Sovereign Infrastructure Delivery Methodology',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Phase 01: Discovery & Threat Modeling' },
        { '@type': 'HowToStep', position: 2, name: 'Phase 02: 9-Layer Blueprinting & BOM Specification' },
        { '@type': 'HowToStep', position: 3, name: 'Phase 03: Hardware Staging & Distributed Software Fabrication' },
        { '@type': 'HowToStep', position: 4, name: 'Phase 04: Bidirectional OTDR Testing & Zero-Downtime Cutover' },
        { '@type': 'HowToStep', position: 5, name: 'Phase 05: London & Islamabad 24/7 SRE Custody' }
      ]
    },
    renderContent: () =>
      wrapPage(
        'Sovereign Delivery Methodology',
        'How MIHORA.TECH Engineers &amp; Ships Without Fragile Handoffs',
        'Our 5-phase engineering methodology unifies physical optics, bare-metal servers, software platforms, and 24/7 operations inside a single verifiable chain.'
      )
  },
  {
    path: 'case-studies',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Case Studies',
    title: 'Enterprise Case Studies & Field Benchmarks | MIHORA.TECH',
    description: 'Verified MIHORA.TECH deployments: interbank RTGS repatriation, 1,400 km DWDM corridors, SCADA diodes, and 1,200-site SD-WAN.',
    keywords: 'MIHORA case studies, datacenter case study, SD-WAN rollout, sovereign banking migration',
    renderContent: () =>
      wrapPage(
        'Production Case Studies &bull; Verified Outcomes',
        'Field-Proven Enterprise &amp; National Infrastructure Deployments',
        'Production infrastructure outcomes engineered across banking, multi-site retail, clinical healthcare, and national cold-chain logistics.'
      )
  },
  {
    path: 'resources',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Resources',
    title: 'Resources, Standards & Knowledge Hub | MIHORA.TECH',
    description: 'Direct TIA-568-D fiber attenuation tables, Uptime Tier SLA math, AEO definitions, and MIHORA sovereign architecture whitepapers.',
    keywords: 'MIHORA resources, fiber optic attenuation standards, SLA uptime calculator, engineering knowledge hub',
    renderContent: () =>
      wrapPage(
        'Engineering Knowledge Hub &amp; Standards',
        'Technical Reference, Optical Tolerances &amp; Architectural Guides',
        'Direct engineering references published by MIHORA.TECH R&amp;D Labs—spanning TIA-568 optical budgets, SLA downtime mathematics, whitepapers, and sizing calculators.',
        `<table style="width:100%; border-collapse: collapse; margin-top: 24px; font-size: 14px; background: #0c111d; border: 1px solid rgba(255,255,255,0.12);">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.12); text-align: left; color: #f59e0b; font-family: monospace;">
              <th style="padding: 12px 16px;">Metric / Standard</th>
              <th style="padding: 12px 16px;">TIA-568-D Limit</th>
              <th style="padding: 12px 16px;">MIHORA Verified Spec</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
              <td style="padding: 12px 16px;">OS2 Fusion Splice Loss</td>
              <td style="padding: 12px 16px; color: #94a3b8;">0.30 dB Max</td>
              <td style="padding: 12px 16px; color: #34d399; font-weight: 700;">&le; 0.03 dB Mean</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
              <td style="padding: 12px 16px;">Quorum Uptime SLA</td>
              <td style="padding: 12px 16px; color: #94a3b8;">99.995% (Tier IV)</td>
              <td style="padding: 12px 16px; color: #34d399; font-weight: 700;">99.999% Dual-Hub</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px;">Datacenter Design PUE</td>
              <td style="padding: 12px 16px; color: #94a3b8;">1.50 Industry Avg</td>
              <td style="padding: 12px 16px; color: #34d399; font-weight: 700;">1.14 Hot/Cold Containment</td>
            </tr>
          </tbody>
        </table>`
      )
  },
  {
    path: 'partnerships',
    schemaType: 'WebPage',
    breadcrumbName: 'Partnerships',
    title: 'Strategic Alliances & Carrier Partnerships | MIHORA.TECH',
    description: 'Partner with MIHORA.TECH across Tier-1 carrier BGP peering, sovereign colocation suites, hardware OEMs, and enterprise systems alliances.',
    keywords: 'MIHORA partnerships, carrier peering, sovereign colocation partner, enterprise systems integrator',
    renderContent: () =>
      wrapPage(
        'Global Alliance Program',
        'Partnering Across Optical Transit, Silicon &amp; Sovereign Infrastructure',
        'MIHORA.TECH collaborates with Tier-1 optical carriers, Tier-IV datacenter operators, hardware OEMs, and systems integrators worldwide.'
      )
  },
  {
    path: 'solutions',
    schemaType: 'WebPage',
    breadcrumbName: 'Solutions',
    title: 'Enterprise Sovereign Solutions & RFP Specifier | MIHORA.TECH',
    description: 'High-availability frameworks, zero-downtime failover, cloud repatriation, and our interactive Sovereign Architecture RFP Builder.',
    keywords: 'enterprise solutions, sovereign architecture, mission-critical systems, MIHORA solutions',
    renderContent: () =>
      wrapPage(
        'Enterprise Frameworks &bull; Sovereign Resilience',
        'Enterprise Solutions &amp; Reliability Frameworks',
        'Bespoke high-availability frameworks engineered for zero downtime, multi-region failover, sovereign data compliance, and high-throughput real-time telemetry.'
      )
  },
  {
    path: 'industries',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Industries',
    title: 'Industries & Mission-Critical Regulated Sectors | MIHORA.TECH',
    description: 'Sovereign systems engineered for financial RTGS banking, telecom carriers, energy SCADA grids, healthcare diagnostics, and logistics.',
    keywords: 'banking tech, telecom infrastructure, energy SCADA, healthcare HIPAA, logistics telemetry',
    renderContent: () =>
      wrapPage(
        'Industry Sectors &bull; Regulated Environments',
        'Mission-Critical Industry Sectors',
        'Engineering high-security, high-availability digital and physical infrastructure for Banking, Telecommunications, Healthcare, Energy Utilities, and Supply Chain Logistics.'
      )
  },
  {
    path: 'insights',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Insights',
    title: 'Technical Whitepapers & Engineering Dispatches | MIHORA.TECH',
    description: 'Architectural monographs, empirical optical loss benchmarks, distributed quorum post-mortems, and field dispatches by MIHORA.',
    keywords: 'technical whitepapers, systems research, fiber optics research, datacenter benchmarks',
    renderContent: () =>
      wrapPage(
        'Sovereign Labs &amp; Technical Dispatches',
        'Technical Papers &amp; Engineering Dispatches',
        'Peer-reviewed systems architectures, empirical optical loss benchmarks, zero-downtime database strategies, and field case studies authored by the MIHORA engineering cadre.'
      )
  },
  {
    path: 'careers',
    schemaType: 'WebPage',
    breadcrumbName: 'Careers',
    title: 'Engineering Careers & Architecture Roles | MIHORA.TECH',
    description: 'Join the MIHORA.TECH engineering cadre in London & Islamabad. Open roles in distributed Go systems, SRE, and optical field engineering.',
    keywords: 'engineering jobs, datacenter careers, systems architect, site reliability jobs, MIHORA careers',
    renderContent: () =>
      wrapPage(
        'Engineering Recruitment &bull; UK & Pakistan Hubs',
        'Join the Engineering Cadre',
        'We recruit experienced systems architects, hardware specialists, and site reliability engineers dedicated to sovereign, resilient technology infrastructure worldwide.',
        `<p style="font-size: 15px; color: #cbd5e1;">Submit engineering credentials directly to: <a href="mailto:hr@mihora.tech" style="color: #60a5fa; font-weight: 700;">hr@mihora.tech</a></p>`
      )
  },
  {
    path: 'contact',
    schemaType: 'ContactPage',
    breadcrumbName: 'Contact',
    title: 'Contact & London / Islamabad Command Hubs | MIHORA.TECH',
    description: 'Reach MIHORA.TECH executive leadership and principal architects at 128 City Road London & Blue Area Islamabad, or initiate dispatch.',
    keywords: 'contact MIHORA, MIHORA office London, MIHORA office Islamabad, emergency datacenter dispatch',
    renderContent: () =>
      wrapPage(
        'Dual-Hub Architectural Dispatch',
        'Command Hubs &amp; Direct Dispatch',
        'Direct communication channels with MIHORA executive stewardship and engineering leadership across London (UK) and Islamabad (Pakistan).',
        `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 24px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 24px;">
            <h2 style="font-size: 18px; font-weight: 800; color: #60a5fa; margin: 0 0 8px;">London Command Center (UK)</h2>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0 0 8px;">128 City Road, London EC2A 4NE, United Kingdom</p>
            <p style="font-size: 13px; color: #94a3b8; font-family: monospace;">EMEA Headquarters &bull; ISO Compliance &bull; UTC+0</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 24px;">
            <h2 style="font-size: 18px; font-weight: 800; color: #f59e0b; margin: 0 0 8px;">Islamabad Systems Center (Pakistan)</h2>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0 0 8px;">Blue Area, Islamabad 44000, Pakistan</p>
            <p style="font-size: 13px; color: #94a3b8; font-family: monospace;">Systems Labs &bull; 24/7 NOC Telemetry &bull; UTC+5</p>
          </div>
        </div>`
      )
  },
  {
    path: 'status',
    schemaType: 'WebPage',
    breadcrumbName: 'System Status',
    title: 'Infrastructure Status & Telemetry (99.999% SLA) | MIHORA.TECH',
    description: 'Live 99.999% quorum uptime, optical DWDM health, corridor round-trip latency, and 24/7 NOC operational posture.',
    keywords: 'MIHORA status, system status, 99.999% SLA, datacenter telemetry, NOC monitoring',
    renderContent: () =>
      wrapPage(
        'Continuous Observability &bull; 99.999% SLA',
        'Infrastructure Telemetry &amp; System Status',
        'Continuous real-time observability across the UK (London) and Pakistan (Islamabad) command clusters. Verified 99.999% SLA uptime.'
      )
  },
  {
    path: 'legal',
    schemaType: 'WebPage',
    breadcrumbName: 'Legal & Compliance',
    title: 'Legal Governance, ISO 27001 & Compliance | MIHORA.TECH',
    description: 'Corporate governance, ISO/IEC 27001 controls, SOC 2 Type II alignment, and client data sovereignty policies of MIHORA.TECH.',
    keywords: 'MIHORA legal, data sovereignty, ISO 27001, SOC 2, privacy policy, MIHORA terms',
    renderContent: () =>
      wrapPage(
        'Corporate Governance &bull; ISO 27001 & SOC 2 Type II',
        'Legal Governance &amp; Sovereign Compliance',
        'Corporate governance, ISO 27001 Information Security, SOC 2 Type II trust criteria, and strict client data sovereignty policies.'
      )
  },
  {
    path: 'privacy',
    schemaType: 'WebPage',
    breadcrumbName: 'Privacy Policy',
    title: 'Privacy Policy & Zero-Knowledge Data Custody | MIHORA.TECH',
    description: 'How MIHORA.TECH collects, scopes, and protects data under UK GDPR, EU GDPR, and strict client HSM encryption custody.',
    keywords: 'MIHORA privacy policy, UK GDPR compliance, client data custody',
    renderContent: () =>
      wrapPage(
        'Data Protection &bull; Zero-Knowledge Privacy',
        'Privacy Policy &amp; Client Data Custody',
        'MIHORA.TECH operates under strict data minimization, UK/EU GDPR compliance, and cryptographic client key custody across all service deployments.'
      )
  },
  {
    path: 'terms',
    schemaType: 'WebPage',
    breadcrumbName: 'Terms of Service',
    title: 'Terms of Service, IP Custody & SLA Schedules | MIHORA.TECH',
    description: 'Master engineering terms, 99.999% SLA accountability schedules, full client source-code ownership, and commercial engagement rules.',
    keywords: 'MIHORA terms of service, SLA conditions, IP ownership',
    renderContent: () =>
      wrapPage(
        'Master Commercial Conditions',
        'Terms of Service &amp; SLA Governance',
        'All custom engineering artifacts, Terraform/IaC modules, and sovereign keys belong explicitly to the commissioning enterprise upon contract milestone acceptance.'
      )
  },
  {
    path: 'disclaimer',
    schemaType: 'WebPage',
    breadcrumbName: 'Disclaimer',
    title: 'Engineering Benchmarks & Security Disclaimer | MIHORA.TECH',
    description: 'Scope boundaries, operational disclosures, and baseline optical/latency verification caveats governing MIHORA.TECH publications.',
    keywords: 'MIHORA disclaimer, engineering benchmark caveats, scope disclosure',
    renderContent: () =>
      wrapPage(
        'Technical Disclosures',
        'Engineering &amp; Architectural Disclaimer',
        'Published latency, attenuation, and PUE measurements represent verified field baselines achieved under specified environmental and hardware conditions.'
      )
  },
  {
    path: 'our-story',
    schemaType: 'AboutPage',
    breadcrumbName: 'Our Story',
    title: 'Our Story | Founding Thesis & Dual-Hub Spine | MIHORA.TECH',
    description: 'How M. Matti ul Hasnain & Omema Iqbal built MIHORA.TECH across London & Islamabad to unite glass fiber optics and distributed software.',
    keywords: 'MIHORA story, M. Matti ul Hasnain, Omema Iqbal, London Islamabad engineering hubs',
    renderContent: () =>
      wrapPage(
        'Founding Thesis &bull; MIHORA.TECH',
        'Engineered Because Critical Infrastructure Deserves One Accountable Spine',
        'Co-founded by M. Matti ul Hasnain and Omema Iqbal across London (UK) and Islamabad (Pakistan) to eliminate the accountability gap between cloud software and optical hardware.'
      )
  },
  {
    path: 'security',
    schemaType: 'WebPage',
    breadcrumbName: 'Security Center',
    title: 'Zero-Trust Security, HSM Custody & ISO 27001 | MIHORA.TECH',
    description: 'Client-owned FIPS 140-3 HSM key custody, optical SCADA data diodes, TPM 2.0 attested kernels, and ISO 27001 containment.',
    keywords: 'MIHORA security, FIPS 140-3 HSM, optical SCADA diode, ISO 27001, UK-GDPR',
    renderContent: () =>
      wrapPage(
        'Sovereign Trust &amp; Security Center',
        'Zero-Trust Security Built From Silicon Cabinets to TLS Keys',
        'Client-owned cryptographic root key custody, unidirectional optical SCADA bridges, TPM 2.0 attested Linux kernels, and ISO 27001 / UK-GDPR containment.'
      )
  },
  {
    path: 'tools',
    schemaType: 'WebApplication',
    breadcrumbName: 'Engineering Calculators',
    title: 'Engineering Calculators: SLA, Optical Loss & TCO | MIHORA.TECH',
    description: 'Compute 99.999% SLA downtime budgets, TIA-568-D OS2 fiber link attenuation, and 5-year sovereign infrastructure TCO savings.',
    keywords: 'SLA downtime calculator, optical fiber attenuation calculator, TIA-568-D, sovereign TCO',
    extraSchema: {
      '@type': 'WebApplication',
      name: 'MIHORA Engineering Workbench Calculators',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
    },
    renderContent: () =>
      wrapPage(
        'Open Engineering Workbench',
        'Sovereign Infrastructure &amp; Optical Budget Calculators',
        'Quantitative diagnostic tools for sizing 99.999% SLA downtime budgets, single-mode OS2 fiber link attenuation, and 5-year sovereign custody economics.'
      )
  },
  {
    path: 'glossary',
    schemaType: 'DefinedTermSet',
    breadcrumbName: 'Engineering Glossary',
    title: 'Sovereign Systems & Optical Fiber Glossary | MIHORA.TECH',
    description: 'Searchable engineering glossary defining OTDR certification, OS2 single-mode fiber, EVPN-VXLAN, optical diodes, and 2N power.',
    keywords: 'OTDR definition, OS2 single-mode fiber, EVPN-VXLAN, optical data diode, 2N power',
    extraSchema: {
      '@type': 'DefinedTermSet',
      name: 'MIHORA Sovereign Infrastructure & Optical Glossary',
      hasDefinedTerm: [
        { '@type': 'DefinedTerm', name: 'OTDR (Optical Time-Domain Reflectometer)', description: 'Precision instrument injecting optical pulses to certify fusion splice attenuation and detect micro-bends.' },
        { '@type': 'DefinedTerm', name: 'OS2 Single-Mode Optical Fiber', description: '9/125 µm ITU-T G.652.D fiber supporting 100G–800G DWDM across 40+ km spans.' },
        { '@type': 'DefinedTerm', name: 'Optical Data Diode', description: 'Unidirectional hardware LED-photodiode air-gap separating ICS/SCADA control planes from WANs.' }
      ]
    },
    renderContent: () =>
      wrapPage(
        'Technical Reference Lexicon',
        'Engineering, Optical Fiber &amp; Sovereign Custody Glossary',
        'Authoritative definitions across physical optical transport physics, distributed software consensus, cryptographic custody, and follow-the-sun SRE.'
      )
  },
  {
    path: 'compare',
    schemaType: 'WebPage',
    breadcrumbName: 'Architecture Comparison',
    title: 'Sovereign Custody vs. Hyperscale Cloud Compare | MIHORA.TECH',
    description: 'Direct technical matrix evaluating MIHORA Full-Span Sovereign Custody against hyperscale public cloud lock-in and fragmented vendors.',
    keywords: 'sovereign infrastructure vs cloud, full-span engineering comparison, cloud repatriation',
    renderContent: () =>
      wrapPage(
        'Decision &amp; Trade-Off Matrix',
        'Sovereign Full-Span Engineering vs. Hyperscale &amp; Fragmented Vendors',
        'Objective evaluation across accountability scope, cryptographic key custody, physical OTDR certification, bandwidth egress economics, and 24/7 operational response.'
      )
  },
  {
    path: 'press',
    schemaType: 'WebPage',
    breadcrumbName: 'Press Kit',
    title: 'Press Kit, Verified Factsheet & Citations | MIHORA.TECH',
    description: 'Official entity factsheet, founder bios for M. Matti ul Hasnain & Omema Iqbal, vector marks, and BibTeX technical citations.',
    keywords: 'MIHORA press kit, MIHORA factsheet, M. Matti ul Hasnain bio, Omema Iqbal bio',
    renderContent: () =>
      wrapPage(
        'Press, Media &amp; Directory Reference',
        'Verified Entity Factsheet, Brand Assets &amp; Reference Citations',
        'Official corporate profile, vector marks, verified London and Islamabad office records, and citable BibTeX technical monographs.'
      )
  }
];

routes.forEach((route) => {
  const targetDir = path.join(distDir, route.path);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const canonicalUrl = `https://mihora.tech/${route.path}/`;
  const routeJsonLd = buildRouteJsonLd(route);

  let pageHtml = templateHtml
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${route.title}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${route.description}" />`)
    .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${route.keywords || route.description}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta name="twitter:url" content=".*?" \/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`)
    .replace('<!-- ROUTE_JSONLD_PLACEHOLDER -->', routeJsonLd);

  const fullPrerender = `
    <div id="prerender-shell" style="min-height: 100vh; display: flex; flex-direction: column; background: #05070c; color: #f8fafc;">
      ${buildHeader()}
      <main style="flex: 1;">
        ${route.renderContent()}
      </main>
      ${buildFooter()}
    </div>`;

  pageHtml = pageHtml.replace(/<div id="root">[\s\S]*?<\/div>\s*<noscript>/, `<div id="root">${fullPrerender}</div>\n    <noscript>`);

  const targetFilePath = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFilePath, pageHtml, 'utf8');
  console.log(`[generate-routes] Generated static entry: ${route.path}/index.html`);
});

const distNoJekyll = path.join(distDir, '.nojekyll');
if (!fs.existsSync(distNoJekyll)) {
  fs.writeFileSync(distNoJekyll, '', 'utf8');
  console.log('[generate-routes] Created dist/.nojekyll');
}

const distCNAME = path.join(distDir, 'CNAME');
if (!fs.existsSync(distCNAME)) {
  fs.writeFileSync(distCNAME, 'mihora.tech', 'utf8');
  console.log('[generate-routes] Verified dist/CNAME');
}

console.log(`[generate-routes] Successfully generated ${routes.length} dark-themed, JSON-LD enriched static route HTML files.`);
