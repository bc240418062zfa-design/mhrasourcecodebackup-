import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Terminal,
  Bot,
  Server,
  Wrench,
  Users,
  Mail,
  ArrowUpRight,
  Play,
  Sliders,
  HelpCircle,
  ShieldCheck,
  Calculator,
  Scale,
  BookMarked,
  Layers,
} from 'lucide-react';
import { playUiChime } from '../utils/audio';
import { VISUAL_ASSETS } from '../assets/visuals';
import {
  MaskTextReveal,
  Reveal,
  StaggerGrid,
  StaggerItem,
  AnimatedCounter,
  ParallaxFrame,
  SpotlightSurface,
  MagneticWrapper,
  InfiniteMarquee,
  Tilt3DFrame,
} from '../components/MotionPrimitives';

interface NodeInfo {
  code: string;
  title: string;
  desc: string;
  lat: string;
  lon: string;
  ping: number;
  hops: string[];
  role: string;
  cx: number;
  cy: number;
}

const nodeData: Record<string, NodeInfo> = {
  HQ: {
    code: 'Dual Core Hub · PK-ISB-01',
    title: 'Islamabad Systems Architecture Hub',
    desc: 'Core architectural authority, systems telemetry operations center, optical verification labs, and regional dispatch command.',
    lat: '33.6844° N',
    lon: '73.0479° E',
    ping: 18.2,
    hops: ['UK-LON-01 (Subsea + Terrestrial)', 'FRA-DE-02 (Optical IXP)', 'DXB-UAE-01 (Gulf Transit)', 'PK-ISB-01 (Command Hub)'],
    role: 'Core Architecture & Telemetry',
    cx: 590,
    cy: 235,
  },
  LON: {
    code: 'Dual Core Hub · UK-LON-01',
    title: 'London Engineering Hub',
    desc: 'EMEA operations headquarters at 128 City Road, European enterprise delivery, UK-GDPR / ISO compliance governance, and IXP peering.',
    lat: '51.5074° N',
    lon: '0.1278° W',
    ping: 17.8,
    hops: ['PK-ISB-01 (Trans-Continental Fiber)', 'MRS-FR-01 (Marseille Gateway)', 'LDN-UK-01 (City Road Core)'],
    role: 'EMEA Headquarters & Strategy',
    cx: 465,
    cy: 155,
  },
  DXB: {
    code: 'Regional Transit · GCC-UAE-DXB',
    title: 'Dubai Operations Corridor',
    desc: 'Middle Eastern infrastructure deployments, industrial surveillance logistics, and field engineering dispatch.',
    lat: '25.2048° N',
    lon: '55.2708° E',
    ping: 24.1,
    hops: ['PK-ISB-01 (Arabian Sea Optical Backbone)', 'DXB-UAE-01 (Gulf Transit)'],
    role: 'GCC Regional Dispatch',
    cx: 530,
    cy: 278,
  },
  SIN: {
    code: 'Optical Peering · APAC-SG-SIN',
    title: 'Singapore Cloud Bridge',
    desc: 'Asia-Pacific optical peering point, edge workload routing, and multi-region latency verification.',
    lat: '1.3521° N',
    lon: '103.8198° E',
    ping: 36.5,
    hops: ['PK-ISB-01 (Bay of Bengal Subsea)', 'SIN-SG1 (Peering Core)'],
    role: 'APAC Optical Peering',
    cx: 735,
    cy: 318,
  },
  NYC: {
    code: 'Gateway · NA-USA-NYC',
    title: 'New York Systems Terminal',
    desc: 'North American financial technology integrations, institutional ledger synchronization, and SLA coordination.',
    lat: '40.7128° N',
    lon: '74.0060° W',
    ping: 68.2,
    hops: ['UK-LON-01 (Transatlantic Path)', 'NYC-US-EAST (Terminal)'],
    role: 'North America Transit',
    cx: 235,
    cy: 185,
  },
  TYO: {
    code: 'Satellite Node · APAC-JP-TYO',
    title: 'Tokyo Edge Gateway',
    desc: 'Hardware telemetry ingestion, automated industrial vision pipelines, and robotics synchronization monitoring.',
    lat: '35.6762° N',
    lon: '139.6503° E',
    ping: 72.4,
    hops: ['SIN-SG-01 (Trans-Pacific Fiber)', 'TYO-IXP (Edge Terminal)'],
    role: 'Industrial Vision Satellite',
    cx: 825,
    cy: 195,
  },
};

const MESH_ARCS = [
  { id: 'lon-isb', d: 'M 465 155 Q 535 165 590 235', primary: true },
  { id: 'isb-dxb', d: 'M 590 235 Q 565 270 530 278', primary: false },
  { id: 'isb-sin', d: 'M 590 235 Q 675 245 735 318', primary: true },
  { id: 'lon-nyc', d: 'M 465 155 Q 350 118 235 185', primary: true },
  { id: 'sin-tyo', d: 'M 735 318 Q 795 270 825 195', primary: false },
  { id: 'dxb-lon', d: 'M 530 278 Q 475 230 465 155', primary: false },
];

const MARQUEE_SPECS = [
  { label: 'Core Quorum Availability', metric: '99.999% SLA' },
  { label: 'OS2 Fusion Splice Mean', metric: '≤ 0.03 dB' },
  { label: 'London — Islamabad Watchdesk', metric: '24/7/365' },
  { label: 'Field Emergency Dispatch', metric: '4h Regional SLA' },
  { label: 'Certified Optical Span', metric: '250,000+ m' },
  { label: 'Datacenter Design PUE', metric: '1.14 Ratio' },
  { label: 'Cryptographic Custody', metric: '100% Client IP' },
  { label: 'Security Alignment', metric: 'ISO 27001 / UK-GDPR' },
];

const SCROLL_STAGES = [
  {
    id: 'stage-01',
    num: '01',
    kicker: 'Layer 1–3 · Physical Terrain',
    title: 'Precision Server Halls, Seismically Braced Racks & Clean Power',
    body: 'Before a single microservice spins up, MIHORA builds verified bare-metal estates: hot/cold aisle thermal containment at 1.14 design PUE, dual 2N ATS busbars, and redundant out-of-band console planes.',
    spec: 'Tier III / IV 42U–48U Racks · 2N Redundant Power',
    image: VISUAL_ASSETS.heroDatacenterHall,
    alt: 'Sovereign enterprise datacenter aisle engineered by MIHORA.TECH',
    link: '/services/physical-infrastructure',
    linkLabel: 'Physical Infrastructure Spec',
  },
  {
    id: 'stage-02',
    num: '02',
    kicker: 'Layer 4 · Optical Transport & Field Calibration',
    title: 'Core-Alignment OS2 Fusion Splicing & Signed OTDR Traces',
    body: 'Eliminating silent packet retransmits at the photon level. Certified field engineers execute bidirectional EXFO OTDR sweeps and Fujikura core-alignment splicing targeting <= 0.03 dB loss per joint.',
    spec: 'TIA-568-D Certified · <= 0.03 dB Mean Splice Loss',
    image: VISUAL_ASSETS.opticalLabSplicing,
    alt: 'Core-alignment single-mode optical fiber fusion splicing verification bench',
    link: '/services/field-engineering',
    linkLabel: 'Field Engineering Rigs',
  },
  {
    id: 'stage-03',
    num: '03',
    kicker: 'Layer 5–7 · Zero-Trust Cryptographic Containment',
    title: 'Client-Owned HSM Keys, Optical Diodes & Private Inference',
    body: 'Measured TPM 2.0 kernel attestation meets air-gapped industrial SCADA diodes and zero-egress on-premise inference. Every key and Terraform manifest remains strictly inside client custody.',
    spec: 'FIPS 140-3 HSM · mTLS v1.3 · ISO 27001 Governance',
    image: VISUAL_ASSETS.securityHsmVault,
    alt: 'Hardened zero-trust hardware security module server aisle',
    link: '/security',
    linkLabel: 'Security & Trust Center',
  },
  {
    id: 'stage-04',
    num: '04',
    kicker: 'Layer 8–9 · Dual-Hub Continuous Custody',
    title: 'Follow-the-Sun Watchdesks in London (UTC+0) & Islamabad (UTC+5)',
    body: 'High-concurrency Go/TypeScript consensus systems monitored continuously across two synchronized daytime hubs—delivering sub-15-minute P1 containment and zero overnight handoff blindspots.',
    spec: 'London City Road + Islamabad Blue Area Synchrony',
    image: VISUAL_ASSETS.londonCommandStudio,
    alt: 'London systems engineering watchdesk overseeing distributed telemetry',
    link: '/services/managed-sre',
    linkLabel: '24/7 Managed SRE Spec',
  },
];

