import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, PencilRuler, ArrowDown, AlertTriangle, Router, 
  Cpu, Network, X, Check, Copy, Mail, ShieldCheck, Layers,
  ArrowRight, Activity, Database, CheckCircle2, ChevronRight
} from 'lucide-react';
import { playUiChime } from '../utils/audio';
import { SovereignRfpBuilder } from '../components/SovereignRfpBuilder';

interface Bottleneck {
  id: string;
  num: string;
  title: string;
  category: 'scale' | 'infra' | 'custom';
  symptom: string;
  impact: string;
  resolutionPillar: string;
  pillarAnchor: string;
  steps: string[];
  techStack: string;
  slaTarget: string;
}

const bottlenecks: Bottleneck[] = [
  {
    id: 'b1',
    num: '01',
    category: 'scale',
    title: 'Data Silos & Fragmented Manual Workflows',
    symptom: 'Teams duplicate data entry across disparate ERPs, spreadsheets, and legacy relational databases, leading to a 38% operational cycle delay.',
    impact: 'Elevated error rates, 4-hour delay on order fulfillment, zero real-time inventory visibility.',
    resolutionPillar: 'Pillar 02: Business Automation & Orchestration',
    pillarAnchor: '#business-automation',
    steps: [
      'Deploy Apache Kafka / NATS transactional outbox event broker between ERP and warehouse',
      'Implement idempotent Change Data Capture (CDC) pipelines on legacy database schemas',
      'Establish unified GraphQL federated gateway for internal staff portals',
      'Automated reconciliation rules with instant anomaly alerting via Slack/PagerDuty'
    ],
    techStack: 'Kafka, Debezium CDC, GraphQL, PostgreSQL, Go 1.23',
    slaTarget: 'Sub-second real-time cross-database synchronization'
  },
  {
    id: 'b2',
    num: '02',
    category: 'infra',
    title: 'Unreliable Multi-Site Edge Connectivity',
    symptom: 'Industrial facilities, distribution centers, and branch networks experience silent network degradations and uncoordinated ISP third-party failovers.',
    impact: 'Factory floor production halts, dropped barcode scans, unmonitored security cameras.',
    resolutionPillar: 'Pillar 03 & 04: Infrastructure Deployment + Remote Ops',
    pillarAnchor: '#infrastructure-deployment',
    steps: [
      'Install dual-carrier SD-WAN gateways with automated BGP sub-second failover',
      'Deploy ruggedized local edge compute boxes for offline-first autonomous sorting',
      'Establish encrypted WireGuard site-to-site mesh connecting all 40+ facilities',
      'Centralized Grafana/Prometheus dashboard monitoring link loss and jitter 24/7'
    ],
    techStack: 'WireGuard, BGP Anycast, Linux Kernel eBPF, Prometheus, Cat6A STP',
    slaTarget: '99.999% network availability with < 200ms failover'
  },
  {
    id: 'b3',
    num: '03',
    category: 'custom',
    title: 'Off-The-Shelf SaaS Incompatibility',
    symptom: 'Industrial SCADA, specialized PLC sensors, and proprietary protocols cannot interface with standard commercial public clouds.',
    impact: 'Trapped telemetry data, inability to automate high-voltage and thermal safety shutoffs, high cloud egress fees.',
    resolutionPillar: 'Pillar 06: Custom Protocol & Rig Engineering',
    pillarAnchor: '#custom-engineering',
    steps: [
      'Engineer custom Modbus / CAN-Bus / OPC-UA to gRPC protocol translator appliances',
      'Deploy optically isolated hardware interface boards for noisy electrical environments',
      'Build sovereign on-premise time-series lakehouse (TimescaleDB / ClickHouse)',
      'Implement deterministic fail-safe watchdog circuits for zero-downtime safety'
    ],
    techStack: 'Rust, C++, Modbus RTU/TCP, ClickHouse, Custom FPGA Boards',
    slaTarget: 'Deterministic < 5ms polling loop with hardware watchdogs'
  }
];

interface PillarDetail {
  id: string;
  num: string;
  name: string;
  scope: string;
  turnaround: string;
  telemetry: string;
  sla: string;
  overview: string;
  deliverables: string[];
  architectureSummary: string;
}

