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
  { href: '/engineering/', label: 'Engineering' },
  { href: '/services/', label: 'Services' },
  { href: '/solutions/', label: 'Solutions' },
  { href: '/industries/', label: 'Industries' },
  { href: '/company/', label: 'Company & Founders' },
  { href: '/docs/', label: 'Docs' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/insights/', label: 'Insights' },
  { href: '/careers/', label: 'Careers' },
  { href: '/contact/', label: 'Contact' },
  { href: '/status/', label: 'Status (99.999%)' }
];

function buildHeader() {
  const linksHtml = navLinks
    .map(link => `<a href="${link.href}" style="color: #64748b; text-decoration: none; font-size: 13px; font-weight: 600; padding: 4px 8px;">${link.label}</a>`)
    .join(' ');

  return `
    <header style="border-bottom: 1px solid rgba(226, 232, 240, 0.8); background: #ffffff; padding: 14px 24px; position: sticky; top: 0; z-index: 50;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <a href="/" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
          <img src="/mihora-logo.svg" alt="MIHORA.TECH" width="130" height="34" style="height: 32px; width: auto;" />
          <span style="font-family: monospace; font-size: 11px; background: rgba(30, 64, 175, 0.08); color: #1e40af; padding: 3px 8px; border-radius: 9999px; font-weight: 700; letter-spacing: 0.05em;">SOVEREIGN TECH</span>
        </a>
        <nav style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          ${linksHtml}
          <a href="mailto:hr@mihora.tech" style="background: #1e40af; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; font-family: monospace; padding: 6px 14px; border-radius: 6px; letter-spacing: 0.05em;">DISPATCH</a>
        </nav>
      </div>
    </header>`;
}

function buildFooter() {
  return `
    <footer style="border-top: 1px solid rgba(226, 232, 240, 0.8); background: #f8fafc; padding: 48px 24px 32px; margin-top: 64px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; padding-bottom: 32px; border-bottom: 1px solid #e2e8f0;">
          <div>
            <img src="/mihora-logo.svg" alt="MIHORA.TECH" width="140" height="36" style="height: 34px; width: auto; margin-bottom: 12px;" />
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 12px;">
              <strong>MIHORA.TECH</strong> is an international sovereign engineering authority operating synchronized command hubs across London (United Kingdom) and Islamabad (Pakistan).
            </p>
            <p style="font-family: monospace; font-size: 11px; color: #1e40af; font-weight: 700; margin: 0;">
              FOUNDED BY M. MATTI UL HASNAIN &amp; OMEMA IQBAL
            </p>
          </div>
          <div>
            <h4 style="font-size: 12px; font-family: monospace; color: #1e40af; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">Command Hubs</h4>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 8px;">
              <strong>London Command (UK):</strong> 128 City Road, London EC2A 4NE, United Kingdom
            </p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">
              <strong>Islamabad Systems (PK):</strong> Blue Area, Islamabad 44000, Pakistan
            </p>
          </div>
          <div>
            <h4 style="font-size: 12px; font-family: monospace; color: #1e40af; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">Executive Leadership</h4>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 8px;">
              <a href="/company/" style="color: #1e40af; text-decoration: underline; font-weight: 600;">M. Matti ul Hasnain</a><br />
              <span style="font-size: 12px; color: #64748b;">Co-Founder &amp; Principal Systems Architect</span>
            </p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">
              <a href="/company/" style="color: #1e40af; text-decoration: underline; font-weight: 600;">Omema Iqbal</a><br />
              <span style="font-size: 12px; color: #64748b;">Co-Founder &amp; Operations Director</span>
            </p>
          </div>
          <div>
            <h4 style="font-size: 12px; font-family: monospace; color: #1e40af; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">Direct Dispatch</h4>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 6px;">
              Email: <a href="mailto:hr@mihora.tech" style="color: #1e40af; font-weight: 600;">hr@mihora.tech</a>
            </p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 6px;">
              Architecture: <a href="mailto:dispatch@mihora.tech" style="color: #1e40af; font-weight: 600;">dispatch@mihora.tech</a>
            </p>
            <p style="font-size: 12px; color: #10b981; font-family: monospace; font-weight: 700; margin: 8px 0 0;">
              &bull; 99.999% SLA UPTIME VERIFIED
            </p>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; padding-top: 24px; font-size: 12px; color: #64748b;">
          <div>
            &copy; 2025 MIHORA.TECH (PRIVATE) LIMITED. ALL RIGHTS RESERVED.
          </div>
          <div style="display: flex; gap: 16px;">
            <a href="/legal/" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
            <a href="/legal/" style="color: #64748b; text-decoration: none;">Terms of Service</a>
            <a href="/legal/" style="color: #64748b; text-decoration: none;">Data Sovereignty (ISO 27001)</a>
          </div>
        </div>
      </div>
    </footer>`;
}

