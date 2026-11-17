import { useId } from 'react';

export function BrandLogo({
  className = 'h-8 w-auto aspect-[3/2]',
}: {
  className?: string;
  showText?: boolean;
}) {
  const uid = useId().replace(/:/g, '');
  const leftId = `mihora-left-${uid}`;
  const rightId = `mihora-right-${uid}`;
  const glowId = `mihora-glow-${uid}`;

  return (
    <div className={`relative inline-flex items-center justify-center ${className} shrink-0`}>
      {/* Official MIHORA.TECH Faceted M & Network Constellation Mark (www.mihora.works) */}
      <svg
        viewBox="55 58 390 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain transition-transform duration-300"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={leftId} x1="60" y1="60" x2="250" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="45%" stopColor="#0047C4" />
            <stop offset="100%" stopColor="#051838" />
          </linearGradient>
          <linearGradient id={rightId} x1="440" y1="60" x2="250" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0052E0" />
            <stop offset="55%" stopColor="#052456" />
            <stop offset="100%" stopColor="#020E24" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g id="mihora-m-mark">
          {/* Left Wing */}
          <path
            d="M 120 70 L 250 260 L 195 295 L 120 185 L 120 300 L 70 250 L 70 70 Z"
            fill={`url(#${leftId})`}
          />
          {/* Right Wing */}
          <path
            d="M 380 70 L 250 260 L 305 295 L 380 185 L 380 300 L 430 250 L 430 70 Z"
            fill={`url(#${rightId})`}
          />
          {/* Left Inner Facet */}
          <path
            d="M 120 70 L 250 260 L 195 295 L 70 120 Z"
            fill="#005BFF"
            opacity="0.9"
          />
          {/* Left Outer Pillar */}
          <path
            d="M 70 120 L 120 185 L 120 300 L 70 250 Z"
            fill="#061A3A"
          />
          {/* Right Inner Facet */}
          <path
            d="M 380 70 L 250 260 L 305 295 L 430 120 Z"
            fill="#0041C4"
            opacity="0.85"
          />
          {/* Right Outer Pillar */}
          <path
            d="M 430 120 L 380 185 L 380 300 L 430 250 Z"
            fill="#031126"
          />

          {/* Network Mesh Connecting Inside the V-Trough */}
          <g
            stroke="#E2F1FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          >
            <line x1="105" y1="185" x2="145" y2="170" />
            <line x1="145" y1="170" x2="190" y2="205" />
            <line x1="190" y1="205" x2="225" y2="250" />
            <line x1="145" y1="170" x2="170" y2="245" />
            <line x1="170" y1="245" x2="225" y2="250" />
            <line x1="225" y1="250" x2="250" y2="205" />
            <line x1="250" y1="205" x2="310" y2="170" />
            <line x1="310" y1="170" x2="330" y2="245" />
            <line x1="310" y1="170" x2="395" y2="185" />
            <line x1="250" y1="205" x2="330" y2="245" />
            <line x1="330" y1="245" x2="395" y2="205" />

            <circle cx="105" cy="185" r="5" fill="#FFFFFF" />
            <circle cx="145" cy="170" r="5.5" fill="#FFFFFF" />
            <circle cx="170" cy="245" r="5" fill="#FFFFFF" />
            <circle cx="190" cy="205" r="5" fill="#FFFFFF" />
            <circle cx="225" cy="250" r="6" fill="#FFFFFF" filter={`url(#${glowId})`} />
            <circle cx="250" cy="205" r="5.5" fill="#FFFFFF" />
            <circle cx="310" cy="170" r="6" fill="#FFFFFF" filter={`url(#${glowId})`} />
            <circle cx="330" cy="245" r="5" fill="#FFFFFF" />
            <circle cx="395" cy="205" r="5" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function BrandLogoFull({
  className = 'h-24 w-auto',
  wordmarkTone = 'adaptive',
}: {
  className?: string;
  wordmarkTone?: 'adaptive' | 'light' | 'dark';
}) {
  const uid = useId().replace(/:/g, '');
  const leftId = `mihora-full-left-${uid}`;
  const rightId = `mihora-full-right-${uid}`;
  const glowId = `mihora-full-glow-${uid}`;

  const textFillClass =
    wordmarkTone === 'light'
      ? 'fill-white'
      : wordmarkTone === 'dark'
      ? 'fill-[#0A1931]'
      : 'fill-current text-on-surface';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="55 58 430 400"
      fill="none"
      className={`${className} aspect-[430/400] object-contain`}
      role="img"
      aria-label="MIHORA.TECH Official Emblem & Wordmark"
    >
      <defs>
        <linearGradient id={leftId} x1="60" y1="60" x2="250" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="45%" stopColor="#0047C4" />
          <stop offset="100%" stopColor="#051838" />
        </linearGradient>
        <linearGradient id={rightId} x1="440" y1="60" x2="250" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0052E0" />
          <stop offset="55%" stopColor="#052456" />
          <stop offset="100%" stopColor="#020E24" />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g>
        <path d="M 120 70 L 250 260 L 195 295 L 120 185 L 120 300 L 70 250 L 70 70 Z" fill={`url(#${leftId})`} />
        <path d="M 380 70 L 250 260 L 305 295 L 380 185 L 380 300 L 430 250 L 430 70 Z" fill={`url(#${rightId})`} />
        <path d="M 120 70 L 250 260 L 195 295 L 70 120 Z" fill="#005BFF" opacity="0.9" />
        <path d="M 70 120 L 120 185 L 120 300 L 70 250 Z" fill="#061A3A" />
        <path d="M 380 70 L 250 260 L 305 295 L 430 120 Z" fill="#0041C4" opacity="0.85" />
        <path d="M 430 120 L 380 185 L 380 300 L 430 250 Z" fill="#031126" />
        <g stroke="#E2F1FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
          <line x1="105" y1="185" x2="145" y2="170" />
          <line x1="145" y1="170" x2="190" y2="205" />
          <line x1="190" y1="205" x2="225" y2="250" />
          <line x1="145" y1="170" x2="170" y2="245" />
          <line x1="170" y1="245" x2="225" y2="250" />
          <line x1="225" y1="250" x2="250" y2="205" />
          <line x1="250" y1="205" x2="310" y2="170" />
          <line x1="310" y1="170" x2="330" y2="245" />
          <line x1="310" y1="170" x2="395" y2="185" />
          <line x1="250" y1="205" x2="330" y2="245" />
          <line x1="330" y1="245" x2="395" y2="205" />
          <circle cx="105" cy="185" r="5" fill="#FFFFFF" />
          <circle cx="145" cy="170" r="5.5" fill="#FFFFFF" />
          <circle cx="170" cy="245" r="5" fill="#FFFFFF" />
          <circle cx="190" cy="205" r="5" fill="#FFFFFF" />
          <circle cx="225" cy="250" r="6" fill="#FFFFFF" filter={`url(#${glowId})`} />
          <circle cx="250" cy="205" r="5.5" fill="#FFFFFF" />
          <circle cx="310" cy="170" r="6" fill="#FFFFFF" filter={`url(#${glowId})`} />
          <circle cx="330" cy="245" r="5" fill="#FFFFFF" />
          <circle cx="395" cy="205" r="5" fill="#FFFFFF" />
        </g>
      </g>

      <g className={textFillClass}>
        <path d="M 98 385 L 98 335 L 115 335 L 132 368 L 149 335 L 166 335 L 166 385 L 150 385 L 150 357 L 137 382 L 127 382 L 114 357 L 114 385 Z" />
        <path d="M 183 335 L 199 335 L 199 385 L 183 385 Z" />
        <path d="M 216 335 L 232 335 L 232 352 L 254 352 L 254 335 L 270 335 L 270 385 L 254 385 L 254 367 L 232 367 L 232 385 L 216 385 Z" />
        <path d="M 287 360 C 287 344 298 334 316 334 C 334 334 345 344 345 360 C 345 376 334 386 316 386 C 298 386 287 376 287 360 Z M 329 360 C 329 351 324 347 316 347 C 308 347 303 351 303 360 C 303 369 308 373 316 373 C 324 373 329 369 329 360 Z" />
        <path d="M 362 335 L 388 335 C 399 335 407 341 407 351 C 407 358 402 364 394 366 L 409 385 L 391 385 L 378 368 L 378 385 L 362 385 Z M 378 356 L 387 356 C 392 356 395 354 395 351 C 395 347 392 346 387 346 L 378 346 Z" />
        <path d="M 416 385 L 437 335 L 452 335 L 473 385 L 456 385 L 450 370 L 439 370 L 433 385 Z M 444 353 L 447 360 L 441 360 Z" />
      </g>

      <g>
        <line x1="110" y1="422" x2="175" y2="422" stroke="#0070F3" strokeWidth="4" strokeLinecap="round" />
        <text
          x="195"
          y="432"
          fill="#0070F3"
          fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif"
          fontWeight="800"
          fontSize="28"
          letterSpacing="16"
        >
          TECH
        </text>
        <line x1="325" y1="422" x2="390" y2="422" stroke="#0070F3" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}
