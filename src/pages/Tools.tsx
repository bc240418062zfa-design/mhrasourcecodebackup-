import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  Calculator,
  Activity,
  Cable,
  Server,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { MaskTextReveal, Reveal } from '../components/MotionPrimitives';
import { playUiChime } from '../utils/audio';
import { VISUAL_ASSETS } from '../assets/visuals';

const SLA_PRESETS = [
  { label: '99.9% (Standard)', value: 99.9 },
  { label: '99.95% (Commercial)', value: 99.95 },
  { label: '99.99% (Four Nines)', value: 99.99 },
  { label: '99.999% (MIHORA Quorum)', value: 99.999 },
];

const SCHEMA_TOOLS = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'MIHORA Engineering & Optical Fiber Budget Calculators',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  url: 'https://mihora.tech/tools/',
  description:
    'Free interactive engineering calculators for SLA uptime downtime budgets, TIA-568-D single-mode optical fiber link attenuation, and sovereign infrastructure vs. hyperscale cloud TCO.',
  author: {
    '@id': 'https://mihora.tech/#organization',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

function formatDuration(minutes: number): string {
  if (minutes < 1) {
    return `${(minutes * 60).toFixed(1)} sec`;
  }
  if (minutes < 60) {
    return `${minutes.toFixed(2)} min`;
  }
  const hrs = Math.floor(minutes / 60);
  const remMins = Math.round(minutes % 60);
  return `${hrs}h ${remMins}m`;
}

export default function Tools() {
  const [activeTool, setActiveTool] = useState<'sla' | 'fiber' | 'tco'>('sla');
  const [copiedSpec, setCopiedSpec] = useState(false);

  // 1. SLA Calculator state
  const [slaTarget, setSlaTarget] = useState<number>(99.999);
  const [hourlyOutageCost, setHourlyOutageCost] = useState<number>(25000);

  // 2. Fiber Link Budget state
  const [fiberKm, setFiberKm] = useState<number>(28);
  const [wavelength, setWavelength] = useState<'1310nm' | '1550nm'>('1550nm');
  const [spliceCount, setSpliceCount] = useState<number>(12);
  const [connectorPairs, setConnectorPairs] = useState<number>(4);
  const [spliceStandard, setSpliceStandard] = useState<'mihora' | 'tia'>('mihora');

  // 3. Sovereign vs Hyperscale TCO state
  const [rackCount, setRackCount] = useState<number>(4);
  const [egressTbMonth, setEgressTbMonth] = useState<number>(180);

  const slaMath = useMemo(() => {
    const downtimeFraction = Math.max(0, 1 - slaTarget / 100);
    const minsPerYear = 525960 * downtimeFraction;
    const minsPerQuarter = minsPerYear / 4;
    const minsPerMonth = minsPerYear / 12;
    const minsPerDay = 1440 * downtimeFraction;
    const annualRiskUsd = (minsPerYear / 60) * hourlyOutageCost;
    return { minsPerYear, minsPerQuarter, minsPerMonth, minsPerDay, annualRiskUsd };
  }, [slaTarget, hourlyOutageCost]);

  const fiberMath = useMemo(() => {
    const fiberCoeff = wavelength === '1310nm' ? 0.35 : 0.22; // dB/km OS2 ITU-T G.652.D
    const spliceLossPerPoint = spliceStandard === 'mihora' ? 0.03 : 0.1; // dB per splice
    const connectorLossPerPair = 0.5; // TIA-568-D conservative 0.5 dB, typical 0.35 dB
    const marginDb = 3.0; // standard maintenance & repair allowance

    const fiberLoss = fiberKm * fiberCoeff;
    const spliceLoss = spliceCount * spliceLossPerPoint;
    const connLoss = connectorPairs * connectorLossPerPair;
    const totalLoss = fiberLoss + spliceLoss + connLoss + marginDb;
    const tiaLoss =
      fiberLoss + spliceCount * 0.1 + connLoss + marginDb;
    const headroomSaved = Math.max(0, tiaLoss - totalLoss);

    return { fiberCoeff, fiberLoss, spliceLoss, connLoss, marginDb, totalLoss, headroomSaved };
  }, [fiberKm, wavelength, spliceCount, connectorPairs, spliceStandard]);

  const tcoMath = useMemo(() => {
    // Realistic conservative 5-year sovereign cage/hardware vs hyperscale egress-heavy workload estimate
    const hyperscaleMonthlyCompute = rackCount * 8500;
    const hyperscaleMonthlyEgress = egressTbMonth * 85; // ~$85/TB cloud egress blended
    const hyperscaleFiveYear = (hyperscaleMonthlyCompute + hyperscaleMonthlyEgress) * 60;

    const sovereignCapexSetup = rackCount * 68000;
    const sovereignMonthlyOp = rackCount * 2900; // colocation + power + dual-hub SRE allocation
    const sovereignFiveYear = sovereignCapexSetup + sovereignMonthlyOp * 60;
    const deltaSaved = hyperscaleFiveYear - sovereignFiveYear;

    return {
      hyperscaleMonthlyEgress,
      hyperscaleFiveYear,
      sovereignCapexSetup,
      sovereignFiveYear,
      deltaSaved,
    };
  }, [rackCount, egressTbMonth]);

  const handleCopySummary = () => {
    let summary = '';
    if (activeTool === 'sla') {
      summary = `MIHORA SLA Budget Summary | Target: ${slaTarget}% | Permitted Annual Downtime: ${formatDuration(slaMath.minsPerYear)} | Permitted Monthly: ${formatDuration(slaMath.minsPerMonth)} | Estimated Annual Exposure: $${Math.round(slaMath.annualRiskUsd).toLocaleString()} (https://mihora.tech/tools/)`;
    } else if (activeTool === 'fiber') {
      summary = `MIHORA Optical Loss Budget | Span: ${fiberKm} km (${wavelength} OS2) | Splices: ${spliceCount} @ ${spliceStandard === 'mihora' ? '0.03' : '0.10'} dB | Connectors: ${connectorPairs} pairs | Total Budget (incl. 3 dB margin): ${fiberMath.totalLoss.toFixed(2)} dB (https://mihora.tech/tools/)`;
    } else {
      summary = `MIHORA 5-Year TCO Estimate | Footprint: ${rackCount} Racks | Egress: ${egressTbMonth} TB/mo | Est. 5Y Sovereign Total: $${tcoMath.sovereignFiveYear.toLocaleString()} vs Hyperscale Egress-Heavy: $${tcoMath.hyperscaleFiveYear.toLocaleString()} (https://mihora.tech/tools/)`;
    }
    navigator.clipboard.writeText(summary);
    setCopiedSpec(true);
    playUiChime('success');
    setTimeout(() => setCopiedSpec(false), 2200);
  };

  return (
    <div className="flex flex-col w-full">
      <SEOHead
        title="Engineering Calculators: SLA Downtime, Optical Loss & TCO | MIHORA.TECH"
        description="Interactive technical calculators for enterprise engineering teams: compute 99.999% SLA downtime budgets, TIA-568-D optical fiber link attenuation, and 5-year sovereign infrastructure TCO."
        canonicalPath="/tools"
        schemaData={SCHEMA_TOOLS}
      />

      {/* Header */}
      <section className="w-full bg-surface-container-lowest py-14 lg:py-20 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <Reveal>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                  <Calculator size={14} />
                  <span>Open Engineering Workbench</span>
                </div>
              </Reveal>

              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-4xl sm:text-5xl text-on-surface tracking-tight leading-[1.08]">
                  Sovereign Infrastructure &amp; Optical Budget Calculators
                </h1>
              </MaskTextReveal>

              <Reveal delay={0.12}>
                <p className="text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed">
                  Quantitative diagnostic utilities used during Phase 01 discovery to size uptime exposure,
                  single-mode OS2 optical attenuation links, and multi-year egress economics.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-outline/25 shadow-lg">
                <img
                  src={VISUAL_ASSETS.fiberOpticsHardware}
                  alt="MIHORA.TECH calibrated single-mode optical patch panel hardware"
                  className="w-full h-full object-cover"
                />
                <div data-photo-overlay="true" className="contents">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3.5 font-mono text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                    ITU-T G.652D / TIA-568-D Spec
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tool Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { id: 'sla', label: '01 · SLA Downtime Budget', icon: Activity },
              { id: 'fiber', label: '02 · Optical Fiber Loss Budget', icon: Cable },
              { id: 'tco', label: '03 · 5-Year Sovereign TCO', icon: Server },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTool === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTool(tab.id as typeof activeTool);
                    playUiChime('click');
                  }}
                  className={clsx(
                    'p-4 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer font-headline font-bold text-sm',
                    active
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-surface-container-low hover:bg-surface-container border-outline/25 text-on-surface'
                  )}
                >
                  <Icon size={18} className={active ? 'text-white' : 'text-primary'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Calculator Workspace */}
      <section className="w-full bg-surface py-14 lg:py-20 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Inputs */}
            <div className="lg:col-span-7 surface-card rounded-2xl p-6 sm:p-8 space-y-6">
              {activeTool === 'sla' && (
                <>
                  <div className="space-y-1">
                    <div className="font-mono text-xs text-primary font-bold uppercase">
                      Availability Tier Parameters
                    </div>
                    <h2 className="font-headline text-2xl font-bold text-on-surface">
                      Configure Uptime Target &amp; Outage Exposure
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-on-surface-variant font-semibold">PRESET TIER</span>
                      <span className="text-primary font-bold tabular-nums">{slaTarget}% SLA</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {SLA_PRESETS.map((preset) => (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => {
                            setSlaTarget(preset.value);
                            playUiChime('click');
                          }}
                          className={clsx(
                            'p-2.5 rounded-lg border font-mono text-xs font-semibold transition-all cursor-pointer',
                            slaTarget === preset.value
                              ? 'bg-primary text-white border-primary'
                              : 'bg-surface-container-low border-outline/20 text-on-surface hover:border-primary/40'
                          )}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex justify-between text-xs font-mono font-semibold text-on-surface-variant">
                      <span>CUSTOM UPTIME TARGET (%)</span>
                      <span className="text-on-surface font-bold tabular-nums">{slaTarget}%</span>
                    </label>
                    <input
                      type="range"
                      min={99.0}
                      max={99.999}
                      step={0.001}
                      value={slaTarget}
                      onChange={(e) => setSlaTarget(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex justify-between text-xs font-mono font-semibold text-on-surface-variant">
                      <span>ESTIMATED BUSINESS OUTAGE COST ($ / HOUR)</span>
                      <span className="text-on-surface font-bold tabular-nums">
                        ${hourlyOutageCost.toLocaleString()} / hr
                      </span>
                    </label>
                    <input
                      type="range"
                      min={1000}
                      max={250000}
                      step={1000}
                      value={hourlyOutageCost}
                      onChange={(e) => setHourlyOutageCost(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                </>
              )}

              {activeTool === 'fiber' && (
                <>
                  <div className="space-y-1">
                    <div className="font-mono text-xs text-primary font-bold uppercase">
                      ITU-T G.652.D / TIA-568-D Link Parameters
                    </div>
                    <h2 className="font-headline text-2xl font-bold text-on-surface">
                      Optical Fiber Attenuation &amp; Splice Estimator
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="font-mono text-xs font-semibold text-on-surface-variant uppercase">
                        Wavelength Band
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {(['1310nm', '1550nm'] as const).map((wl) => (
                          <button
                            key={wl}
                            type="button"
                            onClick={() => {
                              setWavelength(wl);
                              playUiChime('click');
                            }}
                            className={clsx(
                              'py-2.5 px-3 rounded-lg border font-mono text-xs font-bold cursor-pointer transition-all',
                              wavelength === wl
                                ? 'bg-primary text-white border-primary'
                                : 'bg-surface-container-low border-outline/20 text-on-surface'
                            )}
                          >
                            {wl} ({wl === '1310nm' ? '0.35' : '0.22'} dB/km)
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-xs font-semibold text-on-surface-variant uppercase">
                        Fusion Splice Benchmark
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSpliceStandard('mihora');
                            playUiChime('click');
                          }}
                          className={clsx(
                            'py-2.5 px-3 rounded-lg border font-mono text-xs font-bold cursor-pointer transition-all',
                            spliceStandard === 'mihora'
                              ? 'bg-primary text-white border-primary'
                              : 'bg-surface-container-low border-outline/20 text-on-surface'
                          )}
                        >
                          MIHORA (0.03 dB)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSpliceStandard('tia');
                            playUiChime('click');
                          }}
                          className={clsx(
                            'py-2.5 px-3 rounded-lg border font-mono text-xs font-bold cursor-pointer transition-all',
                            spliceStandard === 'tia'
                              ? 'bg-primary text-white border-primary'
                              : 'bg-surface-container-low border-outline/20 text-on-surface'
                          )}
                        >
                          TIA Max (0.10 dB)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1.5">
                        <span className="text-on-surface-variant font-semibold">SPAN DISTANCE (KM)</span>
                        <span className="text-primary font-bold tabular-nums">{fiberKm} km</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={120}
                        value={fiberKm}
                        onChange={(e) => setFiberKm(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1.5">
                        <span className="text-on-surface-variant font-semibold">FUSION SPLICES</span>
                        <span className="text-primary font-bold tabular-nums">{spliceCount} splices</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={60}
                        value={spliceCount}
                        onChange={(e) => setSpliceCount(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1.5">
                        <span className="text-on-surface-variant font-semibold">
                          MATED CONNECTOR PAIRS (0.5 dB TIA Allowance)
                        </span>
                        <span className="text-primary font-bold tabular-nums">{connectorPairs} pairs</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={16}
                        value={connectorPairs}
                        onChange={(e) => setConnectorPairs(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTool === 'tco' && (
                <>
                  <div className="space-y-1">
                    <div className="font-mono text-xs text-primary font-bold uppercase">
                      Infrastructure Economics Model
                    </div>
                    <h2 className="font-headline text-2xl font-bold text-on-surface">
                      Sovereign Hardware + Colocation vs. Cloud Egress Cost
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1.5">
                        <span className="text-on-surface-variant font-semibold">
                          DEDICATED 42U RACK FOOTPRINT
                        </span>
                        <span className="text-primary font-bold tabular-nums">{rackCount} Racks</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={24}
                        value={rackCount}
                        onChange={(e) => setRackCount(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1.5">
                        <span className="text-on-surface-variant font-semibold">
                          MONTHLY DATA EGRESS VOLUME (TB)
                        </span>
                        <span className="text-primary font-bold tabular-nums">
                          {egressTbMonth} TB / mo
                        </span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={1000}
                        step={10}
                        value={egressTbMonth}
                        onChange={(e) => setEgressTbMonth(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Directional 60-month baseline comparing dedicated 42U hardware + colocation + dual-hub
                    SRE against high-egress multi-tenant hyperscale workloads billed per TB transferred.
                  </p>
                </>
              )}
            </div>

            {/* Live Computed Output Panel */}
            <div className="lg:col-span-5 surface-card rounded-2xl p-6 sm:p-8 border-primary/30 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-outline/15">
                <span className="font-mono text-xs font-bold uppercase text-primary">
                  Computed Engineering Output
                </span>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary hover:underline cursor-pointer"
                >
                  {copiedSpec ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedSpec ? 'Copied Spec' : 'Copy Spec'}</span>
                </button>
              </div>

              {activeTool === 'sla' && (
                <div className="space-y-3 font-mono">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline/15">
                    <div className="text-[10px] uppercase text-on-surface-variant">
                      Permitted Annual Downtime
                    </div>
                    <div className="text-2xl font-extrabold text-primary mt-0.5 tabular-nums">
                      {formatDuration(slaMath.minsPerYear)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline/15">
                      <div className="text-[10px] uppercase text-on-surface-variant">Quarterly</div>
                      <div className="text-sm font-bold text-on-surface mt-0.5 tabular-nums">
                        {formatDuration(slaMath.minsPerQuarter)}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline/15">
                      <div className="text-[10px] uppercase text-on-surface-variant">Monthly</div>
                      <div className="text-sm font-bold text-on-surface mt-0.5 tabular-nums">
                        {formatDuration(slaMath.minsPerMonth)}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline/15">
                    <div className="text-[10px] uppercase text-on-surface-variant">
                      Permitted Annual Financial Outage Exposure
                    </div>
                    <div className="text-xl font-extrabold text-on-surface mt-0.5 tabular-nums">
                      ${Math.round(slaMath.annualRiskUsd).toLocaleString()} / yr
                    </div>
                  </div>
                </div>
              )}

              {activeTool === 'fiber' && (
                <div className="space-y-3 font-mono">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline/15">
                    <div className="text-[10px] uppercase text-on-surface-variant">
                      Total End-to-End Link Budget (Incl. 3.0 dB Repair Margin)
                    </div>
                    <div className="text-2xl font-extrabold text-primary mt-0.5 tabular-nums">
                      {fiberMath.totalLoss.toFixed(2)} dB
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-3 rounded-lg bg-surface-container-low border border-outline/15">
                      <div className="text-[10px] text-on-surface-variant">FIBER</div>
                      <div className="font-bold text-on-surface mt-0.5 tabular-nums">
                        {fiberMath.fiberLoss.toFixed(2)} dB
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-container-low border border-outline/15">
                      <div className="text-[10px] text-on-surface-variant">SPLICES</div>
                      <div className="font-bold text-on-surface mt-0.5 tabular-nums">
                        {fiberMath.spliceLoss.toFixed(2)} dB
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-container-low border border-outline/15">
                      <div className="text-[10px] text-on-surface-variant">CONNECTORS</div>
                      <div className="font-bold text-on-surface mt-0.5 tabular-nums">
                        {fiberMath.connLoss.toFixed(2)} dB
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-600/10 border border-emerald-600/25 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                    Optical Margin Saved vs. Generic 0.10 dB Field Splicing:{' '}
                    +{fiberMath.headroomSaved.toFixed(2)} dB
                  </div>
                </div>
              )}

              {activeTool === 'tco' && (
                <div className="space-y-3 font-mono">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline/15">
                    <div className="text-[10px] uppercase text-on-surface-variant">
                      Projected 5-Year Net Custody Savings
                    </div>
                    <div className="text-2xl font-extrabold text-primary mt-0.5 tabular-nums">
                      {tcoMath.deltaSaved >= 0
                        ? `+$${Math.round(tcoMath.deltaSaved).toLocaleString()} Saved`
                        : `-$${Math.abs(Math.round(tcoMath.deltaSaved)).toLocaleString()}`}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline/15">
                      <div className="text-[10px] text-on-surface-variant">SOVEREIGN 5Y</div>
                      <div className="text-sm font-bold text-on-surface mt-0.5 tabular-nums">
                        ${tcoMath.sovereignFiveYear.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline/15">
                      <div className="text-[10px] text-on-surface-variant">HYPERSCALE 5Y</div>
                      <div className="text-sm font-bold text-on-surface mt-0.5 tabular-nums">
                        ${tcoMath.hyperscaleFiveYear.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Link
                to="/contact/"
                onClick={() => playUiChime('click')}
                className="w-full py-3.5 px-4 btn-primary-gradient rounded-xl font-semibold text-xs text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Validate Scope With MIHORA Architects</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources Footer Band */}
      <section className="w-full bg-surface-container-lowest py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap gap-5">
            <Link to="/resources/" className="text-primary font-semibold hover:underline">
              Standards &amp; TIA-568 Reference Tables →
            </Link>
            <Link to="/solutions/#sovereign-rfp-builder" className="text-primary font-semibold hover:underline">
              Sovereign RFP Specifier →
            </Link>
            <Link to="/compare/" className="text-primary font-semibold hover:underline">
              Compare Sovereign vs. Cloud Lock-In →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
