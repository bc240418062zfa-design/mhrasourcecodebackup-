import React, { useState, useEffect } from 'react';
import { 
  Activity, ShieldCheck, CheckCircle2, AlertTriangle, Clock, 
  Server, Cpu, Wifi, Globe, RefreshCw, Layers, ArrowUpRight, 
  Radio, HardDrive, Zap, Lock, Terminal
} from 'lucide-react';
import { playUiChime } from '../utils/audio';

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
    specs: 'Dual 100GbE Uplinks • Sovereign UK Edge Scrubbing • BGP ASN Protected'
  },
  {
    id: 'node-isb-01',
    name: 'Islamabad Sovereign Datacenter Cluster',
    location: 'Islamabad, Pakistan (Tier IV National Sovereign Facility)',
    type: 'Primary Compute & Air-Gapped Core',
    status: 'operational',
    uptime90Days: 100.000,
    latencyMs: 8.2,
    specs: '2N Power Redundancy • Dedicated Substation Feeds • Physical HSM Hardware'
  },
  {
    id: 'node-dwdm-ring',
    name: 'Trans-Continental Optical DWDM Backbone',
    location: 'London ↔ Islamabad Trans-Eurasian Fiber Highway',
    type: 'Optical Transport (Layer 1)',
    status: 'operational',
    uptime90Days: 99.998,
    latencyMs: 82.1,
    specs: '64-Channel Coherent Optics • Core-Alignment ≤0.03dB Splices • Dual-Homed'
  },
  {
    id: 'node-bgp-scrub',
    name: 'Sovereign Edge DDoS Mitigation Core',
    location: 'Global Edge Anycast Nodes',
    type: 'Layer 3/4 Shield',
    status: 'operational',
    uptime90Days: 100.000,
    latencyMs: 4.6,
    specs: '3.2 Tbps Line-Rate Scrubbing • Autonomous BGP Flowspec • Zero Latency Penalty'
  },
  {
    id: 'node-sre-desk',
    name: '24/7 Sovereign SRE Watchdesk & Kinetic Dispatch',
    location: 'Dual Command Centers (London & Islamabad)',
    type: 'Human-in-the-Loop Operations',
    status: 'operational',
    uptime90Days: 100.000,
    latencyMs: 0.1,
    specs: 'L3 Principal Engineers On-Deck • Sub-15min Kinetic Field Dispatch • OTDR Rapid Response'
  },
  {
    id: 'node-fiber-telemetry',
    name: 'OTDR Real-Time Optical Loop Telemetry',
    location: 'Terrestrial & Metro Fiber Rings',
    type: 'Physical Optics Monitoring',
    status: 'operational',
    uptime90Days: 99.999,
    latencyMs: 1.8,
    specs: 'Continuous 1550nm/1625nm Active Fiber Probing • Micro-Bending Early Warning'
  }
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
    jitterMs: 0.08
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
        activeThroughput: Number((4.80 + Math.random() * 0.25).toFixed(2)),
        jitterMs: Number((0.06 + Math.random() * 0.05).toFixed(2))
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
    <div className="w-full bg-surface min-h-screen pt-20 pb-space-xl">
      
      {/* Top Banner Status Bar */}
      <section className="w-full bg-surface-container-low border-b border-outline/20 px-margin-mobile lg:px-margin py-space-lg">
        <div className="max-w-7xl mx-auto space-y-space-md">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>ALL SOVEREIGN SYSTEMS OPERATIONAL</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-black uppercase tracking-tight">
                Infrastructure &amp; Mission Control Telemetry
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Real-time operational status, network heartbeats, and 90-day SLA performance across MIHORA’s dual command hubs in London (UK) and Islamabad (Pakistan).
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-3.5 py-2 rounded-xl bg-surface-container border border-outline/30 font-mono text-xs text-on-surface-variant flex items-center gap-2">
                <Clock size={14} className="text-secondary" />
                <span>POLL: {lastRefreshed}</span>
              </div>

              <button
                id="btn-status-refresh"
                onClick={refreshTelemetry}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-mono text-xs font-bold rounded-xl shadow-md hover:bg-primary/90 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                <span>{refreshing ? 'QUERYING...' : 'LIVE REFRESH'}</span>
              </button>
            </div>
          </div>

          {/* Real-time KPI Quick Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-space-xs font-mono">
            <div className="p-3 bg-surface-container rounded-xl border border-outline/20 space-y-1">
              <div className="text-[10px] text-outline uppercase font-bold">Aggregate Uptime</div>
              <div className="text-lg font-black text-emerald-500">99.999%</div>
              <div className="text-[10px] text-on-surface-variant">SLA Compliant</div>
            </div>

            <div className="p-3 bg-surface-container rounded-xl border border-outline/20 space-y-1">
              <div className="text-[10px] text-outline uppercase font-bold">LON ↔ ISB RTT</div>
              <div className="text-lg font-black text-primary">{telemetryValues.transContinentalLatency} ms</div>
              <div className="text-[10px] text-on-surface-variant">Protected Terrestrial</div>
            </div>

            <div className="p-3 bg-surface-container rounded-xl border border-outline/20 space-y-1">
              <div className="text-[10px] text-outline uppercase font-bold">Optical Jitter</div>
              <div className="text-lg font-black text-secondary">{telemetryValues.jitterMs} ms</div>
              <div className="text-[10px] text-on-surface-variant">DWDM PAM4 Coherent</div>
            </div>

            <div className="p-3 bg-surface-container rounded-xl border border-outline/20 space-y-1">
              <div className="text-[10px] text-outline uppercase font-bold">Datacenter PUE</div>
              <div className="text-lg font-black text-emerald-500">{telemetryValues.pueIndex}</div>
              <div className="text-[10px] text-on-surface-variant">Liquid / Cold Aisle</div>
            </div>

            <div className="p-3 bg-surface-container rounded-xl border border-outline/20 space-y-1">
              <div className="text-[10px] text-outline uppercase font-bold">Edge Throughput</div>
              <div className="text-lg font-black text-on-surface">{telemetryValues.activeThroughput} Tbps</div>
              <div className="text-[10px] text-on-surface-variant">Line-Rate BGP Anycast</div>
            </div>

            <div className="p-3 bg-surface-container rounded-xl border border-outline/20 space-y-1">
              <div className="text-[10px] text-outline uppercase font-bold">SRE On-Deck</div>
              <div className="text-lg font-black text-secondary">ACTIVE</div>
              <div className="text-[10px] text-on-surface-variant">Dual 24/7 Command</div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Core Systems Grid */}
      <section className="w-full px-margin-mobile lg:px-margin py-space-xl">
        <div className="max-w-7xl mx-auto space-y-space-xl">
          
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-xs border-b border-outline/20">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold uppercase tracking-wide">
              Core Systems Operational Status
            </h2>
            <div className="font-mono text-xs text-outline flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Independent Monitoring via Continuous Heartbeats</span>
            </div>
          </div>

          {/* Nodes List */}
          <div className="space-y-space-md">
            {SYSTEM_NODES.map((node) => (
              <div
                key={node.id}
                id={`status-${node.id}`}
                className="p-space-md bg-surface-container-lowest rounded-2xl border border-outline/30 hover:border-primary/40 hover:shadow-lg transition-all space-y-space-sm"
              >
                {/* Node Title Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                        {node.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>OPERATIONAL</span>
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {node.location} • <span className="font-mono text-xs font-semibold text-primary">{node.type}</span>
                    </p>
                  </div>

                  {/* Uptime and Latency */}
                  <div className="flex items-center gap-space-md font-mono text-xs">
                    <div className="text-right">
                      <div className="text-outline text-[10px]">90-DAY UPTIME</div>
                      <div className="text-sm font-black text-emerald-500">{node.uptime90Days}%</div>
                    </div>
                    <div className="text-right border-l border-outline/20 pl-space-sm">
                      <div className="text-outline text-[10px]">INTERNAL RTT</div>
                      <div className="text-sm font-black text-on-surface">{node.latencyMs} ms</div>
                    </div>
                  </div>
                </div>

                {/* Technical Specs Callout */}
                <div className="font-mono text-xs text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-lg border border-outline/20">
                  <span className="text-primary font-bold">// HARDWARE TOPOLOGY: </span>
                  {node.specs}
                </div>

                {/* 90-Day Uptime Visualization Bars */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between font-mono text-[11px] text-outline">
                    <span>90 days ago</span>
                    <span className="text-emerald-500 font-bold">100.0% operational (0 outages recorded)</span>
                    <span>Today</span>
                  </div>

                  {/* 45 Uptime Ticks (Each represents 2 days) */}
                  <div className="grid grid-cols-45 gap-1 h-7">
                    {Array.from({ length: 45 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="bg-emerald-500 hover:bg-emerald-400 transition-colors rounded-sm h-full w-full cursor-pointer relative group"
                        title={`Day ${90 - (45 - idx) * 2}: 100% Uptime, No incidents recorded.`}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-surface-container-highest text-on-surface text-[10px] font-mono px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 border border-outline/30">
                          Day -{90 - idx * 2}: 100% Uptime (Normal)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Incident History & Maintenance Log */}
          <div className="p-space-lg bg-surface-container-low rounded-2xl border border-outline/30 space-y-space-md">
            <div className="flex items-center justify-between border-b border-outline/20 pb-space-xs">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold uppercase tracking-wide">
                Incident &amp; Maintenance Journal
              </h3>
              <span className="font-mono text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                0 ACTIVE INCIDENTS
              </span>
            </div>

            <div className="space-y-space-sm font-mono text-xs">
              <div className="p-space-sm bg-surface-container rounded-xl border border-outline/20 space-y-1.5">
                <div className="flex items-center justify-between text-outline">
                  <span className="text-primary font-bold">[COMPLETED MAINTENANCE] London Telehouse Cross-Connect Upgrade</span>
                  <span>September 18, 2026 • 02:00 - 03:15 UTC</span>
                </div>
                <p className="text-on-surface-variant font-sans text-xs">
                  Redundant 100G LC/MPO optics were hot-swapped to newer coherent 800G QSFP-DD interfaces with sub-0.03dB fusion splices. Traffic shifted gracefully to secondary diverse path with zero dropped packets.
                </p>
              </div>

              <div className="p-space-sm bg-surface-container rounded-xl border border-outline/20 space-y-1.5">
                <div className="flex items-center justify-between text-outline">
                  <span className="text-primary font-bold">[COMPLETED MAINTENANCE] Islamabad Tier-IV Generator Load Testing</span>
                  <span>September 04, 2026 • 01:00 - 02:30 UTC</span>
                </div>
                <p className="text-on-surface-variant font-sans text-xs">
                  Routine automated switchover to dual 2.5 MVA Cummins generator sets under simulated 100% full facility load. All UPS flywheels and static transfer switches operated within zero-break tolerance.
                </p>
              </div>
            </div>
          </div>

          {/* Subscribe to Incident Notifications */}
          <div className="p-space-lg bg-surface-container-lowest rounded-2xl border border-outline/30 flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="space-y-1 max-w-xl text-center md:text-left">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Subscribe to Sovereign Infrastructure Telemetry
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Receive real-time automated webhook alerts and cryptographic maintenance advisories directly to your engineering dispatch or NOC.
              </p>
            </div>

            {emailSubscribed ? (
              <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>NOC DISPATCH SUBSCRIBED: {subscriberEmail}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
                <input
                  type="email"
                  required
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  placeholder="noc@enterprise.com"
                  className="px-4 py-2.5 bg-surface-container border border-outline/30 rounded-xl font-mono text-xs text-on-surface focus:outline-none focus:border-primary w-full md:w-72"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-on-primary font-mono text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
