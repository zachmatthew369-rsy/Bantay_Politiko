import React, { useState } from 'react';
import {
  Home,
  Users,
  FolderKanban,
  Coins,
  FileSpreadsheet,
  Info,
  Search,
  Globe,
  Menu,
  X,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { PhilippineSunLogo } from './PhilippineSunLogo';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuth: () => void;
  onSearchSelect: (query: string) => void;
  lang: 'EN' | 'FIL';
  onToggleLang: () => void;
  onOpenAIAssistant?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenAuth,
  onSearchSelect,
  lang,
  onToggleLang,
  onOpenAIAssistant
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Quick suggestions for search autocomplete
  const suggestions = [
    { type: 'Politician', name: 'Hon. Juan Dela Cruz', sub: 'Governor, Cebu' },
    { type: 'Project', name: 'Cebu Provincial Hospital Expansion', sub: '₱450M · Health' },
    { type: 'Project', name: 'Rural Road Improvement Project', sub: '₱1.12B · Danao' },
    { type: 'Location', name: 'Cebu Province', sub: '742 Projects' },
    { type: 'Agency', name: 'DPWH - Department of Public Works', sub: 'National Infra' }
  ].filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems = [
    { id: 'home', label: lang === 'EN' ? 'Home' : 'Tahanan', icon: Home },
    { id: 'politicians', label: lang === 'EN' ? 'Politicians' : 'Mga Politiko', icon: Users },
    { id: 'projects', label: lang === 'EN' ? 'Projects' : 'Mga Proyekto', icon: FolderKanban },
    { id: 'budget', label: lang === 'EN' ? 'Budget Tracker' : 'Badyet Tracker', icon: Coins },
    { id: 'reports', label: lang === 'EN' ? 'Reports' : 'Mga Ulat', icon: FileSpreadsheet },
    { id: 'about', label: lang === 'EN' ? 'About' : 'Tungkol', icon: Info }
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Left: Brand Identity */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <PhilippineSunLogo size={42} className="transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-[#0757D9] tracking-tight flex items-center gap-1 leading-none">
                Bantay<span className="text-[#102A56]">Politiko</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-normal mt-0.5 whitespace-nowrap">
                {lang === 'EN'
                  ? 'Tapat na Pamahalaan, Mas Magandang Bukas.'
                  : 'Tapat na Pamahalaan, Mas Magandang Bukas.'}
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'text-[#0757D9] bg-blue-50 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0757D9]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Section: Search, Language, Auth Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Global Search Bar with Autocomplete */}
            <div className="relative">
              <div className="flex items-center bg-slate-100/90 rounded-full border border-slate-200/90 px-3.5 py-1.5 text-xs text-slate-700 w-48 lg:w-64 focus-within:w-72 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 focus-within:bg-white transition-all duration-200">
                <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                  placeholder={lang === 'EN' ? 'Search politician, project...' : 'Maghanap ng politiko, proyekto...'}
                  className="bg-transparent border-none outline-none w-full text-xs placeholder:text-slate-400"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {searchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 w-72">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Suggested Searches
                  </div>
                  {suggestions.length > 0 ? (
                    suggestions.map((item, idx) => (
                      <div
                        key={idx}
                        onMouseDown={() => {
                          onSearchSelect(item.name);
                          setSearchQuery(item.name);
                        }}
                        className="flex flex-col px-3 py-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-800">{item.name}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                            {item.type}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">{item.sub}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-xs text-slate-400">No results found</div>
                  )}
                </div>
              )}
            </div>

            {/* Ask BantayAI Assistant Button */}
            {onOpenAIAssistant && (
              <button
                onClick={onOpenAIAssistant}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-900 to-[#0757D9] text-white text-xs font-bold shadow-xs hover:shadow transition-all duration-150 transform hover:-translate-y-0.5"
                title="Ask BantayAI Assistant about politicians & achievements"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                <span>BantayAI</span>
                <span className="bg-yellow-400 text-slate-950 font-black text-[9px] px-1 py-0.2 rounded-full uppercase">
                  AI
                </span>
              </button>
            )}

            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Login / Sign Up Button */}
            <button
              onClick={onOpenAuth}
              className="px-5 py-2 rounded-full bg-[#0757D9] hover:bg-[#064ac0] text-white text-xs font-bold shadow-sm hover:shadow transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {lang === 'EN' ? 'Login / Sign Up' : 'Mag-login / Sumali'}
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 text-xs font-semibold text-slate-700"
            >
              <span>{lang}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-fadeIn">
          {/* Mobile Search */}
          <div className="flex items-center bg-slate-100 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'EN' ? 'Search politician, project...' : 'Maghanap ng politiko, proyekto...'}
              className="bg-transparent border-none outline-none w-full text-xs"
            />
          </div>

          {/* Mobile Nav Links */}
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#0757D9] font-bold border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50 border border-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0757D9]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {onOpenAIAssistant && (
              <button
                onClick={() => {
                  onOpenAIAssistant();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-900 to-[#0757D9] text-white text-xs font-bold text-center shadow-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span>Ask BantayAI (Civic Q&A)</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center border border-slate-200"
            >
              {lang === 'EN' ? 'Citizen Sign In / Register' : 'Mag-login bilang Mamamayan'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
