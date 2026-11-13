import React, { useState, useEffect } from 'react';
import { PoliticianRoleCategory } from '../types';

interface PoliticianAvatarProps {
  name: string;
  avatarUrl?: string;
  roleCategory?: PoliticianRoleCategory;
  className?: string;
  showFlagAccent?: boolean;
}

const ROLE_GRADIENTS: Record<PoliticianRoleCategory, string> = {
  President: 'from-[#0038A8] via-[#0757D9] to-[#102A56]',
  Senator: 'from-[#102A56] via-[#063A91] to-[#1E40AF]',
  Congressman: 'from-[#0F4C81] via-[#0284C7] to-[#1D4ED8]',
  Governor: 'from-[#0757D9] via-[#0369A1] to-[#0F766E]',
  Mayor: 'from-[#1E3A8A] via-[#2563EB] to-[#0284C7]',
  Councilor: 'from-[#312E81] via-[#4F46E5] to-[#0757D9]',
  'Brgy Official': 'from-[#9A3412] via-[#CE1126] to-[#B45309]',
};

function extractInitials(fullName: string): string {
  const cleaned = fullName
    .replace(/^(H\.E\.|Hon\.|Sen\.|Rep\.|Gov\.|Mayor|Coun\.|Atty\.|Dr\.|Doc|Col\.|Engr\.)\s+/gi, '')
    .replace(/"[^"]*"/g, '')
    .replace(/\([^)]*\)/g, '')
    .trim();

  const parts = cleaned.split(/\s+/).filter((w) => w.length > 1 && !['JR.', 'SR.', 'II', 'III', 'IV'].includes(w.toUpperCase()));
  if (parts.length === 0) return 'PH';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export const PoliticianAvatar: React.FC<PoliticianAvatarProps> = ({
  name,
  avatarUrl,
  roleCategory = 'Governor',
  className = 'w-20 h-24 rounded-2xl',
  showFlagAccent = false,
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  useEffect(() => {
    setImgFailed(false);
  }, [avatarUrl]);
  const initials = extractInitials(name);
  const gradient = ROLE_GRADIENTS[roleCategory] || ROLE_GRADIENTS.Governor;

  if (avatarUrl && !imgFailed) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={avatarUrl}
          alt={name}
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover object-top"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} text-white flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Subtle Philippine Sun Watermark */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="22" fill="#FCD116" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <polygon
            key={deg}
            points="50,6 45,26 55,26"
            fill="#FCD116"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
      </svg>

      {showFlagAccent && (
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-[#0038A8]" />
          <div className="w-4 bg-[#FCD116]" />
          <div className="flex-1 bg-[#CE1126]" />
        </div>
      )}

      <span className="relative z-10 text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-xs">
        {initials}
      </span>
      <span className="relative z-10 mt-1 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/15 text-blue-50 backdrop-blur-2xs">
        {roleCategory === 'Brgy Official' ? 'Brgy' : roleCategory}
      </span>
    </div>
  );
};