const serviceTabs = [
  {
    slug: 'digital-engineering',
    tag: 'Division 01 · Digital Engineering',
    shortTitle: 'Digital Systems',
    sub: 'Sovereign Software Platforms',
    headline: 'Full-Lifecycle Digital Engineering',
    body: 'We architect, construct, and harden sovereign software platforms, distributed Go and TypeScript backends, native applications, and zero-trust API meshes built for high concurrent throughput.',
    points: [
      { k: 'Core Build', v: 'Custom enterprise web, SaaS & native systems' },
      { k: 'Data Layer', v: 'Partitioned PostgreSQL, Kafka & mTLS v1.3 meshes' },
      { k: 'Integrations', v: 'Idempotent ERP, payment rail & legacy bridges' },
      { k: 'Source Ownership', v: 'Full Git repository, IaC & zero vendor lock-in' },
    ],
    bar1: '96%',
    bar2: '100%',
  },
  {
    slug: 'automation-intelligence',
    tag: 'Division 02 · Automation & AI',
    shortTitle: 'Automation & AI',
    sub: 'Deterministic Intelligence',
    headline: 'Automation & Applied Intelligence',
    body: 'Eliminating manual operational friction through idempotent Kafka/Temporal workflows, optically isolated industrial SCADA bridges, real-time OCR pipelines, and air-gapped on-premise inference.',
    points: [
      { k: 'Event Orchestration', v: 'Deterministic workflow engines & SCADA bridges' },
      { k: 'Document Parsing', v: 'High-throughput OCR & classification pipelines' },
      { k: 'Self-Healing State', v: 'Automated incident routing & state replay queues' },
      { k: 'Private Inference', v: 'Air-gapped on-premise LLM & anomaly scoring' },
    ],
    bar1: '98%',
    bar2: '94%',
  },
  {
    slug: 'physical-infrastructure',
    tag: 'Division 03 · Infrastructure',
    shortTitle: 'Datacenters & Optics',
    sub: 'Tier III / IV Physical Topologies',
    headline: 'Datacenter Racks & Optical Backbones',
    body: 'Seismically braced 42U/48U server racks, single-mode OS2 optical fiber splicing, NVMe SAN clusters, and 2N ATS power distribution engineered for uninterrupted enterprise custody.',
    points: [
      { k: 'Cabinetry & Power', v: 'Server racks, smart PDUs & hot-aisle containment' },
      { k: 'Optical Plant', v: 'Core-alignment single-mode & OM4 splicing' },
      { k: 'Switching Fabric', v: 'EVPN-VXLAN spine-leaf & multi-carrier BGP' },
      { k: 'Redundancy', v: '2N dual-rail UPS power & isolated out-of-band' },
    ],
    bar1: '100%',
    bar2: '99%',
  },
  {
    slug: 'field-engineering',
    tag: 'Division 04 · Field Engineering',
    shortTitle: 'Field Dispatch',
    sub: 'Tactical On-Site Rigs',
    headline: 'Tactical Field Engineering & 4h Dispatch',
    body: 'When software cannot solder a circuit or splice cut glass, certified MIHORA field teams deploy directly on-site with calibrated fusion splicers, Fluke DSX-8000 certifiers, and spare hardware.',
    points: [
      { k: 'Rapid Dispatch', v: '4-hour emergency on-site break-fix dispatch SLA' },
      { k: 'Edge Security', v: 'NDAA enterprise IP CCTV, NVR & biometric access' },
      { k: 'Structured Cabling', v: 'Shielded Cat6A copper & armored optical runs' },
      { k: 'Certification', v: 'Bidirectional OTDR traces & RF spectrum sweeps' },
    ],
    bar1: '93%',
    bar2: '97%',
  },
  {
    slug: 'managed-sre',
    tag: 'Division 05 · Managed SRE',
    shortTitle: '24/7 Managed SRE',
    sub: 'Dual-Hub Continuous Oversight',
    headline: 'Managed Technology & 24/7 SRE',
    body: 'Around-the-clock systems monitoring across our synchronized London (UTC+0) and Islamabad (UTC+5) watchdesks, tracking optical attenuation, server thermals, and microservice tail latency.',
    points: [
      { k: 'Watchdesk Custody', v: '24/7/365 Network & Security Operations oversight' },
      { k: 'Zero-Downtime Ops', v: 'CVE firmware & kernel patching with canary verification' },
      { k: 'Full-Span Telemetry', v: 'Layer 1 optical signals through Layer 9 API traces' },
      { k: 'Incident Containment', v: 'Quarterly DR chaos drills & <15m P1 containment' },
    ],
    bar1: '99%',
    bar2: '98%',
  },
];

