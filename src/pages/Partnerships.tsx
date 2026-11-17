import { Link } from 'react-router-dom';
import { Globe, Server, Cpu, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { Reveal, StaggerGrid, StaggerItem } from '../components/MotionPrimitives';
import { VISUAL_ASSETS } from '../assets/visuals';

const ALLIANCE_TRACKS = [
  {
    icon: Globe,
    title: 'Carrier & IXP Optical Peering',
    description:
      'Direct cross-connect provisioning, BGP Anycast wavelength diversity, and dark fiber backhaul partnerships linking subsea cable landing stations to metropolitan PoPs.',
    points: [
      '400G/800G DWDM wavelength transit coordination',
      'Co-engineered redundant ring failover across UK & South Asia',
      'Joint bidirectional EXFO OTDR splice maintenance agreements',
    ],
  },
  {
    icon: Server,
    title: 'Sovereign Colocation Facilities',
    description:
      'Partnering with Tier III and Tier IV datacenter operators to equip private isolated security cages, 2N ATS busbars, and hot-aisle containment.',
    points: [
      'Turnkey 42U/48U high-density rack & PDU commissioning',
      'Out-of-band IPMI management network isolation',
      'On-site smart-hands escalation backed by MIHORA field teams',
    ],
  },
  {
    icon: Cpu,
    title: 'Industrial Hardware & Silicon OEMs',
    description:
      'Co-qualifying ruggedized edge compute boxes, optical isolation diodes, FIPS 140-3 HSM modules, and calibrated surveillance hardware for harsh field environments.',
    points: [
      'Joint thermal, EMI, and power-draw laboratory validation',
      'Custom SCADA & Modbus RTU/TCP firmware bridge integration',
      'Pre-staged hot-swap spares stocking across regional hubs',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'System Integrators & Advisory Firms',
    description:
      'White-label or co-branded physical infrastructure and distributed software engineering delivery for global consultancies requiring verified execution capability.',
    points: [
      'Clear non-compete governance overseen by Executive Operations',
      'Shared UK (London) and Pakistan (Islamabad) follow-the-sun shifts',
      'Strict NDA containment and full client source ownership handoffs',
    ],
  },
];

export default function Partnerships() {
  return (
    <div className="flex flex-col w-full">
      <SEOHead canonicalPath="/partnerships" />

      {/* Hero */}
      <section className="w-full bg-surface-container-lowest border-b border-outline/20 py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Company', path: '/company' },
              { label: 'Partnerships' },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Reveal>
                <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                  Infrastructure &amp; Ecosystem Alliances
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-on-surface tracking-tight leading-tight">
                  Strategic Carrier, Colocation &amp; Hardware Partnerships
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                  Directed by Co-Founders M. Matti ul Hasnain and Omema Iqbal, MIHORA.TECH builds direct technical alliances with optical carriers, sovereign colocation operators, OEM manufacturers, and enterprise transformation consultancies across London, Europe, the Middle East, and South Asia.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg text-sm transition-all cursor-pointer"
                  >
                    <span>Propose Technical Alliance</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/company"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface font-semibold rounded-lg text-sm transition-all cursor-pointer"
                  >
                    <span>Company Leadership</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="left">
                <div className="rounded-2xl overflow-hidden border border-outline/25 bg-surface-container-low shadow-lg">
                  <img
                    src={VISUAL_ASSETS.sovereignCommandHub}
                    alt="MIHORA.TECH systems command operations center coordinating international partner deployments"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Alliance Tracks */}
      <section className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8 border-b border-outline/20">
        <div className="max-w-7xl mx-auto space-y-10">
          <Reveal>
            <div className="space-y-2 max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Collaboration Tracks
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
                Four Ways Infrastructure Partners Work With MIHORA.TECH
              </h2>
            </div>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALLIANCE_TRACKS.map((track) => {
              const Icon = track.icon;
              return (
                <StaggerItem key={track.title}>
                  <div className="p-7 rounded-2xl bg-surface-container-lowest border border-outline/25 space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Icon size={22} />
                      </div>
                      <h3 className="font-headline text-xl font-bold text-on-surface">{track.title}</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{track.description}</p>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-outline/15">
                      {track.points.map((p) => (
                        <div key={p} className="flex items-start gap-2.5 text-sm text-on-surface">
                          <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-surface-container-low py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
            Initiate a Peering, Colocation, or OEM Qualification Review
          </h2>
          <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
            Connect directly with our London and Islamabad partner operations teams at{' '}
            <a href="mailto:hr@mihora.tech" className="text-primary font-semibold hover:underline">
              hr@mihora.tech
            </a>{' '}
            or submit project parameters through our dispatch desk.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg text-sm inline-flex items-center gap-2"
            >
              <span>Contact Partner Desk</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/engineering#subsea-cable-explorer"
              className="px-6 py-3 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface font-semibold rounded-lg text-sm"
            >
              Inspect Subsea Optical Routes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
