import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Layers, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { Reveal, StaggerGrid, StaggerItem, AnimatedCounter } from '../components/MotionPrimitives';
import { VISUAL_ASSETS } from '../assets/visuals';

const ADDITIONAL_DEPLOYMENTS = [
  {
    sector: 'Healthcare & Clinical Diagnostics',
    title: 'Multi-Hospital HL7/FHIR & PACS DICOM Zero-Latency Imaging Mesh',
    summary:
      'Constructed redundant 40G campus optical cores connecting radiology workstations directly to localized SAN storage pools with hardware encryption.',
    outcomes: [
      'DICOM CT/MRI retrieval latency reduced under 45ms across 6 hospital wings',
      'Biometric badge & isolated VLAN segmentation aligned with clinical audit standards',
      'Zero unscheduled imaging downtime during live wing expansion',
    ],
    serviceLink: '/services/digital-engineering',
    serviceLabel: 'Digital Systems Division',
  },
  {
    sector: 'Automated Logistics & Cold Chain',
    title: 'NEMA-4X Edge Warehouse Telemetry & Private Wireless Switching',
    summary:
      'Commissioned harsh-environment optical switching cabinets, automated barcode conveyor PLCs, and solar-backed perimeter CCTV telemetry across regional distribution hubs.',
    outcomes: [
      'Sub-10ms barcode-to-ERP inventory state synchronization under peak dispatch load',
      'Full 500 MHz Cat6A STP & OS2 fiber certification across loading bays',
      'Out-of-band LTE failover preserving customs manifest continuity during ISP cuts',
    ],
    serviceLink: '/services/field-engineering',
    serviceLabel: 'Field Engineering Division',
  },
];

export default function CaseStudies() {
  return (
    <div className="flex flex-col w-full">
      <SEOHead canonicalPath="/case-studies" />

      {/* Header */}
      <section className="w-full bg-surface-container-lowest border-b border-outline/20 py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Breadcrumbs items={[{ label: 'Case Studies' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Reveal>
                <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                  Verified Field Deployments
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-on-surface tracking-tight leading-tight">
                  Production Case Studies &amp; Quantitative Infrastructure Benchmarks
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                  Review real-world execution architectures across sovereign banking RTGS repatriation, 1,400 km 800G DWDM optical re-splicing, defense SCADA air-gapping, and clinical healthcare networks.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="left">
                <div className="rounded-2xl overflow-hidden border border-outline/25 bg-surface-container-low shadow-lg">
                  <img
                    src={VISUAL_ASSETS.heroDatacenterHall}
                    alt="Sovereign server corridor engineered for zero-downtime financial and telecom workloads"
                    className="w-full aspect-[16/10] object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Empirical Summary Numbers */}
          <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <StaggerItem>
              <div className="p-5 rounded-xl bg-surface-container-low border border-outline/20 space-y-1">
                <div className="text-xs font-mono uppercase text-on-surface-variant">Production Racks</div>
                <div className="font-headline text-2xl sm:text-3xl font-extrabold text-primary">
                  <AnimatedCounter target={1200} suffix="+" />
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-5 rounded-xl bg-surface-container-low border border-outline/20 space-y-1">
                <div className="text-xs font-mono uppercase text-on-surface-variant">Certified Fiber</div>
                <div className="font-headline text-2xl sm:text-3xl font-extrabold text-primary">
                  <AnimatedCounter target={250000} suffix="+ m" />
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-5 rounded-xl bg-surface-container-low border border-outline/20 space-y-1">
                <div className="text-xs font-mono uppercase text-on-surface-variant">Mean Splice Loss</div>
                <div className="font-headline text-2xl sm:text-3xl font-extrabold text-primary tabular-nums">
                  &le; 0.03 dB
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-5 rounded-xl bg-surface-container-low border border-outline/20 space-y-1">
                <div className="text-xs font-mono uppercase text-on-surface-variant">Quorum Uptime</div>
                <div className="font-headline text-2xl sm:text-3xl font-extrabold text-primary">
                  <AnimatedCounter target={99.999} decimals={3} suffix="%" />
                </div>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* Primary Interactive Case Studies Breakdown */}
      <CaseStudiesSection />

      {/* Additional Vertical Deployments */}
      <section className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-7xl mx-auto space-y-8">
          <Reveal>
            <div className="space-y-2 max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Regulated Verticals
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
                Healthcare &amp; Cold-Chain Edge Deployments
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ADDITIONAL_DEPLOYMENTS.map((dep) => (
              <div
                key={dep.title}
                className="p-7 rounded-2xl bg-surface-container-lowest border border-outline/25 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                    {dep.sector}
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">{dep.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{dep.summary}</p>
                  <div className="space-y-2 pt-2">
                    {dep.outcomes.map((o) => (
                      <div key={o} className="flex items-start gap-2.5 text-sm text-on-surface">
                        <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-outline/15 flex items-center justify-between">
                  <Link
                    to={dep.serviceLink}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>Explore {dep.serviceLabel}</span>
                    <ArrowRight size={13} />
                  </Link>
                  <Link to="/industries" className="text-xs text-on-surface-variant hover:text-on-surface">
                    Industry specs →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="w-full bg-surface-container-low py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto p-8 sm:p-10 rounded-2xl bg-surface-container-lowest border border-outline/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              <ShieldCheck size={14} />
              <span>Architecture Review</span>
            </div>
            <h2 className="font-headline text-2xl font-extrabold text-on-surface">
              Planning a Repatriation, Fiber Build, or Zero-Downtime Upgrade?
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Engage M. Matti ul Hasnain, Omema Iqbal, and our principal engineering desk to review topology constraints and target SLAs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/solutions#sovereign-rfp-builder"
              className="px-5 py-2.5 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
            >
              <Layers size={14} />
              <span>RFP Builder</span>
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
            >
              <span>Schedule Consultation</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
