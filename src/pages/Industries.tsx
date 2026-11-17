import { Link } from 'react-router-dom';
import {
  Factory, Hospital, Store, GraduationCap, Server, Building, Globe, ArrowRight, CheckCircle2
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VISUAL_ASSETS } from '../assets/visuals';
import { Reveal, StaggerGrid, StaggerItem, MaskTextReveal, SpotlightSurface } from '../components/MotionPrimitives';

const INDUSTRY_SECTORS = [
  {
    id: 'enterprise',
    code: 'Sector 01 · Financial & Enterprise',
    title: 'Banking, Clearing & Enterprise',
    icon: Building,
    compliance: 'FIPS 140-3 · ISO 27001 · Data Localization',
    desc: 'Air-gapped Tier IV datacenter repatriation, hardware HSM signing modules, low-latency RTGS settlement rings, and biometric access governance.',
    highlights: [
      'Sub-2ms synchronous dark fiber database replication',
      'On-premise repatriation removing foreign public-cloud risk',
    ],
    servicePath: '/services/physical-infrastructure',
    serviceLabel: 'Physical Infrastructure',
  },
  {
    id: 'healthcare',
    code: 'Sector 02 · Clinical Infrastructure',
    title: 'Healthcare & Medical Diagnostics',
    icon: Hospital,
    compliance: 'HIPAA · HL7/FHIR · DICOM PACS',
    desc: 'Redundant hospital fiber backbones, zero-latency radiology PACS imaging storage arrays, VLAN-segmented biomedical sensors, and failsafe power routing.',
    highlights: [
      '40G multi-wing optical cores preventing workstation congestion',
      'Isolated clinical device networks separated from guest Wi-Fi',
    ],
    servicePath: '/services/digital-engineering',
    serviceLabel: 'Digital Engineering',
  },
  {
    id: 'logistics',
    code: 'Sector 03 · Supply Chain & Freight',
    title: 'Logistics, Ports & Cold-Chain Fleet',
    icon: Factory,
    compliance: 'NEMA-4X · TIA-568-D · 24/7 Edge Continuity',
    desc: 'High-density warehouse wireless surveys, ruggedized conveyor PLC bridges, solar perimeter camera telemetry, and automated dock dispatch dashboards.',
    highlights: [
      'LTE/5G out-of-band failover during regional ISP outages',
      'Sub-10ms barcode scanning to ERP stock ledger updates',
    ],
    servicePath: '/services/field-engineering',
    serviceLabel: 'Field Engineering',
  },
  {
    id: 'technology',
    code: 'Sector 04 · Cloud & Telecom',
    title: 'Technology Providers & Telecom Carriers',
    icon: Server,
    compliance: 'EVPN-VXLAN · 800G DWDM · SRE',
    desc: 'Coherent optical fiber re-splicing, BGP Anycast edge cores, distributed Go/Rust backend clusters, and follow-the-sun SRE custody.',
    highlights: [
      'Core-alignment fusion splicing <= 0.03 dB mean loss',
      'Multi-region Kubernetes orchestration with OpenTelemetry',
    ],
    servicePath: '/services/managed-sre',
    serviceLabel: '24/7 Managed SRE',
  },
  {
    id: 'retail',
    code: 'Sector 05 · Distributed Commerce',
    title: 'Multi-Site Retail & Flagship Commerce',
    icon: Store,
    compliance: 'PCI-DSS Segmentation · SD-WAN',
    desc: 'Distributed POS resilience across hundreds of retail branches, centralized NVR surveillance archiving, and real-time omnichannel inventory sync.',
    highlights: [
      'Zero-downtime WireGuard branch VPN provisioning',
      'Offline-first local checkout reconciliation queues',
    ],
    servicePath: '/services/automation-intelligence',
    serviceLabel: 'Automation & AI',
  },
  {
    id: 'education',
    code: 'Sector 06 · Universities & Research',
    title: 'Higher Education & Research Campuses',
    icon: GraduationCap,
    compliance: 'High-Density Wi-Fi 6/7 · 100G Optical Backbones',
    desc: 'Campus-wide optical ring topologies, localized research GPU clusters, sovereign student records custody, and automated access governance.',
    highlights: [
      'Multi-building single-mode OS2 conduit trunks',
      'Air-gapped AI compute pools keeping research IP local',
    ],
    servicePath: '/services/physical-infrastructure',
    serviceLabel: 'Physical Infrastructure',
  },
  {
    id: 'hospitality',
    code: 'Sector 07 · Commercial Venues',
    title: 'Hospitality & Smart Commercial Venues',
    icon: Globe,
    compliance: 'NDAA Surveillance · Property PMS Bridges',
    desc: 'Property-wide high-availability networking, keyless access integration, isolated guest captive portals, and centralized operations monitoring.',
    highlights: [
      'Unified multi-property uptime visibility from dual hubs',
      '4-hour regional break-fix field maintenance coverage',
    ],
    servicePath: '/services/managed-sre',
    serviceLabel: '24/7 Managed SRE',
  },
];

