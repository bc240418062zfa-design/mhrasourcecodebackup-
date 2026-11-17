import { useEffect, useState, useMemo, useRef } from 'react';
import {
  Menu, X, Search, ArrowRight, Sun, Moon, Bot, Zap,
  Volume2, VolumeX, ChevronDown, Layers, BookOpen, HelpCircle,
  FileText, Building, Activity, Server, Cpu, Briefcase, Workflow,
  Compass, Handshake, ShieldCheck
} from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { BrandLogo } from './BrandLogo';
import { SEOHead } from './SEOHead';
import { ScrollProgressBar } from './MotionPrimitives';
import { queryAIEngine, type AIResponse } from './AIEngine';
import { isSoundEnabled, toggleSound, subscribeSoundChange } from '../utils/audio';

interface SearchItem {
  title: string;
  category: string;
  path: string;
  description: string;
}

const SEARCH_CATALOG: SearchItem[] = [
  { title: 'Digital Systems Engineering', category: 'Services', path: '/services/digital-engineering', description: 'High-concurrency Go & TypeScript backends, partitioned data stores, and mTLS v1.3 gateways' },
  { title: 'Automation & Applied Intelligence', category: 'Services', path: '/services/automation-intelligence', description: 'Deterministic Kafka/Temporal orchestration, Modbus SCADA bridges, and private inference' },
  { title: 'Physical Datacenter Infrastructure', category: 'Services', path: '/services/physical-infrastructure', description: 'Tier III/IV server racks, OS2 fiber splicing (<=0.03 dB), EVPN-VXLAN, and 2N ATS power' },
  { title: 'Tactical Field Engineering Rigs', category: 'Services', path: '/services/field-engineering', description: '4-hour emergency SLA dispatch, EXFO OTDR & Fluke DSX-8000 certification, and NEMA CCTV' },
  { title: 'Managed Technology & 24/7 SRE', category: 'Services', path: '/services/managed-sre', description: 'Follow-the-sun London & Islamabad NOC/SOC oversight with 99.999% uptime orchestration' },
  { title: 'How It Works — 5-Phase Methodology', category: 'Methodology', path: '/how-it-works', description: 'Discovery, 9-layer blueprinting, hardware/software fabrication, zero-downtime cutover, and 24/7 SRE' },
  { title: 'Enterprise Case Studies & Benchmarks', category: 'Case Studies', path: '/case-studies', description: 'National interbank RTGS repatriation, 1,400 km DWDM corridor, and substation SCADA air-gaps' },
  { title: 'Engineering Knowledge Hub & Standards', category: 'Resources', path: '/resources', description: 'Optical splice budgets (TIA-568-D), Uptime Tier downtime math, whitepapers, and tools' },
  { title: 'Strategic Partnerships & Carrier Peering', category: 'Company', path: '/partnerships', description: 'Tier-1 optical carriers, sovereign colocation alliances, and hardware OEM collaboration' },
  { title: 'Sovereign Proposal & RFP Builder', category: 'Solutions', path: '/solutions#sovereign-rfp-builder', description: 'Interactive architecture BOM, rack power estimator, and dispatch specification tool' },
  { title: '9-Layer Sovereign Architecture Stack', category: 'Engineering', path: '/engineering#architecture', description: 'Silicon substrates to cloud telemetry full-span technical model' },
  { title: 'Subsea Cable & Terrestrial Fiber Explorer', category: 'Engineering', path: '/engineering#subsea-cable-explorer', description: 'Interactive global maritime optical cables, PEACE, SMW5, and terrestrial dark fiber rings' },
  { title: 'Industries & Regulated Sectors', category: 'Industries', path: '/industries', description: 'Financial Settlement, Healthcare Diagnostics, Energy SCADA, Logistics, Telecom, and Enterprise' },
  { title: 'Founders & Executive Leadership', category: 'Company', path: '/company#leadership', description: 'Co-founded by M. Matti ul Hasnain & Omema Iqbal across London (UK) and Islamabad (Pakistan)' },
  { title: 'Technical Documentation Codex', category: 'Docs', path: '/docs', description: 'Authoritative engineering codex covering cabling tolerances, kernel tuning, and hub quorum' },
  { title: 'Engineering Papers & Live Research', category: 'Insights', path: '/insights', description: 'Empirical systems research, whitepapers, and grounded industry intelligence' },
  { title: 'Verified Entity FAQs', category: 'FAQ', path: '/faq', description: 'Direct answers on MIHORA.TECH governance, founders, global hubs, and service SLAs' },
  { title: 'Infrastructure Status & Telemetry', category: 'Status', path: '/status', description: 'Live 99.999% operational record, PUE metrics, and dual-hub corridor latency' },
  { title: 'Join Engineering (Careers)', category: 'Careers', path: '/careers', description: 'Open systems architecture, SRE, and field engineering roles in UK & Pakistan' },
  { title: 'Contact & Direct Dispatch', category: 'Contact', path: '/contact', description: 'Engage London or Islamabad architecture teams or initiate urgent field dispatch' },
  { title: 'Our Story & Founding Thesis', category: 'Company', path: '/our-story', description: 'Origin story of M. Matti ul Hasnain & Omema Iqbal uniting glass optics and cloud architecture' },
  { title: 'Zero-Trust Security & Compliance Center', category: 'Security', path: '/security', description: 'FIPS 140-3 HSM key custody, optical SCADA diodes, ISO 27001 & UK-GDPR governance' },
  { title: 'SLA, Optical Fiber & TCO Calculators', category: 'Tools', path: '/tools', description: 'Interactive downtime budget, TIA-568-D link attenuation, and 5-year TCO estimators' },
  { title: 'Engineering & Optical Glossary', category: 'Resources', path: '/glossary', description: 'Searchable definitions covering OTDR, OS2 fiber, EVPN-VXLAN, and sovereign custody' },
  { title: 'Sovereign vs. Hyperscale Cloud Comparison', category: 'Compare', path: '/compare', description: 'Decision matrix evaluating custody, bandwidth egress, and reliability models' },
  { title: 'Press Kit & Verified Factsheet', category: 'Company', path: '/press', description: 'Official brand assets, executive biographies, and copyable BibTeX citations' },
  { title: 'Privacy Policy & GDPR Governance', category: 'Legal', path: '/privacy', description: 'Zero-leakage telemetry rules, UK-GDPR compliance, and jurisdictional data sovereignty' },
  { title: 'Terms of Service & IP Custody', category: 'Legal', path: '/terms', description: 'Standard terms governing platform use, SLA accountability, and full source ownership' },
  { title: 'Technical Disclaimer & Legal Portal', category: 'Legal', path: '/disclaimer', description: 'Engineering specification scope, ISO 27001 controls, and disclosure protocols' },
];

