export function BrandLogo({
  className = 'h-8 w-auto aspect-[40/32]',
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className} shrink-0`}>
      {/* Bespoke MIHORA Architectural Monolith-M Optical Prism Mark */}
      <svg
        viewBox="0 0 120 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain transition-transform duration-300"
      >
        <defs>
          <linearGradient id="mihoraSpineLeft" x1="8" y1="8" x2="62" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="55%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="mihoraSpineRight" x1="112" y1="8" x2="58" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="50%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#090E1A" />
          </linearGradient>
          <linearGradient id="mihoraGoldCore" x1="60" y1="16" x2="60" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Left Structural Pillar */}
        <path
          d="M10 86V10H29L60 56V86L41 58V86H10Z"
          fill="url(#mihoraSpineLeft)"
        />

        {/* Right Structural Pillar */}
        <path
          d="M110 86V10H91L60 56V86L79 58V86H110Z"
          fill="url(#mihoraSpineRight)"
        />

        {/* Precision Chamfered Optical Core Waveguide */}
        <polygon
          points="60,14 71,32 60,50 49,32"
          fill="url(#mihoraGoldCore)"
        />

        {/* Crisp Architectural Highlight Seam */}
        <path
          d="M10 10H29L60 56L91 10H110"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.25"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  );
}

export function BrandLogoFull({ className = 'h-10' }: { className?: string }) {
  return (
    <img
      src="/mihora-logo.svg"
      alt="MIHORA.TECH Sovereign Engineering Monogram"
      className={`${className} w-auto object-contain`}
    />
  );
}
