import {
  Politician,
  GovernmentProject,
  AccountabilityTimelineItem,
  ProvinceMapData,
  PublicSpendingMetric
} from '../types';

export const FEATURED_POLITICIAN: Politician = {
  id: 'gov-juan-dela-cruz',
  name: 'Hon. Juan Dela Cruz',
  honorific: 'Hon.',
  position: 'Governor, Province of Cebu',
  jurisdiction: 'Cebu, Central Visayas',
  region: 'Region VII (Central Visayas)',
  politicalAffiliation: 'One Cebu / Federal Party Alliance',
  currentTerm: '2025 - 2028',
  isVerified: true,
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', // high-res portrait
  salnNetWorth: '₱ 84,250,000.00',
  salnYear: 2025,
  totalProjects: 742,
  totalBudgetAllocated: '₱ 28.4 Billion',
  publicOfficeHistory: [
    'Provincial Governor (2025 - Present)',
    'Representative, 1st District of Cebu (2019 - 2025)',
    'City Mayor, Talisay City (2013 - 2019)'
  ],
  sentiment: {
    corruptVotes: 69525, // 54%
    notCorruptVotes: 59225, // 46%
    supportivePercent: 46,
    concernedPercent: 44,
    undecidedPercent: 10,
    totalResponses: 128750,
    lastUpdated: 'Oct 17, 2026, 10:24 AM'
  },
  verifiedRecords: {
    coaAuditFindings: 3,
    ombudsmanCases: 1,
    clearedCases: 2,
    ongoingInquiries: 1
  },
  biography:
    'Hon. Juan Dela Cruz has served in local government administration for over 15 years, overseeing major infrastructure developments in Central Visayas including provincial hospital modernization, inter-island transport corridors, and flood mitigation initiatives.',
  achievements: [
    'Spearheaded the Cebu Provincial Hospital 5-Storey Expansion (85% completed, 120 ICU beds)',
    'Completed 142 km of rural concrete farm-to-market highways across northern & southern Cebu',
    'Maintained 100% timely SALN filing compliance under the Civil Service Commission (RA 6713)',
    'Established the Cebu Digital Governance One-Stop Citizen Permitting Portal'
  ],
  associatedProjectsList: [
    {
      id: 'cebu-prov-hospital-expansion',
      title: 'Cebu Provincial Hospital Expansion',
      location: 'Cebu City, Cebu',
      budget: '₱ 450,000,000',
      status: 'In Progress',
      completionPercentage: 85
    },
    {
      id: 'rural-road-improvement-project',
      title: 'Rural Road Improvement Project',
      location: 'Danao, Cebu',
      budget: '₱ 1,120,000,000',
      status: 'Ongoing',
      completionPercentage: 40
    },
    {
      id: 'school-building-construction',
      title: 'School Building Construction',
      location: 'San Fernando, Cebu',
      budget: '₱ 75,000,000',
      status: 'Pending',
      completionPercentage: 0
    },
    {
      id: 'water-supply-system',
      title: 'Water Supply System',
      location: 'Carcar, Cebu',
      budget: '₱ 200,000,000',
      status: 'Ongoing',
      completionPercentage: 60
    }
  ],
  pendingInquiriesList: [
    {
      id: 'inq-1',
      title: 'COA AOM No. 2026-DPWH-R7-009: Paving reconciliation along Km 8-10',
      agency: 'Commission on Audit Regional Office VII',
      status: 'In Progress (Within 60-day response window)',
      date: 'October 14, 2026'
    },
    {
      id: 'inq-2',
      title: 'OMB-V-C-24-0192 Medical Supply Open Bidding Evaluation',
      agency: 'Office of the Ombudsman (Visayas)',
      status: 'Dismissed & Cleared (Resolution Issued)',
      date: 'June 20, 2026'
    }
  ]
};

