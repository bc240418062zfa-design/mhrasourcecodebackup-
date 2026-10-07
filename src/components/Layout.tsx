import { useEffect, useState, useMemo } from 'react';
import { 
  Palette, Menu, X, Search, Terminal, ArrowRight, ShieldCheck, 
  Cpu, Building, Briefcase, Sparkles, Sun, Moon, Bot, Zap, 
  CornerDownLeft, Clock, Activity, Wifi, Volume2, VolumeX,
  ChevronDown, Layers, BookOpen, HelpCircle, FileText, Globe, Server
} from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { BrandLogo } from './BrandLogo';
import { SEOHead } from './SEOHead';
import { queryAIEngine, type AIResponse } from './AIEngine';
import { isSoundEnabled, toggleSound, subscribeSoundChange, playUiChime } from '../utils/audio';

interface SearchItem {
  title: string;
  category: string;
  path: string;
  description: string;
  icon?: string;
}

const SEARCH_CATALOG: SearchItem[] = [
  { title: "Digital Engineering", category: "Services", path: "/services#digital", description: "Architected web, mobile, distributed backend microservices" },
  { title: "Automation & Intelligence", category: "Services", path: "/services#automation", description: "Workflow orchestration, telemetry pipelines, and LLM tool routing" },
  { title: "Physical Infrastructure", category: "Services", path: "/services#infra", description: "Server racks, SAN storage, cabling, enterprise switches" },
  { title: "Field Engineering", category: "Services", path: "/services#field", description: "On-site dispatch, fiber splicing, Fluke verification" },
  { title: "Managed Tech & 24/7 SRE", category: "Services", path: "/services#managed", description: "Persistent observability, latency alerts, proactive break-fix" },
  { title: "Digital Transformation", category: "Solutions", path: "/solutions#digital-transformation", description: "Deconstructing legacy monoliths into distributed architectures" },
  { title: "Business Automation", category: "Solutions", path: "/solutions#business-automation", description: "Autonomous orchestration engines and API bridges" },
  { title: "Infrastructure Deployment", category: "Solutions", path: "/solutions#infrastructure-deployment", description: "Multi-site physical deployments and edge IoT arrays" },
  { title: "Remote Operations", category: "Solutions", path: "/solutions#remote-operations", description: "SCADA and NOC telemetry systems with unified dashboards" },
  { title: "Technical Operations", category: "Solutions", path: "/solutions#technical-operations", description: "Site Reliability Engineering with guaranteed SLAs" },
  { title: "Custom Engineering", category: "Solutions", path: "/solutions#custom-engineering", description: "Bespoke hardware bridges, custom FPGA/compute rigs" },
  { title: "Healthcare Systems", category: "Industries", path: "/industries#healthcare", description: "HIPAA/HL7 telemetry, DICOM imaging, hospital networking" },
  { title: "Education Technology", category: "Industries", path: "/industries#education", description: "High-density campus wireless, student data sovereignty" },
  { title: "Retail & Supply Chain", category: "Industries", path: "/industries#retail", description: "Omnichannel inventory sync, edge POS resilience" },
  { title: "Technology Providers", category: "Industries", path: "/industries#technology", description: "Multi-tenant cloud infrastructure and devops pipelines" },
  { title: "Logistics & Transport", category: "Industries", path: "/industries#logistics", description: "Fleet tracking, automated warehouse dispatch" },
  { title: "9-Layer Architecture Stack", category: "Engineering", path: "/engineering#architecture", description: "Silicon to cloud full-span architectural layers" },
  { title: "Hardware-Software Stack", category: "Engineering", path: "/engineering#hardware-software-stack", description: "Physical structured cabling and command telemetry" },
  { title: "Reliability Telemetry", category: "Engineering", path: "/engineering#reliability-telemetry", description: "Axioms of production and 24/7 observability" },
  { title: "Company Philosophy", category: "Company", path: "/company#philosophy", description: "Engineering principles, executive leadership, global footprint" },
  { title: "Founders & Executive Leadership", category: "Company", path: "/company#leadership", description: "Founded by M. Matti ul Hasnain & Omema Iqbal - Systems Architecture & Global Operations" },
  { title: "Technical Papers", category: "Insights", path: "/insights#technical-papers", description: "Peer-reviewed architectural analysis and whitepapers" },
  { title: "Join Engineering", category: "Careers", path: "/careers#join-engineering", description: "Open roles across systems design, software, and field engineering" },
  { title: "Direct Dispatch & Contact", category: "Contact", path: "/contact", description: "Engage architecture team, request dispatch or schedule consult" },
  { title: "Technical Documentation Codex", category: "Docs", path: "/docs", description: "9-layer sovereign stack, fiber splicing specifications, and dual-hub telemetry" },
  { title: "Infrastructure Mission Control & Telemetry", category: "Status", path: "/status", description: "Real-time system health, PUE, DWDM optical jitter, and 90-day SLA performance across London and Islamabad hubs" },
  { title: "Subsea Cable & Terrestrial Fiber Explorer", category: "Engineering", path: "/engineering#subsea-cable-explorer", description: "Interactive global maritime optical cables, PEACE, SMW5, and terrestrial sovereign dark fiber rings" },
  { title: "Sovereign Proposal & RFP Builder", category: "Solutions", path: "/solutions#sovereign-rfp-builder", description: "Instant architecture BOM, rack power estimator, and proposal dispatch" },
  { title: "Field Deployments & Case Studies", category: "Insights", path: "/insights#field-case-studies", description: "National interbank RTGS transition, 1,400km 800G DWDM re-splicing, and defense SCADA air-gaps" },
  { title: "Official Entity FAQs & Knowledge Base", category: "FAQ", path: "/faq", description: "Frequently asked questions about MIHORA, co-founders Hasnain & Omema, and services" },
  { title: "Security & Compliance", category: "Legal", path: "/legal#security", description: "ISO 27001, SOC 2 Type II, and data sovereignty policies" }
];

