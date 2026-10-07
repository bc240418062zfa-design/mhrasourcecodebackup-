import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Grid, Terminal, Pointer, Code2, Smartphone, Cpu, PenTool, Split, Network, 
  Bot, Server, Router, Database, Building, Cloud, Eye, Settings, Wrench, Factory, Brain, List,
  Ruler, Cable, Video, AlertTriangle, HardHat, Headset, Monitor, ArrowDown, 
  ShieldCheck, Users, Search, RefreshCw, X, Copy, Check, Mail, ArrowRight,
  CheckCircle2, Sparkles, Activity, Shield, Layers, Download
} from 'lucide-react';
import { playUiChime } from '../utils/audio';

interface ServiceNode {
  id: string;
  division: string;
  intents: string[];
  name: string;
  desc: string;
  icon: any;
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
    desc: 'NextGen reactive micro-frontends, headless architectures, and enterprise portal platforms built for sub-second rendering.', 
    icon: Code2, tags: ['REACT / GO / K8S'],
    latency: '< 45ms Global Edge TTFB', redundancy: 'Multi-Region Anycast DNS', sla: '99.995%',
    capacity: '120,000 req/sec sustained',
    deliverables: ['Production Edge Bundle with SSR hydration', 'Sub-second Core Web Vitals audit pass', 'Automated CI/CD canary deployment pipelines', 'End-to-end Cypress & Playwright verification suites']
  },
  { 
    id: '1.2', division: 'digital', intents: ['BUILD'], name: 'Application Development', 
    desc: 'Native mobile applications, offline-first tactical tools, and enterprise multi-platform software suites with real-time sync.', 
    icon: Smartphone, tags: ['FLUTTER / SWIFT / RUST'],
    latency: '< 8ms Local Frame Render', redundancy: 'Local SQLite + Remote CRDT Sync', sla: '99.99%',
    capacity: 'Offline-first peer discovery',
    deliverables: ['Cross-platform iOS, Android, and Desktop binaries', 'Zero-data-loss conflict-free replicated data types (CRDT)', 'Biometric hardware keychain enclave integration', 'Field technician telemetry logging module']
  },
  { 
    id: '1.3', division: 'digital', intents: ['BUILD', 'OPTIMIZE'], name: 'Software Engineering', 
    desc: 'Core backend engines, fault-tolerant event streaming, database sharding, and mission-grade algorithmic data structures.', 
    icon: Cpu, tags: ['C++ / RUST / POSTGRES'],
    latency: '< 1.4ms P99 Core Processing', redundancy: 'Raft Distributed Quorum Consensus', sla: '99.999%',
    capacity: '1.5M transactions/min',
    deliverables: ['Zero-copy high-throughput state engine', 'Partitioned Citus/PostgreSQL sharding blueprints', 'Distributed lock-free telemetry queues', 'Static memory sanitization with Valgrind & Miri verification']
  },
  { 
    id: '1.4', division: 'digital', intents: ['BUILD'], name: 'UI/UX Engineering', 
    desc: 'High-density cockpit interfaces, industrial telemetry design systems, and hyper-responsive user journeys designed for precision operators.', 
    icon: PenTool, tags: ['DESIGN TOKENS / RADIX'],
    latency: '60 FPS Guaranteed Surface Refresh', redundancy: 'WCAG 2.2 AAA Contrast Compliance', sla: '100% Deterministic State',
    capacity: 'Ultra-wide 4K Cockpit Views',
    deliverables: ['Unified atomic token library with dark/light themes', 'High-density tabular data grids with virtualized scrolling', 'Tactile acoustic and haptic operator feedback loops', 'Keyboard-first navigation shortcuts for rapid triage']
  },
  { 
    id: '1.5', division: 'digital', intents: ['BUILD', 'CONNECT'], name: 'API Development', 
    desc: 'Federated GraphQL meshes, high-throughput gRPC services, and ultra-secure OpenAPI conduits with sub-5ms routing overhead.', 
    icon: Network, tags: ['REST / GRPC / PROTOBUF'],
    latency: '< 2.2ms Gateway Routing Delay', redundancy: 'Triple Gateway Ingress Hot-Standby', sla: '99.999%',
    capacity: '250K concurrent persistent connections',
    deliverables: ['Protocol Buffers schema repository with breaking change linters', 'mTLS bidirectional certificate authentication', 'Rate limiting with distributed token bucket algorithms', 'Auto-generated SDKs in TypeScript, Python, and Go']
  },
  { 
    id: '1.6', division: 'digital', intents: ['CONNECT', 'OPTIMIZE'], name: 'Systems Integration', 
    desc: 'Legacy ERP orchestration, middleware pipelines, and bidirectional enterprise bus architectures that bridge siloed infrastructures.', 
    icon: Split, tags: ['KAFKA / RABBITMQ / CDC'],
    latency: '< 15ms End-to-End Enterprise Sync', redundancy: 'Clustered Broker Topology (3x Replication)', sla: '99.99%',
    capacity: '500MB/sec sustained payload throughput',
    deliverables: ['Change Data Capture (CDC) pipelines from legacy databases', 'Idempotent transactional outbox implementation', 'Dead-letter-queue triage and automatic replay routines', 'Unified enterprise audit trail logging']
  },

  // AUTOMATION
  { 
    id: '2.1', division: 'automation', intents: ['AUTOMATE'], name: 'Workflow Automation', 
    desc: 'Deterministic logic loops, cross-SaaS ETL orchestration, and self-healing job dispatchers that eliminate manual interventions.', 
    icon: Network, tags: ['10X ACCELERATION'],
    latency: '< 500ms Trigger to Execution', redundancy: 'Dual-Worker Failover Engine', sla: '99.99%',
    capacity: '50,000 automated runs/hour',
    deliverables: ['Visual state-machine orchestration blueprints', 'Automated anomaly detection with rollback safeguards', 'Zero-credential credential vaulting via HashiCorp Vault', 'Real-time execution dashboard with step-by-step logs']
  },
  { 
    id: '2.2', division: 'automation', intents: ['AUTOMATE', 'OPTIMIZE'], name: 'Business Automation', 
    desc: 'Procurement, invoicing, compliance auditing, and fulfillment pipelines governed by tamper-evident validation chains.', 
    icon: Factory, tags: ['ENTERPRISE OPS'],
    latency: 'Sub-Minute Document Classification', redundancy: 'Cryptographic SHA-256 Audit Trail', sla: '99.98%',
    capacity: '10,000 invoices processed daily',
    deliverables: ['Automated OCR and semantic parsing pipeline', 'Three-way matching engine for purchase orders and receipts', 'Automated compliance checkpoint gates', 'Multi-currency settlement reconciliation module']
  },
  { 
    id: '2.3', division: 'automation', intents: ['AUTOMATE', 'BUILD'], name: 'AI Integration', 
    desc: 'Private sovereign LLM deployments, Retrieval-Augmented Generation (RAG) on proprietary vector stores, and custom fine-tunes.', 
    icon: Brain, tags: ['SOVEREIGN HOSTED'],
    latency: '< 180ms First Token Latency', redundancy: 'Air-Gapped Private GPU Inference', sla: '99.95%',
    capacity: '1,000 concurrent conversational streams',
    deliverables: ['Locally-hosted Qwen/Llama weights on on-prem H100/A100 clusters', 'Vector database ingestion with hybrid dense-sparse search', 'PII stripping and hallucination validation layers', 'Role-based knowledge access filters']
  },
  { 
    id: '2.4', division: 'automation', intents: ['BUILD', 'AUTOMATE'], name: 'Internal Tools', 
    desc: 'Operator control surfaces, bespoke CRUD telemetry boards, and role-governed administrative consoles tailored for field leads.', 
    icon: Terminal, tags: ['RBAC / SSO READY'],
    latency: '< 120ms Query Execution', redundancy: 'OIDC / SAML SSO Integration', sla: '99.99%',
    capacity: 'Unlimited operator seats',
    deliverables: ['Fine-grained attribute-based access control (ABAC)', 'Instant CSV/Parquet export capabilities', 'Bulk batch mutation tools with double-confirmation safeguards', 'Comprehensive action logging for SOC2 audits']
  },
  { 
    id: '2.5', division: 'automation', intents: ['OPTIMIZE', 'CONNECT'], name: 'Data Processing', 
    desc: 'Distributed Spark/Flink streaming pipelines, sensor telemetry sanitization, and structured lakehouse ingestion platforms.', 
    icon: List, tags: ['GB/SEC REALTIME'],
    latency: '< 250ms Window Aggregation', redundancy: 'Checkpoint-Restart Exactly-Once Semantics', sla: '99.999%',
    capacity: '2.5 GB/sec raw telemetry ingestion',
    deliverables: ['Apache Iceberg / Delta Lake partition schemas', 'Real-time schema evolution and dead-letter filtering', 'Watermarked sliding window calculations for anomaly triggers', 'Automated data archival lifecycle rules']
  },
  { 
    id: '2.6', division: 'automation', intents: ['AUTOMATE', 'BUILD'], name: 'Custom Automation', 
    desc: 'Hardware-in-the-loop automation, programmable PLC bridge routines, and bespoke software robotics for unique industry demands.', 
    icon: Settings, tags: ['BESPOKE HARDWARE'],
    latency: '< 5ms Hardware Polling Loop', redundancy: 'Hardware Watchdog Timer Circuitry', sla: '99.999%',
    capacity: '256 digital I/O channels per rig',
    deliverables: ['Modbus / CAN-Bus / OPC-UA bridge firmware', 'Optically isolated relay switching boards', 'Fail-safe emergency power cutoff routines', 'Remote firmware over-the-air (FOTA) signed updates']
  },

  // INFRASTRUCTURE
  { 
    id: '3.1', division: 'infra', intents: ['CONNECT'], name: 'Network Engineering', 
    desc: 'BGP routing optimization, SD-WAN overlays, redundant fiber multi-homing, and high-availability enterprise firewall matrices.', 
    icon: Router, tags: ['ZERO-TRUST LAYER 3/7'],
    latency: '< 0.8ms Core Switch Hop', redundancy: 'BGP Anycast Dual-Homed Uplinks', sla: '99.999%',
    capacity: '100 Gbps wire-speed forwarding',
    deliverables: ['Custom EVPN-VXLAN campus network topology', 'Zero-Trust network segmentation policy manifests', 'Automated DDoS mitigation with upstream flow-spec', 'Quarterly Fluke DTX cable and link loss certification']
  },
  { 
    id: '3.2', division: 'infra', intents: ['CONNECT', 'DEPLOY'], name: 'Servers & Storage', 
    desc: 'NVMe-oF SAN/NAS design, Ceph distributed clusters, bare-metal hypervisor orchestration, and automated tape archival tiering.', 
    icon: Database, tags: ['PETABYTE DENSITY'],
    latency: '< 150μs NVMe-oF Read Latency', redundancy: 'Ceph 3x Replication + Erasure Coding', sla: '99.999%',
    capacity: '12+ Petabytes raw enterprise storage',
    deliverables: ['High-IOPS bare-metal Proxmox / KVM hypervisor cluster', 'Self-healing Ceph storage pool with automated rebalancing', 'Air-gapped LTO tape backup automation robot', 'Continuous SMART drive telemetry alerting']
  },
  { 
    id: '3.3', division: 'infra', intents: ['DEPLOY'], name: 'Datacenter Infrastructure', 
    desc: 'Rack elevation engineering, hot/cold aisle containment, redundant PDU busway distribution, and carrier-grade cross-connects.', 
    icon: Building, tags: ['TIER III & IV RATED'],
    latency: 'PUE Target < 1.18', redundancy: '2N UPS + Dual Generator Backup', sla: '99.999%',
    capacity: 'Up to 35kW per high-density rack',
    deliverables: ['3D CAD rack elevation and power distribution blueprints', 'Thermal airflow CFD analysis and hot-aisle containment', 'Carrier-neutral meet-me-room fiber cross-connects', 'VESDA aspirating smoke detection integration']
  },
  { 
    id: '3.4', division: 'infra', intents: ['DEPLOY', 'CONNECT'], name: 'Deployment & Cloud', 
    desc: 'Infrastructure as Code (Terraform / Ansible), hybrid AWS/Azure/On-Prem VPC interconnection, and zero-downtime blue/green setups.', 
    icon: Cloud, tags: ['IAC DECLARATIVE'],
    latency: '10-Minute Full Cluster Provisioning', redundancy: 'Multi-Cloud VPC Interconnect', sla: '99.99%',
    capacity: 'Elastic scale from 10 to 1,000 nodes',
    deliverables: ['Modular Terraform modules with strict policy-as-code', 'GitOps deployment pipeline using ArgoCD', 'Encrypted WireGuard / IPsec site-to-site tunnels', 'Automated chaos engineering testing suite']
  },
  { 
    id: '3.5', division: 'infra', intents: ['OPTIMIZE', 'SUPPORT'], name: 'Monitoring & Observability', 
    desc: 'Prometheus & Grafana operational stacks, distributed tracing via OpenTelemetry, and predictive hardware anomaly alarms.', 
    icon: Eye, tags: ['REAL-TIME TELEMETRY'],
    latency: '1-Second Metrics Ingestion Resolution', redundancy: 'Dual Thanos Long-Term Storage Stores', sla: '99.99%',
    capacity: '50 Million active metrics timeseries',
    deliverables: ['Pre-configured Grafana telemetry cockpits for executive & SRE', 'Alertmanager routing with escalation paging policies', 'Distributed OpenTelemetry trace collector mesh', 'Automated anomaly detection for memory leaks']
  },
  { 
    id: '3.6', division: 'infra', intents: ['SUPPORT', 'OPTIMIZE'], name: 'Maintenance & Hardening', 
    desc: 'Automated kernel patching, CIS benchmark compliance, firmware flashing, and air-gapped immutable backup validation.', 
    icon: ShieldCheck, tags: ['99.999% DRIFT TARGET'],
    latency: 'Zero-Downtime Kernel Livepatching', redundancy: 'Immutable ZFS Snapshots', sla: '100% Audit Readiness',
    capacity: 'Fleet-wide simultaneous rollouts',
    deliverables: ['CIS Level 2 automated hardening Ansible playbooks', 'Vulnerability scanning with Trivy & OpenVAS', 'Hardware BMC/IPMI isolated management VLAN setup', 'Quarterly disaster recovery dry-run verification']
  },

  // FIELD
  { 
    id: '4.1', division: 'field', intents: ['DEPLOY'], name: 'Site Surveys', 
    desc: 'RF spectrum mapping, structural load analysis for server cabinets, thermal camera inspection, and power path auditing.', 
    icon: Ruler, tags: ['CAD BLUEPRINTS'],
    latency: '48-Hour Report Turnaround', redundancy: 'Multi-point Thermal & RF Scanning', sla: '100% Survey Accuracy',
    capacity: 'Facilities up to 500,000 sq ft',
    deliverables: ['Detailed CAD architectural overlay with cable pathway marks', 'RF heatmaps for 2.4GHz, 5GHz, and 6GHz Wi-Fi 7', 'Floor load capacity certification by structural engineers', 'Comprehensive bill of materials (BOM) with cost estimates']
  },
  { 
    id: '4.2', division: 'field', intents: ['DEPLOY'], name: 'Hardware Deployment', 
    desc: 'Rack-and-stack delivery, enterprise server assembly, edge computing enclosures, and precision cable grooming to ISO specs.', 
    icon: Server, tags: ['BICSI / ANSI / TIA'],
    latency: '< 4-Hour Urgent On-Site Mobilization', redundancy: 'Dual Certified Technicians per Deploy', sla: '99.99% First-Pass Yield',
    capacity: 'Up to 20 full server racks per day',
    deliverables: ['Precision Velcro-groomed cabling according to TIA-606-B', 'Labeling of all power cables, fiber pairs, and patch cords', 'Physical asset tagging with barcode & RFID trackers', 'Complete photographic commissioning report']
  },
  { 
    id: '4.3', division: 'field', intents: ['CONNECT', 'DEPLOY'], name: 'Network Installation', 
    desc: 'Single-mode/multi-mode fiber fusion splicing, Cat6A shielded drops, patch panel certification, and Fluke DTX verification.', 
    icon: Cable, tags: ['FLUKE VERIFIED 10G/40G'],
    latency: '< 0.02 dB Fusion Splice Loss', redundancy: 'Dual-Path Conduits and Risers', sla: '25-Year System Warranty',
    capacity: '1,000+ certified drops per installation',
    deliverables: ['Fluke Versiv test results with PDF calibration certificates', 'Fujikura core-alignment fusion splice logs', 'Armored external fiber conduits for harsh environments', 'Color-coded patch panel termination documentation']
  },
  { 
    id: '4.4', division: 'field', intents: ['DEPLOY', 'CONNECT'], name: 'CCTV & Surveillance', 
    desc: 'Enterprise IP surveillance rigs, AI-driven optical perimeter detection, NDAA-compliant hardware, and localized NVR storage vaults.', 
    icon: Video, tags: ['4K / IR / THERMAL'],
    latency: '< 200ms PTZ Response Latency', redundancy: 'RAID-6 Local Storage + Cloud Replication', sla: '99.99% Recording Uptime',
    capacity: 'Up to 512 4K streams per master NVR',
    deliverables: ['NDAA-compliant cameras with optical zoom and thermal sensors', 'Automated license plate recognition (ALPR) cameras', 'Solar-powered wireless perimeter poles for remote borders', 'Hardened tamper-resistant steel camera enclosures']
  },
  { 
    id: '4.5', division: 'field', intents: ['SUPPORT', 'DEPLOY'], name: 'Break-Fix Services', 
    desc: 'Rapid dispatch component swapping, failed disk rebuilds, fiber transceiver replacements, and tactical emergency recovery.', 
    icon: AlertTriangle, tags: ['2-4 HOUR RESPONSE'],
    latency: '< 2 Hours Metro SLA Dispatch', redundancy: 'Spares Stored at Local Hubs', sla: '99.95% MTTR Under 4 Hours',
    capacity: '24/7/365 On-call rapid teams',
    deliverables: ['Local warehouse spares inventory (NICs, SFPs, PSUs, disks)', 'Emergency fiber reel and cold-splice field kits', 'Post-incident root cause analysis (RCA) within 24h', 'Immediate hot-swap without taking clusters offline']
  },
  { 
    id: '4.6', division: 'field', intents: ['SUPPORT'], name: 'On-Site Tech Support', 
    desc: 'Dedicated field engineers stationed directly at plant facilities, operations centers, and industrial facilities across regions.', 
    icon: HardHat, tags: ['24/7/365 ROTATION'],
    latency: '< 15 Minutes Immediate Escalation', redundancy: 'Shift Rotation with Overlapping Handover', sla: '100% Dedicated Presence',
    capacity: 'Full facility operational oversight',
    deliverables: ['Dedicated Tier-2/Tier-3 engineers on site daily', 'Preventative maintenance rounds with physical checklists', 'Direct radio communications with Central Command NOC', 'Executive liaison for hardware migrations and upgrades']
  },

  // MANAGED
  { 
    id: '5.1', division: 'managed', intents: ['SUPPORT'], name: 'IT Support', 
    desc: 'Tier-1 through Tier-3 multi-channel incident response, identity provisioning, and automated ticket resolution workflows.', 
    icon: Headset, tags: ['MTTR: < 14 MINUTES'],
    latency: '< 60 Seconds First Response Time', redundancy: 'Dual-Continent Service Desk Handover', sla: '99.9% First-Contact Resolution',
    capacity: '20,000 user tickets per month',
    deliverables: ['Omnichannel support via Slack, Teams, Email, and Phone', 'Automated onboarding & offboarding identity scripts', 'Hardware procurement and drop-shipping to global staff', 'Monthly executive SLA performance reviews']
  },
  { 
    id: '5.2', division: 'managed', intents: ['SUPPORT'], name: 'Remote Technical Support', 
    desc: 'Secure remote desktop management, centralized patch orchestration, and endpoint fleet diagnostics across distributed teams.', 
    icon: Monitor, tags: ['WIN / MAC / LINUX'],
    latency: '< 5 Minutes Remote Session Connection', redundancy: 'Encrypted Zero-Knowledge Remote Agent', sla: '99.95%',
    capacity: '50,000 active remote endpoints',
    deliverables: ['Automated zero-day patch deployments', 'Remote memory dump analysis and malware containment', 'Standardized corporate workstation golden images', 'Hardware battery and storage wear health alerts']
  },
  { 
    id: '5.3', division: 'managed', intents: ['DEPLOY', 'SUPPORT'], name: 'Migration Services', 
    desc: 'Frictionless data center lift-and-shift, legacy software refactoring, and cloud-to-bare-metal repatriation without downtime.', 
    icon: ArrowDown, tags: ['ZERO PACKET LOSS'],
    latency: 'Zero Client Connection Drops', redundancy: 'Real-time Shadow Cluster Rehearsals', sla: '100% Data Verification Checksums',
    capacity: 'Migrations over 100TB completed over weekend cutovers',
    deliverables: ['Pre-flight dependency graph mapping', 'Live transactional database replication during cutover', 'Instant one-click rollback mechanism', 'Post-migration performance verification benchmarks']
  },
  { 
    id: '5.4', division: 'managed', intents: ['OPTIMIZE', 'SUPPORT'], name: 'Infra Maintenance', 
    desc: 'Continuous CVE scans, zero-day threat containment, automated configuration rollback, and hardware depreciation forecasting.', 
    icon: ShieldCheck, tags: ['PROACTIVE 24/7'],
    latency: '< 15 Minutes CVE Assessment Cycle', redundancy: 'Automated Snapshot Before Every Patch', sla: '99.999%',
    capacity: 'Continuous 24/7 scanning coverage',
    deliverables: ['Automated patching schedule aligned with maintenance windows', 'Vulnerability scoring against CVSS 3.1 metrics', 'Firmware lifecycle tracking for end-of-life hardware', 'Regulatory compliance certification evidence packages']
  },
  { 
    id: '5.5', division: 'managed', intents: ['SUPPORT', 'OPTIMIZE'], name: 'Technical Operations', 
    desc: 'Full-stack DevSecOps engineering, release orchestration, incident post-mortems, and site reliability telemetry tracking.', 
    icon: Users, tags: ['GOOGLE SRE MODEL'],
    latency: 'Sub-15 Minute Incident Containment', redundancy: 'Dual Command Staff (London + Islamabad)', sla: '99.999% Service Objective',
    capacity: 'Enterprise missions at global scale',
    deliverables: ['Dedicated Site Reliability Engineers embedded in your team', 'Blameless post-mortem culture and action tracker', 'Error budget calculation and deployment gate enforcement', 'Runbook automation to eliminate operational toil']
  }
];

