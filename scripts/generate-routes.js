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
  { href: '/engineering/', label: 'Engineering' },
  { href: '/solutions/', label: 'Solutions' },
  { href: '/how-it-works/', label: 'How It Works' },
  { href: '/case-studies/', label: 'Case Studies' },
  { href: '/resources/', label: 'Resources' },
  { href: '/company/', label: 'Company & Founders' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/contact/', label: 'Contact' },
  { href: '/status/', label: 'Status (99.999%)' }
];

function buildHeader() {
  const linksHtml = navLinks
    .map(link => `<a href="${link.href}" style="color: #475569; text-decoration: none; font-size: 13px; font-weight: 600; padding: 4px 8px;">${link.label}</a>`)
    .join(' ');

  return `
    <header style="border-bottom: 1px solid rgba(226, 232, 240, 0.9); background: #ffffff; padding: 14px 24px; position: sticky; top: 0; z-index: 50;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <a href="/" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
          <img src="/mihora-logo.svg" alt="MIHORA.TECH" width="130" height="34" style="height: 32px; width: auto;" />
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #1d4ed8; font-weight: 700; letter-spacing: 0.08em;">SOVEREIGN SYSTEMS</span>
        </a>
        <nav style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          ${linksHtml}
          <a href="/contact/" style="background: #1d4ed8; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; font-family: 'JetBrains Mono', monospace; padding: 7px 14px; border-radius: 8px; letter-spacing: 0.04em;">Initiate Brief</a>
        </nav>
      </div>
    </header>`;
}

function buildFooter() {
  return `
    <footer style="border-top: 1px solid rgba(226, 232, 240, 0.9); background: #f8fafc; padding: 48px 24px 32px; margin-top: 64px; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; padding-bottom: 32px; border-bottom: 1px solid #e2e8f0;">
          <div>
            <img src="/mihora-logo.svg" alt="MIHORA.TECH" width="140" height="36" style="height: 34px; width: auto; margin-bottom: 12px;" />
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 12px;">
              <strong>MIHORA.TECH</strong> is an international sovereign engineering authority operating synchronized command hubs across London (United Kingdom) and Islamabad (Pakistan).
            </p>
            <p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #1d4ed8; font-weight: 700; margin: 0;">
              FOUNDED BY M. MATTI UL HASNAIN &amp; OMEMA IQBAL
            </p>
          </div>
          <div>
            <h4 style="font-size: 12px; font-family: 'JetBrains Mono', monospace; color: #1d4ed8; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">Command Hubs</h4>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 8px;">
              <strong>London Command (UK):</strong> 128 City Road, London EC2A 4NE, United Kingdom
            </p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">
              <strong>Islamabad Systems (PK):</strong> Blue Area, Islamabad 44000, Pakistan
            </p>
          </div>
          <div>
            <h4 style="font-size: 12px; font-family: 'JetBrains Mono', monospace; color: #1d4ed8; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">Executive Leadership</h4>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 8px;">
              <a href="/company/" style="color: #1d4ed8; text-decoration: underline; font-weight: 600;">M. Matti ul Hasnain</a><br />
              <span style="font-size: 12px; color: #64748b;">Co-Founder &amp; Principal Systems Architect</span>
            </p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">
              <a href="/company/" style="color: #1d4ed8; text-decoration: underline; font-weight: 600;">Omema Iqbal</a><br />
              <span style="font-size: 12px; color: #64748b;">Co-Founder &amp; Operations Director</span>
            </p>
          </div>
          <div>
            <h4 style="font-size: 12px; font-family: 'JetBrains Mono', monospace; color: #1d4ed8; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">Direct Dispatch</h4>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 6px;">
              Email: <a href="mailto:hr@mihora.tech" style="color: #1d4ed8; font-weight: 600;">hr@mihora.tech</a>
            </p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 6px;">
              Architecture: <a href="mailto:dispatch@mihora.tech" style="color: #1d4ed8; font-weight: 600;">dispatch@mihora.tech</a>
            </p>
            <p style="font-size: 12px; color: #059669; font-family: 'JetBrains Mono', monospace; font-weight: 700; margin: 8px 0 0;">
              99.999% SLA Uptime Verified
            </p>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; padding-top: 24px; font-size: 12px; color: #64748b;">
          <div>
            &copy; 2026 MIHORA.TECH (PRIVATE) LIMITED. ALL RIGHTS RESERVED.
          </div>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="/privacy/" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
            <a href="/terms/" style="color: #64748b; text-decoration: none;">Terms of Service</a>
            <a href="/disclaimer/" style="color: #64748b; text-decoration: none;">Disclaimer</a>
            <a href="/legal/" style="color: #64748b; text-decoration: none;">ISO 27001 Governance</a>
          </div>
        </div>
      </div>
    </footer>`;
}

