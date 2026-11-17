import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Scale, Cookie, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/MotionPrimitives';
import { playUiChime } from '../utils/audio';

type LegalSection = 'all' | 'privacy' | 'terms' | 'disclaimer' | 'security';

export default function Legal() {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<LegalSection>('all');

  useEffect(() => {
    if (location.pathname === '/privacy') setSelectedTab('privacy');
    else if (location.pathname === '/terms') setSelectedTab('terms');
    else if (location.pathname === '/disclaimer') setSelectedTab('disclaimer');
    else setSelectedTab('all');
  }, [location.pathname]);

  const currentBreadcrumbLabel =
    selectedTab === 'privacy'
      ? 'Privacy Policy'
      : selectedTab === 'terms'
      ? 'Terms of Service'
      : selectedTab === 'disclaimer'
      ? 'Technical Disclaimer'
      : 'Governance & Compliance';

  const pageHeading =
    selectedTab === 'privacy'
      ? 'Privacy Policy & Data Sovereignty'
      : selectedTab === 'terms'
      ? 'Terms of Service & IP Custody'
      : selectedTab === 'disclaimer'
      ? 'Technical Disclaimer & Specification Scope'
      : 'Legal Governance, Security & Compliance';

  const showSection = (id: Exclude<LegalSection, 'all'>) =>
    selectedTab === 'all' || selectedTab === id;

  return (
    <div className="flex flex-col w-full">
      <section className="w-full bg-surface-container-lowest py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-4xl mx-auto space-y-6">
          <Breadcrumbs items={[{ label: currentBreadcrumbLabel }]} />
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Legal &amp; Sovereign Governance
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-on-surface tracking-tight">
              {pageHeading}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Corporate governance, GDPR/UK-GDPR alignment, intellectual property custody terms, and architectural specification disclosures for MIHORA.TECH (Private) Limited.
            </p>
          </Reveal>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'all', label: 'All Policies', path: '/legal' },
              { id: 'privacy', label: 'Privacy Policy', path: '/privacy' },
              { id: 'terms', label: 'Terms of Service', path: '/terms' },
              { id: 'disclaimer', label: 'Disclaimer', path: '/disclaimer' },
            ].map((tab) => {
              const active = selectedTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  onClick={() => playUiChime('click')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-surface-container border border-outline/25 text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-surface py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-14">
          {showSection('privacy') && (
            <div id="privacy" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 text-primary">
                <ShieldCheck size={26} />
                <h2 className="font-headline text-2xl font-bold text-on-surface">Privacy Policy</h2>
              </div>
              <div className="text-on-surface-variant text-base leading-relaxed space-y-4">
                <p>
                  At MIHORA.TECH (Private) Limited, data sovereignty is treated as an architectural boundary. Personal and enterprise inquiry records submitted through our contact or procurement portals are processed solely for technical scoping, dispatch coordination, and contracted SLA fulfillment.
                </p>
                <p>
                  We operate in strict conformance with UK-GDPR, EU-GDPR, and applicable regional data protection regulations across our London and Islamabad hubs. Production telemetry streams processed on behalf of managed clients remain strictly sandboxed within contracted jurisdictional boundaries.
                </p>
                <p>
                  Requests for data access, correction, or erasure may be directed to{' '}
                  <a href="mailto:hr@mihora.tech" className="text-primary font-semibold hover:underline">
                    hr@mihora.tech
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          {showSection('terms') && (
            <div id="terms" className="space-y-4 scroll-mt-24 pt-10 border-t border-outline/20 first:pt-0 first:border-t-0">
              <div className="flex items-center gap-3 text-primary">
                <Scale size={26} />
                <h2 className="font-headline text-2xl font-bold text-on-surface">Terms of Service &amp; IP Custody</h2>
              </div>
              <div className="text-on-surface-variant text-base leading-relaxed space-y-4">
                <p>
                  Access to MIHORA.TECH digital properties, technical specifications, engineering advisory, and managed infrastructure pipelines is governed by these universal service terms alongside executed Master Services Agreements (MSAs).
                </p>
                <p>
                  Unless explicitly agreed otherwise in a separate bilateral contract, bespoke software repositories, Infrastructure-as-Code templates, and site documentation authored under funded client engagements transfer cleanly to client custody upon milestone settlement. Generic reference architectures and proprietary test harnesses remain the intellectual property of MIHORA.TECH.
                </p>
              </div>
            </div>
          )}

          {showSection('disclaimer') && (
            <div id="disclaimer" className="space-y-4 scroll-mt-24 pt-10 border-t border-outline/20 first:pt-0 first:border-t-0">
              <div className="flex items-center gap-3 text-primary">
                <AlertCircle size={26} />
                <h2 className="font-headline text-2xl font-bold text-on-surface">Technical Disclaimer</h2>
              </div>
              <div className="text-on-surface-variant text-base leading-relaxed space-y-4">
                <p>
                  All latency figures, optical dB loss budgets, PUE projections, and interactive sizing outputs generated via our RFP Specifier or Systems Architecture Codex serve as authoritative engineering reference baselines rather than binding hardware performance guarantees without prior site survey sign-off.
                </p>
                <p>
                  Submarine fiber route summaries and regional network telemetry indicators reflect documented architectural topology and operational targets; contracted service availability is defined exclusively within signed client SLAs.
                </p>
              </div>
            </div>
          )}

          {(selectedTab === 'all' || selectedTab === 'privacy') && (
            <div id="cookie" className="space-y-4 scroll-mt-24 pt-10 border-t border-outline/20">
              <div className="flex items-center gap-3 text-primary">
                <Cookie size={26} />
                <h2 className="font-headline text-2xl font-bold text-on-surface">Cookie &amp; Telemetry Notice</h2>
              </div>
              <div className="text-on-surface-variant text-base leading-relaxed space-y-4">
                <p>
                  This site stores minimal client preferences (such as Daylight/Obsidian theme selection and audio cue state) locally in browser storage alongside aggregate first-party measurement tags to improve page speed and technical content discoverability.
                </p>
              </div>
            </div>
          )}

          {(selectedTab === 'all' || selectedTab === 'security') && (
            <div id="security" className="space-y-4 scroll-mt-24 pt-10 border-t border-outline/20">
              <div className="flex items-center gap-3 text-primary">
                <Lock size={26} />
                <h2 className="font-headline text-2xl font-bold text-on-surface">Security Protocols</h2>
              </div>
              <div className="text-on-surface-variant text-base leading-relaxed space-y-4">
                <p>
                  MIHORA production networks enforce mutual TLS (mTLS v1.3) authentication, zero-trust firewall segmentation, AES-256 encryption at rest, and strict hardware security module (HSM) key isolation.
                </p>
                <p>
                  Responsible security vulnerability disclosures may be reported to{' '}
                  <a href="mailto:hr@mihora.tech" className="text-primary font-semibold hover:underline">
                    hr@mihora.tech
                  </a>
                  . Unauthorized penetration testing against production infrastructure is strictly prohibited.
                </p>
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-outline/20 flex items-center justify-between">
            <span className="text-xs font-mono text-on-surface-variant">
              MIHORA.TECH (PRIVATE) LIMITED · GOVERNED ACROSS UK &amp; PAKISTAN
            </span>
            <Link
              to="/contact"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Compliance Inquiries</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
