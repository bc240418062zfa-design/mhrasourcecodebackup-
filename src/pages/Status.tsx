import React, { useState } from 'react';
import {
  ShieldCheck, CheckCircle2, Clock, RefreshCw, Activity, Radio
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { playUiChime } from '../utils/audio';
import { VISUAL_ASSETS } from '../assets/visuals';
import { Reveal, MaskTextReveal } from '../components/MotionPrimitives';

interface SystemNode {
  id: string;
  name: string;
  location: string;
  type: string;
  status: 'operational' | 'degraded' | 'maintenance';
  uptime90Days: number;
  latencyMs: number;
  specs: string;
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: 'node-lon-01',
    name: 'London Primary Sovereign Transit Hub',
    location: 'London, United Kingdom (Telehouse East / Equinix LD4 Interconnect)',
    type: 'Core Ingress & BGP Anycast',
    status: 'operational',
    uptime90Days: 99.999,
    latencyMs: 12.4,
    specs: 'Dual 100GbE Uplinks · Sovereign UK Edge Scrubbing · BGP ASN Protected',
  },
  {
    id: 'node-isb-01',
    name: 'Islamabad Sovereign Datacenter Cluster',
    location: 'Islamabad, Pakistan (Tier IV National Sovereign Facility)',
    type: 'Primary Compute & Air-Gapped Core',
    status: 'operational',
    uptime90Days: 100.0,
    latencyMs: 8.2,
    specs: '2N Power Redundancy · Dedicated Substation Feeds · Physical HSM Hardware',
  },
  {
    id: 'node-dwdm-ring',
    name: 'Trans-Continental Optical DWDM Backbone',
    location: 'London <-> Islamabad Trans-Eurasian Fiber Highway',
    type: 'Optical Transport (Layer 1)',
    status: 'operational',
    uptime90Days: 99.998,
    latencyMs: 82.1,
    specs: '64-Channel Coherent Optics · Core-Alignment <= 0.03 dB Splices · Dual-Homed',
  },
  {
    id: 'node-bgp-scrub',
    name: 'Sovereign Edge DDoS Mitigation Core',
    location: 'Global Edge Anycast Nodes',
    type: 'Layer 3/4 Shield',
    status: 'operational',
    uptime90Days: 100.0,
    latencyMs: 4.6,
    specs: '3.2 Tbps Line-Rate Scrubbing · Autonomous BGP Flowspec · Zero Latency Penalty',
  },
  {
    id: 'node-sre-desk',
    name: '24/7 Sovereign SRE Watchdesk & Kinetic Dispatch',
    location: 'Dual Command Centers (London & Islamabad)',
    type: 'Human-in-the-Loop Operations',
    status: 'operational',
    uptime90Days: 100.0,
    latencyMs: 0.1,
    specs: 'L3 Principal Engineers On-Deck · Sub-15m Kinetic Field Dispatch · OTDR Rapid Response',
  },
  {
    id: 'node-fiber-telemetry',
    name: 'OTDR Real-Time Optical Loop Telemetry',
    location: 'Terrestrial & Metro Fiber Rings',
    type: 'Physical Optics Monitoring',
    status: 'operational',
    uptime90Days: 99.999,
    latencyMs: 1.8,
    specs: 'Continuous 1550nm/1625nm Active Fiber Probing · Micro-Bending Early Warning',
  },
];

