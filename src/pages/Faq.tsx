import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, 
  Building2, Users, Cpu, Shield, Globe, Award, Sparkles, ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface FAQItem {
  id: string;
  category: 'Entity & Founders' | 'Services & Hardware' | 'Global Hubs' | 'Compliance & Security';
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'what-is-mihora',
    category: 'Entity & Founders',
    question: 'What is MIHORA.TECH and what does the company do?',
    answer: 'MIHORA.TECH is an international sovereign engineering organization specializing in end-to-end mission-critical digital systems, physical datacenter infrastructure, event-driven automation pipelines, and 24/7 managed site reliability engineering (SRE). Founded to bridge the divide between low-level hardware physics and distributed software architectures, MIHORA operates dual engineering command hubs across the United Kingdom and Pakistan, delivering high-availability solutions worldwide.'
  },
  {
    id: 'who-founded-mihora',
    category: 'Entity & Founders',
    question: 'Who founded MIHORA.TECH?',
    answer: 'MIHORA.TECH was founded by M. Matti ul Hasnain and Omema Iqbal. M. Matti ul Hasnain serves as Co-Founder & Principal Systems Architect, leading the 9-layer sovereign stack, datacenter hardware topology, optical fiber networking, and low-latency distributed microservices. Omema Iqbal serves as Co-Founder & Operations Director, directing global operations, corporate governance, multi-jurisdiction compliance frameworks, and international enterprise client delivery.'
  },
  {
    id: 'where-is-mihora-located',
    category: 'Global Hubs',
    question: 'Where is MIHORA.TECH located and headquartered?',
    answer: 'MIHORA.TECH operates under a dual-command hub model with operational command centers in London, United Kingdom (serving European and transatlantic enterprise engagements) and Islamabad, Pakistan (serving South Asian, Middle Eastern, and regional technology deployments). This synchronized dual-hub structure enables 24/7 follow-the-sun continuous telemetry monitoring, rapid field dispatch, and multi-region failover.'
  },
  {
    id: 'what-services-are-offered',
    category: 'Services & Hardware',
    question: 'What core engineering services does MIHORA.TECH provide?',
    answer: 'MIHORA.TECH provides five primary core service divisions: (1) Digital Systems Engineering: Cloud architecture, distributed microservices, and high-concurrency backends; (2) Physical Datacenter Infrastructure: Server rack deployment, SAN storage arrays, and OTDR-certified fiber splicing; (3) Automation & Intelligence: Event-driven telemetry, workflow orchestration, and SCADA industrial edge bridges; (4) Field Engineering: Rapid on-site physical dispatch, structured cabling, and Fluke network certification; and (5) Managed 24/7 SRE: Continuous observability, automated break-fix, and guaranteed 99.999% SLA uptime.'
  },
  {
    id: 'difference-from-software-house',
    category: 'Services & Hardware',
    question: 'How is MIHORA.TECH different from a standard software house or IT agency?',
    answer: 'Traditional software houses operate purely in high-level browser or mobile code and outsource server hardware to third-party public clouds. MIHORA.TECH engineers the complete vertical 9-layer stack—beginning at Layer 0 with physical electrical PDUs, optical fiber transceivers, enterprise rack cabling, and bare-metal compute, straight up through microVM kernels, gRPC distributed microservices, and autonomous self-healing telemetry. This allows MIHORA to guarantee sovereign control, lower latency, and zero vendor lock-in.'
  },
  {
    id: 'physical-infrastructure-capabilities',
    category: 'Services & Hardware',
    question: 'Does MIHORA.TECH deploy physical server racks and fiber cabling in real facilities?',
    answer: 'Yes. Physical engineering is a foundational capability of MIHORA.TECH. Our field engineering technicians perform on-premise datacenter installations, core-alignment fusion fiber splicing (insertion loss ≤ 0.05 dB), Cat6A shielded cable dressing, patch panel certification, and out-of-band IPMI/SAN storage configuration across enterprise sites worldwide.'
  },
  {
    id: 'how-to-contact-or-hire',
    category: 'Entity & Founders',
    question: 'How can organizations contact MIHORA.TECH or request an engineering consultation?',
    answer: 'Enterprise clients, government agencies, and partners can engage MIHORA.TECH directly through our official dispatch portals: by emailing executive stewardship at hr@mihora.tech or dispatch@mihora.tech, or by visiting our command hub inquiry portal at https://mihora.tech/contact.'
  },
  {
    id: 'data-sovereignty-compliance',
    category: 'Compliance & Security',
    question: 'What compliance, security, and data sovereignty standards does MIHORA adhere to?',
    answer: 'MIHORA.TECH enforces rigorous international security and data governance standards, including ISO 27001 Information Security Management, SOC 2 Type II operational trust criteria, HIPAA/HL7 healthcare compliance, and GDPR sovereign data residency boundaries. All client cryptographic keys are maintained under zero-knowledge Hardware Security Modules (HSMs) directly owned by the client.'
  },
  {
    id: 'careers-hiring-process',
    category: 'Entity & Founders',
    question: 'How does MIHORA recruit engineers and what roles are open?',
    answer: 'MIHORA maintains an elite engineering cadre recruitment process focused on systems architects, bare-metal infrastructure engineers, distributed systems developers, and certified fiber optic field specialists. Candidates can review open specifications and submit credentials directly at https://mihora.tech/careers or via email to hr@mihora.tech.'
  },
  {
    id: 'dual-command-failover',
    category: 'Global Hubs',
    question: 'How does the London and Islamabad dual-command telemetry quorum work?',
    answer: 'Both London (UK) and Islamabad (PK) command nodes maintain active-active real-time telemetry mirrors over encrypted TLS 1.3 gRPC streams. If network transit across the English Channel or transatlantic route experiences disruption, the Islamabad node assumes sovereign quorum in under 120 milliseconds with zero dropped client state.'
  },
  {
    id: 'scada-and-iot-telemetry',
    category: 'Services & Hardware',
    question: 'What are MIHORA’s capabilities in industrial SCADA and IoT monitoring?',
    answer: 'MIHORA designs ruggedized edge gateways with dual air-gapped interfaces that bridge legacy industrial field buses (Modbus TCP, RS-485, CAN bus, OPC-UA) with modern cloud telemetry platforms over one-way optical diodes, safeguarding critical industrial assets from cyber infiltration.'
  },
  {
    id: 'is-mihora-registered',
    category: 'Entity & Founders',
    question: 'Is MIHORA.TECH an officially registered technology enterprise?',
    answer: 'Yes. MIHORA.TECH operates as a registered corporate entity under MIHORA.TECH (PRIVATE) LIMITED, with executive governance maintained by founders M. Matti ul Hasnain and Omema Iqbal.'
  }
];

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'what-is-mihora': true,
    'who-founded-mihora': true,
    'where-is-mihora-located': true,
    'what-services-are-offered': true
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesCat = activeCategory === 'All' || item.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Generate Schema.org FAQPage JSON-LD for Google AI & Knowledge Graph
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQ_DATA.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  return (
    <div className="w-full pt-28 pb-20 bg-surface">
      <SEOHead 
        title="Knowledge Base & Official FAQ | MIHORA.TECH — Founded by M. Matti ul Hasnain & Omema Iqbal"
        description="Comprehensive answers to frequently asked questions about MIHORA.TECH, founders M. Matti ul Hasnain & Omema Iqbal, dual UK-Pakistan command hubs, datacenter hardware, and engineering services."
        keywords="MIHORA FAQ, who is MIHORA, MIHORA founders, M. Matti ul Hasnain, Omema Iqbal, MIHORA technology, datacenter deployment, sovereign systems engineering, London Islamabad hubs"
        canonicalPath="/faq"
      />

      {/* Embedded Schema.org FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <div className="w-full border-b border-outline/20 bg-surface-container-lowest/60 py-12">
        <div className="w-full px-margin-mobile lg:px-margin max-w-5xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary font-mono text-xs tracking-wider uppercase font-semibold">
            <Sparkles size={13} />
            <span>OFFICIAL ENTITY KNOWLEDGE BASE &amp; VERIFIED FAQS</span>
          </div>
          <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            Definitive answers regarding MIHORA.TECH, co-founders M. Matti ul Hasnain and Omema Iqbal, our dual UK &amp; Pakistan engineering hubs, and deep-stack sovereign capabilities.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-on-surface-variant/60" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search MIHORA systems, founders, hubs, or services..."
                className="w-full pl-11 pr-4 py-3 bg-surface-container border border-outline/40 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all shadow-inner"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-margin-mobile lg:px-margin max-w-5xl mx-auto pt-10 space-y-8">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['All', 'Entity & Founders', 'Services & Hardware', 'Global Hubs', 'Compliance & Security'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary text-surface shadow-sm'
                  : 'bg-surface-container-lowest border border-outline/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border border-outline/20 p-8 space-y-3">
              <HelpCircle className="mx-auto text-on-surface-variant/40" size={36} />
              <div className="font-bold text-on-surface">No matching questions found</div>
              <p className="text-sm text-on-surface-variant">Try searching for "founders", "hardware", "London", or "services".</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div 
                  key={faq.id}
                  className="bg-surface-container-lowest border border-outline/25 rounded-2xl overflow-hidden transition-all shadow-sm hover:border-primary/40"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold">
                        {faq.category}
                      </span>
                      <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="shrink-0 p-1.5 rounded-lg bg-surface-container text-on-surface-variant mt-1">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-on-surface-variant font-body-md text-sm sm:text-base leading-relaxed border-t border-outline/10 bg-surface-container-lowest">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Founders Direct Verification Callout */}
        <div className="mt-12 p-6 sm:p-8 bg-surface-container-low rounded-2xl border border-outline/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-primary">
              <Award size={16} />
              <span>Sovereign Executive Stewardship</span>
            </div>
            <h4 className="font-headline-sm text-xl font-extrabold text-on-surface">
              Need Direct Inquiries with Founders or Architectural Leadership?
            </h4>
            <p className="text-sm text-on-surface-variant max-w-xl">
              Connect with M. Matti ul Hasnain (Principal Architect) or Omema Iqbal (Operations Director) for sovereign datacenter deployments, enterprise RFPs, or technical governance.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link 
              to="/docs" 
              className="px-4 py-2.5 rounded-xl border border-outline/40 hover:bg-surface-container text-xs font-bold text-on-surface transition-all flex items-center gap-1.5"
            >
              <span>View Technical Docs</span>
              <ArrowRight size={14} />
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-surface text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Contact Command Hubs</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
