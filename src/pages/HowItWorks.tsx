import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Compass, Layers, Cpu, ShieldCheck, Activity, ArrowRight, CheckCircle2, FileCode2
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { Reveal, StaggerGrid, StaggerItem } from '../components/MotionPrimitives';
import { VISUAL_ASSETS } from '../assets/visuals';
import { playUiChime } from '../utils/audio';

interface DeliveryPhase {
  step: string;
  title: string;
  duration: string;
  summary: string;
  deliverables: string[];
  verificationGate: string;
  icon: typeof Compass;
}

const PHASES: DeliveryPhase[] = [
  {
    step: '01',
    title: 'Telemetry Discovery & Threat Modeling',
    duration: 'Week 1–2',
    summary:
      'Before procuring racks or writing production services, our engineers audit physical pathways, peak transaction bursts, power/cooling limits, and jurisdictional sovereignty mandates.',
    deliverables: [
      'Complete bottleneck audit spanning Layer 1 optics through Layer 9 API traces',
      'STRIDE & physical-perimeter threat modeling across all site boundaries',
      'Baseline OTDR & Fluke copper pre-assessment for existing cabling plants',
    ],
    verificationGate: 'Signed Architecture Risk & Capacity Baseline',
    icon: Compass,
  },
  {
    step: '02',
    title: 'Nine-Layer Sovereign Blueprinting',
    duration: 'Week 2–3',
    summary:
      'We compile an exhaustive hardware and software Bill of Materials (BOM), network VLAN/EVPN-VXLAN topology maps, and reproducible Infrastructure-as-Code manifests.',
    deliverables: [
      'Full 42U/48U rack elevation drawings and 3-phase PDU load balancing tables',
      'PostgreSQL/Kafka consensus design, schema contracts, and failover RTO/RPO math',
      'Zero vendor lock-in specification with fixed hardware and labor budgeting',
    ],
    verificationGate: 'Approved Blueprint & Fixed Delivery Schedule',
    icon: Layers,
  },
  {
    step: '03',
    title: 'Hardware & Software Fabrication',
    duration: 'Week 3–8',
    summary:
      'Physical cabinets, switches, HSMs, and servers are burned-in and pre-provisioned in parallel while distributed backend microservices and SCADA bridges pass staging chaos tests.',
    deliverables: [
      '72-hour continuous thermal & memory burn-in on every production server node',
      'On-site single-mode OS2 fiber fusion splicing and TIA-568-D Cat6A dressing',
      'Deterministic CI/CD release artifacts with automated vulnerability attestation',
    ],
    verificationGate: '100% Bidirectional OTDR & Staging Load Pass',
    icon: Cpu,
  },
  {
    step: '04',
    title: 'Zero-Downtime Cutover & Certification',
    duration: 'Week 8–10',
    summary:
      'Production traffic shifts onto the new stack via shadowed replication and canary routing, verified against live Fluke trace signatures and automated rollback checkpoints.',
    deliverables: [
      'Shadow-traffic verification matching legacy responses down to byte checksums',
      'Signed Fluke DSX-8000 and EXFO OTDR optical loss dossier (<= 0.03–0.05 dB)',
      'Clean Git repository, runbooks, and full client intellectual property handover',
    ],
    verificationGate: 'Zero-Interruption Production Acceptance',
    icon: ShieldCheck,
  },
  {
    step: '05',
    title: '24/7 Dual-Hub SRE Operations',
    duration: 'Ongoing SLA',
    summary:
      'Following cutover, MIHORA’s synchronized London (UTC+0) and Islamabad (UTC+5) watchdesks assume optional 24/7 observability, automated patching, and 4-hour emergency field dispatch.',
    deliverables: [
      'Sub-15-minute Tier-3 P1 engineer response without scripted Layer-1 deflection',
      'Unified environmental PDU, optical attenuation, and microservice alerting',
      'Quarterly disaster-recovery failover rehearsals and capacity forecasting',
    ],
    verificationGate: '99.999% Continuous Availability Objective',
    icon: Activity,
  },
];

