import { useState } from 'react';
import { Building2, CheckCircle2 } from 'lucide-react';
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
    tag: 'Banking & Financial Infrastructure',
    title: 'National Interbank Real-Time Gross Settlement (RTGS) Sovereign Transition',
    clientSector: 'Central Banking Consortium & Tier-1 Financial Institution',
    summary:
      'Complete repatriation of core clearing transactions from offshore public cloud back into an air-gapped, high-availability on-premise datacenter ring.',
    challenge:
      'Offshore public cloud latency averaged 340 ms, violating national regulatory data localization laws and exposing the clearing backbone to geopolitical disruption and submarine cable bottlenecks.',
    solution:
      'Engineered a dual-site synchronous active-active Tier IV datacenter cluster in Islamabad and Karachi. Deployed dedicated physical FIPS 140-3 HSM hardware, sub-1ms deterministic database consensus, and dual-homed dark fiber links.',
    architecture: [
      'Active-Active Synchronous Replication across 1,200 km Protected Dark Fiber',
      'Hardware-Enforced Microsecond Cryptographic Signing with Thales HSMs',
      'Autonomous BGP Anycast Ingress with sub-18ms Failover Switching',
      'Zero Foreign Cloud Vendor Dependencies (Fully Air-Gapped Stack)',
    ],
    metrics: [
      { label: 'Settlement Latency', value: '0.8 ms', desc: 'Down from 340 ms on offshore cloud' },
      { label: 'Annual Uptime', value: '99.9999%', desc: 'Zero unmanaged downtime in 24 months' },
      { label: 'Transaction Throughput', value: '45,000 TPS', desc: 'Deterministic sub-millisecond finality' },
    ],
  },
  {
    id: 'case-dwdm-backbone',
    tag: 'Physical Datacenter & Optical Fiber',
    title: '1,400 km Trans-Continental 800G DWDM Coherent Optical Backbone',
    clientSector: 'National Telecommunications Carrier & Enterprise Carrier Transport',
    summary:
      'Physical restoration and core-alignment re-splicing of national long-haul dark fiber routes to enable coherent 800G PAM4 wave division multiplexing.',
    challenge:
      'Existing legacy fiber suffered from micro-bending, poor mechanical splices (>0.15 dB loss), and optical return loss (ORL) preventing modern 800G coherent transceivers from maintaining stable constellation locking.',
    solution:
      'MIHORA kinetic field engineering crews deployed with Fujikura 90S+ core-alignment fusion splicers and EXFO bidirectional OTDR testing units. Re-spliced over 2,800 joints to achieve verified average splice loss <= 0.028 dB.',
    architecture: [
      'Core-Alignment Arc Fusion Splicing across 1,400 km Single-Mode G.652D Fiber',
      'Bidirectional High-Resolution OTDR Testing at 1310nm, 1550nm, and 1625nm',
      '64-Channel C-Band DWDM ROADM Optical Amplification Nodes',
      'Sub-0.03 dB Mean Loss per Splice across All Terminations',
    ],
    metrics: [
      { label: 'Mean Splice Loss', value: '0.028 dB', desc: 'Surpasses TIA/EIA standard by 72%' },
      { label: 'Aggregate Capacity', value: '51.2 Tbps', desc: 'Full 64-channel 800G wave stability' },
      { label: 'Optical Return Loss', value: '> 68 dB', desc: 'Zero reflection penalty across span' },
    ],
  },
  {
    id: 'case-defense-scada',
    tag: 'Energy Grid & Industrial SCADA',
    title: 'Sovereign Electrical Grid SCADA Telemetry & EMP-Resistant Command Bus',
    clientSector: 'National Energy Grid & Critical Industrial Infrastructure Authority',
    summary:
      'Hardware-level cyber-hardening, physical air-gap containment, and unidirectional data diode engineering for high-voltage power substations.',
    challenge:
      'Substation automated RTUs (Remote Terminal Units) were exposed to legacy Modbus/DNP3 protocols vulnerable to remote malware injection and telemetry spoofing.',
    solution:
      'Installed hardware-enforced optical data diodes allowing strictly one-way outward telemetry streaming. Out-of-band management buses were isolated behind Faraday-shielded enclosures with physical cryptographic key interlocks.',
    architecture: [
      'Hardware-Based Optical Data Diodes (Physically Isolated Ingress Path)',
      'RISC-V Cryptographic Telemetry Signing Proxies at Substation Edge',
      'Dual-Loop Isolated RS-485 and Fiber-Optic SCADA Interconnects',
      'EMP/HEMP Shielded Server & Switch Enclosures',
    ],
    metrics: [
      { label: 'External Attack Surface', value: '0.00%', desc: 'Physically air-gapped galvanic isolation' },
      { label: 'Telemetry Mirror Latency', value: '< 2.4 ms', desc: 'Real-time state-of-charge synchronization' },
      { label: 'Compliance Rating', value: 'NIST SP 800-82', desc: 'Critical infrastructure security alignment' },
    ],
  },
];

