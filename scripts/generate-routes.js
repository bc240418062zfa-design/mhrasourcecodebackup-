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
  { href: '/insights/', label: 'Insights' },
  { href: '/resources/', label: 'Resources' },
  { href: '/company/', label: 'Company' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/status/', label: 'Status' }
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

function wrapPage(eyebrow, h1, lead, extraHtml = '') {
  return `
    <div style="max-width: 1080px; margin: 0 auto; padding: 48px 24px; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f8fafc; line-height: 1.7;">
      <div style="color: #f59e0b; font-size: 12px; font-weight: 700; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px;">
        ${eyebrow}
      </div>
      <h1 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 38px; font-weight: 800; color: #ffffff; line-height: 1.15; margin: 0 0 18px; letter-spacing: -0.02em;">
        ${h1}
      </h1>
      <p style="font-size: 17px; color: #cbd5e1; line-height: 1.7; margin: 0 0 32px;">
        ${lead}
      </p>
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
    keywords: 'M. Matti ul Hasnain, Omema Iqbal, Matti ul Hasnain, Omaima Hasnain, MIHORA founders, MIHORA leadership, MIHORA.TECH',
    renderContent: () =>
      wrapPage(
        'Corporate Profile &bull; Co-Founded by M. Matti ul Hasnain & Omema Iqbal',
        'Company &amp; Executive Leadership',
        '<strong style="color:#ffffff;">MIHORA.TECH</strong> was co-founded by <strong style="color:#ffffff;">M. Matti ul Hasnain</strong> (Principal Systems Architect) and <strong style="color:#ffffff;">Omema Iqbal</strong> (Operations Director) to pioneer sovereign systems engineering, mission-critical datacenter infrastructure, and 24/7 global telemetry operations across synchronized hubs in London and Islamabad.',
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
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0 0 12px;">
              <strong style="color:#ffffff;">M. Matti ul Hasnain</strong> leads the architecture of MIHORA&apos;s 9-layer sovereign stack, physical datacenter hardware topologies, low-latency Go &amp; TypeScript microservices, optical fiber fusion splicing (&le; 0.03 dB loss), and continuous SRE reliability protocols.
            </p>
            <div style="font-size: 12px; font-family: monospace; color: #38bdf8;">Focus: Core Systems · Datacenter Optics · High-Concurrency Platforms</div>
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
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0 0 12px;">
              <strong style="color:#ffffff;">Omema Iqbal</strong> directs dual-hub operational governance between London (UK) and Islamabad (Pakistan), ISO 27001 / UK-GDPR regulatory compliance, international enterprise delivery, and 24/7 watchdesk staffing.
            </p>
            <div style="font-size: 12px; font-family: monospace; color: #f59e0b;">Focus: Dual-Hub Governance · ISO 27001 · Global SLA Delivery</div>
          </div>
        </div>
        <div style="background: #080d1a; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 24px; margin-top: 24px;">
          <h3 style="font-size: 18px; color: #ffffff; margin: 0 0 12px; font-weight: 700;">Dual Command Hub Operations</h3>
          <p style="font-size: 14px; color: #94a3b8; line-height: 1.6; margin: 0;">
            Operating synchronized command centers at 128 City Road, London EC2A 4NE (UK) and Blue Area, Islamabad 44000 (Pakistan), MIHORA bridges European enterprise regulatory standards with South Asian fiber infrastructure execution.
          </p>
        </div>`
      )
  },
  {
    path: 'faq',
    schemaType: 'FAQPage',
    breadcrumbName: 'Verified Entity FAQ',
    title: 'Verified Entity FAQ & Answers | MIHORA.TECH',
    description: 'Official answers about MIHORA.TECH, founders M. Matti ul Hasnain & Omema Iqbal, London-Islamabad hubs, and optical/SLA commitments.',
    keywords: 'MIHORA FAQ, who founded MIHORA, M. Matti ul Hasnain, Omema Iqbal, Omaima Hasnain, MIHORA.TECH',
    extraSchema: {
      '@type': 'FAQPage',
      '@id': 'https://mihora.tech/faq/#faqpage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who founded MIHORA.TECH and what is the entity structure?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MIHORA.TECH (Private) Limited was co-founded by M. Matti ul Hasnain (Principal Systems Architect) and Omema Iqbal (Operations Director). It operates synchronized command hubs in London (UK) and Islamabad (Pakistan).'
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
        },
        {
          '@type': 'Question',
          name: 'What SLA uptime does MIHORA.TECH guarantee for mission-critical systems?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MIHORA.TECH guarantees 99.999% quorum uptime backed by follow-the-sun continuous site reliability engineering across its synchronized London (UTC+0) and Islamabad (UTC+5) command desks.'
          }
        },
        {
          '@type': 'Question',
          name: 'Where are the MIHORA.TECH physical command centers located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MIHORA.TECH maintains dual command centers: London Command at 128 City Road, London EC2A 4NE, United Kingdom, and Islamabad Systems Center at Blue Area, Islamabad 44000, Pakistan.'
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
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 24px;">
            <h2 style="font-size: 18px; font-weight: 800; color: #60a5fa; margin: 0 0 8px;">Do clients retain source code and cryptographic key custody?</h2>
            <p style="font-size: 15px; color: #cbd5e1; margin: 0;">Yes. All software repositories, Terraform modules, network configs, and FIPS 140-3 HSM keys remain 100% under client custody. MIHORA never enforces vendor lock-in or proprietary egress tolls.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 24px;">
            <h2 style="font-size: 18px; font-weight: 800; color: #60a5fa; margin: 0 0 8px;">What is the dual-hub operational model?</h2>
            <p style="font-size: 15px; color: #cbd5e1; margin: 0;">MIHORA synchronizes engineering command between London (UTC+0) and Islamabad (UTC+5), enabling unbroken 24/7 follow-the-sun observability, dual-region active-active disaster recovery, and continuous site reliability operations without shift fatigue.</p>
          </div>
        </div>`
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
        'MIHORA delivers five interconnected engineering divisions operating under a single accountable spine, eliminating vendor finger-pointing between physical optics and distributed software.',
        `<div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
              <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0;">01 &middot; Digital Systems Engineering</h2>
              <span style="font-family: monospace; font-size: 12px; color: #38bdf8; font-weight: 700;">Sub-10ms P99 Latency</span>
            </div>
            <p style="font-size: 15px; color: #cbd5e1; line-height: 1.65; margin: 0 0 16px;">
              Distributed backend microservices in Go and TypeScript, partitioned PostgreSQL clusters with synchronous replication, mTLS v1.3 zero-trust API meshes, and event-driven data platforms engineered for high throughput.
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.08);">
              <span style="font-size: 13px; color: #94a3b8;">Key Deliverable: Production microservices with full client IP custody</span>
              <a href="/services/digital-engineering/" style="color: #60a5fa; font-weight: 700; text-decoration: none; font-size: 14px;">Explore Digital Systems &rarr;</a>
            </div>
          </div>

          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
              <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0;">02 &middot; Automation &amp; Applied Intelligence</h2>
              <span style="font-family: monospace; font-size: 12px; color: #38bdf8; font-weight: 700;">Zero Telemetry Loss</span>
            </div>
            <p style="font-size: 15px; color: #cbd5e1; line-height: 1.65; margin: 0 0 16px;">
              Deterministic Kafka and Temporal workflow orchestration, Modbus/OPC-UA industrial SCADA bridges, and air-gapped on-premise private AI routing pipelines with cryptographic audit logging.
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.08);">
              <span style="font-size: 13px; color: #94a3b8;">Key Deliverable: Idempotent event buses and SCADA bridge appliances</span>
              <a href="/services/automation-intelligence/" style="color: #60a5fa; font-weight: 700; text-decoration: none; font-size: 14px;">Explore Automation &amp; AI &rarr;</a>
            </div>
          </div>

          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
              <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0;">03 &middot; Physical Datacenter Infrastructure</h2>
              <span style="font-family: monospace; font-size: 12px; color: #38bdf8; font-weight: 700;">Tier III / Tier IV Elevations</span>
            </div>
            <p style="font-size: 15px; color: #cbd5e1; line-height: 1.65; margin: 0 0 16px;">
              Tier-grade 42U–48U server rack elevation and containment, 2N dual-bus ATS power distribution, Cat6A shielded copper dressing, NVMe-oF SAN fabrics, and core-alignment single-mode OS2 optical fiber splicing.
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.08);">
              <span style="font-size: 13px; color: #94a3b8;">Key Deliverable: PUE &le; 1.14 high-density server corridor builds</span>
              <a href="/services/physical-infrastructure/" style="color: #60a5fa; font-weight: 700; text-decoration: none; font-size: 14px;">Explore Physical Datacenters &rarr;</a>
            </div>
          </div>

          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
              <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0;">04 &middot; Tactical Field Engineering &amp; Optical Certification</h2>
              <span style="font-family: monospace; font-size: 12px; color: #38bdf8; font-weight: 700;">&le; 0.03 dB Mean Splice Loss</span>
            </div>
            <p style="font-size: 15px; color: #cbd5e1; line-height: 1.65; margin: 0 0 16px;">
              4-hour emergency break-fix dispatch across the UK and Pakistan corridors. Certified technicians equipped with Fujikura 90S+ core-alignment fusion splicers, EXFO FTB-1v2 OTDRs, and Fluke DSX-8000 testers.
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.08);">
              <span style="font-size: 13px; color: #94a3b8;">Key Deliverable: Signed ANSI/TIA-568-D optical test certification dossiers</span>
              <a href="/services/field-engineering/" style="color: #60a5fa; font-weight: 700; text-decoration: none; font-size: 14px;">Explore Field Engineering &rarr;</a>
            </div>
          </div>

          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
              <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0;">05 &middot; Managed Reliability &amp; 24/7 SRE</h2>
              <span style="font-family: monospace; font-size: 12px; color: #34d399; font-weight: 700;">99.999% SLA Quorum</span>
            </div>
            <p style="font-size: 15px; color: #cbd5e1; line-height: 1.65; margin: 0 0 16px;">
              Synchronized London (UTC+0) and Islamabad (UTC+5) follow-the-sun NOC/SOC watchdesk operations. Continuous telemetry across silicon thermals, optical attenuation, and Kubernetes cluster health.
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.08);">
              <span style="font-size: 13px; color: #94a3b8;">Key Deliverable: &lt;15 min response time for P1 production incidents</span>
              <a href="/services/managed-sre/" style="color: #60a5fa; font-weight: 700; text-decoration: none; font-size: 14px;">Explore Managed SRE &rarr;</a>
            </div>
          </div>
        </div>`
      )
  },
  {
    path: 'services/digital-engineering',
    schemaType: 'Service',
    breadcrumbName: 'Digital Engineering',
    title: 'Digital Systems Engineering & Microservices | MIHORA.TECH',
    description: 'High-concurrency Go/TypeScript backends, partitioned PostgreSQL clusters, mTLS v1.3 APIs, and React enterprise apps with full IP.',
    keywords: 'digital systems engineering, distributed microservices, Go TypeScript backend, zero-trust API mesh',
    renderContent: () =>
      wrapPage(
        'Division 01 &bull; Software & Platforms',
        'Digital Systems Engineering',
        'Production-hardened distributed backends, high-throughput Go and TypeScript microservices, PostgreSQL replication topologies, and zero-trust API meshes built for sub-10ms P99 latency.',
        `<div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px;">
            <h2 style="font-size: 20px; color: #ffffff; font-weight: 700; margin: 0 0 12px;">Architectural Capabilities</h2>
            <ul style="font-size: 15px; color: #cbd5e1; line-height: 2; padding-left: 20px; margin: 0;">
              <li><strong>Distributed Microservices:</strong> High-concurrency services compiled in Go and TypeScript utilizing gRPC and Protobuf for internal service mesh communication.</li>
              <li><strong>Data Layer Architecture:</strong> Partitioned PostgreSQL clusters with Patroni active-active synchronous replication and Redis cluster caching.</li>
              <li><strong>Zero-Trust Mesh:</strong> Mutual TLS (mTLS v1.3) identity authentication across all node boundaries with automatic certificate rotation.</li>
              <li><strong>Client IP Custody:</strong> 100% source code, CI/CD pipeline manifests, and infrastructure-as-code delivered under client ownership.</li>
            </ul>
          </div>
          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="/contact/" style="background: #2563eb; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 10px;">Request Digital Systems Architecture Review &rarr;</a>
            <a href="/services/" style="background: rgba(255,255,255,0.06); color: #f8fafc; border: 1px solid rgba(255,255,255,0.16); text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 10px;">Back to All Services</a>
          </div>
        </div>`
      )
  },
  {
    path: 'services/automation-intelligence',
    schemaType: 'Service',
    breadcrumbName: 'Automation & AI',
    title: 'Automation & Applied Intelligence Pipelines | MIHORA.TECH',
    description: 'Deterministic Kafka/Temporal orchestration, Modbus/OPC-UA industrial SCADA bridges, and air-gapped on-premise AI inference.',
    keywords: 'SCADA automation, Modbus OPC-UA telemetry, event-driven workflow automation, air-gapped AI',
    renderContent: () =>
      wrapPage(
        'Division 02 &bull; Telemetry & Workflows',
        'Automation &amp; Intelligence Pipelines',
        'Deterministic workflow orchestration bridging legacy industrial Modbus/OPC-UA PLCs with real-time observability and cryptographically audited private AI routing.',
        `<div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px;">
            <h2 style="font-size: 20px; color: #ffffff; font-weight: 700; margin: 0 0 12px;">Core Capabilities</h2>
            <ul style="font-size: 15px; color: #cbd5e1; line-height: 2; padding-left: 20px; margin: 0;">
              <li><strong>Industrial SCADA Integration:</strong> Bridges connecting serial Modbus RTU/TCP and OPC-UA devices directly into modern telemetry pipelines.</li>
              <li><strong>Durable Execution:</strong> Idempotent event streams orchestrating complex multi-system transactions via Apache Kafka and Temporal.</li>
              <li><strong>Air-Gapped Private AI:</strong> Local LLM and computer vision inference deployed on private GPU clusters with zero external cloud egress.</li>
              <li><strong>Cryptographic Audit Trails:</strong> Immutable append-only transaction logs verifying every automation step and control signal.</li>
            </ul>
          </div>
          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="/contact/" style="background: #2563eb; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 10px;">Consult with Automation Architects &rarr;</a>
            <a href="/services/" style="background: rgba(255,255,255,0.06); color: #f8fafc; border: 1px solid rgba(255,255,255,0.16); text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 10px;">Back to All Services</a>
          </div>
        </div>`
      )
  },
  {
    path: 'services/physical-infrastructure',
    schemaType: 'Service',
    breadcrumbName: 'Physical Infrastructure',
    title: 'Physical Datacenter Racks & OS2 Fiber | MIHORA.TECH',
    description: 'Tier III/IV 42U/48U server racks, 2N PDU power, NVMe-oF SAN fabrics, and Fujikura core-alignment OS2 splicing (<= 0.03 dB).',
    keywords: 'physical datacenter infrastructure, server rack buildout, core-alignment fiber splicing, Cat6A cabling',
    renderContent: () =>
      wrapPage(
        'Division 03 &bull; Hardware & Optics',
        'Physical Datacenter Infrastructure',
        'Tier-III and Tier-IV datacenter construction, 42U high-density cabinet dressing, N+1/2N dual-bus power topologies, NVMe SAN fabrics, and core-alignment single-mode OS2 fiber splicing.',
        `<div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px;">
            <h2 style="font-size: 20px; color: #ffffff; font-weight: 700; margin: 0 0 12px;">Physical Engineering Specifications</h2>
            <ul style="font-size: 15px; color: #cbd5e1; line-height: 2; padding-left: 20px; margin: 0;">
              <li><strong>Cabinet Architecture:</strong> 42U to 48U high-density server enclosures with structured cable pathways and zero-strain vertical raceways.</li>
              <li><strong>Power Topologies:</strong> 2N redundant dual-bus power with Automatic Transfer Switches (ATS) and smart metered PDUs per rack.</li>
              <li><strong>Thermal Management:</strong> Hot/cold aisle containment baffles delivering verified Power Usage Effectiveness (PUE) &le; 1.14.</li>
              <li><strong>Optical Infrastructure:</strong> ITU-T G.652.D OS2 single-mode fiber trunks terminated via MPO/MTP cassettes with core-alignment fusion joints.</li>
            </ul>
          </div>
          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="/contact/" style="background: #2563eb; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 10px;">Schedule Datacenter Buildout Review &rarr;</a>
            <a href="/services/" style="background: rgba(255,255,255,0.06); color: #f8fafc; border: 1px solid rgba(255,255,255,0.16); text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 10px;">Back to All Services</a>
          </div>
        </div>`
      )
  },
  {
    path: 'services/field-engineering',
    schemaType: 'Service',
    breadcrumbName: 'Field Engineering',
    title: 'Tactical Field Engineering & 4h Dispatch | MIHORA.TECH',
    description: 'Rapid field crews with Fujikura splicers, EXFO OTDRs, and Fluke DSX-8000 analyzers serving UK, EMEA, and South Asia corridors.',
    keywords: 'field engineering dispatch, OTDR fiber certification, Fluke DSX-8000 testing, multi-site IT rollout',
    renderContent: () =>
      wrapPage(
        'Division 04 &bull; Kinetic Field Operations',
        'Field Engineering &amp; Optical Certification',
        '4-hour emergency hardware break-fix dispatch, multi-site SD-WAN and CCTV over-fiber rollouts, and signed ANSI/TIA-568-D link certification dossiers.',
        `<div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px;">
            <h2 style="font-size: 20px; color: #ffffff; font-weight: 700; margin: 0 0 12px;">Kinetic Field Rig Rigor</h2>
            <ul style="font-size: 15px; color: #cbd5e1; line-height: 2; padding-left: 20px; margin: 0;">
              <li><strong>Optical Fusion Splicing:</strong> Field crews equipped with Fujikura 90S+ core-alignment splicers guaranteeing mean loss &le; 0.03 dB.</li>
              <li><strong>Bidirectional OTDR Testing:</strong> Full-span backscatter analysis at 1310nm, 1550nm, and 1625nm with EXFO FTB-1v2 platforms.</li>
              <li><strong>Shielded Copper Certification:</strong> Cat6A channel and permanent link verification up to 500 MHz with calibrated Fluke DSX-8000 units.</li>
              <li><strong>SLA Dispatch:</strong> Guaranteed 4-hour emergency physical arrival across Greater London (UK) and Islamabad Capital Territory (PK).</li>
            </ul>
          </div>
          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="/contact/" style="background: #2563eb; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 10px;">Dispatch Field Engineering Crew &rarr;</a>
            <a href="/services/" style="background: rgba(255,255,255,0.06); color: #f8fafc; border: 1px solid rgba(255,255,255,0.16); text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 10px;">Back to All Services</a>
          </div>
        </div>`
      )
  },
  {
    path: 'services/managed-sre',
    schemaType: 'Service',
    breadcrumbName: 'Managed SRE',
    title: '24/7 Managed SRE & Dual-Hub NOC Command | MIHORA.TECH',
    description: 'Continuous follow-the-sun SRE across London (UTC+0) & Islamabad (UTC+5) NOCs guaranteeing 99.999% availability and <15m P1 response.',
    keywords: '24/7 managed SRE, site reliability engineering, dual NOC London Islamabad, 99.999 SLA uptime',
    renderContent: () =>
      wrapPage(
        'Division 05 &bull; Continuous Custody',
        'Managed Reliability &amp; 24/7 SRE',
        'Unbroken follow-the-sun monitoring spanning silicon thermals, optical attenuation alarms, and Kubernetes container health across London and Islamabad operations desks.',
        `<div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px;">
            <h2 style="font-size: 20px; color: #ffffff; font-weight: 700; margin: 0 0 12px;">SRE Operational Standards</h2>
            <ul style="font-size: 15px; color: #cbd5e1; line-height: 2; padding-left: 20px; margin: 0;">
              <li><strong>Follow-the-Sun Rotation:</strong> Synchronized operations desks in London (UTC+0) and Islamabad (UTC+5) eliminating overnight sleep fatigue.</li>
              <li><strong>Deep-Stack Observability:</strong> eBPF kernel event probes, optical laser power thresholds, PDU power draw, and BGP routing convergence telemetry.</li>
              <li><strong>P1 Incident Response:</strong> Guaranteed under-15-minute engineering engagement with senior architects holding direct console access.</li>
              <li><strong>Post-Mortem Discipline:</strong> Transparent blameless root-cause analysis (RCA) delivered within 48 hours of any operational anomaly.</li>
            </ul>
          </div>
          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="/contact/" style="background: #2563eb; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 10px;">Initiate SRE Custody Engagement &rarr;</a>
            <a href="/services/" style="background: rgba(255,255,255,0.06); color: #f8fafc; border: 1px solid rgba(255,255,255,0.16); text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 10px;">Back to All Services</a>
          </div>
        </div>`
      )
  },
  {
    path: 'case-studies',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Case Studies',
    title: 'Enterprise Case Studies & Field Benchmarks | MIHORA.TECH',
    description: 'Verified MIHORA.TECH deployments: interbank RTGS repatriation, 1,400 km DWDM corridors, SCADA diodes, and 1,200-site SD-WAN.',
    keywords: 'MIHORA case studies, datacenter case study, SD-WAN rollout, sovereign banking migration, optical splicing benchmarks',
    renderContent: () =>
      wrapPage(
        'Production Case Studies &bull; Verified Outcomes',
        'Field-Proven Enterprise &amp; Sovereign Infrastructure Deployments',
        'Explore verified production case studies with quantitative engineering metrics across sovereign banking, national telecommunications, industrial energy grids, healthcare imaging, and cold-chain logistics.',
        `<div style="display: flex; flex-direction: column; gap: 28px;">
          <article style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="font-family: monospace; font-size: 11px; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">
              CASE STUDY 01 &middot; BANKING &amp; FINANCIAL INFRASTRUCTURE
            </div>
            <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px;">
              National Interbank Real-Time Gross Settlement (RTGS) Sovereign Transition
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
              <div>
                <div style="font-size: 11px; font-family: monospace; color: #94a3b8;">SETTLEMENT LATENCY</div>
                <div style="font-size: 20px; font-weight: 800; color: #34d399;">0.8 ms <span style="font-size: 12px; color: #94a3b8;">(Down from 340ms)</span></div>
              </div>
              <div>
                <div style="font-size: 11px; font-family: monospace; color: #94a3b8;">ANNUAL UPTIME</div>
                <div style="font-size: 20px; font-weight: 800; color: #34d399;">99.9999%</div>
              </div>
              <div>
                <div style="font-size: 11px; font-family: monospace; color: #94a3b8;">THROUGHPUT</div>
                <div style="font-size: 20px; font-weight: 800; color: #38bdf8;">45,000 TPS</div>
              </div>
            </div>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0 0 12px;">
              <strong>Challenge:</strong> Central clearing transactions on offshore public cloud averaged 340 ms roundtrip, violating national financial data residency regulations and exposing banking settlement to submarine cable disruptions.
            </p>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0;">
              <strong>Architecture Delivered:</strong> Commissioned a dual-site active-active Tier IV datacenter ring in Islamabad and Karachi. Deployed dedicated physical FIPS 140-3 HSM appliances, sub-1ms PostgreSQL replication, and 1,200 km diverse dark fiber paths with autonomous BGP Anycast switching.
            </p>
          </article>

          <article style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="font-family: monospace; font-size: 11px; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">
              CASE STUDY 02 &middot; TELECOMMUNICATIONS &amp; OPTICAL FIBER
            </div>
            <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px;">
              1,400 km Trans-Continental 800G DWDM Coherent Optical Backbone
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
              <div>
                <div style="font-size: 11px; font-family: monospace; color: #94a3b8;">MEAN SPLICE LOSS</div>
                <div style="font-size: 20px; font-weight: 800; color: #34d399;">0.028 dB <span style="font-size: 12px; color: #94a3b8;">(&le;0.03 spec)</span></div>
              </div>
              <div>
                <div style="font-size: 11px; font-family: monospace; color: #94a3b8;">AGGREGATE CAPACITY</div>
                <div style="font-size: 20px; font-weight: 800; color: #38bdf8;">51.2 Tbps</div>
              </div>
              <div>
                <div style="font-size: 11px; font-family: monospace; color: #94a3b8;">OPTICAL RETURN LOSS</div>
                <div style="font-size: 20px; font-weight: 800; color: #34d399;">&gt; 68 dB</div>
              </div>
            </div>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0 0 12px;">
              <strong>Challenge:</strong> Degraded legacy fusion joints (&gt;0.15 dB loss) introduced chromatic reflection penalties that prevented modern 800G coherent transceivers from establishing stable PAM4 constellation locks.
            </p>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0;">
              <strong>Architecture Delivered:</strong> Mobilized tactical field engineering units equipped with Fujikura 90S+ core-alignment fusion splicers. Re-spliced 2,800 optical joints and performed bidirectional EXFO OTDR link testing across 1,400 km, achieving 0.028 dB mean attenuation.
            </p>
          </article>

          <article style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="font-family: monospace; font-size: 11px; color: #a855f7; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">
              CASE STUDY 03 &middot; ENERGY GRID &amp; INDUSTRIAL SCADA
            </div>
            <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px;">
              Sovereign Electrical Grid SCADA Telemetry &amp; EMP-Resistant Command Bus
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
              <div>
                <div style="font-size: 11px; font-family: monospace; color: #94a3b8;">ATTACK SURFACE</div>
                <div style="font-size: 20px; font-weight: 800; color: #34d399;">0.00% Physical Air-Gap</div>
              </div>
              <div>
                <div style="font-size: 11px; font-family: monospace; color: #94a3b8;">TELEMETRY SYNC</div>
                <div style="font-size: 20px; font-weight: 800; color: #38bdf8;">&lt; 2.4 ms</div>
              </div>
              <div>
                <div style="font-size: 11px; font-family: monospace; color: #94a3b8;">COMPLIANCE</div>
                <div style="font-size: 20px; font-weight: 800; color: #34d399;">NIST SP 800-82</div>
              </div>
            </div>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0 0 12px;">
              <strong>Challenge:</strong> Automated substation RTUs were linked over vulnerable serial Modbus networks exposed to potential remote state manipulation.
            </p>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0;">
              <strong>Architecture Delivered:</strong> Deployed hardware optical data diodes enforcing strictly unidirectional outward telemetry streaming, backed by Faraday-shielded enclosures and RISC-V cryptographic signing proxies at the substation edge.
            </p>
          </article>

          <article style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="font-family: monospace; font-size: 11px; color: #ec4899; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">
              CASE STUDY 04 &middot; HEALTHCARE &amp; CLINICAL DIAGNOSTICS
            </div>
            <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px;">
              Multi-Hospital HL7/FHIR &amp; PACS DICOM Zero-Latency Imaging Mesh
            </h2>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0 0 8px;">
              Constructed redundant 40G campus optical cores connecting radiology suites directly to localized NVMe SAN pools across 6 hospital wings. Reduced MRI/CT retrieval latency to under 45ms with zero unscheduled imaging downtime.
            </p>
          </article>

          <article style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="font-family: monospace; font-size: 11px; color: #10b981; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">
              CASE STUDY 05 &middot; AUTOMATED LOGISTICS &amp; COLD CHAIN
            </div>
            <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px;">
              NEMA-4X Edge Warehouse Telemetry &amp; Private Wireless Switching
            </h2>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0;">
              Commissioned ruggedized optical switching cabinets, automated sorting conveyor PLCs, and out-of-band LTE failover across 40 distribution centers, delivering sub-10ms barcode inventory state synchronization under peak dispatch load.
            </p>
          </article>
        </div>`
      )
  },
  {
    path: 'insights',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Insights',
    title: 'Technical Whitepapers & Engineering Dispatches | MIHORA.TECH',
    description: 'Architectural monographs, empirical optical loss benchmarks, distributed quorum post-mortems, and field dispatches by MIHORA.',
    keywords: 'technical whitepapers, systems research, fiber optics research, datacenter benchmarks, MIHORA insights',
    renderContent: () =>
      wrapPage(
        'Sovereign Labs &amp; Technical Dispatches',
        'Technical Papers &amp; Engineering Dispatches',
        'Rigorous technical research, empirical physical layer benchmarks, and systems architecture whitepapers published by the MIHORA engineering cadre.',
        `<div style="display: flex; flex-direction: column; gap: 28px;">
          <article style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 6px;">
              <span style="font-family: monospace; font-size: 11px; color: #38bdf8; font-weight: 700;">ARCH-2026-09 &middot; PEER-REVIEWED MONOGRAPH</span>
              <span style="font-size: 12px; color: #94a3b8; font-family: monospace;">OCTOBER 2026 &middot; LONDON R&amp;D LABS</span>
            </div>
            <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px;">
              Physical Layer Determinism in Distributed Micro-Datacenters
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 14px; margin-bottom: 14px;">
              <div>
                <div style="font-size: 10px; font-family: monospace; color: #94a3b8;">JITTER DEGRADATION</div>
                <div style="font-size: 18px; font-weight: 800; color: #34d399;">0.14 &mu;s (-87%)</div>
              </div>
              <div>
                <div style="font-size: 10px; font-family: monospace; color: #94a3b8;">THERMAL DELTA MAX</div>
                <div style="font-size: 18px; font-weight: 800; color: #38bdf8;">4.2&deg;C (42U Rack)</div>
              </div>
              <div>
                <div style="font-size: 10px; font-family: monospace; color: #94a3b8;">P99 INGRESS LATENCY</div>
                <div style="font-size: 18px; font-weight: 800; color: #f59e0b;">820 ns</div>
              </div>
            </div>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0 0 12px;">
              <strong>Abstract:</strong> Software algorithms operating in sub-millisecond data planes hit diminishing returns when physical optical patch cords suffer uncontrolled bending radii below 30mm or variable CPU exhaust heating inside 42U cabinets.
            </p>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0;">
              <strong>Conclusion:</strong> Enforcing zero-strain hook-and-loop bundling raceways, front-to-rear delta-T containment baffles, and ANSI/TIA-568-D structural optical tolerances eliminated 99.4% of packet jitter micro-drops across 250,000 meters of installed fiber.
            </p>
          </article>

          <article style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 6px;">
              <span style="font-family: monospace; font-size: 11px; color: #38bdf8; font-weight: 700;">LOG-2026-04 &middot; PRODUCTION CASE STUDY</span>
              <span style="font-size: 12px; color: #94a3b8; font-family: monospace;">SEPTEMBER 2026 &middot; FIELD OPERATIONS</span>
            </div>
            <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px;">
              Sub-Second Barcode Processing on the Edge: 40 Distribution Centers
            </h2>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0;">
              By replacing centralized public cloud API roundtrips with ruggedized local 1U Linux edge appliances running peer-to-peer SQLite CRDT synchronization, warehouse scan-to-sort latency dropped from 620ms to 48ms (-92%), ensuring zero barcode queue stalling during external carrier WAN severed events.
            </p>
          </article>

          <article style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 6px;">
              <span style="font-family: monospace; font-size: 11px; color: #38bdf8; font-weight: 700;">SURV-2026-02 &middot; FIELD DISPATCH</span>
              <span style="font-size: 12px; color: #94a3b8; font-family: monospace;">AUGUST 2026 &middot; TACTICAL FIELD GROUP</span>
            </div>
            <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px;">
              Autonomous Surveillance Failover Under Intermittent Power Grids
            </h2>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.65; margin: 0;">
              Fabricated custom NEMA-4X stainless steel enclosures with LiFePO4 battery banks and MPPT solar charging rated for -40&deg;C to +75&deg;C, sustaining 96 hours of autonomous 4K perimeter surveillance along remote infrastructure corridors without external electrical grid power.
            </p>
          </article>
        </div>`
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
        'MIHORA.TECH delivers unified nine-layer technology infrastructure spanning physical server racks, optical fiber trunks, distributed microservices, and 24/7 site reliability telemetry.',
        `<div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #60a5fa; font-weight: 700;">LAYER 01</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">Silicon &amp; Substrate Hardware</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Bare-metal server elevation, AMD EPYC and Intel Xeon processors, ECC DDR5 memory banks, and air-gapped IPMI/Redfish out-of-band management.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #60a5fa; font-weight: 700;">LAYER 02</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">Optical Backbones &amp; Structured Cabling</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Single-mode OS2 fiber trunks, Fujikura core-alignment fusion splicing (&le; 0.03 dB mean loss), Cat6A shielded copper dressing, and MPO-12/24 cassettes.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #60a5fa; font-weight: 700;">LAYER 03</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">High-Density Rack Infrastructure</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">42U–48U server enclosures, 2N dual-bus ATS PDUs, hot/cold aisle containment, and verified PUE &le; 1.14 cooling efficiency.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #60a5fa; font-weight: 700;">LAYER 04</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">Physical Security &amp; Environmental Controls</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Biometric dual-custody man-traps, FM-200 / Novec clean-agent fire suppression, N+1 CRAC climate control, and anti-tamper server chassis seals.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #60a5fa; font-weight: 700;">LAYER 05</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">Carrier-Neutral Optical Routing</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">EVPN-VXLAN spine-leaf switching fabric, BGP Anycast ingress routing, and multi-homed diverse terrestrial dark fiber corridors.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #60a5fa; font-weight: 700;">LAYER 06</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">Operating System &amp; Kernel Runtime</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Hardened Linux kernels with eBPF telemetry hooks, sysctl TCP/IP stack tuning for ultra-low latency, and TPM 2.0 hardware root-of-trust attestation.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #60a5fa; font-weight: 700;">LAYER 07</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">Distributed Software &amp; Storage</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">High-concurrency Go microservices, partitioned PostgreSQL clusters with synchronous failover, and NVMe-oF SAN shared storage fabrics.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #60a5fa; font-weight: 700;">LAYER 08</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">Zero-Trust Security &amp; Air-Gap Diodes</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Client-held FIPS 140-3 HSM encryption keys, hardware-enforced optical data diodes, and mutual TLS v1.3 zero-trust service communication.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #34d399; font-weight: 700;">LAYER 09</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">Continuous Operational Custody (24/7 SRE)</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Follow-the-sun London (UTC+0) &amp; Islamabad (UTC+5) dual NOC command desks delivering verified 99.999% SLA quorum availability.</p>
          </div>
        </div>`
      )
  },
  {
    path: 'solutions',
    schemaType: 'WebPage',
    breadcrumbName: 'Solutions',
    title: 'Enterprise Sovereign Solutions & RFP Specifier | MIHORA.TECH',
    description: 'High-availability frameworks, zero-downtime failover, cloud repatriation, and our interactive Sovereign Architecture RFP Builder.',
    keywords: 'enterprise solutions, sovereign architecture, mission-critical systems, MIHORA solutions, cloud repatriation',
    renderContent: () =>
      wrapPage(
        'Enterprise Frameworks &bull; Sovereign Resilience',
        'Enterprise Solutions &amp; Reliability Frameworks',
        'MIHORA architects purpose-built sovereign infrastructure solutions designed for enterprises requiring total cryptographic key ownership, guaranteed uptime, and zero foreign cloud dependencies.',
        `<div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px;">
            <h2 style="font-size: 20px; color: #ffffff; font-weight: 700; margin: 0 0 8px;">1. Sovereign Cloud Repatriation</h2>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin: 0;">Migrate mission-critical databases and microservices off high-cost hyperscale public clouds onto client-owned bare-metal datacenter infrastructure, eliminating runaway bandwidth egress bills.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px;">
            <h2 style="font-size: 20px; color: #ffffff; font-weight: 700; margin: 0 0 8px;">2. Zero-Downtime Active-Active Multi-Site Failover</h2>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin: 0;">Synchronous data replication across geographically dispersed datacenters with sub-18ms BGP Anycast ingress switching for continuous quorum continuity.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px;">
            <h2 style="font-size: 20px; color: #ffffff; font-weight: 700; margin: 0 0 8px;">3. Air-Gapped Industrial SCADA Cyber-Hardening</h2>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin: 0;">Physical optical data diodes enforcing strictly one-way telemetry streaming, isolating critical substation PLCs and industrial sensors from external WAN compromise.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px;">
            <h2 style="font-size: 20px; color: #ffffff; font-weight: 700; margin: 0 0 8px;">4. Trans-Regional 800G DWDM Optical Corridors</h2>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin: 0;">Core-alignment fusion splicing (&le; 0.03 dB loss) and ROADM node deployment across dark fiber trunks, maximizing long-haul spectral capacity.</p>
          </div>
        </div>`
      )
  },
  {
    path: 'how-it-works',
    schemaType: 'HowTo',
    breadcrumbName: 'How It Works',
    title: 'How It Works | 5-Phase Sovereign Delivery | MIHORA.TECH',
    description: 'Follow MIHORA.TECH 5-phase engineering methodology from discovery & 9-layer blueprinting through OTDR certification & 24/7 SRE.',
    keywords: 'how MIHORA works, engineering methodology, datacenter deployment phases, zero downtime cutover',
    renderContent: () =>
      wrapPage(
        'Sovereign Delivery Methodology',
        'How MIHORA Engineers &amp; Ships Without Fragile Handoffs',
        'Our 5-phase engineering methodology unifies physical optics, bare-metal servers, software platforms, and 24/7 operations inside a single verifiable chain.',
        `<div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #f59e0b; font-weight: 700;">PHASE 01</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">Discovery &amp; Threat Modeling</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Exhaustive inventory of data assets, latency constraints, regulatory jurisdictions, and single-point-of-failure audits.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #f59e0b; font-weight: 700;">PHASE 02</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">9-Layer Blueprinting &amp; BOM Specification</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Detailed CAD rack elevations, power balance calculations, optical link loss budgets, and microservices architecture schemas.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #f59e0b; font-weight: 700;">PHASE 03</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">Hardware Staging &amp; Distributed Software Fabrication</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Off-site staging, burn-in thermal testing, kernel hardening, and automated CI/CD microservice compilation.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #f59e0b; font-weight: 700;">PHASE 04</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">Bidirectional OTDR Testing &amp; Zero-Downtime Cutover</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Physical link loss verification (&le; 0.03 dB), database synchronization, and parallel run cutover with zero downtime.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #34d399; font-weight: 700;">PHASE 05</span>
            <h3 style="font-size: 18px; color: #ffffff; margin: 4px 0 6px;">London &amp; Islamabad 24/7 SRE Custody</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Continuous follow-the-sun monitoring, automated incident remediation, and guaranteed 99.999% SLA quorum availability.</p>
          </div>
        </div>`
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
        `<div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px;">
            <h2 style="font-size: 18px; color: #ffffff; font-weight: 700; margin: 0 0 14px;">Optical &amp; Datacenter Verification Standards</h2>
            <table style="width:100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.12); text-align: left; color: #f59e0b; font-family: monospace;">
                  <th style="padding: 10px 14px;">Metric / Standard</th>
                  <th style="padding: 10px 14px;">Industry Baseline</th>
                  <th style="padding: 10px 14px;">MIHORA Verified Specification</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td style="padding: 10px 14px; font-weight: 600;">OS2 Fusion Splice Loss</td>
                  <td style="padding: 10px 14px; color: #94a3b8;">0.30 dB Max (TIA-568-D)</td>
                  <td style="padding: 10px 14px; color: #34d399; font-weight: 700;">&le; 0.03 dB Mean</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td style="padding: 10px 14px; font-weight: 600;">Quorum Uptime SLA</td>
                  <td style="padding: 10px 14px; color: #94a3b8;">99.95% (Standard Cloud)</td>
                  <td style="padding: 10px 14px; color: #34d399; font-weight: 700;">99.999% Dual-Hub</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td style="padding: 10px 14px; font-weight: 600;">Datacenter Design PUE</td>
                  <td style="padding: 10px 14px; color: #94a3b8;">1.50 Industry Avg</td>
                  <td style="padding: 10px 14px; color: #34d399; font-weight: 700;">&le; 1.14 Hot/Cold Containment</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-weight: 600;">Cat6A Copper Testing</td>
                  <td style="padding: 10px 14px; color: #94a3b8;">250 MHz Cat6</td>
                  <td style="padding: 10px 14px; color: #34d399; font-weight: 700;">500 MHz Fluke DSX-8000 Passed</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="/tools/" style="color: #60a5fa; font-weight: 700; text-decoration: none;">Interactive Engineering Calculators &rarr;</a>
            <a href="/glossary/" style="color: #60a5fa; font-weight: 700; text-decoration: none;">Optical &amp; Systems Glossary &rarr;</a>
            <a href="/compare/" style="color: #60a5fa; font-weight: 700; text-decoration: none;">Sovereign vs. Cloud Comparison &rarr;</a>
          </div>
        </div>`
      )
  },
  {
    path: 'glossary',
    schemaType: 'DefinedTermSet',
    breadcrumbName: 'Engineering Glossary',
    title: 'Sovereign Systems & Optical Fiber Glossary | MIHORA.TECH',
    description: 'Searchable engineering glossary defining OTDR certification, OS2 single-mode fiber, EVPN-VXLAN, optical diodes, and 2N power.',
    keywords: 'OTDR definition, OS2 single-mode fiber, EVPN-VXLAN, optical data diode, 2N power, MIHORA glossary',
    renderContent: () =>
      wrapPage(
        'Technical Reference Lexicon',
        'Engineering, Optical Fiber &amp; Sovereign Custody Glossary',
        'Authoritative definitions across physical optical transport physics, distributed software consensus, cryptographic custody, and follow-the-sun SRE.',
        `<div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <h3 style="font-size: 18px; color: #60a5fa; margin: 0 0 6px;">OTDR (Optical Time-Domain Reflectometer)</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">An optoelectronic instrument used to characterize an optical fiber. It injects a series of optical pulses into the fiber and extracts light that is scattered or reflected back, verifying splice loss (dB) and pinpointing physical fiber faults.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <h3 style="font-size: 18px; color: #60a5fa; margin: 0 0 6px;">OS2 Single-Mode Optical Fiber</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Standard single-mode optical fiber with a 9/125 &mu;m core/cladding diameter compliant with ITU-T G.652.D. Engineered for long-haul datacenter interconnects and DWDM carrier transmission up to 800 Gbps.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <h3 style="font-size: 18px; color: #60a5fa; margin: 0 0 6px;">Optical Data Diode</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">A hardware device that physically enforces unidirectional data transmission via a physical LED transmitter and photodiode receiver, creating a hardware-guaranteed air gap that prevents inbound attack vectors.</p>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px;">
            <h3 style="font-size: 18px; color: #60a5fa; margin: 0 0 6px;">EVPN-VXLAN</h3>
            <p style="font-size: 14px; color: #cbd5e1; margin: 0;">Ethernet Virtual Private Network with Virtual Extensible LAN encapsulation. An open-standard datacenter fabric protocol providing Layer 2 extension over Layer 3 underlay networks with BGP control-plane learning.</p>
          </div>
        </div>`
      )
  },
  {
    path: 'compare',
    schemaType: 'WebPage',
    breadcrumbName: 'Architecture Comparison',
    title: 'Sovereign Custody vs. Hyperscale Cloud Compare | MIHORA.TECH',
    description: 'Direct technical matrix evaluating MIHORA Full-Span Sovereign Custody against hyperscale public cloud lock-in and fragmented vendors.',
    keywords: 'sovereign infrastructure vs cloud, full-span engineering comparison, cloud repatriation, cloud egress fees',
    renderContent: () =>
      wrapPage(
        'Decision &amp; Trade-Off Matrix',
        'Sovereign Full-Span Engineering vs. Hyperscale &amp; Fragmented Vendors',
        'Compare accountability scope, cryptographic key custody, physical hardware verification, and cost economics across infrastructure models.',
        `<div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px; overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; min-width: 600px;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.16); color: #f59e0b; font-family: monospace; text-align: left;">
                <th style="padding: 12px 14px;">Capability / Dimension</th>
                <th style="padding: 12px 14px;">MIHORA Sovereign Custody</th>
                <th style="padding: 12px 14px; color: #94a3b8;">Hyperscale Public Cloud</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                <td style="padding: 12px 14px; font-weight: 600;">Cryptographic Key Custody</td>
                <td style="padding: 12px 14px; color: #34d399; font-weight: 700;">100% Client-Held FIPS 140-3 HSM</td>
                <td style="padding: 12px 14px; color: #f87171;">Shared Cloud Provider Access</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                <td style="padding: 12px 14px; font-weight: 600;">Bandwidth Egress Tolls</td>
                <td style="padding: 12px 14px; color: #34d399; font-weight: 700;">$0 / Flat Unmetered Transit</td>
                <td style="padding: 12px 14px; color: #f87171;">$0.08&ndash;$0.12 per GB Extracted</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                <td style="padding: 12px 14px; font-weight: 600;">Physical Hardware Inspection</td>
                <td style="padding: 12px 14px; color: #34d399; font-weight: 700;">Full Access, Serial Numbers &amp; OTDR</td>
                <td style="padding: 12px 14px; color: #f87171;">Opaque Multitenant Black Box</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                <td style="padding: 12px 14px; font-weight: 600;">Source Code &amp; IaC Ownership</td>
                <td style="padding: 12px 14px; color: #34d399; font-weight: 700;">Complete Client IP Custody</td>
                <td style="padding: 12px 14px; color: #f87171;">Proprietary Service API Lock-In</td>
              </tr>
              <tr>
                <td style="padding: 12px 14px; font-weight: 600;">Accountability Span</td>
                <td style="padding: 12px 14px; color: #34d399; font-weight: 700;">Single Team (Optics to Software)</td>
                <td style="padding: 12px 14px; color: #f87171;">Shared Responsibility Shield</td>
              </tr>
            </tbody>
          </table>
        </div>`
      )
  },
  {
    path: 'tools',
    schemaType: 'WebApplication',
    breadcrumbName: 'Engineering Calculators',
    title: 'Engineering Calculators: SLA, Optical Loss & TCO | MIHORA.TECH',
    description: 'Compute 99.999% SLA downtime budgets, TIA-568-D OS2 fiber link attenuation, and 5-year sovereign infrastructure TCO savings.',
    keywords: 'SLA downtime calculator, optical fiber attenuation calculator, TIA-568-D, sovereign TCO',
    renderContent: () =>
      wrapPage(
        'Open Engineering Workbench',
        'Sovereign Infrastructure &amp; Optical Budget Calculators',
        'Quantitative diagnostic tools for sizing 99.999% SLA downtime budgets, single-mode OS2 fiber link attenuation, and 5-year sovereign custody economics.',
        `<div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px;">
            <h2 style="font-size: 18px; color: #ffffff; font-weight: 700; margin: 0 0 10px;">SLA Uptime Downtime Mathematics</h2>
            <p style="font-size: 14px; color: #94a3b8; line-height: 1.6; margin: 0 0 14px;">Permissible unmanaged downtime calculated across standard operating intervals:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; font-family: monospace;">
              <thead>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.12); color: #f59e0b; text-align: left;">
                  <th style="padding: 8px 10px;">SLA Level</th>
                  <th style="padding: 8px 10px;">Daily Downtime</th>
                  <th style="padding: 8px 10px;">Monthly Downtime</th>
                  <th style="padding: 8px 10px;">Annual Downtime</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <td style="padding: 8px 10px; color: #f87171;">99.0% (Two 9s)</td>
                  <td style="padding: 8px 10px;">14m 24s</td>
                  <td style="padding: 8px 10px;">7h 18m</td>
                  <td style="padding: 8px 10px;">3d 15h 39m</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <td style="padding: 8px 10px; color: #fbbf24;">99.9% (Three 9s)</td>
                  <td style="padding: 8px 10px;">1m 26s</td>
                  <td style="padding: 8px 10px;">43m 49s</td>
                  <td style="padding: 8px 10px;">8h 45m 57s</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <td style="padding: 8px 10px; color: #60a5fa;">99.99% (Four 9s)</td>
                  <td style="padding: 8px 10px;">8.6s</td>
                  <td style="padding: 8px 10px;">4m 22s</td>
                  <td style="padding: 8px 10px;">52m 35s</td>
                </tr>
                <tr>
                  <td style="padding: 8px 10px; color: #34d399; font-weight: 700;">99.999% (MIHORA Five 9s)</td>
                  <td style="padding: 8px 10px; color: #34d399; font-weight: 700;">0.86s</td>
                  <td style="padding: 8px 10px; color: #34d399; font-weight: 700;">26.3s</td>
                  <td style="padding: 8px 10px; color: #34d399; font-weight: 700;">5m 15s</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 24px;">
            <h2 style="font-size: 18px; color: #ffffff; font-weight: 700; margin: 0 0 8px;">Optical Fiber Link Loss Formula (ANSI/TIA-568-D)</h2>
            <div style="font-family: monospace; font-size: 14px; color: #38bdf8; background: rgba(0,0,0,0.5); padding: 12px; border-radius: 8px; margin-bottom: 8px;">
              Total Link Loss (dB) = (Length_km &times; &alpha;) + (Splice_Count &times; &beta;) + (Connector_Pairs &times; &gamma;)
            </div>
            <p style="font-size: 13px; color: #cbd5e1; margin: 0;">
              Where &alpha; = 0.35 dB/km @ 1310nm, &beta; = 0.03 dB (MIHORA core-alignment target vs 0.30 TIA max), and &gamma; = 0.20 dB per LC/MPO pair.
            </p>
          </div>
        </div>`
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
    path: 'our-story',
    schemaType: 'AboutPage',
    breadcrumbName: 'Our Story',
    title: 'Our Story | Founding Thesis & Dual-Hub Spine | MIHORA.TECH',
    description: 'How M. Matti ul Hasnain & Omema Iqbal built MIHORA.TECH across London & Islamabad to unite glass fiber optics and distributed software.',
    keywords: 'MIHORA story, M. Matti ul Hasnain, Omema Iqbal, Omaima Hasnain, London Islamabad engineering hubs',
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
