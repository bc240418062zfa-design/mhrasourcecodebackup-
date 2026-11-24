import { Link } from 'react-router-dom';
import { Search, ArrowRight, Home } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export default function NotFound() {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[70vh] px-4 sm:px-6 lg:px-8 py-16 text-center">
      <SEOHead
        title="404 — Page Not Found | MIHORA.TECH"
        description="The requested endpoint does not exist on MIHORA.TECH."
        canonicalPath="/404"
      />
      <div className="space-y-6 max-w-xl">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary border border-outline/25">
            <Search size={36} />
          </div>
        </div>
        <div className="text-xs font-mono text-primary font-semibold tracking-widest uppercase">
          Error 404 · Endpoint Not Found
        </div>
        <h1 className="font-headline text-3xl sm:text-5xl text-on-surface font-extrabold tracking-tight">
          Route Not Found
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
          The requested URL does not match an active engineering division, codex chapter, or command page on MIHORA.TECH.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg transition-all"
          >
            <Home size={16} />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/services/"
            className="inline-flex items-center gap-2 px-5 py-3 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface text-sm font-semibold rounded-lg transition-all"
          >
            <span>Explore Services</span>
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 px-5 py-3 bg-surface-container border border-outline/30 hover:border-primary/50 text-on-surface text-sm font-semibold rounded-lg transition-all"
          >
            <span>Contact Hubs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