export function CaseStudiesSection() {
  const [activeCaseId, setActiveCaseId] = useState<string>('case-banking-settlement');
  const activeCase = CASE_STUDIES.find((c) => c.id === activeCaseId) || CASE_STUDIES[0];

  return (
    <section
      id="field-case-studies"
      className="w-full bg-surface-container-low px-4 sm:px-6 lg:px-8 py-16 border-b border-outline/20"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              <Building2 size={14} />
              <span>Field Post-Mortems · Verified Sovereign Missions</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Enterprise Field Deployments &amp; Case Studies
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl">
              Architectural blueprints, quantitative telemetry, and execution logs from mission-critical physical datacenter and sovereign systems deployments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CASE_STUDIES.map((c) => {
            const isSelected = activeCaseId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  playUiChime('click');
                  setActiveCaseId(c.id);
                }}
                className={`p-5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-surface-container-lowest border-primary shadow-md'
                    : 'bg-surface-container-lowest/60 border-outline/20 hover:border-outline/40'
                }`}
              >
                <div className="space-y-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-primary font-semibold block">
                    {c.tag}
                  </span>
                  <div className="font-headline text-sm font-bold text-on-surface leading-snug">
                    {c.title}
                  </div>
                </div>
                <div className="font-mono text-[11px] text-on-surface-variant pt-2 border-t border-outline/15">
                  {c.clientSector}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-6 sm:p-8 bg-surface-container-lowest rounded-2xl border border-outline/25 space-y-6 shadow-sm">
          <div className="space-y-2 border-b border-outline/15 pb-5">
            <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              {activeCase.tag}
            </div>
            <h3 className="font-headline text-xl sm:text-2xl text-on-surface font-extrabold">
              {activeCase.title}
            </h3>
            <p className="font-mono text-xs text-on-surface-variant font-medium">
              Engagement Sector: {activeCase.clientSector}
            </p>
            <p className="text-sm sm:text-base text-on-surface-variant pt-1 leading-relaxed">
              {activeCase.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-on-surface-variant">
            <div className="p-5 bg-surface-container-low rounded-xl border border-outline/20 space-y-2">
              <div className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                Mission Challenge &amp; Bottleneck
              </div>
              <p className="leading-relaxed">{activeCase.challenge}</p>
            </div>

            <div className="p-5 bg-surface-container-low rounded-xl border border-outline/20 space-y-2">
              <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                MIHORA Architectural Solution
              </div>
              <p className="leading-relaxed">{activeCase.solution}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-xs text-on-surface-variant font-bold uppercase tracking-wider">
              Deployed Infrastructure Pillars
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeCase.architecture.map((arch) => (
                <div
                  key={arch}
                  className="p-3.5 bg-surface-container rounded-xl border border-outline/20 font-mono text-xs text-on-surface flex items-start gap-2.5"
                >
                  <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-outline/15 space-y-3">
            <div className="font-mono text-xs text-on-surface-variant font-bold uppercase tracking-wider">
              Verified Post-Deployment Benchmarks
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeCase.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-4 bg-surface-container-low rounded-xl border border-outline/20 text-center space-y-1"
                >
                  <div className="font-mono text-[11px] text-on-surface-variant uppercase font-semibold">
                    {m.label}
                  </div>
                  <div className="font-headline text-2xl font-extrabold text-primary tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-xs text-on-surface-variant">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
