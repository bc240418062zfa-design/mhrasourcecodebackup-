import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Eye,
  FileCheck2,
  ArrowRight,
  CheckCircle2,
  Server,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { VISUAL_ASSETS } from '../assets/visuals';
import {
  MaskTextReveal,
  Reveal,
  ParallaxFrame,
  SpotlightSurface,
  StaggerGrid,
  StaggerItem,
} from '../components/MotionPrimitives';
import { playUiChime } from '../utils/audio';

const CONTROL_LAYERS = [
  {
    id: 'physical',
    code: 'SEC-01 · Physical & Optical',
    title: 'Air-Gapped Containment & Hardware Custody',
    controls: [
      'Locked perforated server cabinets with dual biometric/smartcard vestibule logging',
      'Optical fiber tamper alarms measuring sudden attenuation anomalies across OS2 conduits',
      'Unidirectional optical data diodes enforcing read-only telemetry export from SCADA zones',
      'Out-of-band IPMI/iDRAC management isolated on hardware-firewalled management VLANs',
    ],
  },
  {
    id: 'crypto',
    code: 'SEC-02 · Cryptographic Keys & Identity',
    title: 'Client-Owned FIPS 140-3 Root Key Custody',
    controls: [
      'Hardware Security Module (HSM) key custody anchored strictly within client jurisdiction',
      'Mandatory Mutual TLS (mTLS v1.3) between every internal microservice and API gateway',
      'TPM 2.0 measured boot attestation verifying immutable Linux kernel signatures before mount',
      'Short-lived hardware-backed workload identity tokens replacing static long-lived secrets',
    ],
  },
  {
    id: 'governance',
    code: 'SEC-03 · Compliance & Continuous Audit',
    title: 'ISO 27001, SOC 2 Type II & UK-GDPR Verification',
    controls: [
      'Strict regional data residency pinning for UK-GDPR, EU-GDPR, and sovereign banking mandates',
      'Zero-egress private LLM inference nodes preventing proprietary data exposure to external APIs',
      'Automated CIS Level 2 continuous posture verification across host OS and Kubernetes nodes',
      'Cryptographically signed incident timelines and full audit trails across London & Islamabad NOCs',
    ],
  },
];

const SCHEMA_SECURITY = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does MIHORA.TECH protect cryptographic keys and source code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clients retain full cryptographic ownership of FIPS 140-3 HSM keys, private Git repositories, and Terraform infrastructure state without third-party agency escrow or vendor lock-in.',
      },
    },
    {
      '@type': 'Question',
      name: 'What compliance frameworks govern MIHORA.TECH infrastructure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MIHORA.TECH designs architectures aligned with ISO/IEC 27001 information security controls, SOC 2 Type II trust criteria, CIS Level 2 OS hardening, and strict UK-GDPR / EU-GDPR data residency requirements.',
      },
    },
  ],
};

