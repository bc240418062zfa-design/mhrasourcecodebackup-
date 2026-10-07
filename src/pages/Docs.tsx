import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, Shield, Cpu, Terminal, Network, 
  Layers, HardDrive, Zap, CheckCircle2, Copy, Check,
  BookOpen, ChevronRight, FileText, Globe
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface Chapter {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  specs?: { label: string; value: string }[];
  codeSnippet?: { title: string; language: string; code: string };
}

const DOC_CHAPTERS: Chapter[] = [
  {
    id: 'overview',
    title: 'MIHORA Sovereign Architecture Overview',
    category: 'Architecture',
    readTime: '4 min',
    summary: 'Executive architecture codex defining the sovereign engineering principles established by co-founders M. Matti ul Hasnain and Omema Iqbal.',
    content: [
      'MIHORA.TECH is an international sovereign systems engineering organization established by M. Matti ul Hasnain (Principal Systems Architect) and Omema Iqbal (Operations Director). The firm operates dual command nodes across London (United Kingdom) and Islamabad (Pakistan) with global physical and digital deployment capabilities.',
      'Unlike conventional software development shops or outsourcers, MIHORA engineers across the complete vertical spectrum—from silicon, optical transceivers, structured server racks, and SCADA automation to distributed microservices, low-latency APIs, and 24/7 autonomous SRE telemetry.',
      'Every system engineered by MIHORA adheres to the Sovereign Computing Axiom: zero unvetted dependencies, verifiable hardware topologies, mathematical SLA guarantees, and strict jurisdictional data sovereignty.'
    ],
    specs: [
      { label: 'Global Founders', value: 'M. Matti ul Hasnain & Omema Iqbal' },
      { label: 'Command Nodes', value: 'London (UK) & Islamabad (PK)' },
      { label: 'Primary Focus', value: 'Physical Datacenter & Digital Systems Engineering' },
      { label: 'Production SLA', value: '99.999% High-Availability Quorum' }
    ],
    codeSnippet: {
      title: 'Global Hub Quorum Protocol Schema',
      language: 'json',
      code: `{
  "system": "MIHORA.TECH",
  "commandNodes": [
    { "id": "LON-01", "region": "UK", "timezone": "UTC+0", "status": "ACTIVE_PRIMARY" },
    { "id": "ISB-01", "region": "PK", "timezone": "UTC+5", "status": "ACTIVE_REDUNDANT" }
  ],
  "latencyTarget": "<25ms inter-hub quorum",
  "governance": "Dual-Stewardship (Hasnain / Iqbal)"
}`
    }
  },
  {
    id: 'nine-layer-stack',
    title: 'The 9-Layer Sovereign Stack',
    category: 'Architecture',
    readTime: '6 min',
    summary: 'Comprehensive breakdown of MIHORA’s full-span architectural layers spanning Layer 0 (Physical Substrate) to Layer 8 (Autonomous Orchestration).',
    content: [
      'Layer 0: Physical Substrate & Power Distribution (3-Phase PDU, N+2 Generator redundant rails, environmental heat management).',
      'Layer 1: Structured Fiber & Copper Cabling (OM4 MPO/MTP multifiber trunks, Cat6A shielded, OTDR laser interferometry testing).',
      'Layer 2: Silicon & Bare-Metal Compute (Enterprise compute nodes, ECC memory, IPMI/iLO out-of-band management).',
      'Layer 3: Network Topologies & Spine-Leaf Fabrics (EVPN-VXLAN, BGP peering, air-gapped management VLANs).',
      'Layer 4: Storage Area Networks & Distributed Storage (NVMe-over-Fabrics, Ceph, ZFS zpools with automated scrubbing).',
      'Layer 5: Sovereign Container & VM Runtime (Bare-metal Kubernetes, microVM isolation, immutable host kernels).',
      'Layer 6: Distributed Microservices & Event Streams (gRPC binary protocols, Kafka clusters, sub-millisecond serialization).',
      'Layer 7: Identity, Cryptography & Sovereign Access (Hardware HSM, mTLS zero-trust tokens, biometric PAM).',
      'Layer 8: Autonomous Orchestration & SRE Telemetry (Real-time telemetry pipelines, anomaly triggers, automated self-healing).'
    ],
    specs: [
      { label: 'Fabric Topology', value: 'Non-blocking Spine-Leaf Clos (400Gbps)' },
      { label: 'Zero-Trust Standard', value: 'mTLS v1.3 with Hardware HSM' },
      { label: 'Verification Protocol', value: 'Fluke Networks Certified OTDR' }
    ]
  },
  {
    id: 'datacenter-hardware',
    title: 'Physical Datacenter & Fiber Infrastructure',
    category: 'Hardware',
    readTime: '5 min',
    summary: 'Standards and methodologies for enterprise server rack deployments, cable dress, and optical splice tolerances.',
    content: [
      'Physical infrastructure is the bedrock of sovereign digital independence. MIHORA field engineering teams execute physical datacenter rack build-outs with millimeter precision.',
      'Optical fiber splicing standards require core-alignment fusion with insertion loss strictly ≤ 0.05 dB per splice. Every fiber run is verified via dual-wavelength optical time-domain reflectometry (OTDR 850nm/1300nm multi-mode and 1310nm/1550nm single-mode).',
      'Structured copper cabling utilizes Cat6A STP shielded solid copper certified to 500 MHz, terminated to TIA-568-B specifications with continuous shield bond verification.'
    ],
    codeSnippet: {
      title: 'Fiber Splice Loss Tolerance Matrix',
      language: 'yaml',
      code: `standards:
  single_mode_9_125:
    max_attenuation_1310nm: 0.35 dB/km
    max_attenuation_1550nm: 0.22 dB/km
    max_splice_loss: 0.05 dB
    min_return_loss: 55.0 dB
  multimode_om4:
    max_attenuation_850nm: 2.8 dB/km
    max_splice_loss: 0.10 dB`
    }
  },
  {
    id: 'dual-command-telemetry',
    title: 'Dual Command Hub Synchronous Telemetry',
    category: 'Operations',
    readTime: '4 min',
    summary: 'Detailed mechanics of the London (UK) and Islamabad (Pakistan) command telemetry loop and follow-the-sun SRE operations.',
    content: [
      'MIHORA.TECH maintains continuous operational resilience via two synchronized command hubs located in London (United Kingdom) and Islamabad (Pakistan).',
      'The hubs operate on an asynchronous dual-write quorum model. Telemetry heartbeats from customer infrastructures are collected simultaneously at both nodes via encrypted UDP/gRPC streaming.',
      'If either node experiences regional internet exchange disruption, the alternate node assumes primary active dispatch within 120 milliseconds with zero dropped state.'
    ],
    specs: [
      { label: 'Failover Window', value: '< 120 milliseconds' },
      { label: 'Telemetry Stream', value: 'gRPC over TLS 1.3' },
      { label: 'Heartbeat Frequency', value: '500ms intervals' }
    ]
  },
  {
    id: 'scada-automation',
    title: 'Industrial Automation & SCADA Edge Bridges',
    category: 'Automation',
    readTime: '5 min',
    summary: 'Field-proven edge architectures connecting industrial PLC hardware, sensors, and Modbus/CAN networks to secure telemetry backends.',
    content: [
      'In critical industrial environments (energy distribution, manufacturing, building automation), legacy PLC controllers cannot be exposed to the public internet.',
      'MIHORA deploys ruggedized edge gateways with dual air-gapped network interfaces. The southbound interface communicates via RS-485, Modbus TCP, OPC-UA, or CAN bus.',
      'The northbound interface transmits one-way cryptographically signed telemetry over optical isolation diodes to the cloud control plane, eliminating attack vectors.'
    ],
    codeSnippet: {
      title: 'Modbus TCP Telemetry Poller Configuration',
      language: 'json',
      code: `{
  "edgeNode": "MIHORA-EDGE-IND-04",
  "southbound": {
    "protocol": "MODBUS_TCP",
    "port": 502,
    "pollIntervalMs": 1000,
    "registers": [
      { "addr": 40001, "name": "generator_phase1_voltage", "unit": "V" },
      { "addr": 40002, "name": "chiller_exhaust_temp", "unit": "C" }
    ]
  },
  "northbound": {
    "encryption": "AES-256-GCM",
    "tunnel": "WireGuard Airgap Diode"
  }
}`
    }
  },
  {
    id: 'governance-sovereignty',
    title: 'Data Sovereignty, Compliance & Governance',
    category: 'Governance',
    readTime: '4 min',
    summary: 'Legal policies, SOC 2 Type II, ISO 27001 compliance standards, and sovereign data boundary enforcement.',
    content: [
      'Data sovereignty dictates that digital data is subject to the laws and governance structures of the nation in which it is collected and processed.',
      'MIHORA engineers architectures where encryption keys remain strictly under sovereign client control via dedicated Hardware Security Modules (HSMs). Neither cloud vendors nor intermediate proxies hold custody of decryption certificates.',
      'All personnel are vetted under strict non-disclosure and security clearance protocols managed directly by Operations Director Omema Iqbal.'
    ],
    specs: [
      { label: 'Compliance Standards', value: 'ISO 27001, SOC 2 Type II, GDPR, HIPAA' },
      { label: 'Key Custody', value: 'Zero-Knowledge Client HSM' },
      { label: 'Executive Governance', value: 'Omema Iqbal (Operations Director)' }
    ]
  }
];