export const OTHER_POLITICIANS: Politician[] = [
  {
    id: 'sen-maria-santos',
    name: 'Hon. Maria Clara Santos',
    honorific: 'Senator',
    position: 'Senator of the Republic',
    jurisdiction: 'National',
    region: 'Senate of the Philippines',
    politicalAffiliation: 'Independent',
    currentTerm: '2022 - 2028',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    salnNetWorth: '₱ 42,100,000.00',
    salnYear: 2025,
    totalProjects: 112,
    totalBudgetAllocated: '₱ 14.2 Billion',
    publicOfficeHistory: ['Senator (2022 - Present)', 'Party-list Representative (2016 - 2022)'],
    sentiment: {
      corruptVotes: 24100,
      notCorruptVotes: 81900,
      supportivePercent: 77,
      concernedPercent: 18,
      undecidedPercent: 5,
      totalResponses: 106000,
      lastUpdated: 'Nov 02, 2026, 02:15 PM'
    },
    verifiedRecords: {
      coaAuditFindings: 0,
      ombudsmanCases: 0,
      clearedCases: 1,
      ongoingInquiries: 0
    },
    biography: 'Known for legislative oversight on public works contracts, healthcare budget allocation, and the Open Government Procurement Transparency Act.',
    achievements: [
      'Principal Sponsor of the Open Contracting & Public Works Transparency Act',
      'Authored the Universal Healthcare Barangay Health Station Modernization Bill',
      'Zero unliquidated travel or discretionary expense audits over 8 years in office'
    ],
    associatedProjectsList: [
      {
        id: 'sen-proj-1',
        title: 'National Telehealth Infrastructure Modernization',
        location: 'Nationwide / DOH',
        budget: '₱ 2,800,000,000',
        status: 'Completed',
        completionPercentage: 100
      },
      {
        id: 'sen-proj-2',
        title: 'Disaster-Resilient Community Evacuation Centers (Visayas & Bicol)',
        location: 'Region V & VIII',
        budget: '₱ 1,450,000,000',
        status: 'In Progress',
        completionPercentage: 78
      }
    ],
    pendingInquiriesList: []
  },
  {
    id: 'may-roberto-tan',
    name: 'Hon. Roberto Tan',
    honorific: 'Mayor',
    position: 'City Mayor, Davao City',
    jurisdiction: 'Davao del Sur, Davao Region',
    region: 'Region XI (Davao Region)',
    politicalAffiliation: 'Hugpong Alliance',
    currentTerm: '2025 - 2028',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    salnNetWorth: '₱ 56,800,000.00',
    salnYear: 2025,
    totalProjects: 310,
    totalBudgetAllocated: '₱ 18.9 Billion',
    publicOfficeHistory: ['City Mayor (2025 - Present)', 'Vice Mayor (2022 - 2025)'],
    sentiment: {
      corruptVotes: 32000,
      notCorruptVotes: 64000,
      supportivePercent: 66,
      concernedPercent: 28,
      undecidedPercent: 6,
      totalResponses: 96000,
      lastUpdated: 'Nov 08, 2026, 09:40 AM'
    },
    verifiedRecords: {
      coaAuditFindings: 1,
      ombudsmanCases: 0,
      clearedCases: 1,
      ongoingInquiries: 0
    },
    biography: 'Advocate for modern coastal bypass transit, digital business permitting, and public safety infrastructure.',
    achievements: [
      'Delivered the Davao Coastal Road Bypass Phase 1 (18.2 km)',
      'Constructed 4 new Central 911 emergency satellite response stations',
      'Recorded 98% business permit automation renewal rate'
    ],
    associatedProjectsList: [
      {
        id: 'dav-proj-1',
        title: 'Davao Coastal Road Segment C & Seawall',
        location: 'Davao City',
        budget: '₱ 3,600,000,000',
        status: 'In Progress',
        completionPercentage: 72
      },
      {
        id: 'dav-proj-2',
        title: 'High-Priority Bus System (HPBS) Depots',
        location: 'Toril & Bunawan, Davao',
        budget: '₱ 2,100,000,000',
        status: 'Ongoing',
        completionPercentage: 55
      }
    ],
    pendingInquiriesList: [
      {
        id: 'inq-dav-1',
        title: 'COA AAR Note: Verification of contractor equipment mobilization logs',
        agency: 'Commission on Audit Regional Office XI',
        status: 'Resolved & Cleared',
        date: 'May 12, 2026'
      }
    ]
  },
  {
    id: 'may-benjamin-magalong',
    name: 'Hon. Benjamin Magalong',
    honorific: 'Mayor',
    position: 'City Mayor, Baguio City',
    jurisdiction: 'Benguet, Cordillera (CAR)',
    region: 'Cordillera Administrative Region (CAR)',
    politicalAffiliation: 'Independent',
    currentTerm: '2025 - 2028',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    salnNetWorth: '₱ 31,400,000.00',
    salnYear: 2025,
    totalProjects: 185,
    totalBudgetAllocated: '₱ 8.4 Billion',
    publicOfficeHistory: ['City Mayor (2019 - Present)', 'Police Director (Retired)'],
    sentiment: {
      corruptVotes: 11200,
      notCorruptVotes: 89400,
      supportivePercent: 88,
      concernedPercent: 9,
      undecidedPercent: 3,
      totalResponses: 100600,
      lastUpdated: 'Nov 09, 2026, 04:30 PM'
    },
    verifiedRecords: {
      coaAuditFindings: 0,
      ombudsmanCases: 0,
      clearedCases: 3,
      ongoingInquiries: 0
    },
    biography: 'Nationally recognized pioneer for Good Governance, anti-corruption in public works procurement, and smart city digital twin traffic management.',
    achievements: [
      'Pioneered Open Bidding Livestreams and 0% Kickback Procurement Policy',
      'Constructed the Baguio Smart City Operations & Disaster Resilience Center',
      'Rehabilitated the Baguio Botanical Garden and Wright Park Eco-corridors',
      'Named UN Habitat Good Governance Exemplar'
    ],
    associatedProjectsList: [
      {
        id: 'bag-proj-1',
        title: 'Baguio City Smart Mobility & Traffic Management Command Hub',
        location: 'Baguio City',
        budget: '₱ 480,000,000',
        status: 'Completed',
        completionPercentage: 100
      },
      {
        id: 'bag-proj-2',
        title: 'Irisan Eco-Park Waste-to-Energy Transformation',
        location: 'Irisan, Baguio',
        budget: '₱ 320,000,000',
        status: 'In Progress',
        completionPercentage: 88
      }
    ],
    pendingInquiriesList: []
  }
];