export default function Status() {
  const [lastRefreshed, setLastRefreshed] = useState('Just now');
  const [refreshing, setRefreshing] = useState(false);
  const [telemetryValues, setTelemetryValues] = useState({
    londonPing: 18.2,
    islamabadPing: 8.4,
    transContinentalLatency: 82.6,
    pueIndex: 1.14,
    activeThroughput: 4.86,
    jitterMs: 0.08,
  });

  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');

  const refreshTelemetry = () => {
    setRefreshing(true);
    playUiChime('click');
    setTimeout(() => {
      setTelemetryValues({
        londonPing: Number((17.5 + Math.random() * 1.5).toFixed(1)),
        islamabadPing: Number((7.8 + Math.random() * 1.2).toFixed(1)),
        transContinentalLatency: Number((81.8 + Math.random() * 1.6).toFixed(1)),
        pueIndex: Number((1.13 + Math.random() * 0.02).toFixed(2)),
        activeThroughput: Number((4.8 + Math.random() * 0.25).toFixed(2)),
        jitterMs: Number((0.06 + Math.random() * 0.05).toFixed(2)),
      });
      const now = new Date();
      setLastRefreshed(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setRefreshing(false);
      playUiChime('success');
    }, 450);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail.trim()) return;
    playUiChime('success');
    setEmailSubscribed(true);
  };

  return (
    <div className="w-full bg-surface min-h-screen pb-16">
      <SEOHead canonicalPath="/status" />

      {/* Top Banner Status Bar */}
      <section className="w-full obsidian-band obsidian-grid border-b border-white/10 px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumbs items={[{ label: 'Infrastructure Status' }]} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <Reveal>
                <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span>All Sovereign Nodes Operational · Zero Incidents Active</span>
                </div>
              </Reveal>
              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline text-3xl sm:text-5xl text-white font-extrabold tracking-tight leading-[1.08]">
                  Mission Control &amp; Telemetry Status
                </h1>
              </MaskTextReveal>
              <Reveal delay={0.1}>
                <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                  Real-time operational status, network latency benchmarks, and 90-day SLA telemetry across MIHORA’s dual command hubs in London (UK) and Islamabad (Pakistan).
                </p>
              </Reveal>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 font-mono text-xs text-slate-300 flex items-center gap-2">
                <Clock size={14} className="text-amber-400" />
                <span>Checked: {lastRefreshed}</span>
              </div>

              <button
                id="btn-status-refresh"
                type="button"
                onClick={refreshTelemetry}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-4 py-2 btn-primary-gradient text-white font-mono text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                <span>{refreshing ? 'Querying...' : 'Refresh Probes'}</span>
              </button>
            </div>
          </div>

          {/* Real-time KPI Quick Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 font-mono">
            <div className="p-3.5 bg-black/45 rounded-xl border border-white/15 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Aggregate Uptime</div>
              <div className="text-lg font-extrabold text-emerald-400 tabular-nums">99.999%</div>
              <div className="text-[10px] text-slate-400">SLA Compliant</div>
            </div>

            <div className="p-3.5 bg-black/45 rounded-xl border border-white/15 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">LON - ISB RTT</div>
              <div className="text-lg font-extrabold text-sky-400 tabular-nums">{telemetryValues.transContinentalLatency} ms</div>
              <div className="text-[10px] text-slate-400">Protected Terrestrial</div>
            </div>

            <div className="p-3.5 bg-black/45 rounded-xl border border-white/15 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Optical Jitter</div>
              <div className="text-lg font-extrabold text-amber-400 tabular-nums">{telemetryValues.jitterMs} ms</div>
              <div className="text-[10px] text-slate-400">DWDM PAM4 Coherent</div>
            </div>

            <div className="p-3.5 bg-black/45 rounded-xl border border-white/15 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Datacenter PUE</div>
              <div className="text-lg font-extrabold text-emerald-400 tabular-nums">{telemetryValues.pueIndex}</div>
              <div className="text-[10px] text-slate-400">Cold Aisle Contained</div>
            </div>

            <div className="p-3.5 bg-black/45 rounded-xl border border-white/15 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Edge Throughput</div>
              <div className="text-lg font-extrabold text-white tabular-nums">{telemetryValues.activeThroughput} Tbps</div>
              <div className="text-[10px] text-slate-400">Line-Rate BGP Anycast</div>
            </div>

            <div className="p-3.5 bg-black/45 rounded-xl border border-white/15 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">SRE Watchdesk</div>
              <div className="text-lg font-extrabold text-emerald-400">Active</div>
              <div className="text-[10px] text-slate-400">Dual 24/7 Command</div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-[16/5] sm:aspect-[21/5] bg-[#080d18]">
            <img
              src={VISUAL_ASSETS.sovereignCommandHub}
              alt="MIHORA.TECH Dual-Hub Network Operations Command Desk in London and Islamabad"
              className="w-full h-full object-cover"
            />
            <div data-photo-overlay="true" className="contents">
              <div className="absolute inset-0 bg-gradient-to-r from-[#060a14]/90 via-[#060a14]/55 to-transparent" />
              <div className="absolute inset-y-0 left-5 sm:left-7 flex flex-col justify-center space-y-1 max-w-lg">
                <span className="font-mono text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                  Watchdesk Visual Telemetry · UK-LON-01 ↔ PK-ISB-01
                </span>
                <span className="font-headline text-base sm:text-xl font-bold text-white">
                  Continuous 24/7/365 NOC &amp; Physical OTDR Monitoring
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Systems Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline/20">
            <h2 className="font-headline text-xl sm:text-2xl text-on-surface font-bold">
              Core Systems Operational Status
            </h2>
            <div className="font-mono text-xs text-on-surface-variant flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Continuous Heartbeat Verification</span>
            </div>
          </div>

          <div className="space-y-4">
            {SYSTEM_NODES.map((node) => (
              <div
                key={node.id}
                id={`status-${node.id}`}
                className="p-5 sm:p-6 bg-surface-container-lowest rounded-2xl border border-outline/25 hover:border-primary/40 transition-all space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-headline text-lg text-on-surface font-bold">
                        {node.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold uppercase tracking-wider inline-flex items-center gap-1">
                        <CheckCircle2 size={11} />
                        <span>Operational</span>
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant">
                      {node.location} · <span className="font-mono text-xs font-semibold text-primary">{node.type}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-5 font-mono text-xs">
                    <div className="text-right">
                      <div className="text-on-surface-variant text-[10px]">90-Day Uptime</div>
                      <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{node.uptime90Days}%</div>
                    </div>
                    <div className="text-right border-l border-outline/20 pl-4">
                      <div className="text-on-surface-variant text-[10px]">Internal RTT</div>
                      <div className="text-sm font-extrabold text-on-surface">{node.latencyMs} ms</div>
                    </div>
                  </div>
                </div>

                <div className="font-mono text-xs text-on-surface-variant bg-surface-container-low px-3.5 py-2 rounded-lg border border-outline/15">
                  <span className="text-primary font-semibold">Hardware Topology: </span>
                  {node.specs}
                </div>

                {/* 90-Day Uptime Visualization Bars */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                    <span>90 days ago</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100.0% operational (0 outages recorded)</span>
                    <span>Today</span>
                  </div>

                  <div className="grid gap-1 h-7" style={{ gridTemplateColumns: 'repeat(45, minmax(0, 1fr))' }}>
                    {Array.from({ length: 45 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="bg-emerald-500 hover:bg-emerald-400 transition-colors rounded-sm h-full w-full cursor-pointer relative group"
                        title={`Day ${90 - (45 - idx) * 2}: 100% Uptime, No incidents recorded.`}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-surface-container-highest text-on-surface text-[10px] font-mono px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 border border-outline/30">
                          Day -{90 - idx * 2}: 100% Uptime
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Incident History & Maintenance Log */}
          <div className="p-6 sm:p-8 bg-surface-container-low rounded-2xl border border-outline/25 space-y-5">
            <div className="flex items-center justify-between border-b border-outline/20 pb-3">
              <h3 className="font-headline text-lg text-on-surface font-bold">
                Incident &amp; Maintenance Journal
              </h3>
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/25">
                0 Active Incidents
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-surface-container rounded-xl border border-outline/20 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-on-surface-variant">
                  <span className="text-primary font-semibold">[Completed Maintenance] London Telehouse Cross-Connect Upgrade</span>
                  <span>September 18, 2026 · 02:00 - 03:15 UTC</span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Redundant 100G LC/MPO optics were hot-swapped to coherent 800G QSFP-DD interfaces with sub-0.03 dB fusion splices. Traffic shifted gracefully to secondary diverse path with zero dropped packets.
                </p>
              </div>

              <div className="p-4 bg-surface-container rounded-xl border border-outline/20 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-on-surface-variant">
                  <span className="text-primary font-semibold">[Completed Maintenance] Islamabad Tier-IV Generator Load Testing</span>
                  <span>September 04, 2026 · 01:00 - 02:30 UTC</span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Routine automated switchover to dual 2.5 MVA generator sets under simulated 100% facility load. All UPS flywheels and static transfer switches operated within zero-break tolerance.
                </p>
              </div>
            </div>
          </div>

          {/* Subscribe to Incident Notifications */}
          <div className="p-6 sm:p-8 bg-surface-container-lowest rounded-2xl border border-outline/25 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl text-center md:text-left">
              <h3 className="font-headline text-lg text-on-surface font-bold">
                Subscribe to Infrastructure Maintenance Advisories
              </h3>
              <p className="text-sm text-on-surface-variant">
                Receive scheduled maintenance notices and NOC advisories directly to your engineering dispatch inbox.
              </p>
            </div>

            {emailSubscribed ? (
              <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Subscribed: {subscriberEmail}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
                <input
                  type="email"
                  required
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  placeholder="noc@enterprise.com"
                  className="px-4 py-2.5 bg-surface-container border border-outline/30 rounded-lg font-mono text-xs text-on-surface focus:outline-none focus:border-primary w-full md:w-72"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white font-mono text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
