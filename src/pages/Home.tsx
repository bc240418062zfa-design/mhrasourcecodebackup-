import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Terminal, Router, RefreshCw, Bot, Server, Wrench,
  Users, Mail, ArrowUpRight, Play, Sliders, HelpCircle, ShieldCheck
} from 'lucide-react';
import { playUiChime } from '../utils/audio';
import { VISUAL_ASSETS } from '../assets/visuals';
import { SERVICE_DIVISIONS } from '../data/servicesData';
import { Reveal, StaggerGrid, StaggerItem, AnimatedCounter, ParallaxFrame } from '../components/MotionPrimitives';

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
    desc: 'Core architectural authority, systems telemetry operations center, R&D verification labs, and regional dispatch command.',
    lat: '33.6844° N',
    lon: '73.0479° E',
    ping: 18.2,
    hops: ['UK-LON-01 (Subsea + Terrestrial)', 'FRA-DE-02 (Optical IXP)', 'DXB-UAE-01 (Gulf Transit)', 'PK-ISB-01 (Command Hub)'],
    role: 'Core Architecture & Telemetry',
  },
  LON: {
    code: 'Dual Core Hub · UK-LON-01',
    title: 'London Engineering Hub',
    desc: 'EMEA operations headquarters, European enterprise delivery, UK-GDPR / ISO compliance governance, and partner peering.',
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

const serviceTabs = [
  {
    slug: 'digital-engineering',
    tag: 'Division 01 · Digital Engineering',
    sub: 'Sovereign Software Platforms',
    headline: 'Full-Lifecycle Digital Engineering',
    body: 'We architect, construct, and harden sovereign software platforms, distributed Go and TypeScript backends, native applications, and zero-trust API meshes built for high concurrent throughput.',
    sub1: 'Custom enterprise web, SaaS, & native systems',
    sub2: 'Event-driven queues, partitioned storage, mTLS 1.3',
    sub3: 'Heterogeneous ERP/API integration bridges',
    sub4: 'Automated CI/CD, canary rollouts, full source custody',
    bar1: '96%',
    bar2: '100%',
  },
  {
    slug: 'automation-intelligence',
    tag: 'Division 02 · Automation & AI',
    sub: 'Deterministic Intelligence',
    headline: 'Automation & Applied Intelligence',
    body: 'Eliminating manual operational friction through idempotent Kafka/Temporal workflows, optically isolated industrial SCADA bridges, real-time OCR pipelines, and air-gapped on-premise inference.',
    sub1: 'Deterministic workflow engines & SCADA telemetry',
    sub2: 'Document OCR parsing and classification meshes',
    sub3: 'Automated incident routing & state recovery',
    sub4: 'Air-gapped private model inference environments',
    bar1: '98%',
    bar2: '94%',
  },
  {
    slug: 'physical-infrastructure',
    tag: 'Division 03 · Infrastructure',
    sub: 'Tier III / IV Physical Topologies',
    headline: 'Datacenter Racks & Optical Backbones',
    body: 'Seismically braced 42U/48U server racks, single-mode OS2 optical fiber splicing, NVMe SAN clusters, and 2N ATS power distribution engineered for uninterrupted enterprise custody.',
    sub1: 'Server racks, smart PDUs & hot-aisle containment',
    sub2: 'Core-alignment single-mode & OM4 optical splicing',
    sub3: 'EVPN-VXLAN spine-leaf switching & BGP diversity',
    sub4: '2N redundant UPS power & out-of-band management',
    bar1: '100%',
    bar2: '99%',
  },
  {
    slug: 'field-engineering',
    tag: 'Division 04 · Field Engineering',
    sub: 'Tactical On-Site Rigs',
    headline: 'Tactical Field Engineering & 4h Dispatch',
    body: 'When software cannot solder a circuit or splice cut glass, certified MIHORA field teams deploy directly on-site with calibrated fusion splicers, Fluke DSX-8000 certifiers, and spare hardware.',
    sub1: '4-hour emergency on-site break-fix dispatch SLA',
    sub2: 'NDAA enterprise IP CCTV, NVR & biometric access',
    sub3: 'Structured Cat6A copper & armored optical runs',
    sub4: 'Active RF spectrum & Private 5G site surveys',
    bar1: '93%',
    bar2: '97%',
  },
  {
    slug: 'managed-sre',
    tag: 'Division 05 · Managed SRE',
    sub: '24/7 Dual-Hub Oversight',
    headline: 'Managed Technology & 24/7 SRE',
    body: 'Around-the-clock systems monitoring across our synchronized London (UTC+0) and Islamabad (UTC+5) watchdesks, tracking optical attenuation, server thermals, and microservice tail latency.',
    sub1: '24/7/365 Network & Security Operations oversight',
    sub2: 'Zero-downtime CVE firmware & kernel patching',
    sub3: 'Full Layer 1 optical to Layer 9 trace observability',
    sub4: 'Quarterly DR drills & sub-15m P1 containment',
    bar1: '99%',
    bar2: '98%',
  },
];

export default function Home() {
  const [activeNodeId, setActiveNodeId] = useState('HQ');
  const activeNode = nodeData[activeNodeId] || nodeData.HQ;

  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const activeService = serviceTabs[activeServiceIdx];

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

    setTimeout(() => setTraceStep(2), 400);
    setTimeout(() => setTraceStep(3), 800);
    setTimeout(() => {
      setTraceStep(4);
      setIsTracing(false);
      playUiChime('success');
    }, 1200);
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
      {/* 01. ARCHITECTURAL SPLIT HERO */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest py-14 lg:py-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                  MIHORA.TECH · Founded by M. Matti ul Hasnain &amp; Omema Iqbal
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-[3.5rem] text-on-surface tracking-tight leading-[1.08]">
                  Engineering Digital Systems &amp; Physical Infrastructure Without Compromise
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                  Operating synchronized sovereign command hubs in <strong className="text-on-surface font-semibold">London (UK)</strong> and <strong className="text-on-surface font-semibold">Islamabad (Pakistan)</strong>. We design distributed cloud platforms, terminate optical datacenter backbones, automate industrial telemetry, and maintain 24/7 field operations.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Link
                    to="/contact"
                    onClick={() => playUiChime('click')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg text-sm shadow-sm transition-all cursor-pointer"
                  >
                    <span>Schedule Architecture Review</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/services"
                    onClick={() => playUiChime('click')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-surface-container hover:bg-surface-container-high border border-outline/30 hover:border-primary/50 text-on-surface font-semibold rounded-lg text-sm transition-all cursor-pointer"
                  >
                    <span>Explore 5 Service Divisions</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Hero Architectural Visual + Compact Hub Telemetry */}
            <div className="lg:col-span-5 space-y-4">
              <Reveal direction="left">
                <div className="rounded-2xl overflow-hidden border border-outline/25 bg-surface-container-low shadow-xl">
                  <ParallaxFrame offset={22} className="aspect-[16/10] w-full">
                    <img
                      src={VISUAL_ASSETS.heroDatacenterHall}
                      alt="Sovereign datacenter server hall engineered by MIHORA.TECH"
                      className="w-full h-full object-cover"
                    />
                  </ParallaxFrame>

                  {/* Synchronized Hub Telemetry Strip */}
                  <div className="p-4 bg-surface-container-lowest border-t border-outline/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-primary">
                        Dual-Hub Operations Status
                      </span>
                      <div className="flex items-center gap-1 bg-surface-container p-0.5 rounded-lg border border-outline/20">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveHubView('LON');
                            playUiChime('switch');
                          }}
                          className={clsx(
                            'px-2.5 py-0.5 rounded font-mono text-[10px] font-bold transition-all cursor-pointer',
                            activeHubView === 'LON'
                              ? 'bg-primary text-white'
                              : 'text-on-surface-variant hover:text-on-surface'
                          )}
                        >
                          LON
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveHubView('ISB');
                            playUiChime('switch');
                          }}
                          className={clsx(
                            'px-2.5 py-0.5 rounded font-mono text-[10px] font-bold transition-all cursor-pointer',
                            activeHubView === 'ISB'
                              ? 'bg-primary text-white'
                              : 'text-on-surface-variant hover:text-on-surface'
                          )}
                        >
                          ISB
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                      <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline/15">
                        <div className="text-on-surface-variant text-[10px]">ACTIVE HUB</div>
                        <div className="font-bold text-on-surface mt-0.5">
                          {activeHubView === 'LON' ? 'London, UK' : 'Islamabad, PK'}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline/15">
                        <div className="text-on-surface-variant text-[10px]">QUORUM SLA</div>
                        <div className="font-bold text-primary mt-0.5 tabular-nums">99.999%</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline/15">
                        <div className="text-on-surface-variant text-[10px]">CORRIDOR RTT</div>
                        <div className="font-bold text-on-surface mt-0.5 tabular-nums">{livePing} ms</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Empirical Benchmarks Strip with Animated Counters */}
          <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StaggerItem>
              <Link
                to="/status"
                className="block p-5 rounded-xl bg-surface-container-low border border-outline/20 hover:border-primary/40 transition-colors space-y-1 cursor-pointer"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">
                  Quorum Availability
                </div>
                <div className="font-headline text-2xl sm:text-3xl font-extrabold text-primary">
                  <AnimatedCounter target={99.999} decimals={3} suffix="%" />
                </div>
                <div className="text-xs text-on-surface-variant">Synchronized dual-hub custody</div>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link
                to="/case-studies"
                className="block p-5 rounded-xl bg-surface-container-low border border-outline/20 hover:border-primary/40 transition-colors space-y-1 cursor-pointer"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">
                  Certified Cable Span
                </div>
                <div className="font-headline text-2xl sm:text-3xl font-extrabold text-primary">
                  <AnimatedCounter target={250000} suffix="+ m" />
                </div>
                <div className="text-xs text-on-surface-variant">Bidirectional OTDR verified</div>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link
                to="/services/physical-infrastructure"
                className="block p-5 rounded-xl bg-surface-container-low border border-outline/20 hover:border-primary/40 transition-colors space-y-1 cursor-pointer"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">
                  Production Racks
                </div>
                <div className="font-headline text-2xl sm:text-3xl font-extrabold text-primary">
                  <AnimatedCounter target={1200} suffix="+" />
                </div>
                <div className="text-xs text-on-surface-variant">High-density 42U/48U commissioning</div>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link
                to="/services/field-engineering"
                className="block p-5 rounded-xl bg-surface-container-low border border-outline/20 hover:border-primary/40 transition-colors space-y-1 cursor-pointer"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">
                  Mean Splice Loss
                </div>
                <div className="font-headline text-2xl sm:text-3xl font-extrabold text-primary tabular-nums">
                  &le; 0.03 dB
                </div>
                <div className="text-xs text-on-surface-variant">4-hour field emergency dispatch</div>
              </Link>
            </StaggerItem>
          </StaggerGrid>

          {/* 02. INTERACTIVE GLOBAL ENGINEERING NETWORK & ROUTE TRACER */}
          <Reveal>
            <div className="relative w-full bg-surface-container-low border border-outline/25 p-5 sm:p-7 rounded-2xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 gap-4 border-b border-outline/20">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                    Interactive Optical Topology Explorer
                  </div>
                  <h2 className="font-headline text-xl sm:text-2xl text-on-surface font-extrabold tracking-tight mt-0.5">
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
                        'px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer font-bold',
                        activeNodeId === id
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-outline/25'
                      )}
                    >
                      {id}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => runFiberTrace()}
                    disabled={isTracing}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border border-emerald-600/30 hover:bg-emerald-600/20 font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-1"
                  >
                    <Play size={12} className={isTracing ? 'animate-spin' : ''} />
                    <span>{isTracing ? 'Tracing...' : 'Trace Route'}</span>
                  </button>
                </div>
              </div>

              <div className="relative w-full h-[360px] md:h-[440px] bg-surface-container-lowest rounded-xl overflow-hidden flex items-center justify-center border border-outline/25 mt-5">
                <svg className="w-full h-full relative z-10" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 500">
                  <g className="opacity-25" stroke="currentColor" strokeDasharray="4,4" strokeWidth="1.2">
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-3 left-3 right-3 md:right-auto md:w-96 bg-surface-container/95 backdrop-blur-md p-4 rounded-xl border border-outline/30 shadow-xl"
                  >
                    <div className="flex items-center justify-between pb-1">
                      <span className="font-mono text-xs text-primary font-semibold">{activeNode.code}</span>
                      <span className="font-mono text-xs font-bold text-primary">{activeNode.ping} ms</span>
                    </div>
                    <div className="font-headline text-base text-on-surface font-bold">{activeNode.title}</div>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{activeNode.desc}</p>

                    <div className="mt-2.5 pt-2 border-t border-outline/20 space-y-1">
                      <div className="text-[10px] font-mono text-on-surface-variant font-semibold uppercase">
                        Primary Route Path · {livePackets.toLocaleString()} Packets Audited
                      </div>
                      <div className="text-[11px] font-mono text-on-surface bg-surface-container-highest/60 p-1.5 rounded border border-outline/20">
                        {activeNode.hops.join(' -> ')}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {isTracing && (
                <div className="mt-3 p-3 rounded-xl bg-surface-container-highest/70 border border-primary/30 font-mono text-xs flex items-center justify-between">
                  <span className="text-primary font-semibold">
                    Executing live path trace to {activeNodeId} ({activeNode.title})...
                  </span>
                  <span className="text-on-surface-variant">Hop {traceStep} / 4</span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03. EXECUTIVE FOUNDERS SPOTLIGHT */}
      <section className="w-full bg-surface py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                <Users size={14} />
                <span>Founding Vision &amp; Executive Accountability</span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
                Co-Founded for End-to-End Engineering Custody
              </h2>
              <p className="text-base text-on-surface-variant leading-relaxed">
                MIHORA.TECH was established by <strong className="text-on-surface">M. Matti ul Hasnain</strong> and <strong className="text-on-surface">Omema Iqbal</strong> to unite systems software engineering with physical datacenter hardware and multi-jurisdiction governance.
              </p>
            </div>

            <Link
              to="/company"
              onClick={() => playUiChime('click')}
              className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Read Company &amp; Founders Story</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="surface-card p-7 space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <img
                      src="/founder-matti.jpg"
                      alt="M. Matti ul Hasnain, Co-Founder and Principal Systems Architect at MIHORA.TECH"
                      width={72}
                      height={72}
                      loading="lazy"
                      className="w-18 h-18 rounded-2xl object-cover border border-outline/25 shrink-0"
                    />
                    <div className="text-right font-mono text-xs">
                      <div className="text-primary font-bold">Co-Founder &amp; Principal Architect</div>
                      <div className="text-on-surface-variant mt-0.5">UK &amp; Pakistan Hubs</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-headline text-2xl font-extrabold text-on-surface">
                      M. Matti ul Hasnain
                    </h3>
                    <p className="font-mono text-xs text-primary font-semibold mt-0.5">
                      Systems &amp; Physical Infrastructure Architecture
                    </p>
                  </div>

                  <blockquote className="text-sm text-on-surface italic p-4 rounded-xl bg-surface-container-low border border-outline/20 leading-relaxed">
                    &ldquo;We founded MIHORA to eliminate the brittle gap between abstract software code and physical reality. We architect sovereign backends, and our teams personally splice and certify the optical plant.&rdquo;
                  </blockquote>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Directs technical architecture across distributed Go/TypeScript platforms, bare-metal Tier III/IV datacenters, OTDR-verified fiber rings, and field dispatch operations.
                  </p>
                </div>

                <div className="pt-3 border-t border-outline/15 font-mono text-xs text-on-surface-variant">
                  Sovereign Cloud · Datacenter Hardware · Field Dispatch · Zero-Trust Security
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="surface-card p-7 space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <img
                      src="/founder-omema.jpg"
                      alt="Omema Iqbal, Co-Founder and Operations Director at MIHORA.TECH"
                      width={72}
                      height={72}
                      loading="lazy"
                      className="w-18 h-18 rounded-2xl object-cover border border-outline/25 shrink-0"
                    />
                    <div className="text-right font-mono text-xs">
                      <div className="text-primary font-bold">Co-Founder &amp; Operations Director</div>
                      <div className="text-on-surface-variant mt-0.5">Global Governance</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-headline text-2xl font-extrabold text-on-surface">
                      Omema Iqbal
                    </h3>
                    <p className="font-mono text-xs text-primary font-semibold mt-0.5">
                      Enterprise Strategy &amp; Dual-Hub Delivery
                    </p>
                  </div>

                  <blockquote className="text-sm text-on-surface italic p-4 rounded-xl bg-surface-container-low border border-outline/20 leading-relaxed">
                    &ldquo;Resilient engineering is only as reliable as the operational governance behind it. Our dual-hub framework guarantees deterministic SLA delivery across borders.&rdquo;
                  </blockquote>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Oversees MIHORA.TECH&apos;s London and Islamabad operational delivery chains, regulatory alignment, strategic enterprise alliances, and 24/7 staffing orchestration.
                  </p>
                </div>

                <div className="pt-3 border-t border-outline/15 font-mono text-xs text-on-surface-variant">
                  Dual-Hub Governance · Cross-Border Delivery · Compliance · Enterprise Alliances
                </div>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* 04. DUAL-HEMISPHERE MODEL (VISUAL ASSETS) */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Architectural Unity
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
              From Distributed Software To Physical Terrain
            </h2>
            <p className="text-base text-on-surface-variant leading-relaxed">
              Most engineering vendors stop at cloud abstractions, while cabling contractors ignore runtime reliability. MIHORA integrates both hemispheres seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-stretch">
            <div className="lg:col-span-5 surface-card p-6 sm:p-7 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-primary font-semibold">
                  <span>Hemisphere 01 · Digital Platforms</span>
                  <Terminal size={17} />
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface">
                  Software &amp; Applied Intelligence
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  High-throughput distributed systems, federated gateways, private AI pipelines, and sovereign source custody.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between border border-outline/15">
                    <span className="font-medium text-on-surface">Web Platforms &amp; APIs</span>
                    <span className="font-mono text-primary font-semibold">React 19 / Go / gRPC</span>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between border border-outline/15">
                    <span className="font-medium text-on-surface">Event &amp; AI Pipelines</span>
                    <span className="font-mono text-primary font-semibold">Kafka / Private LLM</span>
                  </div>
                </div>
              </div>
              <div className="h-48 rounded-xl overflow-hidden border border-outline/20">
                <img
                  src={VISUAL_ASSETS.sovereignCommandHub}
                  alt="MIHORA digital systems operations studio"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-1 flex items-center justify-center py-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center">
                <RefreshCw size={22} />
              </div>
            </div>

            <div className="lg:col-span-5 surface-card p-6 sm:p-7 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-primary font-semibold">
                  <span>Hemisphere 02 · Physical Infrastructure</span>
                  <Router size={17} />
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface">
                  Datacenter Hardware &amp; Optics
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Server racks, OTDR-verified dark fiber backbones, industrial edge telemetry, and rapid field dispatch.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between border border-outline/15">
                    <span className="font-medium text-on-surface">Compute &amp; Switching</span>
                    <span className="font-mono text-primary font-semibold">EVPN-VXLAN / SAN</span>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between border border-outline/15">
                    <span className="font-medium text-on-surface">Edge &amp; Field Dispatch</span>
                    <span className="font-mono text-primary font-semibold">OTDR &le; 0.03 dB / 4h SLA</span>
                  </div>
                </div>
              </div>
              <div className="h-48 rounded-xl overflow-hidden border border-outline/20">
                <img
                  src={VISUAL_ASSETS.fieldEngineeringEdge}
                  alt="Ruggedized edge telemetry enclosure deployed in industrial facilities"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. INTERACTIVE ARCHITECTURE SCOPE CONFIGURATOR */}
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
            <div className="lg:col-span-7 space-y-6 bg-surface-container-lowest p-6 sm:p-7 rounded-2xl border border-outline/25">
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

            <div className="lg:col-span-5 bg-surface-container-lowest p-6 sm:p-7 rounded-2xl border border-primary/30 shadow-lg space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-outline/20">
                <span className="font-mono text-xs font-bold text-primary uppercase">
                  Recommended Reference Spec
                </span>
                <span className="font-mono text-[11px] text-on-surface-variant">Sovereign Baseline</span>
              </div>

              <div className="space-y-3 font-mono">
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/15">
                  <div className="text-[10px] text-on-surface-variant uppercase font-semibold">
                    Target Latency Profile
                  </div>
                  <div className="text-base font-bold text-primary mt-0.5">{configSpecs.latency}</div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/15">
                  <div className="text-[10px] text-on-surface-variant uppercase font-semibold">
                    Reliability Target
                  </div>
                  <div className="text-sm font-bold text-on-surface mt-0.5">{configSpecs.uptime}</div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/15">
                  <div className="text-[10px] text-on-surface-variant uppercase font-semibold">
                    Primary Architecture Stack
                  </div>
                  <div className="text-xs font-semibold text-on-surface mt-0.5 leading-relaxed">
                    {configSpecs.stack}
                  </div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/15">
                  <div className="text-[10px] text-on-surface-variant uppercase font-semibold">
                    Execution &amp; Handover
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{configSpecs.turnaround}</div>
                </div>
              </div>

              <a
                href={`mailto:hr@mihora.tech?subject=Architecture%20Scope%20Inquiry%20(${configDomain.toUpperCase()}%20-%20${configRegion.toUpperCase()})`}
                onClick={() => playUiChime('click')}
                className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-xs text-center flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Mail size={15} />
                <span>Send Scope to hr@mihora.tech</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 06. INTERACTIVE SERVICE DIVISIONS EXPLORER */}
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
              <span>Browse All 29 Capabilities</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 bg-surface-container-low p-2 rounded-xl font-mono border border-outline/25">
            {SERVICE_DIVISIONS.map((div, idx) => (
              <button
                key={div.slug}
                type="button"
                className={clsx(
                  'py-3 px-3 text-center rounded-lg transition-all font-semibold text-xs cursor-pointer',
                  activeServiceIdx === idx
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                )}
                onClick={() => {
                  setActiveServiceIdx(idx);
                  playUiChime('click');
                }}
              >
                {div.shortTitle}
              </button>
            ))}
          </div>

          <div className="bg-surface-container-low border border-outline/25 p-6 sm:p-8 rounded-2xl shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeServiceIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {[
                      { k: '01 · Core Build', v: activeService.sub1 },
                      { k: '02 · Architecture', v: activeService.sub2 },
                      { k: '03 · Integration', v: activeService.sub3 },
                      { k: '04 · Verification', v: activeService.sub4 },
                    ].map((row) => (
                      <div
                        key={row.k}
                        className="p-3.5 bg-surface-container-lowest border border-outline/20 rounded-xl"
                      >
                        <span className="font-mono text-[11px] text-primary block font-bold">{row.k}</span>
                        <span className="text-sm text-on-surface font-medium">{row.v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <Link
                      to={`/services/${activeService.slug}`}
                      onClick={() => playUiChime('click')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
                    >
                      <span>Open Full {SERVICE_DIVISIONS[activeServiceIdx].shortTitle} Spec</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-surface-container-lowest border border-outline/25 p-5 rounded-xl space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="font-semibold">Division Telemetry Profile</span>
                    <span className="text-primary font-bold">Active Custody</span>
                  </div>
                  <div className="space-y-3 py-2">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-on-surface-variant">Automation &amp; Verification</span>
                        <span className="text-primary font-bold">{activeService.bar1}</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-500" style={{ width: activeService.bar1 }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-on-surface-variant">Redundancy Compliance</span>
                        <span className="text-primary font-bold">{activeService.bar2}</span>
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

      {/* 07. THE 9-LAYER ENGINEERING STACK + PHYSICAL FIELD SHOWCASE */}
      <section className="w-full bg-surface py-16 lg:py-24 border-b border-outline/20">
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

              <div className="space-y-2 pt-2">
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
                      className={clsx(
                        'p-4 rounded-xl cursor-pointer transition-all border',
                        isExpanded
                          ? 'bg-surface-container-lowest border-primary shadow-sm'
                          : 'bg-surface-container-low hover:bg-surface-container border-outline/20'
                      )}
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
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 mt-3 border-t border-outline/15 space-y-1 text-sm text-on-surface-variant">
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
              <div className="rounded-2xl overflow-hidden border border-outline/25 bg-surface-container-lowest shadow-lg">
                <img
                  src={VISUAL_ASSETS.fiberOpticsHardware}
                  alt="Certified high-density optical fiber patch array and QSFP transceivers"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <div className="p-6 space-y-3">
                  <div className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                    Physical Survival Meets Code Precision
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">
                    Zero Assumptions. Verified at Every Span.
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Software fails when physical transport degrades. Every datacenter deployment and structured fiber installation leaves our custody with bidirectional OTDR trace records and thermal load verification.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      to="/engineering"
                      className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>Explore 9-Layer Engineering</span>
                      <ArrowRight size={13} />
                    </Link>
                    <Link
                      to="/resources"
                      className="text-xs font-semibold text-on-surface-variant hover:text-on-surface"
                    >
                      View OTDR Standards →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08. AEO DIRECT QUESTIONS STRIP & FINAL CTA */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-24">
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
                Yes. All custom software repositories, Terraform manifests, and physical cabling certification traces remain under full client intellectual property and cryptographic ownership.
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
                Every engagement begins with Phase 01 Discovery &amp; Threat Modeling, followed by a transparent fixed-scope blueprint.{' '}
                <Link to="/how-it-works" className="text-primary font-semibold hover:underline">
                  Read our 5-phase methodology →
                </Link>
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 rounded-2xl bg-surface-container-low border border-outline/25 text-center space-y-5 max-w-4xl mx-auto">
            <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Direct Engineering Engagement
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
              Tell Us What You&apos;re Building
            </h2>
            <p className="text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Digital systems, Tier III/IV datacenter builds, private automation pipelines, or 24/7 managed SRE across international hubs.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                onClick={() => playUiChime('click')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg text-sm shadow-sm transition-all cursor-pointer"
              >
                <span>Schedule Architecture Consultation</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="mailto:hr@mihora.tech?subject=MIHORA%20Architecture%20Inquiry"
                onClick={() => playUiChime('click')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface font-semibold rounded-lg text-sm transition-all cursor-pointer"
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
