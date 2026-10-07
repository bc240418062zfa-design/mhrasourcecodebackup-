import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[70vh] px-margin-mobile lg:px-margin text-center">
      <div className="space-y-space-md max-w-2xl">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center text-error border-2 border-error">
            <Search size={48} />
          </div>
        </div>
        <div className="font-label-sm text-label-sm text-secondary-container font-mono tracking-widest uppercase">// ERR_404_NOT_FOUND</div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface uppercase tracking-tight">System State Invalid</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          The requested endpoint does not exist within the current architecture topology. 
          Please return to the primary node.
        </p>
        <div className="pt-space-md">
          <Link to="/" className="inline-flex items-center gap-space-xs px-space-xl py-3 bg-primary-container hover:bg-secondary-container text-on-primary hover:text-on-secondary font-label-md text-label-md uppercase tracking-widest rounded-DEFAULT shadow-[0_0_24px_var(--color-primary-container)] transition-all font-bold">
            <span>[ RETURN TO CORE ]</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
