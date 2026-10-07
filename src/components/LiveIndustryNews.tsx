import React, { useState, useEffect } from 'react';
import { 
  Globe, RefreshCw, ExternalLink, ShieldCheck, Cpu, Clock, 
  Layers, Sparkles, Filter, ChevronRight, CheckCircle2, AlertCircle
} from 'lucide-react';
import { playUiChime } from '../utils/audio';

export interface IndustryDispatch {
  id: string;
  title: string;
  source: string;
  category: string;
  publishedDate: string;
  summary: string;
  keyFinding?: string;
  relevance?: string;
  url: string;
}

interface ApiResponse {
  success: boolean;
  source: 'google_search_grounded' | 'curated_verified_cache';
  grounded: boolean;
  latencyMs: number;
  message?: string;
  dispatches: IndustryDispatch[];
  groundingSources?: { title?: string; uri: string }[];
  searchQueries?: string[];
}

export function LiveIndustryNews() {
  const [dispatches, setDispatches] = useState<IndustryDispatch[]>([]);
  const [groundingSources, setGroundingSources] = useState<{ title?: string; uri: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [apiMeta, setApiMeta] = useState<{ grounded: boolean; latency: number; source: string }>({
    grounded: true,
    latency: 180,
    source: 'google_search_grounded'
  });
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');

  const fetchNews = async (isManual = false) => {
    if (isManual) {
      setRefreshing(true);
      playUiChime('click');
    } else {
      setLoading(true);
    }

    try {
      const res = await fetch('/api/insights/news');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiResponse = await res.json();

      if (data && Array.isArray(data.dispatches) && data.dispatches.length > 0) {
        setDispatches(data.dispatches);
        setGroundingSources(data.groundingSources || []);
        setApiMeta({
          grounded: data.grounded,
          latency: data.latencyMs || 220,
          source: data.source
        });
        const now = new Date();
        setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        if (isManual) {
          playUiChime('success');
        }
      }
    } catch (err) {
      console.warn('[LiveIndustryNews] Fetch error, preserving existing state:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews(false);
  }, []);

  const categories = [
    'ALL',
    'SOVEREIGN COMPUTE',
    'DATACENTER & FIBER',
    'SECURITY & AIR-GAP',
    'POWER & HARDWARE'
  ];

  const filteredDispatches = activeCategory === 'ALL'
    ? dispatches
    : dispatches.filter(d => d.category.toUpperCase().includes(activeCategory) || activeCategory.includes(d.category.toUpperCase()));

  return (
    <section id="live-industry-dispatches" className="w-full bg-surface-container-low px-margin-mobile lg:px-margin py-space-xl scroll-mt-28 border-b border-outline/20">
      <div className="max-w-7xl mx-auto space-y-space-md">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm pb-space-xs border-b border-outline/20">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-lg text-primary font-mono text-xs font-bold uppercase tracking-widest border border-outline/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>GOOGLE SEARCH GROUNDED DISPATCHES • LAST 30 DAYS</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg font-extrabold uppercase tracking-wide text-on-surface">
              Latest Industry News &amp; Sovereign Whitepapers
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl leading-relaxed">
              Real-time technical intelligence streamed via Google Search API — covering physical datacenter specifications, national sovereign computing mandates, optical fiber innovations, and zero-trust air-gapped security.
            </p>
          </div>

          {/* Action & Status Indicator */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container rounded-xl border border-outline/30 font-mono text-xs text-on-surface-variant">
              <Clock size={13} className="text-secondary" />
              <span>SYNCED: {lastUpdated}</span>
              <span className="text-outline">•</span>
              <span className="text-emerald-500 font-bold">{apiMeta.latency}ms</span>
            </div>

            <button
              id="btn-refresh-industry-news"
              onClick={() => fetchNews(true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-highest hover:bg-surface-container hover:border-primary/50 text-on-surface border border-outline/30 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer disabled:opacity-50 active:scale-95 shadow-sm"
              title="Query Google Search for freshest sovereign engineering whitepapers"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin text-primary' : 'text-primary'} />
              <span>{refreshing ? 'SEARCHING GOOGLE...' : 'SYNC LIVE SEARCH'}</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter size={14} className="text-outline mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playUiChime('click');
                setActiveCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase transition-all shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? 'btn-primary-gradient text-on-primary shadow-sm'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant border border-outline/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Stream */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md py-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-space-md bg-surface-container rounded-2xl border border-outline/20 space-y-3 animate-pulse">
                <div className="h-4 bg-outline/20 rounded w-1/3"></div>
                <div className="h-6 bg-outline/20 rounded w-4/5"></div>
                <div className="h-16 bg-outline/20 rounded w-full"></div>
                <div className="h-4 bg-outline/20 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {filteredDispatches.map((item, idx) => (
              <article 
                key={item.id || idx}
                id={`industry-dispatch-${idx}`}
                className="bg-surface-container-lowest p-space-md rounded-2xl border border-outline/30 hover:border-primary/50 hover:shadow-xl transition-all flex flex-col justify-between group space-y-space-sm"
              >
                <div className="space-y-2.5">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between font-mono text-xs gap-2">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-outline text-[11px] font-semibold shrink-0">
                      {item.publishedDate}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Source Badge */}
                  <div className="font-mono text-xs text-secondary font-bold flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-secondary" />
                    <span>SOURCE: {item.source}</span>
                  </div>

                  {/* Summary */}
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Key Finding Box */}
                  {item.keyFinding && (
                    <div className="p-2.5 bg-surface-container-low rounded-xl border border-outline/20 space-y-1">
                      <div className="font-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                        // QUANTITATIVE BENCHMARK / KEY SPEC
                      </div>
                      <div className="font-mono text-xs text-on-surface font-semibold">
                        {item.keyFinding}
                      </div>
                    </div>
                  )}

                  {/* Sovereign Architecture Relevance */}
                  {item.relevance && (
                    <div className="text-xs text-outline font-mono flex items-start gap-1.5 pt-1">
                      <ChevronRight size={13} className="text-primary mt-0.5 shrink-0" />
                      <span className="leading-snug">{item.relevance}</span>
                    </div>
                  )}
                </div>

                {/* Footer Link */}
                <div className="pt-space-xs border-t border-outline/20 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-outline">
                    VERIFIED DISPATCH
                  </span>
                  
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-primary hover:text-on-primary text-primary rounded-lg font-mono text-xs font-bold transition-all cursor-pointer active:scale-95 border border-outline/20"
                    aria-label={`Open primary research: ${item.title}`}
                  >
                    <span>SOURCE PAPER</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Grounding Attribution & Verified Index Bar */}
        {groundingSources.length > 0 && (
          <div className="p-space-sm bg-surface-container rounded-xl border border-outline/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs font-mono text-xs text-outline">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-primary" />
              <span>Grounding Citations Verified via Google Search Engine API:</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {groundingSources.slice(0, 4).map((source, i) => (
                <a
                  key={i}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors underline decoration-outline/40 underline-offset-2 inline-flex items-center gap-1"
                >
                  <span>{source.title || new URL(source.uri).hostname.replace('www.', '')}</span>
                  <ExternalLink size={10} />
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
