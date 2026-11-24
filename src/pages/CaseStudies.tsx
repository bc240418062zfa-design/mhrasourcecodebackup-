import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Layers, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { Reveal, AnimatedCounter, MaskTextReveal, Tilt3DFrame } from '../components/MotionPrimitives';
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
      <section className="w-full obsidian-band obsidian-grid border-b border-white/10 py-14 lg:py-22 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <Breadcrumbs items={[{ label: 'Case Studies' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Reveal>
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
                  Verified Field Deployments
                </div>
              </Reveal>
              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  Production Case Studies &amp; Quantitative Infrastructure Benchmarks
                </h1>
              </MaskTextReveal>
              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Review real-world execution architectures across sovereign banking RTGS repatriation, 1,400 km 800G DWDM optical re-splicing, defense SCADA air-gapping, and clinical healthcare networks.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Tilt3DFrame maxTilt={4}>
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl">
                  <img
                    src={VISUAL_ASSETS.heroDatacenterHall}
                    alt="Sovereign server corridor engineered for zero-downtime financial and telecom workloads"
                    className="w-full aspect-[16/10] object-cover"
                  />
                </div>
              </Tilt3DFrame>
            </div>
          </div>

          {/* Empirical Summary Hairline Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/15 border border-white/15 bg-black/35 rounded-xl overflow-hidden">
            <div className="p-5 space-y-1">
              <div className="text-xs font-mono uppercase text-slate-400">Production Racks</div>
              <div className="font-headline text-2xl sm:text-3xl font-extrabold text-white">
                <AnimatedCounter target={1200} suffix="+" />
              </div>
            </div>
            <div className="p-5 space-y-1">
              <div className="text-xs font-mono uppercase text-slate-400">Certified Fiber</div>
              <div className="font-headline text-2xl sm:text-3xl font-extrabold text-white">
                <AnimatedCounter target={250000} suffix="+ m" />
              </div>
            </div>
            <div className="p-5 space-y-1">
              <div className="text-xs font-mono uppercase text-slate-400">Mean Splice Loss</div>
              <div className="font-headline text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums">
                &le; 0.03 dB
              </div>
            </div>
            <div className="p-5 space-y-1">
              <div className="text-xs font-mono uppercase text-slate-400">Quorum Uptime</div>
              <div className="font-headline text-2xl sm:text-3xl font-extrabold text-emerald-400">
                <AnimatedCounter target={99.999} decimals={3} suffix="%" />
              </div>
            </div>
          </div>
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
                  <Link to="/industries/" className="text-xs text-on-surface-variant hover:text-on-surface">
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
        <div className="max-w-5xl mx-auto p-8 sm:p-10 rounded-2xl obsidian-band obsidian-grid border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
              <ShieldCheck size={14} />
              <span>Architecture Review</span>
            </div>
            <h2 className="font-headline text-2xl font-extrabold text-white">
              Planning a Repatriation, Fiber Build, or Zero-Downtime Upgrade?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Engage M. Matti ul Hasnain, Omema Iqbal, and our principal engineering desk to review topology constraints and target SLAs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/solutions/#sovereign-rfp-builder"
              className="px-5 py-2.5 bg-white/[0.06] border border-white/20 hover:bg-white/[0.12] text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
            >
              <Layers size={14} />
              <span>RFP Builder</span>
            </Link>
            <Link
              to="/contact/"
              className="px-5 py-2.5 btn-primary-gradient text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
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
