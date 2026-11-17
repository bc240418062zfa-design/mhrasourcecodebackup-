import { Link } from 'react-router-dom';
import {
  Building, Globe, Users, Target, ShieldCheck, Zap, ArrowRight, MapPin, Shield
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VISUAL_ASSETS } from '../assets/visuals';
import {
  Reveal,
  MaskTextReveal,
  SpotlightSurface,
  Tilt3DFrame,
  StaggerGrid,
  StaggerItem,
  AnimatedCounter,
} from '../components/MotionPrimitives';
import { playUiChime } from '../utils/audio';

export default function Company() {
  return (
    <div className="flex flex-col w-full">
      {/* Obsidian Atelier Hero */}
      <section id="about" className="w-full obsidian-band obsidian-grid border-b border-white/10 py-14 lg:py-22 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-10">
          <Breadcrumbs items={[{ label: 'Company & Founders' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                  <Building size={14} />
                  <span>About MIHORA.TECH (Private) Limited</span>
                </div>
              </Reveal>
              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-[1.08]">
                  One Engineering Organization From Optical Fiber to Cloud Software
                </h1>
              </MaskTextReveal>
              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Operating synchronized command hubs in London (United Kingdom) and Islamabad (Pakistan), MIHORA.TECH was founded on a straightforward premise: critical systems only remain sovereign and reliable when software architecture and physical infrastructure are engineered together.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="pt-2 flex items-center gap-4 border-t border-white/15">
                  <div className="h-12 px-3.5 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center shrink-0">
                    <BrandLogo className="h-7 w-auto aspect-[3/2]" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
                      Founded by M. Matti ul Hasnain &amp; Omema Iqbal
                    </p>
                    <p className="font-mono text-[11px] text-slate-400 mt-0.5">
                      Sovereign Systems Architecture · Global Delivery Operations
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Tilt3DFrame maxTilt={4}>
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl">
                  <img
                    src={VISUAL_ASSETS.sovereignCommandHub}
                    alt="MIHORA.TECH engineering operations studio across London and Islamabad"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </Tilt3DFrame>
            </div>
          </div>

          {/* Razor Hairline Corporate Telemetry Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/15 border border-white/15 bg-black/35 rounded-xl overflow-hidden">
            <div className="p-5 space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Command Hubs</div>
              <div className="font-headline text-2xl sm:text-3xl font-extrabold text-white">LON + ISB</div>
            </div>
            <div className="p-5 space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Architectural Span</div>
              <div className="font-headline text-2xl sm:text-3xl font-extrabold text-white">
                <AnimatedCounter target={9} suffix=" Layers" />
              </div>
            </div>
            <div className="p-5 space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Core Availability</div>
              <div className="font-headline text-2xl sm:text-3xl font-extrabold text-amber-400">
                <AnimatedCounter target={99.999} decimals={3} suffix="%" />
              </div>
            </div>
            <div className="p-5 space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Client IP Custody</div>
              <div className="font-headline text-2xl sm:text-3xl font-extrabold text-emerald-400">
                <AnimatedCounter target={100} suffix="%" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders & Executive Leadership */}
      <section id="leadership" className="w-full bg-surface py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-outline/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-12">
          <Reveal>
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <div className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Founders &amp; Executive Accountability
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
                Founded by M. Matti ul Hasnain &amp; Omema Iqbal
              </h2>
              <p className="text-base text-on-surface-variant">
                MIHORA.TECH was established by <strong className="text-on-surface">M. Matti ul Hasnain</strong> and{' '}
                <strong className="text-on-surface">Omema Iqbal</strong> to combine deep systems engineering with structured international delivery.
              </p>
            </div>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="p-7 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <img
                        src="/founder-matti.jpg"
                        alt="M. Matti ul Hasnain, Co-Founder and Principal Systems Architect of MIHORA.TECH"
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-2xl object-cover border border-outline/25 shrink-0 shadow-md"
                      />
                      <div className="text-right font-mono text-xs">
                        <div className="text-primary font-bold uppercase tracking-wider">Co-Founder · Principal Architect</div>
                        <div className="text-on-surface-variant mt-1">UK &amp; Pakistan Engineering Labs</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-headline text-2xl sm:text-3xl text-on-surface font-extrabold">
                        M. Matti ul Hasnain
                      </h3>
                      <p className="font-mono text-xs text-primary font-semibold mt-1">
                        Systems &amp; Physical Infrastructure Architecture
                      </p>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      <strong className="text-on-surface">M. Matti ul Hasnain</strong> leads MIHORA.TECH&apos;s systems engineering doctrine, sovereign datacenter hardware design, OTDR-verified fiber builds, and low-latency software architecture across the UK, EMEA, and Pakistan.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-outline/15 flex items-center justify-between font-mono text-xs text-on-surface-variant">
                    <span>Sovereign Systems · Datacenter Hardware · Distributed SRE</span>
                    <Link to="/our-story" onClick={() => playUiChime('click')} className="text-primary font-semibold hover:underline shrink-0 ml-2">
                      Origin →
                    </Link>
                  </div>
                </div>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="p-7 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <img
                        src="/founder-omema.jpg"
                        alt="Omema Iqbal, Co-Founder and Operations Director of MIHORA.TECH"
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-2xl object-cover border border-outline/25 shrink-0 shadow-md"
                      />
                      <div className="text-right font-mono text-xs">
                        <div className="text-primary font-bold uppercase tracking-wider">Co-Founder · Operations Director</div>
                        <div className="text-on-surface-variant mt-1">Enterprise Governance &amp; Delivery</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-headline text-2xl sm:text-3xl text-on-surface font-extrabold">
                        Omema Iqbal
                      </h3>
                      <p className="font-mono text-xs text-primary font-semibold mt-1">
                        Enterprise Strategy &amp; Global Operations
                      </p>
                    </div>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      <strong className="text-on-surface">Omema Iqbal</strong> directs MIHORA.TECH&apos;s dual-hub operational governance, multi-jurisdiction SLA alignment, strategic partner coordination, and cross-border engineering workforce logistics.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-outline/15 flex items-center justify-between font-mono text-xs text-on-surface-variant">
                    <span>Global Operations · Dual-Hub Governance · Client Delivery</span>
                    <Link to="/partnerships" onClick={() => playUiChime('click')} className="text-primary font-semibold hover:underline shrink-0 ml-2">
                      Alliances →
                    </Link>
                  </div>
                </div>
              </SpotlightSurface>
            </StaggerItem>
          </StaggerGrid>

          <Reveal>
            <div className="obsidian-band border border-white/10 rounded-2xl p-7 sm:p-8 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-amber-400 shrink-0">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-white">
                    Deterministic Governance &amp; Direct Founder Engagement
                  </h3>
                  <p className="text-sm text-slate-300">
                    Registered private engineering enterprise serving regulated financial, health, energy, and technology organizations.
                  </p>
                </div>
              </div>
              <Link
                to="/contact"
                onClick={() => playUiChime('click')}
                className="px-6 py-3 btn-primary-gradient text-xs font-semibold rounded-lg transition-all shrink-0 inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>Executive Consultation</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="w-full bg-surface-container-low py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-outline/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-10">
          <Reveal>
            <div className="space-y-2 max-w-3xl">
              <div className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Core Engineering Doctrine
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
                Engineering Philosophy
              </h2>
              <p className="text-base text-on-surface-variant">
                We build deterministic systems free of fragile external lock-in—verified mathematically across silicon, fiber, and code.
              </p>
            </div>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <SpotlightSurface className="surface-card p-7 rounded-2xl space-y-3 h-full">
                <Target className="text-primary" size={26} />
                <h3 className="font-headline text-xl text-on-surface font-bold">Precision Over Shortcuts</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Taking the time to model power, thermal margin, and database quorum prevents cascading 3:00 AM production failures.
                </p>
              </SpotlightSurface>
            </StaggerItem>
            <StaggerItem>
              <SpotlightSurface className="surface-card p-7 rounded-2xl space-y-3 h-full">
                <ShieldCheck className="text-primary" size={26} />
                <h3 className="font-headline text-xl text-on-surface font-bold">Zero-Trust by Default</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Every microservice socket, management VLAN, and physical rack cabinet is authenticated and encrypted at the foundation layer.
                </p>
              </SpotlightSurface>
            </StaggerItem>
            <StaggerItem>
              <SpotlightSurface className="surface-card p-7 rounded-2xl space-y-3 h-full">
                <Zap className="text-primary" size={26} />
                <h3 className="font-headline text-xl text-on-surface font-bold">Hardware Accountability</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Software patches ship remotely, but failed optics require on-site discipline. We engineer physical layers with true 2N redundancy.
                </p>
              </SpotlightSurface>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* Dual-Hub Operating Model */}
      <section id="global-operating-model" className="w-full bg-surface py-16 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-10">
          <Reveal>
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <div className="font-mono text-xs text-primary uppercase font-semibold tracking-widest">
                Synchronized Footprint
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
                Global Operating Model
              </h2>
              <p className="text-base text-on-surface-variant">
                Two primary command centers in London and Islamabad coordinate engineering design, continuous monitoring, and global field dispatch.
              </p>
            </div>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <SpotlightSurface className="surface-card p-7 rounded-2xl space-y-3 h-full">
                <div className="flex items-center justify-between font-mono text-xs text-primary font-bold uppercase">
                  <span>UK · EMEA Headquarters</span>
                  <MapPin size={14} />
                </div>
                <h3 className="font-headline text-xl text-on-surface font-bold">London Hub (UTC+0)</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  128 City Road, London EC2A 2NX. Strategic architecture alignment, UK-GDPR compliance governance, and European enterprise delivery.
                </p>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card p-7 rounded-2xl space-y-3 h-full">
                <div className="flex items-center justify-between font-mono text-xs text-primary font-bold uppercase">
                  <span>PK · Systems &amp; R&amp;D Labs</span>
                  <MapPin size={14} />
                </div>
                <h3 className="font-headline text-xl text-on-surface font-bold">Islamabad Hub (UTC+5)</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Blue Area, Islamabad 44000. Core systems R&amp;D, distributed backend engineering, hardware burn-in testing, and 24/7 watchdesk operations.
                </p>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card p-7 rounded-2xl space-y-3 h-full">
                <div className="flex items-center justify-between font-mono text-xs text-primary font-bold uppercase">
                  <span>Global Field Forces</span>
                  <Globe size={14} />
                </div>
                <h3 className="font-headline text-xl text-on-surface font-bold">Worldwide Dispatch</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  BICSI-trained optical splicing engineers and datacenter technicians deploying across EMEA, APAC, and international enterprise sites.
                </p>
              </SpotlightSurface>
            </StaggerItem>
          </StaggerGrid>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link
              to="/our-story"
              className="px-5 py-2.5 bg-surface-container-lowest border border-outline/25 hover:border-primary/50 text-on-surface text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Read Our Founding Story</span>
            </Link>
            <Link
              to="/security"
              className="px-5 py-2.5 bg-surface-container-lowest border border-outline/25 hover:border-primary/50 text-on-surface text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck size={14} className="text-primary" />
              <span>Zero-Trust Security Center</span>
            </Link>
            <Link
              to="/press"
              className="px-5 py-2.5 bg-surface-container-lowest border border-outline/25 hover:border-primary/50 text-on-surface text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Press Kit &amp; Citations</span>
            </Link>
            <Link
              to="/partnerships"
              className="px-5 py-2.5 bg-surface-container-lowest border border-outline/25 hover:border-primary/50 text-on-surface text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors"
            >
              <Globe size={14} className="text-primary" />
              <span>Strategic Partnerships</span>
            </Link>
            <Link
              to="/careers"
              className="px-5 py-2.5 bg-surface-container-lowest border border-outline/25 hover:border-primary/50 text-on-surface text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors"
            >
              <Users size={14} className="text-primary" />
              <span>Open Engineering Careers</span>
            </Link>
            <Link
              to="/how-it-works"
              className="px-5 py-2.5 btn-primary-gradient text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
            >
              <span>How We Deliver</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
