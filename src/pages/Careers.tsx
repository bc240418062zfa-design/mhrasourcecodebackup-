import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Globe, Plane, Home, Send, CheckCircle2, X, Briefcase, ArrowRight } from 'lucide-react';
import { playUiChime } from '../utils/audio';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import {
  Reveal,
  MaskTextReveal,
  SpotlightSurface,
  StaggerGrid,
  StaggerItem,
} from '../components/MotionPrimitives';

const OPEN_CADRES = [
  { role: 'Sr. Distributed Systems Engineer', loc: 'UK / Remote', div: 'Digital Engineering' },
  { role: 'Lead Field Technician (Cabling & Racks)', loc: 'EMEA / On-Site', div: 'Physical Optics' },
  { role: 'Automation Architect (Python / K8s)', loc: 'Global', div: 'Automation & AI' },
  { role: 'NOC Telemetry Specialist', loc: 'UK / PK Hubs', div: '24/7 SRE Operations' },
];

export default function Careers() {
  const [modalRole, setModalRole] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);
  const [applicantEmail, setApplicantEmail] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    playUiChime('success');
    setApplied(true);
  };

  const handleOpenRole = (role: string) => {
    playUiChime('click');
    setModalRole(role);
  };

  const handleClose = () => {
    playUiChime('click');
    setModalRole(null);
    setApplied(false);
    setApplicantEmail('');
    setGithubUrl('');
  };

  return (
    <div className="flex flex-col w-full">
      <SEOHead canonicalPath="/careers" />

      {/* Obsidian Engineering Recruitment Hero */}
      <section id="join-engineering" className="relative w-full obsidian-band obsidian-grid border-b border-white/10 overflow-hidden px-4 sm:px-6 lg:px-8 py-14 lg:py-22 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-10">
          <Breadcrumbs items={[{ label: 'Careers' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Reveal>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
                  <Briefcase size={14} />
                  <span>Engineering Recruitment · UK &amp; Pakistan Hubs</span>
                </div>
              </Reveal>
              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline text-3xl sm:text-5xl text-white font-extrabold tracking-tight leading-[1.08]">
                  Build Infrastructure That Endures
                </h1>
              </MaskTextReveal>
              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  We do not build disposable prototypes. We construct sovereign digital backbones and physical datacenter infrastructure. We are actively recruiting senior systems architects, field deployment engineers, low-voltage fiber technicians, and automation developers.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="mailto:hr@mihora.tech"
                    onClick={() => playUiChime('click')}
                    className="inline-flex items-center gap-2 px-6 py-3 btn-primary-gradient text-sm font-semibold rounded-lg transition-all shadow-sm"
                  >
                    <Mail size={16} />
                    <span>Apply Direct: hr@mihora.tech</span>
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 bg-white/[0.04] backdrop-blur-md p-6 sm:p-7 rounded-2xl space-y-4 border border-white/15">
              <div className="text-amber-400 font-mono font-semibold uppercase text-xs tracking-wider">
                Open Engineering Roles (Select to Apply)
              </div>
              <div className="space-y-2.5">
                {OPEN_CADRES.map((cadre) => (
                  <button
                    key={cadre.role}
                    type="button"
                    onClick={() => handleOpenRole(cadre.role)}
                    className="w-full text-left p-3.5 bg-black/40 hover:bg-white/[0.09] rounded-xl flex justify-between items-center gap-3 transition-all group cursor-pointer border border-white/10 hover:border-amber-400/50"
                  >
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {cadre.div}
                      </div>
                      <span className="text-white group-hover:text-amber-300 transition-colors text-sm font-semibold block">
                        {cadre.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-blue-400 text-xs font-mono font-semibold">
                        {cadre.loc}
                      </span>
                      <ArrowRight size={14} className="text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Application Modal */}
      <AnimatePresence>
        {modalRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg bg-surface-container-lowest border border-outline/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors cursor-pointer border border-outline/30"
                aria-label="Close application dialog"
              >
                <X size={18} />
              </button>

              {applied ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/15 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
                    <CheckCircle2 size={30} />
                  </div>
                  <h3 className="font-headline text-2xl text-on-surface font-extrabold">
                    Application Received
                  </h3>
                  <p className="text-sm sm:text-base text-on-surface-variant">
                    Your credentials for <strong className="text-on-surface">{modalRole}</strong> have been routed to our Principal Architecture recruitment desk.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-2.5 btn-primary-gradient text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <div className="font-mono text-xs text-primary tracking-wider uppercase font-semibold">
                      Engineering Application Intake
                    </div>
                    <h3 className="font-headline text-xl sm:text-2xl text-on-surface font-extrabold mt-1">
                      {modalRole}
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-on-surface-variant block uppercase font-semibold">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="engineer@domain.com"
                      className="w-full bg-surface-container-low border border-outline/30 focus:border-primary p-3 rounded-xl text-on-surface text-sm focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-on-surface-variant block uppercase font-semibold">
                      GitHub / Portfolio / LinkedIn *
                    </label>
                    <input
                      type="url"
                      required
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full bg-surface-container-low border border-outline/30 focus:border-primary p-3 rounded-xl text-on-surface text-sm focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <span className="font-mono text-xs text-on-surface-variant">MIHORA Recruitment HQ</span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 btn-primary-gradient text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-sm cursor-pointer"
                    >
                      <Send size={14} />
                      <span>Dispatch Credentials</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="global-relocation" className="w-full bg-surface px-4 sm:px-6 lg:px-8 py-16 lg:py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <Reveal>
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <div className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
                International Mobility
              </div>
              <h2 className="font-headline text-2xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
                Global Relocation &amp; Deployment Support
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant">
                We recruit experienced engineering talent globally and sponsor relocation across our United Kingdom and Pakistan dual hubs or active client operational zones.
              </p>
            </div>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <SpotlightSurface className="surface-card p-7 rounded-2xl text-center space-y-3 h-full">
                <div className="w-14 h-14 bg-primary/10 mx-auto rounded-2xl flex items-center justify-center text-primary">
                  <Plane size={28} />
                </div>
                <h3 className="font-headline text-lg text-on-surface font-bold">Visa Sponsorship</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Work authorization and legal sponsorship coordinated by our immigration partners for engineers and their immediate families.
                </p>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card p-7 rounded-2xl text-center space-y-3 h-full">
                <div className="w-14 h-14 bg-primary/10 mx-auto rounded-2xl flex items-center justify-center text-primary">
                  <Home size={28} />
                </div>
                <h3 className="font-headline text-lg text-on-surface font-bold">Transit &amp; Housing</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Structured relocation package covering initial corporate housing and regional settling allowances.
                </p>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card p-7 rounded-2xl text-center space-y-3 h-full">
                <div className="w-14 h-14 bg-primary/10 mx-auto rounded-2xl flex items-center justify-center text-primary">
                  <Globe size={28} />
                </div>
                <h3 className="font-headline text-lg text-on-surface font-bold">Field Rotation</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Opportunities for planned short-term and long-term rotational deployments across priority international infrastructure builds.
                </p>
              </SpotlightSurface>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>
    </div>
  );
}
