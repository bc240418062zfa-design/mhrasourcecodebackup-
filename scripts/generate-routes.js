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

const routes = [
  {
    path: 'engineering',
    title: 'Sovereign Engineering & Datacenter Infrastructure | MIHORA.TECH',
    description: 'Deep-stack sovereign engineering from physical datacenter infrastructure and fiber splicing to high-availability distributed microservices and SRE.',
    heading: 'MIHORA.TECH — Sovereign Engineering & Datacenter Infrastructure',
    summary: 'MIHORA.TECH delivers 9-layer full-span engineering: physical datacenter infrastructure, enterprise cabling, low-latency microservices, SCADA hardware, and 24/7 telemetry monitoring across London UK and Islamabad Pakistan command centers.'
  },
  {
    path: 'services',
    title: 'Datacenter Infrastructure & Sovereign Engineering Services | MIHORA.TECH',
    description: 'Comprehensive engineering services: physical datacenter infrastructure, server racks, cloud architectures, automation, and 24/7 reliability.',
    heading: 'MIHORA.TECH — Datacenter Infrastructure & Sovereign Engineering',
    summary: 'Our service divisions encompass Digital Systems Architecture, Physical Infrastructure & Data Center Splicing, Event-Driven Automation Pipelines, and Managed Reliability 24/7 SRE operations.'
  },
  {
    path: 'solutions',
    title: 'Enterprise Solutions & Reliability Frameworks | MIHORA.TECH',
    description: 'Tailored technology solutions for mission-critical operations, financial settlement rails, automated supply chains, and multi-cloud resilience.',
    heading: 'MIHORA.TECH — Sovereign Solutions Architecture',
    summary: 'Bespoke high-availability frameworks engineered for zero downtime, multi-region failover, sovereign data compliance, and high-throughput real-time telemetry.'
  },
  {
    path: 'industries',
    title: 'Industries & Mission-Critical Sectors | MIHORA.TECH',
    description: 'Sovereign systems engineered for financial institutions, telecommunications providers, energy grids, defense contractors, and enterprise logistics.',
    heading: 'MIHORA.TECH — Mission-Critical Sector Solutions',
    summary: 'Engineering high-security, high-availability digital and physical infrastructure for Banking, Telecommunications, Healthcare (HIPAA/HL7), Energy Utilities, and Supply Chain Logistics.'
  },
  {
    path: 'company',
    title: 'Company & Founders | MIHORA.TECH — Founded by M. Matti ul Hasnain & Omema Iqbal',
    description: 'Founded by M. Matti ul Hasnain and Omema Iqbal. Discover MIHORA.TECH engineering philosophy, dual UK & Pakistan command centers, and sovereign systems stewardship.',
    heading: 'MIHORA.TECH — Company, Philosophy & Executive Stewardship',
    summary: 'Founded by M. Matti ul Hasnain (Co-Founder & Principal Systems Architect) and Omema Iqbal (Co-Founder & Operations Director). Operating dual command hubs across London UK and Islamabad Pakistan.'
  },
  {
    path: 'insights',
    title: 'Technical Insights & Engineering Dispatches | MIHORA.TECH',
    description: 'Architectural analysis, technical whitepapers, systems post-mortems, and field telemetries from MIHORA.TECH principal engineers.',
    heading: 'MIHORA.TECH — Technical Papers & Engineering Insights',
    summary: 'Read authoritative engineering papers covering distributed systems, fiber optics dispersion mitigation, zero-downtime database migrations, and autonomous SCADA bridges.'
  },
  {
    path: 'careers',
    title: 'Careers & Engineering Cadre | MIHORA.TECH',
    description: 'Join the MIHORA.TECH engineering cadre. Open positions across systems design, datacenter hardware, distributed systems, and site reliability.',
    heading: 'MIHORA.TECH — Engineering Cadre Careers',
    summary: 'We recruit uncompromising systems architects, hardware specialists, and site reliability engineers dedicated to sovereign, resilient technology infrastructure worldwide.'
  },
  {
    path: 'contact',
    title: 'Contact & Command Hubs | MIHORA.TECH',
    description: 'Connect with MIHORA.TECH executive leadership and principal architects at our dual command centers in London (UK) and Islamabad (Pakistan).',
    heading: 'MIHORA.TECH — Global Command Hubs & Dispatch',
    summary: 'Direct dispatch: London Command Center (EC2A 4NE, UK) and Islamabad Command Center (Blue Area, Pakistan). Email: hr@mihora.tech or dispatch@mihora.tech.'
  },
  {
    path: 'legal',
    title: 'Legal, Privacy & Compliance | MIHORA.TECH',
    description: 'MIHORA.TECH governance, sovereign compliance, data privacy, intellectual property disclosures, and security terms.',
    heading: 'MIHORA.TECH — Legal, Governance & Sovereign Compliance',
    summary: 'Comprehensive legal documentation, data protection policies, SOC 2 / ISO 27001 compliance standards, and sovereign client governance.'
  },
  {
    path: 'docs',
    title: 'Technical Documentation & Systems Architecture Codex | MIHORA.TECH',
    description: 'Official engineering documentation, 9-layer sovereign stack specifications, fiber splicing standards, and dual-hub telemetry protocols of MIHORA.TECH.',
    heading: 'MIHORA.TECH — Technical Documentation & Architecture Codex',
    summary: 'Exhaustive systems specifications: 9-layer sovereign architecture, datacenter hardware topologies, core-alignment fusion fiber splicing (loss ≤ 0.05 dB), Cat6A shielded cable dressing, and London-Islamabad dual command heartbeat telemetry.'
  },
  {
    path: 'faq',
    title: 'Knowledge Base & Official FAQ | MIHORA.TECH — Founded by M. Matti ul Hasnain & Omema Iqbal',
    description: 'Definitive answers to frequently asked questions about MIHORA.TECH, founders M. Matti ul Hasnain & Omema Iqbal, dual UK-Pakistan command hubs, datacenter hardware, and services.',
    heading: 'MIHORA.TECH — Verified Entity Knowledge Base & FAQ',
    summary: 'Official answers regarding MIHORA.TECH: founded by M. Matti ul Hasnain and Omema Iqbal, operating dual command centers in London (UK) and Islamabad (Pakistan). Capabilities span digital systems engineering, physical server rack deployments, optical fiber, and 24/7 managed SRE.'
  },
  {
    path: 'status',
    title: 'Live Infrastructure Telemetry & Status | MIHORA.TECH',
    description: 'Real-time telemetry, 99.999% SLA uptime metrics, optical DWDM health, and NOC alert feeds across London and Islamabad hubs.',
    heading: 'MIHORA.TECH — Infrastructure Mission Control & Telemetry',
    summary: 'Live health status, PUE, network jitter, and incident logs across London (UK) and Islamabad (PK) command clusters.'
  }
];

