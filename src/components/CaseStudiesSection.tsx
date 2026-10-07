import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, CheckCircle2, ChevronRight, 
  ExternalLink, Cpu, HardDrive, Zap, Layers, ArrowUpRight, BarChart3
} from 'lucide-react';
import { playUiChime } from '../utils/audio';

interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  clientSector: string;
  summary: string;
  challenge: string;
  solution: string;
  architecture: string[];
  metrics: { label: string; value: string; desc: string }[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-banking-settlement',
    tag: 'BANKING & FINANCIAL INFRASTRUCTURE',
    title: 'National Interbank Real-Time Gross Settlement (RTGS) Sovereign Transition',
    clientSector: 'Central Banking Consortium & Tier-1 Financial Institution',
    summary: 'Complete repatriation of core clearing transactions from offshore public cloud back into an air-gapped, high-availability on-premise datacenter ring.',
    challenge: 'Offshore public cloud latency averaged 340ms, violating national regulatory sovereign data localization laws and exposing the clearing backbone to geopolitical sanctions and submarine cable vulnerabilities.',
    solution: 'Engineered a dual-site synchronous active-active Tier IV datacenter cluster in Islamabad and Karachi. Deployed dedicated physical FIPS 140-3 HSM hardware, sub-1ms deterministic database consensus, and dual-homed dark fiber links.',
    architecture: [
      'Active-Active Synchronous Replication across 1,200 km Protected Dark Fiber',
      'Hardware-Enforced Microsecond Cryptographic Signing with Thales HSMs',
      'Autonomous BGP Anycast Ingress with sub-18ms Failover Switching',
      'Zero Foreign Cloud Vendor Dependencies (Fully Air-Gapped Stack)'
    ],
    metrics: [
      { label: 'Settlement Latency', value: '0.8 ms', desc: 'Down from 340 ms on offshore cloud' },
      { label: 'Annual Uptime', value: '99.9999%', desc: 'Zero unmanaged downtime in 24 months' },
      { label: 'Transaction Throughput', value: '45,000 TPS', desc: 'Deterministic sub-millisecond finality' }
    ]
  },
  {
    id: 'case-dwdm-backbone',
    tag: 'PHYSICAL DATACENTER & OPTICAL FIBER',
    title: '1,400 km Trans-Continental 800G DWDM Coherent Optical Backbone',
    clientSector: 'National Telecommunications Carrier & Enterprise Carrier Transport',
    summary: 'Physical restoration and core-alignment re-splicing of national long-haul dark fiber routes to enable coherent 800G PAM4 wave division multiplexing.',
    challenge: 'Existing legacy fiber suffered from micro-bending, poor mechanical splices (>0.15 dB loss), and optical return loss (ORL) that prevented modern 800G coherent transceivers from maintaining stable constellation locking.',
    solution: 'MIHORA kinetic field engineering crews deployed with Fujikura 90S+ core-alignment fusion splicers and EXFO bidirectional OTDR testing units. Re-spliced over 2,800 joints to achieve verified average splice loss ≤ 0.028 dB.',
    architecture: [
      'Core-Alignment Arc Fusion Splicing across 1,400 km Single-Mode G.652D Fiber',
      'Bidirectional High-Resolution OTDR Testing at 1310nm, 1550nm, and 1625nm',
      '64-Channel C-Band DWDM ROADM Optical Amplification Nodes',
      'Sub-0.03 dB Mean Loss per Splice across All Terminations'
    ],
    metrics: [
      { label: 'Mean Splice Loss', value: '0.028 dB', desc: 'Surpasses TIA/EIA standard by 72%' },
      { label: 'Aggregate Capacity', value: '51.2 Tbps', desc: 'Full 64-channel 800G wave stability' },
      { label: 'Optical Return Loss', value: '> 68 dB', desc: 'Zero reflection penalty across entire span' }
    ]
  },
  {
    id: 'case-defense-scada',
    tag: 'DEFENSE & INDUSTRIAL SCADA',
    title: 'Sovereign Electrical Grid SCADA Telemetry & EMP-Resistant Command Bus',
    clientSector: 'National Energy Grid & Critical Industrial Infrastructure Authority',
    summary: 'Hardware-level cyber-hardening, physical air-gap containment, and unidirectional data diode engineering for national high-voltage power substations.',
    challenge: 'Substation automated RTUs (Remote Terminal Units) were exposed to legacy Modbus/DNP3 protocols vulnerable to remote malware injection and telemetry spoofing.',
    solution: 'Installed hardware-enforced optical data diodes allowing strictly one-way outward telemetry streaming. Out-of-band management buses were isolated behind Faraday-shielded enclosures with physical cryptographic key interlocks.',
    architecture: [
      'Hardware-Based Optical Data Diodes (Physically Impossible Ingress Path)',
      'RISC-V Cryptographic Telemetry Signing Proxies at Substation Edge',
      'Dual-Loop Isolated RS-485 and Fiber-Optic SCADA Interconnects',
      'EMP/HEMP Level E1/E2 Shielded Server Cabinets'
    ],
    metrics: [
      { label: 'External Attack Surface', value: '0.00%', desc: 'Physically air-gapped galvanic isolation' },
      { label: 'Telemetry Mirror Latency', value: '< 2.4 ms', desc: 'Real-time state-of-charge synchronization' },
      { label: 'Compliance Rating', value: 'NIST SP 800-82', desc: 'Meets highest critical infrastructure standard' }
    ]
  }
];

