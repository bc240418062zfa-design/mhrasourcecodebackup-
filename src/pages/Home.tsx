import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Cpu, Terminal, Pointer, ShieldCheck, Gauge, 
  Network, Globe, Shield, Router, RefreshCw, Grid, Smartphone,
  PenTool, Split, Bot, Factory, Brain, List, Server, Database, 
  Building, Cloud, Eye, Settings, Wrench, Ruler, Cable, Video, 
  AlertTriangle, HardHat, Headset, Monitor, ArrowDown, Users, 
  PencilRuler, Hospital, Store, GraduationCap, Mail, Zap, ArrowUpRight,
  Activity, RefreshCcw, Wifi, Radio, Layers, CheckCircle2, Award,
  Sparkles, Sliders, Play, CornerDownRight, BarChart3, Compass
} from 'lucide-react';
import { playUiChime } from '../utils/audio';

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
    code: "// DUAL CORE HUB: PK-ISB-01",
    title: "Pakistan Systems Architecture Hub",
    desc: "Core architectural authority, systems telemetry operations center, R&D simulation laboratories, and global dispatch command.",
    lat: "33.6844° N",
    lon: "73.0479° E",
    ping: 18.2,
    hops: ["UK-LON-01 (Direct Subsea Terrestrial)", "FRA-DE-02 (Optical IXP)", "DXB-UAE-01 (Gulf Transit)", "PK-ISB-01 (Command Hub)"],
    role: "CORE ARCHITECTURE & TELEMETRY"
  },
  LON: {
    code: "// DUAL CORE HUB: UK-LON-01",
    title: "United Kingdom Engineering Hub",
    desc: "EMEA operations headquarters, European enterprise delivery, regulatory ISO compliance alignment, and strategic engineering delivery.",
    lat: "51.5074° N",
    lon: "0.1278° W",
    ping: 17.8,
    hops: ["PK-ISB-01 (Trans-Continental Fiber)", "MRS-FR-01 (Marseille Gateway)", "LDN-UK-01 (Telehouse North)"],
    role: "EMEA HEADQUARTERS & STRATEGY"
  },
  DXB: {
    code: "// TRANSIT: GCC-UAE-DXB",
    title: "Dubai Operations Corridors",
    desc: "Middle Eastern infrastructure deployments, surveillance logistics, and low-voltage field contractor dispatch.",
    lat: "25.2048° N",
    lon: "55.2708° E",
    ping: 24.1,
    hops: ["PK-ISB-01 (Arabian Sea Optical Backbone)", "DXB-UAE-01 (Smart Transit)"],
    role: "GCC REGIONAL DISPATCH"
  },
  SIN: {
    code: "// TRANSIT: APAC-SG-SIN",
    title: "Singapore Cloud Bridge",
    desc: "Asia-Pacific optical peering node, edge CDN acceleration, and high-frequency real-time routing monitoring.",
    lat: "1.3521° N",
    lon: "103.8198° E",
    ping: 36.5,
    hops: ["PK-ISB-01 (Bay of Bengal Subsea)", "SIN-EQUINIX-SG1"],
    role: "APAC OPTICAL PEERING"
  },
  NYC: {
    code: "// GATEWAY: NA-USA-NYC",
    title: "New York Systems Terminal",
    desc: "North American financial technology integrations, institutional database synchronizations, and SLA coordination.",
    lat: "40.7128° N",
    lon: "74.0060° W",
    ping: 68.2,
    hops: ["UK-LON-01 (Transatlantic Cable TAT-14)", "NYC-111-8TH-AVE"],
    role: "NORTH AMERICA TRANSIT"
  },
  TYO: {
    code: "// SATELLITE: APAC-JP-TYO",
    title: "Tokyo Edge Gateway",
    desc: "Hardware telemetry analysis, automated vision pipelines, and industrial robotics integration monitoring.",
    lat: "35.6762° N",
    lon: "139.6503° E",
    ping: 72.4,
    hops: ["SIN-SG-01 (Trans-Pacific Fiber)", "TYO-OTEMACHI-IXP"],
    role: "INDUSTRIAL VISION SATELLITE"
  }
};

const services = [
  {
    tag: "DISCIPLINE: DE-01",
    sub: "SOVEREIGN SOFTWARE ENGINEERING",
    headline: "Full-Lifecycle Digital Engineering",
    body: "We design, construct, and harden sovereign software platforms, cloud architectures, mobile native ecosystems, and micro-API mesh environments that resist failure under extreme concurrent scale.",
    sub1: "Custom enterprise web, SaaS, & native systems",
    sub2: "Event-driven, distributed message queues, zero-trust",
    sub3: "Heterogeneous system orchestration and legacy bridge",
    sub4: "Continuous CI/CD, fuzz testing, static security analysis",
    bar1: "94%",
    bar2: "100%"
  },
  {
    tag: "DISCIPLINE: AI-02",
    sub: "AUTONOMOUS INDUSTRIAL INTELLIGENCE",
    headline: "Automation & Predictive Intelligence",
    body: "Empowering manual industrial systems with automated workflows, real-time OCR telemetry, automated QA inspection gates, and localized algorithmic models running directly at the edge.",
    sub1: "Robotic process automation & edge vision triggers",
    sub2: "Document parsing, OCR, and classification meshes",
    sub3: "Automated alert resolution & algorithmic dispatch",
    sub4: "Air-gapped on-premise model execution environments",
    bar1: "98%",
    bar2: "89%"
  },
  {
    tag: "DISCIPLINE: IN-03",
    sub: "MISSION-CRITICAL HARDWARE MATRICES",
    headline: "Infrastructure & Server Deployment",
    body: "Physical rack architectures, fiber optic distribution backbones, enterprise storage clusters, and high-availability power redundancies engineered for continuous operation.",
    sub1: "Data center server racks, PDUs, and containment",
    sub2: "Structured Cat6A and single-mode optical fiber trunking",
    sub3: "Cisco, Arista, and Juniper enterprise switches",
    sub4: "Uninterruptible power supply (UPS) failover grids",
    bar1: "100%",
    bar2: "99.9%"
  },
  {
    tag: "DISCIPLINE: FE-04",
    sub: "HANDS-ON PHYSICAL RIGS",
    headline: "Tactical Field Engineering Rigs",
    body: "Physical presence when software alone cannot resolve the issue. Certified field technicians on-site for emergency break-fix, equipment termination, surveillance mounting, and physical validation.",
    sub1: "On-site 4-hour SLA emergency break-fix response",
    sub2: "Enterprise CCTV, NVR, and biometric access deployment",
    sub3: "Subterranean and aerial cabling installation",
    sub4: "RF spectrum sweeps & wireless site surveys",
    bar1: "91%",
    bar2: "95%"
  },
  {
    tag: "DISCIPLINE: MT-05",
    sub: "CONTINUOUS TELEMETRY OPS",
    headline: "Sovereign Managed Technology & NOC",
    body: "Around-the-clock systems monitoring from our dual UK & Pakistani NOC hubs, tracking packet latencies, server thermals, database health, and cyber perimeter anomalies in real-time.",
    sub1: "24/7/365 Network Operations Center (NOC) oversight",
    sub2: "Automated patch orchestration & vulnerability mitigation",
    sub3: "Remote desktop & hardware asset lifecycle management",
    sub4: "Disaster recovery replication & encrypted hot spares",
    bar1: "99.99%",
    bar2: "96%"
  }
];

