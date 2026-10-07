import React from 'react';
import { Factory, Hospital, Store, GraduationCap, Server, Building, Globe } from 'lucide-react';

export default function Industries() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full bg-surface-container-lowest overflow-hidden px-margin-mobile lg:px-margin py-space-xl lg:py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 space-y-space-md text-center">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-high rounded-DEFAULT text-secondary shadow-sm">
            <Globe size={14} />
            <span className="font-label-sm text-label-sm tracking-widest uppercase">VERTICAL IMPLEMENTATIONS</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface uppercase tracking-tight leading-none">
            Sectors &amp; <span className="text-secondary-container">Industries.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Our sovereign engineering framework scales across any domain requiring absolute systemic reliability and secure hardware integration.
          </p>
        </div>
      </section>

      <section className="w-full bg-surface px-margin-mobile lg:px-margin py-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {[
            { id: "healthcare", title: "Healthcare & Diagnostics", icon: Hospital, desc: "HIPAA-compliant hospital network backbones, patient telemetry ingestion, low-latency PACS imaging servers, and on-site biomed equipment connectivity.", tag: "REDUNDANT FAILSAFE RACKS" },
            { id: "logistics", title: "Logistics & Fleet Rigs", icon: Factory, desc: "Automated warehouse Wi-Fi 6 meshes, RFID scanner gateways, edge barcode validation algorithms, and vehicle fleet dispatch telemetry.", tag: "RUGGEDIZED IoT SENSORS" },
            { id: "retail", title: "Retail & Commerce", icon: Store, desc: "Distributed POS networks across hundreds of sites, surveillance CCTV security grids, guest portal captive gateways, and unified inventory synchronization.", tag: "MULTI-LOCATION SD-WAN" },
            { id: "education", title: "Education & Research", icon: GraduationCap, desc: "High-density campus wireless infrastructures, high-performance compute clusters for academic research, and fiber trunk backbones.", tag: "10GBPS CAMPUS BACKBONES" },
            { id: "technology", title: "Technology & SaaS", icon: Server, desc: "Autonomous CI/CD engines, distributed database partitioning, multi-region Kubernetes cloud fleets, and bespoke developer APIs.", tag: "HYBRID MULTI-CLOUD" },
            { id: "enterprise", title: "Enterprise & Finance", icon: Building, desc: "Air-gapped server installations, zero-trust network access, encrypted inter-branch fiber rings, and physical biometric entry controllers.", tag: "ZERO-TRUST COMPLIANCE" },
            { id: "hospitality", title: "Hospitality", icon: Globe, desc: "End-to-end guest Wi-Fi architectures, multi-site operational management software, and physical access control integrators.", tag: "MULTI-SITE OPERATIONS" }
          ].map((ind, i) => (
            <div key={i} id={ind.id} className="bg-surface-container-low p-space-lg rounded-DEFAULT space-y-space-sm hover:bg-surface-container transition-all shadow-md scroll-mt-24">
              <div className="flex items-center justify-between text-secondary">
                <ind.icon size={32} />
                <span className="font-label-sm text-label-sm font-mono text-outline">SEC_0{i+1}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold uppercase">{ind.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{ind.desc}</p>
              <div className="text-xs font-mono text-secondary-container pt-space-xs">DEPLOYMENT: {ind.tag}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