function buildFounderBanner() {
  return `
    <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 12px; padding: 24px; margin: 32px 0;">
      <div style="font-family: monospace; font-size: 11px; color: #1e40af; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
        EXECUTIVE STEWARDSHIP // DUAL-HUB GOVERNANCE
      </div>
      <h3 style="font-size: 20px; color: #0f172a; margin: 0 0 12px; font-weight: 800;">
        MIHORA.TECH &mdash; Founded by M. Matti ul Hasnain &amp; Omema Iqbal
      </h3>
      <p style="font-size: 14px; color: #334155; line-height: 1.6; margin: 0 0 16px;">
        MIHORA was founded by <strong>M. Matti ul Hasnain</strong> (also known as <em>Matti ul Hasnain</em> or <em>Hasnain</em>, Co-Founder &amp; Principal Systems Architect) and <strong>Omema Iqbal</strong> (also known as <em>Omema</em>, Co-Founder &amp; Operations Director). Operating synchronized sovereign engineering command centers in London (United Kingdom) and Islamabad (Pakistan), MIHORA guarantees uninterrupted 24/7 mission-critical operations worldwide.
      </p>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="/company/" style="display: inline-block; background: #1e40af; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; padding: 8px 16px; border-radius: 6px;">Read Founders' Full Biography &rarr;</a>
        <a href="/faq/" style="display: inline-block; background: #ffffff; color: #1e40af; border: 1px solid #cbd5e1; text-decoration: none; font-size: 12px; font-weight: 700; padding: 8px 16px; border-radius: 6px;">Verified Entity FAQ</a>
      </div>
    </div>`;
}

