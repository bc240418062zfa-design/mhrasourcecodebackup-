import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import {
  PencilRuler, ArrowDown, AlertTriangle, Network, X, Check, Copy,
  Mail, ShieldCheck, Layers, ArrowRight, CheckCircle2, ChevronRight
} from 'lucide-react';
import { playUiChime } from '../utils/audio';
import { SovereignRfpBuilder } from '../components/SovereignRfpBuilder';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal, StaggerGrid, StaggerItem, AnimatedCounter, MaskTextReveal, SpotlightSurface } from '../components/MotionPrimitives';

interface Bottleneck {
  id: string;
  num: string;
  title: string;
  category: 'scale' | 'infra' | 'custom';
  symptom: string;
  impact: string;
  resolutionPillar: string;
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
    symptom:
      'Teams duplicate data entry across disconnected ERPs, spreadsheets, and legacy databases, introducing a 38% operational cycle delay.',
    impact:
      'Elevated reconciliation errors, multi-hour fulfillment delays, and zero live inventory visibility.',
    resolutionPillar: 'Pillar 02: Business Automation & Orchestration',
    steps: [
      'Deploy Apache Kafka / NATS transactional outbox event brokers between ERP and warehouse modules',
      'Implement idempotent Change Data Capture (CDC) pipelines on legacy relational schemas',
      'Establish unified federated API gateways for internal operations portals',
      'Enable automated exception reconciliation with direct escalation routing'
    ],
    techStack: 'Kafka, Debezium CDC, GraphQL, PostgreSQL, Go 1.23',
    slaTarget: 'Sub-second real-time database synchronization'
  },
  {
    id: 'b2',
    num: '02',
    category: 'infra',
    title: 'Unreliable Multi-Site Edge Connectivity',
    symptom:
      'Industrial plants, distribution centers, and branch networks experience silent packet drops and uncoordinated ISP failovers.',
    impact:
      'Warehouse conveyor halts, dropped barcode dispatch transactions, and dark security camera feeds.',
    resolutionPillar: 'Pillar 03 & 04: Infrastructure Deployment & Remote Ops',
    steps: [
      'Install dual-carrier SD-WAN gateways with sub-second BGP route failover',
      'Deploy ruggedized local edge compute nodes for offline-first autonomous sorting',
      'Establish encrypted WireGuard site-to-site mesh links across all branch sites',
      'Monitor optical link loss and jitter 24/7 from unified NOC telemetry dashboards'
    ],
    techStack: 'WireGuard, BGP Anycast, Linux eBPF, Prometheus, Cat6A STP',
    slaTarget: '99.999% network availability with < 200 ms failover'
  },
  {
    id: 'b3',
    num: '03',
    category: 'custom',
    title: 'Off-The-Shelf SaaS Incompatibility',
    symptom:
      'Industrial SCADA, legacy PLC sensors, and proprietary serial protocols cannot connect safely to commercial cloud tooling.',
    impact:
      'Isolated machine telemetry, inability to coordinate thermal safety thresholds, and high cloud egress fees.',
    resolutionPillar: 'Pillar 06: Custom Protocol & Rig Engineering',
    steps: [
      'Engineer custom Modbus / CAN-Bus / OPC-UA to gRPC translator appliances',
      'Deploy optically isolated interface boards for noisy high-voltage environments',
      'Build sovereign on-premise time-series lakehouses (TimescaleDB / ClickHouse)',
      'Implement hardware fail-safe watchdog circuits for zero-downtime protection'
    ],
    techStack: 'Rust, C++, Modbus RTU/TCP, ClickHouse, Isolated SCADA',
    slaTarget: 'Deterministic < 5 ms polling loop with hardware watchdogs'
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
}

