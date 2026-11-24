import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal, Code2, Smartphone, Cpu, PenTool, Split, Network,
  Bot, Server, Router, Database, Building, Cloud, Eye, Settings, Wrench, Factory, Brain, List,
  Ruler, Cable, Video, AlertTriangle, HardHat, Headset, Monitor, ArrowDown,
  ShieldCheck, Users, X, Copy, Check, Mail, ArrowRight, Layers, ArrowUpRight
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { playUiChime } from '../utils/audio';
import { VISUAL_ASSETS } from '../assets/visuals';
import { SERVICE_DIVISIONS } from '../data/servicesData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal, StaggerGrid, StaggerItem, AnimatedCounter, MaskTextReveal, SpotlightSurface, Tilt3DFrame } from '../components/MotionPrimitives';

interface ServiceNode {
  id: string;
  division: string;
  intents: string[];
  name: string;
  desc: string;
  icon: LucideIcon;
  tags: string[];
  latency?: string;
  redundancy?: string;
  sla?: string;
  capacity?: string;
  deliverables?: string[];
}

const serviceNodes: ServiceNode[] = [
  // DIGITAL ENGINEERING
  {
    id: '1.1', division: 'digital', intents: ['BUILD', 'OPTIMIZE'], name: 'Web Development',
    desc: 'Reactive micro-frontends, headless architectures, and enterprise web platforms built for sub-second rendering.',
    icon: Code2, tags: ['React / Go / K8s'],
    latency: '< 45 ms Edge TTFB', redundancy: 'Multi-Region Anycast DNS', sla: '99.995%',
    capacity: '120,000 req/sec sustained',
    deliverables: ['Production edge bundle with pre-rendered routes', 'Core Web Vitals speed verification', 'Automated CI/CD canary deployment pipelines', 'Playwright end-to-end verification suites']
  },
  {
    id: '1.2', division: 'digital', intents: ['BUILD'], name: 'Application Development',
    desc: 'Native mobile applications, offline-first tactical field tools, and cross-platform enterprise suites.',
    icon: Smartphone, tags: ['Flutter / Swift / Rust'],
    latency: '< 8 ms Local Frame Render', redundancy: 'Local SQLite + CRDT Sync', sla: '99.99%',
    capacity: 'Offline-first peer sync',
    deliverables: ['Cross-platform iOS, Android & Desktop binaries', 'Conflict-free replicated data types (CRDT)', 'Biometric hardware enclave signing', 'Field technician telemetry capture module']
  },
  {
    id: '1.3', division: 'digital', intents: ['BUILD', 'OPTIMIZE'], name: 'Software Engineering',
    desc: 'Core backend engines, fault-tolerant event streaming, PostgreSQL sharding, and concurrent systems.',
    icon: Cpu, tags: ['Rust / Go / Postgres'],
    latency: '< 1.4 ms P99 Processing', redundancy: 'Raft Quorum Consensus', sla: '99.999%',
    capacity: '1.5M transactions/min',
    deliverables: ['High-throughput compiled state engine', 'Partitioned PostgreSQL sharding blueprints', 'Idempotent lock-free telemetry queues', 'Static memory & concurrency verification']
  },
  {
    id: '1.4', division: 'digital', intents: ['BUILD'], name: 'UI/UX Engineering',
    desc: 'High-density operator consoles, design token systems, and WCAG-accessible enterprise interfaces.',
    icon: PenTool, tags: ['Design Tokens / Radix'],
    latency: '60 FPS Surface Refresh', redundancy: 'WCAG 2.2 AAA Contrast', sla: '100% Deterministic State',
    capacity: '4K Control Center Displays',
    deliverables: ['Unified daylight/obsidian design token system', 'Virtualized data grids for real-time telemetry', 'Accessible keyboard-first navigation flows', 'Reduced-motion & tactile confirmation cues']
  },
  {
    id: '1.5', division: 'digital', intents: ['BUILD', 'CONNECT'], name: 'API Development',
    desc: 'Federated GraphQL meshes, binary gRPC services, and zero-trust OpenAPI conduits.',
    icon: Network, tags: ['REST / gRPC / Protobuf'],
    latency: '< 2.2 ms Gateway Routing', redundancy: 'Triple Hot-Standby Ingress', sla: '99.999%',
    capacity: '250K concurrent connections',
    deliverables: ['Protobuf schema repo with compatibility gates', 'mTLS bidirectional certificate authentication', 'Distributed token-bucket rate limiters', 'Generated client SDKs in TypeScript & Go']
  },
  {
    id: '1.6', division: 'digital', intents: ['CONNECT', 'OPTIMIZE'], name: 'Systems Integration',
    desc: 'Legacy ERP orchestration, CDC middleware pipelines, and unified enterprise event buses.',
    icon: Split, tags: ['Kafka / CDC / Bridge'],
    latency: '< 15 ms End-to-End Sync', redundancy: '3x Replicated Event Brokers', sla: '99.99%',
    capacity: '500 MB/sec sustained',
    deliverables: ['Change Data Capture pipelines from legacy DBs', 'Transactional outbox pattern implementation', 'Dead-letter triage & automated replay', 'Immutable cross-system audit ledger']
  },

  // AUTOMATION
  {
    id: '2.1', division: 'automation', intents: ['AUTOMATE'], name: 'Workflow Automation',
    desc: 'Deterministic Temporal/Kafka logic loops, cross-SaaS ETL orchestration, and resilient job runners.',
    icon: Network, tags: ['Temporal / Kafka'],
    latency: '< 500 ms Trigger Execution', redundancy: 'Dual-Worker Failover', sla: '99.99%',
    capacity: '50,000 runs/hour',
    deliverables: ['Idempotent state-machine workflows', 'Automated rollback on downstream faults', 'Hardware Vault credential isolation', 'Real-time execution telemetry trace']
  },
  {
    id: '2.2', division: 'automation', intents: ['AUTOMATE', 'OPTIMIZE'], name: 'Business Automation',
    desc: 'Procurement, invoice OCR reconciliation, and cryptographic compliance audit automation.',
    icon: Factory, tags: ['Enterprise Ops'],
    latency: 'Sub-Minute Document Parse', redundancy: 'SHA-256 Audit Ledger', sla: '99.98%',
    capacity: '10,000 invoices daily',
    deliverables: ['Automated OCR & semantic field extraction', 'Three-way PO/receipt reconciliation engine', 'Automated compliance approval gates', 'Multi-currency ledger sync module']
  },
  {
    id: '2.3', division: 'automation', intents: ['AUTOMATE', 'BUILD'], name: 'Private AI Integration',
    desc: 'Air-gapped sovereign model inference and proprietary vector search operating inside client walls.',
    icon: Brain, tags: ['On-Prem GPU Inference'],
    latency: '< 180 ms First Token', redundancy: 'Private Isolated Cluster', sla: '99.95%',
    capacity: '1,000 concurrent streams',
    deliverables: ['Local weight hosting on isolated GPU servers', 'Hybrid dense-sparse private vector search', 'PII redaction & schema validation guardrails', 'Role-enforced access control on retrieval']
  },
  {
    id: '2.4', division: 'automation', intents: ['BUILD', 'AUTOMATE'], name: 'Internal Tools',
    desc: 'Bespoke operational dashboards, RBAC consoles, and high-trust admin surfaces for engineering leads.',
    icon: Terminal, tags: ['RBAC / SSO Ready'],
    latency: '< 120 ms Query Execution', redundancy: 'OIDC / SAML SSO Auth', sla: '99.99%',
    capacity: 'Unlimited operator seats',
    deliverables: ['Attribute-based access control permissions', 'Instant CSV/Parquet audit exports', 'Double-confirmation destructive action gates', 'SOC2-ready immutable action trail']
  },
  {
    id: '2.5', division: 'automation', intents: ['OPTIMIZE', 'CONNECT'], name: 'Data Processing',
    desc: 'Distributed Spark/Flink streaming ingestion and lakehouse analytics telemetry platforms.',
    icon: List, tags: ['ClickHouse / Flink'],
    latency: '< 250 ms Window Aggregation', redundancy: 'Exactly-Once Checkpoints', sla: '99.999%',
    capacity: '2.5 GB/sec raw telemetry',
    deliverables: ['Partitioned Apache Iceberg lakehouse schemas', 'Schema evolution & dead-letter isolation', 'Sliding-window anomaly triggers', 'Automated archival & compaction rules']
  },
  {
    id: '2.6', division: 'automation', intents: ['AUTOMATE', 'BUILD'], name: 'Industrial SCADA Automation',
    desc: 'Hardware-in-the-loop automation and optically isolated PLC/Modbus bridges for plants & grids.',
    icon: Settings, tags: ['Modbus / OPC-UA'],
    latency: '< 5 ms Polling Loop', redundancy: 'Hardware Watchdog Timers', sla: '99.999%',
    capacity: '256 I/O channels per rig',
    deliverables: ['Modbus RTU/TCP & OPC-UA protocol bridges', 'Optically isolated diode protection hardware', 'Fail-safe emergency state cutoff logic', 'Signed firmware lifecycle management']
  },

  // INFRASTRUCTURE
  {
    id: '3.1', division: 'infra', intents: ['CONNECT'], name: 'Network Engineering',
    desc: 'BGP routing optimization, EVPN-VXLAN spine-leaf fabrics, and multi-homed optical perimeters.',
    icon: Router, tags: ['Zero-Trust L3/L7'],
    latency: '< 0.8 ms Core Hop', redundancy: 'BGP Anycast Dual-Homed', sla: '99.999%',
    capacity: '100 Gbps–800 Gbps fabric',
    deliverables: ['EVPN-VXLAN campus/DC network topology', 'Zero-trust east-west firewall rules', 'Automated BGP Flowspec DDoS mitigation', 'Quarterly Fluke link verification audits']
  },
  {
    id: '3.2', division: 'infra', intents: ['CONNECT', 'DEPLOY'], name: 'Servers & SAN Storage',
    desc: 'NVMe-oF SAN fabrics, Ceph clusters, Proxmox/KVM hypervisors, and immutable off-site backups.',
    icon: Database, tags: ['NVMe-oF / Ceph'],
    latency: '< 150 μs NVMe Read', redundancy: 'Ceph 3x Replication', sla: '99.999%',
    capacity: '12+ PB enterprise density',
    deliverables: ['Bare-metal hypervisor clusters with fencing', 'Self-healing distributed Ceph pools', 'Immutable LTO tape & off-site vaulting', 'Continuous SMART drive predictive alarms']
  },
  {
    id: '3.3', division: 'infra', intents: ['DEPLOY'], name: 'Datacenter Infrastructure',
    desc: '42U/48U rack architecture, hot/cold aisle containment, 2N ATS busways, and carrier cross-connects.',
    icon: Building, tags: ['Tier III & IV Rated'],
    latency: 'Design PUE 1.14', redundancy: '2N UPS + Dual Generators', sla: '99.999%',
    capacity: 'Up to 35 kW per rack',
    deliverables: ['3D CAD rack elevations & power load schedules', 'CFD thermal airflow & cold-aisle containment', 'Carrier-neutral meet-me-room optical patching', 'VESDA early smoke detection telemetry']
  },
  {
    id: '3.4', division: 'infra', intents: ['DEPLOY', 'CONNECT'], name: 'Hybrid Cloud & IaC',
    desc: 'Declarative Terraform/Ansible modules bridging sovereign on-prem hardware with encrypted VPCs.',
    icon: Cloud, tags: ['Terraform / GitOps'],
    latency: '10-Min Cluster Provision', redundancy: 'Multi-Zone WireGuard', sla: '99.99%',
    capacity: '10 to 1,000+ nodes',
    deliverables: ['Policy-enforced Terraform module libraries', 'GitOps reconciliation with ArgoCD', 'Encrypted WireGuard/IPsec site interconnects', 'Staging chaos validation test suites']
  },
  {
    id: '3.5', division: 'infra', intents: ['OPTIMIZE', 'SUPPORT'], name: 'Monitoring & Observability',
    desc: 'Prometheus, Thanos, Grafana, and OpenTelemetry tracing across hardware sensors and app pods.',
    icon: Eye, tags: ['Prometheus / OTel'],
    latency: '1-Second Metrics Scrape', redundancy: 'Dual Thanos Long-Term Store', sla: '99.99%',
    capacity: '50M active timeseries',
    deliverables: ['Executive & SRE Grafana cockpit dashboards', 'Escalation paging via Alertmanager', 'Distributed end-to-end OpenTelemetry traces', 'Predictive memory & optical decay alerting']
  },
  {
    id: '3.6', division: 'infra', intents: ['SUPPORT', 'OPTIMIZE'], name: 'System Hardening & Compliance',
    desc: 'CIS Level 2 kernel hardening, automated vulnerability patching, and out-of-band BMC isolation.',
    icon: ShieldCheck, tags: ['CIS / ISO 27001'],
    latency: 'Zero-Downtime Livepatch', redundancy: 'Immutable ZFS Snapshots', sla: '100% Audit Readiness',
    capacity: 'Fleet-wide rollout control',
    deliverables: ['CIS Level 2 Ansible hardening playbooks', 'Continuous Trivy/OpenVAS CVE auditing', 'Air-gapped IPMI/iDRAC management VLANs', 'Quarterly disaster recovery dry runs']
  },

  // FIELD
  {
    id: '4.1', division: 'field', intents: ['DEPLOY'], name: 'Technical Site Surveys',
    desc: 'RF spectrum heatmaps, floor structural load checks, thermal imaging, and power path audits.',
    icon: Ruler, tags: ['CAD Blueprints'],
    latency: '48-Hour Report Delivery', redundancy: 'Multi-Point Thermal + RF', sla: '100% Measurement Spec',
    capacity: 'Sites up to 500k sq ft',
    deliverables: ['CAD conduit & cable pathway schematics', '2.4/5/6 GHz RF Wi-Fi & 5G coverage heatmaps', 'Rack structural & power load sign-off', 'Full itemized hardware BOM & budget']
  },
  {
    id: '4.2', division: 'field', intents: ['DEPLOY'], name: 'Hardware Deployment',
    desc: 'Rack-and-stack commissioning, server installation, and TIA-606-B serialized cable grooming.',
    icon: Server, tags: ['BICSI / TIA-606-B'],
    latency: '< 4-Hour Metro Mobilization', redundancy: 'Paired Field Technicians', sla: '99.99% First-Pass Yield',
    capacity: 'Up to 20 racks/day',
    deliverables: ['Precision dressed copper & optical patch harnesses', 'Permanent serialized TIA-606-B asset labels', 'Barcode & physical cabinet inventory audit', 'Photographic post-commissioning dossier']
  },
  {
    id: '4.3', division: 'field', intents: ['CONNECT', 'DEPLOY'], name: 'Optical Fiber & Copper Install',
    desc: 'Single-mode OS2 & OM4 core-alignment fusion splicing, Cat6A drops, and Fluke/OTDR certification.',
    icon: Cable, tags: ['Fluke DSX & EXFO OTDR'],
    latency: '<= 0.03 dB Splice Loss', redundancy: 'Diverse Riser Conduits', sla: '25-Year Plant Spec',
    capacity: '1,000+ certified drops',
    deliverables: ['Bidirectional EXFO OTDR PDF trace dossier', 'Fujikura 90S+ core-alignment fusion splice logs', 'Armored external optical conduit trenching', 'Fluke DSX-8000 Cat6A headroom certificates']
  },
  {
    id: '4.4', division: 'field', intents: ['DEPLOY', 'CONNECT'], name: 'Surveillance & Access Systems',
    desc: 'NDAA-compliant enterprise IP cameras, thermal optics, ALPR gates, and localized RAID-6 NVR vaults.',
    icon: Video, tags: ['4K / IR / Thermal'],
    latency: '< 200 ms PTZ Control', redundancy: 'RAID-6 Local + Replication', sla: '99.99% Recording Uptime',
    capacity: '512 4K streams per node',
    deliverables: ['NDAA-compliant thermal & low-light optics', 'Solar-buffered NEMA perimeter arrays', 'Biometric turnstile & badge access interlocks', 'Tamper-evident steel enclosure mounting']
  },
  {
    id: '4.5', division: 'field', intents: ['SUPPORT', 'DEPLOY'], name: 'Emergency Break-Fix',
    desc: 'Rapid 4-hour dispatch for failed switches, cut fibers, storage arrays, and power supply swaps.',
    icon: AlertTriangle, tags: ['2–4 Hour Metro SLA'],
    latency: '< 4 Hours On-Site SLA', redundancy: 'Local Regional Spares', sla: '99.95% MTTR Compliance',
    capacity: '24/7 On-Call Field Fleet',
    deliverables: ['Pre-staged SFP/NIC/PSU/disk hot spares', 'Emergency portable fusion splicing kits', '24-hour formal root-cause analysis report', 'Live hot-swap keeping clusters online']
  },
  {
    id: '4.6', division: 'field', intents: ['SUPPORT'], name: 'Embedded On-Site Engineers',
    desc: 'Dedicated MIHORA field personnel stationed directly inside critical client plants and operations rooms.',
    icon: HardHat, tags: ['24/7 Shift Rotation'],
    latency: '< 15 Min On-Site Action', redundancy: 'Overlapping Shift Handover', sla: '100% Staffed Presence',
    capacity: 'Full Facility Stewardship',
    deliverables: ['Embedded L2/L3 site engineers daily', 'Scheduled thermal & optical inspection logs', 'Direct voice bridge to London & Islamabad NOC', 'Managed vendor escort & rack access control']
  },

  // MANAGED
  {
    id: '5.1', division: 'managed', intents: ['SUPPORT'], name: 'Managed L2/L3 IT Operations',
    desc: 'Direct-to-engineer Tier-2/3 triage, identity governance, and automated remediation without call-center scripts.',
    icon: Headset, tags: ['MTTR < 14 Minutes'],
    latency: '< 60s First Response', redundancy: 'Follow-the-Sun Dual Hub', sla: '99.9% FCR Target',
    capacity: 'Enterprise Fleet Scale',
    deliverables: ['Direct Slack/Teams/Phone engineering channels', 'Automated identity onboarding/revocation', 'Managed hardware procurement & courier sync', 'Monthly executive SLA scorecard reviews']
  },
  {
    id: '5.2', division: 'managed', intents: ['SUPPORT'], name: 'Fleet Endpoint Management',
    desc: 'Zero-trust Linux/macOS/Windows fleet patching, cryptographic posture checks, and encrypted diagnostics.',
    icon: Monitor, tags: ['Win / Mac / Linux'],
    latency: '< 5 Min Remote Diagnostic', redundancy: 'Zero-Knowledge Tunneling', sla: '99.95%',
    capacity: '50,000 Managed Endpoints',
    deliverables: ['Automated zero-day OS security patching', 'Hardened golden workstation images', 'Endpoint disk encryption enforcement', 'Predictive NVMe/battery wear replacement']
  },
  {
    id: '5.3', division: 'managed', intents: ['DEPLOY', 'SUPPORT'], name: 'Cloud & Bare-Metal Migrations',
    desc: 'Zero-downtime public-cloud repatriation, datacenter cutovers, and live transactional DB synchronization.',
    icon: ArrowDown, tags: ['Zero Packet Loss'],
    latency: 'Shadow Rehearsed Cutover', redundancy: 'Instant Rollback Gates', sla: '100% Checksum Match',
    capacity: '100+ TB Migrations',
    deliverables: ['Full dependency & bandwidth graph mapping', 'Live Change Data Capture replication during switch', 'One-click cryptographic fallback checkpoints', 'Post-migration tail-latency audit']
  },
  {
    id: '5.4', division: 'managed', intents: ['OPTIMIZE', 'SUPPORT'], name: 'Proactive Infra Maintenance',
    desc: 'Continuous CVE auditing, automated pre-patch snapshots, and firmware lifecycle tracking.',
    icon: ShieldCheck, tags: ['24/7 Compliance'],
    latency: '< 15 Min CVE Triage', redundancy: 'Snapshot Before Every Patch', sla: '99.999%',
    capacity: 'Fleet-Wide Automation',
    deliverables: ['Zero-downtime scheduled patch orchestration', 'CVSS 3.1 exposure scoring & containment', 'Switch/server EOL firmware alerts', 'ISO 27001 / SOC 2 evidence bundles']
  },
  {
    id: '5.5', division: 'managed', intents: ['SUPPORT', 'OPTIMIZE'], name: '24/7 Dual-Hub SRE',
    desc: 'Continuous Site Reliability Engineering rotating smoothly between London (UK) and Islamabad (Pakistan).',
    icon: Users, tags: ['LON + ISB Watchdesk'],
    latency: '< 15 Min P1 Containment', redundancy: 'Dual-Hub Synchronized Ops', sla: '99.999% Objective',
    capacity: 'Mission-Critical Scale',
    deliverables: ['Embedded SREs managing production reliability', 'Blameless incident post-mortems within 24h', 'Error budget & canary release enforcement', 'Automated runbooks eliminating manual toil']
  }
];