export const LATEST_PROJECTS: GovernmentProject[] = [
  {
    id: 'cebu-prov-hospital-expansion',
    title: 'Cebu Provincial Hospital Expansion',
    location: 'Cebu City, Cebu',
    province: 'Cebu',
    region: 'Central Visayas',
    implementingAgency: 'Department of Health (DOH) / Cebu LGU',
    contractor: 'Visayas Prime Builders & Medical Infra JV',
    budget: 450000000,
    allocatedAmount: 450000000,
    completionPercentage: 85,
    status: 'In Progress',
    sector: 'Health',
    expectedCompletion: 'December 2026',
    startDate: 'March 2024',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop',
    description:
      'Construction of an additional 5-storey tertiary healthcare wing including 120 intensive care beds, modern oncology diagnostics center, and specialized trauma units.',
    sourceOfInfo: 'DPWH PhilGEPS Portal Ref #PH-MED-2024-8891',
    philGepsRef: 'PHILGEPS-7749210-DOH7',
    riskIndicators: [
      {
        level: 'Low',
        type: 'Timeline Minor Shift',
        description: 'Delivery of specialized MRI shielding delayed by 18 days due to port customs inspection; recovered in Q3.',
        evidenceSource: 'DOH Project Management Office Report #14'
      }
    ],
    milestones: [
      { id: 'm1', title: 'Substructure & Seismic Footings', targetDate: 'Aug 2024', completionDate: 'Aug 2024', status: 'completed', budgetDisbursed: '₱ 110M' },
      { id: 'm2', title: 'Structural Superstructure (5 Floors)', targetDate: 'May 2025', completionDate: 'Jun 2025', status: 'completed', budgetDisbursed: '₱ 165M' },
      { id: 'm3', title: 'Medical Gas & Electrical Fit-outs', targetDate: 'Dec 2025', completionDate: 'Jan 2026', status: 'completed', budgetDisbursed: '₱ 95M' },
      { id: 'm4', title: 'Finishes & Medical Equipment Calibration', targetDate: 'Nov 2026', status: 'in_progress', budgetDisbursed: '₱ 45M' },
      { id: 'm5', title: 'Final Turnover & LGU Commissioning', targetDate: 'Dec 2026', status: 'pending', budgetDisbursed: '₱ 35M' }
    ],
    inspectionPhotos: [
      {
        id: 'insp-1',
        date: 'Oct 28, 2026',
        stageName: 'Wing Exterior & Cladding Verification',
        reportedProgress: 85,
        actualVerifiedProgress: 84,
        hasDiscrepancy: false,
        inspector: 'Engr. Rafael Mendoza, PE',
        inspectorAffiliation: 'Philippine Institute of Civil Engineers (Independent Audit)',
        imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=600&auto=format&fit=crop',
        notes: 'Curtain wall glazing and external weatherproofing completed. Interior flooring and HVAC systems installation at 80% completion.'
      },
      {
        id: 'insp-2',
        date: 'July 14, 2026',
        stageName: 'Interior ICU Ward Rough-ins',
        reportedProgress: 72,
        actualVerifiedProgress: 71,
        hasDiscrepancy: false,
        inspector: 'Arch. Christine Lim',
        inspectorAffiliation: 'Citizens Infrastructure Monitoring Network',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop',
        notes: 'DOH standard sterile containment barriers aligned with specifications.'
      }
    ]
  },
  {
    id: 'rural-road-improvement-project',
    title: 'Rural Road Improvement Project',
    location: 'Danao, Cebu',
    province: 'Cebu',
    region: 'Central Visayas',
    implementingAgency: 'Department of Public Works and Highways (DPWH)',
    contractor: 'Metro Cebu Asphalt & Concrete Consortium',
    budget: 1120000000,
    allocatedAmount: 120000000,
    completionPercentage: 40,
    status: 'Ongoing',
    sector: 'Infrastructure',
    expectedCompletion: 'March 2027',
    startDate: 'January 2025',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=600&auto=format&fit=crop',
    description:
      '24.8-kilometer two-lane concrete paving with drainage canal structures, slope protection riprap, and solar streetlights connecting upland agricultural baranggays to provincial highways.',
    sourceOfInfo: 'DPWH Region VII Infra Registry #DPWH-R7-RD-2025-012',
    philGepsRef: 'PHILGEPS-6839211-DPWH7',
    riskIndicators: [
      {
        level: 'Moderate',
        type: 'Fund Disbursement Discrepancy',
        description: 'Phase 1 disbursement pacing faster than documented physical grading. COA requested updated stone masonry elevation sheets.',
        evidenceSource: 'COA 2025 Annual Audit Report Observation #2025-R7-18'
      }
    ],
    milestones: [
      { id: 'm1', title: 'Survey, Clearing & Earthworks (Km 0 to 12)', targetDate: 'Jun 2025', completionDate: 'Jul 2025', status: 'completed', budgetDisbursed: '₱ 40M' },
      { id: 'm2', title: 'Subbase course & Drainage culverts', targetDate: 'Dec 2025', completionDate: 'Dec 2025', status: 'completed', budgetDisbursed: '₱ 45M' },
      { id: 'm3', title: 'PCCP Concrete Paving Phase 1', targetDate: 'Sep 2026', status: 'in_progress', budgetDisbursed: '₱ 25M' },
      { id: 'm4', title: 'Slope Protection & Solar Lighting', targetDate: 'Jan 2027', status: 'pending', budgetDisbursed: '₱ 10M' }
    ],
    inspectionPhotos: [
      {
        id: 'insp-rd-1',
        date: 'Sep 22, 2026',
        stageName: 'Km 8+400 Concrete Pavement Core Sampling',
        reportedProgress: 45,
        actualVerifiedProgress: 39,
        hasDiscrepancy: true,
        inspector: 'Engr. Danilo Soriano',
        inspectorAffiliation: 'Bantay-Kalsada Citizen Audit Group',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?q=80&w=600&auto=format&fit=crop',
        notes: 'Discrepancy identified: Contractor reported 45% completion, but 2.1km segment between Sitio Magtalisay still lacks PCCP surface course.'
      }
    ]
  },
  {
    id: 'school-building-construction',
    title: 'School Building Construction',
    location: 'San Fernando, Cebu',
    province: 'Cebu',
    region: 'Central Visayas',
    implementingAgency: 'Department of Education (DepEd) / DPWH',
    contractor: 'South Heritage Construction Corp.',
    budget: 75000000,
    allocatedAmount: 75000000,
    completionPercentage: 0,
    status: 'Pending',
    sector: 'Education',
    expectedCompletion: 'May 2027',
    startDate: 'November 2026',
    thumbnailUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop',
    description:
      'Standard 3-storey 12-classroom disaster-resilient school building with rooftop solar array, rainwater harvesting cisterns, and science computer laboratory.',
    sourceOfInfo: 'DepEd Basic Education Facilities Fund (BEFF 2026)',
    philGepsRef: 'PHILGEPS-8012433-DEPED-R7',
    riskIndicators: [
      {
        level: 'Low',
        type: 'Permit Clearance in Progress',
        description: 'Soil test and DENR Environmental Compliance Certificate (ECC) clearance currently awaiting municipal board signoff.',
        evidenceSource: 'San Fernando LGU Engineering Office'
      }
    ],
    milestones: [
      { id: 'm1', title: 'Soil Geotechnical Survey & Permitting', targetDate: 'Oct 2026', completionDate: 'Oct 2026', status: 'completed', budgetDisbursed: '₱ 5M' },
      { id: 'm2', title: 'Groundbreaking & Site Mobilization', targetDate: 'Nov 2026', status: 'pending', budgetDisbursed: '₱ 0' },
      { id: 'm3', title: 'Foundation Excavation & Slab Pouring', targetDate: 'Feb 2027', status: 'pending', budgetDisbursed: '₱ 0' }
    ],
    inspectionPhotos: [
      {
        id: 'insp-sc-1',
        date: 'Oct 15, 2026',
        stageName: 'Empty Site Inspection Pre-Mobilization',
        reportedProgress: 0,
        actualVerifiedProgress: 0,
        hasDiscrepancy: false,
        inspector: 'DepEd Division Engineer J. Santos',
        inspectorAffiliation: 'DepEd Cebu Province Division',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?q=80&w=600&auto=format&fit=crop',
        notes: 'Perimeter stakes established; waiting for heavy machinery mobilization scheduled for late November.'
      }
    ]
  },
  {
    id: 'water-supply-system',
    title: 'Water Supply System',
    location: 'Carcar, Cebu',
    province: 'Cebu',
    region: 'Central Visayas',
    implementingAgency: 'Local Water Utilities Administration (LWUA) / Carcar Water District',
    contractor: 'Aquatech Infrastructure Solutions Phils.',
    budget: 200000000,
    allocatedAmount: 200000000,
    completionPercentage: 60,
    status: 'Ongoing',
    sector: 'Infrastructure',
    expectedCompletion: 'January 2027',
    startDate: 'September 2024',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
    description:
      'Level III piped potable water distribution network covering 6 upland barangays, including two 500,000-gallon elevated steel reservoir tanks and automated chlorination filtration units.',
    sourceOfInfo: 'LWUA Registry ID #LWUA-C7-2024-WSS',
    philGepsRef: 'PHILGEPS-7129481-LWUA',
    riskIndicators: [
      {
        level: 'Low',
        type: 'On Track',
        description: 'Both elevated reservoir tanks erected; pressure testing of primary 300mm ductile iron trunklines 75% complete.',
        evidenceSource: 'Carcar Water District Technical Monitoring Unit'
      }
    ],
    milestones: [
      { id: 'm1', title: 'Deep Well Drilling & Hydrological Yield Test', targetDate: 'Dec 2024', completionDate: 'Jan 2025', status: 'completed', budgetDisbursed: '₱ 40M' },
      { id: 'm2', title: 'Twin Reservoir Steel Structure Assembly', targetDate: 'Jul 2025', completionDate: 'Aug 2025', status: 'completed', budgetDisbursed: '₱ 70M' },
      { id: 'm3', title: 'Pipeline Distribution Mains (18 km)', targetDate: 'Oct 2026', status: 'in_progress', budgetDisbursed: '₱ 55M' },
      { id: 'm4', title: 'Household Water Meters & Commissioning', targetDate: 'Jan 2027', status: 'pending', budgetDisbursed: '₱ 35M' }
    ],
    inspectionPhotos: [
      {
        id: 'insp-wt-1',
        date: 'Oct 08, 2026',
        stageName: 'Reservoir Pressure & Leak Test',
        reportedProgress: 60,
        actualVerifiedProgress: 60,
        hasDiscrepancy: false,
        inspector: 'Engr. Theresa Gomez',
        inspectorAffiliation: 'LWUA Regional Project Oversight Office',
        imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
        notes: 'Hydrostatic pressure test successfully passed 150 PSI benchmark. Piping distribution to Baranggay Tuyom underway.'
      }
    ]
  }
];

