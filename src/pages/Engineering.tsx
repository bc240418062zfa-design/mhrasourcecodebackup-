import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SlidersHorizontal, ChevronRight, ShieldCheck, Gauge, ArrowRight, 
  Network, Globe, Shield, Pointer, Activity
} from 'lucide-react';
import { SubseaCableExplorer } from '../components/SubseaCableExplorer';

const layerData: Record<number, any> = {
  1: {
    code: "// PROTOCOL IDENTIFIER: ARCH_SPEC_L01",
    title: "SOFTWARE LAYER",
    tier: "TIER: ENTERPRISE LOGIC",
    description: "Clean, decoupled domain architecture designed to survive decades of business iteration. We enforce domain-driven isolation, type safety across interfaces, strict zero-leakage abstractions, and asynchronous event bus backplanes to eliminate cascading runtime dependencies.",
    tags: ["Rust / Go / Python", "CQRS Pattern", "Event Sourcing", "Hermetic Builds", "Strict Hexagonal Ports"],
    kpi1: "99.99%",
    kpi1Sub: "Static analysis & fuzz coverage threshold",
    kpi2: "< 1.4 ms",
    kpi2Sub: "Internal core execution latency"
  },
  2: {
    code: "// PROTOCOL IDENTIFIER: ARCH_SPEC_L02",
    title: "APPLICATION LAYER",
    tier: "TIER: CLIENT & RUNTIME",
    description: "Zero-bloat, high-performance web frontends and native mobile execution environments. We engineer sub-millisecond client renders, deterministic state state-charts, and resilient offline-first data stores synchronized via vector clocks.",
    tags: ["WebAssembly", "TypeScript Engine", "Native C++ Wrappers", "CRDT Sync", "Zero-Jank 120fps UI"],
    kpi1: "< 250 ms",
    kpi1Sub: "First Contentful Paint on Cold Start",
    kpi2: "0 Memory Leaks",
    kpi2Sub: "Verified via continuous automated profiling"
  },
  3: {
    code: "// PROTOCOL IDENTIFIER: ARCH_SPEC_L03",
    title: "API & INTEGRATION LAYER",
    tier: "TIER: HIGH-THROUGHPUT TRANSIT",
    description: "Enterprise-scale integration gateways capable of millions of parallel duplex streams. Powered by binary serialized gRPC protocols, HTTP/3, and low-overhead message brokers that eliminate JSON serialization overhead entirely.",
    tags: ["gRPC / Protobuf", "Kafka Pipelines", "HTTP/3 & QUIC", "Envoy Proxy Mesh", "Mutual TLS 1.3"],
    kpi1: "1.2M req/s",
    kpi1Sub: "Sustained throughput per gateway cluster",
    kpi2: "P99 < 0.8ms",
    kpi2Sub: "Transit overhead across gateway edge"
  },
  4: {
    code: "// PROTOCOL IDENTIFIER: ARCH_SPEC_L04",
    title: "SYSTEM LAYER",
    tier: "TIER: KERNEL & ORCHESTRATION",
    description: "Custom Linux kernel profiles stripped of unused drivers, tuned for micro-latency I/O, paired with sovereign Kubernetes topologies. We write custom eBPF filters for zero-overhead security auditing and packet dispatching at the host level.",
    tags: ["Minimalist Linux Kernel", "Kubernetes Operator Patterns", "eBPF Observability", "cgroups v2 Tuning", "OCI Compliant"],
    kpi1: "Zero-Downtime",
    kpi1Sub: "Rolling blue-green deployment topology",
    kpi2: "3.2 µs",
    kpi2Sub: "eBPF trace interception overhead"
  },
  5: {
    code: "// PROTOCOL IDENTIFIER: ARCH_SPEC_L05",
    title: "NETWORK LAYER",
    tier: "TIER: CARRIER & TOPOLOGY",
    description: "High-resilience SD-WAN meshes, leaf-spine switching topologies, and wire-speed hardware encryption. Every packet traverses fully redundant fiber paths with micro-second BGP failover triggers and autonomous anomaly route rerouting.",
    tags: ["Leaf-Spine 100GbE", "BGP Anycast", "WireGuard Mesh", "Zero-Trust Architecture", "VLAN Segmentation"],
    kpi1: "0% Packet Loss",
    kpi1Sub: "Within SLA boundary conditions",
    kpi2: "< 12 ms",
    kpi2Sub: "Cross-region dedicated transport latency"
  },
  6: {
    code: "// PROTOCOL IDENTIFIER: ARCH_SPEC_L06",
    title: "SERVER LAYER",
    tier: "TIER: COMPUTE & STORAGE",
    description: "Bare-metal high-density compute nodes, enterprise hypervisors, and NVMe-over-Fabrics high-speed storage pools. Designed for compute-intensive analytics, cryptographic verification, and mission-critical persistent workloads.",
    tags: ["NVMe-oF", "KVM Hypervisors", "ECC DDR5 Memory", "IPMI Out-of-Band", "RAID-Z3 Datastores"],
    kpi1: "64 GB/s",
    kpi1Sub: "Direct SAN flash bus read throughput",
    kpi2: "99.999%",
    kpi2Sub: "Hardware node compute availability"
  },
  7: {
    code: "// PROTOCOL IDENTIFIER: ARCH_SPEC_L07",
    title: "INFRASTRUCTURE LAYER",
    tier: "TIER: THERMAL & POWER DYNAMICS",
    description: "Rigorous thermal calculation, hot/cold aisle containment, three-phase PDU distribution, and flywheel uninterruptible power systems. We engineer the physical enclosure so silicon can run at maximum clock rates without thermal throttling.",
    tags: ["N+2 Redundant UPS", "Cold Aisle Containment", "3-Phase Power Distribution", "Precision HVAC", "Clean Agent Fire Ext."],
    kpi1: "PUE 1.15",
    kpi1Sub: "Power Usage Effectiveness rating",
    kpi2: "22°C ± 1°C",
    kpi2Sub: "Rack intake ambient temperature hold"
  },
  8: {
    code: "// PROTOCOL IDENTIFIER: ARCH_SPEC_L08",
    title: "FIELD LAYER",
    tier: "TIER: PHYSICAL DEPLOYMENT",
    description: "Precision on-site deployment: Fluke-certified Cat6A/Single-Mode fiber runs, seismically braced rack enclosures, environmental sensor telemetry matrices, and anti-tamper optical surveillance arrays deployed with absolute structural craft.",
    tags: ["Fluke DSX Testing", "Seismic Rack Anchoring", "IoT Environmental Sensors", "Class 1 Cabling Combing", "PoE++ Field Devices"],
    kpi1: "100% Pass",
    kpi1Sub: "OTDR return loss and continuity verification",
    kpi2: "MIL-STD-810H",
    kpi2Sub: "Physical fixture vibration resilience"
  },
  9: {
    code: "// PROTOCOL IDENTIFIER: ARCH_SPEC_L09",
    title: "OPERATIONS LAYER",
    tier: "TIER: PERSISTENT OBSERVABILITY",
    description: "24/7/365 active engineering observation. High-resolution time-series metrics, distributed synthetic transaction probes, predictive hardware failure telemetry, and direct automated escalation to sovereign systems engineers.",
    tags: ["Prometheus / OpenTelemetry", "Grafana Unified Dashboards", "PagerDuty Core Pipelining", "Automated Playbooks", "Post-Mortem Engine"],
    kpi1: "< 3 Mins",
    kpi1Sub: "Mean time to engineer acknowledgment",
    kpi2: "100% Telemetry",
    kpi2Sub: "Trace coverage across all 9 unified layers"
  }
};