export default function Home() {
  const [activeNodeId, setActiveNodeId] = useState('HQ');
  const activeNode = nodeData[activeNodeId] || nodeData.HQ;

  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const activeService = serviceTabs[activeServiceIdx];

  const [activeScrollStage, setActiveScrollStage] = useState(0);
  const [expandedStack, setExpandedStack] = useState<number | null>(9);

  const [activeHubView, setActiveHubView] = useState<'LON' | 'ISB'>('LON');
  const corridorRtt = activeHubView === 'LON' ? '17.8' : '18.2';

  const [isTracing, setIsTracing] = useState(false);
  const [traceStep, setTraceStep] = useState(0);

  const [configDomain, setConfigDomain] = useState<'software' | 'hardware' | 'ai' | 'field'>('software');
  const [configRegion, setConfigRegion] = useState<'uk' | 'pak' | 'gcc' | 'global'>('global');
  const [configSla, setConfigSla] = useState<'emergency' | 'noc' | 'cluster'>('cluster');

  const handleSelectNode = (nodeId: string) => {
    playUiChime('click');
    setActiveNodeId(nodeId);
    runFiberTrace();
  };

  const runFiberTrace = () => {
    setIsTracing(true);
    setTraceStep(1);
    playUiChime('ping');

    setTimeout(() => setTraceStep(2), 340);
    setTimeout(() => setTraceStep(3), 680);
    setTimeout(() => {
      setTraceStep(4);
      setIsTracing(false);
      playUiChime('success');
    }, 1020);
  };

  const toggleStack = (index: number) => {
    playUiChime('click');
    setExpandedStack((prev) => (prev === index ? null : index));
  };

  const getConfigDetails = () => {
    let latency = '< 18.5 ms Cross-Hub';
    let uptime = '99.999% Dual-Hub Quorum';
    let stack = 'TypeScript · React 19 · Go 1.23 · PostgreSQL · WireGuard Mesh';
    let turnaround = 'Continuous SRE & Sprint Alignment';

    if (configDomain === 'hardware') {
      stack = 'Arista EVPN-VXLAN · OS2 Single-Mode Fiber · NVMe SAN · 2N ATS Power';
      latency = '< 0.4 ms LAN Fabric';
      turnaround = 'Signed OTDR & Rack Commissioning';
    } else if (configDomain === 'ai') {
      stack = 'Apache Kafka · Temporal · Private On-Prem GPU · Modbus SCADA Bridge';
      latency = '< 15 ms Event Dispatch';
      turnaround = 'Air-Gapped Sovereign Containment';
    } else if (configDomain === 'field') {
      stack = 'Fluke DSX-8000 · Fujikura 90S+ · EXFO OTDR · Field Dispatch Fleet';
      latency = '4-Hour Regional SLA';
      turnaround = 'Emergency Break-Fix & Termination';
    }

    if (configRegion === 'uk') {
      uptime = '99.999% (London Command Corridor)';
    } else if (configRegion === 'pak') {
      uptime = '99.999% (Islamabad Core Hub)';
    } else if (configRegion === 'gcc') {
      uptime = '99.995% (GCC Optical Transit)';
    }

    return { latency, uptime, stack, turnaround };
  };

  const configSpecs = getConfigDetails();

  return (
    <div className="flex flex-col w-full">
      {/* 01. LUMINOUS OBSIDIAN SOVEREIGN ATELIER HERO */}
      <section className="relative w-full min-h-[84vh] flex flex-col justify-between overflow-hidden obsidian-band obsidian-grid hero-ambient-mesh border-b border-white/10">
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 lg:pt-20 lg:pb-16 flex-1 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
            {/* Left Typographic Hero Hierarchy */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="font-mono text-xs uppercase tracking-[0.22em] text-amber-400 font-semibold">
                  MIHORA.TECH &middot; M. Matti ul Hasnain &amp; Omema Iqbal
                </div>
              </Reveal>

              <MaskTextReveal delay={0.04}>
                <h1 className="font-headline font-extrabold text-[clamp(2.35rem,4.6vw,4.25rem)] text-white tracking-[-0.03em] leading-[1.05]">
                  Sovereign Engineering From Physical Glass to Distributed Cloud
                </h1>
              </MaskTextReveal>

              <Reveal delay={0.12}>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                  Operating synchronized command hubs in{' '}
                  <strong className="text-white font-semibold">London (United Kingdom)</strong> and{' '}
                  <strong className="text-white font-semibold">Islamabad (Pakistan)</strong>. One accountable team architecting custom software, OTDR-verified optical fiber networks, bare-metal datacenters, and 24/7 operational custody.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <MagneticWrapper>
                    <Link
                      to="/contact"
                      onClick={() => playUiChime('click')}
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 btn-primary-gradient font-semibold rounded-xl text-sm cursor-pointer"
                    >
                      <span>Schedule Architecture Review</span>
                      <ArrowRight size={16} />
                    </Link>
                  </MagneticWrapper>

                  <Link
                    to="/engineering"
                    onClick={() => playUiChime('click')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-white font-semibold rounded-xl text-sm backdrop-blur-md transition-all cursor-pointer"
                  >
                    <span>Explore 9-Layer Stack</span>
                    <ArrowUpRight size={15} className="text-amber-400" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Framed Studio Showcase Visual + Architectural Ledger */}
            <div className="lg:col-span-5">
              <Reveal direction="left" delay={0.14}>
                <Tilt3DFrame maxTilt={3.5}>
                  <div className="luxury-bezel rounded-2xl overflow-hidden bg-[#080d18]">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={VISUAL_ASSETS.heroDatacenterHall}
                        alt="MIHORA.TECH sovereign enterprise server hall and optical fiber rack infrastructure"
                        className="w-full h-full object-cover brightness-110 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080d18] via-[#080d18]/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 font-mono text-[11px]">
                        <span className="text-amber-400 font-semibold uppercase tracking-wider">
                          UK-LON-01 &harr; PK-ISB-01
                        </span>
                        <span className="text-slate-200 font-semibold tabular-nums">
                          18.2 ms Optical Backbone
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-4 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-400 font-bold">
                          Single-Contract Span
                        </span>
                        <Link
                          to="/our-story"
                          className="font-mono text-xs text-blue-400 hover:text-white inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Our Story</span>
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>

                      <dl className="divide-y divide-white/10 text-xs font-mono">
                        <div className="py-2 flex items-center justify-between gap-4">
                          <dt className="text-slate-400">Architecture Scope</dt>
                          <dd className="text-white font-semibold">Layers L01–L09 Unified</dd>
                        </div>
                        <div className="py-2 flex items-center justify-between gap-4">
                          <dt className="text-slate-400">Optical Certification</dt>
                          <dd className="text-emerald-400 font-semibold tabular-nums">&le; 0.03 dB Splice Mean</dd>
                        </div>
                        <div className="py-2 flex items-center justify-between gap-4">
                          <dt className="text-slate-400">Cryptographic Custody</dt>
                          <dd className="text-white font-semibold">Client-Owned FIPS 140-3 HSM</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Tilt3DFrame>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Bottom 4-Column Hairline Proof Telemetry Dock */}
        <div className="relative z-10 w-full border-t border-white/12 bg-[#04060c]/85 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/12">
            <div className="px-6 py-4 flex flex-col justify-between gap-1.5">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-slate-400">
                <span>Watchdesk Corridor</span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveHubView(activeHubView === 'LON' ? 'ISB' : 'LON');
                    playUiChime('switch');
                  }}
                  className="text-amber-400 font-bold hover:underline cursor-pointer"
                >
                  Switch Hub
                </button>
              </div>
              <div className="font-headline text-base sm:text-lg font-extrabold text-white">
                {activeHubView === 'LON' ? 'UK-LON-01 · London' : 'PK-ISB-01 · Islamabad'}
              </div>
              <div className="font-mono text-xs text-slate-400">
                Corridor RTT: <span className="text-white font-bold tabular-nums">{corridorRtt} ms</span>
              </div>
            </div>

            <Link to="/status" className="px-6 py-4 flex flex-col justify-between gap-1.5 hover:bg-white/[0.04] transition-colors cursor-pointer">
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                Quorum Availability
              </div>
              <div className="font-headline text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                <AnimatedCounter target={99.999} decimals={3} suffix="%" />
              </div>
              <div className="font-mono text-xs text-emerald-400">Synchronized Dual-Hub SRE</div>
            </Link>

            <Link to="/case-studies" className="px-6 py-4 flex flex-col justify-between gap-1.5 hover:bg-white/[0.04] transition-colors cursor-pointer">
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                Certified Fiber Span
              </div>
              <div className="font-headline text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                <AnimatedCounter target={250000} suffix="+ m" />
              </div>
              <div className="font-mono text-xs text-slate-400">EXFO Bidirectional OTDR</div>
            </Link>

            <Link to="/tools" className="px-6 py-4 flex flex-col justify-between gap-1.5 hover:bg-white/[0.04] transition-colors cursor-pointer">
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                Mean Splice Loss
              </div>
              <div className="font-headline text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums">
                &le; 0.03 dB
              </div>
              <div className="font-mono text-xs text-slate-400">TIA-568-D Exceedance Spec</div>
            </Link>
          </div>
        </div>
      </section>

      {/* 02. CONTINUOUS ARCHITECTURAL STANDARDS MARQUEE */}
      <InfiniteMarquee items={MARQUEE_SPECS} />

      {/* 03. EDITORIAL ASYMMETRIC GALLERY: PHYSICAL-TO-CLOUD CUSTODY (IVORY GROUND) */}
      <section className="w-full bg-surface py-20 lg:py-28 border-b border-outline/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-3">
              <Reveal>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
                  Architectural Exhibition
                </div>
              </Reveal>
              <MaskTextReveal>
                <h2 className="font-headline text-3xl sm:text-5xl text-on-surface font-extrabold tracking-tight leading-[1.08]">
                  Two Hemispheres. One Verifiable Chain of Custody.
                </h2>
              </MaskTextReveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="text-base text-on-surface-variant leading-relaxed">
                  Software agencies ignore thermal limits and fiber splice quality. Field cabling subcontractors ignore consensus protocols and zero-trust cryptography. MIHORA bridges both worlds inside one accountable studio.
                </p>
              </Reveal>
            </div>
          </div>

          {/* 3D Interactive Asymmetric Photography Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <Tilt3DFrame maxTilt={4}>
                <div className="rounded-2xl overflow-hidden border border-outline/20 shadow-2xl bg-surface-container-lowest">
                  <ParallaxFrame offset={26} className="aspect-[16/10] w-full">
                    <img
                      src={VISUAL_ASSETS.sovereignCommandHub}
                      alt="MIHORA.TECH global network operations watchdesk overlooking live optical telemetry"
                      className="w-full h-full object-cover"
                    />
                  </ParallaxFrame>
                </div>
              </Tilt3DFrame>

              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-outline/15 border-y border-outline/15 py-5">
                <div className="pr-0 sm:pr-6 pb-4 sm:pb-0 space-y-1">
                  <div className="font-mono text-xs font-bold text-primary uppercase">
                    Logical Architecture · L01–L05
                  </div>
                  <h3 className="font-headline text-lg font-bold text-on-surface">
                    Distributed Go, Rust &amp; React Systems
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Zero-trust API meshes, Kafka streams, partitioned PostgreSQL, and sovereign private inference with full source transfer.
                  </p>
                </div>
                <div className="pt-4 sm:pt-0 sm:pl-6 space-y-1">
                  <div className="font-mono text-xs font-bold text-gold uppercase">
                    Physical Execution · L06–L09
                  </div>
                  <h3 className="font-headline text-lg font-bold text-on-surface">
                    Tier III/IV Racks &amp; Core-Alignment Glass
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    2N redundant power distribution, cold-aisle containment at 1.14 PUE, and EXFO OTDR-verified single-mode optical fiber.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <Tilt3DFrame maxTilt={4}>
                <div className="rounded-2xl overflow-hidden border border-outline/20 shadow-2xl bg-surface-container-lowest">
                  <ParallaxFrame offset={20} className="aspect-[4/4.2] w-full">
                    <img
                      src={VISUAL_ASSETS.fieldEngineeringEdge}
                      alt="Ruggedized industrial SCADA and NEMA field edge compute assembly"
                      className="w-full h-full object-cover"
                    />
                  </ParallaxFrame>
                </div>
              </Tilt3DFrame>

              <div className="flex items-center justify-between pt-2 border-t border-outline/15">
                <div className="font-mono text-xs text-on-surface-variant">
                  <span className="text-on-surface font-bold">1,200+ Production Racks</span> · 4h Regional Field SLA
                </div>
                <Link
                  to="/services"
                  onClick={() => playUiChime('click')}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-primary hover:underline"
                >
                  <span>Explore 5 Divisions</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. DEEP OBSIDIAN STICKY SCROLLYTELLING SPINE */}
      <section className="w-full obsidian-band obsidian-grid py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
              Four-Stage Sovereign Spine
            </span>
            <MaskTextReveal>
              <h2 className="font-headline text-3xl sm:text-5xl text-white font-extrabold tracking-tight leading-tight">
                From Physical Silicon to Continuous Operational Custody
              </h2>
            </MaskTextReveal>
            <p className="text-base text-slate-300 leading-relaxed">
              Step through each physical and logical layer MIHORA unifies inside a single engineering chain.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Interactive Hairline Chapters */}
            <div className="lg:col-span-6 divide-y divide-white/12 border-y border-white/12">
              {SCROLL_STAGES.map((stage, idx) => {
                const isActive = activeScrollStage === idx;
                return (
                  <motion.div
                    key={stage.id}
                    onViewportEnter={() => setActiveScrollStage(idx)}
                    viewport={{ amount: 0.55 }}
                    onClick={() => {
                      setActiveScrollStage(idx);
                      playUiChime('click');
                    }}
                    className={clsx(
                      'py-7 px-6 transition-all cursor-pointer space-y-3 rounded-xl border',
                      isActive
                        ? 'bg-white/[0.06] border-amber-400/40 opacity-100 shadow-lg'
                        : 'border-transparent opacity-60 hover:opacity-90'
                    )}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className={clsx('font-bold', isActive ? 'text-amber-400' : 'text-blue-400')}>
                        {stage.kicker}
                      </span>
                      <span
                        className={clsx(
                          'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border transition-colors',
                          isActive
                            ? 'border-amber-400 bg-amber-400/15 text-amber-300'
                            : 'border-white/15 text-slate-400'
                        )}
                      >
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="font-headline text-xl sm:text-2xl font-bold text-white leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{stage.body}</p>
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10">
                      <span className="font-mono text-[11px] font-semibold text-slate-300">
                        {stage.spec}
                      </span>
                      <Link
                        to={stage.link}
                        className="text-xs font-semibold text-amber-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>{stage.linkLabel}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Sticky Obsidian Photographic Viewport */}
            <div className="lg:col-span-6 lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#090d18] shadow-2xl">
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={SCROLL_STAGES[activeScrollStage].image}
                      src={SCROLL_STAGES[activeScrollStage].image}
                      alt={SCROLL_STAGES[activeScrollStage].alt}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090d18] to-transparent" />
                </div>

                <div className="p-6 space-y-2 border-t border-white/10 bg-[#090d18]">
                  <div className="flex items-center justify-between font-mono text-xs text-amber-400 font-bold">
                    <span>{SCROLL_STAGES[activeScrollStage].kicker}</span>
                    <span>Stage {SCROLL_STAGES[activeScrollStage].num} / 04</span>
                  </div>
                  <div className="font-headline text-lg font-bold text-white">
                    {SCROLL_STAGES[activeScrollStage].title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. UPGRADED GLOBAL OPTICAL MESH WITH CURVED BEZIER ARCS (OBSIDIAN BAND) */}
      <section className="w-full bg-[#04070e] text-slate-100 py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                Live Intercontinental Optical Mesh
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
                Global Telemetry Mesh &amp; Packet Route Tracer
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              {Object.keys(nodeData).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelectNode(id)}
                  className={clsx(
                    'px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-bold',
                    activeNodeId === id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-white/[0.04] text-slate-300 hover:text-white border-white/15'
                  )}
                >
                  {id}
                </button>
              ))}

              <button
                type="button"
                onClick={() => runFiberTrace()}
                disabled={isTracing}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/40 font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-1"
              >
                <Play size={12} className={isTracing ? 'animate-spin' : ''} />
                <span>{isTracing ? 'Tracing...' : 'Trace Route'}</span>
              </button>
            </div>
          </div>

          <Reveal>
            <div className="relative w-full h-[400px] md:h-[490px] bg-[#080d1a] obsidian-grid rounded-2xl overflow-hidden flex items-center justify-center border border-white/15 shadow-2xl">
              <svg className="w-full h-full relative z-10" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 500">
                <defs>
                  <linearGradient id="arcPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Stylized Geometric Continental Silhouette Grid Layer */}
                <g fill="rgba(30, 58, 138, 0.16)" stroke="rgba(96, 165, 250, 0.22)" strokeWidth="1" strokeLinejoin="round">
                  {/* North America */}
                  <path d="M 95 105 L 220 95 L 295 135 L 265 180 L 238 205 L 195 238 L 165 232 L 132 195 L 105 152 Z" />
                  {/* South America */}
                  <path d="M 218 258 L 285 268 L 315 322 L 282 405 L 246 425 L 228 360 L 210 295 Z" />
                  {/* UK & Western/Northern Europe */}
                  <path d="M 438 110 L 502 92 L 548 115 L 540 165 L 495 182 L 452 178 L 442 152 Z" />
                  {/* Africa */}
                  <path d="M 442 205 L 522 208 L 545 255 L 528 340 L 490 385 L 456 325 L 428 265 Z" />
                  {/* Middle East & South Asia Corridor */}
                  <path d="M 526 196 L 605 188 L 635 235 L 608 282 L 568 272 L 535 282 L 515 240 Z" />
                  {/* Eurasia, Central Asia & East Asia */}
                  <path d="M 548 112 L 735 95 L 840 128 L 812 185 L 748 228 L 652 248 L 608 192 Z" />
                  {/* Japan Arch */}
                  <path d="M 815 170 L 842 185 L 832 212 L 806 202 Z" />
                  {/* Maritime SE Asia & Singapore Corridor */}
                  <path d="M 702 275 L 758 292 L 752 332 L 705 325 Z" />
                  {/* Oceania */}
                  <path d="M 768 355 L 858 358 L 866 418 L 780 422 L 762 385 Z" />
                </g>

                {/* Faint latitude / longitude graticules */}
                <g stroke="rgba(255,255,255,0.045)" strokeWidth="1" fill="none">
                  <line x1="0" y1="125" x2="1000" y2="125" />
                  <line x1="0" y1="250" x2="1000" y2="250" />
                  <line x1="0" y1="375" x2="1000" y2="375" />
                  <line x1="250" y1="0" x2="250" y2="500" />
                  <line x1="500" y1="0" x2="500" y2="500" />
                  <line x1="750" y1="0" x2="750" y2="500" />
                </g>

                {/* Curved Great-Circle Optical Paths */}
                {MESH_ARCS.map((arc) => (
                  <g key={arc.id}>
                    <path
                      d={arc.d}
                      fill="none"
                      stroke="rgba(148, 163, 184, 0.2)"
                      strokeWidth="1.5"
                    />
                    <path
                      d={arc.d}
                      fill="none"
                      stroke={arc.primary ? 'url(#arcPrimaryGrad)' : '#38bdf8'}
                      strokeWidth={arc.primary ? 2.4 : 1.75}
                      className={arc.primary ? 'flow-line' : 'flow-line-reverse'}
                    />
                  </g>
                ))}

                {/* Interactive Optical Nodes */}
                {Object.entries(nodeData).map(([id, node]) => {
                  const isSelected = activeNodeId === id;
                  const isDualCore = id === 'LON' || id === 'HQ';
                  return (
                    <g
                      key={id}
                      className="cursor-pointer"
                      onClick={() => handleSelectNode(id)}
                    >
                      {isSelected && (
                        <>
                          <circle
                            cx={node.cx}
                            cy={node.cy}
                            r="20"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="1.25"
                            opacity="0.7"
                          />
                          <circle
                            cx={node.cx}
                            cy={node.cy}
                            r="28"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="1"
                            opacity="0.35"
                          />
                        </>
                      )}
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={isDualCore ? 9 : 6.5}
                        fill={isSelected ? '#f59e0b' : isDualCore ? '#3b82f6' : '#38bdf8'}
                      />
                      <circle cx={node.cx} cy={node.cy} r={isDualCore ? 3.5 : 2.5} fill="#ffffff" />

                      {id === 'LON' && (
                        <>
                          <text fill="#f8fafc" fontFamily="JetBrains Mono" fontSize="11.5" fontWeight="700" x="352" y="132">
                            UK HUB: LONDON
                          </text>
                          <text fill="#94a3b8" fontFamily="JetBrains Mono" fontSize="9" x="352" y="144">
                            51.5074° N, 0.1278° W
                          </text>
                        </>
                      )}
                      {id === 'HQ' && (
                        <>
                          <text fill="#f8fafc" fontFamily="JetBrains Mono" fontSize="11.5" fontWeight="700" x="608" y="232">
                            PK HUB: ISLAMABAD
                          </text>
                          <text fill="#94a3b8" fontFamily="JetBrains Mono" fontSize="9" x="608" y="244">
                            33.6844° N, 73.0479° E
                          </text>
                        </>
                      )}
                      {id === 'DXB' && (
                        <text fill="#cbd5e1" fontFamily="JetBrains Mono" fontSize="10" x="455" y="302">
                          DUBAI (GCC)
                        </text>
                      )}
                      {id === 'SIN' && (
                        <text fill="#cbd5e1" fontFamily="JetBrains Mono" fontSize="10" x="748" y="324">
                          SINGAPORE (APAC)
                        </text>
                      )}
                      {id === 'NYC' && (
                        <text fill="#cbd5e1" fontFamily="JetBrains Mono" fontSize="10" x="148" y="176">
                          NEW YORK (NA)
                        </text>
                      )}
                      {id === 'TYO' && (
                        <text fill="#cbd5e1" fontFamily="JetBrains Mono" fontSize="10" x="838" y="200">
                          TOKYO (JP)
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNodeId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[27rem] bg-[#060912]/92 backdrop-blur-xl p-5 rounded-xl border border-white/15 shadow-2xl"
                >
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-mono text-xs text-amber-400 font-semibold">{activeNode.code}</span>
                    <span className="font-mono text-xs font-bold text-white tabular-nums">{activeNode.ping} ms</span>
                  </div>
                  <div className="font-headline text-base text-white font-bold">{activeNode.title}</div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeNode.desc}</p>
                  <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] font-mono text-slate-300">
                    {activeNode.hops.join(' → ')}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {isTracing && (
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-amber-400/35 font-mono text-xs flex items-center justify-between">
              <span className="text-amber-400 font-semibold">
                Executing optical trace to {activeNodeId} ({activeNode.title})...
              </span>
              <span className="text-slate-300 tabular-nums">Hop {traceStep} / 4</span>
            </div>
          )}
        </div>
      </section>

      {/* 06. EXECUTIVE FOUNDERS & DUAL-HUB STEWARDSHIP (EDITORIAL IVORY SPREAD) */}
      <section className="w-full bg-surface py-20 lg:py-28 border-b border-outline/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
                <Users size={14} />
                <span>Founding Leadership</span>
              </div>
              <MaskTextReveal>
                <h2 className="font-headline text-3xl sm:text-5xl text-on-surface font-extrabold tracking-tight">
                  Co-Founded by M. Matti ul Hasnain &amp; Omema Iqbal
                </h2>
              </MaskTextReveal>
              <p className="text-base text-on-surface-variant leading-relaxed">
                Uniting low-level physical infrastructure craft and distributed cloud architecture under synchronized governance between London and Islamabad.
              </p>
            </div>

            <div className="flex items-center gap-5 shrink-0 font-mono text-xs">
              <Link
                to="/company"
                onClick={() => playUiChime('click')}
                className="font-bold text-primary hover:underline inline-flex items-center gap-1.5"
              >
                <span>Executive Bios</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/our-story"
                onClick={() => playUiChime('click')}
                className="font-bold text-on-surface-variant hover:text-on-surface"
              >
                Our Story →
              </Link>
              <Link
                to="/press"
                onClick={() => playUiChime('click')}
                className="font-bold text-on-surface-variant hover:text-on-surface"
              >
                Press Kit →
              </Link>
            </div>
          </div>

          <StaggerGrid className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl overflow-hidden h-full flex flex-col justify-between">
                <div className="h-36 w-full overflow-hidden relative border-b border-outline/15">
                  <img
                    src={VISUAL_ASSETS.islamabadEngineeringHub}
                    alt="MIHORA Islamabad Blue Area core architecture hub"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute bottom-3 left-6 font-mono text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                    PK-ISB-01 · Core Systems Authority
                  </div>
                </div>

                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-5">
                    <div className="flex items-center gap-5">
                      <img
                        src="/founder-matti.jpg"
                        alt="M. Matti ul Hasnain, Co-Founder and Principal Systems Architect at MIHORA.TECH"
                        width={84}
                        height={84}
                        loading="lazy"
                        className="w-20 h-20 rounded-xl object-cover border border-outline/25 shrink-0"
                      />
                      <div>
                        <div className="font-mono text-xs text-primary font-bold">
                          Co-Founder &amp; Principal Systems Architect
                        </div>
                        <h3 className="font-headline text-2xl font-extrabold text-on-surface mt-0.5">
                          M. Matti ul Hasnain
                        </h3>
                        <div className="font-mono text-xs text-on-surface-variant mt-0.5">
                          Systems &amp; Optical Architecture · UK &amp; PK Hubs
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-sm sm:text-base text-on-surface leading-relaxed relative pt-1">
                      <span className="font-headline text-2xl font-extrabold text-gold leading-none mr-1.5" aria-hidden="true">
                        &ldquo;
                      </span>
                      <span className="italic">
                        We founded MIHORA to eliminate the brittle gap between abstract software code and physical reality. We architect sovereign backends, and our engineers splice and certify the optical plant.&rdquo;
                      </span>
                    </blockquote>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Leads MIHORA&apos;s 9-layer technology architecture, high-concurrency Go and TypeScript platforms, bare-metal Tier III/IV datacenters, OTDR-verified fiber rings, and field break-fix operations.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-outline/15 font-mono text-xs text-on-surface-variant">
                    Sovereign Cloud · Datacenter Physics · Zero-Trust HSM · Optical Backbones
                  </div>
                </div>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl overflow-hidden h-full flex flex-col justify-between">
                <div className="h-36 w-full overflow-hidden relative border-b border-outline/15">
                  <img
                    src={VISUAL_ASSETS.londonCommandStudio}
                    alt="MIHORA London EMEA headquarters on City Road"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute bottom-3 left-6 font-mono text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                    UK-LON-01 · EMEA Executive Governance
                  </div>
                </div>

                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-5">
                    <div className="flex items-center gap-5">
                      <img
                        src="/founder-omema.jpg"
                        alt="Omema Iqbal, Co-Founder and Operations Director at MIHORA.TECH"
                        width={84}
                        height={84}
                        loading="lazy"
                        className="w-20 h-20 rounded-xl object-cover border border-outline/25 shrink-0"
                      />
                      <div>
                        <div className="font-mono text-xs text-primary font-bold">
                          Co-Founder &amp; Operations Director
                        </div>
                        <h3 className="font-headline text-2xl font-extrabold text-on-surface mt-0.5">
                          Omema Iqbal
                        </h3>
                        <div className="font-mono text-xs text-on-surface-variant mt-0.5">
                          Enterprise Strategy &amp; Dual-Hub Governance
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-sm sm:text-base text-on-surface leading-relaxed relative pt-1">
                      <span className="font-headline text-2xl font-extrabold text-gold leading-none mr-1.5" aria-hidden="true">
                        &ldquo;
                      </span>
                      <span className="italic">
                        Resilient engineering is only as reliable as the operational governance behind it. Our dual-hub model guarantees deterministic SLA execution across jurisdictions.&rdquo;
                      </span>
                    </blockquote>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Directs international delivery orchestration across London and Islamabad command hubs, ISO 27001 / UK-GDPR regulatory alignment, strategic carrier partnerships, and 24/7 watchdesk staffing.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-outline/15 font-mono text-xs text-on-surface-variant">
                    Dual-Hub Governance · ISO 27001 Alignment · Enterprise Alliances · 24/7 Delivery
                  </div>
                </div>
              </SpotlightSurface>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* 07. INTERACTIVE SERVICE DIVISIONS EXPLORER WITH ANIMATED INDICATOR */}
      <section className="w-full bg-surface-container-lowest py-20 lg:py-24 border-b border-outline/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-mono font-bold">
                Five Integrated Divisions
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
                Comprehensive Engineering Services
              </h2>
            </div>
            <Link
              to="/services"
              onClick={() => playUiChime('click')}
              className="text-sm text-primary hover:underline font-semibold inline-flex items-center gap-1.5"
            >
              <span>Browse All 5 Divisions</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 bg-surface-container-low p-1.5 rounded-xl border border-outline/20">
            {serviceTabs.map((div, idx) => {
              const selected = activeServiceIdx === idx;
              return (
                <button
                  key={div.slug}
                  type="button"
                  onClick={() => {
                    setActiveServiceIdx(idx);
                    playUiChime('click');
                  }}
                  className={clsx(
                    'relative py-3 px-3 text-center rounded-lg font-mono font-semibold text-xs cursor-pointer transition-colors',
                    selected ? 'text-white' : 'text-on-surface-variant hover:text-on-surface'
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="home-division-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 bg-[#0b1224] dark:bg-primary rounded-lg shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{div.shortTitle}</span>
                </button>
              );
            })}
          </div>

          <div className="surface-card rounded-2xl p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeServiceIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="text-primary font-bold">{activeService.tag}</span>
                    <span className="text-outline">/</span>
                    <span className="text-on-surface-variant uppercase">{activeService.sub}</span>
                  </div>
                  <h3 className="font-headline text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                    {activeService.headline}
                  </h3>
                  <p className="text-base text-on-surface-variant leading-relaxed">{activeService.body}</p>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-2 border-t border-outline/15">
                    {activeService.points.map((pt) => (
                      <div key={pt.k} className="space-y-0.5">
                        <dt className="font-mono text-[11px] uppercase tracking-wider text-primary font-bold">
                          {pt.k}
                        </dt>
                        <dd className="text-sm text-on-surface font-medium">{pt.v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="pt-2">
                    <Link
                      to={`/services/${activeService.slug}`}
                      onClick={() => playUiChime('click')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 btn-primary-gradient text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      <span>Open Full {activeService.shortTitle} Spec</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 obsidian-band border border-white/15 p-6 rounded-xl space-y-5 font-mono text-xs text-slate-200">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-semibold">Division Telemetry Profile</span>
                    <span className="text-amber-400 font-bold">Active Custody</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1.5">
                        <span className="text-slate-300">Automation &amp; Verification</span>
                        <span className="text-amber-400 font-bold tabular-nums">{activeService.bar1}</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: activeService.bar1 }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1.5">
                        <span className="text-slate-300">Redundancy Compliance</span>
                        <span className="text-blue-400 font-bold tabular-nums">{activeService.bar2}</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: activeService.bar2 }} />
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Dual-Hub Custody</span>
                    <span className="text-white font-semibold">London + Islamabad</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 08. INTERACTIVE SCOPE & SLA CONFIGURATOR */}
      <section id="configurator" className="w-full bg-surface py-20 lg:py-24 border-b border-outline/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-gold font-bold uppercase tracking-[0.2em]">
              <Sliders size={14} />
              <span>Architecture Configurator</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
              Interactive Scope &amp; SLA Configurator
            </h2>
            <p className="text-base text-on-surface-variant">
              Select your target engineering domain, geographic corridor, and availability tier to preview recommended topology parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6 surface-card p-6 sm:p-7 rounded-2xl">
              <div className="space-y-2.5">
                <div className="font-mono text-xs uppercase font-bold text-primary">
                  01 · Architecture Domain
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'software', label: 'Cloud & Web Platforms', icon: Terminal },
                    { id: 'hardware', label: 'Datacenter Racks & Fiber', icon: Server },
                    { id: 'ai', label: 'Automation & Private AI', icon: Bot },
                    { id: 'field', label: 'Field Engineering 4h SLA', icon: Wrench },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = configDomain === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setConfigDomain(item.id as typeof configDomain);
                          playUiChime('click');
                        }}
                        className={clsx(
                          'p-3.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer',
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-surface-container-low hover:bg-surface-container border-outline/25 text-on-surface'
                        )}
                      >
                        <Icon size={17} className={isSelected ? 'text-white' : 'text-primary'} />
                        <span className="text-xs font-semibold">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="font-mono text-xs uppercase font-bold text-primary">
                  02 · Delivery Corridor
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'global', label: 'Dual-Hub Global' },
                    { id: 'uk', label: 'United Kingdom' },
                    { id: 'pak', label: 'Pakistan Core' },
                    { id: 'gcc', label: 'Middle East' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setConfigRegion(item.id as typeof configRegion);
                        playUiChime('click');
                      }}
                      className={clsx(
                        'p-2.5 rounded-xl border text-center font-mono text-xs font-semibold transition-all cursor-pointer',
                        configRegion === item.id
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-surface-container-low hover:bg-surface-container border-outline/25 text-on-surface'
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="font-mono text-xs uppercase font-bold text-primary">
                  03 · Availability Commitment
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'cluster', label: '99.999% High Availability' },
                    { id: 'noc', label: '24/7/365 NOC SRE' },
                    { id: 'emergency', label: '4-Hour Field Dispatch' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setConfigSla(item.id as typeof configSla);
                        playUiChime('click');
                      }}
                      className={clsx(
                        'p-2.5 rounded-xl border text-center font-mono text-xs font-semibold transition-all cursor-pointer',
                        configSla === item.id
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-surface-container-low hover:bg-surface-container border-outline/25 text-on-surface'
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 obsidian-band p-6 sm:p-7 rounded-2xl border border-white/15 shadow-2xl space-y-5 text-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-xs font-bold text-amber-400 uppercase">
                  Recommended Reference Spec
                </span>
                <span className="font-mono text-[11px] text-slate-400">Sovereign Baseline</span>
              </div>

              <dl className="divide-y divide-white/10 font-mono">
                <div className="py-2.5">
                  <dt className="text-[10px] text-slate-400 uppercase font-semibold">
                    Target Latency Profile
                  </dt>
                  <dd className="text-base font-bold text-amber-400 mt-0.5">{configSpecs.latency}</dd>
                </div>
                <div className="py-2.5">
                  <dt className="text-[10px] text-slate-400 uppercase font-semibold">
                    Reliability Target
                  </dt>
                  <dd className="text-sm font-bold text-white mt-0.5">{configSpecs.uptime}</dd>
                </div>
                <div className="py-2.5">
                  <dt className="text-[10px] text-slate-400 uppercase font-semibold">
                    Primary Architecture Stack
                  </dt>
                  <dd className="text-xs font-semibold text-slate-200 mt-0.5 leading-relaxed">
                    {configSpecs.stack}
                  </dd>
                </div>
                <div className="py-2.5">
                  <dt className="text-[10px] text-slate-400 uppercase font-semibold">
                    Execution &amp; Handover
                  </dt>
                  <dd className="text-xs text-slate-300 mt-0.5">{configSpecs.turnaround}</dd>
                </div>
              </dl>

              <a
                href={`mailto:hr@mihora.tech?subject=Architecture%20Scope%20Inquiry%20(${configDomain.toUpperCase()}%20-%20${configRegion.toUpperCase()})`}
                onClick={() => playUiChime('click')}
                className="w-full py-3.5 px-4 btn-primary-gradient rounded-xl font-semibold text-xs text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail size={15} />
                <span>Send Scope to hr@mihora.tech</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 09. UNIFIED 9-LAYER STACK & ENGINEERING WORKBENCH LINKS */}
      <section className="w-full bg-surface-container-lowest py-20 lg:py-24 border-b border-outline/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-bold flex items-center gap-2">
                  <Layers size={14} />
                  <span>Unified 9-Layer Topology</span>
                </span>
                <h2 className="font-headline text-3xl text-on-surface font-extrabold tracking-tight">
                  One Stack From Optical Fiber to Cloud UI
                </h2>
              </div>

              <div className="divide-y divide-outline/15 border-y border-outline/15">
                {[
                  {
                    id: 9,
                    title: 'Software & Client Interfaces',
                    desc: 'TypeScript, React 19, Go backends, containerized workloads, and zero-trust gateways.',
                    spec: 'Zero vendor lock-in · Full source transfer',
                  },
                  {
                    id: 8,
                    title: 'APIs & Event Streaming',
                    desc: 'gRPC, GraphQL, Apache Kafka telemetry buses, and idempotent distributed state.',
                    spec: 'Sub-2ms core routing · Mutual TLS v1.3',
                  },
                  {
                    id: 7,
                    title: 'Applied Intelligence & SCADA',
                    desc: 'Private on-premise LLM inference, OCR pipelines, and optically isolated PLC bridges.',
                    spec: 'Air-gapped inference · Zero external data egress',
                  },
                  {
                    id: 6,
                    title: 'OS, Hypervisors & Virtualization',
                    desc: 'Hardened Linux kernels, Proxmox VE / KVM clusters, and immutable root filesystems.',
                    spec: 'CIS Level 2 · TPM 2.0 attestation',
                  },
                  {
                    id: 5,
                    title: 'Routing & EVPN-VXLAN Networks',
                    desc: 'BGP Anycast, SD-WAN overlays, WireGuard meshes, and redundant multi-carrier uplinks.',
                    spec: 'Sub-second dual-homed failover',
                  },
                  {
                    id: 4,
                    title: 'Compute Nodes & NVMe SANs',
                    desc: '1U–4U enterprise servers, NVMe-oF storage pools, ECC scrubbing, and out-of-band IPMI.',
                    spec: 'Dual PSU redundancy · Ceph 3x replication',
                  },
                  {
                    id: 3,
                    title: 'Structured Fiber & Power Distribution',
                    desc: 'Core-alignment OS2 fiber splicing, Cat6A shielded copper, smart PDUs, and 2N ATS.',
                    spec: 'OTDR certified <= 0.03 dB mean loss',
                  },
                  {
                    id: 2,
                    title: 'Perimeter Surveillance & Environmental',
                    desc: 'NDAA IP CCTV, biometric turnstiles, thermal hot-aisle containment, and leakage probes.',
                    spec: 'NEMA-4X rugged enclosures · Automated alerts',
                  },
                  {
                    id: 1,
                    title: 'Kinetic Field Engineering & Break-Fix',
                    desc: 'Certified on-site truck rigs, emergency cable splicing, component swaps, and commissioning.',
                    spec: '4-hour emergency SLA in active corridors',
                  },
                ].map((layer) => {
                  const isExpanded = expandedStack === layer.id;
                  return (
                    <div
                      key={layer.id}
                      onClick={() => toggleStack(layer.id)}
                      className="py-3.5 px-2 cursor-pointer transition-colors hover:bg-surface-container-low/60"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-primary">L-0{layer.id}</span>
                          <span className="font-headline font-bold text-sm sm:text-base text-on-surface">
                            {layer.title}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-primary font-semibold shrink-0">
                          {isExpanded ? 'Hide' : 'Expand'}
                        </span>
                      </div>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2.5 pl-9 space-y-1 text-sm text-on-surface-variant">
                              <p>{layer.desc}</p>
                              <div className="font-mono text-xs text-gold font-semibold">{layer.spec}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <Tilt3DFrame maxTilt={4}>
                <div className="surface-card rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={VISUAL_ASSETS.fiberOpticsHardware}
                    alt="Certified high-density optical fiber patch array and QSFP transceivers"
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                  <div className="p-6 space-y-3">
                    <div className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
                      Physical Verification Standard
                    </div>
                    <h3 className="font-headline text-xl font-bold text-on-surface">
                      Zero Assumptions. Verified at Every Span.
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Software fails when physical transport degrades. Every datacenter deployment and structured fiber installation ships with signed bidirectional OTDR trace records.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-4">
                      <Link
                        to="/engineering"
                        className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>Explore 9-Layer Stack</span>
                        <ArrowRight size={13} />
                      </Link>
                      <Link
                        to="/tools"
                        className="text-xs font-semibold text-on-surface-variant hover:text-on-surface"
                      >
                        Optical Link Loss Calculator →
                      </Link>
                    </div>
                  </div>
                </div>
              </Tilt3DFrame>
            </div>
          </div>

          {/* Open Engineering Workbench Hairline Trio */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-outline/20 divide-y md:divide-y-0 md:divide-x divide-outline/20 rounded-2xl overflow-hidden bg-surface-container-low/40">
            <Link
              to="/tools"
              onClick={() => playUiChime('click')}
              className="p-7 space-y-2 group hover:bg-surface-container-lowest transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between text-primary">
                <Calculator size={18} />
                <ArrowUpRight size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                SLA, Optical Loss &amp; TCO Calculators
              </h3>
              <p className="text-sm text-on-surface-variant">
                Compute 99.999% downtime budgets, TIA-568-D link attenuation, and 5-year sovereign egress savings.
              </p>
            </Link>

            <Link
              to="/compare"
              onClick={() => playUiChime('click')}
              className="p-7 space-y-2 group hover:bg-surface-container-lowest transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between text-primary">
                <Scale size={18} />
                <ArrowUpRight size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                Sovereign vs. Hyperscale Comparison
              </h3>
              <p className="text-sm text-on-surface-variant">
                Objective technical matrix weighing IP custody, latency predictability, and multi-year egress economics.
              </p>
            </Link>

            <Link
              to="/glossary"
              onClick={() => playUiChime('click')}
              className="p-7 space-y-2 group hover:bg-surface-container-lowest transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between text-primary">
                <BookMarked size={18} />
                <ArrowUpRight size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                Sovereign Engineering Glossary
              </h3>
              <p className="text-sm text-on-surface-variant">
                Clear definitions covering OTDR testing, EVPN-VXLAN fabrics, optical data diodes, and 2N power.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. AEO ARCHITECTURE COMPARISON MATRIX, VERIFIED Q&A & OBSIDIAN CTA */}
      <section className="w-full bg-surface py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
                  AEO Architectural Benchmark Matrix
                </div>
                <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                  Why Enterprises Choose Full-Span Sovereign Custody
                </h2>
              </div>
              <Link
                to="/compare"
                className="font-mono text-xs font-bold text-primary hover:underline inline-flex items-center gap-1.5 shrink-0"
              >
                <span>Open Detailed Trade-Off Matrix</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="overflow-x-auto surface-card rounded-2xl">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-outline/20 bg-surface-container-low font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                    <th className="py-4 px-5">Engineering Criterion</th>
                    <th className="py-4 px-5 text-primary font-bold">MIHORA.TECH Sovereign Stack</th>
                    <th className="py-4 px-5">Hyperscale Public Cloud</th>
                    <th className="py-4 px-5">Fragmented Agencies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline/15">
                  <tr>
                    <td className="py-3.5 px-5 font-semibold text-on-surface">Accountability Span</td>
                    <td className="py-3.5 px-5 text-on-surface font-medium">Unified L01 Fiber to L09 Cloud</td>
                    <td className="py-3.5 px-5 text-on-surface-variant">Shared black-box infrastructure</td>
                    <td className="py-3.5 px-5 text-on-surface-variant">Software only; finger-pointing</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 font-semibold text-on-surface">Optical Plant Certification</td>
                    <td className="py-3.5 px-5 text-emerald-500 font-mono font-bold tabular-nums">&le; 0.03 dB EXFO OTDR Signed</td>
                    <td className="py-3.5 px-5 text-on-surface-variant">None disclosed to tenants</td>
                    <td className="py-3.5 px-5 text-on-surface-variant">Outsourced sub-contractors</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 font-semibold text-on-surface">Cryptographic Key Custody</td>
                    <td className="py-3.5 px-5 text-on-surface font-medium">100% Client FIPS 140-3 HSM</td>
                    <td className="py-3.5 px-5 text-on-surface-variant">Provider-managed KMS defaults</td>
                    <td className="py-3.5 px-5 text-on-surface-variant">Ad-hoc cloud credentials</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 font-semibold text-on-surface">24/7 Operations &amp; Field SLA</td>
                    <td className="py-3.5 px-5 text-amber-500 font-mono font-bold">London + Islamabad (99.999%)</td>
                    <td className="py-3.5 px-5 text-on-surface-variant">No physical premises dispatch</td>
                    <td className="py-3.5 px-5 text-on-surface-variant">Business-hours ticket queues</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-gold font-bold">
                <HelpCircle size={14} />
                <span>Entity Verification</span>
              </div>
              <h3 className="font-headline text-base font-bold text-on-surface">
                Who founded MIHORA.TECH?
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                MIHORA.TECH (Private) Limited was co-founded by M. Matti ul Hasnain (Principal Systems Architect) and Omema Iqbal (Operations Director), operating hubs in London and Islamabad.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-gold font-bold">
                <ShieldCheck size={14} />
                <span>Custody Model</span>
              </div>
              <h3 className="font-headline text-base font-bold text-on-surface">
                Do clients retain IP &amp; infrastructure control?
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Yes. All custom software repositories, Terraform manifests, HSM keys, and physical cabling certification traces remain under exclusive client ownership.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-gold font-bold">
                <Server size={14} />
                <span>Global Engagement</span>
              </div>
              <h3 className="font-headline text-base font-bold text-on-surface">
                How does a new project begin?
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Every engagement starts with Phase 01 Discovery &amp; Threat Modeling, followed by a transparent fixed-scope blueprint.{' '}
                <Link to="/how-it-works" className="text-primary font-semibold hover:underline">
                  Read 5-phase methodology →
                </Link>
              </p>
            </div>
          </div>

          <div className="obsidian-band obsidian-grid p-8 sm:p-14 rounded-2xl border border-white/15 text-center space-y-5 max-w-5xl mx-auto shadow-2xl">
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-amber-400 font-semibold">
              Direct Engineering Engagement
            </div>
            <h2 className="font-headline text-3xl sm:text-5xl text-white font-extrabold tracking-tight">
              Tell Us What You&apos;re Building
            </h2>
            <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Digital systems, Tier III/IV datacenter builds, private automation pipelines, or 24/7 managed SRE across London, Islamabad, and international corridors.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticWrapper>
                <Link
                  to="/contact"
                  onClick={() => playUiChime('click')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 btn-primary-gradient font-semibold rounded-xl text-sm cursor-pointer"
                >
                  <span>Schedule Architecture Consultation</span>
                  <ArrowRight size={16} />
                </Link>
              </MagneticWrapper>
              <a
                href="mailto:hr@mihora.tech?subject=MIHORA%20Architecture%20Inquiry"
                onClick={() => playUiChime('click')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/[0.06] border border-white/20 hover:bg-white/[0.12] text-white font-semibold rounded-xl text-sm transition-all cursor-pointer"
              >
                <Mail size={15} className="text-amber-400" />
                <span>hr@mihora.tech</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
