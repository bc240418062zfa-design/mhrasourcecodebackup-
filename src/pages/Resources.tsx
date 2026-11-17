import { Link } from 'react-router-dom';
import {
  BookOpen, FileText, Terminal, Globe, ArrowRight, HelpCircle
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { Reveal, StaggerGrid, StaggerItem } from '../components/MotionPrimitives';

const FIBER_STANDARDS = [
  {
    medium: 'Single-Mode OS2 (G.652D / G.657A1)',
    wavelength: '1310 nm / 1550 nm',
    maxChannelLoss: '0.35 dB/km (1310) · 0.22 dB/km (1550)',
    mihoraTarget: '<= 0.03 dB Mean Fusion Splice Loss',
  },
  {
    medium: 'Multi-Mode OM4 Laser-Optimized',
    wavelength: '850 nm / 1300 nm',
    maxChannelLoss: '3.0 dB/km (850) · 1.5 dB/km (1300)',
    mihoraTarget: '<= 0.05 dB Splice · <= 0.15 dB Connector',
  },
  {
    medium: 'Structured Copper Category 6A STP',
    wavelength: 'Up to 500 MHz',
    maxChannelLoss: '10GBASE-T @ 100 meters max',
    mihoraTarget: '100% Fluke DSX-8000 Pass Margin >= 4.0 dB',
  },
];

const TIER_DOWNTIME_TABLE = [
  {
    tier: 'Uptime Tier I / 99.9%',
    annualDowntime: '8 hours 45 minutes',
    powerPath: 'Single non-redundant path',
    suitability: 'Development & non-critical tooling',
  },
  {
    tier: 'Uptime Tier III / 99.982%',
    annualDowntime: '1 hour 35 minutes',
    powerPath: 'N+1 concurrently maintainable',
    suitability: 'Enterprise ERP & clinical systems',
  },
  {
    tier: 'MIHORA Sovereign Quorum / 99.999%',
    annualDowntime: '<= 5 minutes 15 seconds',
    powerPath: '2(N+1) Dual-Hub + Active BGP/Optical',
    suitability: 'Interbank RTGS, national grids & 24/7 SaaS',
  },
];

export default function Resources() {
  return (
    <div className="flex flex-col w-full">
      <SEOHead canonicalPath="/resources" />

      {/* Header */}
      <section className="w-full bg-surface-container-lowest border-b border-outline/20 py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumbs items={[{ label: 'Resources & Knowledge Hub' }]} />
          <div className="max-w-3xl space-y-4">
            <Reveal>
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Engineering Knowledge Hub &amp; Standards
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-on-surface tracking-tight leading-tight">
                Technical Reference, Optical Tolerances &amp; Architectural Guides
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                Direct engineering references published by MIHORA.TECH R&amp;D Labs in London and Islamabad—spanning TIA-568 optical budgets, SLA downtime mathematics, whitepapers, and interactive sizing tools.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Hub Portals */}
      <section className="w-full bg-surface py-14 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-7xl mx-auto space-y-8">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <StaggerItem>
              <Link
                to="/docs"
                className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/25 hover:border-primary/50 transition-all h-full flex flex-col justify-between space-y-4 group cursor-pointer"
              >
                <div className="space-y-3">
                  <BookOpen size={22} className="text-primary" />
                  <h2 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    Systems Docs Codex
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Detailed specifications for all 9 architecture layers, optical splicing formulas, and SCADA isolation rules.
                  </p>
                </div>
                <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                  <span>Open Codex</span>
                  <ArrowRight size={13} />
                </span>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link
                to="/insights"
                className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/25 hover:border-primary/50 transition-all h-full flex flex-col justify-between space-y-4 group cursor-pointer"
              >
                <div className="space-y-3">
                  <FileText size={22} className="text-primary" />
                  <h2 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    Whitepapers &amp; Dispatches
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Peer-reviewed monographs on banking repatriation, eBPF kernel telemetry, and live industry briefings.
                  </p>
                </div>
                <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                  <span>Read Papers</span>
                  <ArrowRight size={13} />
                </span>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link
                to="/solutions#sovereign-rfp-builder"
                className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/25 hover:border-primary/50 transition-all h-full flex flex-col justify-between space-y-4 group cursor-pointer"
              >
                <div className="space-y-3">
                  <Terminal size={22} className="text-primary" />
                  <h2 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    Sovereign RFP Configurator
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Interactive calculator generating rack power density, optical uplink specs, and staffing requirements.
                  </p>
                </div>
                <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                  <span>Launch Specifier</span>
                  <ArrowRight size={13} />
                </span>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link
                to="/engineering#subsea-cable-explorer"
                className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/25 hover:border-primary/50 transition-all h-full flex flex-col justify-between space-y-4 group cursor-pointer"
              >
                <div className="space-y-3">
                  <Globe size={22} className="text-primary" />
                  <h2 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    Subsea Optical Explorer
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Route-level telemetry modeling PEACE, SMW5, and terrestrial dark fiber backhaul across Europe &amp; South Asia.
                  </p>
                </div>
                <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                  <span>Inspect Routes</span>
                  <ArrowRight size={13} />
                </span>
              </Link>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* AEO Concise Definitions */}
      <section className="w-full bg-surface-container-low py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-7xl mx-auto space-y-8">
          <Reveal>
            <div className="space-y-2 max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Core Architectural Definitions
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
                Essential Concepts in Sovereign Engineering
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/20 space-y-2">
              <h3 className="font-headline text-lg font-bold text-on-surface">
                What Is Full-Span Sovereign Infrastructure?
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Full-span sovereign infrastructure is an engineering model where the operating organization retains cryptographic, physical, and legal custody over every layer—bare-metal compute, optical dark fiber routes, HSM encryption keys, source code repositories, and monitoring telemetry—preventing unilateral vendor lock-in or jurisdictional exposure.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/20 space-y-2">
              <h3 className="font-headline text-lg font-bold text-on-surface">
                Why Does Bidirectional OTDR Certification Matter?
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                High-speed 400G and 800G DWDM coherent optics fail rapidly if even a single mechanical or core-misaligned fusion splice introduces reflected noise (ORL) or excessive attenuation. Bidirectional OTDR testing measures light backscatter from both endpoints across multiple wavelengths, proving link budgets mathematically prior to handover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reference Table 1: TIA-568 & Optical Attenuation */}
      <section className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-6xl mx-auto space-y-8">
          <Reveal>
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Physical Media Reference · TIA-568-D
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
                Optical Fiber &amp; Copper Attenuation Verification Budgets
              </h2>
            </div>
          </Reveal>

          <div className="overflow-x-auto rounded-2xl border border-outline/25 bg-surface-container-lowest">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline/20 bg-surface-container-low text-xs font-mono uppercase tracking-wider text-on-surface-variant">
                  <th className="p-4">Transmission Medium</th>
                  <th className="p-4">Test Spectral Window</th>
                  <th className="p-4">Industry Reference Limit</th>
                  <th className="p-4 text-primary">MIHORA Acceptance Gate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/15 text-sm">
                {FIBER_STANDARDS.map((row) => (
                  <tr key={row.medium}>
                    <td className="p-4 font-semibold text-on-surface">{row.medium}</td>
                    <td className="p-4 font-mono text-xs text-on-surface-variant">{row.wavelength}</td>
                    <td className="p-4 text-on-surface-variant">{row.maxChannelLoss}</td>
                    <td className="p-4 font-semibold text-primary">{row.mihoraTarget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Reference Table 2: Uptime SLA Math */}
      <section className="w-full bg-surface-container-low py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <Reveal>
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Reliability Mathematics
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
                Annual Downtime Budgets Across Infrastructure Tiers
              </h2>
            </div>
          </Reveal>

          <div className="overflow-x-auto rounded-2xl border border-outline/25 bg-surface-container-lowest">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline/20 bg-surface-container-low text-xs font-mono uppercase tracking-wider text-on-surface-variant">
                  <th className="p-4">Availability Class</th>
                  <th className="p-4">Annual Unplanned Downtime</th>
                  <th className="p-4">Power &amp; Path Topology</th>
                  <th className="p-4">Target Workload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/15 text-sm">
                {TIER_DOWNTIME_TABLE.map((row) => (
                  <tr key={row.tier}>
                    <td className="p-4 font-semibold text-on-surface">{row.tier}</td>
                    <td className="p-4 font-mono text-xs font-bold text-primary">{row.annualDowntime}</td>
                    <td className="p-4 text-on-surface-variant">{row.powerPath}</td>
                    <td className="p-4 text-on-surface-variant">{row.suitability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-headline font-bold text-base text-on-surface">
                  Need Custom Site Calculations or Entity Verification?
                </div>
                <p className="text-sm text-on-surface-variant">
                  Browse our Verified Entity FAQ or contact our principal systems engineering team directly.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/faq"
                className="px-4 py-2 rounded-lg bg-surface-container border border-outline/30 text-xs font-semibold text-on-surface hover:border-primary/50"
              >
                Read FAQs
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 inline-flex items-center gap-1"
              >
                <span>Consult Engineering</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
