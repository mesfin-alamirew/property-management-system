export type ExecutiveDashboardKpis = {
  totalProperties: number;
  totalBuildings: number;
  totalAssets: number;
  totalEmployees: number;
  totalAcquisitions: number;
  totalOrganizationUnits: number;
};

export type ExecutiveDashboardBreakdownRow = {
  id: string;
  code: string;
  name: string;
  count: number;
};

export type ExecutiveDashboardOrganizationRow = {
  id: string;
  code: string;
  name: string;
  count: number;
};

export type ExecutiveDashboardTrendRow = {
  period: string;
  count: number;
};

export type ExecutiveDashboardMaintenanceIncidentTrendRow = {
  period: string;
  maintenance: number;
  incidents: number;
};

export type ExecutiveDashboardLifecycleRow = {
  period: string;
  count: number;
};

export type ExecutiveDashboardData = {
  kpis: ExecutiveDashboardKpis;
  assetComposition: {
    byCategory: ExecutiveDashboardBreakdownRow[];
    byStatus: ExecutiveDashboardBreakdownRow[];
    byCondition: ExecutiveDashboardBreakdownRow[];
  };
  assetsByOrganization: ExecutiveDashboardOrganizationRow[];
  acquisitionTrend: ExecutiveDashboardTrendRow[];
  maintenanceIncidentTrend: ExecutiveDashboardMaintenanceIncidentTrendRow[];
  retirementActivity: ExecutiveDashboardLifecycleRow[];
  disposalActivity: ExecutiveDashboardLifecycleRow[];
};
