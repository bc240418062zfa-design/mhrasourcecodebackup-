import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, CheckCircle2, ChevronDown, Clock, ShieldCheck, Globe, ArrowUpRight, Layers
} from 'lucide-react';
import { getServiceBySlug, SERVICE_DIVISIONS, ICON_MAP } from '../data/servicesData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import {
  Reveal,
  MaskTextReveal,
  SpotlightSurface,
  Tilt3DFrame,
  StaggerGrid,
  StaggerItem,
  ParallaxFrame,
} from '../components/MotionPrimitives';
import { playUiChime } from '../utils/audio';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const DivisionIcon = ICON_MAP[service.iconKey];
  const relatedServices = SERVICE_DIVISIONS.filter((s) => service.relatedSlugs.includes(s.slug));

  const serviceSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.summary,
      provider: {
        '@id': 'https://mihora.tech/#organization',
      },
      areaServed: ['United Kingdom', 'Pakistan', 'Europe', 'Middle East', 'Global'],
      serviceType: service.shortTitle,
      url: `https://mihora.tech/services/${service.slug}/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <SEOHead
        canonicalPath={`/services/${service.slug}`}
        schemaData={serviceSchema}
      />

      {/* Obsidian Cinema Division Hero */}
      <section className="w-full obsidian-band obsidian-grid border-b border-white/10 py-14 lg:py-22 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <Breadcrumbs
            items={[
              { label: 'Services', path: '/services' },
              { label: service.shortTitle },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
                  <DivisionIcon size={15} />
                  <span>Division {service.num} · {service.shortTitle}</span>
                </div>
              </Reveal>

              <MaskTextReveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-[1.08]">
                  {service.name}
                </h1>
              </MaskTextReveal>

              <Reveal delay={0.1}>
                <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed">
                  {service.tagline}
                </p>
                <p className="text-base text-slate-300 leading-relaxed mt-3 max-w-2xl">
                  {service.overview}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15 border border-white/15 bg-black/35 rounded-xl overflow-hidden">
                  <div className="p-4">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Clock size={12} className="text-amber-400" />
                      <span>Target SLA</span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">{service.responseSla}</div>
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck size={12} className="text-emerald-400" />
                      <span>Reliability</span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">{service.availabilityTarget}</div>
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Globe size={12} className="text-blue-400" />
                      <span>Delivery Hubs</span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">{service.deliveryHubs}</div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Link
                    to="/contact"
                    onClick={() => playUiChime('click')}
                    className="inline-flex items-center gap-2 px-6 py-3 btn-primary-gradient font-semibold rounded-lg text-sm transition-all cursor-pointer"
                  >
                    <span>Scope This Division</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/how-it-works"
                    onClick={() => playUiChime('click')}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.06] border border-white/20 hover:bg-white/[0.12] text-white font-semibold rounded-lg text-sm transition-all cursor-pointer"
                  >
                    <span>See 5-Phase Delivery</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Tilt3DFrame maxTilt={4}>
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-2xl">
                  <ParallaxFrame offset={18} className="aspect-[4/3] w-full">
                    <img
                      src={service.heroImage}
                      alt={service.heroAlt}
                      className="w-full h-full object-cover"
                    />
                  </ParallaxFrame>
                  <div className="p-4 border-t border-white/10 bg-black/60 flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
                    {service.techStack.map((tech, idx) => (
                      <span key={tech} className="text-white font-semibold">
                        {tech}
                        {idx < service.techStack.length - 1 && (
                          <span className="text-slate-500 ml-2">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt3DFrame>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmarks Strip */}
      <section className="w-full bg-surface py-14 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-7xl mx-auto">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.benchmarks.map((b) => (
              <StaggerItem key={b.label}>
                <SpotlightSurface className="surface-card p-6 rounded-2xl space-y-2 h-full">
                  <div className="text-xs font-mono uppercase tracking-widest text-on-surface-variant">
                    {b.label}
                  </div>
                  <div className="font-headline text-3xl sm:text-4xl font-extrabold text-primary tabular-nums">
                    {b.value}
                  </div>
                  <p className="text-sm text-on-surface-variant">{b.note}</p>
                </SpotlightSurface>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Core Architectural Deliverables */}
      <section className="w-full bg-surface-container-low py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-7xl mx-auto space-y-10">
          <Reveal>
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Engineering Deliverables
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                What MIHORA.TECH Designs &amp; Ships in {service.shortTitle}
              </h2>
            </div>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.deliverables.map((item) => (
              <StaggerItem key={item.title}>
                <SpotlightSurface className="surface-card p-6 sm:p-7 rounded-2xl h-full space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                    <h3 className="font-headline text-lg font-bold text-on-surface">{item.title}</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed pl-8">{item.detail}</p>
                </SpotlightSurface>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Vendor vs MIHORA Comparison Matrix */}
      <section className="w-full bg-surface py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-5xl mx-auto space-y-8">
          <Reveal>
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Architectural Comparison
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                Conventional Vendors vs. MIHORA Sovereign Standard
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-x-auto rounded-2xl border border-outline/25 bg-surface-container-lowest shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline/20 bg-surface-container-low text-xs font-mono uppercase tracking-wider text-on-surface-variant">
                    <th className="p-4">Dimension</th>
                    <th className="p-4">Conventional Contractors</th>
                    <th className="p-4 text-primary">MIHORA.TECH Engineering</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline/15 text-sm">
                  {service.comparisonRows.map((row) => (
                    <tr key={row.capability} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-4 font-semibold text-on-surface">{row.capability}</td>
                      <td className="p-4 text-on-surface-variant">{row.standardVendor}</td>
                      <td className="p-4 font-medium text-on-surface">{row.mihoraStandard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Division AEO FAQs */}
      <section className="w-full bg-surface-container-low py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-4xl mx-auto space-y-8">
          <Reveal>
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Direct Technical Answers
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                Frequently Asked Questions: {service.shortTitle}
              </h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="surface-card rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => {
                      playUiChime('click');
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-container/40 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-headline text-base font-bold text-on-surface">{faq.question}</h3>
                    <ChevronDown
                      size={18}
                      className={`text-primary shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-2 text-sm text-on-surface-variant leading-relaxed border-t border-outline/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Connected Divisions & Internal Architecture Links */}
      <section className="w-full bg-surface py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Integrated Divisions
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
                Related Engineering Capabilities &amp; Resources
              </h2>
            </div>
            <Link to="/services" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              <span>View all 5 divisions</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => {
              const RelIcon = ICON_MAP[rel.iconKey];
              return (
                <Link
                  key={rel.slug}
                  to={`/services/${rel.slug}`}
                  className="surface-card p-6 rounded-2xl transition-all group space-y-3 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-primary font-semibold">
                      <span className="flex items-center gap-2">
                        <RelIcon size={15} />
                        <span>Division {rel.num}</span>
                      </span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      {rel.name}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{rel.tagline}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary pt-1">Inspect Division →</span>
                </Link>
              );
            })}

            <Link
              to="/case-studies"
              className="surface-card p-6 rounded-2xl transition-all group space-y-3 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-primary font-semibold">
                  <span className="flex items-center gap-2">
                    <Layers size={15} />
                    <span>Field Verification</span>
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                  Inspect Verified Case Studies
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Review production telemetry across interbank RTGS repatriation, 800G DWDM fiber corridors, and SCADA protection.
                </p>
              </div>
              <span className="text-xs font-semibold text-primary pt-2">Read field benchmarks →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
