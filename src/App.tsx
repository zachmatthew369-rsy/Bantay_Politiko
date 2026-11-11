/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { StatsBar } from './components/StatsBar';
import { FeaturedPoliticianCard } from './components/FeaturedPoliticianCard';
import { LatestProjectsCard } from './components/LatestProjectsCard';
import { HowItWorksCard } from './components/HowItWorksCard';
import { NationalTransparencyOverview } from './components/NationalTransparencyOverview';
import { PhilippinesMapCard } from './components/PhilippinesMapCard';
import { Footer } from './components/Footer';

import { PoliticianSearchBar } from './components/PoliticianSearchBar';

// Modals
import { Interactive3DMapModal } from './components/modals/Interactive3DMapModal';
import { ProjectTrackerModal } from './components/modals/ProjectTrackerModal';
import { CitizenSentimentModal } from './components/modals/CitizenSentimentModal';
import { PublicSpendingModal } from './components/modals/PublicSpendingModal';
import { AccountabilityTimelineModal } from './components/modals/AccountabilityTimelineModal';
import { CivicAuthModal } from './components/modals/CivicAuthModal';
import { PoliticianProfileModal } from './components/modals/PoliticianProfileModal';
import { BantayAIAssistant } from './components/assistant/BantayAIAssistant';
import { FloatingAITrigger } from './components/assistant/FloatingAITrigger';
import { ArchipelagoType } from './components/modals/Interactive3DMapModal';

// Dedicated Sub-Views
import { PoliticiansView } from './components/views/PoliticiansView';
import { ProjectsView } from './components/views/ProjectsView';
import { BudgetView } from './components/views/BudgetView';
import { ReportsView } from './components/views/ReportsView';
import { AboutView } from './components/views/AboutView';

