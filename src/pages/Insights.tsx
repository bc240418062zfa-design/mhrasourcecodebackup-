import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight, BookOpen, FileText, Search, X, Check, Copy, Printer,
  Mail, ArrowRight, ShieldCheck, Terminal
} from 'lucide-react';
import { playUiChime } from '../utils/audio';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { Reveal, StaggerGrid, StaggerItem } from '../components/MotionPrimitives';
import { LiveIndustryNews } from '../components/LiveIndustryNews';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { VISUAL_ASSETS } from '../assets/visuals';

interface InsightArticle {
  id: string;
  category: string;
  type: 'PAPER' | 'CASE_STUDY' | 'ANALYSIS';
  title: string;
  summary: string;
  author: string;
  date: string;
  classification: string;
  metrics: { label: string; value: string; delta: string }[];
  sections: { heading: string; body: string }[];
  schematic?: string;
  conclusion: string;
}

const articles: Record<string, InsightArticle> = {
  featured: {
    id: 'ARCH-2025-09',
    category: 'PHYSICAL LAYER & FIBER',
    type: 'PAPER',
    title: 'Physical Layer Determinism in Distributed Micro-Datacenters',
    summary:
      'An exhaustive architectural evaluation of how thermal harmonic variances and structured optical cable bending radii degrade packet jitter in real-world high-frequency trading and algorithmic routing systems.',
    author: 'MIHORA Sovereign R&D Labs (London Hub)',
    date: 'OCTOBER 2025',
    classification: 'SOVEREIGN ARCHIVE · PUBLIC',
    metrics: [
      { label: 'Jitter Degradation', value: '0.14μs', delta: '-87% under bend control' },
      { label: 'Thermal Delta Max', value: '4.2°C', delta: 'Controlled across 42U rack' },
      { label: 'P99 Ingress Latency', value: '820ns', delta: 'Deterministic packet arrival' },
      { label: 'Bit Error Rate (BER)', value: '1e-14', delta: 'Fluke OTDR certified' },
    ],
    sections: [
      {
        heading: '1. Problem Statement: Micro-Jitter In Hardware Racks',
        body: 'In sub-millisecond data plane applications, software optimizations hit diminishing returns. When optical patch cords experience bending radii below 30mm or thermal expansion inside high-density 42U racks, chromatic dispersion and refractive index variations introduce measurable packet micro-jitter exceeding 1.2 microseconds.',
      },
      {
        heading: '2. Physical Cable Grooming & Controlled Tensioning',
        body: 'MIHORA implemented high-density Corning ClearCurve single-mode fibers bundled with zero-strain hook-and-loop raceways. Airflow containment baffles ensure uniform front-to-rear delta-T gradients, isolating fiber trays from variable CPU thermal exhaust.',
      },
      {
        heading: '3. Empirical Oscilloscope & Optical Loss Telemetry',
        body: 'Continuous OTDR laser backscatter probes monitored 250,000 meters of installed fiber across dual synchronizing hubs. Enforcing ANSI/TIA-568-D structural specifications eliminated 99.4% of intermittent interface micro-drops.',
      },
    ],
    schematic: `+-------------------------------------------------------------+
| FIBER RUN DETERMINISM TOPOLOGY                              |
|                                                             |
| [100G QSFP28] -> (Zero-Strain Bend) -> [Patch Tray (SMF)]   |
|      |                                       |              |
|   < 820ns                                < 0.02dB loss      |
|      v                                       v              |
| [FPGA NIC Direct Kernel Bypass] <--- [PTP Hardware Clock]   |
+-------------------------------------------------------------+`,
    conclusion:
      'True ultra-low-latency engineering cannot divorce software algorithms from physical silicon, copper, and glass physics. Hardware layer determinism provides the unshakeable bedrock for high-throughput distributed systems.',
  },
  logistics: {
    id: 'LOG-2025-04',
    category: 'LOGISTICS & EDGE COMPUTE',
    type: 'CASE_STUDY',
    title: 'Sub-Second Barcode Processing on the Edge: 40 Distribution Centers',
    summary:
      'How deploying edge compute units reduced API server roundtrips by 92% across a national logistics grid with over 100,000 daily parcel handoffs.',
    author: 'MIHORA Field Operations & Digital Engineering',
    date: 'SEPTEMBER 2025',
    classification: 'ENTERPRISE PRODUCTION',
    metrics: [
      { label: 'Scan-to-Sort Latency', value: '48ms', delta: '-92% down from 620ms' },
      { label: 'Offline Resiliency', value: '72 Hours', delta: 'Zero data loss during WAN cut' },
      { label: 'Parcels Handled', value: '100K+/Day', delta: 'Zero barcode queue backups' },
      { label: 'API Roundtrips Saved', value: '4.2M/Day', delta: 'Local SQLite CRDT replication' },
    ],
    sections: [
      {
        heading: '1. National Distribution Grid Bottleneck',
        body: 'Warehouse barcode scanners previously depended on centralized cloud APIs for SKU destination lookups. Intermittent WAN fiber cuts and 400ms roundtrips caused forklift bottlenecks and conveyor belt stalling during peak holiday rushes.',
      },
      {
        heading: '2. Sovereign Ruggedized Edge Appliances',
        body: 'We deployed ruggedized 1U Linux edge nodes directly adjacent to industrial sorting belts at all 40 distribution centers. Inventory databases replicate locally via peer-to-peer event streaming with conflict-free replicated data types (CRDT).',
      },
    ],
    schematic: `[Conveyor Scanner] ---> (Ethernet / Cat6A) ---> [Local Edge Box (48ms)]
                                                        |
                                            (Background Async Sync)
                                                        v
                                          [Central Sovereign Cloud]`,
    conclusion:
      'By shifting state resolution from central clouds to ruggedized local edge appliances, warehouses maintain continuous automated routing even if external internet carriers suffer complete physical severance.',
  },
  cctv: {
    id: 'SURV-2025-02',
    category: 'CCTV & PHYSICAL SECURITY',
    type: 'CASE_STUDY',
    title: 'Autonomous Surveillance Failover Under Intermittent Power Grids',
    summary:
      'Engineering hybrid solar-backed battery enclosures for perimeter sensors and AI camera arrays in extreme climate terrains.',
    author: 'MIHORA Tactical Field Engineering Group',
    date: 'AUGUST 2025',
    classification: 'FIELD HARDENED',
    metrics: [
      { label: 'Autonomous Run-Time', value: '96 Hours', delta: 'Without any grid electricity' },
      { label: 'Perimeter Coverage', value: '38 Kilometers', delta: 'Continuous 4K optical scan' },
      { label: 'PTZ Slew Rate', value: '400°/sec', delta: 'Instant optical target lock' },
      { label: 'Thermal Sensor Range', value: '2.4km', delta: 'Night zero-illumination detection' },
    ],
    sections: [
      {
        heading: '1. Hostile Climate Perimeter Vulnerabilities',
        body: 'Perimeter defense along remote pipeline corridors suffered frequent brownouts and lightning surge damage, disabling standard PoE IP security cameras and leaving blind spots.',
      },
      {
        heading: '2. Ruggedized NEMA-4X Enclosures With LiFePO4 Buffers',
        body: 'MIHORA fabricated custom stainless steel NEMA enclosures equipped with heavy-duty LiFePO4 battery banks, MPPT solar controllers, and fiber optic transceivers rated for -40°C to +75°C continuous operation.',
      },
    ],
    conclusion:
      'Combining local battery buffering with localized edge computer vision provides unbroken perimeter surveillance across desolate geographies regardless of national grid reliability.',
  },
  zerotrust: {
    id: 'NET-2025-11',
    category: 'SECURITY & TOPOLOGY',
    type: 'PAPER',
    title: 'Zero-Trust Network Mesh in Air-Gapped Environments',
    summary:
      'Analysis of cryptographic handshakes and ephemeral mutual TLS across physically isolated switch layers without public PKI access.',
    author: 'MIHORA Infrastructure & Security Architecture',
    date: 'NOVEMBER 2025',
    classification: 'HIGH-SECURITY SOVEREIGN',
    metrics: [
      { label: 'Handshake Time', value: '1.2ms', delta: 'Hardware TPM 2.0 accelerated' },
      { label: 'Air-Gap Integrity', value: '100%', delta: 'Zero external WAN connections' },
      { label: 'Key Rotation Cycle', value: '60 Mins', delta: 'Automated ephemeral renewal' },
      { label: 'Packet Throughput', value: '98.6 Gbps', delta: 'Wire-speed encrypted routing' },
    ],
    sections: [
      {
        heading: '1. The Air-Gap Public PKI Paradox',
        body: 'Traditional zero-trust frameworks rely on external Certificate Authorities (CAs) and online OCSP revocation checks. In sovereign air-gapped data centers, this model fails immediately.',
      },
      {
        heading: '2. Ephemeral Hardware-Anchored Mesh PKI',
        body: 'We engineered an internal deterministic trust engine anchored by physical Hardware Security Modules (HSM). Ephemeral certificates are generated and verified locally with sub-millisecond cryptographic verification.',
      },
    ],
    conclusion:
      'Air-gapped networks do not require compromising on zero-trust verification. Sovereign local cryptography enables micro-segmented security without external network reliance.',
  },
  'k8s-state': {
    id: 'SRE-2025-07',
    category: 'SYSTEMS & CLUSTER RESILIENCE',
    type: 'PAPER',
    title: 'State Persistence in Stateless K8s Nodes',
    summary:
      'Solving distributed cache invalidation during rolling container restarts on edge-deployed worker nodes.',
    author: 'MIHORA Managed Technology SRE Division',
    date: 'JULY 2025',
    classification: 'SYSTEM SPECIFICATION',
    metrics: [
      { label: 'Cold-Start Cache Miss', value: '0.04%', delta: 'Reduced from 48%' },
      { label: 'Rolling Restart Drain', value: '< 4 Secs', delta: 'Zero HTTP 502 connection drops' },
      { label: 'Memory Eviction Drift', value: '0 MB', delta: 'Shared memory ring buffers' },
      { label: 'P99 Tail Latency', value: '3.1ms', delta: 'Sustained during pod evacuation' },
    ],
    sections: [
      {
        heading: '1. The Container Ephemerality Penalty',
        body: 'Kubernetes excels at managing stateless pods, but in high-load data pipelines, restarting a pod flushes gigabytes of hot in-memory indexes, crippling database backend servers.',
      },
      {
        heading: '2. Host-Shared POSIX Memory Segments',
        body: 'By attaching persistent POSIX shared-memory mapped files between host kernels and transient containers, new pod iterations instantly inherit the warm cached state of retiring pods in microseconds.',
      },
    ],
    conclusion:
      'True high-availability engineering leverages low-level Linux kernel capabilities to bridge the gap between container agility and bare-metal memory persistence.',
  },
  'retail-grid': {
    id: 'CASE-2025-01',
    category: 'ENTERPRISE NETWORKS',
    type: 'CASE_STUDY',
    title: 'National Retail Inventory Grid: 1,200 UTM Appliances',
    summary:
      'Deploying 1,200 unified threat management appliances and SD-WAN gateways across a fragmented multi-ISP retail network.',
    author: 'MIHORA Field Forces & Network Division',
    date: 'JUNE 2025',
    classification: 'ENTERPRISE RETROFIT',
    metrics: [
      { label: 'Deployment Speed', value: '30 Sites/Week', delta: 'Standardized zero-touch provisioning' },
      { label: 'WAN Failover Latency', value: '< 200ms', delta: 'Dual LTE/Fiber bonding' },
      { label: 'Annual Bandwidth Cost', value: '-45%', delta: 'Direct local breakout for cloud apps' },
      { label: 'Fleet Compliance', value: '100%', delta: 'PCI-DSS 4.0 certified' },
    ],
    sections: [
      {
        heading: '1. Fragmented Legacy Retail Branches',
        body: 'Over 1,200 retail store locations operated legacy disparate DSL, fiber, and consumer routers. Card terminal outages and inventory desyncs caused significant daily revenue leakage.',
      },
      {
        heading: '2. Unified Hardware Standardization & Automated Provisioning',
        body: 'MIHORA engineered a turnkey hardware crate containing pre-configured SD-WAN edge gateways, Cat6A patch leads, and dual-SIM cellular failover units dispatched nationwide with step-by-step field verification protocols.',
      },
    ],
    conclusion:
      'Standardized physical field engineering combined with centralized zero-touch cloud configuration turns complex retail network sprawls into disciplined, resilient enterprise infrastructure.',
  },
  'hospital-5g': {
    id: 'MED-2025-05',
    category: 'HEALTHCARE & TELECOM',
    type: 'CASE_STUDY',
    title: 'Hospital Private 5G Core for Mobile Imaging Units',
    summary:
      'Architecting a local private spectrum cell network to bypass Wi-Fi interference for critical diagnostic carts and mobile imaging units.',
    author: 'MIHORA Telecom & Wireless Systems',
    date: 'MAY 2025',
    classification: 'CRITICAL HEALTH INFRASTRUCTURE',
    metrics: [
      { label: 'Bandwidth per Cart', value: '850 Mbps', delta: 'Uncompressed real-time MRI stream' },
      { label: 'Roaming Handover Loss', value: '0 Packets', delta: 'Seamless inter-cell transition' },
      { label: 'Interference Immunity', value: '100%', delta: 'Dedicated CBRS spectrum band' },
      { label: 'Diagnostic Time Saved', value: '18 Mins', delta: 'Per trauma room consultation' },
    ],
    sections: [
      {
        heading: '1. Wi-Fi Saturation in Medical Wards',
        body: 'Dense concrete hospital walls, thousands of visitor smartphones, and medical telemetry monitors rendered 2.4GHz and 5GHz Wi-Fi unreliable for transmitting 8GB uncompressed radiological scans.',
      },
      {
        heading: '2. Private CBRS / 5G Radio Mesh',
        body: 'MIHORA deployed a standalone private 5G core operating on protected CBRS frequencies. Diagnostic mobile ultrasound and X-ray carts transmit uncompressed DICOM imagery directly to surgeons with zero interference.',
      },
    ],
    conclusion:
      'Mission-critical healthcare environments demand physical spectrum separation. Private 5G provides the deterministic throughput and zero-packet-loss assurance patient lives depend on.',
  },
  'saas-fallacy': {
    id: 'ANA-2025-08',
    category: 'INDUSTRIAL ANALYSIS',
    type: 'ANALYSIS',
    title: 'The False Economy of Commercial SaaS',
    summary:
      'Evaluating the hidden technical debt, compounding monthly subscription tax, and sovereignty risks of outsourcing core operational databases to multi-tenant commercial clouds.',
    author: 'MIHORA Executive Technology Advisory',
    date: 'AUGUST 2025',
    classification: 'EXECUTIVE ADVISORY',
    metrics: [
      { label: '5-Year TCO Savings', value: '62%', delta: 'Sovereign on-prem vs Public SaaS' },
      { label: 'Data Egress Costs', value: '$0', delta: 'Self-hosted local NVMe storage' },
      { label: 'Vendor Lock-in Risk', value: 'Zero', delta: 'Open-source standard SQL schemas' },
      { label: 'Compliance Audit Time', value: '2 Days', delta: 'Direct physical custody proof' },
    ],
    sections: [
      {
        heading: '1. The Compounding Subscription Tax',
        body: 'What begins as an attractive $50/seat monthly operational expense inevitably compounds into millions of dollars annually as data volumes, API call tiers, and compliance add-ons multiply.',
      },
      {
        heading: '2. Sovereign Data Sovereignty & IP Protection',
        body: 'Storing core enterprise intellectual property and customer transaction graphs on multi-tenant SaaS providers leaves enterprises vulnerable to third-party outages, policy changes, and forced API deprecations.',
      },
    ],
    conclusion:
      'Enterprises that value long-term margin and operational independence build sovereign, self-hosted engineering capabilities rather than renting their primary business logic from third-party landlords.',
  },
  'hardware-fallacy': {
    id: 'ANA-2025-10',
    category: 'HARDWARE & SYSTEMS',
    type: 'ANALYSIS',
    title: 'The Hardware Standardization Fallacy',
    summary:
      'Why abstracting network hardware via virtualization layers often fails in high-throughput industrial edge applications.',
    author: 'MIHORA Silicon & Infrastructure Systems',
    date: 'OCTOBER 2025',
    classification: 'TECHNICAL ARCHITECTURE',
    metrics: [
      { label: 'Throughput Gain', value: '4.8x', delta: 'Direct hardware offload vs vSwitch' },
      { label: 'CPU Overhead Saved', value: '38%', delta: 'SR-IOV kernel bypass' },
      { label: 'Packet Drop at Burst', value: '0.00%', delta: 'Hardware queue depth buffering' },
      { label: 'Thermal Wattage Efficiency', value: '+28%', delta: 'Dedicated ASIC silicon routing' },
    ],
    sections: [
      {
        heading: '1. The Over-Virtualization Trap',
        body: 'The prevailing software trend attempts to virtualize everything into generic software layers. However, at 40Gbps+ edge ingress, software virtual switches consume massive CPU cycles that should be dedicated to core application logic.',
      },
      {
        heading: '2. Purpose-Built Silicon Realism',
        body: 'Hardware acceleration (SmartNICs, SR-IOV, dedicated cryptographic ASICs) executes deterministic packet routing with near-zero CPU penalty, proving that physical hardware choices remain paramount.',
      },
    ],
    conclusion:
      'Software cannot solve hardware deficiencies. High-performance architecture demands purposeful selection of physical silicon paired with lean, non-bloated software drivers.',
  },
};