function buildFounderBanner() {
  return `
    <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 12px; padding: 24px; margin: 32px 0;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #1d4ed8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
        Executive Stewardship · Dual-Hub Governance
      </div>
      <h3 style="font-size: 20px; color: #0f172a; margin: 0 0 12px; font-weight: 800;">
        MIHORA.TECH &mdash; Founded by M. Matti ul Hasnain &amp; Omema Iqbal
      </h3>
      <p style="font-size: 14px; color: #334155; line-height: 1.6; margin: 0 0 16px;">
        MIHORA was founded by <strong>M. Matti ul Hasnain</strong> (also known as <em>Matti ul Hasnain</em> or <em>Hasnain</em>, Co-Founder &amp; Principal Systems Architect) and <strong>Omema Iqbal</strong> (also known as <em>Omema</em>, Co-Founder &amp; Operations Director). Operating synchronized sovereign engineering command centers in London (United Kingdom) and Islamabad (Pakistan), MIHORA guarantees uninterrupted 24/7 mission-critical operations worldwide.
      </p>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="/company/" style="display: inline-block; background: #1d4ed8; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; padding: 8px 16px; border-radius: 6px;">Read Founders' Biography &rarr;</a>
        <a href="/faq/" style="display: inline-block; background: #ffffff; color: #1d4ed8; border: 1px solid #cbd5e1; text-decoration: none; font-size: 12px; font-weight: 700; padding: 8px 16px; border-radius: 6px;">Verified Entity FAQ</a>
      </div>
    </div>`;
}

function wrapPage(eyebrow, h1, lead, extraHtml = '') {
  return `
    <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
      <div style="color: #1d4ed8; font-size: 12px; font-weight: 700; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
        ${eyebrow}
      </div>
      <h1 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px;">
        ${h1}
      </h1>
      <p style="font-size: 18px; color: #334155; line-height: 1.65; margin: 0 0 28px;">
        ${lead}
      </p>
      ${buildFounderBanner()}
      ${extraHtml}
    </div>`;
}

