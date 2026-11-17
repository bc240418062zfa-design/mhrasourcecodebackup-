import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  useEffect(() => {
    const scriptId = 'mihora-dynamic-breadcrumb-schema';
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const fullList = [
      { name: 'Home', item: 'https://mihora.tech/' },
      ...items.map((item) => ({
        name: item.label,
        item: item.path
          ? `https://mihora.tech${item.path.startsWith('/') ? item.path : `/${item.path}`}`
          : typeof window !== 'undefined'
          ? window.location.href
          : 'https://mihora.tech/',
      })),
    ];

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: fullList.map((entry, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: entry.name,
        item: entry.item,
      })),
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById(scriptId);
      if (cleanup) cleanup.remove();
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-1.5 text-xs font-medium text-on-surface-variant ${className}`}>
      <Link
        to="/"
        className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
      >
        <Home size={13} />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
            <ChevronRight size={13} className="text-on-surface-variant/50" />
            {item.path && !isLast ? (
              <Link to={item.path} className="hover:text-primary transition-colors cursor-pointer">
                {item.label}
              </Link>
            ) : (
              <span className="text-on-surface font-semibold" aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