const divisions = [
  { 
    id: 'digital', num: '01', title: 'DIGITAL ENGINEERING', subtitle: 'SYSTEM CODE & ARCHITECTURE', 
    desc: 'High-concurrency systems, mission-critical interfaces, and distributed sovereign cloud architectures.', 
    icon: Terminal,
    manifesto: 'We build sovereign digital platforms with mathematical precision. Every line of code is compiled for sub-millisecond execution, memory safety, and resilient micro-partitioning.',
    techStack: 'React 19, TypeScript, Rust, Go 1.23, Python 3.12, C++, Kafka, PostgreSQL, Kubernetes',
    responseSla: 'P99 Execution < 2ms // 24/7 Escalation Protocol'
  },
  { 
    id: 'automation', num: '02', title: 'AUTOMATION & INTELLIGENCE', subtitle: 'COGNITIVE ENGINES & AGENTIC AUTOMATION', 
    desc: 'Deterministic robotic workflows, autonomous LLM agent fabrics, and edge data processing pipelines.', 
    icon: Bot,
    manifesto: 'Eliminating human friction through self-healing deterministic systems and private on-premise AI inference models that keep your proprietary IP strictly within sovereign boundaries.',
    techStack: 'Private LLMs (Llama/Qwen/DeepSeek), PyTorch, Apache Flink, Celery, Temporal, Vector DBs',
    responseSla: 'Sub-Minute Event Resolution // Zero Tampering Guarantees'
  },
  { 
    id: 'infra', num: '03', title: 'INFRASTRUCTURE', subtitle: 'ENTERPRISE COMPUTE, NETWORKS & DC', 
    desc: 'Core multi-region network topologies, hybrid cloud backbones, and zero-trust perimeter implementations.', 
    icon: Server,
    manifesto: 'Compute, storage, and optical connectivity engineered like high-voltage electrical grids. Fault-tolerant, self-rebalancing, and immune to single-point hardware catastrophic failure.',
    techStack: 'BGP Anycast, Ceph, Proxmox, VMware ESXi, Terraform, Ansible, Cisco/Arista, WireGuard',
    responseSla: '99.999% Availability Guarantee // Dual-Homed Uplinks'
  },
  { 
    id: 'field', num: '04', title: 'FIELD ENGINEERING', subtitle: 'ON-SITE TACTICAL INSTALLATION & HARDWARE', 
    desc: 'Boots on the ground. Optical cabling, ruggedized telecom hardware, industrial camera arrays, and rapid physical repair.', 
    icon: Wrench,
    manifesto: 'Where abstract schematics meet the physical reality of copper, fiber, steel, and elevation. Our certified technicians mobilize directly to client data centers and industrial plants.',
    techStack: 'Fluke Versiv OTDR, Fujikura Splicers, Cat6A STP, NDAA IP CCTV, Ruggedized NEMA Rigs',
    responseSla: '2-4 Hour Emergency On-Site Dispatch // BICSI Certified'
  },
  { 
    id: 'managed', num: '05', title: 'MANAGED TECHNOLOGY', subtitle: 'CONTINUOUS RESILIENCE & GLOBAL OPS', 
    desc: '24/7/365 NOC/SOC oversight, turnkey cloud migrations, and SLA-guaranteed infrastructure operations.', 
    icon: Headset,
    manifesto: 'Continuous vigilance through our dual synchronized Network Operations Centers in London and Islamabad, providing unbroken 24/7/365 engineering stewardship over global enterprise fleets.',
    techStack: 'Prometheus, Grafana, OpenTelemetry, Thanos, Wazuh SIEM, Automated Canary Gates',
    responseSla: 'MTTR < 14 Minutes // SRE Model Compliance'
  },
];