const routes = [
  {
    path: 'company',
    title: 'Company & Founders | M. Matti ul Hasnain & Omema Iqbal | MIHORA.TECH',
    description: 'Founded by M. Matti ul Hasnain and Omema Iqbal. Discover MIHORA.TECH engineering doctrine, dual UK & Pakistan command centers, leadership profiles, and sovereign systems governance.',
    keywords: 'M. Matti ul Hasnain, Omema Iqbal, Matti ul Hasnain, Muhammad Matti ul Hasnain, Hasnain, Omema, MIHORA founders, founders of MIHORA, who founded MIHORA, MIHORA leadership, MIHORA.TECH',
    renderContent: () => wrapPage(
      'Corporate Profile · Founded by M. Matti ul Hasnain & Omema Iqbal',
      'Company & Executive Leadership',
      '<strong>MIHORA.TECH</strong> was founded by <strong>M. Matti ul Hasnain</strong> and <strong>Omema Iqbal</strong> to pioneer sovereign systems engineering, mission-critical datacenter infrastructure, and 24/7 global telemetry operations.',
      `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 40px;">
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 16px; padding: 28px;">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
            <img src="/founder-matti.jpg" alt="M. Matti ul Hasnain - Co-Founder & Principal Systems Architect of MIHORA.TECH" width="80" height="80" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover;" />
            <div>
              <span style="font-family: monospace; font-size: 11px; color: #1d4ed8; font-weight: 700;">CO-FOUNDER</span>
              <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 4px 0 2px;">M. Matti ul Hasnain</h2>
              <p style="font-size: 12px; font-family: monospace; color: #64748b; margin: 0;">PRINCIPAL SYSTEMS ARCHITECT</p>
            </div>
          </div>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;">
            <strong>M. Matti ul Hasnain</strong> leads the architecture of MIHORA's 9-layer sovereign stack, physical datacenter hardware topologies, low-latency microservices, optical fiber fusion splicing, and continuous SRE reliability protocols.
          </p>
        </div>
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 16px; padding: 28px;">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
            <img src="/founder-omema.jpg" alt="Omema Iqbal - Co-Founder & Operations Director of MIHORA.TECH" width="80" height="80" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover;" />
            <div>
              <span style="font-family: monospace; font-size: 11px; color: #0284c7; font-weight: 700;">CO-FOUNDER</span>
              <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 4px 0 2px;">Omema Iqbal</h2>
              <p style="font-size: 12px; font-family: monospace; color: #64748b; margin: 0;">OPERATIONS DIRECTOR</p>
            </div>
          </div>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;">
            <strong>Omema Iqbal</strong> directs global dual-hub operational governance between the London (UK) and Islamabad (Pakistan) command centers, multi-jurisdiction regulatory compliance, international client delivery, and corporate governance.
          </p>
        </div>
      </div>`
    )
  },
  {
    path: 'faq',
    title: 'Verified Entity FAQ & Knowledge Base | MIHORA.TECH — Founded by M. Matti ul Hasnain & Omema Iqbal',
    description: 'Official answers to common questions about MIHORA.TECH, founders M. Matti ul Hasnain & Omema Iqbal, dual UK-Pakistan command centers, services, and datacenter hardware.',
    keywords: 'MIHORA FAQ, who founded MIHORA, who is M. Matti ul Hasnain, who is Omema Iqbal, MIHORA.TECH, datacenter engineering',
    renderContent: () => wrapPage(
      'Verified Entity Knowledge Base · Official Answers',
      'Frequently Asked Questions (FAQ)',
      'Definitive corporate answers regarding MIHORA.TECH, leadership by M. Matti ul Hasnain and Omema Iqbal, engineering capabilities, dual command hubs, and ISO 27001 compliance.',
      `<div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
          <h2 style="font-size: 18px; font-weight: 800; color: #1d4ed8; margin: 0 0 8px;">What is MIHORA.TECH and who founded it?</h2>
          <p style="font-size: 15px; color: #334155; margin: 0;">MIHORA.TECH was founded by M. Matti ul Hasnain (Co-Founder & Principal Systems Architect) and Omema Iqbal (Co-Founder & Operations Director). It engineers resilient digital platforms, physical datacenter infrastructure, optical fiber trunks, automation pipelines, and 24/7 SRE from London (UK) and Islamabad (Pakistan).</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
          <h2 style="font-size: 18px; font-weight: 800; color: #1d4ed8; margin: 0 0 8px;">Does MIHORA.TECH deploy physical server racks and fiber optics?</h2>
          <p style="font-size: 15px; color: #334155; margin: 0;">Yes. Physical infrastructure is core to MIHORA.TECH. Technicians execute tier-grade server rack deployments, fusion splicing (<= 0.05 dB loss), shielded Cat6A cable dressing, and bidirectional OTDR link certification worldwide.</p>
        </div>
      </div>`
    )
  },
  {
    path: 'docs',
    title: 'Technical Documentation & Systems Architecture Codex | MIHORA.TECH',
    description: 'Official engineering documentation, 9-layer sovereign stack specifications, fiber splicing standards, and dual-hub telemetry protocols of MIHORA.TECH.',
    keywords: 'MIHORA documentation, systems architecture codex, 9-layer stack, datacenter specifications, fiber optic splicing, SRE telemetry',
    renderContent: () => wrapPage(
      'Architectural Codex · Verified System Specifications',
      'Systems Architecture Codex & Documentation',
      'Exhaustive architectural specifications governing the 9-layer sovereign stack, datacenter hardware standards, and dual-hub quorum protocols engineered by M. Matti ul Hasnain and Omema Iqbal.'
    )
  },
  {
    path: 'engineering',
    title: 'Sovereign Engineering & Datacenter Infrastructure | MIHORA.TECH',
    description: 'Deep-stack sovereign engineering from physical datacenter infrastructure and fiber splicing to high-availability distributed microservices and SRE.',
    keywords: 'sovereign engineering, datacenter infrastructure, MIHORA engineering, 9-layer stack, server racks, fiber splicing',
    renderContent: () => wrapPage(
      'Sovereign Engineering · Silicon to Cloud',
      'Sovereign Engineering & Datacenter Infrastructure',
      'MIHORA.TECH delivers unified nine-layer technology infrastructure spanning physical server racks, optical fiber trunks, distributed microservices, and 24/7 site reliability telemetry.'
    )
  },
  {
    path: 'services',
    title: 'Datacenter Infrastructure & Sovereign Engineering Services | MIHORA.TECH',
    description: 'Comprehensive engineering services: physical datacenter infrastructure, server racks, cloud architectures, automation, and 24/7 reliability.',
    keywords: 'datacenter services, sovereign engineering services, server rack deployment, fiber optic certification, managed SRE',
    renderContent: () => wrapPage(
      'Service Capabilities · Full-Lifecycle Execution',
      'Engineering & Infrastructure Services',
      'Five core service divisions: Digital Systems Engineering, Automation & Intelligence, Physical Datacenter Infrastructure, Field Engineering Rigs, and 24/7 Managed SRE.',
      `<ul style="font-size: 15px; color: #334155; line-height: 2;">
        <li><a href="/services/digital-engineering/" style="color: #1d4ed8; font-weight: 700;">Digital Systems Engineering &rarr;</a></li>
        <li><a href="/services/automation-intelligence/" style="color: #1d4ed8; font-weight: 700;">Automation &amp; Workflow Intelligence &rarr;</a></li>
        <li><a href="/services/physical-infrastructure/" style="color: #1d4ed8; font-weight: 700;">Physical Datacenter Infrastructure &rarr;</a></li>
        <li><a href="/services/field-engineering/" style="color: #1d4ed8; font-weight: 700;">Field Engineering &amp; Optical Certification &rarr;</a></li>
        <li><a href="/services/managed-sre/" style="color: #1d4ed8; font-weight: 700;">24/7 Managed Technology &amp; SRE &rarr;</a></li>
      </ul>`
    )
  },
  {
    path: 'services/digital-engineering',
    title: 'Digital Systems Engineering | Cloud & Microservices | MIHORA.TECH',
    description: 'Custom distributed microservices, high-concurrency PostgreSQL/Kafka consensus backends, zero-trust API meshes, and native mobile platforms engineered by MIHORA.TECH.',
    keywords: 'digital systems engineering, distributed microservices, Go TypeScript backend, zero-trust API mesh, MIHORA.TECH',
    renderContent: () => wrapPage(
      'Division 01 · Software & Platforms',
      'Digital Systems Engineering',
      'Production-hardened distributed backends, high-throughput Go and TypeScript microservices, PostgreSQL replication topologies, and zero-trust API meshes built for sub-10ms P99 latency.'
    )
  },
  {
    path: 'services/automation-intelligence',
    title: 'Automation & Workflow Intelligence | SCADA & AI Pipelines | MIHORA.TECH',
    description: 'Event-driven workflow engines, industrial SCADA telemetry bridges, air-gapped one-way optical diodes, and audited machine intelligence workflows by MIHORA.TECH.',
    keywords: 'SCADA automation, Modbus OPC-UA telemetry, event-driven workflow automation, air-gapped AI, MIHORA.TECH',
    renderContent: () => wrapPage(
      'Division 02 · Telemetry & Workflows',
      'Automation & Intelligence Pipelines',
      'Deterministic workflow orchestration bridging legacy industrial Modbus/OPC-UA PLCs with real-time observability and cryptographically audited LLM agent tool routing.'
    )
  },
  {
    path: 'services/physical-infrastructure',
    title: 'Physical Datacenter Infrastructure | Racks & Fusion Splicing | MIHORA.TECH',
    description: 'Turnkey 42U/48U server rack build-outs, 3-phase PDU distribution, NVMe-oF SAN fabrics, and core-alignment fusion fiber splicing (<= 0.03 dB) by MIHORA.TECH.',
    keywords: 'physical datacenter infrastructure, server rack buildout, core-alignment fiber splicing, Cat6A cabling, MIHORA.TECH',
    renderContent: () => wrapPage(
      'Division 03 · Hardware & Optics',
      'Physical Datacenter Infrastructure',
      'Tier-III and Tier-IV datacenter construction, 42U high-density cabinet dressing, N+1/2N dual-bus power topologies, NVMe SAN fabrics, and core-alignment single-mode OS2 fiber splicing.'
    )
  },
  {
    path: 'services/field-engineering',
    title: 'Field Engineering & Rapid Optical Certification | MIHORA.TECH',
    description: 'Mobile field deployment teams equipped with Fujikura core-alignment fusion splicers, EXFO OTDRs, and Fluke DSX-8000 copper analyzers across EMEA and South Asia.',
    keywords: 'field engineering dispatch, OTDR fiber certification, Fluke DSX-8000 testing, multi-site IT rollout, MIHORA.TECH',
    renderContent: () => wrapPage(
      'Division 04 · Kinetic Field Operations',
      'Field Engineering & Optical Certification',
      '4-hour emergency hardware break-fix dispatch, multi-site SD-WAN and CCTV over-fiber rollouts, and signed ANSI/TIA-568-D link certification dossiers.'
    )
  },
  {
    path: 'services/managed-sre',
    title: '24/7 Managed SRE & Sovereign Telemetry Command | MIHORA.TECH',
    description: 'Continuous follow-the-sun site reliability engineering across London (UTC+0) and Islamabad (UTC+5) NOC clusters with sub-15-minute Tier-3 response and 99.999% SLA.',
    keywords: '24/7 managed SRE, site reliability engineering, dual NOC London Islamabad, 99.999 SLA uptime, MIHORA.TECH',
    renderContent: () => wrapPage(
      'Division 05 · Continuous Custody',
      'Managed Reliability & 24/7 SRE',
      'Unbroken monitoring spanning silicon thermals, optical attenuation alarms, and Kubernetes container health across London and Islamabad operations desks.'
    )
  },
  {
    path: 'how-it-works',
    title: 'How It Works | 5-Phase Sovereign Delivery Methodology | MIHORA.TECH',
    description: 'Learn how MIHORA.TECH delivers full-span digital and physical systems across 5 verified phases from discovery and blueprinting through OTDR certification and 24/7 SRE.',
    keywords: 'how MIHORA works, engineering methodology, datacenter deployment phases, zero downtime cutover',
    renderContent: () => wrapPage(
      'Sovereign Delivery Methodology',
      'How MIHORA.TECH Engineers & Ships Without Fragile Handoffs',
      'Our 5-phase engineering methodology unifies physical optics, bare-metal servers, software platforms, and 24/7 operations inside a single verifiable chain.'
    )
  },
  {
    path: 'case-studies',
    title: 'Enterprise Case Studies & Field Deployments | MIHORA.TECH',
    description: 'Verified enterprise deployments by MIHORA.TECH across sovereign banking repatriation, 1,200-site SD-WAN retail networks, private hospital 5G cores, and logistics.',
    keywords: 'MIHORA case studies, datacenter case study, SD-WAN rollout, sovereign banking migration',
    renderContent: () => wrapPage(
      'Production Case Studies · Verified Outcomes',
      'Field-Proven Enterprise & National Infrastructure Deployments',
      'Production infrastructure outcomes engineered across banking, multi-site retail, clinical healthcare, and national cold-chain logistics.'
    )
  },
  {
    path: 'resources',
    title: 'Resources & Engineering Knowledge Hub | MIHORA.TECH',
    description: 'Technical reference tables for TIA-568-D fiber attenuation, Uptime Tier downtime budgets, concise AEO definitions, and MIHORA architecture tools.',
    keywords: 'MIHORA resources, fiber optic attenuation standards, SLA uptime calculator, engineering knowledge hub',
    renderContent: () => wrapPage(
      'Engineering Knowledge Hub & Standards',
      'Technical Reference, Optical Tolerances & Architectural Guides',
      'Direct engineering references published by MIHORA.TECH R&D Labs—spanning TIA-568 optical budgets, SLA downtime mathematics, whitepapers, and sizing calculators.'
    )
  },
  {
    path: 'partnerships',
    title: 'Strategic Alliances & Partnerships | MIHORA.TECH',
    description: 'Partner with MIHORA.TECH across Tier-1 carrier BGP peering, sovereign colocation suites, bare-metal hardware OEM integration, and systems engineering alliances.',
    keywords: 'MIHORA partnerships, carrier peering, sovereign colocation partner, enterprise systems integrator',
    renderContent: () => wrapPage(
      'Global Alliance Program',
      'Partnering Across Optical Transit, Silicon & Sovereign Infrastructure',
      'MIHORA.TECH collaborates with Tier-1 optical carriers, Tier-IV datacenter operators, hardware OEMs, and systems integrators worldwide.'
    )
  },
  {
    path: 'solutions',
    title: 'Enterprise Sovereign Solutions & Reliability Frameworks | MIHORA.TECH',
    description: 'Tailored technology solutions for mission-critical operations, financial settlement rails, automated supply chains, and multi-cloud resilience.',
    keywords: 'enterprise solutions, sovereign architecture, mission-critical systems, MIHORA solutions',
    renderContent: () => wrapPage(
      'Enterprise Frameworks · Sovereign Resilience',
      'Enterprise Solutions & Reliability Frameworks',
      'Bespoke high-availability frameworks engineered for zero downtime, multi-region failover, sovereign data compliance, and high-throughput real-time telemetry.'
    )
  },
  {
    path: 'industries',
    title: 'Industries & Mission-Critical Sectors | MIHORA.TECH',
    description: 'Sovereign systems engineered for financial institutions, telecommunications providers, energy grids, defense contractors, and enterprise logistics.',
    keywords: 'banking tech, telecom infrastructure, energy SCADA, healthcare HIPAA, logistics telemetry',
    renderContent: () => wrapPage(
      'Industry Sectors · Regulated Environments',
      'Mission-Critical Industry Sectors',
      'Engineering high-security, high-availability digital and physical infrastructure for Banking, Telecommunications, Healthcare, Energy Utilities, and Supply Chain Logistics.'
    )
  },
  {
    path: 'insights',
    title: 'Technical Insights & Engineering Dispatches | MIHORA.TECH',
    description: 'Architectural analysis, technical whitepapers, systems post-mortems, and field telemetries from MIHORA.TECH principal engineers.',
    keywords: 'technical whitepapers, systems research, fiber optics research, datacenter benchmarks, MIHORA insights',
    renderContent: () => wrapPage(
      'Sovereign Labs & Technical Dispatches',
      'Technical Papers & Engineering Dispatches',
      'Peer-reviewed systems architectures, empirical optical loss benchmarks, zero-downtime database strategies, and field case studies authored by the MIHORA engineering cadre.'
    )
  },
  {
    path: 'careers',
    title: 'Careers & Engineering Cadre | MIHORA.TECH — Founded by M. Matti ul Hasnain & Omema Iqbal',
    description: 'Join the MIHORA.TECH engineering cadre. Open positions across systems design, datacenter hardware, distributed systems, and site reliability.',
    keywords: 'engineering jobs, datacenter careers, systems architect, site reliability jobs, MIHORA careers',
    renderContent: () => wrapPage(
      'Engineering Recruitment · UK & Pakistan Hubs',
      'Join the Engineering Cadre',
      'We recruit experienced systems architects, hardware specialists, and site reliability engineers dedicated to sovereign, resilient technology infrastructure worldwide.',
      `<p style="font-size: 15px; color: #334155;">Submit engineering credentials directly to: <a href="mailto:hr@mihora.tech" style="color: #1d4ed8; font-weight: 700;">hr@mihora.tech</a></p>`
    )
  },
  {
    path: 'contact',
    title: 'Contact & Command Hubs | MIHORA.TECH — London & Islamabad',
    description: 'Connect with MIHORA.TECH executive leadership and principal architects at our dual command centers in London (UK) and Islamabad (Pakistan).',
    keywords: 'contact MIHORA, MIHORA office London, MIHORA office Islamabad, emergency datacenter dispatch',
    renderContent: () => wrapPage(
      'Dual-Hub Architectural Dispatch',
      'Command Hubs & Direct Dispatch',
      'Direct communication channels with MIHORA executive stewardship and engineering leadership across London (UK) and Islamabad (Pakistan).',
      `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 24px;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 24px;">
          <h2 style="font-size: 18px; font-weight: 800; color: #1d4ed8; margin: 0 0 8px;">London Command Center (UK)</h2>
          <p style="font-size: 14px; color: #334155; margin: 0 0 8px;">128 City Road, London EC2A 4NE, United Kingdom</p>
          <p style="font-size: 13px; color: #64748b; font-family: monospace;">EMEA Headquarters · ISO Compliance · UTC+0</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 24px;">
          <h2 style="font-size: 18px; font-weight: 800; color: #1d4ed8; margin: 0 0 8px;">Islamabad Systems Center (Pakistan)</h2>
          <p style="font-size: 14px; color: #334155; margin: 0 0 8px;">Blue Area, Islamabad 44000, Pakistan</p>
          <p style="font-size: 13px; color: #64748b; font-family: monospace;">Systems Labs · 24/7 NOC Telemetry · UTC+5</p>
        </div>
      </div>`
    )
  },
  {
    path: 'status',
    title: 'Live Infrastructure Telemetry & Status (99.999% SLA) | MIHORA.TECH',
    description: 'Real-time telemetry, 99.999% SLA uptime metrics, optical DWDM health, and NOC alert feeds across London and Islamabad hubs.',
    keywords: 'MIHORA status, system status, 99.999% SLA, datacenter telemetry, NOC monitoring',
    renderContent: () => wrapPage(
      'Continuous Observability · 99.999% SLA',
      'Infrastructure Telemetry & System Status',
      'Continuous real-time observability across the UK (London) and Pakistan (Islamabad) command clusters. Verified 99.999% SLA uptime.'
    )
  },
  {
    path: 'legal',
    title: 'Legal, Privacy & Compliance | MIHORA.TECH',
    description: 'MIHORA.TECH governance, sovereign compliance, data privacy, intellectual property disclosures, and security terms.',
    keywords: 'MIHORA legal, data sovereignty, ISO 27001, SOC 2, privacy policy, MIHORA terms',
    renderContent: () => wrapPage(
      'Corporate Governance · ISO 27001 & SOC 2 Type II',
      'Legal Governance & Sovereign Compliance',
      'Corporate governance, ISO 27001 Information Security, SOC 2 Type II trust criteria, and strict client data sovereignty policies.'
    )
  },
  {
    path: 'privacy',
    title: 'Privacy Policy & Data Custody | MIHORA.TECH',
    description: 'How MIHORA.TECH collects, processes, protects, and strictly scopes data under UK GDPR, EU GDPR, and ISO 27001 privacy controls.',
    keywords: 'MIHORA privacy policy, UK GDPR compliance, client data custody',
    renderContent: () => wrapPage(
      'Data Protection · Zero-Knowledge Privacy',
      'Privacy Policy & Client Data Custody',
      'MIHORA.TECH operates under strict data minimization, UK/EU GDPR compliance, and cryptographic client key custody across all service deployments.'
    )
  },
  {
    path: 'terms',
    title: 'Terms of Service & SLA Conditions | MIHORA.TECH',
    description: 'Master engineering terms, 99.999% SLA accountability schedules, client IP ownership, and commercial engagement conditions of MIHORA.TECH.',
    keywords: 'MIHORA terms of service, SLA conditions, IP ownership',
    renderContent: () => wrapPage(
      'Master Commercial Conditions',
      'Terms of Service & SLA Governance',
      'All custom engineering artifacts, Terraform/IaC modules, and sovereign keys belong explicitly to the commissioning enterprise upon contract milestone acceptance.'
    )
  },
  {
    path: 'disclaimer',
    title: 'Engineering & Security Disclaimer | MIHORA.TECH',
    description: 'Scope boundaries, operational liability disclosures, and technical benchmark caveats governing MIHORA.TECH infrastructure documentation.',
    keywords: 'MIHORA disclaimer, engineering benchmark caveats, scope disclosure',
    renderContent: () => wrapPage(
      'Technical Disclosures',
      'Engineering & Architectural Disclaimer',
      'Published latency, attenuation, and PUE measurements represent verified field baselines achieved under specified environmental and hardware conditions.'
    )
  },
  {
    path: 'our-story',
    title: 'Our Story | Founding Doctrine & Dual-Hub Continuity | MIHORA.TECH',
    description: 'Discover why M. Matti ul Hasnain and Omema Iqbal co-founded MIHORA.TECH to unify distributed software engineering, physical datacenter hardware, and 24/7 operations across London and Islamabad.',
    keywords: 'MIHORA story, M. Matti ul Hasnain, Omema Iqbal, London Islamabad engineering hubs',
    renderContent: () => wrapPage(
      'Founding Thesis · MIHORA.TECH',
      'Engineered Because Critical Infrastructure Deserves One Accountable Spine',
      'Co-founded by M. Matti ul Hasnain and Omema Iqbal across London (UK) and Islamabad (Pakistan) to eliminate the accountability gap between cloud software and optical hardware.'
    )
  },
  {
    path: 'security',
    title: 'Zero-Trust Security, HSM Custody & ISO 27001 Architecture | MIHORA.TECH',
    description: 'Explore client-owned FIPS 140-3 HSM key custody, optical SCADA data diodes, TPM 2.0 measured boot attestation, ISO 27001 alignment, and UK-GDPR governance.',
    keywords: 'MIHORA security, FIPS 140-3 HSM, optical SCADA diode, ISO 27001, UK-GDPR',
    renderContent: () => wrapPage(
      'Sovereign Trust & Security Center',
      'Zero-Trust Security Built From Silicon Cabinets to TLS Keys',
      'Client-owned cryptographic root key custody, unidirectional optical SCADA bridges, TPM 2.0 attested Linux kernels, and ISO 27001 / UK-GDPR containment.'
    )
  },
  {
    path: 'tools',
    title: 'Engineering Calculators: SLA Downtime, Optical Loss & TCO | MIHORA.TECH',
    description: 'Interactive technical calculators for enterprise engineering teams: compute 99.999% SLA downtime budgets, TIA-568-D optical fiber link attenuation, and 5-year sovereign infrastructure TCO.',
    keywords: 'SLA downtime calculator, optical fiber attenuation calculator, TIA-568-D, sovereign TCO',
    renderContent: () => wrapPage(
      'Open Engineering Workbench',
      'Sovereign Infrastructure & Optical Budget Calculators',
      'Quantitative diagnostic tools for sizing 99.999% SLA downtime budgets, single-mode OS2 fiber link attenuation, and 5-year sovereign custody economics.'
    )
  },
  {
    path: 'glossary',
    title: 'Sovereign Systems & Optical Infrastructure Glossary | MIHORA.TECH',
    description: 'Searchable engineering glossary defining OTDR certification, OS2 single-mode fiber, EVPN-VXLAN, optical data diodes, 2N redundancy, and sovereign systems custody.',
    keywords: 'OTDR definition, OS2 single-mode fiber, EVPN-VXLAN, optical data diode, 2N power',
    renderContent: () => wrapPage(
      'Technical Reference Lexicon',
      'Engineering, Optical Fiber & Sovereign Custody Glossary',
      'Authoritative definitions across physical optical transport physics, distributed software consensus, cryptographic custody, and follow-the-sun SRE.'
    )
  },
  {
    path: 'compare',
    title: 'Architecture Comparison: Sovereign Custody vs. Hyperscale Cloud | MIHORA.TECH',
    description: 'Direct technical comparison matrix evaluating MIHORA Full-Span Sovereign Custody against hyperscale public cloud lock-in and fragmented agencies.',
    keywords: 'sovereign infrastructure vs cloud, full-span engineering comparison, cloud repatriation',
    renderContent: () => wrapPage(
      'Decision & Trade-Off Matrix',
      'Sovereign Full-Span Engineering vs. Hyperscale & Fragmented Vendors',
      'Objective evaluation across accountability scope, cryptographic key custody, physical OTDR certification, bandwidth egress economics, and 24/7 operational response.'
    )
  },
  {
    path: 'press',
    title: 'Press Kit, Verified Factsheet & Technical Citations | MIHORA.TECH',
    description: 'Canonical corporate boilerplate, founder biographies for M. Matti ul Hasnain and Omema Iqbal, SVG marks, and copyable technical citations for press and industry directories.',
    keywords: 'MIHORA press kit, MIHORA factsheet, M. Matti ul Hasnain bio, Omema Iqbal bio',
    renderContent: () => wrapPage(
      'Press, Media & Directory Reference',
      'Verified Entity Factsheet, Brand Assets & Reference Citations',
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
    .replace(/<meta name="twitter:url" content=".*?" \/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`);

  const fullPrerender = `
    <div id="prerender-shell" style="min-height: 100vh; display: flex; flex-direction: column; background: #ffffff;">
      ${buildHeader()}
      <main style="flex: 1;">
        ${route.renderContent()}
      </main>
      ${buildFooter()}
    </div>`;

  pageHtml = pageHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${fullPrerender}</div>`);

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

console.log(`[generate-routes] Successfully generated ${routes.length} rich static route HTML files for search engine crawlers.`);
