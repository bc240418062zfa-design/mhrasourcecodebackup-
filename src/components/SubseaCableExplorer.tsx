import React, { useState } from 'react';
import { 
  Globe, Radio, ShieldCheck, Activity, AlertOctagon, 
  CheckCircle2, ArrowRight, Zap, RefreshCw, Cpu, Layers, HardDrive
} from 'lucide-react';
import { playUiChime } from '../utils/audio';

interface CableRoute {
  id: string;
  name: string;
  type: 'Subsea Optical Cable' | 'Terrestrial Dark Fiber';
  span: string;
  lengthKm: number;
  capacityTbps: number;
  latencyMs: number;
  landingStations: string[];
  sovereignRating: 'Tier-1 Air-Gap Immune' | 'Tier-2 High Sovereign' | 'Tier-2 Protected Standard';
  description: string;
  primaryUseCase: string;
}

const TRANSIT_ROUTES: CableRoute[] = [
  {
    id: 'route-terrestrial',
    name: 'Trans-Eurasian Terrestrial Sovereign Backbone',
    type: 'Terrestrial Dark Fiber',
    span: 'Islamabad (Pakistan) ↔ Central Asia ↔ Western Europe ↔ London (UK)',
    lengthKm: 8900,
    capacityTbps: 38.4,
    latencyMs: 78.4,
    landingStations: ['Islamabad Sovereign Cluster', 'Tashkent Repeater', 'Frankfurt IX', 'London Telehouse'],
    sovereignRating: 'Tier-1 Air-Gap Immune',
    description: 'Direct inland buried fiber optic highway traversing sovereign landmasses. Completely immune to maritime anchor drags, undersea seismic tremors, and naval choke point interdictions.',
    primaryUseCase: 'Defense telemetry, central bank real-time gross settlement (RTGS), zero-exposure diplomatic comms.'
  },
  {
    id: 'route-peace',
    name: 'PEACE Subsea Cable System (Pakistan-Europe-Africa)',
    type: 'Subsea Optical Cable',
    span: 'Gwadar & Karachi (Pakistan) ↔ Djibouti ↔ Egypt ↔ Marseille ↔ London',
    lengthKm: 15000,
    capacityTbps: 96.0,
    latencyMs: 82.2,
    landingStations: ['Gwadar Landing Station', 'Karachi Landing Hub', 'Marseille MRS1', 'London Slough'],
    sovereignRating: 'Tier-2 High Sovereign',
    description: 'Ultra-high-density 200G PAM4 coherent subsea trunk providing high-throughput transit between South Asia, the Mediterranean basin, and Western Europe.',
    primaryUseCase: 'High-bandwidth enterprise peering, cloud replication, sovereign academic research exchange.'
  },
  {
    id: 'route-smw5',
    name: 'SMW5 (South East Asia - Middle East - Western Europe)',
    type: 'Subsea Optical Cable',
    span: 'Karachi (Pakistan) ↔ Arabian Gulf ↔ Red Sea ↔ Sicily ↔ Marseille',
    lengthKm: 20000,
    capacityTbps: 24.0,
    latencyMs: 89.6,
    landingStations: ['Karachi Hub', 'Fujairah', 'Suez Canal Diversion', 'Palermo Landing'],
    sovereignRating: 'Tier-2 Protected Standard',
    description: 'Multi-party consortium trans-oceanic trunk line utilized by MIHORA for bulk data egress redundancy and diverse regional peering.',
    primaryUseCase: 'Global internet transit, fallback content delivery, wholesale data carrier interconnect.'
  },
  {
    id: 'route-domestic-ring',
    name: 'Pakistan National Sovereign Dark Fiber Ring',
    type: 'Terrestrial Dark Fiber',
    span: 'Islamabad ↔ Rawalpindi ↔ Lahore ↔ Multan ↔ Karachi ↔ Gwadar',
    lengthKm: 2400,
    capacityTbps: 64.0,
    latencyMs: 11.4,
    landingStations: ['Islamabad Command Hub', 'Lahore Core Node', 'Karachi Cable Gateway', 'Gwadar Free Zone'],
    sovereignRating: 'Tier-1 Air-Gap Immune',
    description: 'Continuous G.652D/G.657A2 singlemode dark fiber ring with dedicated core-alignment splices (≤ 0.03 dB) and autonomous optical protection switching (OPS).',
    primaryUseCase: 'Inter-datacenter replication, sovereign government cloud, national financial switch rails.'
  }
];

