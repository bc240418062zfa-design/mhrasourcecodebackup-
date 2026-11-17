import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Terminal,
  Router,
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
  },
};

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

  const [livePing, setLivePing] = useState(18.2);
  const [livePackets, setLivePackets] = useState(248190);
  const [activeHubView, setActiveHubView] = useState<'LON' | 'ISB'>('LON');

  const [isTracing, setIsTracing] = useState(false);
  const [traceStep, setTraceStep] = useState(0);

  const [configDomain, setConfigDomain] = useState<'software' | 'hardware' | 'ai' | 'field'>('software');
  const [configRegion, setConfigRegion] = useState<'uk' | 'pak' | 'gcc' | 'global'>('global');
  const [configSla, setConfigSla] = useState<'emergency' | 'noc' | 'cluster'>('cluster');

  useEffect(() => {
    const timer = setInterval(() => {
      setLivePing(Number((17.4 + Math.random() * 1.6).toFixed(1)));
      setLivePackets((prev) => prev + Math.floor(Math.random() * 14) + 5);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectNode = (nodeId: string) => {
    playUiChime('click');
    setActiveNodeId(nodeId);
    runFiberTrace();
  };

  const runFiberTrace = () => {
    setIsTracing(true);
    setTraceStep(1);
    playUiChime('ping');

    setTimeout(() => setTraceStep(2), 360);
    setTimeout(() => setTraceStep(3), 720);
    setTimeout(() => {
      setTraceStep(4);
      setIsTracing(false);
      playUiChime('success');
    }, 1080);
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
      {/* 01. EDITORIAL ARCHITECTURAL HERO */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-outline/20 bg-tech-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Reveal>
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-bold">
                  MIHORA.TECH · M. Matti ul Hasnain &amp; Omema Iqbal
                </div>
              </Reveal>

              <MaskTextReveal delay={0.04}>
                <h1 className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-[3.5rem] text-on-surface tracking-tight leading-[1.06]">
                  Sovereign Engineering From Physical Glass to Distributed Cloud
                </h1>
              </MaskTextReveal>

              <Reveal delay={0.14}>
                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-xl">
                  Operating synchronized command hubs in{' '}
                  <strong className="text-on-surface font-semibold">London (UK)</strong> and{' '}
                  <strong className="text-on-surface font-semibold">Islamabad (Pakistan)</strong>.
                  One accountable team engineering custom software platforms, certified optical
                  datacenters, industrial SCADA, and 24/7 operational custody.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <MagneticWrapper>
                    <Link
                      to="/contact"
                      onClick={() => playUiChime('click')}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 btn-primary-gradient font-semibold rounded-xl text-sm cursor-pointer"
                    >
                      <span>Schedule Architecture Review</span>
                      <ArrowRight size={16} />
                    </Link>
                  </MagneticWrapper>
                  <Link
                    to="/our-story"
                    onClick={() => playUiChime('click')}
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-surface-container-low hover:bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface font-semibold rounded-xl text-sm transition-all cursor-pointer"
                  >
                    <span>Our Founding Story</span>
                  </Link>
                </div>
              </Reveal>

              {/* Quiet typographic telemetry ledger — zero nested card borders */}
              <Reveal delay={0.26}>
                <div className="pt-5 border-t border-outline/15 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface-variant uppercase">Watchdesk:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveHubView(activeHubView === 'LON' ? 'ISB' : 'LON');
                        playUiChime('switch');
                      }}
                      className="font-bold text-primary hover:underline cursor-pointer"
                    >
                      {activeHubView === 'LON' ? 'UK-LON-01 (London)' : 'PK-ISB-01 (Islamabad)'}
                    </button>
                  </div>
                  <div>
                    <span className="text-on-surface-variant uppercase">Corridor RTT: </span>
                    <span className="font-bold text-on-surface tabular-nums">{livePing} ms</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant uppercase">Custody SLA: </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      99.999%
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Dominant Hero Visual Frame — Pure Edge-to-Edge Editorial Photography */}
            <div className="lg:col-span-6">
              <Reveal direction="left" delay={0.08}>
                <div className="relative rounded-2xl overflow-hidden border border-outline/25 shadow-2xl bg-surface-container-low">
                  <ParallaxFrame offset={24} className="aspect-[16/11] w-full">
                    <img
                      src={VISUAL_ASSETS.heroDatacenterHall}
                      alt="Tier IV enterprise datacenter hall constructed and operated by MIHORA.TECH"
                      className="w-full h-full object-cover"
                    />
                  </ParallaxFrame>
                  <div className="px-5 py-3.5 bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline/15 flex items-center justify-between text-xs font-mono">
                    <span className="text-on-surface font-semibold">
                      Tier III/IV Bare-Metal &amp; Optical Spine
                    </span>
                    <Link
                      to="/engineering"
                      className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Inspect 9-Layer Stack</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Empirical Proof Strip */}
          <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl p-6 h-full">
                <Link to="/status" className="block space-y-1.5 cursor-pointer">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
                    Quorum Availability
                  </div>
                  <div className="font-headline text-3xl sm:text-4xl font-extrabold text-primary">
                    <AnimatedCounter target={99.999} decimals={3} suffix="%" />
                  </div>
                  <div className="text-xs text-on-surface-variant">Synchronized dual-hub custody</div>
                </Link>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl p-6 h-full">
                <Link to="/case-studies" className="block space-y-1.5 cursor-pointer">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
                    Certified Fiber Span
                  </div>
                  <div className="font-headline text-3xl sm:text-4xl font-extrabold text-primary">
                    <AnimatedCounter target={250000} suffix="+ m" />
                  </div>
                  <div className="text-xs text-on-surface-variant">Bidirectional OTDR verified</div>
                </Link>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl p-6 h-full">
                <Link to="/services/physical-infrastructure" className="block space-y-1.5 cursor-pointer">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
                    Production Racks
                  </div>
                  <div className="font-headline text-3xl sm:text-4xl font-extrabold text-primary">
                    <AnimatedCounter target={1200} suffix="+" />
                  </div>
                  <div className="text-xs text-on-surface-variant">High-density 42U/48U estates</div>
                </Link>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl p-6 h-full">
                <Link to="/tools" className="block space-y-1.5 cursor-pointer">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
                    Mean Fusion Splice Loss
                  </div>
                  <div className="font-headline text-3xl sm:text-4xl font-extrabold text-primary tabular-nums">
                    &le; 0.03 dB
                  </div>
                  <div className="text-xs text-on-surface-variant">TIA-568-D Exceedance Standard</div>
                </Link>
              </SpotlightSurface>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* 02. CONTINUOUS ARCHITECTURAL STANDARDS MARQUEE */}
      <InfiniteMarquee items={MARQUEE_SPECS} />

      {/* 03. STICKY SCROLLYTELLING: FROM PHYSICAL GLASS TO DISTRIBUTED CONSENSUS */}
      <section className="w-full bg-surface py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Four-Stage Sovereign Spine
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
              From Physical Silicon to Continuous Operational Custody
            </h2>
            <p className="text-base text-on-surface-variant leading-relaxed">
              Explore each physical and logical layer MIHORA unifies inside a single engineering chain.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Interactive Stage Chapters */}
            <div className="lg:col-span-6 space-y-4">
              {SCROLL_STAGES.map((stage, idx) => {
                const isActive = activeScrollStage === idx;
                return (
                  <motion.div
                    key={stage.id}
                    onViewportEnter={() => setActiveScrollStage(idx)}
                    viewport={{ amount: 0.6 }}
                    onClick={() => {
                      setActiveScrollStage(idx);
                      playUiChime('click');
                    }}
                    className={clsx(
                      'p-6 sm:p-7 rounded-2xl border transition-all cursor-pointer space-y-3',
                      isActive
                        ? 'bg-surface-container-lowest border-primary shadow-md'
                        : 'bg-surface-container-low/60 border-outline/20 opacity-80 hover:opacity-100'
                    )}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-primary font-bold">{stage.kicker}</span>
                      <span className="text-on-surface-variant font-bold">0{idx + 1}</span>
                    </div>
                    <h3 className="font-headline text-xl sm:text-2xl font-bold text-on-surface leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{stage.body}</p>
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-outline/15">
                      <span className="font-mono text-[11px] font-semibold text-on-surface">
                        {stage.spec}
                      </span>
                      <Link
                        to={stage.link}
                        className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>{stage.linkLabel}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Sticky Photographic Viewport */}
            <div className="lg:col-span-6 lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden border border-outline/25 bg-surface-container-lowest shadow-2xl">
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={SCROLL_STAGES[activeScrollStage].image}
                      src={SCROLL_STAGES[activeScrollStage].image}
                      alt={SCROLL_STAGES[activeScrollStage].alt}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>

                <div className="p-6 space-y-2 border-t border-outline/15 bg-surface-container-lowest">
                  <div className="flex items-center justify-between font-mono text-xs text-primary font-bold">
                    <span>{SCROLL_STAGES[activeScrollStage].kicker}</span>
                    <span>Stage {SCROLL_STAGES[activeScrollStage].num} / 04</span>
                  </div>
                  <div className="font-headline text-lg font-bold text-on-surface">
                    {SCROLL_STAGES[activeScrollStage].title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. INTERACTIVE GLOBAL TOPOLOGY & PACKET ROUTE TRACER */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                Live Intercontinental Optical Mesh
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
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
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface border-outline/25'
                  )}
                >
                  {id}
                </button>
              ))}

              <button
                type="button"
                onClick={() => runFiberTrace()}
                disabled={isTracing}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600/12 text-emerald-700 dark:text-emerald-400 border border-emerald-600/30 hover:bg-emerald-600/20 font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-1"
              >
                <Play size={12} className={isTracing ? 'animate-spin' : ''} />
                <span>{isTracing ? 'Tracing...' : 'Trace Route'}</span>
              </button>
            </div>
          </div>

          <Reveal>
            <div className="relative w-full h-[380px] md:h-[460px] bg-surface-container-low rounded-2xl overflow-hidden flex items-center justify-center border border-outline/25 shadow-lg">
              <svg className="w-full h-full relative z-10" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 500">
                <g className="opacity-20" stroke="currentColor" strokeDasharray="4,4" strokeWidth="1.2">
                  <line x1="580" x2="520" y1="240" y2="280" />
                  <line x1="580" x2="730" y1="240" y2="300" />
                  <line x1="480" x2="250" y1="170" y2="190" />
                  <line x1="580" x2="250" y1="240" y2="190" />
                  <line x1="580" x2="800" y1="240" y2="200" />
                  <line x1="480" x2="580" y1="170" y2="240" />
                </g>

                <line className="flow-line stroke-primary stroke-[2.5]" x1="480" x2="580" y1="170" y2="240" strokeDasharray="8,8" />
                <line className="flow-line-reverse stroke-secondary stroke-[2]" x1="580" x2="520" y1="240" y2="280" strokeDasharray="6,6" />
                <line className="flow-line stroke-secondary stroke-[2]" x1="580" x2="730" y1="240" y2="300" strokeDasharray="6,6" />
                <line className="flow-line-reverse stroke-primary stroke-[2]" x1="480" x2="250" y1="170" y2="190" strokeDasharray="6,6" />
                <line className="flow-line stroke-secondary stroke-[1.5]" x1="580" x2="800" y1="240" y2="200" strokeDasharray="6,6" />

                <g className="cursor-pointer" onClick={() => handleSelectNode('LON')}>
                  <circle cx="480" cy="170" fill="var(--color-primary)" r="9" />
                  <circle cx="480" cy="170" fill="#ffffff" r="3.5" />
                  <text fill="currentColor" className="text-primary font-bold" fontFamily="JetBrains Mono" fontSize="12" fontWeight="700" x="395" y="146">
                    UK HUB: LONDON
                  </text>
                  <text fill="currentColor" className="text-on-surface-variant" fontFamily="JetBrains Mono" fontSize="9" x="395" y="159">
                    51.5074° N, 0.1278° W
                  </text>
                </g>

                <g className="cursor-pointer" onClick={() => handleSelectNode('HQ')}>
                  <circle cx="580" cy="240" fill="var(--color-primary)" r="9" />
                  <circle cx="580" cy="240" fill="#ffffff" r="3.5" />
                  <text fill="currentColor" className="text-primary font-bold" fontFamily="JetBrains Mono" fontSize="12" fontWeight="700" x="598" y="235">
                    PK HUB: ISLAMABAD
                  </text>
                  <text fill="currentColor" className="text-on-surface-variant" fontFamily="JetBrains Mono" fontSize="9" x="598" y="248">
                    33.6844° N, 73.0479° E
                  </text>
                </g>

                <g className="cursor-pointer" onClick={() => handleSelectNode('DXB')}>
                  <circle cx="520" cy="280" fill="var(--color-secondary)" r="6" />
                  <text fill="currentColor" className="text-on-surface" fontFamily="JetBrains Mono" fontSize="10" x="532" y="285">
                    DUBAI (GCC)
                  </text>
                </g>
                <g className="cursor-pointer" onClick={() => handleSelectNode('SIN')}>
                  <circle cx="730" cy="300" fill="var(--color-secondary)" r="6" />
                  <text fill="currentColor" className="text-on-surface" fontFamily="JetBrains Mono" fontSize="10" x="742" y="305">
                    SINGAPORE (APAC)
                  </text>
                </g>
                <g className="cursor-pointer" onClick={() => handleSelectNode('NYC')}>
                  <circle cx="250" cy="190" fill="var(--color-primary)" r="6" />
                  <text fill="currentColor" className="text-on-surface" fontFamily="JetBrains Mono" fontSize="10" x="165" y="180">
                    NEW YORK (NA)
                  </text>
                </g>
                <g className="cursor-pointer" onClick={() => handleSelectNode('TYO')}>
                  <circle cx="800" cy="200" fill="var(--color-secondary)" r="6" />
                  <text fill="currentColor" className="text-on-surface" fontFamily="JetBrains Mono" fontSize="10" x="812" y="205">
                    TOKYO (JP)
                  </text>
                </g>
              </svg>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNodeId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[26rem] bg-surface-container-lowest/95 backdrop-blur-md p-5 rounded-xl border border-outline/30 shadow-xl"
                >
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-mono text-xs text-primary font-semibold">{activeNode.code}</span>
                    <span className="font-mono text-xs font-bold text-primary tabular-nums">{activeNode.ping} ms</span>
                  </div>
                  <div className="font-headline text-base text-on-surface font-bold">{activeNode.title}</div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{activeNode.desc}</p>
                  <div className="mt-3 pt-2.5 border-t border-outline/15 text-[11px] font-mono text-on-surface">
                    {activeNode.hops.join(' → ')}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {isTracing && (
            <div className="p-3 rounded-xl bg-surface-container border border-primary/30 font-mono text-xs flex items-center justify-between">
              <span className="text-primary font-semibold">
                Executing optical trace to {activeNodeId} ({activeNode.title})...
              </span>
              <span className="text-on-surface-variant tabular-nums">Hop {traceStep} / 4</span>
            </div>
          )}
        </div>
      </section>

      {/* 05. EXECUTIVE FOUNDERS & DUAL-HUB STEWARDSHIP */}
      <section className="w-full bg-surface py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                <Users size={14} />
                <span>Founding Leadership</span>
              </div>
              <MaskTextReveal>
                <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
                  Co-Founded by M. Matti ul Hasnain &amp; Omema Iqbal
                </h2>
              </MaskTextReveal>
              <p className="text-base text-on-surface-variant leading-relaxed">
                Uniting low-level physical infrastructure craft and distributed cloud architecture under synchronized governance between London and Islamabad.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                to="/company"
                onClick={() => playUiChime('click')}
                className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
              >
                <span>Executive Bios</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/our-story"
                onClick={() => playUiChime('click')}
                className="text-sm font-semibold text-on-surface-variant hover:text-on-surface"
              >
                Our Story →
              </Link>
            </div>
          </div>

          <StaggerGrid className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl p-7 sm:p-8 h-full flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center gap-5">
                    <img
                      src="/founder-matti.jpg"
                      alt="M. Matti ul Hasnain, Co-Founder and Principal Systems Architect at MIHORA.TECH"
                      width={80}
                      height={80}
                      loading="lazy"
                      className="w-20 h-20 rounded-2xl object-cover border border-outline/25 shrink-0"
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

                  <blockquote className="text-sm sm:text-base text-on-surface italic pl-4 border-l-2 border-primary leading-relaxed">
                    &ldquo;We founded MIHORA to eliminate the brittle gap between abstract software code and physical reality. We architect sovereign backends, and our engineers splice and certify the optical plant.&rdquo;
                  </blockquote>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Leads MIHORA&apos;s 9-layer technology architecture, high-concurrency Go and TypeScript platforms, bare-metal Tier III/IV datacenters, OTDR-verified fiber rings, and field break-fix operations.
                  </p>
                </div>

                <div className="pt-4 border-t border-outline/15 font-mono text-xs text-on-surface-variant">
                  Sovereign Cloud · Datacenter Physics · Zero-Trust HSM · Optical Backbones
                </div>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl p-7 sm:p-8 h-full flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center gap-5">
                    <img
                      src="/founder-omema.jpg"
                      alt="Omema Iqbal, Co-Founder and Operations Director at MIHORA.TECH"
                      width={80}
                      height={80}
                      loading="lazy"
                      className="w-20 h-20 rounded-2xl object-cover border border-outline/25 shrink-0"
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

                  <blockquote className="text-sm sm:text-base text-on-surface italic pl-4 border-l-2 border-primary leading-relaxed">
                    &ldquo;Resilient engineering is only as reliable as the operational governance behind it. Our dual-hub model guarantees deterministic SLA execution across jurisdictions.&rdquo;
                  </blockquote>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Directs international delivery orchestration across London and Islamabad command hubs, ISO 27001 / UK-GDPR regulatory alignment, strategic carrier partnerships, and 24/7 watchdesk staffing.
                  </p>
                </div>

                <div className="pt-4 border-t border-outline/15 font-mono text-xs text-on-surface-variant">
                  Dual-Hub Governance · ISO 27001 Alignment · Enterprise Alliances · 24/7 Delivery
                </div>
              </SpotlightSurface>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* 06. INTERACTIVE SERVICE DIVISIONS EXPLORER WITH ANIMATED INDICATOR */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
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

          {/* Animated Tab Bar */}
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
                      className="absolute inset-0 bg-primary rounded-lg shadow-sm"
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

                <div className="lg:col-span-5 bg-surface-container-low border border-outline/20 p-6 rounded-xl space-y-5 font-mono text-xs">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="font-semibold">Division Telemetry Profile</span>
                    <span className="text-primary font-bold">Active Custody</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1.5">
                        <span className="text-on-surface-variant">Automation &amp; Verification</span>
                        <span className="text-primary font-bold tabular-nums">{activeService.bar1}</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-500" style={{ width: activeService.bar1 }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1.5">
                        <span className="text-on-surface-variant">Redundancy Compliance</span>
                        <span className="text-primary font-bold tabular-nums">{activeService.bar2}</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-secondary transition-all duration-500" style={{ width: activeService.bar2 }} />
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-outline/15 flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span>Dual-Hub Custody</span>
                    <span className="text-on-surface font-semibold">London + Islamabad</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 07. INTERACTIVE SCOPE & SLA CONFIGURATOR */}
      <section id="configurator" className="w-full bg-surface py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary font-semibold uppercase tracking-widest">
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

            <div className="lg:col-span-5 surface-card p-6 sm:p-7 rounded-2xl border-primary/30 shadow-lg space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-outline/20">
                <span className="font-mono text-xs font-bold text-primary uppercase">
                  Recommended Reference Spec
                </span>
                <span className="font-mono text-[11px] text-on-surface-variant">Sovereign Baseline</span>
              </div>

              <dl className="divide-y divide-outline/15 font-mono">
                <div className="py-2.5">
                  <dt className="text-[10px] text-on-surface-variant uppercase font-semibold">
                    Target Latency Profile
                  </dt>
                  <dd className="text-base font-bold text-primary mt-0.5">{configSpecs.latency}</dd>
                </div>
                <div className="py-2.5">
                  <dt className="text-[10px] text-on-surface-variant uppercase font-semibold">
                    Reliability Target
                  </dt>
                  <dd className="text-sm font-bold text-on-surface mt-0.5">{configSpecs.uptime}</dd>
                </div>
                <div className="py-2.5">
                  <dt className="text-[10px] text-on-surface-variant uppercase font-semibold">
                    Primary Architecture Stack
                  </dt>
                  <dd className="text-xs font-semibold text-on-surface mt-0.5 leading-relaxed">
                    {configSpecs.stack}
                  </dd>
                </div>
                <div className="py-2.5">
                  <dt className="text-[10px] text-on-surface-variant uppercase font-semibold">
                    Execution &amp; Handover
                  </dt>
                  <dd className="text-xs text-on-surface-variant mt-0.5">{configSpecs.turnaround}</dd>
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

      {/* 08. UNIFIED 9-LAYER STACK & ENGINEERING WORKBENCH LINKS */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                  Unified 9-Layer Topology
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
                      className="py-3.5 px-2 cursor-pointer transition-colors hover:bg-surface-container-low/50"
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
                              <div className="font-mono text-xs text-primary font-semibold">{layer.spec}</div>
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
              <div className="surface-card rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={VISUAL_ASSETS.fiberOpticsHardware}
                  alt="Certified high-density optical fiber patch array and QSFP transceivers"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <div className="p-6 space-y-3">
                  <div className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
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
            </div>
          </div>

          {/* Open Engineering Tools & Decision Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <Link
              to="/tools"
              onClick={() => playUiChime('click')}
              className="surface-card p-6 rounded-2xl space-y-2 group cursor-pointer"
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
              className="surface-card p-6 rounded-2xl space-y-2 group cursor-pointer"
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
              className="surface-card p-6 rounded-2xl space-y-2 group cursor-pointer"
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

      {/* 09. AEO VERIFIED QUESTIONS & FINAL CTA */}
      <section className="w-full bg-surface py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
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
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
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
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
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

          <div className="surface-card p-8 sm:p-12 rounded-2xl text-center space-y-5 max-w-4xl mx-auto">
            <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Direct Engineering Engagement
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
              Tell Us What You&apos;re Building
            </h2>
            <p className="text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-container-low border border-outline/30 hover:border-primary/50 text-on-surface font-semibold rounded-xl text-sm transition-all cursor-pointer"
              >
                <Mail size={15} className="text-primary" />
                <span>hr@mihora.tech</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
