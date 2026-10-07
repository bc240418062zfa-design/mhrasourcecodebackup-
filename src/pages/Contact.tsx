import React, { useState } from 'react';
import { Mail, MapPin, Globe, ArrowRight, CheckCircle2, Send, Terminal, Shield, RefreshCw } from 'lucide-react';

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
    setFormStatus('submitting');
    
    // Simulate telemetry transmission
    setTimeout(() => {
      const generatedTicket = `MIH-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
      setFormStatus('success');
    }, 1200);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setFormStatus('idle');
  };

  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full bg-surface-container-lowest overflow-hidden px-margin-mobile lg:px-margin py-space-xl lg:py-24">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-container/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          
          <div className="lg:col-span-5 space-y-space-lg relative z-10">
            <div className="space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-high rounded-DEFAULT text-secondary shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                <span className="font-label-sm text-label-sm tracking-widest uppercase font-mono">SECURE TELEMETRY DISPATCH</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface uppercase tracking-tight leading-none font-bold">
                INITIATE <span className="text-secondary-container">CONTACT.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                Submit architectural RFPs, schedule physical infrastructure audits, or engage our sovereign engineering teams for mission-critical systems deployment.
              </p>
            </div>

            <div className="space-y-space-md">
              <div className="bg-surface-container p-space-md rounded-DEFAULT flex gap-space-md items-start shadow-md">
                <MapPin className="text-secondary-container mt-1 shrink-0" size={24} />
                <div>
                  <div className="font-mono text-label-sm text-secondary-container uppercase tracking-wider font-semibold">DUAL HUB // EMEA HEADQUARTERS</div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold uppercase">United Kingdom Hub (London)</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Strategic Delivery, Enterprise Architecture &amp; EMEA Operations</p>
                  <p className="font-mono text-label-sm text-secondary pt-1">LAT: 51.5074° N // LNG: 0.1278° W</p>
                </div>
              </div>

              <div className="bg-surface-container p-space-md rounded-DEFAULT flex gap-space-md items-start shadow-md">
                <MapPin className="text-secondary-container mt-1 shrink-0" size={24} />
                <div>
                  <div className="font-mono text-label-sm text-secondary-container uppercase tracking-wider font-semibold">DUAL HUB // SYSTEMS &amp; R&amp;D CENTER</div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold uppercase">Pakistan Systems Hub (Islamabad)</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Core Systems Architecture, Simulation Labs &amp; Telemetry Command</p>
                  <p className="font-mono text-label-sm text-secondary pt-1">LAT: 33.6844° N // LNG: 73.0479° E</p>
                </div>
              </div>

              <div className="bg-surface-container p-space-md rounded-DEFAULT flex gap-space-md items-start shadow-md">
                <Globe className="text-secondary-container mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold uppercase">Global Deployments</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Active field engineering teams operating across UK, EMEA, APAC &amp; North America.</p>
                </div>
              </div>

              <div className="bg-surface-container p-space-md rounded-DEFAULT flex gap-space-md items-start shadow-md">
                <Mail className="text-secondary-container mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold uppercase">Direct Comm Transmission</h3>
                  <a href="mailto:hr@mihora.tech" className="font-mono text-body-md text-secondary hover:text-on-surface transition-colors">hr@mihora.tech</a>
                  <p className="font-mono text-label-sm text-on-surface-variant pt-1">ENCRYPTION: TLS 1.3 / P99 RESPONSE &lt; 2 HRS</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative z-10 flex items-center justify-center">
            <div className="w-full bg-surface-container-low p-space-lg lg:p-space-xl rounded-DEFAULT shadow-2xl border border-surface-container-highest">
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center text-center space-y-space-md py-space-lg">
                  <div className="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-container">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-label-sm text-secondary tracking-widest uppercase">TRANSMISSION ACKNOWLEDGED</span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">Dispatch Logged Successfully</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                      Your dispatch request has been cryptographically registered with our central architecture queue. An engineering lead will review your specifications.
                    </p>
                  </div>

                  <div className="w-full max-w-md bg-surface-container p-space-md rounded-DEFAULT font-mono text-xs text-left space-y-1.5 border border-outline/20">
                    <div className="flex justify-between text-outline">
                      <span>TICKET DISPATCH ID:</span>
                      <span className="text-secondary-container font-bold">{ticketId}</span>
                    </div>
                    <div className="flex justify-between text-outline">
                      <span>ORGANIZATION:</span>
                      <span className="text-on-surface">{formData.organization || 'Proprietary'}</span>
                    </div>
                    <div className="flex justify-between text-outline">
                      <span>DISCIPLINE:</span>
                      <span className="text-secondary">{formData.discipline}</span>
                    </div>
                    <div className="flex justify-between text-outline">
                      <span>STATUS:</span>
                      <span className="text-secondary-fixed-dim">IN QUEUE // SLA ACTIVE</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-space-sm pt-space-xs">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-space-md py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md uppercase font-semibold rounded-DEFAULT transition-all"
                      type="button"
                    >
                      <RefreshCw size={15} />
                      <span>Transmit Another Brief</span>
                    </button>
                    <a
                      href="mailto:hr@mihora.tech"
                      className="inline-flex items-center gap-2 px-space-md py-2.5 bg-primary-container text-on-primary font-label-md text-label-md uppercase font-bold rounded-DEFAULT transition-all"
                    >
                      <Terminal size={15} />
                      <span>Email HQ Directly</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-space-md">
                  <div className="space-y-1 border-b border-surface-container pb-space-sm flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs text-secondary-container tracking-wider uppercase">// ENGINEERING INTAKE PROTOCOL</span>
                      <h2 className="font-headline-md text-headline-md text-on-surface font-bold uppercase">Dispatch Architectural Transmission</h2>
                    </div>
                    <Shield className="text-secondary w-6 h-6 hidden sm:block" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="space-y-1.5">
                      <label className="font-label-sm text-label-sm uppercase font-mono text-on-surface-variant block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Lead Engineer or Exec"
                        className="w-full bg-surface-container border border-outline/30 focus:border-secondary p-space-sm rounded-DEFAULT text-on-surface font-body-sm text-body-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-label-sm text-label-sm uppercase font-mono text-on-surface-variant block">
                        Corporate / Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@organization.com"
                        className="w-full bg-surface-container border border-outline/30 focus:border-secondary p-space-sm rounded-DEFAULT text-on-surface font-body-sm text-body-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="space-y-1.5">
                      <label className="font-label-sm text-label-sm uppercase font-mono text-on-surface-variant block">
                        Enterprise / Organization
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Entity or Project Name"
                        className="w-full bg-surface-container border border-outline/30 focus:border-secondary p-space-sm rounded-DEFAULT text-on-surface font-body-sm text-body-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-label-sm text-label-sm uppercase font-mono text-on-surface-variant block">
                        Primary Discipline
                      </label>
                      <select
                        name="discipline"
                        value={formData.discipline}
                        onChange={handleChange}
                        className="w-full bg-surface-container border border-outline/30 focus:border-secondary p-space-sm rounded-DEFAULT text-on-surface font-body-sm text-body-sm focus:outline-none transition-colors"
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
                    <label className="font-label-sm text-label-sm uppercase font-mono text-on-surface-variant block">
                      Target Investment / Scope Scale
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-surface-container border border-outline/30 focus:border-secondary p-space-sm rounded-DEFAULT text-on-surface font-body-sm text-body-sm focus:outline-none transition-colors"
                    >
                      <option value="< $25,000">&lt; $25,000 (Targeted Module / Audit)</option>
                      <option value="$25,000 - $100,000">$25,000 - $100,000 (Core Subsystem)</option>
                      <option value="$100,000 - $500,000">$100,000 - $500,000 (Multi-Site Rollout)</option>
                      <option value="$500,000+">$500,000+ (Sovereign Infrastructure Overhaul)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-label-sm text-label-sm uppercase font-mono text-on-surface-variant block">
                      Technical Architecture Requirements / Scope *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Outline technical bottlenecks, data volume, physical site locations, existing stack, and operational timeline constraints..."
                      className="w-full bg-surface-container border border-outline/30 focus:border-secondary p-space-sm rounded-DEFAULT text-on-surface font-body-sm text-body-sm focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-space-xs flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                    <div className="font-mono text-[11px] text-outline">
                      DISPATCH ROUTE: <span className="text-secondary">P99 SLA &lt; 2 HOURS</span>
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm px-8 py-3.5 btn-primary-gradient font-label-md text-label-md uppercase tracking-widest font-bold rounded-xl transition-all disabled:opacity-50"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          <span>TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>TRANSMIT DISPATCH</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