export default function Home() {
  const [activeNodeId, setActiveNodeId] = useState('HQ');
  const activeNode = nodeData[activeNodeId] || nodeData['HQ'];
  
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const activeService = services[activeServiceIdx];

  const [expandedStack, setExpandedStack] = useState<number | null>(null);

  // Live telemetry simulation
  const [livePing, setLivePing] = useState(18.4);
  const [livePackets, setLivePackets] = useState(248190);
  const [activeHubView, setActiveHubView] = useState<'LON' | 'ISB'>('ISB');

  // Interactive Route Tracer Simulation
  const [isTracing, setIsTracing] = useState(false);
  const [traceStep, setTraceStep] = useState(0);
  const [traceComplete, setTraceComplete] = useState(false);

  // Interactive Scope Configurator state
  const [configDomain, setConfigDomain] = useState<'software' | 'hardware' | 'ai' | 'field'>('software');
  const [configRegion, setConfigRegion] = useState<'uk' | 'pak' | 'gcc' | 'global'>('global');
  const [configSla, setConfigSla] = useState<'emergency' | 'noc' | 'cluster'>('cluster');

  // Realized Architecture Case Study tab
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLivePing(Number((17.3 + Math.random() * 2.1).toFixed(1)));
      setLivePackets(prev => prev + Math.floor(Math.random() * 18) + 7);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const handleSelectNode = (nodeId: string) => {
    playUiChime('click');
    setActiveNodeId(nodeId);
    runFiberTrace(nodeId);
  };

  const runFiberTrace = (nodeId: string) => {
    setIsTracing(true);
    setTraceComplete(false);
    setTraceStep(1);
    playUiChime('ping');

    setTimeout(() => {
      setTraceStep(2);
      playUiChime('trace');
    }, 450);

    setTimeout(() => {
      setTraceStep(3);
      playUiChime('trace');
    }, 900);

    setTimeout(() => {
      setTraceStep(4);
      setIsTracing(false);
      setTraceComplete(true);
      playUiChime('success');
    }, 1400);
  };

  const toggleStack = (index: number) => {
    playUiChime('click');
    setExpandedStack(prev => prev === index ? null : index);
  };

  // Configurator dynamic calculations
  const getConfigDetails = () => {
    let latency = "< 18.5 ms";
    let uptime = "99.998%";
    let stack = "TypeScript • Next.js • Go • Kubernetes • WireGuard Mesh";
    let turnaround = "Continuous SRE & Sprint Alignment";

    if (configDomain === 'hardware') {
      stack = "Cisco Catalyst • Arista 7050 • Cat6A Fluke • APC Smart-UPS";
      latency = "< 0.4 ms LAN Fabric";
      turnaround = "4-Hour Dispatch SLA";
    } else if (configDomain === 'ai') {
      stack = "Edge TensorRT • Real-time OCR • Kafka Event Bus • Python Fast-API";
      latency = "Sub-100ms Inference";
      turnaround = "Air-Gapped Sovereign Deployment";
    } else if (configDomain === 'field') {
      stack = "Fluke DSX-8000 • Fujikura Fiber Splicer • 4x4 Engineering Truck Rig";
      latency = "4-Hour Truck Roll Guarantee";
      turnaround = "Emergency Hardware Termination";
    }

    if (configRegion === 'uk') {
      uptime = "99.999% (London Telehouse Core)";
    } else if (configRegion === 'pak') {
      uptime = "99.999% (Islamabad Systems Command)";
    } else if (configRegion === 'global') {
      uptime = "100% Redundant Dual-Hub Synchronized";
    }

    return { latency, uptime, stack, turnaround };
  };

  const configSpecs = getConfigDetails();

  return (
    <div className="flex flex-col w-full">
      {/* 01. HERO SECTION & DUAL-HUB COMMAND */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest py-space-xl lg:py-24 bg-tech-grid">
        {/* Soft Ambient Radiance */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-primary/15 via-secondary/10 to-transparent blur-3xl opacity-70"></div>
        <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-primary/10 blur-[140px]"></div>

        <div className="w-full px-margin-mobile lg:px-margin relative z-10 space-y-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 space-y-space-md"
            >
              {/* Prestigious Verified Dual-Hub Badge */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 bg-surface-container border border-outline rounded-full shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono font-bold">
                  DUAL-HUB SOVEREIGN ARCHITECTURE
                </span>
                <span className="text-outline text-label-sm">|</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                  LONDON (UK) &bull; ISLAMABAD (PK)
                </span>
              </div>

              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight uppercase font-extrabold max-w-4xl drop-shadow-sm">
                MIHORA &mdash; Sovereign Engineering
              </h1>

              <p className="font-headline-sm text-headline-sm text-primary font-medium max-w-2xl tracking-wide">
                Technology Without Boundaries. Digital systems &bull; Physical infrastructure.
              </p>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                MIHORA.TECH is an elite sovereign engineering authority operating synchronized command hubs across London and Islamabad. We architect resilient software platforms, construct mission-critical physical datacenters, deploy autonomous AI pipelines, and coordinate 24/7 global field operations across five continents.
              </p>

              {/* Call to Actions */}
              <div className="pt-space-sm flex flex-wrap items-center gap-space-md">
                <a 
                  href="mailto:hr@mihora.tech?subject=MIHORA%20Direct%20Architectural%20Dispatch%20Inquiry"
                  onClick={() => playUiChime('click')}
                  className="inline-flex items-center gap-space-sm px-7 py-4 btn-primary-gradient font-label-md text-label-md uppercase tracking-widest font-bold rounded-xl transition-all hover:scale-105 shadow-md active:scale-95"
                >
                  <Terminal size={17} />
                  <span>DISPATCH: HR@MIHORA.TECH</span>
                </a>
                
                <a 
                  href="#configurator"
                  onClick={() => playUiChime('click')}
                  className="inline-flex items-center gap-space-sm px-6 py-4 bg-surface-container hover:bg-surface-container-high border border-outline hover:border-primary text-on-surface hover:text-primary font-label-md text-label-md uppercase tracking-wider font-semibold rounded-xl backdrop-blur-md transition-all shadow-sm active:scale-95"
                >
                  <Sliders size={17} className="text-primary" />
                  <span>Interactive Configurator</span>
                  <ArrowDown size={15} className="text-primary animate-bounce" />
                </a>
              </div>
            </motion.div>

            {/* Telemetry Live HUD with Interactive Hub Switcher */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-4 bg-surface-container-low border border-outline p-space-md rounded-2xl space-y-space-sm shadow-xl backdrop-blur-md glow-card"
            >
              <div className="flex items-center justify-between pb-2 border-b border-outline/40">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-mono font-bold">
                    // LIVE DUAL-HUB TELEMETRY
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-surface-container p-0.5 rounded-lg border border-outline/50">
                  <button
                    onClick={() => { setActiveHubView('ISB'); playUiChime('switch'); }}
                    className={clsx(
                      "px-2 py-0.5 rounded font-mono text-[10px] font-bold transition-all",
                      activeHubView === 'ISB' ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                    )}
                  >
                    ISB
                  </button>
                  <button
                    onClick={() => { setActiveHubView('LON'); playUiChime('switch'); }}
                    className={clsx(
                      "px-2 py-0.5 rounded font-mono text-[10px] font-bold transition-all",
                      activeHubView === 'LON' ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                    )}
                  >
                    LON
                  </button>
                </div>
              </div>

              {/* Hub Detail Switch View */}
              <div className="p-2.5 rounded-xl bg-surface-container border border-outline/40 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-outline uppercase font-bold">
                    {activeHubView === 'ISB' ? 'COMMAND AUTHORITY' : 'EMEA HEADQUARTERS'}
                  </div>
                  <div className="text-xs font-bold text-on-surface">
                    {activeHubView === 'ISB' ? 'Islamabad, PK-ISB-01' : 'London, UK-LON-01'}
                  </div>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <div className="text-primary font-bold">
                    {activeHubView === 'ISB' ? '33.68° N, 73.04° E' : '51.50° N, 0.12° W'}
                  </div>
                  <div className="text-emerald-500 font-bold flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    ONLINE &bull; 100Gbps
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-xs font-mono text-label-sm">
                <div className="p-2.5 bg-surface-container rounded-lg border border-outline/30">
                  <span className="text-outline block text-[10px]">NETWORK QUORUM</span>
                  <span className="text-primary font-bold">99.998% UPTIME</span>
                </div>
                <div className="p-2.5 bg-surface-container rounded-lg border border-outline/30">
                  <span className="text-outline block text-[10px]">DISPATCH PING</span>
                  <span className="text-on-surface font-bold">{livePing} MS LIVE</span>
                </div>
                <div className="p-2.5 bg-surface-container rounded-lg border border-outline/30">
                  <span className="text-outline block text-[10px]">OPTICAL PACKETS</span>
                  <span className="text-on-surface font-semibold">{livePackets.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-surface-container rounded-lg border border-outline/30">
                  <span className="text-outline block text-[10px]">ENCRYPTION LAYER</span>
                  <span className="text-secondary font-bold">POST-QUANTUM</span>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-mono text-outline">
                  <span>BACKBONE THROUGHPUT CAPACITY</span>
                  <span className="text-primary font-bold">{Math.round((livePing / 25) * 100)}% SATURATION</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary via-secondary to-primary-fixed rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(25, (livePing / 25) * 100))}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* ========================================================================= */}
          {/* INTERACTIVE GLOBAL ENGINEERING NETWORK & ROUTE TRACER */}
          {/* ========================================================================= */}
          <div className="relative w-full bg-surface-container-low border border-outline p-space-md lg:p-space-lg rounded-2xl shadow-xl overflow-hidden glow-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-md gap-space-sm border-b border-outline/40">
              <div>
                <div className="font-label-sm text-label-sm text-primary uppercase font-mono tracking-widest font-bold">
                  // INTERACTIVE OPTICAL ROUTE TRACER
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase font-extrabold tracking-tight">
                  MIHORA Global Telemetry Mesh &amp; Packet Routing
                </h2>
              </div>
              
              {/* Quick Interactive Node Selector Pills */}
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                {Object.entries(nodeData).map(([id, info]) => (
                  <button
                    key={id}
                    onClick={() => handleSelectNode(id)}
                    className={clsx(
                      "px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold",
                      activeNodeId === id 
                        ? "bg-primary text-on-primary border-primary shadow-sm" 
                        : "bg-surface-container text-on-surface-variant hover:text-on-surface border-outline"
                    )}
                  >
                    {id}
                  </button>
                ))}

                <button
                  onClick={() => runFiberTrace(activeNodeId)}
                  disabled={isTracing}
                  className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 font-bold transition-all flex items-center gap-1 cursor-pointer ml-1"
                >
                  <Play size={11} className={isTracing ? "animate-spin" : ""} />
                  <span>{isTracing ? "TRACING..." : "TRACE ROUTE"}</span>
                </button>
              </div>
            </div>
            
            {/* SVG Interactive Canvas */}
            <div className="relative w-full h-[360px] md:h-[460px] bg-surface-container-lowest rounded-xl overflow-hidden flex items-center justify-center border border-outline/40 mt-space-md">
              <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern height="28" id="dotPattern" patternUnits="userSpaceOnUse" width="28">
                    <circle cx="2" cy="2" fill="currentColor" r="1.2" className="text-on-surface"></circle>
                  </pattern>
                </defs>
                <rect fill="url(#dotPattern)" height="100%" width="100%"></rect>
              </svg>
              
              <svg className="w-full h-full relative z-10" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 500">
                {/* Background Network Topology Grid */}
                <g className="opacity-30" stroke="currentColor" strokeDasharray="4,4" strokeWidth="1.2">
                  <line x1="580" x2="520" y1="240" y2="280"></line>
                  <line x1="580" x2="730" y1="240" y2="300"></line>
                  <line x1="480" x2="250" y1="170" y2="190"></line>
                  <line x1="580" x2="250" y1="240" y2="190"></line>
                  <line x1="580" x2="800" y1="240" y2="200"></line>
                  <line x1="480" x2="580" y1="170" y2="240"></line>
                </g>

                {/* Animated Dynamic Optical Data Flow Lines */}
                <line className="flow-line stroke-primary stroke-[3]" x1="480" x2="580" y1="170" y2="240" strokeDasharray="8,8"></line>
                <line className="flow-line-reverse stroke-secondary stroke-[2]" x1="580" x2="520" y1="240" y2="280" strokeDasharray="6,6"></line>
                <line className="flow-line stroke-secondary stroke-[2]" x1="580" x2="730" y1="240" y2="300" strokeDasharray="6,6"></line>
                <line className="flow-line-reverse stroke-primary stroke-[2]" x1="480" x2="250" y1="170" y2="190" strokeDasharray="6,6"></line>
                <line className="flow-line stroke-secondary stroke-[1.5]" x1="580" x2="800" y1="240" y2="200" strokeDasharray="6,6"></line>
                
                {/* Moving Optical Light Pulses */}
                <circle r="4" fill="#0055ff">
                  <animate attributeName="cx" values="480;580;480" dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="170;240;170" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#0284c7">
                  <animate attributeName="cx" values="580;730;580" dur="4.8s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="240;300;240" dur="4.8s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#0055ff">
                  <animate attributeName="cx" values="480;250;480" dur="5.2s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="170;190;170" dur="5.2s" repeatCount="indefinite" />
                </circle>

                {/* Concentric Radar Pulse Rings - Pakistan Hub */}
                <circle cx="580" cy="240" r="15" fill="none" stroke="#0055ff" strokeWidth="1.2">
                  <animate attributeName="r" values="8;55;70" dur="2.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.2;0" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <circle className="opacity-40" cx="580" cy="240" fill="none" r="45" stroke="#0055ff" strokeWidth="0.75"></circle>

                {/* Concentric Radar Pulse Rings - UK Hub */}
                <circle cx="480" cy="170" r="12" fill="none" stroke="#0284c7" strokeWidth="1.2">
                  <animate attributeName="r" values="6;45;60" dur="3.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.2;0" dur="3.2s" repeatCount="indefinite" />
                </circle>
                <circle className="opacity-40" cx="480" cy="170" fill="none" r="38" stroke="#0284c7" strokeWidth="0.75"></circle>
                
                {/* UK Hub Node */}
                <g className="cursor-pointer group" onClick={() => handleSelectNode('LON')} onMouseEnter={() => playUiChime('hover')}>
                  <circle className="opacity-30 animate-ping" cx="480" cy="170" fill="#0055ff" r="14"></circle>
                  <circle cx="480" cy="170" fill="#0055ff" r="8"></circle>
                  <circle cx="480" cy="170" fill="#ffffff" r="3.5"></circle>
                  <text fill="currentColor" className="text-primary font-bold" fontFamily="JetBrains Mono" fontSize="12" fontWeight="700" x="400" y="148">UK HUB: LONDON</text>
                  <text fill="currentColor" className="text-on-surface-variant opacity-80" fontFamily="JetBrains Mono" fontSize="9" x="400" y="160">51.5074° N, 0.1278° W</text>
                </g>

                {/* Pakistan Hub Node */}
                <g className="cursor-pointer group" onClick={() => handleSelectNode('HQ')} onMouseEnter={() => playUiChime('hover')}>
                  <circle className="opacity-30 animate-ping" cx="580" cy="240" fill="#0055ff" r="15"></circle>
                  <circle cx="580" cy="240" fill="#0055ff" r="8.5"></circle>
                  <circle cx="580" cy="240" fill="#ffffff" r="3.5"></circle>
                  <text fill="currentColor" className="text-primary font-bold" fontFamily="JetBrains Mono" fontSize="12" fontWeight="700" x="596" y="235">PK HUB: ISLAMABAD</text>
                  <text fill="currentColor" className="text-on-surface-variant opacity-80" fontFamily="JetBrains Mono" fontSize="9" x="596" y="247">33.6844° N, 73.0479° E</text>
                </g>

                {/* Regional Gateways */}
                <g className="cursor-pointer group" onClick={() => handleSelectNode('DXB')} onMouseEnter={() => playUiChime('hover')}>
                  <circle cx="520" cy="280" fill="#0284c7" r="5.5"></circle>
                  <text fill="currentColor" className="text-on-surface" fontFamily="JetBrains Mono" fontSize="10" x="532" y="285">DUBAI (GCC)</text>
                </g>
                <g className="cursor-pointer group" onClick={() => handleSelectNode('SIN')} onMouseEnter={() => playUiChime('hover')}>
                  <circle cx="730" cy="300" fill="#0284c7" r="5.5"></circle>
                  <text fill="currentColor" className="text-on-surface" fontFamily="JetBrains Mono" fontSize="10" x="742" y="305">SINGAPORE (APAC)</text>
                </g>
                <g className="cursor-pointer group" onClick={() => handleSelectNode('NYC')} onMouseEnter={() => playUiChime('hover')}>
                  <circle cx="250" cy="190" fill="#0055ff" r="5.5"></circle>
                  <text fill="currentColor" className="text-on-surface" fontFamily="JetBrains Mono" fontSize="10" x="170" y="180">NEW YORK (NA-E)</text>
                </g>
                <g className="cursor-pointer group" onClick={() => handleSelectNode('TYO')} onMouseEnter={() => playUiChime('hover')}>
                  <circle cx="800" cy="200" fill="#0284c7" r="5.5"></circle>
                  <text fill="currentColor" className="text-on-surface" fontFamily="JetBrains Mono" fontSize="10" x="812" y="205">TOKYO (JP)</text>
                </g>
              </svg>
              
              {/* Active Node Detail HUD */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeNodeId}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.22 }}
                  className="absolute bottom-3 left-3 right-3 md:right-auto md:w-96 bg-surface-container/95 backdrop-blur-md p-space-md rounded-xl border border-outline shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-label-sm text-label-sm text-primary font-mono font-bold">{activeNode.code}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface font-bold">{activeNode.title}</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">{activeNode.desc}</div>

                  {/* Route Hop Trace Preview */}
                  <div className="mt-2.5 pt-2 border-t border-outline/30 space-y-1">
                    <div className="text-[10px] font-mono text-outline font-bold flex items-center justify-between">
                      <span>PRIMARY OPTICAL ROUTE HOPS:</span>
                      <span className="text-primary">{activeNode.ping}ms</span>
                    </div>
                    <div className="text-[11px] font-mono text-on-surface bg-surface-container-highest/60 p-1.5 rounded border border-outline/30">
                      {activeNode.hops.join(' &rarr; ')}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 flex justify-between font-label-sm text-label-sm font-mono text-outline border-t border-outline/20">
                    <span>LAT: <span className="text-primary font-bold">{activeNode.lat}</span></span>
                    <span>LON: <span className="text-primary font-bold">{activeNode.lon}</span></span>
                    <span>STATE: <span className="text-emerald-500 font-bold">ACTIVE</span></span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Live Trace Terminal Bar */}
            {isTracing && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3 rounded-xl bg-surface-container-highest/80 border border-primary/40 font-mono text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-primary font-bold">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    ACTIVE ROUTE TRACE // NODE: {activeNodeId}
                  </span>
                  <span>STEP {traceStep}/4</span>
                </div>
                <div className="text-on-surface text-[11px]">
                  &gt; Ingesting latency matrix from UK-LON-01 &amp; PK-ISB-01 ... Verified 0% packet loss.
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 02. GLOBAL CAPABILITY TELEMETRY BAR */}
      <section className="w-full bg-surface-container-low py-space-sm overflow-hidden border-y border-outline/30">
        <div className="flex whitespace-nowrap gap-space-xl font-label-sm text-label-sm tracking-widest uppercase font-mono text-primary">
          <div className="flex items-center gap-space-lg animate-marquee">
            <span className="text-on-surface flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> DIGITAL ENGINEERING</span>
            <span className="text-outline">//</span>
            <span className="text-on-surface flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> INFRASTRUCTURE DEPLOYMENT</span>
            <span className="text-outline">//</span>
            <span className="text-on-surface flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> INDUSTRIAL AUTOMATION</span>
            <span className="text-outline">//</span>
            <span className="text-on-surface flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> FIELD ENGINEERING RIGS</span>
            <span className="text-outline">//</span>
            <span className="text-on-surface flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> MANAGED TECHNOLOGY &amp; NOC</span>
            <span className="text-outline">//</span>
            <span className="text-on-surface flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> GLOBAL DUAL-HUB DIRECTORY</span>
            <span className="text-outline">//</span>
          </div>
          <div aria-hidden="true" className="flex items-center gap-space-lg animate-marquee">
            <span className="text-on-surface flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> DIGITAL ENGINEERING</span>
            <span className="text-outline">//</span>
            <span className="text-on-surface flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> INFRASTRUCTURE DEPLOYMENT</span>
            <span className="text-outline">//</span>
            <span className="text-on-surface flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> INDUSTRIAL AUTOMATION</span>
            <span className="text-outline">//</span>
            <span className="text-on-surface flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> FIELD ENGINEERING RIGS</span>
            <span className="text-outline">//</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. EXECUTIVE FOUNDERS SPOTLIGHT */}
      {/* ========================================================================= */}
      <section className="w-full bg-surface-container-lowest py-space-xl lg:py-24 border-b border-outline/30">
        <div className="w-full px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div className="space-y-space-xs">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/30 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
                <Users size={14} />
                <span>FOUNDING VISION &amp; DUAL-HUB COMMAND</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold uppercase tracking-tight">
                MIHORA Executive Leadership
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Founded by <strong>M. Matti ul Hasnain</strong> and <strong>Omema Iqbal</strong> to unite deep software systems engineering with real-world physical infrastructure and global operational governance.
              </p>
            </div>
            
            <Link 
              to="/company" 
              onClick={() => playUiChime('click')}
              className="font-label-md text-label-md text-primary hover:text-primary-fixed uppercase tracking-wider font-bold inline-flex items-center gap-1 shrink-0"
            >
              <span>Explore Company History</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {/* Founder 1: M. Matti ul Hasnain */}
            <div className="bg-surface-container-low border border-outline hover:border-primary p-space-lg rounded-2xl space-y-space-md shadow-md hover:shadow-xl transition-all glow-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all pointer-events-none"></div>

              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  <img src="/founder-matti.jpg" alt="M. Matti ul Hasnain" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-xs px-3 py-1 bg-primary/10 text-primary border border-primary/30 rounded-full font-bold uppercase tracking-wider">
                    Co-Founder &bull; Principal Architect
                  </span>
                  <span className="text-[10px] font-mono text-outline mt-1">COMMAND: UK &amp; PK DUAL-HUB</span>
                </div>
              </div>

              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-extrabold uppercase tracking-tight group-hover:text-primary transition-colors">
                  M. Matti ul Hasnain
                </h3>
                <p className="font-mono text-xs text-primary font-bold mt-0.5">
                  SYSTEMS &amp; INFRASTRUCTURE ARCHITECTURE
                </p>
              </div>

              <blockquote className="font-body-sm text-body-sm text-on-surface italic border-l-2 border-primary pl-3 py-1 bg-surface-container/60 rounded-r-lg">
                &ldquo;We founded MIHORA to eliminate the dangerous divide between abstract software and physical reality. We architect the sovereign cloud, and we personally certify the copper.&rdquo;
              </blockquote>

              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Directs MIHORA.TECH&apos;s global engineering doctrine, mission-critical hardware deployments, high-throughput microservices, and 4-hour rapid field engineering operations.
              </p>

              <div className="pt-2 border-t border-outline/30 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface-container text-on-surface border border-outline/40">Sovereign Cloud</span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface-container text-on-surface border border-outline/40">Datacenter Racks</span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface-container text-on-surface border border-outline/40">Field Dispatch SLA</span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface-container text-on-surface border border-outline/40">Zero-Trust Network</span>
              </div>
            </div>

            {/* Founder 2: Omema Iqbal */}
            <div className="bg-surface-container-low border border-outline hover:border-secondary p-space-lg rounded-2xl space-y-space-md shadow-md hover:shadow-xl transition-all glow-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all pointer-events-none"></div>

              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-secondary/40 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  <img src="/founder-omema.jpg" alt="Omema Iqbal" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-xs px-3 py-1 bg-secondary/10 text-secondary border border-secondary/30 rounded-full font-bold uppercase tracking-wider">
                    Co-Founder &bull; Operations Director
                  </span>
                  <span className="text-[10px] font-mono text-outline mt-1">DIRECTORATE: GLOBAL GOVERNANCE</span>
                </div>
              </div>

              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-extrabold uppercase tracking-tight group-hover:text-secondary transition-colors">
                  Omema Iqbal
                </h3>
                <p className="font-mono text-xs text-secondary font-bold mt-0.5">
                  ENTERPRISE STRATEGY &amp; GLOBAL OPERATIONS
                </p>
              </div>

              <blockquote className="font-body-sm text-body-sm text-on-surface italic border-l-2 border-secondary pl-3 py-1 bg-surface-container/60 rounded-r-lg">
                &ldquo;Global technology architecture is only as dependable as the operational discipline governing it. Our dual-hub framework guarantees deterministic SLA delivery across international borders.&rdquo;
              </blockquote>

              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Directs MIHORA.TECH&apos;s dual-hub operational governance, multi-jurisdiction compliance alignment, enterprise client delivery frameworks, and strategic talent logistics.
              </p>

              <div className="pt-2 border-t border-outline/30 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface-container text-on-surface border border-outline/40">Global Delivery</span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface-container text-on-surface border border-outline/40">Dual-Hub Governance</span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface-container text-on-surface border border-outline/40">Cross-Border SLA</span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface-container text-on-surface border border-outline/40">Enterprise Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. OVERSIZED EDITORIAL BRAND STATEMENT */}
      <section className="w-full bg-surface py-space-xl lg:py-24">
        <div className="w-full px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="font-label-sm text-label-sm uppercase tracking-widest text-outline font-mono">// 01 CORE THESIS</div>
          <div className="space-y-space-sm max-w-5xl">
            <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight leading-none uppercase font-bold">
              From Digital Systems<br/>
              <span className="text-primary">To Physical Infrastructure.</span>
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl pt-space-sm">
              Most tech firms stop at software code. Traditional infrastructure groups fail at modern computing abstractions. MIHORA.TECH was founded to destroy this partition: unifying full-stack software architecture with hands-on mechanical, physical, and field-level operational mastery.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md pt-space-md">
            <div className="bg-surface-container border border-outline p-space-md rounded-xl space-y-2 group hover:border-primary transition-all glow-card">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-mono font-bold">PHASE_01</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              </div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-extrabold group-hover:text-primary transition-colors">DIGITAL</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Cloud fabrics, resilient microservices, modern frontends, edge algorithms.</p>
            </div>
            <div className="bg-surface-container border border-outline p-space-md rounded-xl space-y-2 group hover:border-primary transition-all glow-card">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-mono font-bold">PHASE_02</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              </div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-extrabold group-hover:text-primary transition-colors">PHYSICAL</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Server racks, structural cabling, sensor arrays, surveillance grids.</p>
            </div>
            <div className="bg-surface-container border border-outline p-space-md rounded-xl space-y-2 group hover:border-primary transition-all glow-card">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-mono font-bold">PHASE_03</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              </div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-extrabold group-hover:text-primary transition-colors">ENGINEERING</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Embedded logic, telemetry conduits, break-proof fault tolerances.</p>
            </div>
            <div className="bg-surface-container border border-outline p-space-md rounded-xl space-y-2 group hover:border-primary transition-all glow-card">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-mono font-bold">PHASE_04</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              </div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-extrabold group-hover:text-primary transition-colors">OPERATIONS</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Continuous field maintenance, 24/7 telemetry monitoring, global dispatch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. INTERACTIVE ARCHITECTURE SCOPE CONFIGURATOR */}
      {/* ========================================================================= */}
      <section id="configurator" className="w-full bg-surface-container-lowest py-space-xl lg:py-24 border-y border-outline/30">
        <div className="w-full px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="text-center max-w-3xl mx-auto space-y-space-xs">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-primary/10 text-primary border border-primary/30 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
              <Sliders size={14} />
              <span>SYSTEMS ARCHITECTURE GENERATOR</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold uppercase">
              Interactive Scope Configurator
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Select your system requirements to preview real-time architecture blueprints, estimated quorum latencies, and deployment frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start max-w-6xl mx-auto">
            {/* Control Selectors */}
            <div className="lg:col-span-7 space-y-space-md bg-surface-container-low p-space-lg rounded-2xl border border-outline shadow-md">
              {/* Step 1: Domain */}
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm uppercase font-mono font-bold text-primary flex items-center gap-1.5">
                  <span>01 // SELECT ARCHITECTURE DOMAIN</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'software', label: 'Cloud & Web Platforms', icon: Terminal },
                    { id: 'hardware', label: 'Datacenter Racks & Fiber', icon: Server },
                    { id: 'ai', label: 'Industrial AI & Vision', icon: Bot },
                    { id: 'field', label: 'Field Engineering 4h SLA', icon: Wrench },
                  ].map(item => {
                    const Icon = item.icon;
                    const isSelected = configDomain === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setConfigDomain(item.id as any); playUiChime('click'); }}
                        className={clsx(
                          "p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer",
                          isSelected 
                            ? "bg-primary text-on-primary border-primary shadow-sm" 
                            : "bg-surface-container hover:bg-surface-container-high border-outline text-on-surface"
                        )}
                      >
                        <Icon size={18} className={isSelected ? "text-on-primary" : "text-primary"} />
                        <span className="font-label-sm text-label-sm font-bold">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Deployment Region */}
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm uppercase font-mono font-bold text-primary flex items-center gap-1.5">
                  <span>02 // SELECT PRIMARY THEATRE</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'global', label: 'Dual-Hub Global' },
                    { id: 'uk', label: 'United Kingdom' },
                    { id: 'pak', label: 'Pakistan Core' },
                    { id: 'gcc', label: 'Middle East (GCC)' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => { setConfigRegion(item.id as any); playUiChime('click'); }}
                      className={clsx(
                        "p-2.5 rounded-xl border text-center font-mono text-xs font-bold transition-all cursor-pointer",
                        configRegion === item.id 
                          ? "bg-primary text-on-primary border-primary shadow-sm" 
                          : "bg-surface-container hover:bg-surface-container-high border-outline text-on-surface"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Operational SLA */}
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm uppercase font-mono font-bold text-primary flex items-center gap-1.5">
                  <span>03 // SERVICE SLA REQUIREMENT</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'cluster', label: '99.998% High Availability' },
                    { id: 'noc', label: '24/7/365 NOC Monitoring' },
                    { id: 'emergency', label: '4-Hour Emergency Dispatch' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => { setConfigSla(item.id as any); playUiChime('click'); }}
                      className={clsx(
                        "p-2.5 rounded-xl border text-center font-mono text-xs font-bold transition-all cursor-pointer",
                        configSla === item.id 
                          ? "bg-primary text-on-primary border-primary shadow-sm" 
                          : "bg-surface-container hover:bg-surface-container-high border-outline text-on-surface"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic Generated Blueprint Card */}
            <div className="lg:col-span-5 bg-surface-container p-space-lg rounded-2xl border border-primary/30 shadow-xl space-y-space-md glow-card">
              <div className="flex items-center justify-between pb-2 border-b border-outline/40">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="font-mono text-xs font-bold text-primary uppercase">
                    // GENERATED ARCHITECTURE BLUEPRINT
                  </span>
                </div>
                <span className="text-[10px] font-mono text-outline">HASH: 0x94DEB2</span>
              </div>

              <div className="space-y-3 font-mono">
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline font-bold uppercase">TARGET QUORUM LATENCY</div>
                  <div className="text-lg font-extrabold text-primary">{configSpecs.latency}</div>
                </div>

                <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline font-bold uppercase">AVAILABILITY GUARANTEE</div>
                  <div className="text-sm font-bold text-on-surface">{configSpecs.uptime}</div>
                </div>

                <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline font-bold uppercase">PRIMARY TECH KERNEL</div>
                  <div className="text-xs font-bold text-on-surface mt-0.5">{configSpecs.stack}</div>
                </div>

                <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline font-bold uppercase">DISPATCH PROTOCOL</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{configSpecs.turnaround}</div>
                </div>
              </div>

              <a
                href={`mailto:hr@mihora.tech?subject=Architectural%20Inquiry%20for%20${configDomain.toUpperCase()}%20(${configRegion.toUpperCase()})&body=Hello%20MIHORA%20Team,%0A%0AI%20configured%20a%20project%20blueprint:%0A- Domain: ${configDomain}%0A- Region: ${configRegion}%0A- SLA: ${configSla}%0A%0APlease%20provide%20a%20full%20architectural%20consultation.`}
                onClick={() => playUiChime('click')}
                className="w-full py-3.5 px-4 btn-primary-gradient rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Mail size={15} />
                <span>DISPATCH THIS BLUEPRINT TO HR@MIHORA.TECH</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 06. DIGITAL + PHYSICAL SPLIT ARCHITECTURE */}
      <section className="w-full bg-surface-container-lowest py-space-xl lg:py-24 relative overflow-hidden">
        <div className="w-full px-margin-mobile lg:px-margin space-y-space-xl">
          <div className="text-center max-w-3xl mx-auto space-y-space-xs">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono">// ARCHITECTURAL UNION</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">The MIHORA Dual-Hemisphere Model</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Where pure abstract code meets the kinetic reality of copper, fiber, steel, and physical field diagnostics.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-space-md items-center">
            <div className="lg:col-span-5 bg-surface-container-low border border-outline hover:border-primary p-space-lg rounded-2xl space-y-space-md shadow-lg transition-all glow-card">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-mono tracking-widest font-bold">HEMISPHERE_01 // SOFTWARE</span>
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center border border-primary/30 text-primary">
                  <Terminal size={18} />
                </div>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-extrabold uppercase tracking-tight">Digital Architecture</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Engineered software systems built for high throughput, sub-millisecond execution, and autonomous business logic.
              </p>
              <div className="space-y-space-xs pt-space-xs">
                <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between border border-outline/20">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Web Platforms &amp; Applications</span>
                  <span className="font-label-sm text-label-sm font-mono text-primary font-bold">REACT / NEXT / NODE</span>
                </div>
                <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between border border-outline/20">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Enterprise System Integration</span>
                  <span className="font-label-sm text-label-sm font-mono text-primary font-bold">ERP / CRM / SAP / REST</span>
                </div>
                <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between border border-outline/20">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Cloud Native Pipelines</span>
                  <span className="font-label-sm text-label-sm font-mono text-primary font-bold">K8S / TERRAFORM / AWS</span>
                </div>
                <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between border border-outline/20">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Algorithmic Automation</span>
                  <span className="font-label-sm text-label-sm font-mono text-primary font-bold">EVENT BUS / ML / OCR</span>
                </div>
              </div>
              <div className="w-full h-44 rounded-xl overflow-hidden relative border border-outline/30 shadow-inner">
                <img className="w-full h-full object-cover" alt="MIHORA digital systems architecture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNp2Ne9j3lWUFeehqctv-wkDuyehiZYdvANACNVnGHSL0NhH1hi6Vp_MWuSfsPmPpp82td5xAfJaCQx6z4VXMUTfemlFbnDdSoc0_v_rfrli6rttmgzJLEv2lYJqFjwyspiecKXgEfNr5w6QdsZ-vJtghmDahkyDKOSCaX2No32KFcikD6rejpB0-EeRUEtHOH6JZsKfK7OWh3VkBqVjHEbkjRXIHirrYh1fGq0Jb5-qJnzR4AJ46O4Q"/>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
              </div>
            </div>
            
            <div className="lg:col-span-1 flex flex-col items-center justify-center py-space-md">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg animate-pulse">
                <RefreshCw size={26} />
              </div>
              <div className="font-label-sm text-label-sm text-primary font-mono mt-3 text-center tracking-widest font-bold">
                MIHORA<br/>NEXUS
              </div>
            </div>

            <div className="lg:col-span-5 bg-surface-container-low border border-outline hover:border-secondary p-space-lg rounded-2xl space-y-space-md shadow-lg transition-all glow-card">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-secondary font-mono tracking-widest font-bold">HEMISPHERE_02 // HARDWARE</span>
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center border border-secondary/30 text-secondary">
                  <Router size={18} />
                </div>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-extrabold uppercase tracking-tight">Physical Infrastructure</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Kinetic hardware, sovereign enterprise server rooms, optical transport backbones, and rapid on-site technician deployment.
              </p>
              <div className="space-y-space-xs pt-space-xs">
                <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between border border-outline/20">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Data Centers &amp; Server Racks</span>
                  <span className="font-label-sm text-label-sm font-mono text-secondary font-bold">CISCO / ARISTA / DELL</span>
                </div>
                <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between border border-outline/20">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Structured Cabling &amp; Optical Fiber</span>
                  <span className="font-label-sm text-label-sm font-mono text-secondary font-bold">CAT6A / SINGLE-MODE</span>
                </div>
                <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between border border-outline/20">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Surveillance &amp; Physical Access</span>
                  <span className="font-label-sm text-label-sm font-mono text-secondary font-bold">IP CCTV / BIOMETRIC</span>
                </div>
                <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between border border-outline/20">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Field Engineering &amp; Break-Fix</span>
                  <span className="font-label-sm text-label-sm font-mono text-secondary font-bold">SLA-BACKED 4HR TRUCK</span>
                </div>
              </div>
              <div className="w-full h-44 rounded-xl overflow-hidden relative border border-outline/30 shadow-inner">
                <img className="w-full h-full object-cover" alt="MIHORA datacenter physical server infrastructure" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC71bPIEdSYxOU_7vxv4AAKlM6Dt8jGdirqqQ4InCa8vbu0pj2C3RnJLJdJD6j1XioqQ1td394C0CkNAD8VOOySNebOGc39ViFgs8wjTEgVpAzvzSKozZ69aJau6OpdvJd3HB55zQVJDYeNxUOwxGRM5C1KCS6qHndHEtzIf4AylEEMOcse7fqr1re4bZGcRP7p__CkHEtEFhO0JALIsxRLF5QeBorW02cQVRRX90-lrY1uCjyPAaIW7g"/>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07. INTERACTIVE SERVICE EXPLORER */}
      <section className="w-full bg-surface py-space-xl lg:py-24">
        <div className="w-full px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div className="space-y-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono">// DISCIPLINE MATRIX</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">MIHORA Comprehensive Services</h2>
            </div>
            <Link to="/services" onClick={() => playUiChime('click')} className="font-label-md text-label-md text-primary hover:text-primary-fixed uppercase tracking-wider font-semibold inline-flex items-center gap-1">
              <span>View All Service Specifications</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 bg-surface-container-low p-2 rounded-xl font-label-md text-label-md uppercase font-mono border border-outline">
            {['Digital Engineering', 'Automation & AI', 'Infrastructure', 'Field Engineering', 'Managed Tech'].map((title, idx) => (
              <button 
                key={idx}
                className={clsx("py-3 px-3 text-center rounded-lg transition-all font-semibold tracking-wider text-xs cursor-pointer", 
                  activeServiceIdx === idx 
                    ? "bg-primary text-on-primary shadow-sm" 
                    : "bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container")}
                onClick={() => { setActiveServiceIdx(idx); playUiChime('click'); }}
              >
                {title}
              </button>
            ))}
          </div>

          <div className="bg-surface-container-low border border-outline p-space-lg lg:p-space-xl rounded-2xl shadow-xl transition-all overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeServiceIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center"
              >
                <div className="lg:col-span-7 space-y-space-md">
                  <div className="flex items-center gap-space-sm">
                    <span className="px-3 py-1 bg-surface-container font-mono text-label-sm text-primary font-bold rounded-md border border-primary/20">{activeService.tag}</span>
                    <span className="font-label-sm text-label-sm text-outline font-mono uppercase tracking-wider">{activeService.sub}</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-extrabold uppercase tracking-tight">{activeService.headline}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{activeService.body}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                    <div className="p-3.5 bg-surface-container border border-outline/30 rounded-xl hover:border-primary transition-colors">
                      <span className="font-label-sm text-label-sm text-primary block font-mono font-bold">01 // PLATFORM DEV</span>
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">{activeService.sub1}</span>
                    </div>
                    <div className="p-3.5 bg-surface-container border border-outline/30 rounded-xl hover:border-primary transition-colors">
                      <span className="font-label-sm text-label-sm text-primary block font-mono font-bold">02 // ARCHITECTURE</span>
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">{activeService.sub2}</span>
                    </div>
                    <div className="p-3.5 bg-surface-container border border-outline/30 rounded-xl hover:border-primary transition-colors">
                      <span className="font-label-sm text-label-sm text-primary block font-mono font-bold">03 // APIS &amp; INTEGRATIONS</span>
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">{activeService.sub3}</span>
                    </div>
                    <div className="p-3.5 bg-surface-container border border-outline/30 rounded-xl hover:border-primary transition-colors">
                      <span className="font-label-sm text-label-sm text-primary block font-mono font-bold">04 // CODE RESILIENCE</span>
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">{activeService.sub4}</span>
                    </div>
                  </div>
                  <div className="pt-space-xs">
                    <Link to="/services" onClick={() => playUiChime('click')} className="inline-flex items-center gap-space-sm px-5 py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-label-md text-label-md uppercase font-bold font-mono rounded-lg transition-all">
                      <span>[ INITIATE SERVICE BRIEFING ]</span>
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-5 bg-surface-container border border-outline p-space-md rounded-xl space-y-space-sm shadow-sm">
                  <div className="flex items-center justify-between text-label-sm font-mono text-outline">
                    <span>SYSTEM ARCH_BLUEPRINT</span>
                    <span className="text-primary font-bold">STATUS: RESOLVED</span>
                  </div>
                  <div className="h-64 bg-surface-container-lowest rounded-DEFAULT p-space-md flex flex-col justify-between font-mono text-xs text-primary relative overflow-hidden border border-outline/30">
                    <div className="space-y-1">
                      <div className="text-outline">// SCHEMA RUNTIME TELEMETRY</div>
                      <div>&gt; INGEST: API_GATEWAY_V3</div>
                      <div>&gt; PROTOCOL: gRPC / WEBSOCKET / TLS1.3</div>
                      <div>&gt; PIPELINE: DISTRIBUTED REPLICATION</div>
                    </div>
                    <div className="space-y-1.5 py-2">
                      <div className="flex items-center justify-between text-[10px] text-outline">
                        <span>THROUGHPUT</span>
                        <span className="text-primary font-bold">{activeService.bar1} OPTIMAL</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-500" style={{ width: activeService.bar1 }}></div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-outline">
                        <span>RESILIENCE QUORUM</span>
                        <span className="text-secondary font-bold">3/3 NODES SYNCED</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-secondary transition-all duration-500" style={{ width: activeService.bar2 }}></div>
                      </div>
                    </div>
                    <div className="text-[11px] text-on-surface-variant flex justify-between">
                      <span>DISPATCH: MIHORA_CORE</span>
                      <span className="text-primary font-bold">HASH: 0x88F10B</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 08. THE LAYERED ENGINEERING STACK */}
      <section className="w-full bg-surface py-space-xl lg:py-24">
        <div className="w-full px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="space-y-space-xs">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono">// FULL-STACK TOPOLOGY</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">The MIHORA Unified Engineering Stack</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              We operate simultaneously across every vertical stratum of computation. Expand each stratum to review technical layers.
            </p>
          </div>
          
          <div className="space-y-space-xs font-mono text-label-md">
            {[
              { id: 9, title: "Software & Digital Platforms", desc: "Architected Web & Mobile applications, distributed micro-frontends, real-time WebSockets, TypeScript, Golang, Next.js, and multi-tenant SaaS kernels.", spec: "ZERO-DEPENDENCY BUILD // CONTAINERIZED // EDGE CDN SERVED" },
              { id: 8, title: "APIs & Micro-Mesh Services", desc: "gRPC, GraphQL, REST interfaces, Apache Kafka event streams, Redis memory buffers, and custom middleware interconnects.", spec: "SUB-10MS LATENCY TARGET // MUTUAL TLS ENCRYPTION" },
              { id: 7, title: "Autonomous Intelligence & Workflows", desc: "Computer vision ingestion, predictive maintenance triggers, autonomous ticket routing, RPA scripting, and LLM agent tool calling.", spec: "RETRIEVAL-AUGMENTED PIPELINE // LOCAL SOVEREIGN INFERENCE" },
              { id: 6, title: "Operating Systems & Virtualization", desc: "Debian, Ubuntu Server, Red Hat Enterprise, Proxmox VE, VMware ESXi, bare-metal hypervisors, and kernel-level hardening routines.", spec: "HARDENED CIS BENCHMARK LEVEL 2 // TPM 2.0 ATTESTATION" },
              { id: 5, title: "Network Routing & SD-WAN Fabrics", desc: "BGP routing, OSPF, VLAN segmentations, IPsec site-to-site tunnels, WireGuard meshes, and redundant ISP failover automation.", spec: "REDUNDANT UPLINK DIVERSITY // ZERO PACKET LOSS ROUTING" },
              { id: 4, title: "Physical Servers & SAN Storage", desc: "Rackmount 1U/2U/4U compute nodes, NVMe SAN fabrics, RAID arrays, hot-swappable power redundancy, and IPMI/iDRAC lights-out management.", spec: "DUAL PSU REDUNDANCY // ECC MEMORY SCRUBBING" },
              { id: 3, title: "Structured Cabling & PDU Distribution", desc: "Fiber optic splicing (single-mode & multi-mode), Cat6A patch panel termination, intelligent rack PDUs, ATS failover, and battery UPS arrays.", spec: "FLUKE CERTIFIED LINK VERIFICATION // ZERO ELECTROMAGNETIC LEAK" },
              { id: 2, title: "Physical Installation & Surveillance", desc: "CCTV NVR/DVR arrays, biometric turnstiles, environmental humidity/temperature probes, server room cooling containment, and perimeter sensors.", spec: "NEMA-RATED ENCLOSURES // TAMPER DETECTION CIRCUITS" },
              { id: 1, title: "Kinetic Field Dispatch & Break-Fix", desc: "Hands-on engineering trucks, ladder work, cable pulling, on-site diagnostics, component replacement, and physical asset decommissioning.", spec: "GLOBAL RAPID DISPATCH PROTOCOL // FIELD TOOLSETS CALIBRATED" },
            ].map(layer => {
              const isExpanded = expandedStack === layer.id;
              return (
                <div 
                  key={layer.id} 
                  className={clsx(
                    "p-space-md rounded-xl cursor-pointer transition-all border",
                    isExpanded 
                      ? "bg-surface-container border-primary shadow-md" 
                      : "bg-surface-container-low hover:bg-surface-container/70 border-outline"
                  )} 
                  onClick={() => toggleStack(layer.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-md">
                      <span className={clsx("font-bold transition-colors", isExpanded ? "text-primary" : "text-primary/70")}>
                        L-0{layer.id}
                      </span>
                      <span className="text-on-surface font-bold uppercase font-headline-sm text-headline-sm">{layer.title}</span>
                    </div>
                    <span className="text-primary text-xs flex items-center gap-1 font-bold">
                      {isExpanded ? "[-] COLLAPSE" : "[+] EXPAND LAYER"}
                    </span>
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-space-sm font-body-sm text-body-sm text-on-surface-variant space-y-1.5 border-t border-outline/20 mt-3">
                          <p>{layer.desc}</p>
                          <div className="text-xs text-primary font-mono font-semibold">SPEC: {layer.spec}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 09. REAL-WORLD KINETIC FIELD REALITY */}
      <section className="w-full bg-surface-container-lowest py-space-xl lg:py-24 border-t border-outline/30">
        <div className="w-full px-margin-mobile lg:px-margin space-y-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-6 space-y-space-md">
              <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono">// KINETIC REALITY</div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">When Technology Has to Work in the Real World.</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Software does not run in a vacuum. It lives on hot servers, inside dusty conduits, behind biometric doorways, and through subterranean fiber lines. Our field engineering units exist to bridge digital intent with uncompromising physical survival.
              </p>
              <div className="space-y-space-xs font-label-md text-label-md text-on-surface">
                <div className="flex items-center gap-space-sm"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Zero theoretical assumptions: every cable certified with Fluke telemetry.</div>
                <div className="flex items-center gap-space-sm"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Complete environmental thermal mapping and power harmonic analysis.</div>
                <div className="flex items-center gap-space-sm"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> High-voltage &amp; low-voltage integration with industrial containment.</div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="w-full h-80 rounded-2xl overflow-hidden relative shadow-xl border border-outline">
                <img className="w-full h-full object-cover" alt="MIHORA principal systems engineer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlyg3ubyBhu8Yekk0m3TxARabBPiz93GmZlx3hLfox8vekMDcg3XQ_oTYfNC-cAvUZqdxzjsOl3a1eY0JYcBLH6P7hLD-p1SFFybhlSruGL0Nf_2j3WxnFBmeOKr52Q52nKMIbVK0afleQJgY0A2UHAyEk1MvSkILANiK_V33Jfr8Nxrc2rQCJ3PfQCl9Eec17ZETuw1javPem25W3TTMEpMJogUWUjmM_kCjDNucFIMx7QPZrRfIrTg"/>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-surface-container/95 backdrop-blur p-space-sm rounded-xl text-label-sm font-mono text-primary border border-outline/40 shadow-sm">
                  <span>FIELD RIG: TRUCK_UNIT_04</span>
                  <span>EQUIP: OTDR FIBER TESTER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA SECTION */}
      <section className="w-full bg-surface-container-lowest py-space-xl lg:py-28 relative overflow-hidden bg-tech-grid border-t border-outline/30">
        <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-[950px] h-[450px] bg-gradient-to-t from-primary/20 via-secondary/10 to-transparent blur-3xl opacity-80"></div>
        <div className="w-full px-margin-mobile lg:px-margin relative z-10 text-center space-y-space-lg max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface-container border border-outline rounded-full shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono font-bold">INITIATE ARCHITECTURAL ENGAGEMENT</span>
          </div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface font-extrabold uppercase tracking-tight">
            Tell Us What You&apos;re <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary-fixed">Building.</span>
          </h2>
          <p className="font-headline-sm text-headline-sm text-on-surface-variant max-w-2xl mx-auto font-normal leading-relaxed">
            Digital systems, datacenter infrastructure, automation pipelines, field engineering, or sovereign operations across global geographies.
          </p>
          <div className="pt-space-md flex flex-col sm:flex-row items-center justify-center gap-space-md">
            <a 
              href="mailto:hr@mihora.tech?subject=MIHORA%20Direct%20Architectural%20Dispatch%20Inquiry" 
              onClick={() => playUiChime('click')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm px-8 py-4 btn-primary-gradient font-label-md text-label-md uppercase tracking-widest font-extrabold rounded-xl transition-all shadow-md active:scale-95"
            >
              <Terminal size={18} />
              <span>DISPATCH: HR@MIHORA.TECH</span>
            </a>
            <Link 
              to="/contact" 
              onClick={() => playUiChime('click')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm px-7 py-4 bg-surface-container hover:bg-surface-container-high border border-outline hover:border-primary text-on-surface hover:text-primary font-label-md text-label-md uppercase tracking-wider font-semibold rounded-xl backdrop-blur-md transition-all shadow-sm active:scale-95"
            >
              <span>View Global Labs</span>
              <ArrowUpRight size={16} className="text-primary" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