export function CaseStudiesSection() {
  const [activeCaseId, setActiveCaseId] = useState<string>('case-banking-settlement');

  const activeCase = CASE_STUDIES.find(c => c.id === activeCaseId) || CASE_STUDIES[0];

  return (
    <section id="field-case-studies" className="w-full bg-surface-container-low px-margin-mobile lg:px-margin py-space-xl border-b border-outline/20">
      <div className="max-w-7xl mx-auto space-y-space-lg">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md border-b border-outline/20 pb-space-sm">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-lg text-primary font-mono text-xs font-bold uppercase tracking-widest border border-outline/30">
              <Building2 size={13} className="text-secondary" />
              <span>FIELD POST-MORTEMS • PROVEN SOVEREIGN MISSIONS</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg font-black uppercase text-on-surface tracking-tight">
              Enterprise Field Deployments &amp; Case Studies
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Architectural blueprints, quantitative telemetry, and execution logs from mission-critical physical datacenter and sovereign systems deployments.
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xs">
          {CASE_STUDIES.map((c) => {
            const isSelected = activeCaseId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  playUiChime('click');
                  setActiveCaseId(c.id);
                }}
                className={`p-space-sm rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-surface-container-highest border-primary shadow-md'
                    : 'bg-surface-container-lowest border-outline/20 hover:border-outline/40'
                }`}
              >
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-primary font-bold tracking-wider">
                    {c.tag}
                  </span>
                  <div className="font-headline-sm text-xs font-extrabold text-on-surface leading-snug">
                    {c.title}
                  </div>
                </div>
                <div className="font-mono text-[11px] text-outline flex items-center gap-1 pt-1 border-t border-outline/10">
                  <span>{c.clientSector}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Case Study Card */}
        <div className="p-space-lg bg-surface-container-lowest rounded-2xl border border-outline/30 space-y-space-md shadow-sm">
          
          {/* Card Header */}
          <div className="space-y-2 border-b border-outline/20 pb-space-sm">
            <span className="px-2.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-xs font-bold uppercase">
              {activeCase.tag}
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface font-extrabold">
              {activeCase.title}
            </h3>
            <p className="font-mono text-xs text-secondary font-bold">
              ENGAGEMENT SECTOR: {activeCase.clientSector}
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant pt-1 leading-relaxed">
              {activeCase.summary}
            </p>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md font-body-sm text-body-sm text-on-surface-variant">
            <div className="p-space-sm bg-surface-container-low rounded-xl border border-outline/20 space-y-2">
              <div className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold uppercase flex items-center gap-1.5">
                <span>// MISSION CHALLENGE &amp; VULNERABILITY</span>
              </div>
              <p className="leading-relaxed">
                {activeCase.challenge}
              </p>
            </div>

            <div className="p-space-sm bg-surface-container-low rounded-xl border border-outline/20 space-y-2">
              <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                <span>// MIHORA ARCHITECTURAL SOLUTION</span>
              </div>
              <p className="leading-relaxed">
                {activeCase.solution}
              </p>
            </div>
          </div>

          {/* Architecture Pillars */}
          <div className="space-y-2">
            <div className="font-mono text-xs text-outline font-bold uppercase">
              // DEPLOYED INFRASTRUCTURE PILLARS:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeCase.architecture.map((arch, i) => (
                <div key={i} className="p-3 bg-surface-container rounded-xl border border-outline/20 font-mono text-xs text-on-surface flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantitative Metrics Bar */}
          <div className="pt-space-xs border-t border-outline/20">
            <div className="font-mono text-xs text-outline font-bold uppercase mb-2">
              // VERIFIED POST-DEPLOYMENT BENCHMARKS:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs font-mono">
              {activeCase.metrics.map((m, idx) => (
                <div key={idx} className="p-space-sm bg-surface-container-high rounded-xl border border-outline/20 text-center space-y-1">
                  <div className="text-[10px] text-outline uppercase font-bold">{m.label}</div>
                  <div className="text-xl font-black text-primary">{m.value}</div>
                  <div className="text-[11px] text-on-surface-variant font-sans">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
