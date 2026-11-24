import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  Globe,
  ShieldCheck,
  Terminal,
  Server,
  Layers,
  Building2,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { VISUAL_ASSETS } from '../assets/visuals';
import {
  MaskTextReveal,
  Reveal,
  ParallaxFrame,
  SpotlightSurface,
  StaggerGrid,
  StaggerItem,
  AnimatedCounter,
} from '../components/MotionPrimitives';
import { playUiChime } from '../utils/audio';

const CHAPTERS = [
  {
    phase: 'Chapter 01 · The Diagnosis',
    title: 'Eliminating the Boundary Between Cloud Software and Physical Glass',
    summary:
      'Enterprise reliability failures rarely stem from isolated syntax bugs or isolated fiber cuts—they emerge in the accountability void between software agencies that never enter a server aisle and hardware contractors who never inspect kernel telemetry.',
    detail:
      'M. Matti ul Hasnain (Principal Systems Architect) and Omema Iqbal (Operations Director) established MIHORA.TECH around a single engineering doctrine: sovereign custody across every boundary from Layer 1 optical glass up through Layer 9 distributed APIs.',
    link: { label: 'Explore the 9-Layer Stack', path: '/engineering' },
  },
  {
    phase: 'Chapter 02 · Dual-Hub Synchrony',
    title: 'London (UTC+0) & Islamabad (UTC+5) Command Continuity',
    summary:
      'Rather than concentrating single-point-of-failure talent or relying on outsourced night shifts, MIHORA.TECH structured two synchronized primary engineering hubs spanning EMEA and South Asia.',
    detail:
      'London anchors EMEA enterprise delivery, UK-GDPR compliance governance, and IXP carrier peering from 128 City Road. Islamabad anchors core systems engineering R&D, optical calibration labs, and follow-the-sun Site Reliability Operations.',
    link: { label: 'View Live Hub Telemetry', path: '/status' },
  },
  {
    phase: 'Chapter 03 · Empirical Verification',
    title: 'Measured Evidence Over Vendor Assumptions',
    summary:
      'Every infrastructure installation and distributed release ships with empirical proof: bidirectional EXFO OTDR splice traces (<= 0.03 dB), Fluke DSX-8000 copper sweeps, and immutable Infrastructure-as-Code manifests.',
    detail:
      'Clients retain 100% intellectual property over software source repositories, Terraform states, cryptographic root keys, and physical plant documentation—ensuring complete freedom from hyperscale or agency lock-in.',
    link: { label: 'Compare Custody Models', path: '/compare' },
  },
];

const SCHEMA_OUR_STORY = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://mihora.tech/our-story/#about',
  url: 'https://mihora.tech/our-story/',
  name: 'Our Story — The Founding of MIHORA.TECH by M. Matti ul Hasnain & Omema Iqbal',
  description:
    'The engineering thesis, operational origin, and dual-hub command architecture of MIHORA.TECH (Private) Limited.',
  mainEntity: {
    '@id': 'https://mihora.tech/#organization',
  },
};