export default function Security() {
  const [activeLayer, setActiveLayer] = useState(0);
  const current = CONTROL_LAYERS[activeLayer];

  return (
    <div className="flex flex-col w-full">
      <SEOHead
        title="Zero-Trust Security & Sovereign Compliance Center | MIHORA.TECH"
        description="Explore MIHORA.TECH cryptographic key custody, FIPS 140-3 HSM containment, unidirectional optical SCADA diodes, ISO 27001 governance, and zero-egress private AI controls."
        canonicalPath="/security"
        schemaData={SCHEMA_SECURITY}
      />

      {/* Hero Split */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                <ShieldCheck size={14} />
                <span>Sovereign Trust &amp; Security Architecture</span>
              </div>
            </Reveal>

            <MaskTextReveal delay={0.05}>
              <h1 className="font-headline font-extrabold text-4xl sm:text-5xl text-on-surface tracking-tight leading-[1.08]">
                Zero-Trust Security Built From Silicon Cabinets to TLS Keys
              </h1>
            </MaskTextReveal>

            <Reveal delay={0.14}>
              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                Security engineered into every layer: physical cabinet access controls, measured kernel
                attestation, client-owned cryptographic keys, and air-gapped operational containment
                governed under <strong className="text-on-surface">ISO 27001</strong> and{' '}
                <strong className="text-on-surface">UK-GDPR</strong> boundaries.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-4 pt-1">
                <Link
                  to="/contact/"
                  onClick={() => playUiChime('click')}
                  className="inline-flex items-center gap-2 px-6 py-3 btn-primary-gradient rounded-lg text-sm font-semibold"
                >
                  <span>Request Security Architecture Brief</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/legal/"
                  onClick={() => playUiChime('click')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-surface-container border border-outline/30 hover:border-primary text-on-surface rounded-lg text-sm font-semibold transition-colors"
                >
                  <span>Legal &amp; Compliance Terms</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal direction="left" delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-outline/25 shadow-2xl">
                <ParallaxFrame offset={18} className="aspect-[16/10]">
                  <img
                    src={VISUAL_ASSETS.securityHsmVault}
                    alt="MIHORA sovereign hardware security module and locked server aisle"
                    className="w-full h-full object-cover"
                  />
                </ParallaxFrame>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive Control Matrix */}
      <section className="w-full bg-surface py-16 lg:py-24 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Verifiable Controls
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              Three-Tier Defense Custody Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CONTROL_LAYERS.map((layer, idx) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => {
                  setActiveLayer(idx);
                  playUiChime('click');
                }}
                className={clsx(
                  'p-5 rounded-xl border text-left transition-all cursor-pointer space-y-1',
                  activeLayer === idx
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-surface-container-low hover:bg-surface-container border-outline/25 text-on-surface'
                )}
              >
                <div
                  className={clsx(
                    'font-mono text-[11px] uppercase tracking-wider font-bold',
                    activeLayer === idx ? 'text-white/85' : 'text-primary'
                  )}
                >
                  {layer.code}
                </div>
                <div className="font-headline font-bold text-base">{layer.title}</div>
              </button>
            ))}
          </div>

          <div className="surface-card rounded-2xl p-7 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-outline/15">
              <div>
                <div className="font-mono text-xs font-bold text-primary uppercase">{current.code}</div>
                <h3 className="font-headline text-2xl font-bold text-on-surface mt-0.5">
                  {current.title}
                </h3>
              </div>
              <span className="font-mono text-xs text-on-surface-variant">
                Zero-Trust Enforcement
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {current.controls.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-container-low border border-outline/15 flex items-start gap-3"
                >
                  <CheckCircle2 size={17} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-on-surface leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Sovereign Security Pillars */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl p-6 h-full space-y-3">
                <KeyRound size={20} className="text-primary" />
                <h3 className="font-headline text-lg font-bold text-on-surface">
                  Exclusive Key Custody
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Root TLS authorities and database encryption keys never reside on shared multi-tenant
                  agency vaults.
                </p>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl p-6 h-full space-y-3">
                <Lock size={20} className="text-primary" />
                <h3 className="font-headline text-lg font-bold text-on-surface">
                  Optical Data Diodes
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Physical one-way glass bridges allow telemetry ingestion without exposing industrial
                  SCADA actuators to inbound IP vectors.
                </p>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl p-6 h-full space-y-3">
                <Eye size={20} className="text-primary" />
                <h3 className="font-headline text-lg font-bold text-on-surface">
                  24/7 Dual-Hub SOC
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Continuous intrusion correlation across London and Islamabad watchdesks with rapid
                  packet quarantine capabilities.
                </p>
              </SpotlightSurface>
            </StaggerItem>

            <StaggerItem>
              <SpotlightSurface className="surface-card rounded-2xl p-6 h-full space-y-3">
                <FileCheck2 size={20} className="text-primary" />
                <h3 className="font-headline text-lg font-bold text-on-surface">
                  Zero External AI Egress
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Private air-gapped inference ensures confidential blueprints and client telemetry
                  never train external models.
                </p>
              </SpotlightSurface>
            </StaggerItem>
          </StaggerGrid>

          <div className="pt-6 border-t border-outline/15 flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="text-on-surface-variant">
              Related Technical Documentation:{' '}
              <Link to="/docs/" className="text-primary font-semibold hover:underline">
                Systems Architecture Codex
              </Link>{' '}
              ·{' '}
              <Link to="/glossary/" className="text-primary font-semibold hover:underline">
                Security &amp; Optical Glossary
              </Link>
            </div>
            <Link
              to="/services/managed-sre/"
              onClick={() => playUiChime('click')}
              className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline"
            >
              <Server size={15} />
              <span>Explore 24/7 Managed SRE</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