export const PHILIPPINES_PROVINCES: ProvinceMapData[] = [
  {
    id: 'cebu',
    name: 'Cebu',
    islandGroup: 'Visayas',
    region: 'Central Visayas (Region VII)',
    projectsCount: 742,
    budgetTotal: '₱ 28.4B',
    budgetRaw: 28400000000,
    activePoliticians: ['Hon. Juan Dela Cruz (Governor)', 'Hon. Michael Rama (Former Mayor)', 'Rep. Vincent Franco (1st Dist.)'],
    statusBreakdown: { completed: 210, inProgress: 380, delayed: 152 },
    coords: { x: 57, y: 55 }
  },
  {
    id: 'metro-manila',
    name: 'Metro Manila (NCR)',
    islandGroup: 'Luzon',
    region: 'National Capital Region',
    projectsCount: 1840,
    budgetTotal: '₱ 142.6B',
    budgetRaw: 142600000000,
    activePoliticians: ['Hon. Maria Clara Santos (Senator)', 'Hon. Honey Lacuna (Mayor)', 'Rep. Arjo Atayde'],
    statusBreakdown: { completed: 620, inProgress: 940, delayed: 280 },
    coords: { x: 38, y: 32 }
  },
  {
    id: 'davao-del-sur',
    name: 'Davao del Sur',
    islandGroup: 'Mindanao',
    region: 'Davao Region (Region XI)',
    projectsCount: 512,
    budgetTotal: '₱ 21.8B',
    budgetRaw: 21800000000,
    activePoliticians: ['Hon. Roberto Tan (Mayor)', 'Hon. Yvonne Cagas (Governor)'],
    statusBreakdown: { completed: 180, inProgress: 260, delayed: 72 },
    coords: { x: 68, y: 82 }
  },
  {
    id: 'iloilo',
    name: 'Iloilo',
    islandGroup: 'Visayas',
    region: 'Western Visayas (Region VI)',
    projectsCount: 430,
    budgetTotal: '₱ 16.5B',
    budgetRaw: 16500000000,
    activePoliticians: ['Hon. Arthur Defensor Jr. (Governor)', 'Hon. Jerry Treñas (Mayor)'],
    statusBreakdown: { completed: 160, inProgress: 210, delayed: 60 },
    coords: { x: 47, y: 53 }
  },
  {
    id: 'benguet',
    name: 'Benguet & Baguio City',
    islandGroup: 'Luzon',
    region: 'Cordillera Administrative Region (CAR)',
    projectsCount: 380,
    budgetTotal: '₱ 12.1B',
    budgetRaw: 12100000000,
    activePoliticians: ['Hon. Benjamin Magalong (Mayor)', 'Hon. Melchor Diclas (Governor)'],
    statusBreakdown: { completed: 145, inProgress: 185, delayed: 50 },
    coords: { x: 39, y: 20 }
  },
  {
    id: 'pampanga',
    name: 'Pampanga',
    islandGroup: 'Luzon',
    region: 'Central Luzon (Region III)',
    projectsCount: 490,
    budgetTotal: '₱ 19.3B',
    budgetRaw: 19300000000,
    activePoliticians: ['Hon. Dennis Pineda (Governor)', 'Hon. Vilma Caluag (Mayor)'],
    statusBreakdown: { completed: 190, inProgress: 230, delayed: 70 },
    coords: { x: 37, y: 28 }
  },
  {
    id: 'palawan',
    name: 'Palawan',
    islandGroup: 'Luzon',
    region: 'MIMAROPA (Region IV-B)',
    projectsCount: 320,
    budgetTotal: '₱ 11.7B',
    budgetRaw: 11700000000,
    activePoliticians: ['Hon. Dennis Socrates (Governor)', 'Hon. Lucilo Bayron (Mayor)'],
    statusBreakdown: { completed: 110, inProgress: 155, delayed: 55 },
    coords: { x: 22, y: 55 }
  },
  {
    id: 'misamis-oriental',
    name: 'Misamis Oriental (Cagayan de Oro)',
    islandGroup: 'Mindanao',
    region: 'Northern Mindanao (Region X)',
    projectsCount: 395,
    budgetTotal: '₱ 15.4B',
    budgetRaw: 15400000000,
    activePoliticians: ['Hon. Peter Unabia (Governor)', 'Hon. Rolando Uy (Mayor)'],
    statusBreakdown: { completed: 130, inProgress: 205, delayed: 60 },
    coords: { x: 62, y: 73 }
  }
];

