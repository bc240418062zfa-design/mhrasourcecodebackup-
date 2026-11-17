export interface AIResponse {
  summary: string;
  architecturePoints: string[];
  recommendedAction: {
    label: string;
    path: string;
  };
  telemetryCode: string;
}

const KNOWLEDGE_BASE: Array<{
  keywords: string[];
  response: AIResponse;
}> = [
  {
    keywords: ['founder', 'founders', 'hasnain', 'matti', 'omema', 'iqbal', 'who founded', 'owner', 'ceo', 'leadership'],
    response: {
      summary:
        'MIHORA.TECH was co-founded by M. Matti ul Hasnain (Co-Founder & Principal Systems Architect) and Omema Iqbal (Co-Founder & Operations Director) to deliver sovereign full-stack engineering, physical datacenter infrastructure, and 24/7 global telemetry operations.',
      architecturePoints: [
        'M. Matti ul Hasnain leads systems architecture, distributed backend design, and physical datacenter infrastructure.',
        'Omema Iqbal directs international operations, dual-hub governance, and enterprise delivery execution.',
        'Synchronized engineering command hubs operate continuously in London (UK) and Islamabad (Pakistan).'
      ],
      recommendedAction: {
        label: 'View Company & Founders Profile',
        path: '/company#leadership'
      },
      telemetryCode: '[VERIFIED] · FOUNDERS: M. MATTI UL HASNAIN & OMEMA IQBAL · LONDON & ISLAMABAD'
    }
  },
  {
    keywords: ['infra', 'physical', 'cable', 'cabling', 'fiber', 'switch', 'rack', 'hardware', 'datacenter', 'server'],
    response: {
      summary:
        'MIHORA Physical Infrastructure engineers sovereign hardware topologies including seismically braced server racks, core-alignment single-mode OS2 fiber splicing, NVMe SAN arrays, and EVPN-VXLAN spine-leaf switching.',
      architecturePoints: [
        'Bidirectional OTDR optical certification guaranteeing splice loss <= 0.03–0.05 dB at 1310nm/1550nm.',
        'Hot/cold aisle thermal containment (1.14 design PUE) with balanced 3-phase A+B 2N ATS power rails.',
        'Air-gapped out-of-band IPMI/iDRAC hardware telemetry streaming into unified NOC dashboards.'
      ],
      recommendedAction: {
        label: 'Inspect Physical Infrastructure Spec',
        path: '/services/physical-infrastructure'
      },
      telemetryCode: '[VERIFIED] · DIVISION 03 · OPTICAL & DATACENTER PHYSICAL LAYER'
    }
  },
  {
    keywords: ['digital', 'web', 'backend', 'api', 'software', 'microservice', 'cloud', 'platform'],
    response: {
      summary:
        'MIHORA Digital Systems Engineering constructs high-concurrency Go and TypeScript microservices, partitioned PostgreSQL/Kafka stores, and zero-trust mTLS v1.3 gateways with full source code ownership.',
      architecturePoints: [
        'Typed gRPC service meshes targeting sub-2ms P99 core routing overhead.',
        'Shadow-rehearsed database migrations eliminating maintenance downtime during rollouts.',
        'Full Git repository & Infrastructure-as-Code custody without vendor lock-in.'
      ],
      recommendedAction: {
        label: 'Inspect Digital Systems Engineering',
        path: '/services/digital-engineering'
      },
      telemetryCode: '[VERIFIED] · DIVISION 01 · DISTRIBUTED CLOUD & SOFTWARE ARCHITECTURE'
    }
  },
  {
    keywords: ['layer', '9-layer', 'stack', 'architecture', 'silicon', 'axioms', 'sovereign'],
    response: {
      summary:
        'The MIHORA 9-Layer Engineering Stack spans from bare-metal silicon substrates to distributed operational intelligence, preventing fragile black-box vendor dependencies.',
      architecturePoints: [
        'Layers 1–3: Silicon compute, structured OS2 optical fiber, and hardware-software firmware bridges.',
        'Layers 4–6: Zero-trust kernel networks, container orchestration, and partitioned data stores.',
        'Layers 7–9: Deterministic automation buses, private inference routing, and enterprise interfaces.'
      ],
      recommendedAction: {
        label: 'Explore 9-Layer Engineering Stack',
        path: '/engineering#architecture'
      },
      telemetryCode: '[VERIFIED] · ARCHITECTURE CODEX · 9-LAYER SOVEREIGN STACK'
    }
  },
  {
    keywords: ['how', 'process', 'methodology', 'phases', 'workflow', 'deploy', 'deliver'],
    response: {
      summary:
        'MIHORA executes engagements through a 5-phase sovereign engineering methodology: Telemetry Discovery, Nine-Layer Blueprinting, Hardware & Software Fabrication, Zero-Downtime Cutover, and 24/7 Dual-Hub SRE.',
      architecturePoints: [
        'Complete architectural bill of materials (BOM) and threat modeling prior to hardware procurement.',
        'Parallel shadow environment validation and Fluke/OTDR certification before live traffic cutover.',
        'Seamless handover into follow-the-sun London & Islamabad operational custody.'
      ],
      recommendedAction: {
        label: 'View 5-Phase Delivery Methodology',
        path: '/how-it-works'
      },
      telemetryCode: '[VERIFIED] · DELIVERY METHODOLOGY · ZERO-DOWNTIME CUTOVER PROTOCOL'
    }
  },
  {
    keywords: ['case', 'study', 'studies', 'portfolio', 'deployment', 'rtgs', 'dwdm', 'benchmark'],
    response: {
      summary:
        'MIHORA field case studies document verifiable production engineering outcomes across interbank RTGS repatriation, 1,400 km 800G DWDM fiber re-splicing, defense SCADA air-gapping, and private 5G healthcare cores.',
      architecturePoints: [
        'National Interbank Settlement: Sub-2ms tail latency under Tier IV 2(N+1) on-premise hardware.',
        '1,400 km Long-Haul DWDM Corridor: 0.03 dB mean splice loss reducing chromatic dispersion by 41%.',
        'Substation SCADA Air-Gap: 92% API egress overhead reduction with unidirectional optical diodes.'
      ],
      recommendedAction: {
        label: 'Inspect Enterprise Case Studies',
        path: '/case-studies'
      },
      telemetryCode: '[VERIFIED] · PRODUCTION DEPLOYMENT TELEMETRY & BENCHMARKS'
    }
  },
  {
    keywords: ['ai', 'intelligence', 'automation', 'agent', 'pipeline', 'llm', 'orchestration', 'scada'],
    response: {
      summary:
        'MIHORA Automation & Applied Intelligence replaces brittle manual processes with idempotent Kafka/Temporal orchestration pipelines, Modbus/OPC-UA industrial bridges, and private air-gapped inference.',
      architecturePoints: [
        'Event-driven Change Data Capture synchronizing ERP, inventory, and edge telemetry in real time.',
        'Local private model containment guaranteeing zero sensitive enterprise data egress.',
        'Deterministic replay queues and cryptographic transition audit trails.'
      ],
      recommendedAction: {
        label: 'Review Automation & Applied Intelligence',
        path: '/services/automation-intelligence'
      },
      telemetryCode: '[VERIFIED] · DIVISION 02 · EVENT ORCHESTRATION & PRIVATE INFERENCE'
    }
  },
  {
    keywords: ['field', 'fluke', 'splicing', 'cctv', 'surveillance', 'dispatch', 'break-fix'],
    response: {
      summary:
        'MIHORA Field Engineering mobilizes certified engineers equipped with Fujikura fusion splicers, EXFO OTDRs, and Fluke DSX-8000 certifiers for site commissioning and 4-hour emergency restoration.',
      architecturePoints: [
        '4-hour emergency SLA dispatch across active metropolitan service corridors.',
        'Bidirectional OTDR optical trace reporting and 500 MHz Cat6A copper certification.',
        'Solar-buffered NEMA industrial surveillance, private 5G, and biometric access hardware.'
      ],
      recommendedAction: {
        label: 'View Field Engineering Rigs Spec',
        path: '/services/field-engineering'
      },
      telemetryCode: '[VERIFIED] · DIVISION 04 · 4-HOUR SLA FIELD DISPATCH'
    }
  },
  {
    keywords: ['sre', 'managed', '24/7', 'monitoring', 'telemetry', 'noc', 'uptime', 'maintenance', 'status'],
    response: {
      summary:
        '24/7 Managed Technology & SRE operates out of synchronized watchdesks in London (UTC+0) and Islamabad (UTC+5), delivering sub-15-minute P1 containment and 99.999% uptime orchestration.',
      architecturePoints: [
        'Unified Prometheus/OpenTelemetry observability across Layer 1 optical sensors through Layer 9 APIs.',
        'Zero-downtime CVE firmware patching with pre-patch snapshots and canary verification.',
        'Live hub status and 90-day uptime telemetry available publicly on the Status portal.'
      ],
      recommendedAction: {
        label: 'Discover 24/7 Managed SRE Spec',
        path: '/services/managed-sre'
      },
      telemetryCode: '[VERIFIED] · DIVISION 05 · FOLLOW-THE-SUN LONDON & ISLAMABAD SRE'
    }
  },
  {
    keywords: ['partner', 'partnership', 'peering', 'colocation', 'alliance', 'oem', 'carrier'],
    response: {
      summary:
        'MIHORA.TECH collaborates with Tier-1 optical carriers, Internet Exchange Points (IXPs), sovereign colocation operators, and industrial hardware OEMs across UK, EMEA, and South Asia.',
      architecturePoints: [
        'BGP peering, dark fiber cross-connect provisioning, and submarine cable terrestrial backhaul.',
        'Joint enterprise delivery alliances for multi-jurisdiction infrastructure turnkeys.',
        'Direct engineering review for hardware qualification and colocation cage deployments.'
      ],
      recommendedAction: {
        label: 'Explore Strategic Partnerships',
        path: '/partnerships'
      },
      telemetryCode: '[VERIFIED] · ECOSYSTEM ALLIANCES · CARRIER & COLOCATION PEERING'
    }
  },
  {
    keywords: ['resource', 'resources', 'docs', 'documentation', 'manual', 'specification', 'codex', 'standards'],
    response: {
      summary:
        'The MIHORA Knowledge Hub & Systems Codex publishes verified fiber optical loss standards (TIA-568-D), Uptime Tier downtime calculations, whitepaper citations, and full 9-Layer engineering manuals.',
      architecturePoints: [
        'Complete OTDR splice loss reference tables and power/cooling PUE sizing benchmarks.',
        'Downloadable Architecture Spec Sheets and formal BibTeX/DOI technical paper citations.',
        'Direct links to the interactive RFP Specifier and Subsea Optical Fiber Explorer.'
      ],
      recommendedAction: {
        label: 'Open Engineering Knowledge Hub',
        path: '/resources'
      },
      telemetryCode: '[VERIFIED] · OPEN STANDARDS & ARCHITECTURAL REFERENCE HUB'
    }
  },
  {
    keywords: ['faq', 'question', 'questions', 'what is mihora', 'about mihora', 'info', 'help'],
    response: {
      summary:
        'MIHORA.TECH (Private) Limited is a sovereign systems engineering and physical infrastructure company founded by M. Matti ul Hasnain and Omema Iqbal, headquartered across London (UK) and Islamabad (Pakistan).',
      architecturePoints: [
        'Founded by M. Matti ul Hasnain (Principal Systems Architect) & Omema Iqbal (Operations Director).',
        'Dual command centers providing 24/7 follow-the-sun SRE and physical field dispatch.',
        'Unified accountability across bare-metal datacenters, optical networks, and enterprise software.'
      ],
      recommendedAction: {
        label: 'View Verified Entity FAQs',
        path: '/faq'
      },
      telemetryCode: '[VERIFIED] · OFFICIAL ENTITY KNOWLEDGE BASE'
    }
  },
  {
    keywords: ['security', 'zero trust', 'hsm', 'iso', 'gdpr', 'diode', 'encryption', 'compliance'],
    response: {
      summary:
        'MIHORA Security enforces zero-trust isolation across every layer: biometric cabinet access, FIPS 140-3 client-owned HSM key custody, TPM 2.0 measured boot, unidirectional optical SCADA diodes, and ISO 27001 / UK-GDPR residency governance.',
      architecturePoints: [
        '100% client cryptographic custody of root TLS, Git repos, and Terraform infrastructure state.',
        'Unidirectional optical diodes isolate critical telemetry zones from inbound IP attacks.',
        'Air-gapped on-premise LLM inference guarantees zero proprietary data egress.'
      ],
      recommendedAction: {
        label: 'Inspect Zero-Trust Security Center',
        path: '/security'
      },
      telemetryCode: '[VERIFIED] · ZERO-TRUST SECURITY & COMPLIANCE CENTER'
    }
  },
  {
    keywords: ['calculator', 'tool', 'tools', 'sla math', 'loss budget', 'tco', 'compare', 'vs cloud'],
    response: {
      summary:
        'The MIHORA Engineering Workbench provides live interactive calculators for 99.999% SLA downtime budgets, TIA-568-D optical fiber link attenuation, and 5-year sovereign hardware vs. hyperscale cloud egress TCO.',
      architecturePoints: [
        'Compute permitted annual/monthly minutes and outage risk down to 99.999%.',
        'Estimate total optical dB budgets at 1310nm/1550nm across splices and connectors.',
        'Evaluate trade-offs across custody models on our Sovereign vs. Hyperscale Comparison guide.'
      ],
      recommendedAction: {
        label: 'Open Engineering Calculators',
        path: '/tools'
      },
      telemetryCode: '[VERIFIED] · OPEN ENGINEERING WORKBENCH & CALCULATORS'
    }
  }
];

export function queryAIEngine(prompt: string): AIResponse {
  const normalized = prompt.toLowerCase().trim();

  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some((k) => normalized.includes(k))) {
      return item.response;
    }
  }

  return {
    summary: `MIHORA.TECH—co-founded by M. Matti ul Hasnain and Omema Iqbal—engineers bespoke software systems, physical datacenter backbones, and 24/7 telemetry pipelines tailored to your operational constraints.`,
    architecturePoints: [
      'Full 9-Layer stack accountability spanning physical optics through distributed cloud APIs.',
      'Reproducible Infrastructure-as-Code, Fluke/OTDR hardware certification, and source custody.',
      'Dual-hub operational oversight from London (UK) and Islamabad (Pakistan).'
    ],
    recommendedAction: {
      label: 'Schedule Architecture Consultation',
      path: '/contact'
    },
    telemetryCode: '[VERIFIED] · ARCHITECTURE SEARCH ENGINE · MIHORA.TECH'
  };
}