const pillarDetails: Record<string, PillarDetail> = {
  'digital': {
    id: 'digital',
    num: '01',
    name: 'Digital Transformation',
    scope: 'Enterprise Core & Hybrid Cloud',
    turnaround: '3 - 9 Months',
    telemetry: 'Full Tracing (APM + Distributed OpenTelemetry)',
    sla: '99.95% Availability',
    overview: 'Dismantles legacy technical debt by replacing fragile monolithic codebases with resilient distributed topologies that scale linearly under enterprise traffic.',
    deliverables: [
      'Hexagonal domain-driven architecture blueprint',
      'Automated CI/CD canary release pipeline with rollback gates',
      'Distributed tracing mesh with OpenTelemetry collectors',
      'Complete operator runbooks and disaster recovery dry runs'
    ],
    architectureSummary: 'Decoupled domain services communicating via event streaming and gRPC, with zero-leakage abstractions.'
  },
  'automation': {
    id: 'automation',
    num: '02',
    name: 'Business Automation',
    scope: 'Cross-System API & Middleware',
    turnaround: '4 - 12 Weeks',
    telemetry: 'Payload & State Audit Telemetry',
    sla: '99.99% Reliability',
    overview: 'Eliminates human bottleneck loops by constructing hardened automation backbones that link legacy databases, external vendor APIs, and internal messaging queues into self-healing workflows.',
    deliverables: [
      'Idempotent transactional outbox implementation',
      'Automated OCR and compliance document validation pipeline',
      'Zero-credential vaulting integration via HashiCorp Vault',
      'Visual execution state machine with real-time exception queues'
    ],
    architectureSummary: 'State-machine orchestration with guaranteed idempotency, automatic retry backoffs, and cryptographic audit logs.'
  },
  'infra': {
    id: 'infra',
    num: '03',
    name: 'Infrastructure Deployment',
    scope: 'Datacenter, Racks & Structured Cabling',
    turnaround: '2 - 8 Weeks',
    telemetry: 'Fluke OTDR / Link Loss Telemetry',
    sla: '99.999% Physical Uptime',
    overview: 'Designs, provisions, and installs high-performance hardware networks. From air-gapped on-premise servers to ruggedized edge IoT arrays, our field teams ensure physical topology matches logical requirements.',
    deliverables: [
      'BICSI-certified Cat6A and Single-Mode fiber cabling plants',
      'Fluke Versiv optical loss verification calibration reports',
      'Hot/cold aisle containment and precision power distribution (PDU)',
      'Seismically braced server cabinet installations'
    ],
    architectureSummary: 'High-density Tier III/IV compliant rack topologies with 2N electrical redundancy and zero-strain fiber raceways.'
  },
  'remote': {
    id: 'remote',
    num: '04',
    name: 'Remote Operations',
    scope: 'Multi-Site Edge SCADA & Environmental Probes',
    turnaround: '3 - 6 Weeks',
    telemetry: 'Real-Time Sensor & Power Ingestion',
    sla: '99.98% Telemetry Delivery',
    overview: 'Centralized monitoring and distributed control frameworks. Deploys resilient SCADA and NOC telemetry systems allowing operators to manage multi-site physical infrastructure from unified dashboards.',
    deliverables: [
      'Edge IoT sensor telemetry array (temperature, humidity, vibration, power)',
      'Autonomous cellular LTE/5G failover relays',
      'Unified Grafana operational telemetry dashboards',
      'Automated SMS/Voice escalation alerts for out-of-spec readings'
    ],
    architectureSummary: 'Lightweight MQTT / WireGuard telemetry relays transmitting continuous sensor streams to dual central hubs.'
  },
  'technical': {
    id: 'technical',
    num: '05',
    name: 'Technical Operations',
    scope: '24/7 Managed NOC & SRE Incident Response',
    turnaround: 'Continuous SLA',
    telemetry: 'Synthetic Probes & P99 Latency Alerts',
    sla: '99.99% MTTR Guarantee',
    overview: 'Continuous Site Reliability Engineering. Fully-managed NOC/SOC services ensuring aggressive SLAs, automated incident response, and zero-downtime patching protocols.',
    deliverables: [
      'Embedded Tier-3 SRE engineers on 24/7/365 rotation',
      'Mean Time to Respond (MTTR) under 14 minutes guaranteed',
      'Automated zero-day CVE patching playbooks',
      'Quarterly executive architecture reviews and capacity plans'
    ],
    architectureSummary: 'Google SRE operational framework with error budget governance and blameless post-mortem loops.'
  },
  'custom': {
    id: 'custom',
    num: '06',
    name: 'Custom Engineering',
    scope: 'Bespoke Hardware Bridges & Specialized Rigs',
    turnaround: '6 - 16 Weeks',
    telemetry: 'Kernel Tracing & Physical Bench Testing',
    sla: 'Mission Critical 100%',
    overview: 'For challenges without commercial precedents. Our R&D labs construct bespoke hardware/software bridges, reverse-engineer legacy industrial protocols, and build highly specialized compute rigs.',
    deliverables: [
      'Custom FPGA / microcontroller firmware blueprints',
      'Optically isolated PCB daughterboards for electrical safety',
      'Proprietary protocol decoding engines with zero packet loss',
      'Field-tested ruggedized NEMA industrial enclosures'
    ],
    architectureSummary: 'Hardware-in-the-loop engineered systems bridging analog physical devices with high-speed digital networks.'
  }
};