export const ACCOUNTABILITY_TIMELINE: AccountabilityTimelineItem[] = [
  {
    id: 'acc-1',
    date: 'October 14, 2026',
    type: 'coa_audit',
    title: 'COA Inspection Report on Road Improvement Tranche 2',
    summary:
      'Commission on Audit (COA) issued an Audit Observation Memorandum (AOM #2026-07) noting delayed stone masonry along Km 8-10, giving DPWH Region VII 60 days to reconcile contractor billing records.',
    officialEntity: 'Commission on Audit (COA) Regional Office VII',
    evidenceStatus: 'Verified Official Record',
    sourceReference: 'COA AOM No. 2026-DPWH-R7-009',
    documentNumber: 'COA-R7-2026-DOC-4481'
  },
  {
    id: 'acc-2',
    date: 'June 20, 2026',
    type: 'ombudsman',
    title: 'Ombudsman Inquiry Regarding 2023 Procurement Declared Dismissed',
    summary:
      'Office of the Ombudsman formally terminated preliminary evaluation into anonymous complaint against Cebu LGU medical supply bidding after reviewing PhilGEPS open bids.',
    officialEntity: 'Office of the Ombudsman (Visayas)',
    evidenceStatus: 'Dismissed',
    sourceReference: 'OMB-V-C-24-0192 Dismissal Resolution',
    documentNumber: 'OMB-RES-2026-092'
  },
  {
    id: 'acc-3',
    date: 'January 18, 2026',
    type: 'coa_audit',
    title: 'Annual SALN Declaration Filed and Publicly Logged',
    summary:
      '2025 Statement of Assets, Liabilities, and Net Worth filed on time in compliance with Republic Act No. 6713 (Code of Conduct and Ethical Standards for Public Officials). Net worth recorded at ₱84.25M.',
    officialEntity: 'Civil Service Commission / Ombudsman',
    evidenceStatus: 'Verified Official Record',
    sourceReference: 'CSC Official SALN Archive 2025'
  },
  {
    id: 'acc-4',
    date: 'September 05, 2025',
    type: 'allegation',
    title: 'Citizen Tip: Delayed Equipment at District Health Center',
    summary:
      'Citizen group filed public report asserting medical sterilizers had not been turned over. DOH inspection verified units were in transit and installed 12 days later.',
    officialEntity: 'Citizens Action & Transparency Desk',
    evidenceStatus: 'Dismissed',
    sourceReference: 'Public Feedback Ticket #BP-CEB-8831'
  }
];

