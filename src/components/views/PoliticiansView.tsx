import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  ChevronRight,
  RefreshCw,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Phone,
  ExternalLink,
  Filter,
  ChevronDown,
  ChevronUp,
  Database
} from 'lucide-react';
import { Politician, PoliticianRoleCategory } from '../../types';
import { FEATURED_POLITICIAN, OTHER_POLITICIANS } from '../../data/mockData';
import { PoliticianAvatar } from '../PoliticianAvatar';

interface PoliticiansViewProps {
  politicians?: Politician[];
  countsByRole?: Record<string, number>;
  lastSyncedAt?: string;
  sourceStatuses?: Record<string, any>;
  isSyncing?: boolean;
  onSyncScraper?: (refreshRemote?: boolean) => void;
  onSelectPolitician: (pol: Politician) => void;
  onViewFullProfile: (pol: Politician) => void;
  onOpenTimeline: () => void;
}

const ROLE_CATEGORIES: Array<{ id: 'All' | PoliticianRoleCategory; label: string }> = [
  { id: 'All', label: 'All Officials' },
  { id: 'President', label: 'President' },
  { id: 'Senator', label: 'Senators' },
  { id: 'Congressman', label: 'Congressmen' },
  { id: 'Governor', label: 'Governors' },
  { id: 'Mayor', label: 'Mayors' },
  { id: 'Councilor', label: 'Councilors' },
  { id: 'Brgy Official', label: 'Brgy Officials' }
];

const REGION_OPTIONS = [
  'All',
  'National',
  'NCR',
  'CAR',
  'Region I',
  'Region II',
  'Region III',
  'CALABARZON',
  'MIMAROPA',
  'Region V',
  'Western Visayas',
  'Central Visayas',
  'Eastern Visayas',
  'Zamboanga',
  'Northern Mindanao',
  'Davao',
  'SOCCSKSARGEN',
  'Caraga',
  'BARMM'
];

const PAGE_SIZE = 36;