export default function Docs() {
  const [activeChapterId, setActiveChapterId] = useState<string>('overview');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const activeChapter = DOC_CHAPTERS.find(c => c.id === activeChapterId) || DOC_CHAPTERS[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full pt-28 pb-20 bg-surface">
      <SEOHead 
        title="Technical Documentation & Systems Architecture Codex | MIHORA.TECH"
        description="Official technical documentation, 9-layer engineering specifications, fiber splicing standards, SCADA bridges, and dual-hub telemetry protocols of MIHORA.TECH."
        keywords="MIHORA documentation, systems architecture codex, 9-layer stack, datacenter standards, fiber optic splicing, SRE telemetry, M. Matti ul Hasnain, Omema Iqbal"
        canonicalPath="/docs"
      />

      {/* Hero Banner */}
      <div className="w-full border-b border-outline/20 bg-surface-container-lowest/60 py-12">
        <div className="w-full px-margin-mobile lg:px-margin max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-wider uppercase font-semibold">
            <Terminal size={14} />
            <span>MIHORA.TECH SYSTEMS SPECIFICATION // CODEX 2025</span>
          </div>
          <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
            Systems Architecture &amp; Engineering Codex
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-3xl leading-relaxed text-base sm:text-lg">
            Authoritative technical documentation covering physical datacenter build-outs, fiber optics standards, synchronous dual-hub telemetry between London and Islamabad, and sovereign distributed architectures.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-on-surface-variant">
            <span className="px-2.5 py-1 bg-surface-container rounded border border-outline/30 font-bold text-secondary">
              CO-FOUNDERS: M. Matti ul Hasnain &amp; Omema Iqbal
            </span>
            <span className="px-2.5 py-1 bg-surface-container rounded border border-outline/30">
              HUB NODES: LON (UK) &amp; ISB (PK)
            </span>
            <span className="px-2.5 py-1 bg-primary/10 text-primary font-bold rounded border border-primary/30">
              STATUS: PRODUCTION VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* Main Documentation Body */}
      <div className="w-full px-margin-mobile lg:px-margin max-w-7xl mx-auto pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Chapter Navigation Sidebar */}
          <aside className="lg:col-span-4 bg-surface-container-lowest border border-outline/20 rounded-2xl p-5 shadow-sm sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-outline/15 mb-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-on-surface">
                <BookOpen size={14} className="text-primary" />
                <span>Documentation Codex</span>
              </div>
              <span className="text-[11px] font-mono text-on-surface-variant">
                {DOC_CHAPTERS.length} CHAPTERS
              </span>
            </div>

            <nav className="space-y-1.5" aria-label="Documentation chapters">
              {DOC_CHAPTERS.map((chapter) => {
                const isActive = chapter.id === activeChapter.id;
                return (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveChapterId(chapter.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-primary text-surface font-semibold shadow-sm' 
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/70'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider opacity-80">
                        {chapter.category}
                      </div>
                      <div className="truncate font-medium">{chapter.title}</div>
                    </div>
                    <ChevronRight size={14} className={`shrink-0 transition-transform ${isActive ? 'translate-x-0.5' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-5 border-t border-outline/15 space-y-3">
              <div className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider font-bold">
                Direct Engineering Dispatch
              </div>
              <p className="text-xs text-on-surface-variant">
                Need bespoke hardware specs, datacenter build-outs, or sovereign RFPs?
              </p>
              <Link 
                to="/contact" 
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-surface-container hover:bg-surface-container-high border border-outline/30 rounded-lg text-xs font-semibold text-primary transition-all"
              >
                <span>Request Architectural Consultation</span>
                <ChevronRight size={12} />
              </Link>
            </div>
          </aside>

          {/* Active Chapter Content Viewer */}
          <main className="lg:col-span-8 bg-surface-container-lowest border border-outline/20 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
            
            {/* Chapter Header */}
            <div className="space-y-3 pb-6 border-b border-outline/15">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-secondary uppercase font-bold">{activeChapter.category}</span>
                <span className="text-outline/60">•</span>
                <span className="text-on-surface-variant">{activeChapter.readTime} read</span>
              </div>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-extrabold text-on-surface">
                {activeChapter.title}
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-sm sm:text-base">
                {activeChapter.summary}
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-on-surface font-body-md leading-relaxed text-sm sm:text-base">
              {activeChapter.content.map((paragraph, index) => (
                <p key={index} className="text-on-surface-variant">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Hardware / Architectural Specs Box */}
            {activeChapter.specs && (
              <div className="p-5 bg-surface-container rounded-xl border border-outline/20 space-y-3">
                <div className="font-mono text-xs uppercase font-bold text-primary tracking-wider flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  <span>Verified Architectural Parameters</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {activeChapter.specs.map((spec, i) => (
                    <div key={i} className="p-3 bg-surface-container-lowest rounded-lg border border-outline/15 space-y-1">
                      <div className="text-[11px] font-mono text-on-surface-variant uppercase">{spec.label}</div>
                      <div className="text-xs sm:text-sm font-semibold text-on-surface">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code / Configuration Snippet */}
            {activeChapter.codeSnippet && (
              <div className="rounded-xl border border-outline/30 overflow-hidden bg-[#090d16] text-slate-200">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1422] border-b border-slate-800 text-xs font-mono">
                  <span className="text-slate-400 font-semibold">{activeChapter.codeSnippet.title}</span>
                  <button
                    onClick={() => handleCopyCode(activeChapter.codeSnippet!.code)}
                    className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] transition-all cursor-pointer"
                    title="Copy code"
                  >
                    {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-emerald-400">
                  <code>{activeChapter.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Footer Stewardship Note */}
            <div className="pt-6 border-t border-outline/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-on-surface-variant">
              <div>
                <span>ARCHITECTURAL AUTHORITY: </span>
                <strong className="text-on-surface">M. Matti ul Hasnain &amp; Omema Iqbal</strong>
              </div>
              <div className="flex items-center gap-2">
                <Link to="/faq" className="text-secondary hover:underline flex items-center gap-1">
                  <span>View Entity FAQ</span>
                  <ChevronRight size={12} />
                </Link>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