export default function HowItWorks() {
  const [activePhase, setActivePhase] = useState(0);
  const current = PHASES[activePhase];
  const PhaseIcon = current.icon;

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How MIHORA.TECH Delivers Sovereign Digital & Physical Infrastructure',
    description:
      'A 5-phase engineering methodology from telemetry discovery and nine-layer blueprinting through hardware certification, zero-downtime cutover, and 24/7 dual-hub SRE.',
    step: PHASES.map((p, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: p.title,
      text: p.summary,
    })),
  };

  return (
    <div className="flex flex-col w-full">
      <SEOHead canonicalPath="/how-it-works" schemaData={howToSchema} />

      {/* Header */}
      <section className="w-full bg-surface-container-lowest border-b border-outline/20 py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumbs items={[{ label: 'How It Works' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Reveal>
                <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                  Sovereign Delivery Methodology
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-on-surface tracking-tight leading-tight">
                  How MIHORA.TECH Engineers &amp; Ships Without Fragile Handoffs
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                  Traditional IT projects fail at the boundary between cabling contractors, cloud integrators, and support vendors. Our 5-phase methodology unifies physical optics, bare-metal servers, software platforms, and 24/7 operations inside a single engineering chain.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to="/solutions#sovereign-rfp-builder"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg text-sm transition-all cursor-pointer"
                  >
                    <span>Generate Architecture BOM</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface font-semibold rounded-lg text-sm transition-all cursor-pointer"
                  >
                    <span>Review Completed Missions</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="left">
                <div className="rounded-2xl overflow-hidden border border-outline/25 bg-surface-container-low shadow-lg">
                  <img
                    src={VISUAL_ASSETS.fiberOpticsHardware}
                    alt="Certified fiber optic switches and structured cabling installed during phase three of MIHORA delivery"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 5-Phase Stepper */}
      <section className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Interactive Phase Explorer
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Five Verified Gates From Discovery to Continuous Custody
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Phase Selector List */}
            <div className="lg:col-span-5 space-y-2.5">
              {PHASES.map((phase, idx) => {
                const selected = idx === activePhase;
                return (
                  <button
                    key={phase.step}
                    type="button"
                    onClick={() => {
                      playUiChime('click');
                      setActivePhase(idx);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all relative cursor-pointer ${
                      selected
                        ? 'bg-surface-container-lowest border-primary shadow-md'
                        : 'bg-surface-container-low/60 border-outline/20 hover:border-outline/40'
                    }`}
                  >
                    {selected && (
                      <motion.div
                        layoutId="how-it-works-indicator"
                        className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <div className="flex items-center justify-between pl-2">
                      <div className="space-y-0.5">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                          Phase {phase.step} · {phase.duration}
                        </div>
                        <div className="font-headline font-bold text-base text-on-surface">
                          {phase.title}
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className={selected ? 'text-primary shrink-0' : 'text-outline/50 shrink-0'}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Phase Details */}
            <div className="lg:col-span-7">
              <div className="p-7 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline/25 shadow-sm space-y-6">
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-outline/15">
                  <div className="space-y-1">
                    <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                      Phase {current.step} Specification · {current.duration}
                    </div>
                    <h3 className="font-headline text-2xl font-extrabold text-on-surface">
                      {current.title}
                    </h3>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    <PhaseIcon size={24} />
                  </div>
                </div>

                <p className="text-base text-on-surface-variant leading-relaxed">{current.summary}</p>

                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
                    Concrete Deliverables
                  </div>
                  <div className="space-y-2.5">
                    {current.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm text-on-surface">
                        <CheckCircle2 size={17} className="text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-outline/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
                      Sign-Off Gate
                    </div>
                    <div className="text-sm font-bold text-on-surface">{current.verificationGate}</div>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-all cursor-pointer shrink-0"
                  >
                    <span>Initiate Phase 01 Audit</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sovereign Methodology Matters */}
      <section className="w-full bg-surface-container-low py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Reveal>
            <div className="space-y-2 max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Architectural Guarantees
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
                Built Into Every Contract by Default
              </h2>
            </div>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/20 space-y-3 h-full">
                <FileCode2 size={22} className="text-primary" />
                <h3 className="font-headline text-lg font-bold text-on-surface">Full Source &amp; IaC Custody</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Every Terraform module, network config, and microservice repository transfers directly to your organization upon sign-off.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/20 space-y-3 h-full">
                <ShieldCheck size={22} className="text-primary" />
                <h3 className="font-headline text-lg font-bold text-on-surface">Quantitative Certification</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  We never mark a cabling span or service complete without signed OTDR dB trace files and load-tested P99 tail telemetry.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/20 space-y-3 h-full">
                <Activity size={22} className="text-primary" />
                <h3 className="font-headline text-lg font-bold text-on-surface">London + Islamabad Continuity</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Two independent engineering timezones collaborate directly on complex transitions so deployments proceed smoothly around the clock.
                </p>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>
    </div>
  );
}