const pillarDetails: Record<string, PillarDetail> = {
  digital: {
    id: 'digital',
    num: '01',
    name: 'Digital Transformation',
    scope: 'Enterprise Core & Hybrid Cloud',
    turnaround: '3–9 Months',
    telemetry: 'OpenTelemetry Distributed Tracing',
    sla: '99.95% Availability',
    overview:
      'Replaces fragile legacy monoliths with decoupled distributed topologies engineered to handle linear growth without downtime.',
    deliverables: [
      'Domain-driven service architecture specification',
      'Automated CI/CD canary pipelines with instant rollback gates',
      'Distributed OpenTelemetry tracing mesh across all microservices',
      'Complete operator runbooks and disaster-recovery verification logs'
    ]
  },
  automation: {
    id: 'automation',
    num: '02',
    name: 'Business Automation',
    scope: 'Cross-System API & Middleware',
    turnaround: '4–12 Weeks',
    telemetry: 'State & Reconciliation Audit Telemetry',
    sla: '99.99% Delivery',
    overview:
      'Eliminates manual bottleneck queues by linking legacy databases, ERP interfaces, and message brokers into deterministic workflows.',
    deliverables: [
      'Idempotent transactional outbox pattern implementation',
      'Private OCR and document validation pipeline',
      'Secrets isolation via dedicated Vault enclaves',
      'Real-time exception triage queues and audit trails'
    ]
  },
  infra: {
    id: 'infra',
    num: '03',
    name: 'Infrastructure Deployment',
    scope: 'Datacenter Racks & Optical Fiber',
    turnaround: '2–8 Weeks',
    telemetry: 'Fluke DSX & EXFO OTDR Certification',
    sla: '99.999% Physical Uptime',
    overview:
      'Designs, provisions, and commissions Tier III/IV compliant server racks, structured copper/fiber plants, and 2N power rails.',
    deliverables: [
      'TIA-568-D certified Cat6A and Single-Mode OS2 cabling plants',
      'Signed bidirectional EXFO OTDR optical loss traces',
      'Hot/cold aisle thermal containment and 3-phase PDU load balance',
      'Seismically braced 42U/48U server enclosures'
    ]
  },
  remote: {
    id: 'remote',
    num: '04',
    name: 'Remote Operations',
    scope: 'Multi-Site Edge SCADA & Probes',
    turnaround: '3–6 Weeks',
    telemetry: 'Real-Time Environmental & Power Metrics',
    sla: '99.98% Telemetry Delivery',
    overview:
      'Deploys resilient SCADA and NOC telemetry relays allowing central engineering teams to oversee distributed facilities globally.',
    deliverables: [
      'Edge environmental probes (temperature, humidity, PDU power draw)',
      'Dual-SIM cellular LTE/5G out-of-band failover relays',
      'Unified Grafana operational command dashboards',
      'Automated paging escalation when sensors breach thresholds'
    ]
  },
  technical: {
    id: 'technical',
    num: '05',
    name: 'Technical Operations',
    scope: '24/7 Managed NOC & Dual-Hub SRE',
    turnaround: 'Continuous SLA',
    telemetry: 'Synthetic Probing & P99 Tail Tracking',
    sla: '99.999% SRE SLA',
    overview:
      'Follow-the-sun Site Reliability Engineering operating seamlessly across London and Islamabad watchdesks.',
    deliverables: [
      'Embedded Tier-3 SRE rotation covering UK and South Asia timezones',
      'Sub-15-minute P1 incident containment guarantees',
      'Zero-downtime CVE firmware and kernel patching',
      'Monthly reliability error-budget and capacity reviews'
    ]
  },
  custom: {
    id: 'custom',
    num: '06',
    name: 'Custom Engineering',
    scope: 'Bespoke Hardware Bridges & Rigs',
    turnaround: '6–16 Weeks',
    telemetry: 'Kernel eBPF & Physical Bench Verification',
    sla: 'Mission Critical',
    overview:
      'Constructs specialized hardware-software bridges, optical data diodes, and ruggedized compute rigs for non-standard industrial workloads.',
    deliverables: [
      'Custom controller firmware & embedded telemetry gateways',
      'Optically isolated electrical interface daughterboards',
      'Zero-packet-loss proprietary protocol translation engines',
      'Weatherproof NEMA-4X field-tested industrial enclosures'
    ]
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
    const text = `MIHORA.TECH RESOLUTION SPEC
Bottleneck #${b.num}: ${b.title}
Symptom: ${b.symptom}
Pillar: ${b.resolutionPillar}
Stack: ${b.techStack}
SLA Target: ${b.slaTarget}
Steps:
${b.steps.map((s) => `- ${s}`).join('\n')}
Contact: hr@mihora.tech`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="w-full obsidian-band obsidian-grid border-b border-white/10 py-14 lg:py-22 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumbs items={[{ label: 'Solutions' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <Reveal>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                  Problem-Led Architecture &amp; Transformation
                </div>
              </Reveal>
              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  Enterprise Solutions Built Around Operational Reality
                </h1>
              </MaskTextReveal>
              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  We do not package generic software templates. MIHORA.TECH architects custom digital systems and physical network infrastructure that resolve hard throughput, security, and connectivity bottlenecks.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="pt-1 flex flex-wrap items-center gap-4">
                  <a
                    href="#diagnostic-matrix"
                    onClick={() => playUiChime('click')}
                    className="inline-flex items-center gap-2 px-6 py-3 btn-primary-gradient font-semibold rounded-lg text-sm transition-all cursor-pointer"
                  >
                    <PencilRuler size={16} />
                    <span>Diagnostic Matrix</span>
                  </a>
                  <a
                    href="#sovereign-rfp-builder"
                    onClick={() => playUiChime('click')}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.06] border border-white/20 hover:bg-white/[0.12] text-white font-semibold rounded-lg text-sm transition-all cursor-pointer"
                  >
                    <span>Launch RFP Specifier</span>
                    <ArrowDown size={15} />
                  </a>
                  <Link
                    to="/how-it-works"
                    className="text-sm font-semibold text-amber-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>See 5-Phase Process</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4 bg-white/[0.04] p-6 rounded-2xl border border-white/15 space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <span className="font-mono text-xs font-bold uppercase text-amber-400">Delivery Profile</span>
                <Network className="text-amber-400" size={18} />
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/15 border border-white/15 bg-black/30 rounded-xl font-mono overflow-hidden">
                <div className="p-3.5">
                  <div className="text-[11px] text-slate-400">Deployments</div>
                  <div className="font-headline text-2xl font-extrabold text-white mt-0.5">
                    <AnimatedCounter target={140} suffix="+" />
                  </div>
                </div>
                <div className="p-3.5">
                  <div className="text-[11px] text-slate-400">System Uptime</div>
                  <div className="font-headline text-2xl font-extrabold text-amber-400 mt-0.5">
                    <AnimatedCounter target={99.999} decimals={3} suffix="%" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Combined hardware &amp; software accountability spanning London (UK) and Islamabad (Pakistan) command hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottleneck Diagnostic Matrix */}
      <section id="diagnostic-matrix" className="w-full bg-surface px-4 sm:px-6 lg:px-8 py-16 border-b border-outline/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                System Diagnostic Tool
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                Operational Bottleneck Matrix
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant">
                Filter common operational failures and inspect the corresponding executable MIHORA engineering resolution blueprint.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Domains' },
                { id: 'scale', label: 'Legacy Drag' },
                { id: 'infra', label: 'Field Outages' },
                { id: 'custom', label: 'Custom Hardware' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={clsx(
                    'px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer border',
                    activeCategory === filter.id
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface border-outline/25'
                  )}
                  onClick={() => {
                    setActiveCategory(filter.id as typeof activeCategory);
                    playUiChime('click');
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bottlenecks.map((b) => {
              const visible = activeCategory === 'all' || activeCategory === b.category;
              if (!visible) return null;

              return (
                <StaggerItem key={b.id}>
                  <SpotlightSurface className="h-full rounded-2xl">
                    <button
                      type="button"
                      onClick={() => handleOpenBottleneck(b)}
                      className="w-full text-left bg-surface-container-lowest p-6 rounded-2xl border border-outline/25 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-5 h-full"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-gold font-mono text-xs font-bold">
                          <span>Bottleneck #{b.num}</span>
                          <AlertTriangle size={17} />
                        </div>
                        <h3 className="font-headline text-lg text-on-surface font-bold group-hover:text-primary transition-colors">
                          {b.title}
                        </h3>
                        <p className="text-sm text-on-surface-variant leading-relaxed">{b.symptom}</p>
                      </div>

                      <div className="pt-4 bg-surface-container-low p-4 rounded-xl space-y-1.5 border border-outline/15 w-full">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-primary font-semibold">Engineered Resolution</span>
                          <span className="text-primary font-semibold inline-flex items-center gap-1">
                            <span>Inspect</span>
                            <ArrowRight size={12} />
                          </span>
                        </div>
                        <div className="text-xs text-on-surface font-semibold">{b.resolutionPillar}</div>
                      </div>
                    </button>
                  </SpotlightSurface>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* Six Solution Pillars */}
      <section id="pillars" className="w-full bg-surface-container-lowest px-4 sm:px-6 lg:px-8 py-16 space-y-12 border-b border-outline/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-2xl space-y-2">
            <div className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
              Architectural Foundation
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
              Six Comprehensive Solution Pillars
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant">
              Tap any row in the matrix below to view turnaround windows, telemetry commitments, and engineering deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(pillarDetails).map((pillar) => (
              <div
                key={pillar.id}
                id={pillar.id === 'digital' ? 'digital-transformation' : pillar.id === 'automation' ? 'business-automation' : pillar.id === 'infra' ? 'infrastructure-deployment' : pillar.id === 'remote' ? 'remote-operations' : pillar.id === 'technical' ? 'technical-operations' : 'custom-engineering'}
                className="scroll-mt-28 bg-surface-container-low p-6 rounded-2xl border border-outline/25 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-primary font-semibold">
                    <span>Pillar {pillar.num}</span>
                    <span>{pillar.sla}</span>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">{pillar.name}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{pillar.overview}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenPillar(pillar.id)}
                  className="w-full py-2.5 px-4 bg-surface-container-lowest hover:bg-primary hover:text-white border border-outline/25 hover:border-primary text-primary text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Inspect Pillar Specification</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Pillar Comparison Table */}
          <div className="overflow-x-auto bg-surface-container-low rounded-2xl border border-outline/25">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container text-on-surface text-xs uppercase tracking-wider font-mono border-b border-outline/20">
                  <th className="p-4">Solution Pillar</th>
                  <th className="p-4">Deployment Scope</th>
                  <th className="p-4">Timeline</th>
                  <th className="p-4">Telemetry Standard</th>
                  <th className="p-4">SLA Guarantee</th>
                  <th className="p-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/15 text-sm">
                {Object.values(pillarDetails).map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => handleOpenPillar(row.id)}
                    className="hover:bg-surface-container/60 transition-colors cursor-pointer"
                  >
                    <td className="p-4 font-bold text-on-surface">{row.name}</td>
                    <td className="p-4 text-on-surface-variant">{row.scope}</td>
                    <td className="p-4 font-mono text-xs text-primary font-semibold">{row.turnaround}</td>
                    <td className="p-4 text-on-surface-variant">{row.telemetry}</td>
                    <td className="p-4 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">{row.sla}</td>
                    <td className="p-4 text-right font-mono text-xs text-primary font-semibold">
                      Inspect →
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottleneck Modal */}
      <AnimatePresence>
        {selectedBottleneck && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedBottleneck(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl bg-surface-container-lowest border border-outline/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  playUiChime('click');
                  setSelectedBottleneck(null);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center cursor-pointer"
                aria-label="Close Modal"
              >
                <X size={18} />
              </button>

              <div className="space-y-1.5 pr-10 border-b border-outline/20 pb-4">
                <div className="font-mono text-xs text-primary font-bold uppercase">
                  Diagnostic Resolution · Bottleneck #{selectedBottleneck.num}
                </div>
                <h2 className="font-headline text-2xl font-extrabold text-on-surface">
                  {selectedBottleneck.title}
                </h2>
                <div className="text-xs font-mono text-on-surface-variant">{selectedBottleneck.resolutionPillar}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-surface-container-low rounded-xl border border-outline/20 space-y-1">
                  <div className="text-xs font-mono uppercase text-on-surface-variant font-semibold">Symptom</div>
                  <p className="text-on-surface leading-relaxed">{selectedBottleneck.symptom}</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl border border-outline/20 space-y-1">
                  <div className="text-xs font-mono uppercase text-on-surface-variant font-semibold">Operational Impact</div>
                  <p className="text-on-surface leading-relaxed">{selectedBottleneck.impact}</p>
                </div>
              </div>

              <div className="p-5 bg-surface-container-low rounded-xl border border-outline/20 space-y-3">
                <div className="font-mono text-xs text-primary font-bold uppercase flex items-center gap-1.5">
                  <ShieldCheck size={15} />
                  <span>Execution Runbook</span>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {selectedBottleneck.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-primary font-bold mt-0.5">0{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-outline/20">
                <button
                  type="button"
                  onClick={() => handleCopyBottleneckPlan(selectedBottleneck)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface-container hover:bg-surface-container-high border border-outline/30 text-on-surface rounded-lg font-mono text-xs font-semibold cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  <span>{copied ? 'Plan Copied' : 'Copy Runbook'}</span>
                </button>

                <Link
                  to="/contact"
                  onClick={() => setSelectedBottleneck(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs rounded-lg shadow-sm"
                >
                  <Mail size={14} />
                  <span>Discuss with Architecture Team</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pillar Detail Modal */}
      <AnimatePresence>
        {selectedPillar && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPillar(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl bg-surface-container-lowest border border-outline/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  playUiChime('click');
                  setSelectedPillar(null);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center cursor-pointer"
                aria-label="Close Pillar"
              >
                <X size={18} />
              </button>

              <div className="space-y-1.5 pr-10 border-b border-outline/20 pb-4">
                <div className="font-mono text-xs text-primary font-bold uppercase flex items-center gap-1.5">
                  <Layers size={14} />
                  <span>Pillar {selectedPillar.num} Blueprint</span>
                </div>
                <h2 className="font-headline text-2xl font-extrabold text-on-surface">
                  {selectedPillar.name}
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed">{selectedPillar.overview}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20">
                  <div className="text-[10px] text-on-surface-variant uppercase">Scope</div>
                  <div className="font-bold text-on-surface mt-0.5">{selectedPillar.scope}</div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20">
                  <div className="text-[10px] text-on-surface-variant uppercase">Timeline</div>
                  <div className="font-bold text-primary mt-0.5">{selectedPillar.turnaround}</div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20">
                  <div className="text-[10px] text-on-surface-variant uppercase">SLA</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedPillar.sla}</div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20">
                  <div className="text-[10px] text-on-surface-variant uppercase">Telemetry</div>
                  <div className="font-bold text-on-surface mt-0.5">{selectedPillar.telemetry}</div>
                </div>
              </div>

              <div className="space-y-2.5 bg-surface-container-low p-5 rounded-xl border border-outline/20">
                <div className="font-mono text-xs text-primary font-bold uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>Key Deliverables</span>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {selectedPillar.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-primary font-bold mt-0.5">0{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-outline/20">
                <Link to="/case-studies" className="text-xs font-semibold text-primary hover:underline">
                  See field case studies →
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setSelectedPillar(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs rounded-lg shadow-sm"
                >
                  <Mail size={14} />
                  <span>Schedule Architecture Consult</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Sovereign RFP Specifier */}
      <SovereignRfpBuilder />
    </div>
  );
}
