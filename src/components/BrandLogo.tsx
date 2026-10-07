export function BrandLogo({ className = "h-8 w-auto aspect-[368/236]", showText = false }: { className?: string; showText?: boolean }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className} shrink-0`}>
      {/* Official MIHORA Multi-Faceted M Emblem with Constellation Network Mesh */}
      <svg 
        viewBox="16 16 368 236" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(0,102,255,0.45)] hover:drop-shadow-[0_0_18px_rgba(0,180,255,0.7)] transition-all duration-300"
      >
        <defs>
          {/* 3D Facet dynamic gradients */}
          <linearGradient id="blLeftFacet" x1="60" y1="20" x2="200" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0070FF"/>
            <stop offset="50%" stopColor="#0052E0"/>
            <stop offset="100%" stopColor="#0035A0"/>
          </linearGradient>

          <linearGradient id="blNavyFacet" x1="340" y1="20" x2="200" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0C3B87"/>
            <stop offset="60%" stopColor="#071E47"/>
            <stop offset="100%" stopColor="#030E24"/>
          </linearGradient>

          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* --- GEOMETRIC M STRUCTURE (EXACT REAL MIHORA LOGO) --- */}
        <g id="mihora-m-structure">
          {/* Left Wing Facet (Bright Royal Electric Blue) */}
          <polygon points="60,20 200,180 150,225 20,70" fill="url(#blLeftFacet)" />
          
          {/* Left Vertical Deep Navy Pillar */}
          <polygon points="20,70 60,20 60,240 20,200" fill="#061A3C" />

          {/* Left Center Inner Fold */}
          <polygon points="150,225 200,180 200,248 150,225" fill="#003794" />

          {/* Right Wing Facet (Midnight / Deep Ocean Blue) */}
          <polygon points="340,20 200,180 250,225 380,70" fill="url(#blNavyFacet)" />

          {/* Right Vertical Dark Pillar */}
          <polygon points="380,70 340,20 340,240 380,200" fill="#020C1F" />
          
          {/* Right Center Inner Fold */}
          <polygon points="250,225 200,180 200,248 250,225" fill="#020917" />
        </g>

        {/* --- CONSTELLATION NETWORK MESH (WHITE INTERCONNECTED DATA NODES) --- */}
        <g id="mihora-constellation-network" stroke="#EBF5FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          {/* Fiber & Data Routing lines */}
          <line x1="50" y1="125" x2="85" y2="108" opacity="0.95" />
          <line x1="85" y1="108" x2="135" y2="145" opacity="0.95" />
          <line x1="135" y1="145" x2="175" y2="190" opacity="0.95" />
          <line x1="85" y1="108" x2="110" y2="185" opacity="0.85" />
          <line x1="110" y1="185" x2="175" y2="190" opacity="0.9" />
          <line x1="175" y1="190" x2="200" y2="148" opacity="0.95" />
          <line x1="200" y1="148" x2="265" y2="108" opacity="0.95" />
          <line x1="265" y1="108" x2="285" y2="185" opacity="0.9" />
          <line x1="200" y1="148" x2="285" y2="185" opacity="0.95" />
          <line x1="285" y1="185" x2="350" y2="125" opacity="0.95" />
          <line x1="265" y1="108" x2="350" y2="125" opacity="0.85" />

          {/* Core White Data Terminals with Glow */}
          <circle cx="50" cy="125" r="4.5" fill="#FFFFFF" />
          <circle cx="85" cy="108" r="5" fill="#FFFFFF" />
          <circle cx="110" cy="185" r="4.5" fill="#FFFFFF" />
          <circle cx="135" cy="145" r="5" fill="#FFFFFF" />
          <circle cx="175" cy="190" r="6" fill="#FFFFFF" filter="url(#logoGlow)" />
          <circle cx="200" cy="148" r="5.5" fill="#FFFFFF" />
          <circle cx="265" cy="108" r="6" fill="#FFFFFF" filter="url(#logoGlow)" />
          <circle cx="285" cy="185" r="5" fill="#FFFFFF" />
          <circle cx="350" cy="125" r="4.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}

export function BrandLogoFull({ className = "h-10" }: { className?: string }) {
  return (
    <img 
      src="/mihora-logo.svg" 
      alt="MIHORA sovereign engineering and systems architecture logo" 
      className={`${className} w-auto object-contain`} 
    />
  );
}