export default function Engineering() {
  const [activeLayer, setActiveLayer] = useState(1);
  const data = layerData[activeLayer];

  return (
    <div className="flex flex-col w-full">
      {/* Blueprint Grid Ambient Layer */}
      <section id="architecture" className="relative w-full bg-surface-container-lowest overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-outline)_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-container/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-48 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative w-full px-margin-mobile lg:px-margin py-space-xl lg:py-24 space-y-space-xl">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
            <div className="flex items-center gap-space-xs tracking-widest uppercase">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="text-outline">/</span>
              <span className="text-secondary font-semibold">Engineering</span>
            </div>
            <div className="flex items-center gap-space-md font-mono text-[11px] bg-surface-container-low px-3 py-1 rounded">
              <span className="text-secondary-container flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></span>
                SYS_ARCH_VER: 4.8.2
              </span>
              <span className="text-outline">|</span>
              <span className="text-on-surface-variant">DUAL HUBS: LON / ISB // UK &amp; PK</span>
            </div>
          </div>
          
          {/* Hero Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
            <div className="lg:col-span-8 space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-2.5 py-1 bg-surface-container-high rounded font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                <SlidersHorizontal size={14} />
                Sovereign Engineering &amp; Datacenter Infrastructure
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface uppercase tracking-tight leading-none font-bold">
                Where Digital <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-container via-primary to-primary-fixed">Meets Physical.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                Most technology firms write code and walk away. Traditional contractors install cables without understanding software architecture. MIHORA bridges the chasm: we engineer sovereign engineering systems from the silicon to the cloud, and physical datacenter infrastructure from the bedrock to the rack.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded shadow-xl">
              <div className="flex items-center justify-between font-label-sm text-label-sm pb-space-xs">
                <span className="text-secondary uppercase tracking-widest">// ARCHITECTURAL TELEMETRY</span>
                <span className="text-on-surface-variant font-mono">LIVE_STREAM</span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="bg-surface-container p-space-sm rounded">
                  <div className="font-label-sm text-label-sm text-outline uppercase">Stack Breadth</div>
                  <div className="font-headline-md text-headline-md text-on-surface font-bold">09</div>
                  <div className="font-label-sm text-label-sm text-secondary-container">Full-Span Layers</div>
                </div>
                <div className="bg-surface-container p-space-sm rounded">
                  <div className="font-label-sm text-label-sm text-outline uppercase">Field Density</div>
                  <div className="font-headline-md text-headline-md text-on-surface font-bold">99.98<span className="text-[14px] font-mono font-normal">%</span></div>
                  <div className="font-label-sm text-label-sm text-secondary-fixed-dim">Uptime Guarantee</div>
                </div>
              </div>
              <div className="p-space-xs bg-surface-container-highest rounded text-on-surface-variant font-label-sm text-label-sm flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-secondary"></span> GLOBAL NOC SYNC</span>
                <span className="font-mono text-on-surface">PKT UTC+5 ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9-Layer Architecture System */}
      <section id="systems-design" className="w-full bg-surface py-space-xl lg:py-24 scroll-mt-24">
        <div className="w-full px-margin-mobile lg:px-margin space-y-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="space-y-space-xs max-w-2xl">
              <div className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">// STRUCTURAL TOPOLOGY MATRIX</div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight uppercase">
                The 9-Layer Sovereign Architecture Stack
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Explore how MIHORA unifies micro-level algorithms, bare-metal acceleration, environmental sensors, and field mechanical fixtures into an unbreakable singular pipeline.
              </p>
            </div>
            <div className="font-label-sm text-label-sm text-secondary-container flex items-center gap-2 bg-surface-container-low px-space-md py-space-xs rounded self-start md:self-auto">
              <Pointer size={14} />
              <span>SELECT ANY LAYER TO INSPECT TELEMETRY</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Nav Rail */}
            <div className="lg:col-span-5 flex flex-col space-y-2">
              {[
                { id: 1, name: "SOFTWARE LAYER", desc: "Clean architecture, modular microservices, logic" },
                { id: 2, name: "APPLICATION LAYER", desc: "High-performance web & native execution runtimes" },
                { id: 3, name: "API & INTEGRATION LAYER", desc: "High-throughput gateways, gRPC, event streaming" },
                { id: 4, name: "SYSTEM LAYER", desc: "OS tuning, container orchestration, distributed runtimes" },
                { id: 5, name: "NETWORK LAYER", desc: "SD-WAN, structured switching, zero-trust tunnels" },
                { id: 6, name: "SERVER LAYER", desc: "Bare-metal clusters, hypervisors, SAN/NAS storage" },
                { id: 7, name: "INFRASTRUCTURE LAYER", desc: "Power distribution, thermal dynamics, rack topology" },
                { id: 8, name: "FIELD LAYER", desc: "Physical cabling, camera mounts, environmental telemetry" },
                { id: 9, name: "OPERATIONS LAYER", desc: "24/7 continuous observability, telemetry & dispatch" },
              ].map(layer => (
                <button 
                  key={layer.id}
                  className={clsx("group w-full text-left p-space-md rounded transition-all flex items-center justify-between",
                    activeLayer === layer.id ? "bg-surface-container-high" : "bg-surface-container-low hover:bg-surface-container"
                  )}
                  onClick={() => setActiveLayer(layer.id)}
                >
                  <div className="flex items-center gap-space-md">
                    <span className={clsx("font-label-md text-label-md font-mono font-bold", 
                      activeLayer === layer.id ? "text-secondary-container" : "text-outline group-hover:text-secondary-container"
                    )}>
                      L0{layer.id}
                    </span>
                    <div>
                      <div className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">{layer.name}</div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">{layer.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className={clsx("text-secondary transition-opacity", activeLayer === layer.id ? "opacity-100" : "opacity-0 group-hover:opacity-50")} />
                </button>
              ))}
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-7 bg-surface-container-low p-space-lg rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-2xl border border-outline/20">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeLayer}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-space-lg"
                >
                  <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md bg-surface-container/50 p-space-md rounded-xl border border-outline/10">
                    <div className="space-y-1">
                      <div className="font-label-sm text-label-sm text-secondary-container font-mono tracking-widest">{data.code}</div>
                      <div className="font-headline-md text-headline-md text-on-surface font-bold">{data.title}</div>
                    </div>
                    <span className="px-space-md py-1 bg-surface-container-highest text-secondary font-label-sm text-label-sm rounded uppercase tracking-wider font-mono border border-secondary/20">{data.tier}</span>
                  </div>
                  
                  <div className="space-y-space-sm">
                    <div className="font-label-sm text-label-sm uppercase text-outline tracking-wider font-bold">// ARCHITECTURAL SCHEMATIC &amp; DIRECTIVES</div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {data.description}
                    </p>
                  </div>
                  
                  <div className="space-y-space-xs">
                    <div className="font-label-sm text-label-sm uppercase text-outline tracking-wider font-bold">// CORE PROTOCOL &amp; COMPONENT STACK</div>
                    <div className="flex flex-wrap gap-2">
                      {data.tags.map((tag: string, i: number) => (
                        <span key={i} className="font-label-sm text-label-sm px-2.5 py-1 bg-surface-container-high text-on-surface rounded font-mono border border-outline/10 hover:border-secondary/30 transition-colors">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                    <div className="bg-surface-container p-space-md rounded-xl space-y-space-xs border border-outline/10">
                      <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">
                        <ShieldCheck size={16} /> Verification Metric
                      </div>
                      <div className="font-headline-sm text-headline-sm text-on-surface font-mono font-bold">{data.kpi1}</div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">{data.kpi1Sub}</div>
                    </div>
                    <div className="bg-surface-container p-space-md rounded-xl space-y-space-xs border border-outline/10">
                      <div className="flex items-center gap-space-xs text-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-bold">
                        <Gauge size={16} /> Execution Telemetry
                      </div>
                      <div className="font-headline-sm text-headline-sm text-on-surface font-mono font-bold">{data.kpi2}</div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">{data.kpi2Sub}</div>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline/15">
                    <div className="flex items-center justify-between pb-space-sm font-label-sm text-label-sm text-outline">
                      <span className="font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-ping"></span>
                        LIVE_TELEMETRY_TRACING
                      </span>
                      <span className="text-secondary-fixed-dim font-mono">SYNC: LOCKED // {data.title}</span>
                    </div>
                    <div className="w-full h-24 flex items-end gap-1.5 pt-2">
                      {[45, 65, 35, 80, 95, 70, 85, 60, 90].map((h, i) => {
                        // Dynamic calculation based on activeLayer
                        const computedHeight = Math.min(100, Math.max(20, (h * (1 + (activeLayer * 0.05))) % 100));
                        return (
                          <div 
                            key={i} 
                            className={clsx(
                              "flex-1 rounded-t flex items-end justify-center pb-1 transition-all duration-500",
                              i === 5 ? "bg-primary text-on-primary" : i === 6 ? "bg-secondary-container text-on-secondary" : i === 8 ? "bg-secondary-fixed-dim text-on-surface" : "bg-primary-container/40 text-secondary"
                            )} 
                            style={{ height: `${computedHeight}%` }}
                          >
                            <span className="font-mono text-[9px]">T{i+1}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="pt-space-md flex items-center justify-between font-label-sm text-label-sm text-outline border-t border-outline/10 mt-space-md">
                <span className="font-mono">MIHORA INDUSTRIAL COMPLIANCE: MIL-STD &amp; ISO-27001</span>
                <Link to="/contact" className="text-secondary hover:text-primary transition-colors flex items-center gap-1 font-bold font-mono">
                  <span>Inspect Raw Manifest</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sovereign Deployment Reality */}
      <section id="hardware-software-stack" className="w-full bg-surface-container-lowest py-space-xl scroll-mt-24">
        <div className="w-full px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <div className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest">// FIELD &amp; SILICON TELEMETRY</div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">Sovereign Deployment Reality</h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              True engineering takes accountability for the copper, fiber, thermal heat, and packet integrity simultaneously.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {[
              {
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-R8IsbO7mKZJWiJLLslJlnPEFaeB6dWSrJ5nW1A-9-sUKTHePIUAACBjtS8owopmtxgI25ZqMMPIhyjQtgH8u_tP5-DO1cYPOf0B2tn3ejnMPGFdp8w30Mu32_DgFZaJXvRlx60vqPYKrL3eABRXKncXd4alnvv4C58fyFmuhcJ9i2vKysndoRnX21v-P_16bfjJJOwC3cQr76ulwssUxLFNMrPwEZGfBl8yQjrnCdm65JQ81drRqwA",
                tag: "BAY-RACK // 42U SPEC",
                title: "Physical Structured Cabling",
                desc: "Every patch cable labeled, certified with Fluke OTDR testing, and structured for zero disruption hot-swaps.",
                spec: "TIA-568-D CERTIFIED"
              },
              {
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8BIiTxu85qyAkvyLmibUfT4aOuHLATY487bLWvJRdHhVhlDfQ8vM_6__xWfPxAC4R25uU1tQ5y8TK8V8lBBOATjQc3u2t5CiG-eXZ3WgdaaxdEleRfxBLc_RCSIb2wU4MK7OnECGOn2s_y_a4draBXfnaIycSn6TmKneCWs4A4rh5Qs_ztxtjnzzlGlMn2MQKa-Xu-eGGwCm8pfRQU_pJDaU1qELHfSr-81vwWP5TyGtOZN1mKQAZgA",
                tag: "OPS-NOC // TELEMETRY 24/7",
                title: "Command Telemetry & NOC",
                desc: "Real-time ingestion of hardware thermals, latency anomalies, power fluctuations, and microservice trace errors.",
                spec: "DUAL REPETITION MONITORING"
              },
              {
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcGXBT-iskix6rUfY7wOlesovM4nrXt0k1oA_r9FGACNDoFRMG_cLgM464OR3THfQPnfVqZmn75LhNfy5HuSQTmBixl57-8wS6EpJhC1SXhZyCaie_7ELKA0zFBLy-704DcchrcYP29UiOP49hX3ZwfxrUTg48bo8hbUI8fa27m83wSBCnklGrr777KJ_VrrM6jTRkrSiHgonbTzhVB3135eLBQyLHJzWWgwUwN6m-_KtIpFijleHOdQ",
                tag: "SILICON // EDGE ACCELERATION",
                title: "Edge Firmware & Orchestration",
                desc: "Low-power hardware runtimes executing deterministic inference models at remote points-of-presence globally.",
                spec: "eBPF KERNEL TRACING"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-surface-container-low rounded overflow-hidden flex flex-col group">
                <div className="h-56 overflow-hidden relative">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} src={item.img} />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-surface-container-lowest/90 font-label-sm text-label-sm text-secondary-container rounded font-mono">
                    {item.tag}
                  </div>
                </div>
                <div className="p-space-md space-y-space-xs flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="font-headline-sm text-headline-sm text-on-surface font-bold">{item.title}</div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{item.desc}</p>
                  </div>
                  <div className="pt-space-sm font-label-sm text-label-sm text-secondary font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> {item.spec}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Engineering Principles */}
      <section id="reliability-telemetry" className="w-full bg-surface py-space-xl lg:py-28 scroll-mt-24">
        <div className="w-full px-margin-mobile lg:px-margin space-y-space-xl">
          <div className="space-y-space-xs">
            <div className="font-label-sm text-label-sm text-secondary-container font-mono tracking-widest uppercase">// AXIOMS OF PRODUCTION</div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold uppercase tracking-tight">Core Engineering Principles</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Non-negotiable mandates that govern every architectural schematic, line of production code, and physical anchor installed.
            </p>
          </div>
          
          <div className="space-y-space-lg">
            {[
              { num: "01", title: "01. Engineer the System", tag: "SYSTEMIC COHESION", desc: "We reject fragmented vendor finger-pointing. Software and hardware do not exist in separate universes. When a database transaction slows down, we trace it from the query planner, down through the kernel driver, across the switch backplane, into the physical fiber transceiver. We architect the holistic system, never a disowned silo." },
              { num: "02", title: "02. Understand the Physical Environment", tag: "ENVIRONMENTAL STOCHASTICS", desc: "Silicon operates inside real thermodynamics. Dust, ambient humidity, irregular mains voltage, thermal choke points, and vibration degrade pristine software algorithms. Our engineering starts with rigorous on-site telemetry, environmental hardening, clean power delivery, and industrial mounting standards before a line of code is booted." },
              { num: "03", title: "03. Design for Real-World Operations", tag: "ERGONOMIC SURVIVABILITY", desc: "Theoretical benchmarks mean nothing if an operator cannot debug the system under crisis at 03:00 AM. We build explicit observability, standardized runbooks, zero-configuration hardware swap paths, and resilient fallback states into every layer. If an interface cannot be operated by humans under stress, it is defective by design." },
              { num: "04", title: "04. Build for Resilient Change", tag: "EVOLVABLE TOPOLOGY", desc: "Protocols evolve; hardware architectures turn obsolete; company scales shift orders of magnitude. We decouple our systems with strict open protocols, backward-compatible API contracts, modular rack geometry, and hyper-transparent configuration states. Change is not an emergency; it is an engineered reality." },
              { num: "05", title: "05. Commit After Deployment", tag: "LONG-HORIZON OWNERSHIP", desc: "Deployment is not the end of a project; it is day zero of runtime life. MIHORA establishes persistent telemetry monitoring, continuous lifecycle maintenance, preventive hardware servicing, and deterministic SLA response times. We stake our institutional reputation on operational continuity over years, not sign-off days." },
            ].map((axiom, idx) => (
              <div key={idx} className="group p-space-lg bg-surface-container-low rounded hover:bg-surface-container transition-all flex flex-col lg:flex-row justify-between lg:items-center gap-space-md">
                <div className="space-y-space-xs max-w-3xl">
                  <div className="font-label-md text-label-md text-secondary-container font-mono">AXIOM // {axiom.num}</div>
                  <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
                    {axiom.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {axiom.desc}
                  </p>
                </div>
                <div className="font-label-sm text-label-sm text-outline font-mono uppercase tracking-widest bg-surface-container px-space-md py-space-sm rounded self-start lg:self-center">
                  {axiom.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Delivery Model */}
      <section className="w-full bg-surface-container-lowest py-space-xl lg:py-24">
        <div className="w-full px-margin-mobile lg:px-margin space-y-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            <div className="lg:col-span-5 space-y-space-md">
              <div className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-mono">// SOVEREIGN DUAL HUB &amp; SPOKE</div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase tracking-tight leading-tight">
                United Kingdom &amp; Pakistan. <br/>
                Dual-Hub Global Operational Footprint.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Our synchronized engineering command hubs in London (United Kingdom) and Islamabad (Pakistan) coordinate worldwide infrastructure rollout, software architecture verification, and remote execution. By fusing UK strategic delivery with localized on-the-ground engineering precision and global ISO-grade compliance, we deliver unmatched sovereign speed and engineering density across continents.
              </p>
              <div className="space-y-space-sm pt-space-xs">
                <div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded">
                  <Network className="text-secondary" />
                  <div>
                    <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">Dual Architectural Command</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Core systems design, automated testing pipelines, and hardware testing labs synchronized across London and Islamabad.</div>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded">
                  <Globe className="text-secondary" />
                  <div>
                    <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">Worldwide Dispatch Field Teams</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Rapid deployment units certified for server assembly, high-voltage UPS, structured cabling, and zero-trust edge installs.</div>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded">
                  <Shield className="text-secondary" />
                  <div>
                    <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">Sovereign Compliance &amp; Standards</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Strict alignment with TIA-942 Datacenter, ISO/IEC 27001, and MIL-STD physical resilience criteria.</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7 bg-surface-container-low p-space-lg rounded space-y-space-md shadow-2xl relative">
              <div className="flex items-center justify-between pb-space-xs">
                <div className="font-label-sm text-label-sm text-on-surface font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                  GLOBAL_DISPATCH_COORDINATION_GRID
                </div>
                <span className="font-label-sm text-label-sm text-outline font-mono">LATENCY: &lt;45MS P99</span>
              </div>
              <div className="relative w-full h-80 bg-surface-container-lowest rounded overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary-container)_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>
                <div className="relative w-full h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="bg-surface-container p-2 rounded text-left font-mono text-[10px] space-y-0.5">
                      <div className="text-secondary font-bold">NODE // EMEA REGION</div>
                      <div className="text-on-surface-variant">FRA / LON / DXB</div>
                      <div className="text-secondary-fixed-dim">DISPATCH: ACTIVE</div>
                    </div>
                    <div className="bg-surface-container p-2 rounded text-right font-mono text-[10px] space-y-0.5">
                      <div className="text-secondary font-bold">NODE // APAC &amp; AMER</div>
                      <div className="text-on-surface-variant">SGP / TYO / SFO</div>
                      <div className="text-secondary-fixed-dim">RELAY: SYNCHRONIZED</div>
                    </div>
                  </div>
                  <div className="self-center bg-primary-container p-space-md rounded shadow-[0_0_24px_var(--color-primary-container)] text-center space-y-1 z-10">
                    <div className="font-label-sm text-label-sm text-secondary-container font-mono tracking-widest font-bold">DUAL COMMAND NOC HUBS</div>
                    <div className="font-headline-sm text-headline-sm text-on-surface font-bold">LONDON (UK) &amp; ISLAMABAD (PK)</div>
                    <div className="font-label-sm text-label-sm text-on-primary-container font-mono">51.5074° N (LON) // 33.6844° N (ISB)</div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="font-mono text-[10px] text-outline">
                      PACKET_ROUTING: BGP ANYCAST MESH
                    </div>
                    <div className="font-mono text-[10px] text-secondary">
                      TELEMETRY POLLING: 500MS INTERVAL
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-space-sm pt-space-xs font-mono">
                <div className="bg-surface-container p-space-sm rounded">
                  <div className="font-label-sm text-label-sm text-outline">Active Deployments</div>
                  <div className="font-headline-sm text-headline-sm text-on-surface font-bold">140+</div>
                </div>
                <div className="bg-surface-container p-space-sm rounded">
                  <div className="font-label-sm text-label-sm text-outline">Dispatch Readiness</div>
                  <div className="font-headline-sm text-headline-sm text-secondary font-bold">4 Hours</div>
                </div>
                <div className="bg-surface-container p-space-sm rounded">
                  <div className="font-label-sm text-label-sm text-outline">Incident MTTR</div>
                  <div className="font-headline-sm text-headline-sm text-on-surface font-bold">18 Mins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Subsea Cable & Terrestrial Dark Fiber Route Explorer */}
      <SubseaCableExplorer />

      {/* CTA */}
      <section className="w-full bg-surface py-space-xl lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-container/5 to-transparent pointer-events-none"></div>
        <div className="w-full px-margin-mobile lg:px-margin text-center space-y-space-lg relative z-10">
          <div className="space-y-space-xs max-w-3xl mx-auto">
            <div className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-mono font-bold">// INITIATE COLLABORATION</div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold uppercase tracking-tight">
              Let’s Build The System.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
              Whether you need a custom sovereign microservice architecture, datacenter thermal overhaul, or end-to-end industrial deployment.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-space-md">
            <a href="mailto:hr@mihora.tech" className="inline-flex items-center gap-space-xs px-space-xl py-space-md bg-primary-container hover:bg-secondary-container text-on-primary hover:text-on-secondary font-label-md text-label-md uppercase tracking-widest rounded shadow-[0_0_24px_var(--color-primary-container)] transition-all font-bold group">
              <span>DISPATCH: HR@MIHORA.TECH</span>
            </a>
            <Link to="/solutions" className="inline-flex items-center gap-space-xs px-space-xl py-space-md bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-widest rounded transition-all font-semibold">
              <span>Explore Solutions</span>
            </Link>
          </div>
          <div className="pt-space-md font-label-sm text-label-sm text-outline font-mono">
            DIRECT DISPATCH ROUTE: <span className="text-on-surface">HR@MIHORA.TECH</span> // RESPONSE TIME: &lt; 2 HOURS
          </div>
        </div>
      </section>
    </div>
  );
}