interface MegaMenuItem {
  label: string;
  desc: string;
  path: string;
  badge?: string;
}

interface NavGroup {
  id: string;
  label: string;
  primaryPath: string;
  items: MegaMenuItem[];
  featured: {
    kicker: string;
    title: string;
    detail: string;
    ctaLabel: string;
    ctaPath: string;
  };
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'services',
    label: 'Services',
    primaryPath: '/services',
    items: [
      { label: 'All Service Divisions', desc: 'Complete 5-division overview and interactive estimator', path: '/services' },
      { label: '01 · Digital Systems Engineering', desc: 'Go & TypeScript microservices, mTLS APIs, data platforms', path: '/services/digital-engineering' },
      { label: '02 · Automation & Intelligence', desc: 'Event orchestration, SCADA bridges & private AI', path: '/services/automation-intelligence' },
      { label: '03 · Physical Infrastructure', desc: 'Tier III/IV server racks, OS2 fiber & 2N power', path: '/services/physical-infrastructure' },
      { label: '04 · Tactical Field Engineering', desc: '4-hour emergency SLA, OTDR splicing & Fluke certification', path: '/services/field-engineering' },
      { label: '05 · 24/7 Managed SRE', desc: 'Follow-the-sun London & Islamabad NOC/SOC telemetry', path: '/services/managed-sre' },
    ],
    featured: {
      kicker: 'Full-Stack Accountability',
      title: 'Zero Vendor Gaps Between Glass & Cloud',
      detail: 'One unified engineering accountability chain spanning fusion-spliced dark fiber through distributed software consensus.',
      ctaLabel: 'Explore All Services',
      ctaPath: '/services',
    },
  },
  {
    id: 'solutions',
    label: 'Solutions',
    primaryPath: '/solutions',
    items: [
      { label: 'Sovereign Solutions Overview', desc: 'Bottleneck diagnostics, 6 core pillars & vendor matrix', path: '/solutions' },
      { label: 'How It Works (5 Phases)', desc: 'Discovery through zero-downtime cutover methodology', path: '/how-it-works', badge: 'Process' },
      { label: 'Enterprise Case Studies', desc: 'Verified financial RTGS, DWDM fiber & SCADA benchmarks', path: '/case-studies' },
      { label: 'Industries Served', desc: 'Banking, Healthcare, Energy, Logistics & SaaS sectors', path: '/industries' },
      { label: 'Sovereign RFP Specifier', desc: 'Instant architecture BOM & power sizing configurator', path: '/solutions#sovereign-rfp-builder' },
    ],
    featured: {
      kicker: 'Scope Configurator',
      title: 'Generate an Architecture BOM & SLA Spec',
      detail: 'Translate operational constraints into deterministic rack density, fiber diversity, and team structure within minutes.',
      ctaLabel: 'Open RFP Specifier',
      ctaPath: '/solutions#sovereign-rfp-builder',
    },
  },
  {
    id: 'engineering',
    label: 'Engineering',
    primaryPath: '/engineering',
    items: [
      { label: '9-Layer Architecture Stack', desc: 'Interactive blueprint from silicon to operational edge', path: '/engineering#architecture' },
      { label: 'Zero-Trust Security Center', desc: 'HSM key custody, optical SCADA diodes & ISO 27001', path: '/security', badge: 'Security' },
      { label: 'Subsea & Terrestrial Fiber Explorer', desc: 'PEACE, SMW5, and sovereign dark fiber ring paths', path: '/engineering#subsea-cable-explorer' },
      { label: 'Sovereign vs. Cloud Comparison', desc: 'Architecture trade-off & egress economics matrix', path: '/compare' },
      { label: 'Live Infrastructure Status', desc: '99.999% SLA history, corridor RTT & hub telemetry', path: '/status', badge: '99.999%' },
    ],
    featured: {
      kicker: 'Physical Verification',
      title: 'Mean Splice Loss <= 0.03 dB Across 250k+ Meters',
      detail: 'Every optical span and server hall built by MIHORA ships with bidirectional Fluke OTDR traces.',
      ctaLabel: 'Inspect Architecture',
      ctaPath: '/engineering',
    },
  },
  {
    id: 'company',
    label: 'Company',
    primaryPath: '/company',
    items: [
      { label: 'Company & Founders', desc: 'M. Matti ul Hasnain & Omema Iqbal · Dual-Hub Leadership', path: '/company' },
      { label: 'Our Story & Founding Thesis', desc: 'How London & Islamabad became one unified spine', path: '/our-story', badge: 'Story' },
      { label: 'Strategic Partnerships', desc: 'Carrier peering, sovereign colocation & hardware OEMs', path: '/partnerships' },
      { label: 'Press Kit & Citations', desc: 'Official vector marks, entity bio & technical references', path: '/press' },
      { label: 'Engineering Careers', desc: 'Open technical positions & UK/Pakistan relocation', path: '/careers' },
    ],
    featured: {
      kicker: 'Executive Governance',
      title: 'London (UK) & Islamabad (Pakistan)',
      detail: 'Synchronized follow-the-sun command hubs uniting systems architecture under unified engineering custody.',
      ctaLabel: 'Meet the Founders',
      ctaPath: '/company#leadership',
    },
  },
  {
    id: 'resources',
    label: 'Resources',
    primaryPath: '/resources',
    items: [
      { label: 'SLA, Fiber & TCO Calculators', desc: 'Interactive downtime, OS2 loss & TCO estimators', path: '/tools', badge: 'Interactive' },
      { label: 'Knowledge Hub & Standards', desc: 'Optical loss tables, Tier SLA math & architecture references', path: '/resources' },
      { label: 'Engineering Glossary (A–Z)', desc: 'Authoritative definitions for OTDR, EVPN & HSM terms', path: '/glossary' },
      { label: 'Technical Documentation Codex', desc: 'Complete engineering specs, kernel rules & runbooks', path: '/docs' },
      { label: 'Research Papers & Insights', desc: 'Peer-reviewed systems monographs & grounded intelligence', path: '/insights' },
      { label: 'Verified Entity FAQ', desc: 'Direct answers on MIHORA, founders, security & SLAs', path: '/faq' },
    ],
    featured: {
      kicker: 'Open Reference',
      title: 'Technical Standards Without Marketing Fluff',
      detail: 'Run optical loss math, inspect SLA downtime budgets, and review verified deployment benchmarks.',
      ctaLabel: 'Open Calculators',
      ctaPath: '/tools',
    },
  },
];

