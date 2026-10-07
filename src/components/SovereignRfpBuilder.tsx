import React, { useState } from 'react';
import { 
  Calculator, CheckCircle2, ShieldCheck, Server, Cpu, Zap, 
  Layers, ArrowRight, Printer, Download, Sparkles, Send, Building
} from 'lucide-react';
import { playUiChime } from '../utils/audio';

interface RfpState {
  sector: 'Banking & Financial Core' | 'Defense & National Air-Gap' | 'AI Accelerated Compute' | 'Telco DWDM Core';
  hubLocation: 'Dual Synchronized (London + Islamabad)' | 'London Command Hub' | 'Islamabad Sovereign Cluster';
  rackCount: number;
  powerKwPerRack: number;
  tierLevel: 'Tier IV 2(N+1) Fault-Tolerant' | 'Tier III 2N Concurrently Maintainable';
  fiberSpec: 'Core-Alignment Fusion (≤0.03 dB)' | 'Ultra-Low Loss Single-Mode (≤0.05 dB)';
  supportSla: '24/7 Dedicated L3 SRE (Sub-15m Kinetic Dispatch)' | '24/7 NOC Active Telemetry (Sub-30m SLA)';
  hsmRequired: boolean;
}

export function SovereignRfpBuilder() {
  const [rfp, setRfp] = useState<RfpState>({
    sector: 'Banking & Financial Core',
    hubLocation: 'Dual Synchronized (London + Islamabad)',
    rackCount: 16,
    powerKwPerRack: 12,
    tierLevel: 'Tier IV 2(N+1) Fault-Tolerant',
    fiberSpec: 'Core-Alignment Fusion (≤0.03 dB)',
    supportSla: '24/7 Dedicated L3 SRE (Sub-15m Kinetic Dispatch)',
    hsmRequired: true
  });

  const [activeStep, setActiveStep] = useState<number>(1);
  const [generatedRefId, setGeneratedRefId] = useState<string>('MHR-RFP-2026-7914');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [clientContact, setClientContact] = useState({ name: '', organization: '', email: '' });

  const totalKw = rfp.rackCount * rfp.powerKwPerRack;
  const estimatedPue = rfp.powerKwPerRack > 20 ? 1.12 : 1.15;
  const totalFacilityMw = ((totalKw * estimatedPue) / 1000).toFixed(2);
  const estimatedFiberCores = rfp.rackCount * 24;

  const handleNextStep = () => {
    playUiChime('click');
    if (activeStep === 3) {
      // Generate new reference ID
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setGeneratedRefId(`MHR-RFP-2026-${randomCode}`);
    }
    setActiveStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    playUiChime('click');
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmitRfp = (e: React.FormEvent) => {
    e.preventDefault();
    playUiChime('success');
    setSubmitted(true);
  };

  const handlePrint = () => {
    playUiChime('click');
    window.print();
  };

  return (
    <section id="sovereign-rfp-builder" className="w-full bg-surface px-margin-mobile lg:px-margin py-space-xl border-b border-outline/20">
      <div className="max-w-7xl mx-auto space-y-space-lg">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-lg text-primary font-mono text-xs font-bold uppercase tracking-widest border border-outline/30">
            <Calculator size={13} className="text-secondary" />
            <span>ENTERPRISE PROCUREMENT • INSTANT ARCHITECTURAL RFP GENERATOR</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-black uppercase text-on-surface tracking-tight">
            Sovereign Infrastructure Proposal Specifier
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Configure your enterprise rack density, optical transit, and sovereign security parameters to generate an official technical specification and dispatch quotation.
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div className="max-w-3xl mx-auto grid grid-cols-4 gap-2 font-mono text-xs">
          {[
            { step: 1, label: 'Sector & Hub' },
            { step: 2, label: 'Scale & Power' },
            { step: 3, label: 'Tier & Optics' },
            { step: 4, label: 'Official Spec' }
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => {
                playUiChime('click');
                setActiveStep(s.step);
              }}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                activeStep === s.step
                  ? 'bg-primary text-on-primary font-bold border-primary shadow-sm'
                  : activeStep > s.step
                  ? 'bg-surface-container-high text-emerald-500 border-emerald-500/40'
                  : 'bg-surface-container text-outline border-outline/20'
              }`}
            >
              <div className="text-[10px] uppercase">Step 0{s.step}</div>
              <div className="truncate font-semibold">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Wizard Container */}
        <div className="max-w-4xl mx-auto p-space-lg bg-surface-container-lowest rounded-2xl border border-outline/30 shadow-md">
          
          {/* STEP 1: SECTOR & DUAL-HUB PREFERENCE */}
          {activeStep === 1 && (
            <div className="space-y-space-md">
              <div className="space-y-1 border-b border-outline/20 pb-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                  Step 1: Select Enterprise Mission &amp; Deployment Topology
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Define your regulatory compliance profile and geographic sovereign residency.
                </p>
              </div>

              {/* Sector Selection */}
              <div className="space-y-2">
                <label className="font-mono text-xs text-outline font-bold uppercase">
                  Primary Enterprise Sector:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
                  {[
                    'Banking & Financial Core',
                    'Defense & National Air-Gap',
                    'AI Accelerated Compute',
                    'Telco DWDM Core'
                  ].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setRfp({ ...rfp, sector: sec as any })}
                      className={`p-space-sm rounded-xl border text-left transition-all cursor-pointer ${
                        rfp.sector === sec
                          ? 'bg-surface-container-highest border-primary text-primary font-bold shadow-sm'
                          : 'bg-surface-container-low border-outline/20 text-on-surface hover:border-outline/40'
                      }`}
                    >
                      <div className="font-headline-sm text-sm">{sec}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Command Hub Selection */}
              <div className="space-y-2">
                <label className="font-mono text-xs text-outline font-bold uppercase">
                  Deployment Command Hub:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
                  {[
                    'Dual Synchronized (London + Islamabad)',
                    'London Command Hub',
                    'Islamabad Sovereign Cluster'
                  ].map((hub) => (
                    <button
                      key={hub}
                      type="button"
                      onClick={() => setRfp({ ...rfp, hubLocation: hub as any })}
                      className={`p-space-sm rounded-xl border text-left transition-all cursor-pointer ${
                        rfp.hubLocation === hub
                          ? 'bg-surface-container-highest border-primary text-primary font-bold shadow-sm'
                          : 'bg-surface-container-low border-outline/20 text-on-surface hover:border-outline/40'
                      }`}
                    >
                      <div className="font-headline-sm text-xs">{hub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SCALE & POWER */}
          {activeStep === 2 && (
            <div className="space-y-space-md">
              <div className="space-y-1 border-b border-outline/20 pb-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                  Step 2: Scale, Rack Capacity &amp; Thermal Power Density
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Slide to select your physical server rack elevation and power feed parameters.
                </p>
              </div>

              {/* Rack Count Slider */}
              <div className="space-y-2 p-space-sm bg-surface-container-low rounded-xl border border-outline/20">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-outline font-bold uppercase">Server Rack Elevation Count:</span>
                  <span className="text-base font-black text-primary">{rfp.rackCount} Standard 42U Cabinets</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="64"
                  step="2"
                  value={rfp.rackCount}
                  onChange={(e) => setRfp({ ...rfp, rackCount: parseInt(e.target.value) })}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[10px] text-outline">
                  <span>2 Cabinets (Edge Pod)</span>
                  <span>16 Cabinets (Enterprise Suite)</span>
                  <span>64 Cabinets (Sovereign Hall)</span>
                </div>
              </div>

              {/* Power Density Per Rack */}
              <div className="space-y-2 p-space-sm bg-surface-container-low rounded-xl border border-outline/20">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-outline font-bold uppercase">Power Density per Cabinet:</span>
                  <span className="text-base font-black text-secondary">{rfp.powerKwPerRack} kW / Cabinet</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={rfp.powerKwPerRack}
                  onChange={(e) => setRfp({ ...rfp, powerKwPerRack: parseInt(e.target.value) })}
                  className="w-full accent-secondary cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[10px] text-outline">
                  <span>5 kW (Standard Compute)</span>
                  <span>15 kW (High Density SAN)</span>
                  <span>40 kW (Liquid Cooled GPU Pod)</span>
                </div>
              </div>

              {/* Real-time Calculation Box */}
              <div className="grid grid-cols-3 gap-space-xs font-mono text-xs text-center">
                <div className="p-3 bg-surface-container rounded-xl border border-outline/20">
                  <div className="text-[10px] text-outline uppercase font-bold">Total IT Power</div>
                  <div className="text-base font-black text-on-surface">{totalKw} kW</div>
                </div>
                <div className="p-3 bg-surface-container rounded-xl border border-outline/20">
                  <div className="text-[10px] text-outline uppercase font-bold">Facility Total</div>
                  <div className="text-base font-black text-emerald-500">{totalFacilityMw} MW</div>
                </div>
                <div className="p-3 bg-surface-container rounded-xl border border-outline/20">
                  <div className="text-[10px] text-outline uppercase font-bold">Design PUE</div>
                  <div className="text-base font-black text-primary">{estimatedPue}</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TIER & ZERO-TRUST HARDWARE */}
          {activeStep === 3 && (
            <div className="space-y-space-md">
              <div className="space-y-1 border-b border-outline/20 pb-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                  Step 3: Redundancy Tier &amp; Optical Fiber Criteria
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Select datacenter fault-tolerance certifications and physical optical loss standards.
                </p>
              </div>

              {/* Tier Selection */}
              <div className="space-y-2">
                <label className="font-mono text-xs text-outline font-bold uppercase">
                  Datacenter Tier &amp; Electrical Architecture:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
                  {[
                    'Tier IV 2(N+1) Fault-Tolerant',
                    'Tier III 2N Concurrently Maintainable'
                  ].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setRfp({ ...rfp, tierLevel: t as any })}
                      className={`p-space-sm rounded-xl border text-left transition-all cursor-pointer ${
                        rfp.tierLevel === t
                          ? 'bg-surface-container-highest border-primary text-primary font-bold shadow-sm'
                          : 'bg-surface-container-low border-outline/20 text-on-surface hover:border-outline/40'
                      }`}
                    >
                      <div className="font-headline-sm text-sm">{t}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optical Fiber Specification */}
              <div className="space-y-2">
                <label className="font-mono text-xs text-outline font-bold uppercase">
                  Optical Fusion Splice &amp; OTDR Standard:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
                  {[
                    'Core-Alignment Fusion (≤0.03 dB)',
                    'Ultra-Low Loss Single-Mode (≤0.05 dB)'
                  ].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setRfp({ ...rfp, fiberSpec: f as any })}
                      className={`p-space-sm rounded-xl border text-left transition-all cursor-pointer ${
                        rfp.fiberSpec === f
                          ? 'bg-surface-container-highest border-primary text-primary font-bold shadow-sm'
                          : 'bg-surface-container-low border-outline/20 text-on-surface hover:border-outline/40'
                      }`}
                    >
                      <div className="font-headline-sm text-sm">{f}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical HSM Root of Trust Checkbox */}
              <div className="p-space-sm bg-surface-container-low rounded-xl border border-outline/20 flex items-center justify-between cursor-pointer"
                   onClick={() => setRfp({ ...rfp, hsmRequired: !rfp.hsmRequired })}>
                <div className="space-y-0.5">
                  <div className="font-headline-sm text-sm font-bold text-on-surface">
                    Deploy Dedicated Physical Hardware Security Module (HSM)
                  </div>
                  <div className="font-body-sm text-xs text-on-surface-variant">
                    FIPS 140-3 Level 4 tamper-evident cryptographic root-of-trust for air-gapped PKI.
                  </div>
                </div>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                  rfp.hsmRequired ? 'bg-primary border-primary text-on-primary' : 'border-outline/40'
                }`}>
                  {rfp.hsmRequired && <CheckCircle2 size={14} />}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: OFFICIAL PROPOSAL SPECIFICATION */}
          {activeStep === 4 && (
            <div className="space-y-space-md print:space-y-2">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs border-b border-outline/20 pb-space-xs">
                <div>
                  <span className="text-[11px] font-mono text-primary font-bold tracking-widest uppercase">
                    // OFFICIAL ARCHITECTURE SPECIFICATION
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-black">
                    Sovereign Infrastructure Bill of Materials
                  </h3>
                </div>
                <div className="font-mono text-xs px-3 py-1.5 bg-surface-container rounded-lg border border-outline/30 text-on-surface font-bold">
                  REF: <span className="text-secondary">{generatedRefId}</span>
                </div>
              </div>

              {/* Generated Spec Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm font-mono text-xs">
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20 space-y-1">
                  <div className="text-outline uppercase text-[10px] font-bold">Sector Workload</div>
                  <div className="font-bold text-on-surface">{rfp.sector}</div>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20 space-y-1">
                  <div className="text-outline uppercase text-[10px] font-bold">Command Hub Location</div>
                  <div className="font-bold text-on-surface">{rfp.hubLocation}</div>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20 space-y-1">
                  <div className="text-outline uppercase text-[10px] font-bold">Cabinet Elevation</div>
                  <div className="font-bold text-primary">{rfp.rackCount} Racks (42U) • {rfp.powerKwPerRack} kW / Rack</div>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20 space-y-1">
                  <div className="text-outline uppercase text-[10px] font-bold">Facility Power Total</div>
                  <div className="font-bold text-emerald-500">{totalFacilityMw} MW (PUE {estimatedPue})</div>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20 space-y-1">
                  <div className="text-outline uppercase text-[10px] font-bold">Electrical Topology</div>
                  <div className="font-bold text-on-surface">{rfp.tierLevel}</div>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl border border-outline/20 space-y-1">
                  <div className="text-outline uppercase text-[10px] font-bold">Fiber Splicing Standard</div>
                  <div className="font-bold text-secondary">{rfp.fiberSpec}</div>
                </div>
              </div>

              {/* Submission / Contact Dispatch */}
              {!submitted ? (
                <form onSubmit={handleSubmitRfp} className="p-space-md bg-surface-container rounded-xl border border-outline/20 space-y-space-sm">
                  <div className="font-mono text-xs text-on-surface font-bold uppercase">
                    Dispatch Proposal to MIHORA Dual Command Desks:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs font-mono text-xs">
                    <input
                      type="text"
                      required
                      placeholder="Lead Engineer / Officer Name"
                      value={clientContact.name}
                      onChange={(e) => setClientContact({ ...clientContact, name: e.target.value })}
                      className="px-3 py-2 bg-surface-container-highest rounded-lg border border-outline/30 text-on-surface focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Organization / Enterprise"
                      value={clientContact.organization}
                      onChange={(e) => setClientContact({ ...clientContact, organization: e.target.value })}
                      className="px-3 py-2 bg-surface-container-highest rounded-lg border border-outline/30 text-on-surface focus:outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Official Corporate Email"
                      value={clientContact.email}
                      onChange={(e) => setClientContact({ ...clientContact, email: e.target.value })}
                      className="px-3 py-2 bg-surface-container-highest rounded-lg border border-outline/30 text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-space-xs pt-2 border-t border-outline/20">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-container-low hover:bg-surface-container-high border border-outline/30 rounded-lg font-mono text-xs font-bold text-on-surface cursor-pointer"
                    >
                      <Printer size={14} />
                      <span>PRINT / SAVE SPEC SHEET</span>
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-on-primary font-mono text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md active:scale-95"
                    >
                      <Send size={14} />
                      <span>SUBMIT RFP FOR PRINCIPAL REVIEW</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-space-md bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2 text-center font-mono">
                  <div className="inline-flex p-2 bg-emerald-500 text-white rounded-full">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    RFP DISPATCHED SUCCESSFULLY: {generatedRefId}
                  </h4>
                  <p className="text-xs text-on-surface-variant max-w-lg mx-auto font-sans">
                    Your architecture specification has been received at the London and Islamabad command desks. A designated Principal Systems Architect will reach out within 4 business hours.
                  </p>
                </div>
              )}

            </div>
          )}

          {/* Navigation Controls */}
          {activeStep < 4 && (
            <div className="flex items-center justify-between pt-space-md border-t border-outline/20 mt-space-md">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={activeStep === 1}
                className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-mono text-xs font-bold transition-all disabled:opacity-30 cursor-pointer"
              >
                PREVIOUS
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary/90 text-on-primary rounded-xl font-mono text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>{activeStep === 3 ? 'GENERATE OFFICIAL SPECIFICATION' : 'NEXT STEP'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