export default function Solutions() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'scale' | 'infra' | 'custom'>('all');
  const [selectedBottleneck, setSelectedBottleneck] = useState<Bottleneck | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<PillarDetail | null>(null);
  const [copied, setCopied] = useState(false);

  const handleOpenBottleneck = (b: Bottleneck) => {
    playUiChime('click');
    setSelectedBottleneck(b);
  };

  const handleOpenPillar = (pillarKey: string) => {
    playUiChime('click');
    setSelectedPillar(pillarDetails[pillarKey]);
  };

  const handleCopyBottleneckPlan = (b: Bottleneck) => {
    playUiChime('success');
    const text = `MIHORA ENGINEERING RESOLUTION PLAN:
BOTTLENECK: #${b.num} - ${b.title}
SYMPTOM: ${b.symptom}
BUSINESS IMPACT: ${b.impact}
RECOMMENDED ARCHITECTURE: ${b.resolutionPillar}
STACK: ${b.techStack}
SLA TARGET: ${b.slaTarget}
ACTION STEPS:
${b.steps.map(s => `- ${s}`).join('\n')}

Dispatch to: hr@mihora.tech`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Telemetry Sub-ribbon */}
      <section className="w-full bg-surface-container-lowest px-margin-mobile lg:px-margin py-space-sm shadow-sm border-b border-outline/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant">
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-sm text-label-sm tracking-wider uppercase font-mono">
            <Link to="/" className="hover:text-secondary text-on-surface-variant transition-colors">Home</Link>
            <span className="text-outline">/</span>
            <span className="text-secondary font-semibold">Solutions</span>
            <span className="text-outline">::</span>
            <span className="text-outline">OPERATIONAL_BLUEPRINTS</span>
          </nav>
          <div className="flex items-center gap-space-md font-label-sm text-label-sm">
            <div className="flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-ping"></span>
              <span className="text-secondary font-bold">SPEC: SYS-ARCH-V4.2</span>
            </div>
            <span className="hidden sm:inline text-outline-variant">|</span>
            <span className="hidden sm:inline text-tertiary font-mono">NODAL CLEARANCE: ENTERPRISE LEVEL-0</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="relative w-full bg-surface-container-lowest overflow-hidden px-margin-mobile lg:px-margin py-space-xl lg:py-24 border-b border-outline/20">
        <div className="absolute -top-40 right-10 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-secondary-container/5 blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-8 space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-high rounded-xl text-primary font-mono text-xs font-bold uppercase tracking-widest border border-primary/20">
                <Terminal size={14} />
                <span>PROBLEM-LED ENGINEERING &amp; TRANSFORMATION</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface uppercase tracking-tight leading-none font-extrabold">
                SOLUTIONS DESIGNED AROUND <br />
                <span className="text-secondary-container">OPERATIONAL REALITY.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                We do not sell boxed packages. We architect tailored digital and physical systems that resolve complex technical bottlenecks for enterprise and growth organizations worldwide. Tap any bottleneck or pillar below to inspect our architectural blueprints.
              </p>
              <div className="pt-space-sm flex flex-wrap items-center gap-space-md">
                <a 
                  href="#diagnostic-matrix" 
                  onClick={() => playUiChime('click')}
                  className="inline-flex items-center gap-space-xs px-space-lg py-3 btn-primary-gradient text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-xl shadow-lg transition-all font-bold active:scale-95"
                >
                  <PencilRuler size={16} />
                  <span>Diagnostic Matrix</span>
                </a>
                <a 
                  href="#pillars" 
                  onClick={() => playUiChime('click')}
                  className="inline-flex items-center gap-space-xs px-space-md py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md uppercase tracking-wider rounded-xl transition-all border border-outline/30 font-bold active:scale-95"
                >
                  <span>View System Pillars [01-06]</span>
                  <ArrowDown size={16} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-surface-container p-space-lg rounded-2xl shadow-xl space-y-space-md relative overflow-hidden border border-outline/30">
                <div className="flex items-center justify-between pb-space-sm">
                  <div className="font-label-sm text-label-sm text-secondary font-mono tracking-wider font-bold">// TELEMETRY_CORE_ACTIVE</div>
                  <Network className="text-secondary-container" size={20} />
                </div>
                <div className="w-full h-44 bg-surface-container-lowest rounded-xl p-space-sm flex items-center justify-center relative border border-outline/20">
                  <svg className="w-full h-full text-secondary-container/40" fill="none" viewBox="0 0 320 140">
                    <line stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5" x1="20" x2="100" y1="70" y2="30"></line>
                    <line stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5" x1="20" x2="100" y1="70" y2="110"></line>
                    <line stroke="currentColor" strokeWidth="2" x1="100" x2="200" y1="30" y2="30"></line>
                    <line stroke="currentColor" strokeWidth="2" x1="100" x2="200" y1="110" y2="110"></line>
                    <line stroke="currentColor" strokeWidth="1.5" x1="200" x2="280" y1="30" y2="70"></line>
                    <line stroke="currentColor" strokeWidth="1.5" x1="200" x2="280" y1="110" y2="70"></line>
                    <line stroke="currentColor" strokeWidth="1" x1="150" x2="150" y1="30" y2="110"></line>
                    <circle className="fill-primary text-primary" cx="20" cy="70" r="4"></circle>
                    <circle className="fill-secondary-container text-secondary-container" cx="100" cy="30" r="5"></circle>
                    <circle className="fill-secondary-container text-secondary-container" cx="100" cy="110" r="5"></circle>
                    <circle className="fill-primary-container text-primary-container" cx="200" cy="30" r="6"></circle>
                    <circle className="fill-primary-container text-primary-container" cx="200" cy="110" r="6"></circle>
                    <circle className="fill-secondary-container animate-pulse" cx="280" cy="70" r="7"></circle>
                    <text fill="#c3c5d8" fontFamily="JetBrains Mono" fontSize="8" x="24" y="85">ENTRY</text>
                    <text fill="#a5e7ff" fontFamily="JetBrains Mono" fontSize="8" x="96" y="20">EDGE_01</text>
                    <text fill="#a5e7ff" fontFamily="JetBrains Mono" fontSize="8" x="96" y="125">EDGE_02</text>
                    <text fill="#bac7dc" fontFamily="JetBrains Mono" fontSize="8" x="180" y="20">FABRIC</text>
                    <text fill="var(--color-secondary-container)" fontFamily="JetBrains Mono" fontSize="8" x="260" y="88">STABLE</text>
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-space-sm pt-space-xs font-label-sm text-label-sm font-mono">
                  <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline/20">
                    <span className="text-on-surface-variant block text-xs">DEPLOYED ORGS</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">140+</span>
                  </div>
                  <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline/20">
                    <span className="text-on-surface-variant block text-xs">SYSTEM UPTIME</span>
                    <span className="font-headline-sm text-headline-sm text-secondary-container font-bold">99.98%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Diagnostic & Solution Matrix */}
      <section className="w-full bg-surface px-margin-mobile lg:px-margin py-space-xl border-b border-outline/20" id="diagnostic-matrix">
        <div className="max-w-7xl mx-auto space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <div className="font-label-sm text-label-sm text-secondary font-mono tracking-widest uppercase font-bold">// SYSTEM DIAGNOSTIC TOOL</div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight font-extrabold">OPERATIONAL BOTTLENECK MATRIX</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Select your current operational hurdle to map against our engineering pathway. Tap any card for full resolution specs.</p>
            </div>
            <div className="flex flex-wrap gap-space-xs">
              {[
                { id: 'all', label: 'All Domains' },
                { id: 'scale', label: 'Legacy Drag' },
                { id: 'infra', label: 'Field Outages' },
                { id: 'custom', label: 'Bespoke Hardware' }
              ].map(filter => (
                <button 
                  key={filter.id}
                  className={clsx("px-space-md py-2 font-label-sm text-label-sm uppercase tracking-wider rounded-xl transition-all font-mono font-bold cursor-pointer text-xs", 
                    activeCategory === filter.id 
                      ? "btn-primary-gradient text-on-primary shadow-md" 
                      : "bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline/30"
                  )}
                  onClick={() => { setActiveCategory(filter.id as any); playUiChime('click'); }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {bottlenecks.map((b) => {
              const visible = activeCategory === 'all' || activeCategory === b.category;
              if (!visible) return null;

              return (
                <div 
                  key={b.id}
                  onClick={() => handleOpenBottleneck(b)}
                  className="bg-surface-container p-space-lg rounded-2xl shadow-md flex flex-col justify-between border border-outline/30 hover:border-primary/50 hover:shadow-xl transition-all cursor-pointer group space-y-space-md"
                >
                  <div className="space-y-space-sm">
                    <div className="flex justify-between items-center text-error font-mono text-xs font-bold">
                      <span>CRITICAL BOTTLENECK #{b.num}</span>
                      <AlertTriangle size={18} />
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
                      {b.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {b.symptom}
                    </p>
                  </div>

                  <div className="pt-space-sm bg-surface-container-low p-space-sm rounded-xl space-y-2 border border-outline/20">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[11px] text-secondary font-bold uppercase">ENGINEERED RESOLUTION:</span>
                      <span className="font-mono text-[10px] text-primary font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        <span>VIEW SPEC</span>
                        <ArrowRight size={12} />
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold block leading-tight">
                      {b.resolutionPillar}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deep Architecture Pillars */}
      <section className="w-full bg-surface-container-lowest px-margin-mobile lg:px-margin py-space-xl space-y-20" id="pillars">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl space-y-space-xs mb-space-xl">
            <div className="font-label-sm text-label-sm text-secondary-container font-mono tracking-widest uppercase font-bold">// ARCHITECTURAL FOUNDATION</div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight font-extrabold">SIX COMPREHENSIVE SOLUTION PILLARS</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Engineered for operational durability. Each system tier enforces strict milestone validation before physical or code handoff.</p>
          </div>

          {/* PILLAR 01: DIGITAL TRANSFORMATION */}
          <div id="digital-transformation" className="scroll-mt-28 bg-surface-container p-space-lg lg:p-space-xl rounded-2xl shadow-lg space-y-space-lg mb-space-xl border border-outline/30">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-space-md">
              <div className="space-y-1">
                <div className="flex items-center gap-space-xs font-mono text-xs text-secondary font-bold">
                  <span>SYSTEM PILLAR // 01</span>
                  <span>•</span>
                  <span>CORE MODERNIZATION</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight font-bold">DIGITAL TRANSFORMATION</h3>
              </div>
              <button
                onClick={() => handleOpenPillar('digital')}
                className="px-space-md py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/40 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>INSPECT PILLAR SPEC</span>
                <ChevronRight size={14} />
              </button>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-4xl leading-relaxed">
              We systematically dismantle legacy technical debt. By replacing fragile monolithic codebases with resilient distributed topologies, we empower organizations to sustain exponential throughput without service degradation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-space-sm pt-space-xs">
              {[
                { phase: '01', title: 'Current State Assessment', desc: 'Full code audit, bottleneck discovery, schema mapping.' },
                { phase: '02', title: 'Target Architecture', desc: 'Microservices blueprint, API schemas, failover matrices.' },
                { phase: '03', title: 'Phased Implementation', desc: 'Canary deployment runs, shadow testing, data syncing.' },
                { phase: '04', title: 'Operational Transition', desc: 'Zero-downtime cutover and hands-on runbook execution.' },
                { phase: '05', title: 'Continuous Optimization', desc: 'Real-time latency profiling & compute rightsizing.' }
              ].map(step => (
                <div key={step.phase} className="bg-surface-container-low p-space-md rounded-xl space-y-1 border border-outline/20">
                  <span className="font-mono text-xs text-secondary-container font-bold">PHASE {step.phase}</span>
                  <h4 className="font-label-md text-label-md text-on-surface font-bold">{step.title}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PILLAR 02: BUSINESS AUTOMATION */}
          <div id="business-automation" className="scroll-mt-28 bg-surface-container p-space-lg lg:p-space-xl rounded-2xl shadow-lg space-y-space-lg mb-space-xl border border-outline/30">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-space-md">
              <div className="space-y-1">
                <div className="flex items-center gap-space-xs font-mono text-xs text-secondary font-bold">
                  <span>SYSTEM PILLAR // 02</span>
                  <span>•</span>
                  <span>AUTONOMOUS ORCHESTRATION</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight font-bold">BUSINESS AUTOMATION</h3>
              </div>
              <button
                onClick={() => handleOpenPillar('automation')}
                className="px-space-md py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/40 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>INSPECT PILLAR SPEC</span>
                <ChevronRight size={14} />
              </button>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-4xl leading-relaxed">
              Eliminate human bottleneck loops. We construct hardened automation backbones that link legacy databases, external vendor APIs, and internal messaging queues into self-healing workflows.
            </p>
            <div className="bg-surface-container-lowest p-space-md rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md border border-outline/20">
              <div className="flex items-center gap-space-md">
                <Network className="text-secondary-container" size={32} />
                <div>
                  <div className="font-label-md text-label-md text-on-surface font-bold uppercase">Orchestrated Reliability</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Processes execute with guaranteed idempotency and audit logs.</div>
                </div>
              </div>
              <div className="flex gap-space-sm font-label-sm text-label-sm flex-wrap">
                <span className="px-2.5 py-1 bg-surface-container-high rounded-lg text-secondary font-mono font-bold text-xs">RPA/HEADLESS</span>
                <span className="px-2.5 py-1 bg-surface-container-high rounded-lg text-secondary font-mono font-bold text-xs">KAFKA/NATS</span>
                <span className="px-2.5 py-1 bg-surface-container-high rounded-lg text-secondary font-mono font-bold text-xs">GRAPHQL/REST</span>
              </div>
            </div>
          </div>

          {/* PILLAR 03: INFRASTRUCTURE DEPLOYMENT */}
          <div id="infrastructure-deployment" className="scroll-mt-28 bg-surface-container p-space-lg lg:p-space-xl rounded-2xl shadow-lg space-y-space-lg mb-space-xl border border-outline/30">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-space-md">
              <div className="space-y-1">
                <div className="flex items-center gap-space-xs font-mono text-xs text-secondary font-bold">
                  <span>SYSTEM PILLAR // 03</span>
                  <span>•</span>
                  <span>PHYSICAL NETWORKS</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight font-bold">INFRASTRUCTURE DEPLOYMENT</h3>
              </div>
              <button
                onClick={() => handleOpenPillar('infra')}
                className="px-space-md py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/40 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>INSPECT PILLAR SPEC</span>
                <ChevronRight size={14} />
              </button>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-4xl leading-relaxed">
              We design, provision, and install high-performance hardware networks. From air-gapped on-premise servers to ruggedized edge IoT arrays, our field teams ensure physical topology matches logical requirements.
            </p>
          </div>

          {/* PILLAR 04: REMOTE OPERATIONS */}
          <div id="remote-operations" className="scroll-mt-28 bg-surface-container p-space-lg lg:p-space-xl rounded-2xl shadow-lg space-y-space-lg mb-space-xl border border-outline/30">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-space-md">
              <div className="space-y-1">
                <div className="flex items-center gap-space-xs font-mono text-xs text-secondary font-bold">
                  <span>SYSTEM PILLAR // 04</span>
                  <span>•</span>
                  <span>EDGE TELEMETRY</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight font-bold">REMOTE OPERATIONS</h3>
              </div>
              <button
                onClick={() => handleOpenPillar('remote')}
                className="px-space-md py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/40 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>INSPECT PILLAR SPEC</span>
                <ChevronRight size={14} />
              </button>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-4xl leading-relaxed">
              Centralized monitoring and distributed control frameworks. We deploy resilient SCADA and NOC telemetry systems allowing operators to manage multi-site physical infrastructure from unified dashboards.
            </p>
          </div>

          {/* PILLAR 05: TECHNICAL OPERATIONS */}
          <div id="technical-operations" className="scroll-mt-28 bg-surface-container p-space-lg lg:p-space-xl rounded-2xl shadow-lg space-y-space-lg mb-space-xl border border-outline/30">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-space-md">
              <div className="space-y-1">
                <div className="flex items-center gap-space-xs font-mono text-xs text-secondary font-bold">
                  <span>SYSTEM PILLAR // 05</span>
                  <span>•</span>
                  <span>24/7 SRE &amp; NOC</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight font-bold">TECHNICAL OPERATIONS</h3>
              </div>
              <button
                onClick={() => handleOpenPillar('technical')}
                className="px-space-md py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/40 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>INSPECT PILLAR SPEC</span>
                <ChevronRight size={14} />
              </button>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-4xl leading-relaxed">
              Continuous Site Reliability Engineering. We operate fully-managed NOC/SOC services, ensuring aggressive SLAs, automated incident response, and zero-downtime patching protocols.
            </p>
          </div>

          {/* PILLAR 06: CUSTOM ENGINEERING */}
          <div id="custom-engineering" className="scroll-mt-28 bg-surface-container p-space-lg lg:p-space-xl rounded-2xl shadow-lg space-y-space-lg mb-space-xl border border-outline/30">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-space-md">
              <div className="space-y-1">
                <div className="flex items-center gap-space-xs font-mono text-xs text-secondary font-bold">
                  <span>SYSTEM PILLAR // 06</span>
                  <span>•</span>
                  <span>BESPOKE R&amp;D</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight font-bold">CUSTOM ENGINEERING</h3>
              </div>
              <button
                onClick={() => handleOpenPillar('custom')}
                className="px-space-md py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/40 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>INSPECT PILLAR SPEC</span>
                <ChevronRight size={14} />
              </button>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-4xl leading-relaxed">
              For challenges without commercial precedents. Our R&amp;D labs construct bespoke hardware/software bridges, reverse-engineer legacy industrial protocols, and build highly specialized compute rigs.
            </p>
          </div>

          {/* Interactive Comparison Table */}
          <div className="space-y-space-xs pt-space-xl">
            <div className="font-label-sm text-label-sm text-secondary font-mono tracking-widest uppercase font-bold">// ARCHITECTURAL SPECIFICATION MATRIX</div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight font-extrabold">PILLAR COMPARISON &amp; RUNTIME METRICS</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Tap any row to view complete operational SLA details and deliverables.</p>
          </div>

          <div className="overflow-x-auto bg-surface-container rounded-2xl shadow-lg mt-space-md border border-outline/30">
            <table className="w-full text-left font-body-sm text-body-sm border-collapse">
              <thead>
                <tr className="bg-surface-container-high text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-mono">
                  <th className="p-space-md">Solution Pillar</th>
                  <th className="p-space-md">Deployment Scope</th>
                  <th className="p-space-md">Turnaround Cycle</th>
                  <th className="p-space-md">Telemetry Level</th>
                  <th className="p-space-md">SLA Guarantee</th>
                  <th className="p-space-md text-right">Spec Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-lowest text-on-surface-variant font-mono text-xs">
                {[
                  { key: 'digital', name: 'Digital Transformation', scope: 'Enterprise Core & Hybrid Cloud', turnaround: '3 - 9 Months', telemetry: 'Full Tracing (APM + Distributed)', sla: '99.95%' },
                  { key: 'automation', name: 'Business Automation', scope: 'Cross-System API & Middleware', turnaround: '4 - 12 Weeks', telemetry: 'Payload & State Telemetry', sla: '99.99%' },
                  { key: 'infra', name: 'Infrastructure Deployment', scope: 'Datacenter, Racks & Structured Cabling', turnaround: '2 - 8 Weeks', telemetry: 'Fluke OTDR / Link Loss Telemetry', sla: '99.999%' },
                  { key: 'remote', name: 'Remote Operations', scope: 'Multi-Site Edge SCADA & Environmental Probes', turnaround: '3 - 6 Weeks', telemetry: 'Real-Time Sensor & Power Ingestion', sla: '99.98%' },
                  { key: 'technical', name: 'Technical Operations', scope: '24/7 Managed NOC & SRE Incident Response', turnaround: 'Continuous SLA', telemetry: 'Synthetic Probes & P99 Latency Alerts', sla: '99.99%' },
                  { key: 'custom', name: 'Custom Engineering', scope: 'Bespoke Hardware Bridges & Specialized Rigs', turnaround: '6 - 16 Weeks', telemetry: 'Kernel Tracing & Physical Bench Testing', sla: 'Mission Critical' },
                ].map((row) => (
                  <tr 
                    key={row.key} 
                    onClick={() => handleOpenPillar(row.key)}
                    className="hover:bg-surface-container-high/60 transition-colors cursor-pointer group"
                  >
                    <td className="p-space-md font-bold text-on-surface flex items-center gap-2 group-hover:text-primary transition-colors">
                      <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                      <span>{row.name}</span>
                    </td>
                    <td className="p-space-md text-on-surface-variant font-sans">{row.scope}</td>
                    <td className="p-space-md text-secondary font-bold">{row.turnaround}</td>
                    <td className="p-space-md text-on-surface-variant font-sans">{row.telemetry}</td>
                    <td className="p-space-md text-emerald-500 font-bold">{row.sla}</td>
                    <td className="p-space-md text-right text-primary font-bold">
                      <span className="group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                        <span>OPEN</span>
                        <ArrowRight size={12} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottleneck Resolution Modal */}
      <AnimatePresence>
        {selectedBottleneck && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl bg-surface-container-lowest border border-outline/40 rounded-2xl shadow-2xl p-space-lg sm:p-space-xl space-y-space-md relative max-h-[92vh] overflow-y-auto"
            >
              <button 
                onClick={() => { playUiChime('click'); setSelectedBottleneck(null); }}
                className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors cursor-pointer border border-outline/30"
                aria-label="Close Modal"
              >
                <X size={18} />
              </button>

              <div className="space-y-1.5 pr-10 border-b border-outline/20 pb-space-sm">
                <div className="flex items-center gap-2 font-mono text-xs text-error font-bold">
                  <AlertTriangle size={14} />
                  <span>DIAGNOSTIC RESOLUTION PROTOCOL // BOTTLENECK #{selectedBottleneck.num}</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface font-extrabold uppercase tracking-tight">
                  {selectedBottleneck.title}
                </h3>
                <div className="font-mono text-xs text-secondary font-semibold">
                  RECOMMENDED ARCHITECTURE: {selectedBottleneck.resolutionPillar}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm font-mono text-xs">
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/30 space-y-1">
                  <span className="text-[10px] text-outline uppercase font-bold">CORE SYMPTOM:</span>
                  <p className="font-sans text-xs text-on-surface leading-relaxed">{selectedBottleneck.symptom}</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/30 space-y-1">
                  <span className="text-[10px] text-outline uppercase font-bold">BUSINESS IMPACT:</span>
                  <p className="font-sans text-xs text-error leading-relaxed font-semibold">{selectedBottleneck.impact}</p>
                </div>
              </div>

              <div className="p-space-md bg-surface-container rounded-xl border border-outline/30 space-y-2">
                <div className="font-mono text-xs text-primary font-bold uppercase flex items-center gap-1.5">
                  <ShieldCheck size={16} />
                  <span>EXECUTABLE RESOLUTION RUNBOOK</span>
                </div>
                <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                  {selectedBottleneck.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-mono font-bold mt-0.5">[{idx + 1}]</span>
                      <span className="text-on-surface font-medium">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline uppercase font-bold">DEPLOYMENT STACK:</div>
                  <div className="font-bold text-on-surface mt-0.5">{selectedBottleneck.techStack}</div>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline uppercase font-bold">SLA TARGET:</div>
                  <div className="font-bold text-emerald-500 mt-0.5">{selectedBottleneck.slaTarget}</div>
                </div>
              </div>

              <div className="pt-space-md border-t border-outline/30 flex flex-wrap items-center justify-between gap-space-sm">
                <button
                  onClick={() => handleCopyBottleneckPlan(selectedBottleneck)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-surface-container hover:bg-surface-container-high border border-outline text-on-surface rounded-xl font-mono text-xs font-bold transition-all cursor-pointer active:scale-95"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  <span>{copied ? 'PLAN COPIED' : 'COPY RESOLUTION RUNBOOK'}</span>
                </button>

                <a 
                  href={`mailto:hr@mihora.tech?subject=Urgent%20Consultation%20for%20Bottleneck%20%23${selectedBottleneck.num}%20(${selectedBottleneck.title})&body=Hello%20MIHORA%20Architects,%0A%0AWe%20are%20experiencing%20Bottleneck%20%23${selectedBottleneck.num}:%20${selectedBottleneck.title}.%0A%0APlease%20provide%20a%20technical%20consultation%20and%20remediation%20timeline.`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 btn-primary-gradient font-mono text-xs uppercase font-bold text-on-primary rounded-xl transition-all shadow-md active:scale-95"
                >
                  <Mail size={14} />
                  <span>CONSULT ARCHITECT (HR@MIHORA.TECH)</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pillar Detail Modal */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl bg-surface-container-lowest border border-outline/40 rounded-2xl shadow-2xl p-space-lg sm:p-space-xl space-y-space-md relative max-h-[92vh] overflow-y-auto"
            >
              <button 
                onClick={() => { playUiChime('click'); setSelectedPillar(null); }}
                className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors cursor-pointer border border-outline/30"
                aria-label="Close Pillar"
              >
                <X size={18} />
              </button>

              <div className="space-y-1 pr-10 border-b border-outline/20 pb-space-sm">
                <div className="font-mono text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={14} />
                  <span>PILLAR 0{selectedPillar.num} OPERATIONAL BLUEPRINT &amp; SPECS</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface font-extrabold uppercase tracking-tight">
                  {selectedPillar.name}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {selectedPillar.overview}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline uppercase font-bold">SCOPE</div>
                  <div className="text-xs font-bold text-on-surface mt-0.5">{selectedPillar.scope}</div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline uppercase font-bold">TIMELINE</div>
                  <div className="text-xs font-bold text-secondary mt-0.5">{selectedPillar.turnaround}</div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline uppercase font-bold">SLA TARGET</div>
                  <div className="text-xs font-bold text-emerald-500 mt-0.5">{selectedPillar.sla}</div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline uppercase font-bold">TELEMETRY</div>
                  <div className="text-xs font-bold text-primary mt-0.5">{selectedPillar.telemetry.split(' ')[0]}</div>
                </div>
              </div>

              <div className="space-y-2 bg-surface-container p-space-md rounded-xl border border-outline/30">
                <div className="font-mono text-xs text-primary font-bold uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={16} />
                  <span>KEY DELIVERABLES &amp; COMPLIANCE ARTIFACTS</span>
                </div>
                <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                  {selectedPillar.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-mono font-bold mt-0.5">[{idx + 1}]</span>
                      <span className="text-on-surface font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-space-md border-t border-outline/30 flex flex-wrap items-center justify-between gap-space-sm">
                <span className="font-mono text-[11px] text-outline">MIHORA SOVEREIGN ENGINEERING</span>
                <a 
                  href={`mailto:hr@mihora.tech?subject=Consultation%20Request%20for%20Pillar%20${selectedPillar.num}%20(${selectedPillar.name})&body=Hello%20MIHORA%20Team,%0A%0AI%20am%20interested%20in%20deploying%20Pillar%20${selectedPillar.num}:%20${selectedPillar.name}.%0A%0APlease%20arrange%20an%20architectural%20scoping%20call.`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 btn-primary-gradient font-mono text-xs uppercase font-bold text-on-primary rounded-xl transition-all shadow-md active:scale-95"
                >
                  <Mail size={14} />
                  <span>REQUEST ARCHITECTURAL CONSULT</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Enterprise Architecture & RFP Specification Engine */}
      <SovereignRfpBuilder />

      {/* CTA */}
      <section className="w-full bg-surface-container-lowest px-margin-mobile lg:px-margin py-space-xl border-t border-outline/20">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-surface-container-high to-surface-container p-space-lg lg:p-16 rounded-2xl shadow-2xl relative overflow-hidden border border-outline/30">
          <div className="max-w-2xl space-y-space-md relative z-10">
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary-container font-mono tracking-widest uppercase font-bold">
              <span className="w-2 h-2 bg-secondary-container rounded-full animate-ping"></span>
              <span>INITIATE ARCHITECTURAL CONSULT</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight font-extrabold">
              LET'S ARCHITECT YOUR SOLUTION.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Bring your toughest technical constraints. Our engineering leads will review your bottlenecks, trace dependencies, and produce an executable architecture blueprint within 5 business days.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
              <a 
                href="mailto:hr@mihora.tech" 
                onClick={() => playUiChime('click')}
                className="inline-flex items-center gap-space-xs px-space-lg py-3.5 btn-primary-gradient text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-xl shadow-lg transition-all font-bold active:scale-95"
              >
                <span>[ DIRECT DISPATCH: HR@MIHORA.TECH ]</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