export const PUBLIC_SPENDING_DATA: PublicSpendingMetric[] = [
  {
    agencyOrSector: 'DPWH - National Highway & Bridges',
    appropriated: 615000,
    obligated: 540000,
    disbursed: 420000,
    discrepancyNote: '₱12.4B unliquidated advance payments flagged by COA in Q2 review.',
    riskRating: 'Flagged Discrepancy'
  },
  {
    agencyOrSector: 'DOH - Provincial Health Facilities',
    appropriated: 245000,
    obligated: 230000,
    disbursed: 210000,
    discrepancyNote: 'Normal pacing; minor import delays on oncology machinery.',
    riskRating: 'Normal'
  },
  {
    agencyOrSector: 'DepEd - Basic Education Facilities',
    appropriated: 180000,
    obligated: 140000,
    disbursed: 95000,
    discrepancyNote: 'Low disbursement rate (52%) due to delayed municipal zoning clearances in 4 regions.',
    riskRating: 'Moderate Concern'
  },
  {
    agencyOrSector: 'DA - Farm-to-Market Road Development',
    appropriated: 95000,
    obligated: 89000,
    disbursed: 76000,
    discrepancyNote: 'Satisfactory physical accomplishment matches disbursement pace.',
    riskRating: 'Normal'
  },
  {
    agencyOrSector: 'LWUA - Potable Water & Irrigation',
    appropriated: 68000,
    obligated: 62000,
    disbursed: 51000,
    discrepancyNote: 'Two contract extensions granted in Central Luzon due to monsoon weather.',
    riskRating: 'Normal'
  }
];