export default function Services() {
  const [activeIntent, setActiveIntent] = useState('ALL');
  const [selectedNodeSpec, setSelectedNodeSpec] = useState<ServiceNode | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredNodes = useMemo(() => {
    if (activeIntent === 'ALL') return serviceNodes;
    return serviceNodes.filter((node) => node.intents.includes(activeIntent));
  }, [activeIntent]);

  const isDivisionVisible = (divisionId: string) =>
    filteredNodes.some((n) => n.division === divisionId);

  const handleOpenNodeSpec = (node: ServiceNode) => {
    playUiChime('click');
    setSelectedNodeSpec(node);
  };

  const handleCopySpec = (node: ServiceNode) => {
    playUiChime('success');
    const specText = `MIHORA.TECH SPECIFICATION SHEET
Capability: ${node.id} - ${node.name}
Latency Target: ${node.latency || 'N/A'}
Redundancy: ${node.redundancy || 'N/A'}
SLA Commitment: ${node.sla || '99.99%'}
Stack: ${node.tags.join(', ')}
Deliverables:
${(node.deliverables || []).map((d) => `- ${d}`).join('\n')}
Source: https://mihora.tech/services`;
    navigator.clipboard.writeText(specText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="w-full obsidian-band obsidian-grid border-b border-white/10 py-14 lg:py-22 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumbs items={[{ label: 'Services' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <Reveal>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                  Capability Directory · 5 Engineering Divisions
                </div>
              </Reveal>
              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  Engineering Services Spanning Code, Silicon &amp; Physical Terrain
                </h1>
              </MaskTextReveal>
              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Explore MIHORA.TECH&apos;s 29 registered technical capabilities across 5 specialized divisions—or open any division page for full architecture matrices and SLA commitments.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-[#080d18]">
                <img
                  src={VISUAL_ASSETS.opticalLabSplicing}
                  alt="MIHORA.TECH OS2 core-alignment optical splicing verification bench"
                  className="w-full h-full object-cover"
                />
                <div data-photo-overlay="true" className="contents">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d18]/85 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3.5 font-mono text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                    TIA-568-D &middot; &le; 0.03 dB Labs
                  </span>
                </div>
              </div>
              <div className="bg-white/[0.04] p-5 rounded-2xl border border-white/15 space-y-2.5 text-xs font-mono backdrop-blur-md">
                <div className="flex justify-between">
                  <span className="text-slate-400">Registered Capabilities</span>
                  <span className="font-bold text-white">29 Verified Specs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Operating Hubs</span>
                  <span className="font-bold text-white">London + Islamabad</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service Objective</span>
                  <span className="font-bold text-amber-400">99.999% Availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Intent Filter Bar */}
      <section className="sticky top-16 z-30 w-full bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline/20 px-4 sm:px-6 lg:px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary font-bold">
              <Terminal size={14} />
              <span>Filter Capabilities by Engineering Objective</span>
            </div>
            <div className="text-xs font-mono text-on-surface-variant">
              {activeIntent === 'ALL'
                ? 'Showing all 29 capabilities across 5 divisions'
                : `Showing ${filteredNodes.length} capabilities matching [${activeIntent}]`}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ALL', label: 'Show All (29)' },
              { id: 'BUILD', label: 'Build · Software & UI' },
              { id: 'AUTOMATE', label: 'Automate · Workflows & AI' },
              { id: 'CONNECT', label: 'Connect · Networks & Storage' },
              { id: 'DEPLOY', label: 'Deploy · Field & Hardware' },
              { id: 'SUPPORT', label: 'Support · Managed SRE' },
              { id: 'OPTIMIZE', label: 'Optimize · Telemetry' },
            ].map((intent) => (
              <button
                key={intent.id}
                type="button"
                className={clsx(
                  'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border',
                  activeIntent === intent.id
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-surface-container-low border-outline/25 text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                )}
                onClick={() => {
                  setActiveIntent(intent.id);
                  playUiChime('click');
                }}
              >
                {intent.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Divisions Grid */}
      <section className="w-full bg-surface px-4 sm:px-6 lg:px-8 py-14 space-y-12 border-b border-outline/20">
        <div className="max-w-7xl mx-auto space-y-12">
          {SERVICE_DIVISIONS.map((div) => {
            if (!isDivisionVisible(div.id)) return null;
            return (
              <article
                key={div.id}
                id={div.id}
                className="scroll-mt-36 bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-outline/25 space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-outline/20">
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                      Division {div.num} · {div.shortTitle}
                    </div>
                    <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                      {div.name}
                    </h2>
                    <p className="text-sm sm:text-base text-on-surface-variant">{div.summary}</p>
                  </div>

                  <Link
                    to={`/services/${div.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer"
                  >
                    <Layers size={14} />
                    <span>Open Division Page</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>

                <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {serviceNodes
                    .filter((n) => n.division === div.id)
                    .map((node) => {
                      const visible = activeIntent === 'ALL' || node.intents.includes(activeIntent);
                      return (
                        <StaggerItem key={node.id}>
                          <SpotlightSurface className="h-full rounded-xl">
                            <button
                              type="button"
                              disabled={!visible}
                              onClick={() => visible && handleOpenNodeSpec(node)}
                              className={clsx(
                                'w-full text-left bg-surface-container-lowest p-5 rounded-xl space-y-3 transition-all border border-outline/20 h-full flex flex-col justify-between group',
                                visible
                                  ? 'hover:border-primary/50 hover:shadow-md cursor-pointer'
                                  : 'opacity-30 grayscale cursor-not-allowed'
                              )}
                            >
                              <div className="space-y-2.5">
                                <div className="flex justify-between items-center">
                                  <span className="font-mono text-xs text-primary font-bold">
                                    Spec {node.id}
                                  </span>
                                  <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary border border-outline/20">
                                    <node.icon size={16} />
                                  </div>
                                </div>
                                <h3 className="font-headline text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                                  {node.name}
                                </h3>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                  {node.desc}
                                </p>
                              </div>

                              <div className="pt-3 flex items-center justify-between border-t border-outline/15 font-mono text-[11px] w-full">
                                <span className="text-on-surface-variant">{node.tags[0]}</span>
                                {visible && (
                                  <span className="text-primary font-semibold inline-flex items-center gap-1">
                                    <span>Inspect</span>
                                    <ArrowRight size={12} />
                                  </span>
                                )}
                              </div>
                            </button>
                          </SpotlightSurface>
                        </StaggerItem>
                      );
                    })}
                </StaggerGrid>
              </article>
            );
          })}
        </div>
      </section>

      {/* Node Specification Inspector Modal */}
      <AnimatePresence>
        {selectedNodeSpec && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedNodeSpec(null)}
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
                  setSelectedNodeSpec(null);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Specification"
              >
                <X size={18} />
              </button>

              <div className="space-y-1.5 pr-10">
                <div className="font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                  Specification {selectedNodeSpec.id} · {selectedNodeSpec.division} Division
                </div>
                <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-extrabold">
                  {selectedNodeSpec.name}
                </h2>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {selectedNodeSpec.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20">
                  <div className="text-[10px] text-on-surface-variant uppercase font-semibold">Latency</div>
                  <div className="text-sm font-bold text-primary mt-0.5">{selectedNodeSpec.latency}</div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20">
                  <div className="text-[10px] text-on-surface-variant uppercase font-semibold">Redundancy</div>
                  <div className="text-xs font-bold text-on-surface mt-0.5">{selectedNodeSpec.redundancy}</div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20">
                  <div className="text-[10px] text-on-surface-variant uppercase font-semibold">SLA Target</div>
                  <div className="text-sm font-bold text-primary mt-0.5">{selectedNodeSpec.sla}</div>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20">
                  <div className="text-[10px] text-on-surface-variant uppercase font-semibold">Capacity</div>
                  <div className="text-xs font-bold text-on-surface mt-0.5">{selectedNodeSpec.capacity}</div>
                </div>
              </div>

              <div className="space-y-2.5 bg-surface-container-low p-5 rounded-xl border border-outline/20">
                <div className="font-mono text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={15} />
                  <span>Verified Deliverables</span>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {(selectedNodeSpec.deliverables || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-primary font-bold mt-0.5">0{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-outline/20">
                <button
                  type="button"
                  onClick={() => handleCopySpec(selectedNodeSpec)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface-container hover:bg-surface-container-high border border-outline/30 text-on-surface font-mono text-xs font-semibold rounded-lg transition-all cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied Spec' : 'Copy Specification'}</span>
                </button>

                <Link
                  to="/contact/"
                  onClick={() => setSelectedNodeSpec(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs rounded-lg shadow-sm"
                >
                  <Mail size={14} />
                  <span>Request Scoping Call</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Field Operations Visual Section */}
      <section className="w-full bg-surface-container-low px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-2">
              <HardHat size={15} />
              <span>Field Engineering Execution</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              Code, Copper, Fiber &amp; Steel Under One Contract
            </h2>
            <p className="text-base text-on-surface-variant leading-relaxed">
              MIHORA.TECH engineers terminate single-mode OS2 glass in metropolitan conduits, deploy NDAA-compliant industrial cameras, and commission clustered bare-metal servers without delegating critical spans to unvetted subcontractors.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline/20">
                <div className="text-xs font-mono text-on-surface-variant uppercase">Verified Cable Span</div>
                <div className="font-headline text-2xl font-extrabold text-primary mt-1">
                  <AnimatedCounter target={250000} suffix="+ m" />
                </div>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline/20">
                <div className="text-xs font-mono text-on-surface-variant uppercase">Racks Commissioned</div>
                <div className="font-headline text-2xl font-extrabold text-primary mt-1">
                  <AnimatedCounter target={1200} suffix="+" />
                </div>
              </div>
            </div>
          </div>

          <Tilt3DFrame maxTilt={4}>
            <div className="rounded-2xl overflow-hidden shadow-lg bg-surface-container-lowest border border-outline/25">
              <img
                className="w-full h-80 lg:h-96 object-cover"
                alt="Optical switch rack termination certified by MIHORA.TECH"
                src={VISUAL_ASSETS.fiberOpticsHardware}
              />
              <div className="p-4 flex items-center justify-between text-xs border-t border-outline/20">
                <div>
                  <div className="font-semibold text-on-surface">TIA-568-D &amp; Bidirectional OTDR Certified</div>
                  <div className="text-on-surface-variant font-mono mt-0.5">48U Hot-Aisle Containment · 100G/400G Uplinks</div>
                </div>
                <Link to="/case-studies/" className="font-semibold text-primary hover:underline">
                  Case studies →
                </Link>
              </div>
            </div>
          </Tilt3DFrame>
        </div>
      </section>
    </div>
  );
}
