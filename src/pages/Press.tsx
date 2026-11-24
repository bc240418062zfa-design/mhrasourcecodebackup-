import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Copy, Check, ArrowRight, Download } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { MaskTextReveal, Reveal } from '../components/MotionPrimitives';
import { playUiChime } from '../utils/audio';
import { VISUAL_ASSETS } from '../assets/visuals';

const OFFICIAL_CITATIONS = [
  {
    id: 'entity-bio',
    title: 'Standard Corporate Boilerplate (For Directories & Press)',
    text: 'MIHORA.TECH (MIHORA.TECH (PRIVATE) LIMITED) is an international sovereign systems engineering and physical datacenter infrastructure firm co-founded by M. Matti ul Hasnain (Principal Systems Architect) and Omema Iqbal (Operations Director). Operating synchronized command hubs in London (128 City Road, EC2A 4NE) and Islamabad (Blue Area, 44000), MIHORA delivers full-lifecycle Go/TypeScript software platforms, OS2 optical fiber construction, industrial SCADA automation, and 24/7 SRE operations.',
  },
  {
    id: 'optical-bibtex',
    title: 'BibTeX Citation · TIA-568-D & Core-Alignment Optical Tolerances',
    text: `@techreport{mihora2026optical,\n  author = {M. Matti ul Hasnain and Omema Iqbal},\n  title = {Empirical Optical Link Budgeting and Sub-0.03 dB Fusion Splicing Standards},\n  institution = {MIHORA.TECH R\\&D Labs},\n  year = {2026},\n  url = {https://mihora.tech/resources/}\n}`,
  },
];

export default function Press() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyBlock = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playUiChime('success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col w-full">
      <SEOHead
        title="Press Kit, Verified Factsheet & Technical Citations | MIHORA.TECH"
        description="Official brand assets, verified company factsheet, executive biographies for M. Matti ul Hasnain and Omema Iqbal, and technical reference citations for press and industry directories."
        canonicalPath="/press"
      />

      <section className="w-full bg-surface-container-lowest py-14 lg:py-20 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                  <Newspaper size={14} />
                  <span>Press, Media &amp; Directory Reference</span>
                </div>
              </Reveal>

              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-4xl sm:text-5xl text-on-surface tracking-tight leading-[1.08]">
                  Verified Entity Factsheet, Brand Assets &amp; Reference Citations
                </h1>
              </MaskTextReveal>

              <Reveal delay={0.12}>
                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                  Canonical corporate profile, leadership portraits, SVG vector marks, and citable open
                  standards documentation for journalists, engineering researchers, and enterprise
                  procurement registries.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-outline/25 shadow-lg">
                <img
                  src={VISUAL_ASSETS.londonCommandStudio}
                  alt="MIHORA.TECH London City Road Engineering Headquarters"
                  className="w-full h-full object-cover"
                />
                <div data-photo-overlay="true" className="contents">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                    Official Brand &amp; Entity Press Kit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Verification Grid */}
      <section className="w-full bg-surface py-14 lg:py-20 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 surface-card rounded-2xl p-7 space-y-4">
              <div className="font-mono text-xs font-bold uppercase text-primary">
                Canonical Entity Record
              </div>
              <dl className="divide-y divide-outline/15 text-sm">
                {[
                  { k: 'Legal Entity', v: 'MIHORA.TECH (PRIVATE) LIMITED' },
                  { k: 'Canonical Domain', v: 'https://mihora.tech' },
                  { k: 'Co-Founder & Principal Architect', v: 'M. Matti ul Hasnain' },
                  { k: 'Co-Founder & Operations Director', v: 'Omema Iqbal' },
                  { k: 'London Hub (UK)', v: '128 City Road, London EC2A 4NE' },
                  { k: 'Islamabad Hub (PK)', v: 'Blue Area, Islamabad 44000' },
                  { k: 'Press & Executive Contact', v: 'hr@mihora.tech' },
                ].map((row) => (
                  <div key={row.k} className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <dt className="font-mono text-xs text-on-surface-variant">{row.k}</dt>
                    <dd className="font-semibold text-on-surface text-right">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="/mihora-logo.svg"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface-container border border-outline/25 hover:border-primary rounded-lg text-xs font-semibold text-on-surface transition-colors"
                >
                  <Download size={14} className="text-primary" />
                  <span>Download Vector Mark (.SVG)</span>
                </a>
                <Link
                  to="/company/"
                  onClick={() => playUiChime('click')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline px-2 py-2.5"
                >
                  <span>Full Leadership Bios</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {OFFICIAL_CITATIONS.map((cit) => (
                <div key={cit.id} className="surface-card rounded-2xl p-6 sm:p-7 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-headline text-lg font-bold text-on-surface">{cit.title}</h2>
                    <button
                      type="button"
                      onClick={() => copyBlock(cit.id, cit.text)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-outline/20 hover:border-primary text-xs font-mono font-semibold text-primary cursor-pointer"
                    >
                      {copiedId === cit.id ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copiedId === cit.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-surface-container-low border border-outline/15 text-xs text-on-surface-variant font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {cit.text}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