export default function OurStory() {
  return (
    <div className="flex flex-col w-full">
      <SEOHead
        title="Our Story | Founding Doctrine & Dual-Hub Engineering | MIHORA.TECH"
        description="Discover why M. Matti ul Hasnain and Omema Iqbal co-founded MIHORA.TECH to unify software architecture, physical datacenter infrastructure, and 24/7 operations across London and Islamabad."
        canonicalPath="/our-story"
        schemaData={SCHEMA_OUR_STORY}
      />

      {/* Editorial Opening Split */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                  <Compass size={14} />
                  <span>Founding Thesis · MIHORA.TECH</span>
                </div>
              </Reveal>

              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-[3.35rem] text-on-surface tracking-tight leading-[1.08]">
                  Engineered Because Critical Infrastructure Deserves One Accountable Spine
                </h1>
              </MaskTextReveal>

              <Reveal delay={0.14}>
                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                  Co-founded by{' '}
                  <strong className="text-on-surface font-semibold">M. Matti ul Hasnain</strong> and{' '}
                  <strong className="text-on-surface font-semibold">Omema Iqbal</strong>, MIHORA.TECH
                  eliminates fragmented handoffs by uniting distributed systems engineering, optical
                  datacenter construction, and continuous dual-hub reliability.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-outline/15 text-xs font-mono text-on-surface-variant">
                  <span>UK HUB: LONDON EC2A</span>
                  <span className="text-outline">/</span>
                  <span>PK HUB: ISLAMABAD 44000</span>
                  <span className="text-outline">/</span>
                  <span className="text-primary font-bold">100% CLIENT IP CUSTODY</span>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="left" delay={0.1}>
                <div className="rounded-2xl overflow-hidden border border-outline/25 shadow-xl bg-surface-container-low">
                  <ParallaxFrame offset={20} className="aspect-[16/10]">
                    <img
                      src={VISUAL_ASSETS.londonCommandStudio}
                      alt="MIHORA.TECH London systems architecture command studio"
                      className="w-full h-full object-cover"
                    />
                  </ParallaxFrame>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Command Studios Comparison Visual Band */}
      <section className="w-full bg-surface py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                Synchronized Geography
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Two Sovereign Hubs Operating as One Continuous Watchdesk
              </h2>
            </div>
            <Link
              to="/company/"
              onClick={() => playUiChime('click')}
              className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
            >
              <span>Executive Leadership Profiles</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Reveal>
              <SpotlightSurface className="surface-card rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="aspect-[16/9] overflow-hidden border-b border-outline/15">
                  <img
                    src={VISUAL_ASSETS.londonCommandStudio}
                    alt="London City Road architecture command hub"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between font-mono text-xs text-primary font-bold">
                      <span>UK-LON-01 · UTC+0</span>
                      <span>128 City Road, EC2A 4NE</span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-on-surface">
                      London Engineering Headquarters
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Directs EMEA enterprise delivery, UK-GDPR and ISO 27001 regulatory alignment,
                      financial settlement infrastructure governance, and carrier BGP peering across
                      European IXP ecosystems.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-outline/15 flex items-center justify-between text-xs font-mono text-on-surface-variant">
                    <span>Jurisdiction: United Kingdom</span>
                    <Link to="/security/" className="text-primary font-semibold hover:underline">
                      Security Governance →
                    </Link>
                  </div>
                </div>
              </SpotlightSurface>
            </Reveal>

            <Reveal delay={0.1}>
              <SpotlightSurface className="surface-card rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="aspect-[16/9] overflow-hidden border-b border-outline/15">
                  <img
                    src={VISUAL_ASSETS.islamabadEngineeringHub}
                    alt="Islamabad Blue Area systems engineering and optical calibration studio"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between font-mono text-xs text-primary font-bold">
                      <span>PK-ISB-01 · UTC+5</span>
                      <span>Blue Area, Islamabad 44000</span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-on-surface">
                      Islamabad Systems Architecture &amp; Optical Labs
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Houses core distributed systems engineering, hardware calibration rigs, fusion
                      splicing test benches, and follow-the-sun SRE telemetry handovers across EMEA,
                      GCC, and APAC corridors.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-outline/15 flex items-center justify-between text-xs font-mono text-on-surface-variant">
                    <span>Jurisdiction: Pakistan</span>
                    <Link to="/services/field-engineering/" className="text-primary font-semibold hover:underline">
                      Field Dispatch Rig Spec →
                    </Link>
                  </div>
                </div>
              </SpotlightSurface>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Narrative Chapters */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Architectural Narrative
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              Three Principles Behind Every Engagement
            </h2>
          </div>

          <div className="divide-y divide-outline/20 border-y border-outline/20">
            {CHAPTERS.map((ch) => (
              <Reveal key={ch.phase}>
                <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-4 space-y-1.5">
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                      {ch.phase}
                    </div>
                    <h3 className="font-headline text-xl font-bold text-on-surface leading-snug">
                      {ch.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-8 space-y-3">
                    <p className="text-base text-on-surface font-medium leading-relaxed">
                      {ch.summary}
                    </p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{ch.detail}</p>
                    <div className="pt-1">
                      <Link
                        to={ch.link.path}
                        onClick={() => playUiChime('click')}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        <span>{ch.link.label}</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Verifiable Benchmarks & Next Steps */}
      <section className="w-full bg-surface py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline/20 space-y-1">
                <div className="font-mono text-xs uppercase text-on-surface-variant">
                  Engineering Layers
                </div>
                <div className="font-headline text-3xl font-extrabold text-primary">
                  <AnimatedCounter target={9} suffix=" Layers" />
                </div>
                <div className="text-xs text-on-surface-variant">Single accountable custody chain</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline/20 space-y-1">
                <div className="font-mono text-xs uppercase text-on-surface-variant">
                  Optical Mean Loss
                </div>
                <div className="font-headline text-3xl font-extrabold text-primary tabular-nums">
                  &le; 0.03 dB
                </div>
                <div className="text-xs text-on-surface-variant">Core-alignment fusion certified</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline/20 space-y-1">
                <div className="font-mono text-xs uppercase text-on-surface-variant">
                  Core Quorum SLA
                </div>
                <div className="font-headline text-3xl font-extrabold text-primary">
                  <AnimatedCounter target={99.999} decimals={3} suffix="%" />
                </div>
                <div className="text-xs text-on-surface-variant">Dual-hub operational oversight</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline/20 space-y-1">
                <div className="font-mono text-xs uppercase text-on-surface-variant">
                  Field Emergency SLA
                </div>
                <div className="font-headline text-3xl font-extrabold text-primary">
                  <AnimatedCounter target={4} suffix=" Hours" />
                </div>
                <div className="text-xs text-on-surface-variant">Dispatched break-fix coverage</div>
              </div>
            </StaggerItem>
          </StaggerGrid>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/company/"
              onClick={() => playUiChime('click')}
              className="inline-flex items-center gap-2 px-6 py-3 btn-primary-gradient rounded-lg text-sm font-semibold"
            >
              <Building2 size={16} />
              <span>Meet M. Matti ul Hasnain &amp; Omema Iqbal</span>
            </Link>
            <Link
              to="/tools/"
              onClick={() => playUiChime('click')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container-lowest border border-outline/30 hover:border-primary text-on-surface rounded-lg text-sm font-semibold transition-colors"
            >
              <Layers size={16} className="text-primary" />
              <span>Open Optical &amp; SLA Calculators</span>
            </Link>
            <Link
              to="/contact/"
              onClick={() => playUiChime('click')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container-lowest border border-outline/30 hover:border-primary text-on-surface rounded-lg text-sm font-semibold transition-colors"
            >
              <Globe size={16} className="text-primary" />
              <span>Schedule Architecture Review</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
