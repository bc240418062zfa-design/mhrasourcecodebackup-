import { Link } from 'react-router-dom';
import { Scale, Check, Minus, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { MaskTextReveal, Reveal } from '../components/MotionPrimitives';
import { playUiChime } from '../utils/audio';
import { VISUAL_ASSETS } from '../assets/visuals';

const COMPARISON_ROWS = [
  {
    criterion: 'Scope of Accountability',
    mihora: 'Unified Layers 1–9: bare-metal, OS2 optics, software, & 24/7 SRE',
    hyperscale: 'Shared cloud abstractions only; no physical plant or premise custody',
    agency: 'Fragmented app code + outsourced electrical subcontractors',
  },
  {
    criterion: 'Data & Key Sovereignty',
    mihora: '100% client-owned HSM keys, Git repos & Terraform state',
    hyperscale: 'Platform IAM coupling & proprietary PaaS runtime dependencies',
    agency: 'Often retained inside agency-managed vendor accounts',
  },
  {
    criterion: 'Physical Optical Verification',
    mihora: 'Signed bidirectional EXFO OTDR traces (<= 0.03 dB splice target)',
    hyperscale: 'Abstract virtual VPCs; invisible physical transport topology',
    agency: 'No calibrated optical or Fluke copper field instrumentation',
  },
  {
    criterion: 'Bandwidth & Data Egress Economics',
    mihora: 'Predictable flat bare-metal & direct carrier peering rates',
    hyperscale: 'Escalating per-GB egress & cross-AZ transfer surcharges',
    agency: 'Unoptimized third-party SaaS API token overhead',
  },
  {
    criterion: 'Operational Response Structure',
    mihora: 'Synchronized London (UTC+0) & Islamabad (UTC+5) SRE watchdesks',
    hyperscale: 'Tiered ticket queues without dedicated physical dispatch rigs',
    agency: 'Business-hours support; no 4-hour emergency hardware break-fix',
  },
];

export default function Compare() {
  return (
    <div className="flex flex-col w-full">
      <SEOHead
        title="Architecture Comparison: Sovereign Custody vs. Cloud Lock-In | MIHORA.TECH"
        description="Direct technical comparison matrix evaluating MIHORA Full-Span Sovereign Custody against hyperscale public cloud lock-in and fragmented software agencies."
        canonicalPath="/compare"
      />

      <section className="w-full bg-surface-container-lowest py-14 lg:py-20 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                  <Scale size={14} />
                  <span>Decision &amp; Trade-Off Analysis</span>
                </div>
              </Reveal>

              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-4xl sm:text-5xl text-on-surface tracking-tight leading-[1.08]">
                  Sovereign Full-Span Engineering vs. Hyperscale &amp; Fragmented Vendors
                </h1>
              </MaskTextReveal>

              <Reveal delay={0.12}>
                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                  An objective operational comparison for CTOs, infrastructure directors, and regulated
                  institutions deciding how to own critical compute, networking, and software platforms.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-outline/25 shadow-lg">
                <img
                  src={VISUAL_ASSETS.heroDatacenterHall}
                  alt="MIHORA.TECH dedicated bare-metal datacenter hall"
                  className="w-full h-full object-cover"
                />
                <div data-photo-overlay="true" className="contents">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                    Client-Owned Bare Metal &middot; Zero Egress Tax
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Comparison Table */}
      <section className="w-full bg-surface py-14 lg:py-20 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-outline/25 bg-surface-container-lowest shadow-sm">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-outline/20 bg-surface-container-low">
                    <th className="p-5 font-mono text-xs uppercase tracking-wider text-on-surface-variant font-bold w-1/4">
                      Evaluation Dimension
                    </th>
                    <th className="p-5 font-headline text-base font-extrabold text-primary w-1/4 bg-primary/5">
                      MIHORA.TECH Sovereign Model
                    </th>
                    <th className="p-5 font-headline text-sm font-bold text-on-surface w-1/4">
                      Hyperscale Public Cloud
                    </th>
                    <th className="p-5 font-headline text-sm font-bold text-on-surface w-1/4">
                      Conventional Dev Agencies
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline/15 text-sm">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.criterion} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-5 font-semibold text-on-surface align-top">{row.criterion}</td>
                      <td className="p-5 text-on-surface bg-primary/[0.03] align-top">
                        <div className="flex items-start gap-2">
                          <Check size={16} className="text-primary mt-0.5 shrink-0" />
                          <span className="font-medium leading-relaxed">{row.mihora}</span>
                        </div>
                      </td>
                      <td className="p-5 text-on-surface-variant align-top">
                        <div className="flex items-start gap-2">
                          <Minus size={15} className="text-outline mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{row.hyperscale}</span>
                        </div>
                      </td>
                      <td className="p-5 text-on-surface-variant align-top">
                        <div className="flex items-start gap-2">
                          <Minus size={15} className="text-outline mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{row.agency}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* When Hyperscale vs Sovereign fits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <Reveal>
              <div className="surface-card rounded-2xl p-7 space-y-3 h-full">
                <div className="font-mono text-xs font-bold uppercase text-primary">
                  Best Fit · MIHORA Full-Span Custody
                </div>
                <h2 className="font-headline text-xl font-bold text-on-surface">
                  When Predictable Latency, Residency &amp; Physical Control Matter
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Ideal for interbank settlement platforms, industrial utilities requiring SCADA
                  air-gapping, hospitals operating private 5G cores, and high-egress AI or media
                  platforms escaping punitive cloud bandwidth fees.
                </p>
                <Link
                  to="/tools/"
                  onClick={() => playUiChime('click')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline pt-1"
                >
                  <span>Model 5-Year TCO Impact</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="surface-card rounded-2xl p-7 space-y-3 h-full">
                <div className="font-mono text-xs font-bold uppercase text-secondary">
                  Hybrid Interconnects
                </div>
                <h2 className="font-headline text-xl font-bold text-on-surface">
                  Need Hybrid Cloud-to-Premise Bursting?
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  MIHORA also architects redundant BGP Direct Connect and optical cross-connect rings
                  linking on-premise sovereign vaults seamlessly into AWS, GCP, or Azure burst zones
                  without sacrificing primary key custody.
                </p>
                <Link
                  to="/services/digital-engineering/"
                  onClick={() => playUiChime('click')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline pt-1"
                >
                  <span>Inspect Hybrid Cloud Engineering</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
