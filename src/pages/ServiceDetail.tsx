import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, ChevronDown, Clock, ShieldCheck, Globe, ArrowUpRight, Layers
} from 'lucide-react';
import { getServiceBySlug, SERVICE_DIVISIONS, ICON_MAP } from '../data/servicesData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { Reveal, StaggerGrid, StaggerItem, ParallaxFrame } from '../components/MotionPrimitives';
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

      {/* Asymmetric Division Hero */}
      <section className="w-full bg-surface-container-lowest border-b border-outline/20 py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Breadcrumbs
            items={[
              { label: 'Services', path: '/services' },
              { label: service.shortTitle },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                  <DivisionIcon size={16} />
                  <span>Division {service.num} · {service.shortTitle}</span>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-on-surface tracking-tight leading-tight">
                  {service.name}
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-lg sm:text-xl text-on-surface font-medium leading-relaxed">
                  {service.tagline}
                </p>
                <p className="text-base text-on-surface-variant leading-relaxed mt-3">
                  {service.overview}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline/20">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                      <Clock size={12} className="text-primary" />
                      <span>Target SLA</span>
                    </div>
                    <div className="text-sm font-bold text-on-surface mt-1">{service.responseSla}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline/20">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                      <ShieldCheck size={12} className="text-primary" />
                      <span>Reliability</span>
                    </div>
                    <div className="text-sm font-bold text-on-surface mt-1">{service.availabilityTarget}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline/20">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                      <Globe size={12} className="text-primary" />
                      <span>Delivery Hubs</span>
                    </div>
                    <div className="text-sm font-bold text-on-surface mt-1">{service.deliveryHubs}</div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg text-sm shadow-sm transition-all cursor-pointer"
                  >
                    <span>Scope This Division</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/how-it-works"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface font-semibold rounded-lg text-sm transition-all cursor-pointer"
                  >
                    <span>See 5-Phase Delivery</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="left">
                <div className="rounded-2xl overflow-hidden border border-outline/25 bg-surface-container-low shadow-xl">
                  <ParallaxFrame offset={20} className="aspect-[4/3] w-full">
                    <img
                      src={service.heroImage}
                      alt={service.heroAlt}
                      className="w-full h-full object-cover"
                    />
                  </ParallaxFrame>
                  <div className="p-4 border-t border-outline/20 bg-surface-container-lowest flex flex-wrap gap-2 text-[11px] font-mono text-on-surface-variant">
                    {service.techStack.map((tech) => (
                      <span key={tech} className="text-on-surface font-semibold">
                        {tech}
                        <span className="text-outline/50 ml-2 last:hidden">·</span>
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmarks Strip */}
      <section className="w-full bg-surface py-12 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-7xl mx-auto">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.benchmarks.map((b) => (
              <StaggerItem key={b.label}>
                <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/20 space-y-2 h-full">
                  <div className="text-xs font-mono uppercase tracking-widest text-on-surface-variant">
                    {b.label}
                  </div>
                  <div className="font-headline text-3xl sm:text-4xl font-extrabold text-primary tabular-nums">
                    {b.value}
                  </div>
                  <p className="text-sm text-on-surface-variant">{b.note}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Core Architectural Deliverables */}
      <section className="w-full bg-surface-container-low py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
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
                <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/20 hover:border-primary/40 transition-colors h-full space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                    <h3 className="font-headline text-lg font-bold text-on-surface">{item.title}</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed pl-8">{item.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Vendor vs MIHORA Comparison Matrix */}
      <section className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
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
            <div className="overflow-x-auto rounded-2xl border border-outline/25 bg-surface-container-lowest">
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
      <section className="w-full bg-surface-container-low py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
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
                  className="rounded-xl border border-outline/25 bg-surface-container-lowest overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => {
                      playUiChime('click');
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-container/40 transition-colors"
                  >
                    <h3 className="font-headline text-base font-bold text-on-surface">{faq.question}</h3>
                    <ChevronDown
                      size={18}
                      className={`text-primary shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-on-surface-variant leading-relaxed border-t border-outline/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Connected Divisions & Internal Architecture Links */}
      <section className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Integrated Divisions
              </div>
              <h2 className="font-headline text-2xl font-extrabold text-on-surface">
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
                  className="p-6 rounded-2xl bg-surface-container-lowest border border-outline/20 hover:border-primary/50 transition-all group space-y-3 cursor-pointer"
                >
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
                </Link>
              );
            })}

            <Link
              to="/case-studies"
              className="p-6 rounded-2xl bg-surface-container-low border border-outline/25 hover:border-primary/50 transition-all group space-y-3 cursor-pointer flex flex-col justify-between"
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