const routes = [
  {
    path: 'company',
    title: 'Company & Founders | M. Matti ul Hasnain & Omema Iqbal | MIHORA.TECH',
    description: 'Founded by M. Matti ul Hasnain and Omema Iqbal. Discover MIHORA.TECH engineering doctrine, dual UK & Pakistan command centers, leadership profiles, and sovereign systems governance.',
    keywords: 'M. Matti ul Hasnain, Omema Iqbal, Matti ul Hasnain, Muhammad Matti ul Hasnain, Hasnain, Omema, MIHORA founders, founders of MIHORA, who founded MIHORA, MIHORA leadership, MIHORA.TECH, MIHORA TECH, tech company Pakistan, sovereign systems engineering, dual hub engineering',
    heading: 'MIHORA.TECH — Company, Executive Leadership & Founders',
    renderContent: () => `
      <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
        <div style="display: inline-block; background: rgba(30, 64, 175, 0.08); color: #1e40af; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; font-family: monospace; margin-bottom: 16px;">
          // CORPORATE PROFILE &bull; FOUNDED BY M. MATTI UL HASNAIN &amp; OMEMA IQBAL
        </div>
        <h1 style="font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px; text-transform: uppercase;">
          Company &amp; Executive Leadership
        </h1>
        <p style="font-size: 18px; color: #334155; line-height: 1.6; margin: 0 0 32px;">
          <strong>MIHORA.TECH</strong> was founded by <strong>M. Matti ul Hasnain</strong> and <strong>Omema Iqbal</strong> to pioneer sovereign systems engineering, mission-critical datacenter infrastructure, and 24/7 global telemetry operations.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 40px;">
          <!-- Founder 1 -->
          <div style="background: #ffffff; border: 2px solid rgba(30, 64, 175, 0.2); border-radius: 16px; padding: 28px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
              <img src="/founder-matti.jpg" alt="M. Matti ul Hasnain (Matti ul Hasnain) - Co-Founder & Principal Systems Architect of MIHORA.TECH" width="80" height="80" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover; border: 2px solid #1e40af;" />
              <div>
                <span style="font-family: monospace; font-size: 11px; background: rgba(30, 64, 175, 0.1); color: #1e40af; padding: 2px 8px; border-radius: 4px; font-weight: 700;">CO-FOUNDER</span>
                <h3 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 4px 0 2px;">M. Matti ul Hasnain</h3>
                <p style="font-size: 12px; font-family: monospace; color: #64748b; margin: 0;">PRINCIPAL SYSTEMS ARCHITECT</p>
              </div>
            </div>
            <p style="font-size: 14px; color: #334155; line-height: 1.6; margin: 0 0 16px;">
              <strong>M. Matti ul Hasnain</strong> (also widely known as <em>Matti ul Hasnain</em>, <em>Muhammad Matti ul Hasnain</em>, or <em>Hasnain</em>) leads the architecture of MIHORA's 9-layer sovereign stack, physical datacenter hardware topologies, low-latency microservices, optical fiber fusion splicing, and continuous SRE reliability protocols.
            </p>
            <div style="font-size: 12px; color: #475569; background: #f8fafc; padding: 10px 14px; border-radius: 8px;">
              <strong>Core Disciplines:</strong> Sovereign Computing &bull; Datacenter Construction &bull; Fiber Optics &bull; Distributed Micro-mesh &bull; Air-Gapped Networks
            </div>
          </div>

          <!-- Founder 2 -->
          <div style="background: #ffffff; border: 2px solid rgba(2, 132, 199, 0.2); border-radius: 16px; padding: 28px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
              <img src="/founder-omema.jpg" alt="Omema Iqbal (Omema) - Co-Founder & Operations Director of MIHORA.TECH" width="80" height="80" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover; border: 2px solid #0284c7;" />
              <div>
                <span style="font-family: monospace; font-size: 11px; background: rgba(2, 132, 199, 0.1); color: #0284c7; padding: 2px 8px; border-radius: 4px; font-weight: 700;">CO-FOUNDER</span>
                <h3 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 4px 0 2px;">Omema Iqbal</h3>
                <p style="font-size: 12px; font-family: monospace; color: #64748b; margin: 0;">OPERATIONS DIRECTOR</p>
              </div>
            </div>
            <p style="font-size: 14px; color: #334155; line-height: 1.6; margin: 0 0 16px;">
              <strong>Omema Iqbal</strong> (also known as <em>Omema</em>) directs global dual-hub operational governance between the London (UK) and Islamabad (Pakistan) command centers, multi-jurisdiction regulatory compliance, international client delivery, and strategic corporate governance.
            </p>
            <div style="font-size: 12px; color: #475569; background: #f8fafc; padding: 10px 14px; border-radius: 8px;">
              <strong>Core Disciplines:</strong> Global Operations &bull; Dual-Hub Governance &bull; ISO 27001 Compliance &bull; Executive Delivery &bull; International Expansion
            </div>
          </div>
        </div>

        <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; margin: 40px 0 16px; text-transform: uppercase;">
          Dual Command Hub Model: London &amp; Islamabad
        </h2>
        <p style="font-size: 15px; color: #334155; line-height: 1.7; margin: 0 0 20px;">
          MIHORA operates with synchronized command authorities in two strategic global epicenters:
        </p>
        <ul style="font-size: 15px; color: #334155; line-height: 1.8; margin: 0 0 24px; padding-left: 24px;">
          <li><strong>London Hub (United Kingdom):</strong> Located in Central London (128 City Road), driving EMEA corporate governance, European financial technology compliance, and transatlantic client operations.</li>
          <li><strong>Islamabad Hub (Pakistan):</strong> Located in Islamabad Blue Area, serving as the core systems engineering lab, software simulation grounds, and Asian hardware telemetry dispatch headquarters.</li>
        </ul>
        <p style="font-size: 15px; color: #334155; line-height: 1.7; margin: 0 0 20px;">
          This dual-hub model enables follow-the-sun continuous site reliability telemetry with an active-active quorum, ensuring that if transit across one hemisphere experiences interruption, the secondary hub maintains custody within milliseconds.
        </p>

        <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; margin: 40px 0 16px; text-transform: uppercase;">
          Engineering Doctrine &amp; Sovereign Philosophy
        </h2>
        <p style="font-size: 15px; color: #334155; line-height: 1.7; margin: 0 0 16px;">
          Traditional IT firms restrict themselves to software in a browser and treat hardware as someone else's problem. When physical servers fail, cables fray, or optical loss exceeds thresholds, pure software teams are helpless. MIHORA bridges this divide: our engineers write distributed microservices in Go and TypeScript, and our field technicians carry Fujikura fusion splicers, Fluke DTX analyzers, and 4x4 engineering rigs directly into server rooms.
        </p>
      </div>`
  },
  {
    path: 'faq',
    title: 'Verified Entity FAQ & Knowledge Base | MIHORA.TECH — Founded by M. Matti ul Hasnain & Omema Iqbal',
    description: 'Official answers to common questions about MIHORA.TECH, founders M. Matti ul Hasnain & Omema Iqbal, dual UK-Pakistan command centers, services, and datacenter hardware.',
    keywords: 'MIHORA FAQ, who founded MIHORA, who is M. Matti ul Hasnain, who is Omema Iqbal, Matti ul Hasnain, Omema, MIHORA.TECH, MIHORA TECH, datacenter engineering, Pakistan UK tech, MIHORA services',
    heading: 'MIHORA.TECH — Official FAQ & Verified Knowledge Base',
    renderContent: () => `
      <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
        <div style="display: inline-block; background: rgba(30, 64, 175, 0.08); color: #1e40af; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; font-family: monospace; margin-bottom: 16px;">
          // VERIFIED ENTITY KNOWLEDGE BASE &bull; OFFICIAL DOCUMENTATION
        </div>
        <h1 style="font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px; text-transform: uppercase;">
          Frequently Asked Questions (FAQ)
        </h1>
        <p style="font-size: 18px; color: #334155; line-height: 1.6; margin: 0 0 32px;">
          Definitive corporate answers regarding MIHORA.TECH, leadership, engineering capabilities, dual command hubs, and compliance.
        </p>

        ${buildFounderBanner()}

        <div style="display: flex; flex-direction: column; gap: 24px; margin-top: 32px;">
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <h3 style="font-size: 18px; font-weight: 800; color: #1e40af; margin: 0 0 8px;">What is MIHORA.TECH and what does the company do?</h3>
            <p style="font-size: 15px; color: #334155; margin: 0; line-height: 1.6;">
              MIHORA.TECH is an international sovereign engineering organization specializing in end-to-end mission-critical digital systems, physical datacenter infrastructure, event-driven automation pipelines, and 24/7 managed site reliability engineering (SRE). Founded to bridge the divide between low-level hardware physics and distributed software architectures, MIHORA operates dual engineering command hubs across the United Kingdom and Pakistan, delivering high-availability solutions worldwide.
            </p>
          </div>

          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <h3 style="font-size: 18px; font-weight: 800; color: #1e40af; margin: 0 0 8px;">Who founded MIHORA.TECH?</h3>
            <p style="font-size: 15px; color: #334155; margin: 0; line-height: 1.6;">
              MIHORA.TECH was founded by <strong>M. Matti ul Hasnain</strong> and <strong>Omema Iqbal</strong>. M. Matti ul Hasnain serves as Co-Founder &amp; Principal Systems Architect, leading the 9-layer sovereign stack, datacenter hardware topology, optical fiber networking, and low-latency distributed microservices. Omema Iqbal serves as Co-Founder &amp; Operations Director, directing global operations, corporate governance, multi-jurisdiction compliance frameworks, and international enterprise client delivery.
            </p>
          </div>

          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <h3 style="font-size: 18px; font-weight: 800; color: #1e40af; margin: 0 0 8px;">Who is M. Matti ul Hasnain (Matti ul Hasnain)?</h3>
            <p style="font-size: 15px; color: #334155; margin: 0; line-height: 1.6;">
              M. Matti ul Hasnain (also known as Matti ul Hasnain, Muhammad Matti ul Hasnain, or Hasnain) is the Co-Founder &amp; Principal Systems Architect of MIHORA.TECH. He leads the architecture of sovereign digital platforms, physical datacenter server deployments, core-alignment fusion fiber splicing (loss ≤ 0.05 dB), and distributed 24/7 site reliability engineering across the UK and Pakistan command hubs.
            </p>
          </div>

          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <h3 style="font-size: 18px; font-weight: 800; color: #1e40af; margin: 0 0 8px;">Who is Omema Iqbal?</h3>
            <p style="font-size: 15px; color: #334155; margin: 0; line-height: 1.6;">
              Omema Iqbal (also known as Omema) is the Co-Founder &amp; Operations Director of MIHORA.TECH. She directs global dual-hub operations across London (UK) and Islamabad (Pakistan), international client engagement, ISO 27001 data compliance, and enterprise delivery frameworks.
            </p>
          </div>

          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <h3 style="font-size: 18px; font-weight: 800; color: #1e40af; margin: 0 0 8px;">Where is MIHORA.TECH located and headquartered?</h3>
            <p style="font-size: 15px; color: #334155; margin: 0; line-height: 1.6;">
              MIHORA.TECH operates under a dual-command hub model with operational command centers in London, United Kingdom (serving European and transatlantic enterprise engagements) and Islamabad, Pakistan (serving South Asian, Middle Eastern, and regional technology deployments). This synchronized dual-hub structure enables 24/7 follow-the-sun continuous telemetry monitoring, rapid field dispatch, and multi-region failover.
            </p>
          </div>

          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <h3 style="font-size: 18px; font-weight: 800; color: #1e40af; margin: 0 0 8px;">What core engineering services does MIHORA.TECH provide?</h3>
            <p style="font-size: 15px; color: #334155; margin: 0; line-height: 1.6;">
              MIHORA.TECH provides five primary core service divisions: (1) Digital Systems Engineering: Cloud architecture, distributed microservices, and high-concurrency backends; (2) Physical Datacenter Infrastructure: Server rack deployment, SAN storage arrays, and OTDR-certified fiber splicing; (3) Automation &amp; Intelligence: Event-driven telemetry, workflow orchestration, and SCADA industrial edge bridges; (4) Field Engineering: Rapid on-site physical dispatch, structured cabling, and Fluke network certification; and (5) Managed 24/7 SRE: Continuous observability, automated break-fix, and guaranteed 99.999% SLA uptime.
            </p>
          </div>

          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <h3 style="font-size: 18px; font-weight: 800; color: #1e40af; margin: 0 0 8px;">How does MIHORA handle physical server racks and fiber cabling?</h3>
            <p style="font-size: 15px; color: #334155; margin: 0; line-height: 1.6;">
              Physical engineering is a foundational capability of MIHORA.TECH. Our field engineering technicians perform on-premise datacenter installations, core-alignment fusion fiber splicing (insertion loss ≤ 0.05 dB), Cat6A shielded cable dressing, patch panel certification, and out-of-band IPMI/SAN storage configuration across enterprise sites worldwide.
            </p>
          </div>

          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <h3 style="font-size: 18px; font-weight: 800; color: #1e40af; margin: 0 0 8px;">Is MIHORA an officially registered enterprise?</h3>
            <p style="font-size: 15px; color: #334155; margin: 0; line-height: 1.6;">
              Yes. MIHORA.TECH operates as a registered corporate entity under MIHORA.TECH (PRIVATE) LIMITED, with executive stewardship maintained by founders M. Matti ul Hasnain and Omema Iqbal.
            </p>
          </div>
        </div>
      </div>`
  },
  {
    path: 'docs',
    title: 'Technical Documentation & Systems Architecture Codex | MIHORA.TECH',
    description: 'Official engineering documentation, 9-layer sovereign stack specifications, fiber splicing standards, and dual-hub telemetry protocols of MIHORA.TECH.',
    keywords: 'MIHORA documentation, systems architecture codex, 9-layer stack, datacenter specifications, fiber optic splicing, SRE telemetry, M. Matti ul Hasnain, Omema Iqbal, MIHORA.TECH',
    heading: 'MIHORA.TECH — Technical Documentation & Architecture Codex',
    renderContent: () => `
      <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
        <div style="display: inline-block; background: rgba(30, 64, 175, 0.08); color: #1e40af; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; font-family: monospace; margin-bottom: 16px;">
          // ARCHITECTURAL CODEX &bull; VERIFIED SYSTEM SPECIFICATIONS
        </div>
        <h1 style="font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px; text-transform: uppercase;">
          Systems Architecture Codex &amp; Documentation
        </h1>
        <p style="font-size: 18px; color: #334155; line-height: 1.6; margin: 0 0 32px;">
          Exhaustive architectural specifications governing the 9-layer sovereign stack, datacenter hardware standards, and dual-hub quorum protocols engineered by <strong>M. Matti ul Hasnain</strong> and <strong>Omema Iqbal</strong>.
        </p>

        ${buildFounderBanner()}

        <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 32px 0 16px;">The 9-Layer Sovereign Stack Breakdown</h2>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="border-left: 4px solid #1e40af; padding: 12px 16px; background: #f8fafc; border-radius: 0 8px 8px 0;">
            <strong style="color: #1e40af; font-family: monospace;">Layer 9: Software &amp; Digital Platforms</strong>
            <p style="margin: 4px 0 0; font-size: 14px; color: #334155;">TypeScript, Go, React, distributed micro-frontends, high-concurrency event loops.</p>
          </div>
          <div style="border-left: 4px solid #1e40af; padding: 12px 16px; background: #f8fafc; border-radius: 0 8px 8px 0;">
            <strong style="color: #1e40af; font-family: monospace;">Layer 8: APIs &amp; Micro-Mesh Services</strong>
            <p style="margin: 4px 0 0; font-size: 14px; color: #334155;">gRPC over HTTP/2, Kafka event streams, Redis cache buffers, zero-trust mutual TLS.</p>
          </div>
          <div style="border-left: 4px solid #1e40af; padding: 12px 16px; background: #f8fafc; border-radius: 0 8px 8px 0;">
            <strong style="color: #1e40af; font-family: monospace;">Layer 7: Autonomous Intelligence &amp; Workflows</strong>
            <p style="margin: 4px 0 0; font-size: 14px; color: #334155;">Edge computer vision, automated dispatch pipelines, LLM agent tool routing.</p>
          </div>
          <div style="border-left: 4px solid #1e40af; padding: 12px 16px; background: #f8fafc; border-radius: 0 8px 8px 0;">
            <strong style="color: #1e40af; font-family: monospace;">Layer 6: Operating Systems &amp; Virtualization</strong>
            <p style="margin: 4px 0 0; font-size: 14px; color: #334155;">Hardened Debian, Red Hat Enterprise Linux, Proxmox VE, KVM microVM hypervisors.</p>
          </div>
          <div style="border-left: 4px solid #1e40af; padding: 12px 16px; background: #f8fafc; border-radius: 0 8px 8px 0;">
            <strong style="color: #1e40af; font-family: monospace;">Layer 5: Network Routing &amp; SD-WAN Fabrics</strong>
            <p style="margin: 4px 0 0; font-size: 14px; color: #334155;">BGP multi-homing, OSPF routing, WireGuard zero-trust mesh, EVPN-VXLAN datacenter fabrics.</p>
          </div>
          <div style="border-left: 4px solid #1e40af; padding: 12px 16px; background: #f8fafc; border-radius: 0 8px 8px 0;">
            <strong style="color: #1e40af; font-family: monospace;">Layer 4: Physical Servers &amp; SAN Storage</strong>
            <p style="margin: 4px 0 0; font-size: 14px; color: #334155;">1U/2U/4U rackmount servers, NVMe over Fabrics (NVMe-oF), IPMI out-of-band telemetry.</p>
          </div>
          <div style="border-left: 4px solid #1e40af; padding: 12px 16px; background: #f8fafc; border-radius: 0 8px 8px 0;">
            <strong style="color: #1e40af; font-family: monospace;">Layer 3: Structured Cabling &amp; PDU Distribution</strong>
            <p style="margin: 4px 0 0; font-size: 14px; color: #334155;">Core-alignment fusion fiber splicing (loss ≤ 0.05 dB), shielded Cat6A cabling, ATS power failover.</p>
          </div>
          <div style="border-left: 4px solid #1e40af; padding: 12px 16px; background: #f8fafc; border-radius: 0 8px 8px 0;">
            <strong style="color: #1e40af; font-family: monospace;">Layer 2: Physical Facilities &amp; Environmental Protection</strong>
            <p style="margin: 4px 0 0; font-size: 14px; color: #334155;">CCTV NVR arrays, biometric access control, environmental temperature/humidity sensors.</p>
          </div>
          <div style="border-left: 4px solid #1e40af; padding: 12px 16px; background: #f8fafc; border-radius: 0 8px 8px 0;">
            <strong style="color: #1e40af; font-family: monospace;">Layer 1: Kinetic Field Dispatch &amp; Mechanical Engineering</strong>
            <p style="margin: 4px 0 0; font-size: 14px; color: #334155;">Certified engineering truck rigs, 4-hour SLA break-fix rolls, conduit and physical rack mounting.</p>
          </div>
        </div>
      </div>`
  },
  {
    path: 'engineering',
    title: 'Sovereign Engineering & Datacenter Infrastructure | MIHORA.TECH',
    description: 'Deep-stack sovereign engineering from physical datacenter infrastructure and fiber splicing to high-availability distributed microservices and SRE.',
    keywords: 'sovereign engineering, datacenter infrastructure, MIHORA engineering, 9-layer stack, server racks, fiber splicing, site reliability engineering, M. Matti ul Hasnain, Omema Iqbal',
    heading: 'MIHORA.TECH — Sovereign Engineering & Datacenter Infrastructure',
    renderContent: () => `
      <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
        <div style="display: inline-block; background: rgba(30, 64, 175, 0.08); color: #1e40af; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; font-family: monospace; margin-bottom: 16px;">
          // DISCIPLINE // SOVEREIGN ENGINEERING &bull; SILICON TO CLOUD
        </div>
        <h1 style="font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px; text-transform: uppercase;">
          Sovereign Engineering &amp; Datacenter Infrastructure
        </h1>
        <p style="font-size: 18px; color: #334155; line-height: 1.6; margin: 0 0 32px;">
          MIHORA.TECH delivers unified nine-layer technology infrastructure spanning physical server racks, optical fiber trunks, distributed microservices, and 24/7 site reliability telemetry.
        </p>

        ${buildFounderBanner()}

        <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 32px 0 16px;">Physical Infrastructure &amp; Optical Splicing</h2>
        <p style="font-size: 15px; color: #334155; line-height: 1.7;">
          Our technicians execute on-premise datacenter fit-outs, hot and cold aisle containment, and core-alignment single-mode optical fiber splicing certified below 0.05 dB insertion loss using OTDR optical time-domain reflectometers.
        </p>
      </div>`
  },
  {
    path: 'services',
    title: 'Datacenter Infrastructure & Sovereign Engineering Services | MIHORA.TECH',
    description: 'Comprehensive engineering services: physical datacenter infrastructure, server racks, cloud architectures, automation, and 24/7 reliability.',
    keywords: 'datacenter services, sovereign engineering services, server rack deployment, fiber optic certification, managed SRE, MIHORA services, M. Matti ul Hasnain, Omema Iqbal',
    heading: 'MIHORA.TECH — Datacenter Infrastructure & Sovereign Engineering Services',
    renderContent: () => `
      <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
        <div style="display: inline-block; background: rgba(30, 64, 175, 0.08); color: #1e40af; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; font-family: monospace; margin-bottom: 16px;">
          // SERVICE CAPABILITIES &bull; FULL-LIFECYCLE EXECUTION
        </div>
        <h1 style="font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px; text-transform: uppercase;">
          Engineering &amp; Infrastructure Services
        </h1>
        <p style="font-size: 18px; color: #334155; line-height: 1.6; margin: 0 0 32px;">
          Five core service divisions: Digital Systems Engineering, Physical Datacenter Deployment, Automation Pipelines, Field Engineering Rigs, and 24/7 Managed SRE.
        </p>

        ${buildFounderBanner()}
      </div>`
  },
  {
    path: 'solutions',
    title: 'Enterprise Sovereign Solutions & Reliability Frameworks | MIHORA.TECH',
    description: 'Tailored technology solutions for mission-critical operations, financial settlement rails, automated supply chains, and multi-cloud resilience.',
    keywords: 'enterprise solutions, sovereign architecture, mission-critical systems, MIHORA solutions, M. Matti ul Hasnain, Omema Iqbal',
    heading: 'MIHORA.TECH — Sovereign Solutions Architecture',
    renderContent: () => `
      <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
        <h1 style="font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px; text-transform: uppercase;">
          Enterprise Solutions &amp; Reliability Frameworks
        </h1>
        <p style="font-size: 18px; color: #334155; line-height: 1.6; margin: 0 0 32px;">
          Bespoke high-availability frameworks engineered for zero downtime, multi-region failover, sovereign data compliance, and high-throughput real-time telemetry.
        </p>
        ${buildFounderBanner()}
      </div>`
  },
  {
    path: 'industries',
    title: 'Industries & Mission-Critical Sectors | MIHORA.TECH',
    description: 'Sovereign systems engineered for financial institutions, telecommunications providers, energy grids, defense contractors, and enterprise logistics.',
    keywords: 'banking tech, telecom infrastructure, energy SCADA, healthcare HIPAA, logistics telemetry, MIHORA industries',
    heading: 'MIHORA.TECH — Mission-Critical Sector Solutions',
    renderContent: () => `
      <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
        <h1 style="font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px; text-transform: uppercase;">
          Mission-Critical Industry Sectors
        </h1>
        <p style="font-size: 18px; color: #334155; line-height: 1.6; margin: 0 0 32px;">
          Engineering high-security, high-availability digital and physical infrastructure for Banking, Telecommunications, Healthcare, Energy Utilities, and Supply Chain Logistics.
        </p>
        ${buildFounderBanner()}
      </div>`
  },
  {
    path: 'insights',
    title: 'Technical Insights & Engineering Dispatches | MIHORA.TECH',
    description: 'Architectural analysis, technical whitepapers, systems post-mortems, and field telemetries from MIHORA.TECH principal engineers.',
    keywords: 'technical whitepapers, systems research, fiber optics research, datacenter benchmarks, MIHORA insights, M. Matti ul Hasnain',
    heading: 'MIHORA.TECH — Technical Papers & Engineering Insights',
    renderContent: () => `
      <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
        <h1 style="font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px; text-transform: uppercase;">
          Technical Papers &amp; Engineering Dispatches
        </h1>
        <p style="font-size: 18px; color: #334155; line-height: 1.6; margin: 0 0 32px;">
          Peer-reviewed systems architectures, empirical optical loss benchmarks, zero-downtime database strategies, and field case studies authored by the MIHORA engineering cadre.
        </p>
        ${buildFounderBanner()}
      </div>`
  },
  {
    path: 'careers',
    title: 'Careers & Engineering Cadre | MIHORA.TECH — Founded by M. Matti ul Hasnain & Omema Iqbal',
    description: 'Join the MIHORA.TECH engineering cadre. Open positions across systems design, datacenter hardware, distributed systems, and site reliability.',
    keywords: 'engineering jobs, datacenter careers, systems architect, site reliability jobs Pakistan, MIHORA careers, M. Matti ul Hasnain, Omema Iqbal',
    heading: 'MIHORA.TECH — Engineering Cadre Careers',
    renderContent: () => `
      <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
        <h1 style="font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px; text-transform: uppercase;">
          Join the Engineering Cadre
        </h1>
        <p style="font-size: 18px; color: #334155; line-height: 1.6; margin: 0 0 32px;">
          We recruit uncompromising systems architects, hardware specialists, and site reliability engineers dedicated to sovereign, resilient technology infrastructure worldwide.
        </p>
        ${buildFounderBanner()}
        <p style="font-size: 15px; color: #334155;">Submit engineering credentials directly to: <a href="mailto:hr@mihora.tech" style="color: #1e40af; font-weight: 700;">hr@mihora.tech</a></p>
      </div>`
  },
  {
    path: 'contact',
    title: 'Contact & Command Hubs | MIHORA.TECH — London & Islamabad',
    description: 'Connect with MIHORA.TECH executive leadership and principal architects at our dual command centers in London (UK) and Islamabad (Pakistan).',
    keywords: 'contact MIHORA, MIHORA office London, MIHORA office Islamabad, emergency datacenter dispatch, M. Matti ul Hasnain, Omema Iqbal',
    heading: 'MIHORA.TECH — Global Command Hubs & Dispatch',
    renderContent: () => `
      <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
        <h1 style="font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px; text-transform: uppercase;">
          Command Hubs &amp; Direct Dispatch
        </h1>
        <p style="font-size: 18px; color: #334155; line-height: 1.6; margin: 0 0 32px;">
          Direct communication channels with MIHORA executive stewardship and engineering leadership across London (UK) and Islamabad (Pakistan).
        </p>
        ${buildFounderBanner()}
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 24px;">
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 24px;">
            <h3 style="font-size: 18px; font-weight: 800; color: #1e40af; margin: 0 0 8px;">London Command Center (UK)</h3>
            <p style="font-size: 14px; color: #334155; margin: 0 0 12px;">128 City Road, London EC2A 4NE, United Kingdom</p>
            <p style="font-size: 13px; color: #64748b; font-family: monospace;">EMEA Headquarters &bull; ISO Compliance &bull; UTC+0</p>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 24px;">
            <h3 style="font-size: 18px; font-weight: 800; color: #1e40af; margin: 0 0 8px;">Islamabad Systems Center (Pakistan)</h3>
            <p style="font-size: 14px; color: #334155; margin: 0 0 12px;">Blue Area, Islamabad 44000, Pakistan</p>
            <p style="font-size: 13px; color: #64748b; font-family: monospace;">Systems Labs &bull; 24/7 NOC Telemetry &bull; UTC+5</p>
          </div>
        </div>
      </div>`
  },
  {
    path: 'legal',
    title: 'Legal, Privacy & Compliance | MIHORA.TECH',
    description: 'MIHORA.TECH governance, sovereign compliance, data privacy, intellectual property disclosures, and security terms.',
    keywords: 'MIHORA legal, data sovereignty, ISO 27001, SOC 2, privacy policy, MIHORA terms',
    heading: 'MIHORA.TECH — Legal, Governance & Sovereign Compliance',
    renderContent: () => `
      <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
        <h1 style="font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px; text-transform: uppercase;">
          Legal Governance &amp; Sovereign Compliance
        </h1>
        <p style="font-size: 18px; color: #334155; line-height: 1.6; margin: 0 0 32px;">
          Corporate governance, ISO 27001 Information Security, SOC 2 Type II trust criteria, and strict client data sovereignty policies.
        </p>
        ${buildFounderBanner()}
      </div>`
  },
  {
    path: 'status',
    title: 'Live Infrastructure Telemetry & Status (99.999% SLA) | MIHORA.TECH',
    description: 'Real-time telemetry, 99.999% SLA uptime metrics, optical DWDM health, and NOC alert feeds across London and Islamabad hubs.',
    keywords: 'MIHORA status, system status, 99.999% SLA, datacenter telemetry, NOC monitoring, London Islamabad telemetry',
    heading: 'MIHORA.TECH — Infrastructure Mission Control & Telemetry',
    renderContent: () => `
      <div style="max-width: 1000px; margin: 0 auto; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.7;">
        <h1 style="font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1.15; margin: 0 0 16px; text-transform: uppercase;">
          Infrastructure Telemetry &amp; System Status
        </h1>
        <p style="font-size: 18px; color: #334155; line-height: 1.6; margin: 0 0 32px;">
          Continuous real-time observability across the UK (London) and Pakistan (Islamabad) command clusters. Verified 99.999% SLA uptime.
        </p>
        ${buildFounderBanner()}
        <div style="background: #0f172a; color: #f8fafc; border-radius: 12px; padding: 24px; font-family: monospace; font-size: 13px;">
          <div style="color: #10b981; font-weight: 700; margin-bottom: 12px;">&bull; ALL SYSTEMS OPERATIONAL // 0 CRITICAL ALERTS</div>
          <div>UK-LON-01 Quorum: ACTIVE (17.8ms ping)</div>
          <div>PK-ISB-01 Quorum: ACTIVE (18.2ms ping)</div>
          <div>Cross-Corridor Packet Loss: 0.00%</div>
        </div>
      </div>`
  }
];

