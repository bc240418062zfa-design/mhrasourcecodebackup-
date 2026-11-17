import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import {
  SlidersHorizontal, ChevronRight, ShieldCheck, Gauge, ArrowRight,
  Network, Globe, Shield, Pointer
} from 'lucide-react';
import { SubseaCableExplorer } from '../components/SubseaCableExplorer';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VISUAL_ASSETS } from '../assets/visuals';
import { Reveal, StaggerGrid, StaggerItem, AnimatedCounter, MaskTextReveal, Tilt3DFrame } from '../components/MotionPrimitives';

interface LayerSpec {
  code: string;
  title: string;
  tier: string;
  description: string;
  tags: string[];
  kpi1: string;
  kpi1Sub: string;
  kpi2: string;
  kpi2Sub: string;
}

const layerData: Record<number, LayerSpec> = {
  1: {
    code: 'Layer 01 · Domain & Software Architecture',
    title: 'Software Layer',
    tier: 'Enterprise Logic',
    description:
      'Decoupled domain architecture designed to survive years of business evolution. Enforces typed interfaces, strict boundary isolation, and deterministic state persistence.',
    tags: ['Rust / Go / TypeScript', 'CQRS Pattern', 'Event Sourcing', 'Hermetic Builds', 'Hexagonal Ports'],
    kpi1: '99.99%',
    kpi1Sub: 'Static verification & test coverage gate',
    kpi2: '< 1.4 ms',
    kpi2Sub: 'Core microservice processing latency',
  },
  2: {
    code: 'Layer 02 · Client & Edge Interfaces',
    title: 'Application Layer',
    tier: 'Client & Runtime',
    description:
      'High-performance web frontends and native offline-first mobile runtimes engineered for crisp typography, zero UI blocking, and rapid state convergence.',
    tags: ['React 19', 'TypeScript', 'WebAssembly', 'CRDT Sync', 'WCAG AAA Contrast'],
    kpi1: '< 250 ms',
    kpi1Sub: 'Target First Contentful Paint',
    kpi2: '60 FPS',
    kpi2Sub: 'Reduced-motion safe surface responsiveness',
  },
  3: {
    code: 'Layer 03 · High-Throughput Service Mesh',
    title: 'API & Integration Layer',
    tier: 'Transit & Streaming',
    description:
      'Distributed integration gateways utilizing binary serialized gRPC schemas, Apache Kafka pipelines, and mutual TLS v1.3 transport authentication.',
    tags: ['gRPC / Protobuf', 'Kafka Pipelines', 'HTTP/3 & QUIC', 'Envoy Mesh', 'Mutual TLS 1.3'],
    kpi1: '1.2M req/s',
    kpi1Sub: 'Cluster gateway capacity',
    kpi2: '< 0.8 ms',
    kpi2Sub: 'P99 gateway transit overhead',
  },
  4: {
    code: 'Layer 04 · OS Kernels & Orchestration',
    title: 'System Layer',
    tier: 'Kernel & Containers',
    description:
      'Hardened Linux kernel profiles tuned for low-latency I/O, paired with sovereign Kubernetes topologies and eBPF host-level security telemetry.',
    tags: ['Hardened Linux Kernel', 'Kubernetes', 'eBPF Telemetry', 'cgroups v2', 'CIS Level 2'],
    kpi1: 'Zero-Downtime',
    kpi1Sub: 'Canary blue-green rollout topology',
    kpi2: '3.2 μs',
    kpi2Sub: 'eBPF packet trace interception',
  },
  5: {
    code: 'Layer 05 · Spine-Leaf & BGP Networks',
    title: 'Network Layer',
    tier: 'Carrier & Routing',
    description:
      'EVPN-VXLAN switching fabrics, multi-homed optical uplinks, WireGuard meshes, and sub-second BGP route failover across sovereign perimeters.',
    tags: ['Leaf-Spine 100GbE', 'BGP Anycast', 'WireGuard Mesh', 'Zero-Trust VLANs', 'Flowspec'],
    kpi1: '0.00%',
    kpi1Sub: 'Target packet drop under SLA',
    kpi2: '< 18.5 ms',
    kpi2Sub: 'Cross-hub London-Islamabad transport RTT',
  },
  6: {
    code: 'Layer 06 · Compute & NVMe Storage',
    title: 'Server Layer',
    tier: 'Silicon & SAN Fabrics',
    description:
      'Bare-metal high-density compute nodes, Proxmox/KVM hypervisors, NVMe-oF storage arrays, and isolated out-of-band IPMI management.',
    tags: ['NVMe-oF SAN', 'KVM Hypervisors', 'ECC DDR5', 'IPMI Air-Gap', 'Ceph 3x Replication'],
    kpi1: '64 GB/s',
    kpi1Sub: 'SAN flash bus sequential throughput',
    kpi2: '99.999%',
    kpi2Sub: 'Hardware node compute availability',
  },
  7: {
    code: 'Layer 07 · Power & Thermal Containment',
    title: 'Infrastructure Layer',
    tier: 'Thermodynamics & Power',
    description:
      'CFD thermal airflow balancing, hot/cold aisle containment, three-phase PDU distribution, and 2N Automatic Transfer Switch redundancy.',
    tags: ['2N Redundant UPS', 'Cold-Aisle Containment', '3-Phase PDU', 'Precision Cooling', 'Clean-Agent Fire'],
    kpi1: 'PUE 1.14',
    kpi1Sub: 'Design facility Power Usage Effectiveness',
    kpi2: '22°C +/- 1°C',
    kpi2Sub: 'Rack intake ambient temperature hold',
  },
  8: {
    code: 'Layer 08 · Physical Field Execution',
    title: 'Field Layer',
    tier: 'Cabling & Enclosures',
    description:
      'Core-alignment optical fusion splicing verified bidirectionally via EXFO OTDR, Fluke DSX Cat6A testing, seismic cabinet anchoring, and industrial surveillance.',
    tags: ['Fluke DSX-8000', 'EXFO OTDR <= 0.03 dB', 'Seismic Bracing', 'NEMA-4X Enclosures', 'NDAA Optics'],
    kpi1: '100% Certified',
    kpi1Sub: 'Bidirectional OTDR optical loss trace pass',
    kpi2: 'TIA-568-D',
    kpi2Sub: 'Structured cabling certification baseline',
  },
  9: {
    code: 'Layer 09 · Follow-the-Sun SRE',
    title: 'Operations Layer',
    tier: '24/7 Dual-Hub Custody',
    description:
      'Around-the-clock engineering observation uniting optical, thermal, and microservice traces across our synchronized London and Islamabad watchdesks.',
    tags: ['Prometheus / OTel', 'Grafana Dashboards', 'Sub-15m P1 Escalation', 'CVE Automation', 'DR Drills'],
    kpi1: '< 15 Mins',
    kpi1Sub: 'Guaranteed P1 incident containment SLA',
    kpi2: '100% Trace',
    kpi2Sub: 'Observability from Layer 1 through Layer 9',
  },
};

