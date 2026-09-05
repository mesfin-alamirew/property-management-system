export type DashboardVerificationResult =
  | 'PENDING'
  | 'VERIFIED'
  | 'NOT_FOUND'
  | 'LOCATION_MISMATCH'
  | 'CUSTODIAN_MISMATCH'
  | 'CONDITION_MISMATCH'
  | 'IDENTIFICATION_MISMATCH'
  | 'MULTIPLE_DISCREPANCIES';

export type DashboardSeverity = 'HIGH' | 'REVIEW' | 'MONITOR';

export type DashboardFilters = {
  organizationUnitId?: string;
  assetTypeId?: string;
  assetStatusId?: string;
};

export type DashboardKpis = {
  totalAssets: number;
  assignedAssets: number;
  unassignedAssets: number;
  totalExceptions: number;
  highExceptions: number;
  reviewExceptions: number;
  monitorExceptions: number;
};

export type DashboardVerificationSummary = {
  pending: number;
  verified: number;
  notFound: number;
  locationMismatch: number;
  custodianMismatch: number;
  conditionMismatch: number;
  identificationMismatch: number;
  multipleDiscrepancies: number;
};

export type DashboardOperationalSummary = {
  maintenanceRequiringAction: number;
  activeIncidents: number;
};

export type DashboardLifecycleSummary = {
  retirementPending: number;
  retirementApproved: number;
  disposalPending: number;
  disposalApproved: number;
};

export type DashboardOrganizationSummaryRow = {
  organizationUnit: {
    id: string;
    code: string;
    name: string;
  };
  totalAssets: number;
  assignedAssets: number;
  unassignedAssets: number;
  highExceptions: number;
};

export type DashboardData = {
  kpis: DashboardKpis;
  verification: DashboardVerificationSummary;
  operations: DashboardOperationalSummary;
  lifecycle: DashboardLifecycleSummary;
  organizations: DashboardOrganizationSummaryRow[];
};
