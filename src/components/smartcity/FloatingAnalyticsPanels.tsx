import React from 'react';
import {
  Car,
  Zap,
  Wind,
  Users,
  Coins,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { SelectedBuildingInfo } from './IsometricCityCanvas';

interface FloatingAnalyticsPanelsProps {
  activeLayer: 'all' | 'traffic' | 'energy' | 'air' | 'budget';
  selectedBuilding: SelectedBuildingInfo | null;
  onCloseBuilding: () => void;
  selectedCity: string;
}

export const FloatingAnalyticsPanels: React.FC<FloatingAnalyticsPanelsProps> = ({
  activeLayer,
  selectedBuilding,
  onCloseBuilding,
  selectedCity
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
      {/* Top Floating Glassmorphism Cards Bar */}
      <div className="flex flex-wrap items-start justify-between gap-3 pointer-events-auto">
        {/* 1. Traffic Flow Analytics Card */}
        {(activeLayer === 'all' || activeLayer === 'traffic') && (
          <div className="bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl p-3.5 shadow-xl shadow-blue-900/10 w-60 transform hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-blue-700">
                <Car className="w-3.5 h-3.5" />
                <span>Traffic Flow Index</span>
              </span>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-extrabold">
                Smooth 72%
              </span>
            </div>

            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-xl font-black text-[#102A56] tabular-nums">34,820</span>
              <span className="text-[10px] text-slate-400">Vehicles / Hour</span>
            </div>

            {/* Micro Traffic Hourly Bar Chart */}
            <div className="mt-2 h-7 flex items-end gap-1 pt-1">
              {[40, 55, 80, 95, 70, 60, 85, 72].map((v, i) => (
                <div
                  key={i}
                  style={{ height: `${v}%` }}
                  className={`flex-1 rounded-t-sm ${
                    v > 85 ? 'bg-amber-500' : 'bg-blue-600'
                  }`}
                />
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[9px] text-slate-400 font-semibold">
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
            </div>
          </div>
        )}

        {/* 2. Energy Consumption Microgrid Card */}
        {(activeLayer === 'all' || activeLayer === 'energy') && (
          <div className="bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl p-3.5 shadow-xl shadow-blue-900/10 w-60 transform hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-amber-600">
                <Zap className="w-3.5 h-3.5" />
                <span>Energy Grid</span>
              </span>
              <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-extrabold">
                78% Solar
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div>
                <span className="text-xl font-black text-[#102A56] tabular-nums">412.8</span>
                <span className="text-[10px] text-slate-400 block -mt-1">Megawatts (MW)</span>
              </div>
              {/* Circular Gauge */}
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-500"
                    strokeDasharray="78, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[9px] font-black text-slate-800">78%</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
              <span>Peak: 460 MW</span>
              <span className="text-emerald-600 font-bold">100% Substation Uptime</span>
            </div>
          </div>
        )}

        {/* 3. Air Quality Index (AQI) Card */}
        {(activeLayer === 'all' || activeLayer === 'air') && (
          <div className="bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl p-3.5 shadow-xl shadow-blue-900/10 w-60 transform hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-emerald-600">
                <Wind className="w-3.5 h-3.5" />
                <span>Air Quality Index</span>
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-extrabold">
                Healthy
              </span>
            </div>

            <div className="mt-2 flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-emerald-600 tabular-nums">42</span>
                <span className="text-xs font-bold text-slate-600">AQI</span>
              </div>
              <span className="text-[10px] text-slate-400">PM2.5: 10.2 µg/m³</span>
            </div>

            <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div style={{ width: '42%' }} className="bg-emerald-500 h-full" />
            </div>
            <div className="mt-1 text-[10px] text-slate-500 flex justify-between">
              <span>Clean Urban Breeze</span>
              <span className="text-slate-400">Humidity: 68%</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Selected Building Deep-Dive Drawer (When a user clicks any 3D building!) */}
      {selectedBuilding && (
        <div className="pointer-events-auto self-center max-w-lg w-full bg-white/95 backdrop-blur-xl border border-blue-200/90 rounded-3xl p-5 shadow-2xl shadow-blue-950/20 animate-fadeIn mb-2 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0757D9] flex items-center justify-center font-black">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  {selectedBuilding.type} Smart Structure
                </span>
                <h3 className="text-base font-black text-[#102A56] mt-0.5">
                  {selectedBuilding.name}
                </h3>
              </div>
            </div>

            <button
              onClick={onCloseBuilding}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold block">Smart Occupancy</span>
              <span className="font-extrabold text-[#102A56] text-xs">{selectedBuilding.occupancy}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold block">Energy Efficiency</span>
              <span className="font-extrabold text-emerald-700 text-xs">{selectedBuilding.energyRating}</span>
            </div>
            <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100">
              <span className="text-[10px] text-blue-600 font-bold block">Civic Project Budget</span>
              <span className="font-extrabold text-[#0757D9] text-xs tabular-nums">{selectedBuilding.projectBudget}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold block">COA Status</span>
              <span className="font-bold text-slate-700 text-xs">{selectedBuilding.status}</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between border-t border-slate-100">
            <span>Contractor: {selectedBuilding.contractor}</span>
            <span className="text-[#0757D9] font-bold">PhilGEPS Certified Node</span>
          </div>
        </div>
      )}

      {/* Bottom Floating City Budget & Civic Tracking Bar */}
      {(activeLayer === 'all' || activeLayer === 'budget') && (
        <div className="self-start pointer-events-auto bg-white/90 backdrop-blur-md border border-white/70 rounded-2xl p-3.5 shadow-xl shadow-blue-900/10 max-w-sm w-full">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5 text-blue-700">
              <Coins className="w-4 h-4" />
              <span>{selectedCity} Smart Infrastructure Budget</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">FY 2026</span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-black text-[#102A56] tabular-nums">₱ 28.4 Billion</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-extrabold">
              91.2% Disbursed
            </span>
          </div>

          {/* Mini Donut / Category Strip */}
          <div className="mt-2 h-2 w-full rounded-full overflow-hidden flex">
            <div style={{ width: '45%' }} className="bg-[#0757D9]" title="Transit & Roads: 45%" />
            <div style={{ width: '25%' }} className="bg-[#f59e0b]" title="Healthcare & Hospitals: 25%" />
            <div style={{ width: '18%' }} className="bg-[#10b981]" title="5G Telecom & Energy: 18%" />
            <div style={{ width: '12%' }} className="bg-[#818cf8]" title="Civic Parks & Green: 12%" />
          </div>
          <div className="mt-1 flex justify-between text-[9px] text-slate-500 font-bold">
            <span className="text-blue-700">● Transit 45%</span>
            <span className="text-amber-600">● Health 25%</span>
            <span className="text-emerald-600">● Smart Grid 18%</span>
            <span className="text-indigo-600">● Green 12%</span>
          </div>
        </div>
      )}
    </div>
  );
};
