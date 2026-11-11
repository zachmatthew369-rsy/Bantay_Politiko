import React from 'react';
import { Search, UserCheck, ShieldCheck, Vote, ArrowRight, User } from 'lucide-react';

interface HowItWorksCardProps {
  onStartMonitoring: () => void;
}

export const HowItWorksCard: React.FC<HowItWorksCardProps> = ({ onStartMonitoring }) => {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: 'Find a Politician',
      desc: 'Search for officials by region, position, or name.'
    },
    {
      number: 2,
      icon: UserCheck,
      title: 'View Their Profile',
      desc: 'See their background, assignments, projects, and performance records.'
    },
    {
      number: 3,
      icon: ShieldCheck,
      title: 'Check Projects & Budget',
      desc: 'Explore government projects, budgets, and completion status.'
    },
    {
      number: 4,
      icon: Vote,
      title: 'Vote & Share Your Opinion',
      desc: 'Like, Dislike, or Corrupt/Not Corrupt. Let your voice be heard!'
    }
  ];

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-100 p-5 md:p-6 flex flex-col h-full justify-between">
      {/* Header */}
      <div>
        <h2 className="text-base sm:text-lg font-extrabold text-[#102A56] tracking-tight">
          How It Works
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Simple steps to a more transparent Philippines
        </p>

        {/* 4 Steps */}
        <div className="space-y-4 sm:space-y-4.5 mt-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex items-start gap-3.5">
                {/* Circular Icon with Step Badge */}
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0757D9] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#0757D9]">{step.number}</span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#102A56]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button and Footer */}
      <div className="pt-5 space-y-3">
        <button
          onClick={onStartMonitoring}
          className="w-full py-3 rounded-full bg-[#0757D9] hover:bg-[#064ac0] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
        >
          <span>Start Monitoring Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
          <User className="w-3.5 h-3.5 text-[#0757D9]" />
          <span>Be part of the change. Your voice counts!</span>
        </div>
      </div>
    </div>
  );
};