export default function Services() {
  const [activeIntent, setActiveIntent] = useState('ALL');
  const [selectedNodeSpec, setSelectedNodeSpec] = useState<ServiceNode | null>(null);
  const [selectedDivisionSpec, setSelectedDivisionSpec] = useState<typeof divisions[0] | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredNodes = useMemo(() => {
    if (activeIntent === 'ALL') return serviceNodes;
    return serviceNodes.filter(node => node.intents.includes(activeIntent));
  }, [activeIntent]);

  const isDivisionVisible = (divisionId: string) => filteredNodes.some(n => n.division === divisionId);

  const handleOpenNodeSpec = (node: ServiceNode) => {
    playUiChime('click');
    setSelectedNodeSpec(node);
  };

  const handleOpenDivisionSpec = (div: typeof divisions[0]) => {
    playUiChime('click');
    setSelectedDivisionSpec(div);
  };

  const handleCopySpec = (node: ServiceNode) => {
    playUiChime('success');
    const specText = `MIHORA SPECIFICATION SHEET:
NODE: ${node.id} - ${node.name}
DIVISION: ${node.division.toUpperCase()}
LATENCY TARGET: ${node.latency || 'N/A'}
REDUNDANCY: ${node.redundancy || 'N/A'}
SLA: ${node.sla || '99.99%'}
CAPACITY: ${node.capacity || 'N/A'}
CORE STACK: ${node.tags.join(', ')}
DELIVERABLES:
${(node.deliverables || []).map(d => `- ${d}`).join('\n')}

Transmitted from MIHORA.TECH (https://mihora.tech)`;
    navigator.clipboard.writeText(specText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Architectural Coordinate Masthead */}
      <section className="w-full bg-surface-container-lowest py-space-sm px-margin-mobile lg:px-margin border-b border-outline/20">
        <div className="flex flex-wrap items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-sm text-label-sm tracking-wider uppercase">
            <Link to="/" className="hover:text-secondary text-on-surface-variant transition-colors">Home</Link>
            <span className="text-outline">/</span>
            <span className="text-secondary-container font-semibold tracking-wider">SERVICES DIRECTORY</span>
            <span className="text-outline">::</span>
            <span className="text-outline">SPEC_VER_4.2.0</span>
          </nav>
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-ping"></span>REGISTRY ACTIVE</span>
            <span className="hidden md:inline text-outline-variant">|</span>
            <span className="hidden md:inline font-mono text-tertiary">LATENCY: 1.4ms (ISB_CORE_01)</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="relative w-full bg-surface-container-low px-margin-mobile lg:px-margin py-space-xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(var(--color-secondary-container)_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="relative z-10 max-w-7xl mx-auto space-y-space-lg">
          <div className="flex flex-wrap items-center justify-between gap-space-md">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-highest rounded-xl text-primary font-label-sm text-label-sm tracking-widest uppercase font-mono font-bold border border-primary/20">
              <Grid size={14} />
              CAPABILITY DIRECTORY &amp; SYSTEMS SPECIFICATION
            </div>
            <div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
              <span>CLASSIFICATION: UNRESTRICTED</span>
              <span className="px-2 py-0.5 bg-primary-container text-on-primary rounded-lg uppercase font-bold text-xs">SOVEREIGN TECH</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
            <div className="lg:col-span-8 space-y-space-md">
              <h1 className="font-headline-xl text-headline-xl font-bold tracking-tight text-on-surface leading-none">
                ENGINEERING FOR THE <br className="hidden sm:inline"/>
                <span className="text-secondary-container drop-shadow-[0_0_24px_var(--color-primary-container)]">ENTIRE TECHNOLOGY</span> <br/>
                LIFECYCLE.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                From cloud architecture and custom software to structured cabling, data center racking, and physical field deployment — explore MIHORA's full engineering scope spanning code, silicon, and physical terrain. Tap any node below to inspect full system parameters.
              </p>
            </div>
            <div className="lg:col-span-4 bg-surface-container-lowest p-space-md rounded-2xl space-y-space-sm shadow-lg border border-outline/30">
              <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                <span>OPERATING STATUS</span>
                <span className="text-secondary font-mono font-bold">GLOBAL DISPATCH</span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                <span>ACTIVE NODES</span>
                <span className="text-on-surface font-mono font-bold">29 REGISTERED CAPABILITIES</span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                <span>COMMAND HUBS</span>
                <span className="text-on-surface font-mono font-bold">LONDON + ISLAMABAD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Intent Filtering Console */}
      <section className="sticky top-20 z-30 w-full bg-surface-container-lowest/95 backdrop-blur-md border-y border-outline/30 px-margin-mobile lg:px-margin py-space-sm shadow-md">
        <div className="max-w-7xl mx-auto space-y-space-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div className="space-y-0.5">
              <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary-container tracking-widest uppercase font-mono font-bold">
                <Terminal size={16} />
                CAPABILITY RESOLUTION ENGINE
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">WHAT DO YOU NEED TO EXECUTE?</h2>
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>{activeIntent === 'ALL' ? 'SHOWING ALL 29 CAPABILITIES' : `FILTERED: ${filteredNodes.length} SPECIFICATIONS MATCHING [${activeIntent}]`}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-space-xs pt-space-xs">
            {[
              { id: 'ALL', label: '[SHOW ALL]' },
              { id: 'BUILD', label: '[BUILD] Software & UI' },
              { id: 'AUTOMATE', label: '[AUTOMATE] Workflows & AI' },
              { id: 'CONNECT', label: '[CONNECT] Networks & Storage' },
              { id: 'DEPLOY', label: '[DEPLOY] Field & Hardware' },
              { id: 'SUPPORT', label: '[SUPPORT] Managed Ops' },
              { id: 'OPTIMIZE', label: '[OPTIMIZE] Systems Telemetry' },
            ].map(intent => (
              <button 
                key={intent.id}
                className={clsx("px-space-md py-space-xs rounded-xl font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer font-bold font-mono text-xs", 
                  activeIntent === intent.id 
                    ? "bg-primary-container text-on-primary shadow-md ring-1 ring-primary/40" 
                    : "bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
                )}
                onClick={() => { setActiveIntent(intent.id); playUiChime('click'); }}
              >
                {intent.label}
              </button>
            ))}
          </div>

          <div className="bg-surface-container-lowest p-space-sm rounded-xl flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant border border-outline/20">
            <div className="flex items-center gap-space-xs font-mono">
              <span className="text-secondary-container font-bold">&gt;</span>
              <span>{activeIntent === 'ALL' ? 'SYSTEM_QUERY: ALL_DIVISIONS // TAP ANY NODE OR "SYS_SPEC" FOR DEEP TELEMETRY' : `SYSTEM_QUERY: INTENT_[${activeIntent}] // DISPATCHING RELEVANT PODS`}</span>
            </div>
            <button className="hover:text-primary transition-colors text-outline uppercase font-mono font-bold cursor-pointer text-xs" onClick={() => { setActiveIntent('ALL'); playUiChime('click'); }}>
              RESET_QUERY
            </button>
          </div>
        </div>
      </section>

      {/* Deep Dive Capability Matrix */}
      <section className="w-full bg-surface px-margin-mobile lg:px-margin space-y-space-xl pb-space-xl pt-space-lg">
        <div className="max-w-7xl mx-auto space-y-space-xl">
          {divisions.map((div) => {
            if (!isDivisionVisible(div.id)) return null;

            return (
              <article key={div.id} id={div.id} className="scroll-mt-28 bg-surface-container-low p-space-lg rounded-2xl shadow-xl space-y-space-lg border border-outline/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl border border-outline/20">
                  <div className="space-y-1">
                    <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary-container uppercase font-mono font-bold">
                      <div.icon size={18} />
                      DIVISION // {div.num} · {div.subtitle}
                    </div>
                    <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight uppercase">{div.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">{div.desc}</p>
                  </div>
                  <div className="flex items-center gap-space-sm shrink-0">
                    <button 
                      onClick={() => handleOpenDivisionSpec(div)}
                      className="px-space-md py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/40 text-primary font-label-sm text-label-sm uppercase rounded-xl transition-all font-bold font-mono flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Layers size={15} />
                      <span>EXPLORE DIVISION SPECS →</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                  {serviceNodes.filter(n => n.division === div.id).map(node => {
                    const visible = activeIntent === 'ALL' || node.intents.includes(activeIntent);
                    return (
                      <div 
                        key={node.id} 
                        onClick={() => visible && handleOpenNodeSpec(node)}
                        className={clsx(
                          "bg-surface-container p-space-md rounded-xl space-y-space-sm transition-all border border-outline/20 relative group", 
                          visible 
                            ? "opacity-100 hover:bg-surface-container-high hover:border-primary/50 cursor-pointer shadow-sm hover:shadow-md" 
                            : "opacity-25 grayscale pointer-events-none"
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-label-sm text-label-sm text-secondary font-mono font-bold">NODE_0{node.id}</span>
                          <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary-container group-hover:text-primary transition-colors border border-outline/20">
                            <node.icon size={18} />
                          </div>
                        </div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">{node.name}</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">{node.desc}</p>
                        
                        <div className="pt-space-xs flex items-center justify-between font-label-sm text-label-sm border-t border-outline/20 mt-2">
                          <span className="text-outline font-mono text-[11px]">STACK: {node.tags[0]}</span>
                          {visible && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleOpenNodeSpec(node); }}
                              className="text-primary hover:text-primary-fixed font-bold font-mono text-xs flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                            >
                              <span>SYS_SPEC</span>
                              <ArrowRight size={13} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* System Specification Inspector Modal */}
      <AnimatePresence>
        {selectedNodeSpec && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl bg-surface-container-low border border-outline/40 rounded-2xl shadow-2xl p-space-lg lg:p-space-xl space-y-space-md relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button 
                onClick={() => { playUiChime('click'); setSelectedNodeSpec(null); }}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Specification"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="space-y-1 pr-10">
                <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span>NODE SPECIFICATION ARCHIVE // 0{selectedNodeSpec.id}</span>
                  <span className="text-outline">::</span>
                  <span className="uppercase text-secondary">{selectedNodeSpec.division} DIVISION</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface font-extrabold uppercase tracking-tight">
                  {selectedNodeSpec.name}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {selectedNodeSpec.desc}
                </p>
              </div>

              {/* Technical Telemetry Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline uppercase font-bold">LATENCY TARGET</div>
                  <div className="text-sm font-extrabold text-primary mt-0.5">{selectedNodeSpec.latency || '< 2.0ms'}</div>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline uppercase font-bold">REDUNDANCY MODEL</div>
                  <div className="text-xs font-bold text-on-surface mt-0.5">{selectedNodeSpec.redundancy || 'Active-Active N+2'}</div>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline uppercase font-bold">SLA COMMITMENT</div>
                  <div className="text-sm font-extrabold text-secondary mt-0.5">{selectedNodeSpec.sla || '99.999%'}</div>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline/30">
                  <div className="text-[10px] text-outline uppercase font-bold">MAX CAPACITY</div>
                  <div className="text-xs font-bold text-on-surface mt-0.5">{selectedNodeSpec.capacity || 'Carrier-Grade'}</div>
                </div>
              </div>

              {/* Deliverables & Technical Protocols */}
              <div className="space-y-2 bg-surface-container p-space-md rounded-xl border border-outline/30">
                <div className="font-label-sm text-label-sm font-mono text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={16} />
                  <span>MANDATORY DELIVERABLES &amp; COMPLIANCE DIRECTIVES</span>
                </div>
                <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                  {(selectedNodeSpec.deliverables || [
                    'Standard ISO-27001 and zero-trust policy enforcement manifest',
                    'Direct failover telemetry with P99 latency monitoring alerts',
                    'Comprehensive verification test runbook signed by lead architect',
                    '24/7 priority dispatch escalation channel to dual hubs'
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-mono font-bold mt-0.5">[{idx + 1}]</span>
                      <span className="text-on-surface font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Bar */}
              <div className="pt-space-xs flex flex-wrap items-center justify-between gap-space-sm border-t border-outline/30">
                <button
                  onClick={() => handleCopySpec(selectedNodeSpec)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface-container hover:bg-surface-container-high border border-outline text-on-surface font-mono text-xs uppercase font-bold rounded-xl transition-all cursor-pointer active:scale-95"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  <span>{copied ? 'SPEC COPIED TO CLIPBOARD' : 'COPY SPEC SHEET'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:hr@mihora.tech?subject=Architectural%20Inquiry%20for%20Node%20${selectedNodeSpec.id}%20(${selectedNodeSpec.name})&body=Hello%20MIHORA%20Architecture%20Team,%0A%0AI%20am%20inquiring%20about%20implementing%20Node%20${selectedNodeSpec.id}:%20${selectedNodeSpec.name}%20(Division:%20${selectedNodeSpec.division.toUpperCase()}).%0A%0ALatency%20requirement:%20${selectedNodeSpec.latency}%0ASLA%20need:%20${selectedNodeSpec.sla}%0A%0APlease%20provide%20a%20technical%20deployment%20consultation.`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 btn-primary-gradient font-mono text-xs uppercase font-bold text-on-primary rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <Mail size={14} />
                    <span>DISPATCH DIRECT TO HQ</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Division Architectural Overview Modal */}
      <AnimatePresence>
        {selectedDivisionSpec && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-surface-container-low border border-outline/40 rounded-2xl shadow-2xl p-space-lg lg:p-space-xl space-y-space-md relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => { playUiChime('click'); setSelectedDivisionSpec(null); }}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Division Spec"
              >
                <X size={18} />
              </button>

              <div className="space-y-1 pr-8">
                <div className="font-mono text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <selectedDivisionSpec.icon size={16} />
                  <span>DIVISION // {selectedDivisionSpec.num} OPERATIONAL BLUEPRINT</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface font-extrabold uppercase tracking-tight">
                  {selectedDivisionSpec.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {selectedDivisionSpec.subtitle}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container border border-outline/30 space-y-2">
                <div className="text-xs font-mono text-primary font-bold uppercase">// CORE PHILOSOPHICAL MANIFESTO</div>
                <p className="font-body-sm text-body-sm text-on-surface leading-relaxed italic">
                  "{selectedDivisionSpec.manifesto}"
                </p>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline/30 flex justify-between items-center">
                  <span className="text-outline uppercase font-bold">PRIMARY TECH KERNEL:</span>
                  <span className="font-bold text-on-surface">{selectedDivisionSpec.techStack}</span>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline/30 flex justify-between items-center">
                  <span className="text-outline uppercase font-bold">RESPONSE PROTOCOL:</span>
                  <span className="font-bold text-secondary">{selectedDivisionSpec.responseSla}</span>
                </div>
              </div>

              <div className="pt-space-xs flex justify-between items-center border-t border-outline/30">
                <span className="font-mono text-[11px] text-outline">MIHORA SOVEREIGN ENGINEERING</span>
                <a
                  href={`mailto:hr@mihora.tech?subject=Division%20${selectedDivisionSpec.num}%20Specification%20Inquiry%20(${selectedDivisionSpec.title})&body=Hello%20MIHORA%20Team,%0A%0AI%20would%20like%20to%20consult%20with%20Division%20${selectedDivisionSpec.num}:%20${selectedDivisionSpec.title}.`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 btn-primary-gradient font-mono text-xs uppercase font-bold text-on-primary rounded-xl shadow-md active:scale-95"
                >
                  <Mail size={14} />
                  <span>CONSULT WITH LEAD ARCHITECT</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Unified System Architecture Diagram */}
      <section className="w-full bg-surface-container-low px-margin-mobile lg:px-margin py-space-xl shadow-2xl">
        <div className="max-w-7xl mx-auto space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="space-y-1">
              <div className="font-label-sm text-label-sm text-secondary-container tracking-widest uppercase flex items-center gap-space-xs font-mono font-bold">
                <Network size={16} />
                SYSTEMIC ARCHITECTURE INTEGRATION
              </div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight uppercase">ONE COHESIVE TELEMETRY FABRIC</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">How all 5 MIHORA divisions lock together to create a continuous, unyielding engineering loop from silicon to cloud to physical deployment.</p>
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest p-space-sm rounded-xl flex items-center gap-space-sm border border-outline/20">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-mono text-xs font-bold text-on-surface">5 DIVISIONS ACTIVE &amp; DISPATCHABLE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-space-sm font-mono text-xs">
            {divisions.map((div, i) => (
              <div key={div.id} className="p-4 bg-surface-container rounded-xl border border-outline/30 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-primary font-bold">STAGE 0{i + 1}</div>
                  <div className="text-sm font-bold text-on-surface uppercase mt-1">{div.title}</div>
                </div>
                <div className="text-[11px] text-on-surface-variant">{div.subtitle}</div>
                <button
                  onClick={() => handleOpenDivisionSpec(div)}
                  className="w-full py-1.5 px-2 text-center rounded bg-surface-container-high hover:bg-primary/20 text-primary font-bold text-[10px] uppercase transition-colors cursor-pointer mt-2"
                >
                  View Blueprint
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Operations Showcase */}
      <section className="w-full bg-surface px-margin-mobile lg:px-margin py-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-space-xl items-center">
          <div className="space-y-space-md">
            <div className="font-label-sm text-label-sm text-secondary-container tracking-widest uppercase font-mono font-bold flex items-center gap-2">
              <HardHat size={16} />
              PHYSICAL REALITY // FIELD FORCES
            </div>
            <h2 className="font-headline-xl text-headline-xl font-bold tracking-tight text-on-surface uppercase">
              NOT JUST CODE. <br className="hidden sm:inline"/>
              COPPER, FIBER, &amp; STEEL.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              MIHORA engineers don't operate solely behind dual-monitors. We terminate high-density single-mode fiber in remote terrain, mount secure radar and camera assemblies at elevation, and configure clustered enterprise hypervisors inside sovereign server rooms.
            </p>
            <div className="grid grid-cols-2 gap-space-sm pt-space-xs font-label-sm text-label-sm">
              <div className="p-space-sm bg-surface-container-high rounded-xl border border-outline/30">
                <span className="text-secondary font-mono block font-bold">CABLE RUNS</span>
                <span className="text-on-surface font-bold font-headline-sm text-headline-sm">250,000+ M</span>
              </div>
              <div className="p-space-sm bg-surface-container-high rounded-xl border border-outline/30">
                <span className="text-secondary font-mono block font-bold">DC RACKS MAINTAINED</span>
                <span className="text-on-surface font-bold font-headline-sm text-headline-sm">1,200+</span>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container border border-outline/30">
            <img className="w-full h-80 lg:h-96 object-cover opacity-85 hover:opacity-100 transition-opacity" alt="Server Rack Deployment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOTLNNPkl_k7z3EfQq342vqflSRzq6YAyDkN58v7Pcw6Pbiy3nFDicGOeGKGinhAt3hNC07__ZihRKMgfuozWfsCtPMP2VOhd_8loxRpYsqFG1WpgxE-GI89DftBobphoxzpZO1HGiWzCXvpquKMvVMg3yEYxmQRkM_eUU8DWrjgNSXZMo8CJTSuTmw2KJ3gSwbVL-1Ezln6Zdt8E_-H-l-m5qGQzq0Ofj2NJqe_nZv4tNZw3sz72fiQ"/>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent p-space-md flex items-center justify-between font-label-sm text-label-sm">
              <div className="space-y-0.5">
                <span className="text-on-surface font-semibold uppercase">DC_RACK_DEPLOYMENT // ISB_FACILITY_4</span>
                <span className="text-on-surface-variant block font-mono">SPEC: 48U HOT-AISLE HIGH DENSITY</span>
              </div>
              <span className="px-2 py-1 bg-secondary text-on-secondary-fixed font-bold rounded-lg font-mono text-xs">VERIFIED</span>
            </div>
          </div>
        </div>
      </section>

      {/* Global Dispatch CTA */}
      <section className="w-full bg-surface-container-high px-margin-mobile lg:px-margin py-space-xl text-on-surface shadow-2xl relative overflow-hidden border-t border-outline/30">
        <div className="max-w-5xl mx-auto space-y-space-md text-center relative z-10">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-lowest rounded-xl text-primary font-label-sm text-label-sm uppercase tracking-widest font-mono font-bold border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            DISPATCH YOUR SYSTEM REQUIREMENTS
          </div>
          <h2 className="font-headline-xl text-headline-xl font-bold tracking-tight text-on-surface uppercase">
            DISCOVER WHAT WE CAN ENGINEER.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Speak directly with a MIHORA Solutions Architect. We review architectural specs, site schematics, and timeline parameters within 24 hours.
          </p>
          <div className="pt-space-sm flex flex-wrap justify-center items-center gap-space-md">
            <a href="mailto:hr@mihora.tech" className="px-space-xl py-space-md btn-primary-gradient font-label-md text-label-md uppercase tracking-widest rounded-xl shadow-lg transition-all font-bold active:scale-95 flex items-center gap-2">
              <Mail size={16} />
              <span>DISPATCH SPECS TO HR@MIHORA.TECH</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
