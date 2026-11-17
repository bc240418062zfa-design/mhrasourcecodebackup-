import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { BookMarked, Search, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { MaskTextReveal, Reveal } from '../components/MotionPrimitives';

interface GlossaryTerm {
  term: string;
  category: 'Physical Optics' | 'Distributed Systems' | 'Security & Sovereignty' | 'Operations & SRE';
  definition: string;
  mihoraSpec: string;
  relatedPath: string;
  relatedLabel: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'OTDR (Optical Time-Domain Reflectometer)',
    category: 'Physical Optics',
    definition:
      'Diagnostic laser pulse instrument that injects light into an optical fiber strand and measures Rayleigh backscattering and Fresnel reflections to pinpoint splice attenuation, macro-bends, and physical breaks along kilometer-scale trunks.',
    mihoraSpec: 'Bidirectional 1310nm/1550nm traces archived per strand before site sign-off.',
    relatedPath: '/services/field-engineering',
    relatedLabel: 'Field Engineering Rig Spec',
  },
  {
    term: 'OS2 Single-Mode Optical Fiber (ITU-T G.652.D)',
    category: 'Physical Optics',
    definition:
      '9-micron core single-mode silica fiber designed for low water-peak attenuation across 1310nm to 1625nm bands, enabling 10 km to 80+ km unamplified DWDM data transmission.',
    mihoraSpec: '0.35 dB/km @ 1310nm; 0.22 dB/km @ 1550nm max channel design target.',
    relatedPath: '/tools',
    relatedLabel: 'Optical Link Loss Calculator',
  },
  {
    term: 'Core-Alignment Fusion Splicing',
    category: 'Physical Optics',
    definition:
      'Precision thermal glass welding technique that uses dual-axis microscopic cameras to align fiber glass cores—not just outer cladding—prior to electric arc fusion, minimizing optical reflectance.',
    mihoraSpec: 'MIHORA mean field splice tolerance <= 0.03 dB (strict ceiling <= 0.05 dB).',
    relatedPath: '/services/physical-infrastructure',
    relatedLabel: 'Physical Infrastructure Spec',
  },
  {
    term: 'EVPN-VXLAN Spine-Leaf Fabric',
    category: 'Distributed Systems',
    definition:
      'Standards-based Clos datacenter network architecture pairing Virtual Extensible LAN encapsulation with BGP Ethernet VPN control planes to enable seamless Layer 2/Layer 3 multi-tenant mobility without spanning-tree blocking.',
    mihoraSpec: 'Sub-second ECMP link failover across dual spine switches.',
    relatedPath: '/engineering',
    relatedLabel: '9-Layer Stack L-05 Routing',
  },
  {
    term: 'Sovereign Systems Custody',
    category: 'Security & Sovereignty',
    definition:
      'An architectural governance model where the commissioning organization retains exclusive ownership of source code, Terraform state files, FIPS 140-3 HSM encryption keys, and underlying hardware topology.',
    mihoraSpec: 'Zero proprietary agency lock-in or vendor escrow restrictions.',
    relatedPath: '/compare',
    relatedLabel: 'Custody vs. Cloud Comparison',
  },
  {
    term: 'Unidirectional Optical Data Diode',
    category: 'Security & Sovereignty',
    definition:
      'Physical cybersecurity hardware containing a transmit-only LED/laser paired with a receive-only photodiode separated by optical fiber, making reverse network packet injection physically impossible.',
    mihoraSpec: 'Deployed on industrial power substation and sensitive SCADA telemetry zones.',
    relatedPath: '/security',
    relatedLabel: 'Security Control Matrix',
  },
  {
    term: 'Follow-the-Sun SRE (London UTC+0 / Islamabad UTC+5)',
    category: 'Operations & SRE',
    definition:
      'Continuous 24/7 operational custody model rotating active Site Reliability Engineering and NOC/SOC incident watchdesks seamlessly across daylight hours in geographically separated time zones.',
    mihoraSpec: 'Zero exhausted night-shift handoffs; sub-15m P1 containment SLA.',
    relatedPath: '/services/managed-sre',
    relatedLabel: '24/7 Managed SRE Spec',
  },
  {
    term: '2N Redundant Power Architecture',
    category: 'Physical Optics',
    definition:
      'Fully mirrored uninterruptible power supply (UPS), generator, and Dual-Bus Power Distribution Unit feeds where A-rail and B-rail paths can independently carry 100% of rack electrical load.',
    mihoraSpec: 'Balanced 3-phase 2N ATS feeds standard across Tier III/IV suites.',
    relatedPath: '/resources',
    relatedLabel: 'Tier Downtime Reference',
  },
  {
    term: 'BGP Anycast Routing',
    category: 'Distributed Systems',
    definition:
      'Network addressing technique announcing identical IP prefixes from geographically distributed Points of Presence so Border Gateway Protocol automatically routes users to the nearest healthy node.',
    mihoraSpec: 'Active sub-second transit convergence across LON, ISB, DXB, and SIN nodes.',
    relatedPath: '/case-studies',
    relatedLabel: 'Enterprise Network Deployments',
  },
  {
    term: 'Measured Boot & TPM 2.0 Attestation',
    category: 'Security & Sovereignty',
    definition:
      'Hardware root-of-trust sequence storing cryptographic hashes of UEFI firmware, bootloader, and Linux kernel into shielded Trusted Platform Module registers before releasing disk decryption keys.',
    mihoraSpec: 'Mandatory baseline across hardened sovereign bare-metal clusters.',
    relatedPath: '/security',
    relatedLabel: 'Zero-Trust Security Center',
  },
  {
    term: 'PUE (Power Usage Effectiveness)',
    category: 'Physical Optics',
    definition:
      'Facility efficiency ratio calculated by dividing total datacenter power consumption (including cooling and lighting) by power delivered strictly to IT compute equipment.',
    mihoraSpec: '1.14 design PUE target via hot/cold aisle physical containment.',
    relatedPath: '/status',
    relatedLabel: 'Live Hub PUE Telemetry',
  },
  {
    term: 'Change Data Capture (CDC)',
    category: 'Distributed Systems',
    definition:
      'Low-impact architectural pattern streaming row-level database write-ahead log mutations directly onto ordered event buses (Kafka) without heavy polling queries against transactional primaries.',
    mihoraSpec: 'Zero-loss financial & ERP synchronization with < 15ms dispatch.',
    relatedPath: '/services/automation-intelligence',
    relatedLabel: 'Automation & Intelligence Spec',
  },
];

