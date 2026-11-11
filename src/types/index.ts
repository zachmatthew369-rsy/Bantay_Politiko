export type ProjectStatus =
  | 'Completed'
  | 'In Progress'
  | 'Ongoing'
  | 'Pending'
  | 'Delayed'
  | 'Under Investigation';

export type SectorType =
  | 'Infrastructure'
  | 'Health'
  | 'Education'
  | 'Agriculture'
  | 'Others';

export interface Politician {
  id: string;
  name: string;
  honorific: string;
  position: string;
  jurisdiction: string;
  region: string;
  politicalAffiliation: string;
  currentTerm: string;
  isVerified: boolean;
  avatarUrl: string;
  salnNetWorth: string;
  salnYear: number;
  totalProjects: number;
  totalBudgetAllocated: string;
  publicOfficeHistory: string[];
  sentiment: {
    corruptVotes: number;
    notCorruptVotes: number;
    supportivePercent: number;
    concernedPercent: number;
    undecidedPercent: number;
    totalResponses: number;
    lastUpdated: string;
  };
  verifiedRecords: {
    coaAuditFindings: number;
    ombudsmanCases: number;
    clearedCases: number;
    ongoingInquiries: number;
  };
  biography: string;
  achievements?: string[];
  associatedProjectsList?: {
    id: string;
    title: string;
    location: string;
    budget: string;
    status: string;
    completionPercentage: number;
  }[];
  pendingInquiriesList?: {
    id: string;
    title: string;
    agency: string;
    status: string;
    date: string;
  }[];
}

export interface InspectionPhoto {
  id: string;
  date: string;
  stageName: string;
  reportedProgress: number;
  actualVerifiedProgress: number;
  hasDiscrepancy: boolean;
  inspector: string;
  inspectorAffiliation: string;
  imageUrl: string;
  notes: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  targetDate: string;
  completionDate?: string;
  status: 'completed' | 'in_progress' | 'delayed' | 'pending';
  budgetDisbursed: string;
}

export interface GovernmentProject {
  id: string;
  title: string;
  location: string;
  province: string;
  region: string;
  implementingAgency: string;
  contractor: string;
  budget: number;
  allocatedAmount: number;
  completionPercentage: number;
  status: ProjectStatus;
  sector: SectorType;
  expectedCompletion: string;
  startDate: string;
  thumbnailUrl: string;
  description: string;
  inspectionPhotos: InspectionPhoto[];
  milestones: ProjectMilestone[];
  riskIndicators: {
    level: 'Low' | 'Moderate' | 'High' | 'Critical';
    type: string;
    description: string;
    evidenceSource: string;
  }[];
  sourceOfInfo: string;
  philGepsRef: string;
}

export interface AccountabilityTimelineItem {
  id: string;
  date: string;
  type: 'allegation' | 'coa_audit' | 'ombudsman' | 'administrative' | 'court_outcome' | 'cleared';
  title: string;
  summary: string;
  officialEntity: string;
  evidenceStatus: 'Verified Official Record' | 'Under Investigation' | 'Citizen Report / In Review' | 'Dismissed';
  sourceReference: string;
  documentNumber?: string;
  relatedPoliticianId?: string;
  relatedProjectId?: string;
}

export interface ProvinceMapData {
  id: string;
  name: string;
  islandGroup: 'Luzon' | 'Visayas' | 'Mindanao';
  region: string;
  projectsCount: number;
  budgetTotal: string;
  budgetRaw: number;
  activePoliticians: string[];
  statusBreakdown: {
    completed: number;
    inProgress: number;
    delayed: number;
  };
  coords: { x: number; y: number }; // normalized for SVG/archipelago placement
}

export interface PublicSpendingMetric {
  agencyOrSector: string;
  appropriated: number; // Millions PHP
  obligated: number;
  disbursed: number;
  discrepancyNote?: string;
  riskRating: 'Normal' | 'Moderate Concern' | 'Flagged Discrepancy';
}