export default function Insights() {
  const [selectedArticleKey, setSelectedArticleKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const activeArticle = selectedArticleKey ? articles[selectedArticleKey] : null;

  const handleOpenArticle = (key: string) => {
    playUiChime('click');
    setSelectedArticleKey(key);
  };

  const handleCopyCitation = (article: InsightArticle) => {
    playUiChime('success');
    const citation = `MIHORA RESEARCH CITATION:
${article.title} (${article.id})
Published: ${article.date} | ${article.author}
Classification: ${article.classification}
URL: https://mihora.tech/insights/

Summary: ${article.summary}`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handlePrint = () => {
    playUiChime('click');
    window.print();
  };

  return (
    <div className="flex flex-col w-full">
      <SEOHead canonicalPath="/insights" />

      {/* Hero Section */}
      <section className="relative w-full bg-surface-container-lowest overflow-hidden px-4 sm:px-6 lg:px-8 py-14 lg:py-20 border-b border-outline/20">
        <div className="max-w-7xl mx-auto space-y-8">
          <Breadcrumbs items={[{ label: 'Insights & Research' }]} />

          <div className="space-y-3 max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-widest">
                <Terminal size={14} />
                <span>Sovereign Labs &amp; Technical Dispatches</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-headline text-3xl sm:text-5xl text-on-surface font-extrabold tracking-tight leading-tight">
                Engineering Papers &amp; Field Insights
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                Deep-dive architectural specifications, post-mortems, and industrial case studies from our sovereign labs in London and Islamabad. Select any paper below to inspect full research findings.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Featured Paper Hero Card */}
            <div
              onClick={() => handleOpenArticle('featured')}
              className="lg:col-span-7 bg-surface-container-low rounded-2xl overflow-hidden flex flex-col justify-between border border-outline/25 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-outline/15">
                <img
                  src={VISUAL_ASSETS.fiberOpticsHardware}
                  alt="High-density ClearCurve optical fiber raceway telemetry instrumentation"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div data-photo-overlay="true" className="contents">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-6 font-mono text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                    PUB ID: ARCH-2025-09 &middot; Empirical Fiber &amp; Jitter Telemetry
                  </span>
                </div>
              </div>
              <div className="p-7 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap text-xs font-mono">
                    <span className="px-2.5 py-0.5 bg-primary text-white font-semibold rounded-md uppercase tracking-wider">
                      Featured Research
                    </span>
                    <span className="text-secondary font-semibold">· 14 min read</span>
                  </div>
                  <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-extrabold group-hover:text-primary transition-colors leading-snug">
                    Physical Layer Determinism in Distributed Micro-Datacenters
                  </h2>
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    An exhaustive architectural evaluation of how thermal harmonic variances and structured optical cable bending radii degrade packet jitter in real-world high-frequency trading and algorithmic routing systems.
                  </p>
                </div>

                <div className="pt-5 border-t border-outline/15 flex items-center justify-between gap-4 font-mono text-xs">
                <span className="text-on-surface-variant font-semibold">MIHORA R&amp;D Labs · London Hub</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenArticle('featured');
                  }}
                  className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer"
                >
                  <span>Read Dissertation</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
              </div>
            </div>

            {/* Side Highlights */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              <div
                onClick={() => handleOpenArticle('logistics')}
                className="bg-surface-container-low p-6 rounded-2xl space-y-2 hover:bg-surface-container hover:border-primary/40 border border-outline/25 transition-all cursor-pointer group flex-1 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-secondary font-semibold uppercase tracking-wider">
                      Case Study · Logistics
                    </span>
                    <ArrowUpRight size={15} className="text-outline group-hover:text-primary transition-colors" />
                  </div>
                  <h2 className="font-headline text-lg text-on-surface font-bold group-hover:text-primary transition-colors">
                    Sub-Second Barcode Processing on the Edge: 40 Distribution Centers
                  </h2>
                  <p className="text-sm text-on-surface-variant line-clamp-2">
                    How deploying edge compute units reduced API server roundtrips by 92% across a national logistics grid.
                  </p>
                </div>
                <div className="text-xs font-mono text-primary font-semibold pt-2 inline-flex items-center gap-1">
                  <span>Inspect Case Study</span>
                  <ArrowRight size={12} />
                </div>
              </div>

              <div
                onClick={() => handleOpenArticle('cctv')}
                className="bg-surface-container-low p-6 rounded-2xl space-y-2 hover:bg-surface-container hover:border-primary/40 border border-outline/25 transition-all cursor-pointer group flex-1 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-secondary font-semibold uppercase tracking-wider">
                      Case Study · Perimeter Fiber
                    </span>
                    <ArrowUpRight size={15} className="text-outline group-hover:text-primary transition-colors" />
                  </div>
                  <h2 className="font-headline text-lg text-on-surface font-bold group-hover:text-primary transition-colors">
                    Autonomous Surveillance Failover Under Intermittent Power Grids
                  </h2>
                  <p className="text-sm text-on-surface-variant line-clamp-2">
                    Engineering hybrid solar-backed battery enclosures for perimeter sensors in extreme climate terrains.
                  </p>
                </div>
                <div className="text-xs font-mono text-primary font-semibold pt-2 inline-flex items-center gap-1">
                  <span>Inspect Case Study</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Google Search Industry Dispatches & Whitepapers */}
      <LiveIndustryNews />

      {/* Technical Papers Section */}
      <section id="technical-papers" className="w-full bg-surface px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-primary">
              <FileText size={22} />
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                Technical Papers
              </h2>
            </div>
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider hidden sm:inline">
              Peer-Reviewed Architectural Specifications
            </span>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggerItem>
              <div
                onClick={() => handleOpenArticle('zerotrust')}
                className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container hover:border-primary/40 border border-outline/25 transition-all cursor-pointer group space-y-3 h-full flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-primary font-semibold">SPEC: NET-2025-11</span>
                    <span className="text-secondary font-semibold uppercase">Zero-Trust</span>
                  </div>
                  <h3 className="font-headline text-lg text-on-surface font-bold group-hover:text-primary transition-colors">
                    Zero-Trust Network Mesh in Air-Gapped Environments
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Analysis of cryptographic handshakes and ephemeral mutual TLS across physically isolated switch layers without public PKI access.
                  </p>
                </div>
                <div className="pt-3 border-t border-outline/15 flex items-center justify-between text-xs font-mono">
                  <span className="text-on-surface-variant">8 min read</span>
                  <span className="text-primary font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    <span>Read Full Paper</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div
                onClick={() => handleOpenArticle('k8s-state')}
                className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container hover:border-primary/40 border border-outline/25 transition-all cursor-pointer group space-y-3 h-full flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-primary font-semibold">SPEC: SRE-2025-07</span>
                    <span className="text-secondary font-semibold uppercase">Cluster Kernel</span>
                  </div>
                  <h3 className="font-headline text-lg text-on-surface font-bold group-hover:text-primary transition-colors">
                    State Persistence in Stateless K8s Nodes
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Solving distributed cache invalidation during rolling container restarts on edge-deployed worker nodes through POSIX shared memory.
                  </p>
                </div>
                <div className="pt-3 border-t border-outline/15 flex items-center justify-between text-xs font-mono">
                  <span className="text-on-surface-variant">11 min read</span>
                  <span className="text-primary font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    <span>Read Full Paper</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="w-full bg-surface-container-lowest px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-secondary">
              <BookOpen size={22} />
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                Production Case Studies
              </h2>
            </div>
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider hidden sm:inline">
              Field-Verified Enterprise Dispatches
            </span>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggerItem>
              <div
                onClick={() => handleOpenArticle('retail-grid')}
                className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container hover:border-secondary/40 border border-outline/25 transition-all cursor-pointer group space-y-3 h-full flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-secondary font-semibold">CASE-2025-01</span>
                    <span className="text-primary font-semibold uppercase">1,200 Sites</span>
                  </div>
                  <h3 className="font-headline text-lg text-on-surface font-bold group-hover:text-secondary transition-colors">
                    National Retail Inventory Grid
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Deploying 1,200 unified threat management appliances and SD-WAN gateways across a fragmented multi-ISP retail network with sub-second failover.
                  </p>
                </div>
                <div className="pt-3 border-t border-outline/15 flex items-center justify-between text-xs font-mono">
                  <span className="text-on-surface-variant">Completed: June 2025</span>
                  <span className="text-secondary font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    <span>Inspect Deployment</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div
                onClick={() => handleOpenArticle('hospital-5g')}
                className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container hover:border-secondary/40 border border-outline/25 transition-all cursor-pointer group space-y-3 h-full flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-secondary font-semibold">MED-2025-05</span>
                    <span className="text-primary font-semibold uppercase">Private 5G</span>
                  </div>
                  <h3 className="font-headline text-lg text-on-surface font-bold group-hover:text-secondary transition-colors">
                    Hospital Private 5G Core
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Architecting a local private CBRS spectrum cell network to bypass Wi-Fi interference for critical diagnostic carts and mobile imaging units.
                  </p>
                </div>
                <div className="pt-3 border-t border-outline/15 flex items-center justify-between text-xs font-mono">
                  <span className="text-on-surface-variant">Completed: May 2025</span>
                  <span className="text-secondary font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    <span>Inspect Deployment</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* Industrial Analysis Section */}
      <section id="industrial-analysis" className="w-full bg-surface px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-amber-500">
              <Search size={22} />
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                Industrial Analysis
              </h2>
            </div>
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider hidden sm:inline">
              Sovereignty &amp; Hardware Economics
            </span>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggerItem>
              <div
                onClick={() => handleOpenArticle('saas-fallacy')}
                className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container hover:border-amber-500/40 border border-outline/25 transition-all cursor-pointer group space-y-3 h-full flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">ANA-2025-08</span>
                    <span className="text-on-surface-variant font-semibold uppercase">TCO Analysis</span>
                  </div>
                  <h3 className="font-headline text-lg text-on-surface font-bold group-hover:text-amber-500 transition-colors">
                    The False Economy of Commercial SaaS
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Evaluating the hidden technical debt, compounding monthly subscription tax, and sovereignty risks of outsourcing core operational databases to multi-tenant commercial clouds.
                  </p>
                </div>
                <div className="pt-3 border-t border-outline/15 flex items-center justify-between text-xs font-mono">
                  <span className="text-on-surface-variant">Executive Brief</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    <span>Read Analysis</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div
                onClick={() => handleOpenArticle('hardware-fallacy')}
                className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container hover:border-amber-500/40 border border-outline/25 transition-all cursor-pointer group space-y-3 h-full flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">ANA-2025-10</span>
                    <span className="text-on-surface-variant font-semibold uppercase">Silicon Reality</span>
                  </div>
                  <h3 className="font-headline text-lg text-on-surface font-bold group-hover:text-amber-500 transition-colors">
                    Hardware Standardization Fallacy
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Why abstracting network hardware via virtualization layers often fails in high-throughput industrial edge applications.
                  </p>
                </div>
                <div className="pt-3 border-t border-outline/15 flex items-center justify-between text-xs font-mono">
                  <span className="text-on-surface-variant">Executive Brief</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    <span>Read Analysis</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* Enterprise Field Deployments & Case Studies */}
      <CaseStudiesSection />

      {/* Comprehensive Research Article Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl bg-surface-container-lowest border border-outline/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => {
                  playUiChime('click');
                  setSelectedArticleKey(null);
                }}
                className="absolute top-5 right-5 w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors cursor-pointer border border-outline/30 z-10"
                aria-label="Close article modal"
              >
                <X size={18} />
              </button>

              <div className="space-y-2 pr-12 border-b border-outline/20 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-primary/15 text-primary font-semibold">
                    {activeArticle.id}
                  </span>
                  <span className="text-outline">·</span>
                  <span className="text-secondary font-semibold">{activeArticle.category}</span>
                  <span className="text-outline">·</span>
                  <span className="text-on-surface-variant">{activeArticle.date}</span>
                  <span className="text-outline">·</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{activeArticle.classification}</span>
                </div>
                <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight leading-snug">
                  {activeArticle.title}
                </h2>
                <div className="font-mono text-xs text-on-surface-variant flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-primary" />
                  <span>Authorship: {activeArticle.author}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-outline/25 space-y-1.5">
                <div className="font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                  Executive Abstract
                </div>
                <p className="text-sm sm:text-base text-on-surface leading-relaxed font-medium">
                  {activeArticle.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                {activeArticle.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 bg-surface-container rounded-xl border border-outline/25">
                    <div className="text-[11px] text-on-surface-variant uppercase">{m.label}</div>
                    <div className="text-base font-extrabold text-primary mt-0.5">{m.value}</div>
                    <div className="text-[11px] text-secondary font-medium mt-0.5">{m.delta}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                {activeArticle.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h3 className="font-headline text-lg text-on-surface font-bold">
                      {sec.heading}
                    </h3>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}

                {activeArticle.schematic && (
                  <div className="space-y-1.5">
                    <div className="font-mono text-xs text-secondary font-semibold uppercase tracking-wider">
                      System Schematic Topology
                    </div>
                    <pre className="p-4 bg-surface-container-high rounded-xl font-mono text-xs text-on-surface overflow-x-auto border border-outline/25 leading-relaxed">
                      {activeArticle.schematic}
                    </pre>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-surface-container border border-outline/25 space-y-1.5">
                  <div className="font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                    Architectural Conclusion
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed italic">
                    "{activeArticle.conclusion}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-outline/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyCitation(activeArticle)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container hover:bg-surface-container-high border border-outline/30 text-on-surface rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    <span>{copied ? 'Citation Copied' : 'Copy Citation'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container hover:bg-surface-container-high border border-outline/30 text-on-surface rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Printer size={14} />
                    <span>Print / Export</span>
                  </button>
                </div>

                <a
                  href={`mailto:hr@mihora.tech?subject=Inquiry%20Regarding%20Research%20Paper%20${activeArticle.id}%20(${activeArticle.title})&body=Hello%20MIHORA%20R%26D%20Labs,%0A%0AI%20am%20reviewing%20${activeArticle.id}:%20${activeArticle.title}.%0A%0AWe%20would%20like%20to%20consult%20with%20your%20architects%20regarding%20applying%20these%20engineering%20findings.`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 font-mono text-xs uppercase font-semibold text-white rounded-lg transition-all shadow-sm"
                >
                  <Mail size={14} />
                  <span>Consult Authors (hr@mihora.tech)</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