export default function Engineering() {
  const [activeLayer, setActiveLayer] = useState(1);
  const data = layerData[activeLayer];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section id="architecture" className="w-full obsidian-band obsidian-grid border-b border-white/10 py-14 lg:py-22 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-8">
          <Breadcrumbs items={[{ label: 'Engineering' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <Reveal>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                  <SlidersHorizontal size={14} />
                  <span>Sovereign Engineering &amp; Physical Architecture</span>
                </div>
              </Reveal>
              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  Where Digital Code Meets Physical Reality
                </h1>
              </MaskTextReveal>
              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
                  Software vendors frequently ignore hardware bottlenecks, while cabling contractors rarely understand microservice resilience. MIHORA.TECH bridges both domains through an integrated 9-layer architecture spanning optical fiber to cloud APIs.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4 bg-white/[0.04] p-5 rounded-2xl border border-white/15 space-y-3 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold uppercase">Stack Architecture</span>
                <span className="text-slate-400">London &amp; Islamabad</span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/15 border border-white/15 bg-black/30 rounded-xl overflow-hidden">
                <div className="p-3.5">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Stack Span</div>
                  <div className="font-headline text-2xl font-extrabold text-white mt-0.5">09 Layers</div>
                </div>
                <div className="p-3.5">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Target SLA</div>
                  <div className="font-headline text-2xl font-extrabold text-amber-400 mt-0.5">
                    <AnimatedCounter target={99.999} decimals={3} suffix="%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 9-Layer Architecture Stack */}
      <section id="systems-design" className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Structural Topology Matrix
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                The 9-Layer Sovereign Architecture Stack
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant">
                Select any layer below to inspect underlying protocols, verification gates, and quantitative tolerances.
              </p>
            </div>
            <div className="font-mono text-xs text-primary flex items-center gap-2 font-semibold">
              <Pointer size={14} />
              <span>Select layer L01–L09 to inspect</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 flex flex-col space-y-2">
              {[
                { id: 1, name: 'Software Layer', desc: 'Clean architecture, microservices, deterministic logic' },
                { id: 2, name: 'Application Layer', desc: 'High-speed web platforms & native runtimes' },
                { id: 3, name: 'API & Integration Layer', desc: 'gRPC gateways, Kafka event streams, mTLS' },
                { id: 4, name: 'System Layer', desc: 'Hardened Linux kernels, Kubernetes & eBPF' },
                { id: 5, name: 'Network Layer', desc: 'EVPN-VXLAN spine-leaf, BGP Anycast, SD-WAN' },
                { id: 6, name: 'Server Layer', desc: 'Bare-metal compute clusters & NVMe SANs' },
                { id: 7, name: 'Infrastructure Layer', desc: '2N power distribution & cold-aisle thermal containment' },
                { id: 8, name: 'Field Layer', desc: 'OTDR-certified fiber optics & ruggedized enclosures' },
                { id: 9, name: 'Operations Layer', desc: '24/7 dual-hub observability & field dispatch' },
              ].map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  className={clsx(
                    'w-full text-left p-4 rounded-xl transition-all flex items-center justify-between border cursor-pointer',
                    activeLayer === layer.id
                      ? 'bg-surface-container-lowest border-primary shadow-sm'
                      : 'bg-surface-container-low/70 border-outline/20 hover:bg-surface-container'
                  )}
                  onClick={() => setActiveLayer(layer.id)}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-bold text-primary">L0{layer.id}</span>
                    <div>
                      <div className="font-headline text-sm sm:text-base text-on-surface font-bold">
                        {layer.name}
                      </div>
                      <div className="text-xs text-on-surface-variant">{layer.desc}</div>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className={clsx(
                      'text-primary transition-opacity shrink-0',
                      activeLayer === layer.id ? 'opacity-100' : 'opacity-30'
                    )}
                  />
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline/25 shadow-sm flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLayer}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-outline/20">
                    <div>
                      <div className="font-mono text-xs text-primary font-semibold">{data.code}</div>
                      <h3 className="font-headline text-2xl text-on-surface font-extrabold mt-0.5">
                        {data.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      {data.tier}
                    </span>
                  </div>

                  <p className="text-base text-on-surface-variant leading-relaxed">{data.description}</p>

                  <div className="space-y-2">
                    <div className="font-mono text-xs uppercase text-on-surface-variant font-semibold">
                      Core Protocols &amp; Components
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs px-3 py-1 bg-surface-container-low text-on-surface rounded-lg border border-outline/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-surface-container-low p-4 rounded-xl border border-outline/20 space-y-1">
                      <div className="flex items-center gap-1.5 text-primary font-mono text-xs uppercase font-bold">
                        <ShieldCheck size={15} />
                        <span>Verification Metric</span>
                      </div>
                      <div className="font-headline text-xl font-extrabold text-on-surface tabular-nums">
                        {data.kpi1}
                      </div>
                      <div className="text-xs text-on-surface-variant">{data.kpi1Sub}</div>
                    </div>

                    <div className="bg-surface-container-low p-4 rounded-xl border border-outline/20 space-y-1">
                      <div className="flex items-center gap-1.5 text-primary font-mono text-xs uppercase font-bold">
                        <Gauge size={15} />
                        <span>Execution Telemetry</span>
                      </div>
                      <div className="font-headline text-xl font-extrabold text-on-surface tabular-nums">
                        {data.kpi2}
                      </div>
                      <div className="text-xs text-on-surface-variant">{data.kpi2Sub}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-6 mt-6 border-t border-outline/15 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span className="text-on-surface-variant">Standards: TIA-568-D &amp; ISO/IEC 27001</span>
                <Link to="/docs" className="text-primary hover:underline font-semibold inline-flex items-center gap-1">
                  <span>Open Full Docs Codex</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware-Software Stack Showcase (Bundled Visual Assets) */}
      <section id="hardware-software-stack" className="w-full bg-surface-container-low py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Field &amp; Silicon Verification
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-extrabold">
                Hardware-Software Production Standards
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md">
              Accountability spanning optical glass, thermal management, and distributed runtime tracing.
            </p>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: VISUAL_ASSETS.fiberOpticsHardware,
                alt: 'TIA-568-D certified structured optical fiber patch cabling and QSFP28 switches',
                title: 'Physical Structured Cabling',
                desc: 'Every optical span labeled, bidirectional EXFO OTDR certified, and groomed for hot-swap maintenance.',
                spec: 'TIA-568-D · <= 0.03 dB Mean Loss',
              },
              {
                img: VISUAL_ASSETS.sovereignCommandHub,
                alt: 'London and Islamabad synchronized NOC command studio',
                title: 'Command Telemetry & NOC',
                desc: 'Live ingestion of PDU thermals, optical transceiver light levels, and microservice tail latency traces.',
                spec: 'Follow-the-Sun Dual-Hub Watchdesk',
              },
              {
                img: VISUAL_ASSETS.fieldEngineeringEdge,
                alt: 'Ruggedized NEMA-4X industrial edge telemetry enclosure',
                title: 'Edge SCADA & Field Enclosures',
                desc: 'Optically isolated hardware relays and deterministic local runtimes surviving demanding field environments.',
                spec: 'eBPF Tracing · Optical Diode Isolation',
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <Tilt3DFrame maxTilt={4} className="h-full">
                  <div className="surface-card rounded-2xl overflow-hidden flex flex-col h-full group">
                    <div className="h-52 overflow-hidden">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={item.alt}
                        src={item.img}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h3 className="font-headline text-lg text-on-surface font-bold">{item.title}</h3>
                        <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="pt-3 border-t border-outline/15 font-mono text-xs text-gold font-bold">
                        {item.spec}
                      </div>
                    </div>
                  </div>
                </Tilt3DFrame>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Core Engineering Principles */}
      <section id="reliability-telemetry" className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-10">
          <Reveal>
            <div className="space-y-2 max-w-2xl">
              <div className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Axioms of Production
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-extrabold">
                Five Non-Negotiable Engineering Principles
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[
              {
                num: '01',
                title: 'Engineer the Complete System',
                tag: 'Holistic Ownership',
                desc: 'Software and hardware never fail in separate universes. When a query stalls, we trace from the SQL plan through the kernel driver and optical transceiver.',
              },
              {
                num: '02',
                title: 'Respect Physical Thermodynamics',
                tag: 'Environmental Hardening',
                desc: 'Dust, voltage transients, humidity, and thermal bottlenecks degrade clean software. Every rollout begins with power and cooling discipline.',
              },
              {
                num: '03',
                title: 'Design for 03:00 AM Triage',
                tag: 'Operator Clarity',
                desc: 'Metrics mean little if engineers cannot diagnose faults under pressure. Clear runbooks, predictable naming, and instant rollback paths ship by default.',
              },
              {
                num: '04',
                title: 'Build on Open, Evolvable Standards',
                tag: 'Zero Lock-In',
                desc: 'Clean contracts, Terraform/Ansible reproducibility, and standard protocols keep clients free to adapt as hardware and traffic grow.',
              },
              {
                num: '05',
                title: 'Maintain Accountability After Launch',
                tag: 'Multi-Year Continuity',
                desc: 'Cutover is day zero of runtime custody. Our London and Islamabad teams stand behind every deployment with contracted 24/7 telemetry.',
              },
            ].map((axiom) => (
              <div
                key={axiom.num}
                className="p-6 bg-surface-container-lowest rounded-2xl border border-outline/20 flex flex-col lg:flex-row justify-between lg:items-center gap-4"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="font-mono text-xs text-primary font-semibold">Axiom {axiom.num} · {axiom.tag}</div>
                  <h3 className="font-headline text-xl text-on-surface font-bold">{axiom.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{axiom.desc}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0 text-xs font-mono text-on-surface-variant">
                  <span className="flex items-center gap-1.5"><Network size={14} className="text-primary" /> Verified</span>
                  <span className="flex items-center gap-1.5"><Shield size={14} className="text-primary" /> Audited</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Subsea Cable Explorer */}
      <SubseaCableExplorer />

      {/* Final Engineering Links */}
      <section className="w-full bg-surface-container-lowest py-16 px-4 sm:px-6 lg:px-8 border-t border-outline/20">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            Next Steps
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
            Review Full Reference Standards or Scope Your Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/resources"
              className="px-6 py-3 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface text-sm font-semibold rounded-lg inline-flex items-center gap-2"
            >
              <Globe size={16} className="text-primary" />
              <span>Knowledge Hub &amp; Standards</span>
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg inline-flex items-center gap-2"
            >
              <span>Engage Engineering Desk</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