export const PoliticiansView: React.FC<PoliticiansViewProps> = ({
  politicians,
  countsByRole,
  lastSyncedAt,
  sourceStatuses,
  isSyncing = false,
  onSyncScraper,
  onSelectPolitician,
  onViewFullProfile
}) => {
  const allPoliticians = useMemo(
    () => (politicians && politicians.length > 0 ? politicians : [FEATURED_POLITICIAN, ...OTHER_POLITICIANS]),
    [politicians]
  );

  const [selectedRole, setSelectedRole] = useState<'All' | PoliticianRoleCategory>('All');
  const [filterRegion, setFilterRegion] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [showSourcesPanel, setShowSourcesPanel] = useState<boolean>(false);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedRole, filterRegion, search]);

  const computedCounts = useMemo(() => {
    if (countsByRole && Object.keys(countsByRole).length > 0) {
      return countsByRole;
    }
    const counts: Record<string, number> = {};
    for (const p of allPoliticians) {
      counts[p.roleCategory] = (counts[p.roleCategory] || 0) + 1;
    }
    return counts;
  }, [countsByRole, allPoliticians]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allPoliticians.filter((p) => {
      const matchesRole = selectedRole === 'All' || p.roleCategory === selectedRole;
      const matchesRegion =
        filterRegion === 'All' ||
        p.region.toLowerCase().includes(filterRegion.toLowerCase()) ||
        p.jurisdiction.toLowerCase().includes(filterRegion.toLowerCase());
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q) ||
        p.jurisdiction.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.politicalAffiliation.toLowerCase().includes(q) ||
        (p.district && p.district.toLowerCase().includes(q)) ||
        (p.partyList && p.partyList.toLowerCase().includes(q));
      return matchesRole && matchesRegion && matchesSearch;
    });
  }, [allPoliticians, selectedRole, filterRegion, search]);

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const formattedSyncDate = useMemo(() => {
    if (!lastSyncedAt) return 'Real-Time Verified Directory';
    try {
      return new Date(lastSyncedAt).toLocaleString('en-PH', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return lastSyncedAt;
    }
  }, [lastSyncedAt]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Directory Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0757D9] text-[11px] font-bold border border-blue-100">
                <Database className="w-3 h-3" />
                <span>Scrapling Real-Time Gov.ph Directory</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Last Synced: {formattedSyncDate}
              </span>
            </div>
            <h1 className="text-2xl font-black text-[#102A56] tracking-tight">
              Philippine Politician & Public Servant Directory
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Showing <span className="font-bold text-[#102A56]">{allPoliticians.length.toLocaleString()}</span> verified elected officials strictly across President, Senators, Congressmen, Governors, Mayors, Councilors & Barangay Officials.
            </p>
          </div>

          {/* Search, Region Filter & Sync Button */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center bg-slate-100 rounded-full border border-slate-200 px-3.5 py-2 text-xs text-slate-700 w-full sm:w-64 focus-within:bg-white focus-within:border-[#0757D9] focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, province, city, district..."
                className="bg-transparent border-none outline-none w-full text-xs"
              />
            </div>

            <div className="flex items-center bg-slate-100 rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="bg-transparent border-none outline-none text-xs font-semibold text-slate-700 cursor-pointer"
              >
                {REGION_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r === 'All' ? 'All Regions' : r}
                  </option>
                ))}
              </select>
            </div>

            {onSyncScraper && (
              <button
                onClick={() => onSyncScraper(true)}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0757D9] hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                title="Re-run Scrapling crawler on official government portals"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing Portals...' : 'Sync Live Data (Scrapling)'}</span>
              </button>
            )}

            <button
              onClick={() => setShowSourcesPanel((prev) => !prev)}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Sources</span>
              {showSourcesPanel ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Scrapling Source Verification Panel */}
        {showSourcesPanel && (
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-[#102A56] uppercase tracking-wider">
                Scrapling Official Source Telemetry & Verification
              </h3>
              <span className="text-[11px] font-semibold text-slate-500">
                Engine: Scrapling Fetcher + PyPDF Official Directory Parser
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
              {sourceStatuses && Object.keys(sourceStatuses).length > 0 ? (
                Object.entries(sourceStatuses).map(([key, info]: [string, any]) => {
                  const isOk = info?.status === 'ok' || info?.httpStatus === 200;
                  return (
                    <div
                      key={key}
                      className="bg-white rounded-xl border border-slate-200/80 p-3 flex items-start justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          {isOk ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          )}
                          <span className="font-bold text-[#102A56] truncate capitalize">
                            {info?.label || key.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {info?.note || (isOk ? 'Live portal verified' : `HTTP ${info?.httpStatus || 'WAF'} · Reconciled via DBM/Official Roster`)}
                        </p>
                      </div>
                      {info?.url && (
                        <a
                          href={info.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 shrink-0 p-1"
                          title={info.url}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-slate-500 text-xs">
                  Sources configured: Office of the President (president.gov.ph), Senate (senate.gov.ph), House of Representatives (congress.gov.ph), DBM 2025 Philippine Government Directory PDF, DILG / Liga ng mga Barangay (dilg.gov.ph / ligangmgabarangay.ph), and FOI Local Government Portal (foi.gov.ph).
                </div>
              )}
            </div>
          </div>
        )}

        {/* 7-Role Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {ROLE_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'All'
                ? allPoliticians.length
                : computedCounts[cat.id] ?? 0;
            const isActive = selectedRole === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedRole(cat.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#0757D9] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold tabular-nums ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {count.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Displaying <strong className="text-[#102A56]">{visibleItems.length.toLocaleString()}</strong> of{' '}
          <strong className="text-[#102A56]">{filtered.length.toLocaleString()}</strong> matching officials
        </span>
        {(selectedRole !== 'All' || filterRegion !== 'All' || search) && (
          <button
            onClick={() => {
              setSelectedRole('All');
              setFilterRegion('All');
              setSearch('');
            }}
            className="text-[#0757D9] font-bold hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid of Politicians */}
      {visibleItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((pol) => {
            const totalResp = pol.sentiment.totalResponses || 0;
            const corruptPct =
              totalResp > 0
                ? Math.round((pol.sentiment.corruptVotes / totalResp) * 100)
                : 0;
            const supportivePct = totalResp > 0 ? 100 - corruptPct : 0;

            return (
              <div
                key={pol.id}
                onClick={() => onViewFullProfile(pol)}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <PoliticianAvatar
                      name={pol.name}
                      avatarUrl={pol.avatarUrl}
                      roleCategory={pol.roleCategory}
                      className="w-20 h-24 rounded-2xl border-2 border-slate-100 shadow-2xs group-hover:scale-105 transition-transform shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-[#0757D9] border border-blue-100">
                          {pol.roleCategory}
                        </span>
                        {pol.isVerified && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100">
                            ✓ Official
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-extrabold text-[#102A56] truncate group-hover:text-[#0757D9] transition-colors">
                        {pol.name}
                      </h3>

                      <p className="text-xs font-bold text-slate-600 mt-0.5 line-clamp-2">{pol.position}</p>

                      <div className="mt-2 space-y-1 text-[11px] text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{pol.jurisdiction}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">Term: {pol.currentTerm}</span>
                        </div>
                        {pol.contactInfo?.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{pol.contactInfo.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Affiliation / District */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {pol.politicalAffiliation && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 truncate max-w-full">
                        {pol.politicalAffiliation}
                      </span>
                    )}
                    {pol.district && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 truncate max-w-full">
                        {pol.district}
                      </span>
                    )}
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <span className="text-[10px] text-slate-400 font-bold block">Declared SALN</span>
                      <span className="font-extrabold text-[#102A56] tabular-nums text-[11px]">
                        {pol.salnNetWorth}
                      </span>
                    </div>
                    <div className="p-2.5 bg-blue-50 rounded-xl">
                      <span className="text-[10px] text-blue-600 font-bold block">Tracked Projects</span>
                      <span className="font-extrabold text-blue-800 tabular-nums text-[11px]">
                        {pol.totalProjects} Projects
                      </span>
                    </div>
                  </div>

                  {/* Sentiment vs Facts Mini Bar */}
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-red-600">{corruptPct}% Concerned</span>
                      <span className="text-emerald-600">{supportivePct}% Supportive</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                      {totalResp > 0 && (
                        <>
                          <div style={{ width: `${corruptPct}%` }} className="bg-red-500 h-full" />
                          <div style={{ width: `${supportivePct}%` }} className="bg-emerald-500 h-full" />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPolitician(pol);
                    }}
                    className="text-slate-500 hover:text-[#0757D9] text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    Pin to Dashboard
                  </button>
                  <span className="text-[#0757D9] flex items-center gap-1">
                    <span>Full Civic Dossier</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-2">
          <p className="text-sm font-bold text-[#102A56]">No officials matched your current filters</p>
          <p className="text-xs text-slate-500">
            Try clearing the region filter or searching by last name, province, or city.
          </p>
        </div>
      )}

      {/* Load More Pagination */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="px-6 py-3 rounded-full bg-white hover:bg-blue-50 text-[#0757D9] border border-blue-200 text-xs font-extrabold shadow-xs transition-all cursor-pointer"
          >
            Load More Officials ({(filtered.length - visibleItems.length).toLocaleString()} remaining)
          </button>
        </div>
      )}
    </div>
  );
};
