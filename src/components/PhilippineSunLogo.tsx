import React from 'react';

interface PhilippineSunLogoProps {
  size?: number;
  className?: string;
}

export const PhilippineSunLogo: React.FC<PhilippineSunLogoProps> = ({ size = 48, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Philippine Sun Logo"
    >
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="60%" stopColor="#F8B820" />
          <stop offset="100%" stopColor="#E29400" />
        </radialGradient>
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#996500" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Central Sun Circle */}
      <circle cx="50" cy="50" r="16" fill="url(#sunGlow)" filter="url(#softShadow)" />

      {/* 8 Primary Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          {/* Main Central Blade Ray */}
          <polygon
            points="50,14 47.2,33 52.8,33"
            fill="url(#sunGlow)"
          />
          {/* Flanking Minor Ray left */}
          <polygon
            points="44,20 45,34 47.5,33"
            fill="#F8B820"
          />
          {/* Flanking Minor Ray right */}
          <polygon
            points="56,20 52.5,33 55,34"
            fill="#F8B820"
          />
        </g>
      ))}

      {/* 3 Golden Stars (representing Luzon, Visayas, Mindanao) */}
      <g transform="translate(14, 18) scale(0.65)">
        <polygon
          points="10,1 12.6,6.8 19,7.4 14.2,11.8 15.6,18 10,14.8 4.4,18 5.8,11.8 1,7.4 7.4,6.8"
          fill="#F8B820"
        />
      </g>
      <g transform="translate(74, 18) scale(0.65)">
        <polygon
          points="10,1 12.6,6.8 19,7.4 14.2,11.8 15.6,18 10,14.8 4.4,18 5.8,11.8 1,7.4 7.4,6.8"
          fill="#F8B820"
        />
      </g>
      <g transform="translate(44, 76) scale(0.65)">
        <polygon
          points="10,1 12.6,6.8 19,7.4 14.2,11.8 15.6,18 10,14.8 4.4,18 5.8,11.8 1,7.4 7.4,6.8"
          fill="#F8B820"
        />
      </g>
    </svg>
  );
};