routes.forEach((route) => {
  const targetDir = path.join(distDir, route.path);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const canonicalUrl = `https://mihora.tech/${route.path}/`;

  let pageHtml = templateHtml
    // Update title
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${route.title}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${route.title}" />`)
    // Update description
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${route.description}" />`)
    // Update keywords if provided
    .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${route.keywords || route.description}" />`)
    // Update canonical and OpenGraph URLs
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta name="twitter:url" content=".*?" \/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`);

  // Build full semantic prerender shell directly inside <div id="root">
  const fullPrerender = `
    <div id="prerender-shell" style="min-height: 100vh; display: flex; flex-direction: column; background: #ffffff;">
      ${buildHeader()}
      <main style="flex: 1;">
        ${route.renderContent()}
      </main>
      ${buildFooter()}
    </div>`;

  // Replace content of <div id="root">...</div> with the rich route prerender
  pageHtml = pageHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${fullPrerender}</div>`);

  const targetFilePath = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFilePath, pageHtml, 'utf8');
  console.log(`[generate-routes] Generated rich static entry: ${route.path}/index.html`);
});

// Ensure .nojekyll is present in dist
const distNoJekyll = path.join(distDir, '.nojekyll');
if (!fs.existsSync(distNoJekyll)) {
  fs.writeFileSync(distNoJekyll, '', 'utf8');
  console.log('[generate-routes] Created dist/.nojekyll');
}

// Ensure CNAME is present in dist
const distCNAME = path.join(distDir, 'CNAME');
if (!fs.existsSync(distCNAME)) {
  fs.writeFileSync(distCNAME, 'mihora.tech', 'utf8');
  console.log('[generate-routes] Verified dist/CNAME');
}

console.log('[generate-routes] Successfully generated all rich static route HTML files for GitHub Pages & search engine crawlers.');