export default function Industries() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="w-full obsidian-band obsidian-grid border-b border-white/10 py-14 lg:py-22 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumbs items={[{ label: 'Industries' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Reveal>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                  <Globe size={14} />
                  <span>Mission-Critical Industry Verticals</span>
                </div>
              </Reveal>
              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  Engineered for Regulated, Uptime-Critical Industries
                </h1>
              </MaskTextReveal>
              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  From sovereign financial settlement and national energy grids to automated cold-chain warehouses, MIHORA.TECH adapts hardware containment and distributed software to strict sector rules.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                <img
                  src={VISUAL_ASSETS.fieldEngineeringEdge}
                  alt="Hardened industrial NEMA-4X SCADA and optical edge containment unit"
                  className="w-full h-full object-cover"
                />
                <div data-photo-overlay="true" className="contents">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d18]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[11px]">
                    <span className="text-amber-400 font-bold uppercase">7 Vertical Architectures</span>
                    <span className="text-slate-200">ISO 27001 / FIPS 140-3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-7xl mx-auto">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRY_SECTORS.map((ind) => {
              const Icon = ind.icon;
              return (
                <StaggerItem key={ind.id}>
                  <SpotlightSurface className="h-full rounded-2xl">
                    <article
                      id={ind.id}
                      className="scroll-mt-24 surface-card p-7 rounded-2xl flex flex-col justify-between space-y-6 h-full"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <Icon size={22} />
                          </div>
                          <span className="font-mono text-xs text-gold font-bold">{ind.code}</span>
                        </div>

                        <div className="space-y-1">
                          <h2 className="font-headline text-xl font-bold text-on-surface">{ind.title}</h2>
                          <div className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                            {ind.compliance}
                          </div>
                        </div>

                        <p className="text-sm text-on-surface-variant leading-relaxed">{ind.desc}</p>

                        <div className="space-y-2 pt-2 border-t border-outline/15">
                          {ind.highlights.map((h) => (
                            <div key={h} className="flex items-start gap-2 text-xs text-on-surface">
                              <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-outline/15 flex items-center justify-between text-xs font-semibold">
                        <Link to={ind.servicePath} className="text-primary hover:underline inline-flex items-center gap-1">
                          <span>{ind.serviceLabel}</span>
                          <ArrowRight size={13} />
                        </Link>
                        <Link to="/case-studies" className="text-on-surface-variant hover:text-on-surface">
                          Benchmarks →
                        </Link>
                      </div>
                    </article>
                  </SpotlightSurface>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full bg-surface-container-low py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="font-headline text-2xl font-extrabold text-on-surface">
            Operating in a Specialized or Air-Gapped Environment?
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant">
            Share your compliance mandates and latency constraints with our systems engineering leads.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/solutions#sovereign-rfp-builder"
              className="px-5 py-2.5 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface text-xs font-semibold rounded-lg"
            >
              Configure System BOM
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
            >
              <span>Request Technical Scoping</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