export const NATIONAL_STATS = {
  politiciansTracked: { value: 1248, change: '+12%', label: 'Total Politicians Tracked' },
  projectsMonitored: { value: 8732, change: '+18%', label: 'Total Projects Monitored' },
  budgetTracked: { value: '₱ 1.24T', change: '+15%', label: 'Total Budget Tracked' },
  citizenVotes: { value: '2.8M', change: '+32%', label: 'Total Citizen Votes' }
};

export const SECTOR_COUNTS = [
  { name: 'Infrastructure', count: 1248, color: '#0757D9' },
  { name: 'Health', count: 1120, color: '#F8B820' },
  { name: 'Education', count: 987, color: '#38BDF8' },
  { name: 'Agriculture', count: 724, color: '#10B981' },
  { name: 'Others', count: 653, color: '#818CF8' }
];

export const STATUS_OVERVIEW = [
  { label: 'Completed', count: 2483, percent: 28.5, color: '#10B981', bg: '#ECFDF5', borderColor: '#A7F3D0' },
  { label: 'In Progress', count: 3721, percent: 42.7, color: '#0757D9', bg: '#EFF6FF', borderColor: '#BFDBFE' },
  { label: 'Pending', count: 1362, percent: 15.6, color: '#F59E0B', bg: '#FFFBEB', borderColor: '#FDE68A' },
  { label: 'Delayed', count: 1166, percent: 13.4, color: '#EF4444', bg: '#FEF2F2', borderColor: '#FECACA' }
];