// Data
import {
  FEATURED_POLITICIAN,
  OTHER_POLITICIANS,
  LATEST_PROJECTS,
  PHILIPPINES_PROVINCES
} from './data/mockData';
import { GovernmentProject, Politician } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [lang, setLang] = useState<'EN' | 'FIL'>('EN');

  // Modals state
  const [is3DMapOpen, setIs3DMapOpen] = useState(false);
  const [initialArchipelagoForMap, setInitialArchipelagoForMap] = useState<ArchipelagoType>('Visayas');
  const [selectedProject, setSelectedProject] = useState<GovernmentProject | null>(null);
  const [isSentimentModalOpen, setIsSentimentModalOpen] = useState(false);
  const [isSpendingModalOpen, setIsSpendingModalOpen] = useState(false);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [preselectedPoliticianForAI, setPreselectedPoliticianForAI] = useState<string | undefined>(undefined);
  const [selectedPoliticianForProfile, setSelectedPoliticianForProfile] = useState<Politician | null>(null);

  // Politician state with dynamic voting response updates
  const [featuredPolitician, setFeaturedPolitician] = useState<Politician>(FEATURED_POLITICIAN);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleVote = (type: 'corrupt' | 'not_corrupt') => {
    setFeaturedPolitician((prev) => {
      const isCorrupt = type === 'corrupt';
      const updatedCorrupt = isCorrupt ? prev.sentiment.corruptVotes + 1 : prev.sentiment.corruptVotes;
      const updatedNotCorrupt = !isCorrupt ? prev.sentiment.notCorruptVotes + 1 : prev.sentiment.notCorruptVotes;
      const updatedTotal = prev.sentiment.totalResponses + 1;

      return {
        ...prev,
        sentiment: {
          ...prev.sentiment,
          corruptVotes: updatedCorrupt,
          notCorruptVotes: updatedNotCorrupt,
          totalResponses: updatedTotal,
          lastUpdated: 'Just now'
        }
      };
    });

    showToast(
      type === 'corrupt'
        ? 'Your misconduct concern was securely logged. Open the Sentiment Intelligence view to inspect verified trends.'
        : 'Your service approval was logged into the civic sentiment record.'
    );
  };

  const handleSearchSelect = (query: string) => {
    const q = query.toLowerCase();
    const matchedProject = LATEST_PROJECTS.find((p) => p.title.toLowerCase().includes(q));
    if (matchedProject) {
      setSelectedProject(matchedProject);
      return;
    }

    const allPoliticians = [FEATURED_POLITICIAN, ...OTHER_POLITICIANS];
    const matchedPolitician = allPoliticians.find(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q) ||
        p.jurisdiction.toLowerCase().includes(q)
    );
    if (matchedPolitician) {
      setSelectedPoliticianForProfile(matchedPolitician);
      return;
    }

    if (q.includes('cebu') || q.includes('juan') || q.includes('governor')) {
      setActiveTab('home');
      window.scrollTo({ top: 480, behavior: 'smooth' });
      return;
    }

    if (q.includes('map') || q.includes('province') || q.includes('region')) {
      setIs3DMapOpen(true);
      return;
    }

    if (q.includes('budget') || q.includes('spending')) {
      setIsSpendingModalOpen(true);
      return;
    }

    setActiveTab('projects');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#102A56] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Sticky Responsive Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSearchSelect={handleSearchSelect}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'EN' ? 'FIL' : 'EN'))}
        onOpenAIAssistant={() => {
          setPreselectedPoliticianForAI(undefined);
          setIsAIAssistantOpen(true);
        }}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#102A56] text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-400/30 flex items-center gap-3 animate-fadeIn text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Page Content based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-8 pb-12">
            {/* 1. Hero Banner with 3D Waving Philippine Flag & Skyline */}
            <HeroBanner
              onExploreOfficials={() => {
                setActiveTab('politicians');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onTrackProjects={() => {
                setActiveTab('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewSpending={() => setIsSpendingModalOpen(true)}
            />

            {/* 2. Floating National Statistics Bar */}
            <StatsBar
              onStatClick={(statKey) => {
                if (statKey === 'politicians') setActiveTab('politicians');
                else if (statKey === 'projects') setActiveTab('projects');
                else if (statKey === 'budget') setIsSpendingModalOpen(true);
                else if (statKey === 'votes') setIsSentimentModalOpen(true);
              }}
            />

            {/* Middle Search Bar/Prompt for Politician Monitoring (As requested in user reference image) */}
            <PoliticianSearchBar
              onSelectPolitician={(pol) => {
                setFeaturedPolitician(pol);
                showToast(`Now monitoring ${pol.name} on the homepage dashboard!`);
                window.scrollTo({ top: 480, behavior: 'smooth' });
              }}
              onViewFullProfile={(pol) => setSelectedPoliticianForProfile(pol)}
            />

            {/* 3. Three-Column Main Dashboard (Exact Screenshot Reproduction) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Column 1: Featured Politician Card (4 cols on lg) */}
                <div className="lg:col-span-4 flex flex-col">
                  <FeaturedPoliticianCard
                    politician={featuredPolitician}
                    onOpenSentimentModal={() => setIsSentimentModalOpen(true)}
                    onOpenTimelineModal={() => setIsTimelineModalOpen(true)}
                    onVote={handleVote}
                  />
                </div>

                {/* Column 2: Latest Government Projects Card (5 cols on lg) */}
                <div className="lg:col-span-5 flex flex-col">
                  <LatestProjectsCard
                    projects={LATEST_PROJECTS}
                    onSelectProject={(project) => setSelectedProject(project)}
                    onViewAllProjects={() => {
                      setActiveTab('projects');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>

                {/* Column 3: How It Works Card (3 cols on lg) */}
                <div className="lg:col-span-3 flex flex-col">
                  <HowItWorksCard
                    onStartMonitoring={() => {
                      setActiveTab('politicians');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 4. Bottom Row: National Transparency Overview + Philippines Map */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left Card: National Transparency Overview (8 cols on lg) */}
                <div className="lg:col-span-8 flex flex-col">
                  <NationalTransparencyOverview
                    onSelectSector={(sector) => {
                      setActiveTab('projects');
                    }}
                    onSelectStatus={(status) => {
                      setActiveTab('projects');
                    }}
                  />
                </div>

                {/* Right Card: Philippines Map (4 cols on lg) */}
                <div className="lg:col-span-4 flex flex-col">
                  <PhilippinesMapCard
                    onOpenFullMap={(arch) => {
                      if (arch) setInitialArchipelagoForMap(arch);
                      setIs3DMapOpen(true);
                    }}
                    onSelectProvince={(provId) => {
                      setIs3DMapOpen(true);
                    }}
                    onOpenSmartCity={(cityOrArch) => {
                      if (cityOrArch.includes('Manila')) setInitialArchipelagoForMap('Luzon');
                      else if (cityOrArch.includes('Davao')) setInitialArchipelagoForMap('Mindanao');
                      else if (cityOrArch.includes('Palawan')) setInitialArchipelagoForMap('Palawan');
                      else setInitialArchipelagoForMap('Visayas');
                      setIs3DMapOpen(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Sub-Views */}
        {activeTab === 'politicians' && (
          <PoliticiansView
            onSelectPolitician={(pol) => {
              setFeaturedPolitician(pol);
              setActiveTab('home');
              window.scrollTo({ top: 480, behavior: 'smooth' });
            }}
            onViewFullProfile={(pol) => setSelectedPoliticianForProfile(pol)}
            onOpenTimeline={() => setIsTimelineModalOpen(true)}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsView
            onSelectProject={(project) => setSelectedProject(project)}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetView
            onOpenSpendingModal={() => setIsSpendingModalOpen(true)}
          />
        )}

        {activeTab === 'reports' && <ReportsView />}

        {activeTab === 'about' && <AboutView />}
      </main>

      {/* Footer */}
      <Footer onSelectTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Complete Politician Profile & Projects Inspection Modal */}
      <PoliticianProfileModal
        politician={selectedPoliticianForProfile}
        isOpen={!!selectedPoliticianForProfile}
        onClose={() => setSelectedPoliticianForProfile(null)}
        onSetAsFeatured={(pol) => {
          setFeaturedPolitician(pol);
          showToast(`Now monitoring ${pol.name} on the homepage dashboard!`);
        }}
        onVote={handleVote}
        onOpenProjectTracker={(projId) => {
          const match = LATEST_PROJECTS.find((p) => p.id === projId) || LATEST_PROJECTS[0];
          setSelectedProject(match);
        }}
      />

      {/* 5 Recommended High-Priority Feature Modals */}
      {/* Feature A: Interactive 3D Philippines Map */}
      <Interactive3DMapModal
        isOpen={is3DMapOpen}
        onClose={() => setIs3DMapOpen(false)}
        initialArchipelago={initialArchipelagoForMap}
        onSelectProjectFromProvince={(projName) => {
          const match = LATEST_PROJECTS.find((p) => p.title.includes(projName)) || LATEST_PROJECTS[0];
          setSelectedProject(match);
        }}
        onAskAIAboutProvince={(provName) => {
          setPreselectedPoliticianForAI(provName);
          setIsAIAssistantOpen(true);
        }}
      />

      {/* Feature B: Project Accountability Tracker */}
      <ProjectTrackerModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Feature C: Citizen Sentiment Intelligence */}
      <CitizenSentimentModal
        isOpen={isSentimentModalOpen}
        onClose={() => setIsSentimentModalOpen(false)}
        politician={featuredPolitician}
        onNewFeedbackSubmitted={(comment) => {
          showToast('Thank you for contributing to verified civic feedback!');
        }}
      />

      {/* Feature D: Public Spending Intelligence */}
      <PublicSpendingModal
        isOpen={isSpendingModalOpen}
        onClose={() => setIsSpendingModalOpen(false)}
      />

      {/* Feature E: Public Accountability Timeline */}
      <AccountabilityTimelineModal
        isOpen={isTimelineModalOpen}
        onClose={() => setIsTimelineModalOpen(false)}
      />

      {/* Civic Auth / Sign Up Modal */}
      <CivicAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(role, user) => {
          showToast(`Welcome back, ${user}! Authenticated as ${role}`);
        }}
      />

      {/* BantayAI Advanced Civic Intelligence Assistant Modal */}
      <BantayAIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        preselectedPoliticianName={preselectedPoliticianForAI}
        onOpenProfile={(pol) => setSelectedPoliticianForProfile(pol)}
        onOpenSmartCity={() => setIs3DMapOpen(true)}
        onOpenSpending={() => setIsSpendingModalOpen(true)}
      />

      {/* Persistent Floating AI Launcher Button */}
      <FloatingAITrigger
        isOpen={isAIAssistantOpen}
        onClick={() => {
          setPreselectedPoliticianForAI(undefined);
          setIsAIAssistantOpen(true);
        }}
      />
    </div>
  );
}