const MOBILE_NAV_LINKS = [
  { label: 'Services & Divisions', path: '/services', icon: Server, desc: 'Digital, AI automation, fiber & 24/7 SRE' },
  { label: 'Solutions & RFP Builder', path: '/solutions', icon: Layers, desc: 'Enterprise transformation & BOM configurator' },
  { label: 'How It Works', path: '/how-it-works', icon: Workflow, desc: '5-phase sovereign engineering methodology' },
  { label: 'Enterprise Case Studies', path: '/case-studies', icon: Compass, desc: 'Verified RTGS, 800G DWDM & SCADA builds' },
  { label: 'Engineering & 9-Layer Stack', path: '/engineering', icon: Cpu, desc: 'Silicon-to-cloud stack & subsea fiber explorer' },
  { label: 'Zero-Trust Security Center', path: '/security', icon: ShieldCheck, desc: 'HSM key custody, SCADA diodes & ISO 27001' },
  { label: 'Engineering Calculators', path: '/tools', icon: Zap, desc: 'SLA downtime, OS2 fiber loss & 5-year TCO tools' },
  { label: 'Sovereign vs. Cloud Compare', path: '/compare', icon: Compass, desc: 'Custody & egress economics matrix' },
  { label: 'Industries Served', path: '/industries', icon: ShieldCheck, desc: 'Finance, Healthcare, Energy & Logistics' },
  { label: 'Knowledge Hub & Resources', path: '/resources', icon: BookOpen, desc: 'TIA-568-D standards, SLA math & whitepapers' },
  { label: 'Engineering Glossary', path: '/glossary', icon: BookOpen, desc: 'Searchable systems & optical terminology' },
  { label: 'Technical Docs Codex', path: '/docs', icon: FileText, desc: 'Specifications, hardware tolerances & runbooks' },
  { label: 'Insights & Research', path: '/insights', icon: FileText, desc: 'Whitepapers & grounded industry news' },
  { label: 'Company & Founders', path: '/company', icon: Building, desc: 'M. Matti ul Hasnain, Omema Iqbal & global hubs' },
  { label: 'Our Story', path: '/our-story', icon: Building, desc: 'Founding doctrine & synchronized hubs' },
  { label: 'Strategic Partnerships', path: '/partnerships', icon: Handshake, desc: 'Carrier peering & colocation alliances' },
  { label: 'Press Kit & Citations', path: '/press', icon: FileText, desc: 'Media boilerplate, marks & BibTeX references' },
  { label: 'Infrastructure Status', path: '/status', icon: Activity, desc: 'Live 99.999% SLA & dual-hub telemetry' },
  { label: 'Verified Entity FAQ', path: '/faq', icon: HelpCircle, desc: 'Direct answers & corporate governance' },
  { label: 'Careers at MIHORA', path: '/careers', icon: Briefcase, desc: 'Engineering roles across UK & Pakistan' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'cyber' | 'light'>('cyber');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<'catalog' | 'ai'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [timeLondon, setTimeLondon] = useState('');
  const [timeIslamabad, setTimeIslamabad] = useState('');
  const [soundOn, setSoundOn] = useState(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const unsubscribe = subscribeSoundChange((enabled) => {
      setSoundOn(enabled);
    });
    return unsubscribe;
  }, []);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimeLondon(now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour12: false }));
      setTimeIslamabad(now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Karachi', hour12: false }));
    };
    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('mihora-theme');
    if (savedTheme === 'light') {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('cyber');
      document.documentElement.setAttribute('data-theme', 'cyber');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'cyber' : 'light';
    setTheme(newTheme);
    localStorage.setItem('mihora-theme', newTheme);
    if (newTheme === 'cyber') {
      document.documentElement.setAttribute('data-theme', 'cyber');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (searchOpen) setSearchOpen(false);
        if (activeMegaMenu) setActiveMegaMenu(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, activeMegaMenu]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  const filteredSearchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return SEARCH_CATALOG.slice(0, 8);
    }
    const q = searchQuery.toLowerCase();
    return SEARCH_CATALOG.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelectSearchItem = (path: string) => {
    setSearchOpen(false);
    setSearchQuery('');
    setAiResponse(null);
    navigate(path);
  };

  const handleAskAI = (promptText?: string) => {
    const q = promptText || searchQuery;
    if (!q.trim()) return;
    setIsAiProcessing(true);
    setSearchMode('ai');
    setTimeout(() => {
      const res = queryAIEngine(q);
      setAiResponse(res);
      setIsAiProcessing(false);
    }, 240);
  };

  const handleNavEnter = (id: string) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMegaMenu(id);
  };

  const handleNavLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveMegaMenu(null);
    }, 160);
  };

  const activeGroup = useMemo(
    () => NAV_GROUPS.find((g) => g.id === activeMegaMenu),
    [activeMegaMenu]
  );

  const isGroupActive = (group: NavGroup) => {
    if (location.pathname === group.primaryPath) return true;
    return group.items.some((item) => {
      const base = item.path.split('#')[0];
      return base !== '/' && location.pathname.startsWith(base);
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface text-on-surface">
      <SEOHead />
      <ScrollProgressBar />

      {/* WCAG Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Header + Desktop Mega Menu */}
      <header
        ref={navContainerRef}
        onMouseLeave={handleNavLeave}
        className="fixed top-0 left-0 w-full z-50 bg-surface/92 backdrop-blur-xl border-b border-outline/20 transition-colors"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Zone 1: Brand Identity */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0 select-none py-1 cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="MIHORA.TECH Home"
            >
              <BrandLogo className="h-8 sm:h-9 w-auto aspect-[3/2] group-hover:scale-105 transition-transform shrink-0" />
              <div className="flex items-baseline tracking-tight">
                <span className="font-bold text-xl sm:text-2xl text-on-surface tracking-tight font-headline leading-none">
                  MIHORA
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-gold tracking-[0.18em] ml-1 leading-none">
                  .TECH
                </span>
              </div>
            </Link>

            {/* Zone 2: Clean Editorial 5-Group Primary Navigation */}
            <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-1">
              {NAV_GROUPS.map((group) => {
                const active = isGroupActive(group);
                const open = activeMegaMenu === group.id;
                return (
                  <div
                    key={group.id}
                    onMouseEnter={() => handleNavEnter(group.id)}
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveMegaMenu(open ? null : group.id)}
                      aria-expanded={open}
                      data-active={active || open}
                      className={clsx(
                        'nav-link-underline flex items-center gap-1.5 text-sm font-medium transition-colors px-3.5 py-2 whitespace-nowrap cursor-pointer',
                        active || open
                          ? 'text-primary font-semibold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      )}
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        size={14}
                        className={clsx('transition-transform duration-200', open && 'rotate-180')}
                      />
                    </button>
                  </div>
                );
              })}
            </nav>

            {/* Zone 3: Utilities & Primary Conversion CTA */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-surface-container/70 hover:bg-surface-container border border-outline/25 hover:border-primary/40 text-on-surface-variant hover:text-on-surface rounded-lg transition-all cursor-pointer text-xs"
                type="button"
                aria-label="Search site architecture and documentation"
              >
                <Search size={14} className="text-primary shrink-0" />
                <span className="hidden sm:inline font-medium">Search</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-surface-container-highest border border-outline/25 text-on-surface-variant rounded font-mono text-[10px]">
                  ⌘K
                </kbd>
              </button>

              <button
                id="theme-toggle-header-btn"
                onClick={toggleTheme}
                className="p-2 bg-surface-container/70 hover:bg-surface-container border border-outline/25 text-on-surface-variant hover:text-on-surface rounded-lg transition-all cursor-pointer"
                type="button"
                aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} mode`}
                title={`Theme: ${theme === 'light' ? 'Daylight' : 'Obsidian'}`}
              >
                {theme === 'light' ? (
                  <Moon size={15} className="text-primary shrink-0" />
                ) : (
                  <Sun size={15} className="text-amber-400 shrink-0" />
                )}
              </button>

              <button
                onClick={handleToggleSound}
                className="hidden sm:flex p-2 bg-surface-container/70 hover:bg-surface-container border border-outline/25 text-on-surface-variant hover:text-on-surface rounded-lg transition-all cursor-pointer"
                type="button"
                aria-label={soundOn ? 'Mute UI audio cues' : 'Enable subtle UI audio cues'}
                title={soundOn ? 'UI Audio: On' : 'UI Audio: Muted'}
              >
                {soundOn ? (
                  <Volume2 size={15} className="text-primary shrink-0" />
                ) : (
                  <VolumeX size={15} className="text-on-surface-variant shrink-0" />
                )}
              </button>

              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg btn-primary-gradient text-xs font-semibold transition-all active:scale-95 shrink-0 cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowRight size={13} />
              </Link>

              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface bg-surface-container/70 border border-outline/25 rounded-lg transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                type="button"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Mega Menu Drawer */}
        <AnimatePresence>
          {activeGroup && (
            <motion.div
              key={activeGroup.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => handleNavEnter(activeGroup.id)}
              className="hidden lg:block absolute left-0 w-full bg-surface-container-low/98 backdrop-blur-2xl border-b border-outline/25 shadow-2xl"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 grid grid-cols-12 gap-8">
                <div className="col-span-8 grid grid-cols-2 gap-3">
                  {activeGroup.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setActiveMegaMenu(null)}
                      className="group p-3 rounded-xl hover:bg-surface-container border border-transparent hover:border-outline/20 transition-all flex items-start justify-between gap-3 cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-on-surface group-hover:text-primary transition-colors">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                              · {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-outline opacity-40 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
                      />
                    </Link>
                  ))}
                </div>

                <div className="col-span-4 bg-surface-container/80 border border-outline/20 rounded-xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="font-mono text-[11px] uppercase tracking-widest text-primary font-semibold">
                      {activeGroup.featured.kicker}
                    </div>
                    <h3 className="font-headline-sm text-lg font-bold text-on-surface leading-snug">
                      {activeGroup.featured.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {activeGroup.featured.detail}
                    </p>
                  </div>
                  <Link
                    to={activeGroup.featured.ctaPath}
                    onClick={() => setActiveMegaMenu(null)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    <span>{activeGroup.featured.ctaLabel}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-outline/20 bg-surface/98 px-4 py-4 shadow-2xl backdrop-blur-2xl max-h-[85vh] overflow-y-auto space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2 bg-surface-container border border-outline/25 rounded-lg text-xs text-on-surface-variant cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2">
                <Search size={14} className="text-primary" />
                <span>Search specs, services, or docs...</span>
              </div>
              <kbd className="px-1.5 py-0.5 bg-surface-container-high rounded text-[10px] font-mono">⌘K</kbd>
            </button>

            <div className="grid grid-cols-2 gap-2 px-2 py-2 bg-surface-container-low rounded-lg border border-outline/20 font-mono text-[11px]">
              <div>
                <span className="text-on-surface-variant">London (UTC+0): </span>
                <span className="font-bold text-on-surface">{timeLondon || '00:00:00'}</span>
              </div>
              <div>
                <span className="text-on-surface-variant">Islamabad (UTC+5): </span>
                <span className="font-bold text-on-surface">{timeIslamabad || '05:00:00'}</span>
              </div>
            </div>

            <div className="space-y-1">
              {MOBILE_NAV_LINKS.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer',
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold border border-primary/20'
                        : 'text-on-surface hover:bg-surface-container'
                    )}
                  >
                    <Icon size={16} className={isActive ? 'text-primary shrink-0' : 'text-on-surface-variant shrink-0'} />
                    <div className="flex-1">
                      <div className="font-semibold text-xs sm:text-sm">{item.label}</div>
                      <div className="text-[11px] text-on-surface-variant">{item.desc}</div>
                    </div>
                    <ArrowRight size={13} className="text-outline opacity-50 shrink-0" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-outline/20 flex flex-col gap-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-lg text-xs shadow-sm"
              >
                <span>Schedule Architecture Review</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Command Palette / Architecture Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl bg-surface-container-low border border-outline/30 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-outline/20 bg-surface-container-lowest px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSearchMode('catalog')}
                    className={clsx(
                      'px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer',
                      searchMode === 'catalog'
                        ? 'bg-primary text-white font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    )}
                    type="button"
                  >
                    <Search size={13} />
                    <span>Index ({SEARCH_CATALOG.length})</span>
                  </button>
                  <button
                    onClick={() => {
                      setSearchMode('ai');
                      if (searchQuery && !aiResponse) {
                        handleAskAI(searchQuery);
                      }
                    }}
                    className={clsx(
                      'px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer',
                      searchMode === 'ai'
                        ? 'bg-primary text-white font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    )}
                    type="button"
                  >
                    <Bot size={13} />
                    <span>Spec Assistant</span>
                  </button>
                </div>

                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-on-surface-variant hover:text-on-surface font-mono text-xs bg-surface-container-highest px-2 py-0.5 rounded cursor-pointer"
                  type="button"
                >
                  ESC
                </button>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-surface-container border-b border-outline/20">
                {searchMode === 'ai' ? (
                  <Bot size={19} className="text-primary shrink-0" />
                ) : (
                  <Search size={18} className="text-primary shrink-0" />
                )}

                <input
                  type="text"
                  autoFocus
                  placeholder={
                    searchMode === 'ai'
                      ? "Ask specification query: e.g. 'How does OTDR fiber certification work?'"
                      : 'Search services, how it works, case studies, standards, FAQs...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (searchMode === 'ai') {
                        handleAskAI();
                      } else if (filteredSearchResults.length > 0) {
                        handleSelectSearchItem(filteredSearchResults[0].path);
                      }
                    }
                  }}
                  className="w-full bg-transparent text-on-surface text-sm placeholder:text-on-surface-variant/70 focus:outline-none"
                />

                {searchMode === 'ai' && (
                  <button
                    onClick={() => handleAskAI()}
                    disabled={!searchQuery.trim() || isAiProcessing}
                    className="px-3 py-1.5 bg-primary text-white font-mono text-xs font-semibold rounded flex items-center gap-1 hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shrink-0"
                    type="button"
                  >
                    <span>Query</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>

              <div className="overflow-y-auto flex-1 p-2 max-h-[60vh]">
                {searchMode === 'catalog' ? (
                  <div className="divide-y divide-outline/10">
                    {filteredSearchResults.length > 0 ? (
                      filteredSearchResults.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectSearchItem(item.path)}
                          className="w-full text-left p-3 hover:bg-surface-container rounded-lg transition-all flex items-start justify-between gap-3 group cursor-pointer"
                          type="button"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                                {item.title}
                              </span>
                              <span className="font-mono text-[10px] text-primary font-semibold uppercase tracking-wider">
                                · {item.category}
                              </span>
                            </div>
                            <p className="text-xs text-on-surface-variant">{item.description}</p>
                          </div>
                          <ArrowRight
                            size={15}
                            className="text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
                          />
                        </button>
                      ))
                    ) : (
                      <div className="p-6 text-center text-sm text-on-surface-variant space-y-3">
                        <div>No direct index matches for &ldquo;{searchQuery}&rdquo;.</div>
                        <button
                          onClick={() => handleAskAI(searchQuery)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-mono text-xs font-semibold cursor-pointer"
                          type="button"
                        >
                          <Bot size={14} />
                          <span>Query Spec Assistant for &ldquo;{searchQuery}&rdquo;</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4 p-3">
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant mb-2">
                        Quick Technical Topics
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          'Physical fiber & OTDR certification',
                          '5-phase engineering methodology',
                          'Who founded MIHORA.TECH?',
                          '4-hour emergency field dispatch',
                          'Enterprise case studies & benchmarks'
                        ].map((prompt, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setSearchQuery(prompt);
                              handleAskAI(prompt);
                            }}
                            className="px-2.5 py-1 bg-surface-container-high hover:bg-surface-container-highest border border-outline/25 text-[11px] font-mono text-on-surface-variant hover:text-on-surface rounded transition-all text-left cursor-pointer"
                            type="button"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {!isAiProcessing && aiResponse && (
                      <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline/25 space-y-3">
                        <div className="px-3 py-1.5 bg-surface-container border border-outline/20 rounded font-mono text-[11px] text-primary">
                          {aiResponse.telemetryCode}
                        </div>
                        <p className="text-sm text-on-surface leading-relaxed">{aiResponse.summary}</p>
                        <div className="space-y-1.5 pt-2 border-t border-outline/15">
                          {aiResponse.architecturePoints.map((pt, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                              <Zap size={13} className="text-primary mt-0.5 shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-3 border-t border-outline/15 flex justify-end">
                          <button
                            onClick={() => handleSelectSearchItem(aiResponse.recommendedAction.path)}
                            className="px-4 py-2 bg-primary text-white font-mono text-xs font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer"
                            type="button"
                          >
                            <span>{aiResponse.recommendedAction.label}</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="px-4 py-2.5 bg-surface-container-lowest border-t border-outline/20 flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                <span>ENTER TO OPEN · ESC TO CLOSE</span>
                <span className="text-primary font-semibold">MIHORA.TECH INDEX</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Landmark */}
      <main id="main-content" className="w-full pt-16 bg-surface min-h-screen flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Authoritative 5-Column Obsidian Atelier Footer */}
      <footer className="w-full obsidian-band obsidian-grid border-t border-white/10 py-16 text-slate-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-10 border-b border-white/10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <BrandLogo className="h-9 w-auto aspect-[3/2] shrink-0" />
                <div className="flex items-baseline tracking-tight">
                  <span className="font-headline font-extrabold text-xl tracking-tight text-white leading-none">
                    MIHORA
                  </span>
                  <span className="text-xs font-extrabold text-amber-400 tracking-[0.2em] ml-1 leading-none">
                    .TECH
                  </span>
                </div>
              </div>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-amber-400 font-semibold">
                Sovereign Digital Systems &amp; Physical Infrastructure
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Operating synchronized engineering command hubs in London (UK) and Islamabad (Pakistan) with global physical field and 24/7 SRE delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 text-xs font-mono bg-white/[0.03] border border-white/10">
              <div className="px-4 py-3">
                <span className="text-slate-400">London (UK): </span>
                <span className="font-bold text-white tabular-nums">{timeLondon || '00:00:00'}</span>
                <span className="text-slate-500 ml-1">UTC+0</span>
              </div>
              <div className="px-4 py-3">
                <span className="text-slate-400">Islamabad (PK): </span>
                <span className="font-bold text-white tabular-nums">{timeIslamabad || '05:00:00'}</span>
                <span className="text-slate-500 ml-1">UTC+5</span>
              </div>
              <div className="px-4 py-3 flex items-center">
                <a href="mailto:hr@mihora.tech" className="text-amber-400 font-semibold hover:underline">
                  hr@mihora.tech
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                Service Divisions
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/services" className="hover:text-white transition-colors">All 5 Divisions</Link></li>
                <li><Link to="/services/digital-engineering" className="hover:text-white transition-colors">Digital Engineering</Link></li>
                <li><Link to="/services/automation-intelligence" className="hover:text-white transition-colors">Automation &amp; AI</Link></li>
                <li><Link to="/services/physical-infrastructure" className="hover:text-white transition-colors">Physical Infrastructure</Link></li>
                <li><Link to="/services/field-engineering" className="hover:text-white transition-colors">Field Engineering</Link></li>
                <li><Link to="/services/managed-sre" className="hover:text-white transition-colors">24/7 Managed SRE</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                Solutions &amp; Proof
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/solutions" className="hover:text-white transition-colors">Enterprise Solutions</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works (5 Phases)</Link></li>
                <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies &amp; Benchmarks</Link></li>
                <li><Link to="/compare" className="hover:text-white transition-colors">Sovereign vs. Cloud Matrix</Link></li>
                <li><Link to="/industries" className="hover:text-white transition-colors">Industries Served</Link></li>
                <li><Link to="/solutions#sovereign-rfp-builder" className="text-blue-400 font-medium hover:underline">RFP Specifier Tool</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                Architecture &amp; Tools
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/engineering" className="hover:text-white transition-colors">9-Layer Stack</Link></li>
                <li><Link to="/security" className="hover:text-white transition-colors">Zero-Trust Security Center</Link></li>
                <li><Link to="/tools" className="text-blue-400 font-medium hover:underline">SLA &amp; Optical Calculators</Link></li>
                <li><Link to="/glossary" className="hover:text-white transition-colors">Engineering Glossary</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">Knowledge Hub &amp; Standards</Link></li>
                <li><Link to="/docs" className="hover:text-white transition-colors">Technical Docs Codex</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                Company &amp; Trust
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/company" className="hover:text-white transition-colors">Company &amp; Founders</Link></li>
                <li><Link to="/our-story" className="hover:text-white transition-colors">Our Founding Story</Link></li>
                <li><Link to="/partnerships" className="hover:text-white transition-colors">Strategic Partnerships</Link></li>
                <li><Link to="/press" className="hover:text-white transition-colors">Press Kit &amp; Citations</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Engineering Careers</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">Verified Entity FAQ</Link></li>
                <li><Link to="/status" className="text-emerald-400 font-medium hover:underline">System Status (99.999%)</Link></li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 md:col-span-1">
              <div className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                Direct Hubs &amp; Dispatch
              </div>
              <div className="space-y-2.5 text-sm text-slate-400">
                <div>
                  <div className="font-semibold text-white text-xs">London, United Kingdom</div>
                  <div className="text-xs">128 City Road, EC2A 2NX</div>
                </div>
                <div>
                  <div className="font-semibold text-white text-xs">Islamabad, Pakistan</div>
                  <div className="text-xs">Blue Area, Islamabad 44000</div>
                </div>
                <div className="pt-1">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline"
                  >
                    <span>Schedule Architecture Review</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-5 text-center md:text-left">
              <span>© {new Date().getFullYear()} MIHORA.TECH (PRIVATE) LIMITED. All rights reserved.</span>
              <span className="font-mono font-semibold text-white uppercase tracking-wider text-[11px]">
                Co-Founded by M. Matti ul Hasnain &amp; Omema Iqbal
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link to="/legal" className="hover:text-white transition-colors">Security &amp; Compliance</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
