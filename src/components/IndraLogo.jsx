import React from 'react';

export default function IndraLogo({ className = 'w-9 h-9' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="indraShieldGrad" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#19C3F0" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
        <filter id="indraGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#19C3F0" floodOpacity="0.55" />
        </filter>
      </defs>
      {/* Outer Shield */}
      <path
        d="M24 4L8 10.5V22.5C8 33.2 14.8 42.6 24 45.5C33.2 42.6 40 33.2 40 22.5V10.5L24 4Z"
        stroke="url(#indraShieldGrad)"
        strokeWidth="3.2"
        fill="rgba(25, 195, 240, 0.1)"
        filter="url(#indraGlow)"
      />
      {/* Water Drop inside Shield */}
      <path
        d="M24 13.5C24 13.5 16.5 22.2 16.5 27.5C16.5 31.6421 19.8579 35 24 35C28.1421 35 31.5 31.6421 31.5 27.5C31.5 22.2 24 13.5 24 13.5Z"
        fill="url(#indraShieldGrad)"
      />
      {/* Highlight inside drop */}
      <path
        d="M20.5 26.5C20.5 28.8 21.8 30.8 23.8 31.4"
        stroke="#0B1A33"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
