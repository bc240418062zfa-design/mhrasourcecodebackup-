import React from 'react';
import { Building, Globe, Users, Target, ShieldCheck, Zap, Award, Terminal, Compass, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../components/BrandLogo';

export default function Company() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section id="about" className="relative w-full bg-surface-container-lowest overflow-hidden px-margin-mobile lg:px-margin py-space-xl lg:py-24 scroll-mt-24">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-container/10 blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-space-lg items-center">
          <div className="space-y-space-md">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-high rounded-DEFAULT text-secondary shadow-sm">
              <Building size={14} />
              <span className="font-label-sm text-label-sm tracking-widest uppercase">COMPANY OVERVIEW</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface uppercase tracking-tight leading-none">
              A NEW CLASS OF <span className="text-secondary-container">ENGINEERING ENTERPRISE.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Operating dual engineering hubs across the United Kingdom and Pakistan, delivering globally. MIHORA.TECH is built on a simple thesis: the most complex problems require mastery of both code and the physical world.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="h-11 px-2.5 rounded-lg bg-surface-container border border-outline/30 flex items-center justify-center">
                <BrandLogo className="h-6 w-auto aspect-[368/236]" />
              </div>
              <div>
                <p className="font-mono text-xs text-secondary font-bold tracking-wider uppercase">Founded by M. Matti ul Hasnain &amp; Omema Iqbal</p>
                <p className="font-mono text-[11px] text-on-surface-variant">Sovereign Systems Architecture &bull; Global Operations</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-space-md">
            <div className="bg-surface-container-low p-space-md rounded-DEFAULT space-y-2 border border-outline/20">
              <Globe className="text-secondary-container" size={24} />
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Global Reach</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Operating dual UK/PK hubs with field teams across EMEA, APAC, and North America.</p>
            </div>
            <div className="bg-surface-container-low p-space-md rounded-DEFAULT space-y-2 border border-outline/20">
              <Users className="text-secondary-container" size={24} />
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Multi-Discipline</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Cloud architects working side-by-side with low-voltage technicians.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS & EXECUTIVE LEADERSHIP SECTION (HIGH SEO VALUE) */}
      <section id="leadership" className="w-full bg-surface-container-low px-margin-mobile lg:px-margin py-space-xl scroll-mt-24 border-y border-outline/20">
        <div className="max-w-7xl mx-auto space-y-space-xl">
          <div className="text-center space-y-space-xs max-w-3xl mx-auto">
            <div className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-mono font-bold">// FOUNDERS &amp; EXECUTIVE STEWARDSHIP</div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase font-extrabold tracking-tight">
              Founded by M. Matti ul Hasnain &amp; Omema Iqbal
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              MIHORA.TECH was founded by <strong className="text-on-surface font-bold">M. Matti ul Hasnain</strong> and <strong className="text-on-surface font-bold">Omema Iqbal</strong> to pioneer sovereign systems engineering, high-availability physical datacenter architecture, and relentless 24/7 global telemetry operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg max-w-5xl mx-auto">
            {/* Founder 1: M. Matti ul Hasnain */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-secondary/30 shadow-xl relative overflow-hidden group hover:border-secondary/60 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-all"></div>
              <div className="relative z-10 space-y-space-md">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-secondary/40 shadow-[0_0_15px_rgba(0,210,255,0.2)] shrink-0">
                    <img src="/founder-matti.jpg" alt="M. Matti ul Hasnain" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-mono text-xs px-3 py-1 bg-secondary/10 text-secondary border border-secondary/30 rounded-full font-bold uppercase tracking-wider">
                    Co-Founder &bull; Principal Architect
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold uppercase tracking-tight">
                    M. Matti ul Hasnain
                  </h3>
                  <p className="font-mono text-xs text-secondary-container font-semibold mt-0.5">
                    FOUNDER // SYSTEMS &amp; INFRASTRUCTURE ARCHITECTURE
                  </p>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Leading MIHORA.TECH&apos;s global engineering doctrine, sovereign systems infrastructure, hardware telemetry, and low-latency cloud architectures across Pakistan, the UK, and international operational theatres.
                </p>
                <div className="pt-2 border-t border-outline/15 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">Sovereign Systems</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">Datacenter Hardware</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">Distributed SRE</span>
                </div>
              </div>
            </div>

            {/* Founder 2: Omema Iqbal */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-primary/30 shadow-xl relative overflow-hidden group hover:border-primary/60 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
              <div className="relative z-10 space-y-space-md">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary/40 shadow-[0_0_15px_rgba(0,102,255,0.2)] shrink-0">
                    <img src="/founder-omema.jpg" alt="Omema Iqbal" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-mono text-xs px-3 py-1 bg-primary/10 text-primary border border-primary/30 rounded-full font-bold uppercase tracking-wider">
                    Co-Founder &bull; Operations Director
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold uppercase tracking-tight">
                    Omema Iqbal
                  </h3>
                  <p className="font-mono text-xs text-primary font-semibold mt-0.5">
                    FOUNDER // ENTERPRISE STRATEGY &amp; GLOBAL OPERATIONS
                  </p>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Directing MIHORA.TECH&apos;s dual-hub operational governance, enterprise project alignment, multi-jurisdiction compliance, talent architecture, and cross-hemisphere delivery frameworks.
                </p>
                <div className="pt-2 border-t border-outline/15 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">Global Operations</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">Dual-Hub Governance</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">Client Strategy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Trust Banner */}
          <div className="bg-surface-container-high/60 border border-outline/25 rounded-xl p-space-md max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <Award className="text-secondary shrink-0" size={28} />
              <div>
                <h4 className="font-headline-xs text-headline-xs font-bold text-on-surface uppercase">
                  Founded with Deterministic Governance
                </h4>
                <p className="font-body-xs text-body-xs text-on-surface-variant">
                  Registered private enterprise delivering mission-critical technology solutions globally.
                </p>
              </div>
            </div>
            <Link 
              to="/contact" 
              className="px-5 py-2.5 bg-secondary text-on-secondary font-mono text-xs font-bold rounded-lg uppercase tracking-wider hover:opacity-90 transition-all shrink-0"
            >
              Direct Executive Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section id="philosophy" className="w-full bg-surface px-margin-mobile lg:px-margin py-space-xl scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-space-xl">
          <div className="space-y-space-xs max-w-3xl">
            <div className="font-label-sm text-label-sm text-secondary-container tracking-widest uppercase font-mono font-bold">// CORE DOCTRINE</div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase font-bold tracking-tight">Engineering Philosophy</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">We build resilient, deterministic systems that do not rely on fragile external states. We do not do &quot;agile prototypes&quot; for production hardware; we do mathematically validated deployments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="bg-surface-container-lowest p-space-lg rounded-DEFAULT border-l-4 border-primary">
              <Target className="text-primary mb-space-sm" size={32} />
              <h3 className="font-headline-md text-headline-md text-on-surface uppercase font-bold mb-2">Precision over Speed</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">We prefer taking the time to architect robust edge clusters rather than rushing a flawed mesh network. Reliability is our primary metric.</p>
            </div>
            <div className="bg-surface-container-lowest p-space-lg rounded-DEFAULT border-l-4 border-secondary-container">
              <ShieldCheck className="text-secondary-container mb-space-sm" size={32} />
              <h3 className="font-headline-md text-headline-md text-on-surface uppercase font-bold mb-2">Zero-Trust by Default</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Every API, every switch port, and every user session is treated as hostile. Security is woven into the base layer, not added as an afterthought.</p>
            </div>
            <div className="bg-surface-container-lowest p-space-lg rounded-DEFAULT border-l-4 border-error">
              <Zap className="text-error mb-space-sm" size={32} />
              <h3 className="font-headline-md text-headline-md text-on-surface uppercase font-bold mb-2">Hardware is Hard</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Code can be patched over the air, but a burned-out PLC requires a truck roll. We engineer hardware layers with extreme redundancies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Operating Model */}
      <section id="global-operating-model" className="w-full bg-surface-container-lowest px-margin-mobile lg:px-margin py-space-xl scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-space-xl">
          <div className="text-center space-y-space-xs max-w-3xl mx-auto">
            <div className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest font-mono">// THE ENGINE</div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">Global Operating Model</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Our dual-hub structure across the United Kingdom and Pakistan powers 24/7 engineering velocity, robust governance, and global physical field execution.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            <div className="bg-surface-container p-space-lg rounded-DEFAULT shadow-lg flex flex-col items-start gap-space-md border-t-2 border-primary">
              <div className="w-12 h-12 bg-primary-container text-on-primary-container flex items-center justify-center rounded-full">
                <span className="font-bold text-lg">UK</span>
              </div>
              <div>
                <div className="font-mono text-label-sm text-secondary-container">DUAL HUB // EMEA HEADQUARTERS</div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold uppercase mt-1">United Kingdom Hub (London)</h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Strategic client governance, enterprise architecture alignment, ISO/IEC standards compliance, and European operational command.
              </p>
            </div>

            <div className="bg-surface-container p-space-lg rounded-DEFAULT shadow-lg flex flex-col items-start gap-space-md border-t-2 border-secondary-container">
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container flex items-center justify-center rounded-full">
                <span className="font-bold text-lg">PK</span>
              </div>
              <div>
                <div className="font-mono text-label-sm text-secondary-container">DUAL HUB // SYSTEMS &amp; R&amp;D CENTER</div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold uppercase mt-1">Pakistan Systems Labs (Islamabad)</h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Core systems algorithms, distributed data processing, automated continuous integration pipelines, and full hardware rig simulations.
              </p>
            </div>

            <div className="bg-surface-container p-space-lg rounded-DEFAULT shadow-lg flex flex-col items-start gap-space-md border-t-2 border-outline">
              <div className="w-12 h-12 bg-surface-container-high text-on-surface flex items-center justify-center rounded-full">
                <span className="font-bold text-lg">FD</span>
              </div>
              <div>
                <div className="font-mono text-label-sm text-on-surface-variant">WORLDWIDE INFRASTRUCTURE</div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold uppercase mt-1">Field Deployments (Global)</h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Certified field engineering units active across EMEA, APAC, and North America for data center build-outs, fiber trunks, and rapid break-fix.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