const NAV_LINKS = [
  { label: 'Services', path: '/services' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Engineering', path: '/engineering' },
  { label: 'Docs', path: '/docs' },
  { label: 'Insights', path: '/insights' },
  { label: 'Company', path: '/company' },
  { label: 'Status', path: '/status' },
  { label: 'FAQ', path: '/faq' },
];

const MOBILE_NAV_LINKS = [
  { label: 'Services', path: '/services', icon: Server, desc: 'Digital, cloud & physical infrastructure' },
  { label: 'Solutions', path: '/solutions', icon: Layers, desc: 'Enterprise transformation & automation' },
  { label: 'Engineering', path: '/engineering', icon: Cpu, desc: '9-layer sovereign stack & reliability' },
  { label: 'Documentation Codex', path: '/docs', icon: BookOpen, desc: 'Technical specifications & runbooks' },
  { label: 'Insights & Whitepapers', path: '/insights', icon: FileText, desc: 'Architectural research & analysis' },
  { label: 'Company & Leadership', path: '/company', icon: Building, desc: 'Founders, global hubs & mission' },
  { label: 'Infrastructure Status', path: '/status', icon: Activity, desc: 'Live SLA, telemetry & heartbeat' },
  { label: 'Verified Entity FAQ', path: '/faq', icon: HelpCircle, desc: 'Common inquiries & governance' },
  { label: 'Join Engineering (Careers)', path: '/careers', icon: Briefcase, desc: 'Open engineering positions' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'cyber' | 'light'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<'catalog' | 'ai'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  
  // Real-time live synchronized hub clocks & telemetry
  const [timeLondon, setTimeLondon] = useState('');
  const [timeIslamabad, setTimeIslamabad] = useState('');
  const [simulatedPing, setSimulatedPing] = useState(18.4);
  const [hudExpanded, setHudExpanded] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

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
    const interval = setInterval(() => {
      setSimulatedPing(Number((17.4 + Math.random() * 1.9).toFixed(1)));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load theme from localStorage if available, default to white daylight
    const savedTheme = localStorage.getItem('mihora-theme');
    if (savedTheme === 'cyber' || savedTheme === 'dark') {
      setTheme('cyber');
      document.documentElement.setAttribute('data-theme', 'cyber');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
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

  // Keyboard shortcut for search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (searchOpen) setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Centralized smooth hash scrolling & close mobile menu
  useEffect(() => {
    setMobileMenuOpen(false);
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 75;
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
      item => item.title.toLowerCase().includes(q) ||
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
    }, 300);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Route-Aware Dynamic SEO Head */}
      <SEOHead />

      <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-outline/25 transition-all">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-6 shrink-0">
              <Link 
                to="/" 
                className="flex items-center gap-2.5 sm:gap-3 group shrink-0 select-none py-1" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="MIHORA Systems Homepage"
              >
                <BrandLogo className="h-8 sm:h-9 w-auto aspect-[368/236] group-hover:scale-105 transition-transform shrink-0" />
                <div className="flex items-baseline tracking-tight">
                  <span className="font-bold text-xl sm:text-2xl text-on-surface tracking-tight font-headline leading-none">MIHORA</span>
                  <span className="text-xs sm:text-sm font-extrabold text-primary tracking-widest ml-1 leading-none">.TECH</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Direct Clean Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      "text-xs xl:text-sm font-medium transition-colors px-3 py-1.5 rounded-lg whitespace-nowrap",
                      isActive
                        ? "text-primary font-semibold bg-primary/10"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Utilities */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Search Architecture Trigger */}
              <button 
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-surface-container/60 hover:bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface-variant hover:text-on-surface rounded-lg transition-all cursor-pointer text-xs" 
                type="button"
                aria-label="Search"
              >
                <Search size={14} className="text-primary shrink-0" />
                <span className="hidden sm:inline font-medium">Search</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-surface-container-highest border border-outline/30 text-on-surface-variant rounded font-mono text-[10px]">⌘K</kbd>
              </button>

              {/* Theme Toggle Button */}
              <button 
                id="theme-toggle-header-btn"
                onClick={toggleTheme} 
                className="p-2 bg-surface-container/60 hover:bg-surface-container border border-outline/30 text-on-surface-variant hover:text-on-surface rounded-lg transition-all cursor-pointer" 
                type="button" 
                aria-label="Toggle Theme"
                title={`Theme: ${theme === 'light' ? 'Daylight' : 'Obsidian'}`}
              >
                {theme === 'light' ? (
                  <Sun size={15} className="text-amber-500 shrink-0" />
                ) : (
                  <Moon size={15} className="text-secondary shrink-0" />
                )}
              </button>

              {/* Direct Primary Contact Button */}
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 shrink-0"
              >
                <span>Contact Us</span>
                <ArrowRight size={13} />
              </Link>

              {/* Mobile / Tablet Menu Button */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface bg-surface-container/60 border border-outline/30 rounded-lg transition-colors"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                type="button"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-outline/20 bg-surface/98 px-4 py-4 shadow-2xl backdrop-blur-2xl max-h-[85vh] overflow-y-auto space-y-3">
            {/* Quick Search */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2 bg-surface-container border border-outline/30 rounded-lg text-xs text-on-surface-variant"
            >
              <div className="flex items-center gap-2">
                <Search size={14} className="text-primary" />
                <span>Search specs, services, or topics...</span>
              </div>
              <kbd className="px-1.5 py-0.5 bg-surface-container-high rounded text-[10px] font-mono">⌘K</kbd>
            </button>

            {/* Links List */}
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
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                        : "text-on-surface hover:bg-surface-container"
                    )}
                  >
                    <Icon size={16} className={isActive ? "text-primary shrink-0" : "text-on-surface-variant shrink-0"} />
                    <div className="flex-1">
                      <div className="font-semibold text-xs sm:text-sm">{item.label}</div>
                      <div className="text-[11px] text-on-surface-variant">{item.desc}</div>
                    </div>
                    <ArrowRight size={13} className="text-outline opacity-50 shrink-0" />
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-outline/20 flex flex-col gap-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-lg text-xs shadow-sm"
              >
                <span>Contact Engineering</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Command Palette / Search & AI Copilot Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl bg-surface-container-low border border-secondary/35 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle Scanline Effect on Search Modal */}
              <div className="absolute inset-0 pointer-events-none bg-scanline opacity-10"></div>
              {/* Mode Switcher Tabs */}
              <div className="flex items-center justify-between border-b border-outline/20 bg-surface-container-lowest px-4 py-2 relative z-10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSearchMode('catalog')}
                  className={clsx(
                    "px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5",
                    searchMode === 'catalog' 
                      ? "bg-surface-container-highest text-secondary font-semibold border border-secondary/30" 
                      : "text-on-surface-variant hover:text-on-surface"
                  )}
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
                    "px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5",
                    searchMode === 'ai' 
                      ? "bg-secondary/15 text-secondary font-semibold border border-secondary/40 shadow-[0_0_12px_rgba(0,210,255,0.2)]" 
                      : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  <Sparkles size={13} className="text-secondary animate-pulse" />
                  <span>AI Copilot</span>
                </button>
              </div>

              <button 
                onClick={() => setSearchOpen(false)}
                className="p-1 text-on-surface-variant hover:text-on-surface font-mono text-xs bg-surface-container-highest px-2 py-0.5 rounded cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-space-sm px-space-md py-3 bg-surface-container border-b border-outline/20">
              {searchMode === 'ai' ? (
                <Bot size={20} className="text-secondary shrink-0" />
              ) : (
                <Search size={18} className="text-secondary shrink-0" />
              )}
              
              <input
                type="text"
                autoFocus
                placeholder={
                  searchMode === 'ai' 
                    ? "Ask AI Copilot: e.g. 'How does fiber cabling work?', '9-layer stack'..." 
                    : "Search services, solutions, engineering layers, papers..."
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
                className="w-full bg-transparent text-on-surface font-body-md placeholder:text-outline focus:outline-none"
              />

              {searchMode === 'ai' ? (
                <button
                  onClick={() => handleAskAI()}
                  disabled={!searchQuery.trim() || isAiProcessing}
                  className="px-3 py-1 bg-secondary text-surface font-mono text-xs font-bold rounded flex items-center gap-1 hover:bg-secondary/90 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles size={13} />
                  <span>Synthesize</span>
                </button>
              ) : (
                <button
                  onClick={() => handleAskAI(searchQuery || 'Overview of sovereign architecture')}
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-surface-container-highest hover:bg-secondary/20 text-secondary font-mono text-[11px] rounded border border-secondary/30 transition-all"
                  title="Ask AI Copilot about this search query"
                >
                  <Sparkles size={12} />
                  <span>Ask AI</span>
                </button>
              )}
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto flex-1 p-space-sm max-h-[60vh]">
              {searchMode === 'catalog' ? (
                /* Catalog List */
                <div className="divide-y divide-surface-container">
                  {filteredSearchResults.length > 0 ? (
                    filteredSearchResults.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectSearchItem(item.path)}
                        className="w-full text-left p-space-sm hover:bg-surface-container rounded-DEFAULT transition-all flex items-start justify-between gap-space-sm group"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                              {item.title}
                            </span>
                            <span className="font-mono text-[10px] px-1.5 py-0.2 bg-surface-container-highest text-secondary-container rounded uppercase">
                              {item.category}
                            </span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight size={16} className="text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all mt-1 flex-shrink-0" />
                      </button>
                    ))
                  ) : (
                    <div className="p-space-lg text-center font-body-md text-on-surface-variant space-y-3">
                      <div>No matching architecture catalog specifications for "{searchQuery}".</div>
                      <button
                        onClick={() => handleAskAI(searchQuery)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 border border-secondary/40 text-secondary rounded-DEFAULT font-mono text-xs font-bold"
                      >
                        <Sparkles size={14} />
                        <span>Query AI Architecture Engine for "{searchQuery}"</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* AI Architecture Copilot View */
                <div className="space-y-4 p-2">
                  {/* Quick Suggestion Chips */}
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-outline mb-2">
                      Suggested Architecture Queries:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "How does physical fiber & cabling work?",
                        "Explain the 9-Layer Architecture Stack",
                        "What are your AI automation pipelines?",
                        "Emergency 24/7 dispatch & SLAs",
                        "Healthcare HIPAA & PACS compliance"
                      ].map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSearchQuery(prompt);
                            handleAskAI(prompt);
                          }}
                          className="px-2.5 py-1 bg-surface-container-high hover:bg-surface-container-highest border border-outline/25 hover:border-secondary/50 text-[11px] font-mono text-on-surface-variant hover:text-on-surface rounded transition-all text-left"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {isAiProcessing && (
                    <div className="p-6 text-center space-y-3 bg-surface-container-lowest/60 rounded-xl border border-secondary/20">
                      <div className="flex items-center justify-center gap-2 text-secondary font-mono text-xs animate-pulse">
                        <Sparkles size={16} className="animate-spin" />
                        <span>SYNTHESIZING SOVEREIGN ARCHITECTURAL KNOWLEDGE...</span>
                      </div>
                      <div className="w-48 h-1 bg-surface-container mx-auto overflow-hidden rounded-full">
                        <div className="w-full h-full bg-secondary animate-[shimmer_1.5s_infinite] -translate-x-full" />
                      </div>
                    </div>
                  )}

                  {!isAiProcessing && aiResponse && (
                    <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl border border-secondary/30 shadow-lg space-y-4">
                      {/* Telemetry Output Box */}
                      <div className="px-3 py-1.5 bg-black/50 border border-secondary/30 rounded font-mono text-[11px] text-secondary overflow-x-auto">
                        {aiResponse.telemetryCode}
                      </div>

                      {/* Summary */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase text-secondary font-bold">
                          <Bot size={14} />
                          <span>Architectural Synthesis</span>
                        </div>
                        <p className="font-body-md text-sm text-on-surface leading-relaxed">
                          {aiResponse.summary}
                        </p>
                      </div>

                      {/* Architecture Points */}
                      <div className="space-y-2 pt-2 border-t border-outline/15">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-outline">
                          Key Technical Deductions:
                        </div>
                        <div className="space-y-1.5">
                          {aiResponse.architecturePoints.map((pt, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs font-body-md text-on-surface-variant">
                              <Zap size={13} className="text-secondary mt-0.5 shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommended Navigation Action */}
                      <div className="pt-3 border-t border-outline/15 flex items-center justify-between gap-3">
                        <span className="font-mono text-[11px] text-outline hidden sm:inline">
                          VERIFIED SPECIFICATION
                        </span>
                        <button
                          onClick={() => handleSelectSearchItem(aiResponse.recommendedAction.path)}
                          className="px-4 py-2 bg-secondary text-surface font-mono text-xs font-bold rounded-DEFAULT hover:bg-secondary/90 transition-all flex items-center gap-2 shadow-sm cursor-pointer ml-auto"
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

            {/* Bottom Status Bar */}
            <div className="px-space-md py-2.5 bg-surface-container-lowest border-t border-outline/20 flex items-center justify-between text-[11px] font-mono text-outline relative z-10">
              <span>PROMPT: ↑↓ TO NAVIGATE • ↵ TO SELECT • ESC TO CLOSE</span>
              <span className="text-secondary font-semibold">MIHORA ARCH_DISCOVERY v2.6 // SEO &amp; AI ACTIVE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

      <main className="w-full pt-16 bg-surface min-h-screen flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Interactive Live Telemetry HUD Widget */}
      <div className="fixed bottom-5 right-5 z-40">
        <AnimatePresence mode="wait">
          {!hudExpanded ? (
            <motion.button
              key="collapsed-hud"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={() => setHudExpanded(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 bg-surface-container-low/95 hover:bg-surface-container border border-secondary/35 hover:border-secondary text-on-surface rounded-full shadow-2xl backdrop-blur-xl transition-all cursor-pointer group hover:scale-105"
              title="Open Live Telemetry Command HUD"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-container"></span>
              </span>
              <span className="font-mono text-[11px] font-bold text-secondary">
                {simulatedPing}ms
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider hidden sm:inline">
                • 2 HUBS SYNCED
              </span>
              <Activity size={13} className="text-secondary" />
            </motion.button>
          ) : (
            <motion.div
              key="expanded-hud"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.2 }}
              className="w-80 sm:w-96 bg-surface-container-low/95 border border-secondary/40 p-4 rounded-2xl shadow-2xl backdrop-blur-2xl space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-outline/20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span className="font-bold text-secondary uppercase tracking-wider text-[11px]">
                    MIHORA ORBITAL TELEMETRY
                  </span>
                </div>
                <button
                  onClick={() => setHudExpanded(false)}
                  className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-container cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-surface-container-lowest/80 rounded border border-outline/15">
                  <span className="text-outline block text-[9px]">UK COMMAND (LON)</span>
                  <span className="text-secondary font-bold">{timeLondon || '10:50:14'}</span>
                  <span className="text-[9px] text-tertiary block">ONLINE • UTC+0</span>
                </div>
                <div className="p-2 bg-surface-container-lowest/80 rounded border border-outline/15">
                  <span className="text-outline block text-[9px]">PAK COMMAND (ISB)</span>
                  <span className="text-secondary font-bold">{timeIslamabad || '15:50:14'}</span>
                  <span className="text-[9px] text-tertiary block">ONLINE • UTC+5</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-on-surface-variant">QUORUM LATENCY</span>
                  <span className="text-secondary font-bold">{simulatedPing} MS</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary via-secondary to-tertiary rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(20, (simulatedPing / 30) * 100))}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-outline">
                  <span>PACKET DROP: 0.00%</span>
                  <span>AIR-GAPPED SRE</span>
                </div>
              </div>

              <div className="pt-2 border-t border-outline/15 flex items-center justify-between">
                <Link
                  to="/engineering#reliability-telemetry"
                  onClick={() => setHudExpanded(false)}
                  className="text-secondary hover:underline text-[11px] flex items-center gap-1"
                >
                  <span>Telemetry Specs</span>
                  <ArrowRight size={12} />
                </Link>
                <a
                  href="mailto:hr@mihora.tech"
                  className="px-2.5 py-1 bg-secondary text-surface text-[10px] font-bold rounded hover:bg-secondary/90 transition-all"
                >
                  DISPATCH
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="w-full bg-surface-container-lowest/95 border-t border-outline/20 py-space-xl text-on-surface mt-auto bg-tech-grid">
        <div className="w-full px-margin-mobile lg:px-margin space-y-space-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-space-lg pb-space-lg border-b border-surface-container-highest">
            <div className="space-y-space-xs">
              <div className="flex items-center gap-3">
                <BrandLogo className="h-9 sm:h-10 w-auto aspect-[368/236] shrink-0" />
                <div className="flex items-baseline tracking-tight">
                  <span className="font-headline-md text-headline-md font-extrabold tracking-tight text-on-surface leading-none">MIHORA</span>
                  <span className="font-label-md text-label-md text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-container font-black tracking-widest ml-1 leading-none">.TECH</span>
                </div>
              </div>
              <p className="font-label-md text-label-md text-secondary-container uppercase tracking-wider font-semibold">Technology Engineered for the Real World.</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl">Operating Synchronized Sovereign Engineering Command Hubs across London (UK) &amp; Islamabad (Pakistan). Deploying Worldwide with 24/7 Kinetic &amp; Digital Field Capabilities.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low/90 border border-outline/20 px-4 py-3 rounded-xl shadow-lg font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                <span>LON (UK):</span>
                <span className="text-secondary font-bold">{timeLondon || '10:50:14'}</span>
                <span className="text-secondary-container text-[10px]">UTC+0</span>
              </div>
              <span className="text-outline/40">|</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                <span>ISB (PK):</span>
                <span className="text-secondary font-bold">{timeIslamabad || '15:50:14'}</span>
                <span className="text-secondary-container text-[10px]">UTC+5</span>
              </div>
              <span className="text-outline/40">|</span>
              <div>DISPATCH: <a href="mailto:hr@mihora.tech" className="text-secondary hover:underline font-mono font-bold">hr@mihora.tech</a></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-space-lg">
            <div className="space-y-space-sm">
              <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Services</div>
              <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface"><Link to="/services#digital">Digital Engineering</Link></li>
                <li className="hover:text-on-surface"><Link to="/services#automation">Automation &amp; Intelligence</Link></li>
                <li className="hover:text-on-surface"><Link to="/services#infra">Infrastructure</Link></li>
                <li className="hover:text-on-surface"><Link to="/services#field">Field Engineering</Link></li>
                <li className="hover:text-on-surface"><Link to="/services#managed">Managed Tech</Link></li>
              </ul>
            </div>
            <div className="space-y-space-sm">
              <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Solutions</div>
              <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface"><Link to="/solutions#digital-transformation">Digital Transformation</Link></li>
                <li className="hover:text-on-surface"><Link to="/solutions#business-automation">Business Automation</Link></li>
                <li className="hover:text-on-surface"><Link to="/solutions#infrastructure-deployment">Infrastructure Deployment</Link></li>
                <li className="hover:text-on-surface"><Link to="/solutions#remote-operations">Remote Operations</Link></li>
                <li className="hover:text-on-surface"><Link to="/solutions#technical-operations">Technical Operations</Link></li>
                <li className="hover:text-on-surface"><Link to="/solutions#custom-engineering">Custom Engineering</Link></li>
                <li className="hover:text-on-surface"><Link to="/solutions#sovereign-rfp-builder" className="text-secondary font-semibold">RFP Spec Builder</Link></li>
              </ul>
            </div>
            <div className="space-y-space-sm">
              <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Industries</div>
              <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface"><Link to="/industries#healthcare">Healthcare</Link></li>
                <li className="hover:text-on-surface"><Link to="/industries#education">Education</Link></li>
                <li className="hover:text-on-surface"><Link to="/industries#retail">Retail</Link></li>
                <li className="hover:text-on-surface"><Link to="/industries#technology">Technology</Link></li>
                <li className="hover:text-on-surface"><Link to="/industries#logistics">Logistics</Link></li>
                <li className="hover:text-on-surface"><Link to="/industries#hospitality">Hospitality</Link></li>
                <li className="hover:text-on-surface"><Link to="/industries#enterprise">Enterprise</Link></li>
              </ul>
            </div>
            <div className="space-y-space-sm">
              <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Engineering</div>
              <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface"><Link to="/engineering#architecture">Architecture</Link></li>
                <li className="hover:text-on-surface"><Link to="/engineering#systems-design">Systems Design</Link></li>
                <li className="hover:text-on-surface"><Link to="/engineering#hardware-software-stack">Hardware-Software Stack</Link></li>
                <li className="hover:text-on-surface"><Link to="/engineering#reliability-telemetry">Reliability Telemetry</Link></li>
                <li className="hover:text-on-surface"><Link to="/engineering#subsea-cable-explorer" className="text-secondary font-semibold">Subsea Cable Explorer</Link></li>
                <li className="hover:text-on-surface"><Link to="/status" className="text-emerald-500 font-semibold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span><span>System Status (99.999%)</span></Link></li>
                <li className="hover:text-on-surface"><Link to="/docs" className="text-secondary font-semibold">Technical Docs Codex</Link></li>
              </ul>
            </div>
            <div className="space-y-space-sm">
              <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Company</div>
              <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface"><Link to="/company#about">About MIHORA</Link></li>
                <li className="hover:text-on-surface"><Link to="/company#philosophy">Engineering Philosophy</Link></li>
                <li className="hover:text-on-surface"><Link to="/company#global-operating-model">Global Operating Model</Link></li>
                <li className="hover:text-on-surface"><Link to="/faq" className="text-secondary font-semibold">Verified Entity FAQ</Link></li>
                <li className="hover:text-on-surface"><Link to="/contact">Offices &amp; Labs</Link></li>
              </ul>
            </div>
            <div className="space-y-space-sm">
              <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Insights</div>
              <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface"><Link to="/insights#technical-papers">Technical Papers</Link></li>
                <li className="hover:text-on-surface"><Link to="/insights#field-case-studies" className="text-primary font-semibold">Field Case Studies</Link></li>
                <li className="hover:text-on-surface"><Link to="/insights#case-studies">Deep Research</Link></li>
                <li className="hover:text-on-surface"><Link to="/insights#industrial-analysis">Industrial Analysis</Link></li>
              </ul>
            </div>
            <div className="space-y-space-sm">
              <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Careers</div>
              <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface"><Link to="/careers#join-engineering">Join Engineering</Link></li>
                <li className="hover:text-on-surface"><a href="mailto:hr@mihora.tech">hr@mihora.tech</a></li>
                <li className="hover:text-on-surface"><Link to="/careers#global-relocation">Global Relocation</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-space-lg flex flex-col md:flex-row justify-between items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm">
            <div className="flex flex-col md:flex-row items-center gap-space-sm md:gap-space-lg text-center md:text-left">
              <div className="flex items-center gap-space-sm">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                <span>© 2025 MIHORA.TECH (PRIVATE) LIMITED. ALL RIGHTS RESERVED.</span>
              </div>
              <div className="text-secondary font-mono tracking-wider uppercase text-xs font-bold">
                FOUNDED BY M. MATTI UL HASNAIN &amp; OMEMA IQBAL
              </div>
            </div>
            <div className="flex items-center gap-space-lg">
              <Link to="/legal#privacy" className="hover:text-on-surface transition-colors">Privacy Policy</Link>
              <Link to="/legal#terms" className="hover:text-on-surface transition-colors">Terms of Service</Link>
              <Link to="/legal#cookie" className="hover:text-on-surface transition-colors">Cookie Policy</Link>
              <Link to="/legal#security" className="hover:text-on-surface transition-colors">Security Protocols</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
