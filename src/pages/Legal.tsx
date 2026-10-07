import React from 'react';
import { ShieldCheck, Scale, Cookie, Lock } from 'lucide-react';

export default function Legal() {
  return (
    <div className="flex flex-col w-full">
      <section className="w-full bg-surface-container-lowest px-margin-mobile lg:px-margin py-space-xl lg:py-24 border-b border-surface-container">
        <div className="max-w-4xl mx-auto space-y-space-md">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-high rounded-DEFAULT text-secondary shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="font-label-sm text-label-sm tracking-widest uppercase">LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface uppercase tracking-tight">
            Governance & Protocols.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Strict adherence to international law, data sovereignty, and ethical engineering practices.
          </p>
        </div>
      </section>

      <section className="w-full bg-surface px-margin-mobile lg:px-margin py-space-xl space-y-space-xl">
        <div className="max-w-4xl mx-auto space-y-space-xl">
          
          <div id="privacy" className="space-y-space-md scroll-mt-24">
            <div className="flex items-center gap-space-sm text-secondary-container">
              <ShieldCheck size={28} />
              <h2 className="font-headline-md text-headline-md font-bold uppercase tracking-wide text-on-surface">Privacy Policy</h2>
            </div>
            <div className="prose prose-invert max-w-none text-on-surface-variant font-body-md space-y-4">
              <p>At MIHORA, data sovereignty is a core engineering principle. We do not passively collect telemetry without explicit cryptographic consent. All personal and organizational data processed by our systems is sandboxed within the jurisdiction of origin unless otherwise mandated by SLA.</p>
              <p>We maintain strict compliance with GDPR, CCPA, and regional data protection frameworks. Data retention schedules are enforced programmatically, ensuring automated purging of dormant records.</p>
            </div>
          </div>

          <div id="terms" className="space-y-space-md scroll-mt-24 pt-space-lg border-t border-surface-container-low">
            <div className="flex items-center gap-space-sm text-secondary-container">
              <Scale size={28} />
              <h2 className="font-headline-md text-headline-md font-bold uppercase tracking-wide text-on-surface">Terms of Service</h2>
            </div>
            <div className="prose prose-invert max-w-none text-on-surface-variant font-body-md space-y-4">
              <p>Access to MIHORA infrastructure, consulting services, and deployment pipelines is governed by these universal terms. By initiating a connection to our endpoints or engaging our engineering teams, you accept our standard operating procedures.</p>
              <p>We reserve the right to terminate access to our systems in the event of detected malicious activity, SLA violation, or breach of operational protocols. All proprietary architecture designed by MIHORA remains intellectual property until explicitly transferred via contract.</p>
            </div>
          </div>

          <div id="cookie" className="space-y-space-md scroll-mt-24 pt-space-lg border-t border-surface-container-low">
            <div className="flex items-center gap-space-sm text-secondary-container">
              <Cookie size={28} />
              <h2 className="font-headline-md text-headline-md font-bold uppercase tracking-wide text-on-surface">Cookie Policy</h2>
            </div>
            <div className="prose prose-invert max-w-none text-on-surface-variant font-body-md space-y-4">
              <p>Our operational interfaces utilize transient session tokens (cookies) purely for authentication, load balancing, and security validation. We do not deploy cross-site tracking pixels or third-party behavioral analytics on our core platforms.</p>
              <p>Functional cookies are required for portal access. You may configure your client to reject non-essential cookies via standard HTTP headers.</p>
            </div>
          </div>

          <div id="security" className="space-y-space-md scroll-mt-24 pt-space-lg border-t border-surface-container-low">
            <div className="flex items-center gap-space-sm text-secondary-container">
              <Lock size={28} />
              <h2 className="font-headline-md text-headline-md font-bold uppercase tracking-wide text-on-surface">Security Protocols</h2>
            </div>
            <div className="prose prose-invert max-w-none text-on-surface-variant font-body-md space-y-4">
              <p>Our security posture assumes breach. All internal traffic is mutually authenticated (mTLS), and data at rest is encrypted using AES-256 with key rotation managed via isolated Hardware Security Modules (HSMs).</p>
              <p>Vulnerability disclosures can be submitted directly to our security engineering team. We operate a zero-tolerance policy for unauthorized penetration testing on production environments without prior cryptographic clearance.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
