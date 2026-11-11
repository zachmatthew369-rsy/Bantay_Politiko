import React, { useState } from 'react';
import { ArrowRight, Landmark, Sparkles, Eye } from 'lucide-react';
import { ThreeHeroFlag } from './ThreeHeroFlag';

interface HeroBannerProps {
  onExploreOfficials: () => void;
  onTrackProjects: () => void;
  onViewSpending: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreOfficials,
  onTrackProjects,
  onViewSpending
}) => {
  const [showLive3DFlag, setShowLive3DFlag] = useState(false);

  return (
    <div className="relative w-full overflow-hidden text-white pt-8 pb-20 md:pb-24 px-4 md:px-8 lg:px-12 rounded-b-[28px] md:rounded-b-[40px] shadow-2xl min-h-[460px] lg:min-h-[500px] flex items-center">
      {/* High-Resolution Panoramic Hero Banner Image - Edge-to-Edge Fitted */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/aistudio/PH_City1_fitted.png"
          alt="Philippine Cityscape & National Flag Panorama"
          className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-700 select-none"
        />

        {/* Professional Directional Glass Contrast Scrim (Left-side text legibility while keeping right skyline & flag vivid) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07214e]/95 via-[#072d6e]/75 via-45% to-transparent pointer-events-none" />

        {/* Soft bottom edge blend to ensure clean transition to rounded border without dark cutoffs */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#071f45]/40 to-transparent pointer-events-none" />
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Heading, Description, Action Buttons */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
          {/* Civic Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-white border border-white/25 w-fit shadow-xs">
            <Landmark className="w-3.5 h-3.5 text-yellow-300" />
            <span>Republic of the Philippines · Open Civic Governance</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.12] text-white drop-shadow-md">
            Be the Change.<br />
            <span className="text-white drop-shadow-md">Monitor. Vote. Make a Difference.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-blue-50/95 max-w-2xl font-normal leading-relaxed drop-shadow-sm">
            A transparent platform that tracks and evaluates Philippine politicians, their projects, budgets, and performance. Together, we can build a more transparent and accountable government.
          </p>

          {/* Three Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreOfficials}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#0757D9] hover:bg-[#064ac0] text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-blue-400/40"
            >
              <span>Explore Public Officials</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onTrackProjects}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/95 hover:bg-white text-[#063A91] text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
            >
              <span>Track Government Projects</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>

            <button
              onClick={onViewSpending}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/95 hover:bg-white text-[#063A91] text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
            >
              <span>View Public Spending</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>

        {/* Right Column: Calligraphic Tagline & Optional Interactive 3D Flag Overlay */}
        <div className="lg:col-span-5 relative flex flex-col items-end justify-center min-h-[220px] sm:min-h-[260px] pointer-events-auto">
          {/* Elegant Script Calligraphy matching visual reference */}
          <div className="text-right select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] pr-2">
            <span
              style={{ fontFamily: "'Playfair Display', cursive, serif" }}
              className="text-3xl sm:text-4xl md:text-[44px] italic font-black text-white tracking-wide block transform -rotate-2"
            >
              Tapat na
            </span>
            <span
              style={{ fontFamily: "'Playfair Display', cursive, serif" }}
              className="text-3xl sm:text-4xl md:text-[46px] italic font-black text-yellow-300 tracking-wide block transform -rotate-2 -mt-1 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]"
            >
              Pamahalaan,
            </span>
            <span
              style={{ fontFamily: "'Playfair Display', cursive, serif" }}
              className="text-base sm:text-lg md:text-xl italic text-white font-bold tracking-wider block transform -rotate-1 mt-0.5"
            >
              para sa Bawat Pilipino
            </span>
          </div>

          {/* Interactive 3D Flag Toggle if user wants to play with 3D cloth physics */}
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setShowLive3DFlag(!showLive3DFlag)}
              className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold border border-white/30 shadow-md transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>{showLive3DFlag ? 'Hide 3D WebGL Cloth' : 'Interactive 3D Flag'}</span>
            </button>
          </div>

          {/* Render 3D cloth simulation floating card when toggled */}
          {showLive3DFlag && (
            <div className="mt-3 w-full max-w-sm h-48 rounded-2xl overflow-hidden border border-white/40 shadow-2xl bg-black/30 backdrop-blur-md relative animate-fadeIn">
              <ThreeHeroFlag className="w-full h-full" />
              <button
                onClick={() => setShowLive3DFlag(false)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-center hover:bg-black/80"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