const SCHEMA_GLOSSARY = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'MIHORA Sovereign Engineering & Optical Infrastructure Glossary',
  url: 'https://mihora.tech/glossary/',
  hasDefinedTerm: GLOSSARY_TERMS.map((item) => ({
    '@type': 'DefinedTerm',
    name: item.term,
    description: item.definition,
  })),
};

export default function Glossary() {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Physical Optics', 'Distributed Systems', 'Security & Sovereignty', 'Operations & SRE'];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((item) => {
      const catMatch = selectedCat === 'All' || item.category === selectedCat;
      const textMatch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.mihoraSpec.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [query, selectedCat]);

  return (
    <div className="flex flex-col w-full">
      <SEOHead
        title="Sovereign Systems & Optical Engineering Glossary | MIHORA.TECH"
        description="Searchable engineering glossary defining OTDR certification, OS2 single-mode fiber, EVPN-VXLAN, optical data diodes, 2N redundancy, and sovereign systems custody."
        canonicalPath="/glossary"
        schemaData={SCHEMA_GLOSSARY}
      />

      {/* Header */}
      <section className="w-full bg-surface-container-lowest py-14 lg:py-20 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              <BookMarked size={14} />
              <span>Technical Reference Lexicon</span>
            </div>
          </Reveal>

          <MaskTextReveal delay={0.05}>
            <h1 className="font-headline font-extrabold text-4xl sm:text-5xl text-on-surface tracking-tight leading-[1.08] max-w-4xl">
              Engineering, Optical Fiber &amp; Sovereign Custody Glossary
            </h1>
          </MaskTextReveal>

          <Reveal delay={0.12}>
            <p className="text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed">
              Clear, verifiable definitions across physical transport physics, distributed software
              consensus, and operational reliability terminology referenced in MIHORA specifications.
            </p>
          </Reveal>

          {/* Search & Category Bar */}
          <div className="flex flex-col lg:flex-row gap-4 pt-2 items-stretch lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter terms (e.g., OTDR, EVPN, HSM, PUE)..."
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline/25 rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={clsx(
                    'px-3 py-2 rounded-lg border transition-all cursor-pointer font-semibold',
                    selectedCat === cat
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface-container-low border-outline/20 text-on-surface-variant hover:text-on-surface'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Definitions List */}
      <section className="w-full bg-surface py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="font-mono text-xs text-on-surface-variant">
            Showing <strong className="text-on-surface">{filtered.length}</strong> verified engineering definitions
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item) => (
              <Reveal key={item.term}>
                <article className="surface-card rounded-2xl p-6 sm:p-7 h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="font-mono text-[11px] uppercase tracking-wider font-bold text-primary">
                      {item.category}
                    </div>
                    <h2 className="font-headline text-xl font-bold text-on-surface leading-snug">
                      {item.term}
                    </h2>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {item.definition}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-outline/15 space-y-2">
                    <div className="font-mono text-xs text-on-surface font-medium">
                      <span className="text-primary font-bold">MIHORA Baseline: </span>
                      {item.mihoraSpec}
                    </div>
                    <Link
                      to={item.relatedPath}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <span>{item.relatedLabel}</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