export function SubseaCableExplorer() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-terrestrial');
  const [simulatedSubseaCut, setSimulatedSubseaCut] = useState<boolean>(false);
  const [failoverTelemetry, setFailoverTelemetry] = useState<{
    rerouteTimeMs: number;
    packetLoss: string;
    activeCarrier: string;
  }>({
    rerouteTimeMs: 0,
    packetLoss: '0.000%',
    activeCarrier: 'Optimal Dual-Path Balancing'
  });

  const activeRoute = TRANSIT_ROUTES.find(r => r.id === selectedRouteId) || TRANSIT_ROUTES[0];

  const toggleSimulation = () => {
    playUiChime('click');
    if (!simulatedSubseaCut) {
      setSimulatedSubseaCut(true);
      setFailoverTelemetry({
        rerouteTimeMs: 14.8,
        packetLoss: '0.000%',
        activeCarrier: 'Autonomous Terrestrial Dark Fiber Failover Active (Zero Packet Loss)'
      });
      playUiChime('action');
    } else {
      setSimulatedSubseaCut(false);
      setFailoverTelemetry({
        rerouteTimeMs: 0,
        packetLoss: '0.000%',
        activeCarrier: 'Optimal Dual-Path Balancing'
      });
      playUiChime('success');
    }
  };

  return (
    <section id="subsea-cable-explorer" className="w-full bg-surface-container-low px-margin-mobile lg:px-margin py-space-xl border-b border-outline/20">
      <div className="max-w-7xl mx-auto space-y-space-lg">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md border-b border-outline/20 pb-space-md">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-lg text-primary font-mono text-xs font-bold uppercase tracking-widest border border-outline/30">
              <Globe size={13} className="text-secondary" />
              <span>GLOBAL TRANSIT ARCHITECTURE • LAYER 1 OPTICAL BACKBONE</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg font-black uppercase text-on-surface tracking-tight">
              Subsea Cable &amp; Terrestrial Sovereign Fiber Explorer
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Inspect the physical fiber optic pathways connecting MIHORA’s dual command hubs in London (UK) and Islamabad (Pakistan) across maritime subsea cables and overland dark fiber rings.
            </p>
          </div>

          {/* Cut Simulation Button */}
          <div className="shrink-0">
            <button
              id="btn-simulate-cable-cut"
              onClick={toggleSimulation}
              className={`inline-flex items-center gap-2.5 px-4 py-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95 border ${
                simulatedSubseaCut
                  ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
                  : 'bg-surface-container-highest border-outline/40 text-on-surface hover:border-primary/60'
              }`}
              title="Test autonomous BGP reroute across terrestrial fiber during maritime subsea cut"
            >
              {simulatedSubseaCut ? (
                <>
                  <AlertOctagon size={16} className="text-amber-500 animate-pulse" />
                  <span>RESTORE NORMAL DUAL TRANSIT</span>
                </>
              ) : (
                <>
                  <Zap size={16} className="text-primary" />
                  <span>SIMULATE SUBSEA MARITIME CABLE CUT</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Simulation Alert Banner */}
        {simulatedSubseaCut && (
          <div className="p-space-sm bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></div>
              <div>
                <span className="text-amber-600 dark:text-amber-400 font-bold uppercase">
                  SIMULATION ACTIVE: RED SEA / SUEZ MARITIME TRUNKS SEVERED.
                </span>
                <span className="text-on-surface-variant ml-2">
                  Traffic instantaneously shifted to Trans-Eurasian Terrestrial Dark Fiber via autonomous BGP Flowspec.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-emerald-500 font-bold">REROUTE: {failoverTelemetry.rerouteTimeMs} ms</span>
              <span className="text-outline">•</span>
              <span className="text-emerald-500 font-bold">PACKET LOSS: {failoverTelemetry.packetLoss}</span>
            </div>
          </div>
        )}

        {/* Route Selector Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-xs">
          {TRANSIT_ROUTES.map((route) => {
            const isSelected = selectedRouteId === route.id;
            const isSevered = simulatedSubseaCut && route.type === 'Subsea Optical Cable';

            return (
              <button
                key={route.id}
                id={`btn-route-${route.id}`}
                onClick={() => {
                  playUiChime('click');
                  setSelectedRouteId(route.id);
                }}
                className={`p-space-sm rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-surface-container-highest border-primary shadow-md'
                    : 'bg-surface-container-lowest border-outline/20 hover:border-outline/40'
                } ${isSevered ? 'opacity-70 border-dashed border-amber-500/60' : ''}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                      route.type === 'Terrestrial Dark Fiber' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {route.type}
                    </span>
                    {isSevered && (
                      <span className="text-amber-500 font-bold uppercase">CUT (SIMULATED)</span>
                    )}
                  </div>
                  <div className="font-headline-sm text-xs font-extrabold text-on-surface leading-tight">
                    {route.name}
                  </div>
                </div>

                <div className="font-mono text-[11px] text-outline flex items-center justify-between border-t border-outline/10 pt-1.5">
                  <span>{route.lengthKm.toLocaleString()} km</span>
                  <span className="text-on-surface font-semibold">{route.latencyMs} ms RTT</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Route Deep-Dive Panel */}
        <div className="p-space-lg bg-surface-container-lowest rounded-2xl border border-outline/30 space-y-space-md shadow-sm">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm border-b border-outline/20 pb-space-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-secondary/10 text-secondary font-mono text-xs font-bold uppercase">
                  {activeRoute.sovereignRating}
                </span>
                <span className="text-outline text-xs font-mono">• {activeRoute.type}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-extrabold">
                {activeRoute.name}
              </h3>
              <p className="font-mono text-xs text-primary font-semibold">
                {activeRoute.span}
              </p>
            </div>

            {/* Route Primary Metrics Badge */}
            <div className="flex items-center gap-space-sm font-mono text-xs shrink-0">
              <div className="p-2.5 bg-surface-container rounded-xl border border-outline/20 text-center">
                <div className="text-[10px] text-outline uppercase font-bold">Capacity</div>
                <div className="text-base font-black text-on-surface">{activeRoute.capacityTbps} Tbps</div>
              </div>
              <div className="p-2.5 bg-surface-container rounded-xl border border-outline/20 text-center">
                <div className="text-[10px] text-outline uppercase font-bold">Span Length</div>
                <div className="text-base font-black text-on-surface">{activeRoute.lengthKm.toLocaleString()} km</div>
              </div>
              <div className="p-2.5 bg-surface-container rounded-xl border border-outline/20 text-center">
                <div className="text-[10px] text-outline uppercase font-bold">Nominal RTT</div>
                <div className="text-base font-black text-primary">{activeRoute.latencyMs} ms</div>
              </div>
            </div>
          </div>

          {/* Description & Mission Use Case */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md font-body-sm text-body-sm text-on-surface-variant">
            <div className="space-y-2 p-space-sm bg-surface-container-low rounded-xl border border-outline/20">
              <div className="font-mono text-xs text-on-surface font-bold uppercase flex items-center gap-1.5">
                <Layers size={14} className="text-primary" />
                <span>PHYSICAL INFRASTRUCTURE ARCHITECTURE</span>
              </div>
              <p className="leading-relaxed">
                {activeRoute.description}
              </p>
            </div>

            <div className="space-y-2 p-space-sm bg-surface-container-low rounded-xl border border-outline/20">
              <div className="font-mono text-xs text-on-surface font-bold uppercase flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-secondary" />
                <span>MISSION CRITICAL WORKLOAD DEPLOYMENT</span>
              </div>
              <p className="leading-relaxed">
                {activeRoute.primaryUseCase}
              </p>
            </div>
          </div>

          {/* Landing Stations / Optical Waypoints */}
          <div className="space-y-2">
            <div className="font-mono text-xs text-outline font-bold uppercase">
              // KEY INTERCONNECT HUBS &amp; CABLE LANDING STATIONS:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {activeRoute.landingStations.map((station, i) => (
                <div 
                  key={i}
                  className="px-3 py-2 bg-surface-container rounded-lg border border-outline/20 font-mono text-xs text-on-surface flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <span className="truncate">{station}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
