import React, { useState } from 'react';
import { Mail, MapPin, Globe, CheckCircle2, Send, Terminal, Shield, RefreshCw } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { Reveal } from '../components/MotionPrimitives';
import { playUiChime } from '../utils/audio';

interface ContactFormData {
  fullName: string;
  email: string;
  organization: string;
  discipline: string;
  budget: string;
  message: string;
}

const INITIAL_FORM: ContactFormData = {
  fullName: '',
  email: '',
  organization: '',
  discipline: 'Digital Engineering',
  budget: '$25,000 - $100,000',
  message: '',
};

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [ticketId, setTicketId] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playUiChime('click');
    setFormStatus('submitting');

    setTimeout(() => {
      const generatedTicket = `MIH-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
      setFormStatus('success');
      playUiChime('success');
    }, 900);
  };

  const handleReset = () => {
    playUiChime('click');
    setFormData(INITIAL_FORM);
    setFormStatus('idle');
  };

  return (
    <div className="flex flex-col w-full">
      <SEOHead canonicalPath="/contact" />

      <section className="relative w-full bg-surface-container-lowest overflow-hidden px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto space-y-8">
          <Breadcrumbs items={[{ label: 'Contact & Dispatch' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-6 relative z-10">
              <div className="space-y-4">
                <Reveal>
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                    <Shield size={14} />
                    <span>Dual-Hub Architectural Dispatch</span>
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <h1 className="font-headline text-3xl sm:text-5xl text-on-surface tracking-tight leading-tight font-extrabold">
                    Initiate Engineering <span className="text-primary">Contact.</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                    Submit architectural RFPs, schedule physical infrastructure audits, or engage our sovereign engineering teams for mission-critical systems deployment.
                  </p>
                </Reveal>
              </div>

              <div className="space-y-4">
                <div className="bg-surface-container-low border border-outline/20 p-5 rounded-2xl flex gap-4 items-start">
                  <MapPin className="text-primary mt-0.5 shrink-0" size={22} />
                  <div className="space-y-1">
                    <div className="font-mono text-[11px] text-primary uppercase tracking-wider font-semibold">
                      EMEA Headquarters · UTC+0
                    </div>
                    <h2 className="font-headline text-base text-on-surface font-bold">
                      United Kingdom Hub (London)
                    </h2>
                    <p className="text-sm text-on-surface-variant">
                      128 City Road, London EC2A 4NE — Strategic Delivery, Enterprise Architecture &amp; EMEA Operations
                    </p>
                    <p className="font-mono text-[11px] text-on-surface-variant pt-0.5">
                      51.5074° N · 0.1278° W
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-low border border-outline/20 p-5 rounded-2xl flex gap-4 items-start">
                  <MapPin className="text-primary mt-0.5 shrink-0" size={22} />
                  <div className="space-y-1">
                    <div className="font-mono text-[11px] text-primary uppercase tracking-wider font-semibold">
                      Systems &amp; R&amp;D Center · UTC+5
                    </div>
                    <h2 className="font-headline text-base text-on-surface font-bold">
                      Pakistan Systems Hub (Islamabad)
                    </h2>
                    <p className="text-sm text-on-surface-variant">
                      Blue Area, Islamabad 44000 — Core Systems Architecture, Simulation Labs &amp; 24/7 SRE Telemetry
                    </p>
                    <p className="font-mono text-[11px] text-on-surface-variant pt-0.5">
                      33.6844° N · 73.0479° E
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-low border border-outline/20 p-5 rounded-2xl flex gap-4 items-start">
                  <Globe className="text-primary mt-0.5 shrink-0" size={22} />
                  <div className="space-y-1">
                    <h2 className="font-headline text-base text-on-surface font-bold">Global Field Deployments</h2>
                    <p className="text-sm text-on-surface-variant">
                      Active field engineering teams operating across the UK, EMEA, South Asia, APAC, and North America.
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-low border border-outline/20 p-5 rounded-2xl flex gap-4 items-start">
                  <Mail className="text-primary mt-0.5 shrink-0" size={22} />
                  <div className="space-y-1">
                    <h2 className="font-headline text-base text-on-surface font-bold">Direct Executive &amp; Dispatch Mail</h2>
                    <div className="flex flex-wrap gap-4 font-mono text-sm">
                      <a href="mailto:hr@mihora.tech" className="text-primary hover:underline font-semibold">
                        hr@mihora.tech
                      </a>
                      <a href="mailto:dispatch@mihora.tech" className="text-secondary hover:underline font-semibold">
                        dispatch@mihora.tech
                      </a>
                    </div>
                    <p className="font-mono text-[11px] text-on-surface-variant pt-0.5">
                      Encrypted intake · P99 response window &lt; 2 business hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative z-10 flex items-start justify-center">
              <div className="w-full bg-surface-container-low p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg border border-outline/25">
                {formStatus === 'success' ? (
                  <div className="flex flex-col items-center text-center space-y-5 py-8">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 size={36} />
                    </div>
                    <div className="space-y-2">
                      <span className="font-mono text-xs text-primary font-semibold tracking-widest uppercase">
                        Transmission Acknowledged
                      </span>
                      <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-extrabold">
                        Dispatch Logged Successfully
                      </h2>
                      <p className="text-sm sm:text-base text-on-surface-variant max-w-md">
                        Your inquiry has been registered with our central architecture queue. An engineering lead will review your requirements directly.
                      </p>
                    </div>

                    <div className="w-full max-w-md bg-surface-container p-5 rounded-xl font-mono text-xs text-left space-y-2 border border-outline/20">
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Ticket Reference:</span>
                        <span className="text-primary font-bold">{ticketId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Organization:</span>
                        <span className="text-on-surface">{formData.organization || 'Proprietary'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Discipline:</span>
                        <span className="text-secondary font-semibold">{formData.discipline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">SLA Status:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Queued · Active Review</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-container hover:bg-surface-container-high border border-outline/30 text-on-surface text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                        type="button"
                      >
                        <RefreshCw size={15} />
                        <span>Transmit Another Brief</span>
                      </button>
                      <a
                        href="mailto:hr@mihora.tech"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all"
                      >
                        <Terminal size={15} />
                        <span>Email HQ Directly</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-outline/20 pb-4 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs text-primary tracking-wider uppercase font-semibold">
                          Engineering Intake Protocol
                        </span>
                        <h2 className="font-headline text-xl sm:text-2xl text-on-surface font-extrabold mt-0.5">
                          Dispatch Architectural Brief
                        </h2>
                      </div>
                      <Shield className="text-primary w-6 h-6 hidden sm:block shrink-0" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-fullName" className="text-xs uppercase font-mono font-semibold text-on-surface-variant block">
                          Full Name *
                        </label>
                        <input
                          id="contact-fullName"
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Lead Engineer or Executive"
                          className="w-full bg-surface-container border border-outline/30 focus:border-primary p-3 rounded-xl text-on-surface text-sm focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="text-xs uppercase font-mono font-semibold text-on-surface-variant block">
                          Corporate / Work Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@organization.com"
                          className="w-full bg-surface-container border border-outline/30 focus:border-primary p-3 rounded-xl text-on-surface text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-organization" className="text-xs uppercase font-mono font-semibold text-on-surface-variant block">
                          Enterprise / Organization
                        </label>
                        <input
                          id="contact-organization"
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder="Entity or Project Name"
                          className="w-full bg-surface-container border border-outline/30 focus:border-primary p-3 rounded-xl text-on-surface text-sm focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="discipline-select" className="text-xs uppercase font-mono font-semibold text-on-surface-variant block">
                          Primary Discipline
                        </label>
                        <select
                          id="discipline-select"
                          name="discipline"
                          value={formData.discipline}
                          onChange={handleChange}
                          className="w-full bg-surface-container border border-outline/30 focus:border-primary p-3 rounded-xl text-on-surface text-sm focus:outline-none transition-colors"
                        >
                          <option value="Digital Engineering">Digital Engineering &amp; Microservices</option>
                          <option value="Automation & AI">Automation &amp; AI Workflows</option>
                          <option value="Physical Infrastructure">Physical Infrastructure &amp; Servers</option>
                          <option value="Field Engineering">Field Engineering &amp; Cabling</option>
                          <option value="Managed Tech">Managed Tech &amp; 24/7 SRE</option>
                          <option value="Bespoke R&D">Bespoke Protocol / R&amp;D Rig</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="budget-select" className="text-xs uppercase font-mono font-semibold text-on-surface-variant block">
                        Target Investment / Scope Scale
                      </label>
                      <select
                        id="budget-select"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-surface-container border border-outline/30 focus:border-primary p-3 rounded-xl text-on-surface text-sm focus:outline-none transition-colors"
                      >
                        <option value="< $25,000">&lt; $25,000 (Targeted Module / Audit)</option>
                        <option value="$25,000 - $100,000">$25,000 - $100,000 (Core Subsystem)</option>
                        <option value="$100,000 - $500,000">$100,000 - $500,000 (Multi-Site Rollout)</option>
                        <option value="$500,000+">$500,000+ (Sovereign Infrastructure Overhaul)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="text-xs uppercase font-mono font-semibold text-on-surface-variant block">
                        Technical Architecture Requirements / Scope *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Outline technical bottlenecks, data volume, physical site locations, existing stack, and operational timeline constraints..."
                        className="w-full bg-surface-container border border-outline/30 focus:border-primary p-3 rounded-xl text-on-surface text-sm focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="font-mono text-xs text-on-surface-variant">
                        Dispatch SLA: <span className="text-primary font-semibold">P99 &lt; 2 Business Hours</span>
                      </div>
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary hover:bg-primary/90 text-white text-xs uppercase tracking-widest font-semibold rounded-lg transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <RefreshCw size={15} className="animate-spin" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            <span>Transmit Dispatch</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