routes.forEach((route) => {
  const targetDir = path.join(distDir, route.path);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const canonicalUrl = `https://mihora.tech/${route.path}`;

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
    // Update canonical and OpenGraph URLs
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta name="twitter:url" content=".*?" \/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`);

  // Inject route-specific pre-rendered noscript summary for instant bot crawling
  const noscriptSnippet = `
    <noscript>
      <div style="padding: 24px; font-family: sans-serif; max-width: 900px; margin: 0 auto; line-height: 1.6;">
        <h1>${route.heading}</h1>
        <p><strong>Founded by M. Matti ul Hasnain &amp; Omema Iqbal</strong></p>
        <p>${route.summary}</p>
        <p><a href="https://mihora.tech/">Return to MIHORA.TECH Home</a> | <a href="mailto:hr@mihora.tech">hr@mihora.tech</a></p>
      </div>
    </noscript>`;

  pageHtml = pageHtml.replace(/<noscript>[\s\S]*?<\/noscript>/, noscriptSnippet);

  const targetFilePath = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFilePath, pageHtml, 'utf8');
  console.log(`[generate-routes] Generated static entry: ${route.path}/index.html`);
});

// Ensure .nojekyll is present in dist
const distNoJekyll = path.join(distDir, '.nojekyll');
if (!fs.existsSync(distNoJekyll)) {
  fs.writeFileSync(distNoJekyll, '', 'utf8');
  console.log('[generate-routes] Created dist/.nojekyll');
}

console.log('[generate-routes] Successfully generated all static route HTML files for GitHub Pages.');
