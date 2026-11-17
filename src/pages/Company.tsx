import { Link } from 'react-router-dom';
import {
  Building, Globe, Users, Target, ShieldCheck, Zap, Award, ArrowRight
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VISUAL_ASSETS } from '../assets/visuals';
import { Reveal, StaggerGrid, StaggerItem } from '../components/MotionPrimitives';

export default function Company() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section id="about" className="w-full bg-surface-container-lowest border-b border-outline/20 py-14 lg:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-8">
          <Breadcrumbs items={[{ label: 'Company & Founders' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Reveal>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                  <Building size={14} />
                  <span>About MIHORA.TECH (Private) Limited</span>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-on-surface tracking-tight leading-tight">
                  One Engineering Organization From Optical Fiber to Cloud Software
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                  Operating synchronized command hubs in London (United Kingdom) and Islamabad (Pakistan), MIHORA.TECH was founded on a straightforward premise: critical systems only remain sovereign and reliable when software architecture and physical infrastructure are engineered together.
                </p>
              </Reveal>
              <div className="pt-1 flex items-center gap-3">
                <div className="h-11 px-3 rounded-lg bg-surface-container border border-outline/25 flex items-center justify-center">
                  <BrandLogo className="h-6 w-auto aspect-[368/236]" />
                </div>
                <div>
                  <p className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                    Founded by M. Matti ul Hasnain &amp; Omema Iqbal
                  </p>
                  <p className="font-mono text-[11px] text-on-surface-variant">
                    Sovereign Systems Architecture · Global Delivery Operations
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="left">
                <div className="rounded-2xl overflow-hidden border border-outline/25 bg-surface-container-low shadow-lg">
                  <img
                    src={VISUAL_ASSETS.sovereignCommandHub}
                    alt="MIHORA.TECH engineering operations studio across London and Islamabad"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Founders & Executive Leadership */}
      <section id="leadership" className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-10">
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

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <StaggerItem>
              <div className="bg-surface-container-lowest p-7 rounded-2xl border border-outline/25 space-y-5 h-full">
                <div className="flex items-center justify-between gap-4">
                  <img
                    src="/founder-matti.jpg"
                    alt="M. Matti ul Hasnain, Co-Founder and Principal Systems Architect of MIHORA.TECH"
                    width={72}
                    height={72}
                    loading="lazy"
                    className="w-18 h-18 rounded-2xl object-cover border border-outline/25 shrink-0"
                  />
                  <div className="text-right font-mono text-xs">
                    <div className="text-primary font-bold">Co-Founder · Principal Architect</div>
                    <div className="text-on-surface-variant mt-0.5">UK &amp; Pakistan Hubs</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-2xl text-on-surface font-extrabold">
                    M. Matti ul Hasnain
                  </h3>
                  <p className="font-mono text-xs text-primary font-semibold mt-0.5">
                    Systems &amp; Physical Infrastructure Architecture
                  </p>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  <strong>M. Matti ul Hasnain</strong> leads MIHORA.TECH&apos;s systems engineering doctrine, sovereign datacenter hardware design, OTDR-verified fiber builds, and low-latency software architecture across the UK, EMEA, and Pakistan.
                </p>
                <div className="pt-3 border-t border-outline/15 font-mono text-xs text-on-surface-variant">
                  Sovereign Systems · Datacenter Hardware · Distributed SRE
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-surface-container-lowest p-7 rounded-2xl border border-outline/25 space-y-5 h-full">
                <div className="flex items-center justify-between gap-4">
                  <img
                    src="/founder-omema.jpg"
                    alt="Omema Iqbal, Co-Founder and Operations Director of MIHORA.TECH"
                    width={72}
                    height={72}
                    loading="lazy"
                    className="w-18 h-18 rounded-2xl object-cover border border-outline/25 shrink-0"
                  />
                  <div className="text-right font-mono text-xs">
                    <div className="text-primary font-bold">Co-Founder · Operations Director</div>
                    <div className="text-on-surface-variant mt-0.5">Enterprise Governance</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-2xl text-on-surface font-extrabold">
                    Omema Iqbal
                  </h3>
                  <p className="font-mono text-xs text-primary font-semibold mt-0.5">
                    Enterprise Strategy &amp; Global Operations
                  </p>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  <strong>Omema Iqbal</strong> directs MIHORA.TECH&apos;s dual-hub operational governance, multi-jurisdiction SLA alignment, strategic partner coordination, and cross-border engineering workforce logistics.
                </p>
                <div className="pt-3 border-t border-outline/15 font-mono text-xs text-on-surface-variant">
                  Global Operations · Dual-Hub Governance · Client Delivery
                </div>
              </div>
            </StaggerItem>
          </StaggerGrid>

          <div className="bg-surface-container-low border border-outline/25 rounded-2xl p-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-left">
              <Award className="text-primary shrink-0" size={26} />
              <div>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  Deterministic Governance &amp; Direct Founder Engagement
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Registered private engineering enterprise serving regulated organizations worldwide.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg transition-all shrink-0 inline-flex items-center gap-1.5"
            >
              <span>Executive Consultation</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="w-full bg-surface-container-low py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-2 max-w-3xl">
            <div className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
              Core Engineering Doctrine
            </div>
            <h2 className="font-headline text-3xl text-on-surface font-extrabold">Engineering Philosophy</h2>
            <p className="text-base text-on-surface-variant">
              We build deterministic systems free of fragile external lock-in—verified mathematically across silicon, fiber, and code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-7 rounded-2xl border border-outline/25 space-y-3">
              <Target className="text-primary" size={26} />
              <h3 className="font-headline text-xl text-on-surface font-bold">Precision Over Shortcuts</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Taking the time to model power, thermal margin, and database quorum prevents cascading 3:00 AM production failures.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-7 rounded-2xl border border-outline/25 space-y-3">
              <ShieldCheck className="text-primary" size={26} />
              <h3 className="font-headline text-xl text-on-surface font-bold">Zero-Trust by Default</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Every microservice socket, management VLAN, and physical rack cabinet is authenticated and encrypted at the foundation layer.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-7 rounded-2xl border border-outline/25 space-y-3">
              <Zap className="text-primary" size={26} />
              <h3 className="font-headline text-xl text-on-surface font-bold">Hardware Accountability</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Software patches ship remotely, but failed optics require on-site discipline. We engineer physical layers with true 2N redundancy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual-Hub Operating Model */}
      <section id="global-operating-model" className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <div className="font-mono text-xs text-primary uppercase font-semibold tracking-widest">
              Synchronized Footprint
            </div>
            <h2 className="font-headline text-3xl text-on-surface font-extrabold">Global Operating Model</h2>
            <p className="text-base text-on-surface-variant">
              Two primary command centers in London and Islamabad coordinate engineering design, continuous monitoring, and global field dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-7 rounded-2xl border border-outline/25 space-y-3">
              <div className="font-mono text-xs text-primary font-bold uppercase">UK · EMEA Headquarters</div>
              <h3 className="font-headline text-xl text-on-surface font-bold">London Hub (UTC+0)</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                128 City Road, London EC2A 2NX. Strategic architecture alignment, UK-GDPR compliance governance, and European enterprise delivery.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-7 rounded-2xl border border-outline/25 space-y-3">
              <div className="font-mono text-xs text-primary font-bold uppercase">PK · Systems &amp; R&amp;D Labs</div>
              <h3 className="font-headline text-xl text-on-surface font-bold">Islamabad Hub (UTC+5)</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Blue Area, Islamabad 44000. Core systems R&amp;D, distributed backend engineering, hardware burn-in testing, and 24/7 watchdesk operations.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-7 rounded-2xl border border-outline/25 space-y-3">
              <div className="font-mono text-xs text-primary font-bold uppercase">Global Field Forces</div>
              <h3 className="font-headline text-xl text-on-surface font-bold">Worldwide Dispatch</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                BICSI-trained optical splicing engineers and datacenter technicians deploying across EMEA, APAC, and international enterprise sites.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/our-story"
              className="px-5 py-2.5 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
            >
              <span>Read Our Founding Story</span>
            </Link>
            <Link
              to="/security"
              className="px-5 py-2.5 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
            >
              <ShieldCheck size={14} className="text-primary" />
              <span>Zero-Trust Security Center</span>
            </Link>
            <Link
              to="/press"
              className="px-5 py-2.5 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
            >
              <span>Press Kit &amp; Citations</span>
            </Link>
            <Link
              to="/partnerships"
              className="px-5 py-2.5 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
            >
              <Globe size={14} className="text-primary" />
              <span>Strategic Partnerships</span>
            </Link>
            <Link
              to="/careers"
              className="px-5 py-2.5 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
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
