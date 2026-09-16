import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  countAcquisitions,
  countActiveBuildings,
  countActiveEmployees,
  countActiveOrganizationUnits,
  countActiveProperties,
  countAssets,
  getAcquisitionsSince,
  getAssetsForExecutiveDashboard,
  getDisposalsSince,
  getIncidentsSince,
  getMaintenancesSince,
  getRetirementsSince,
} from '../repositories/executive-dashboard.repository';
import type {
  ExecutiveDashboardBreakdownRow,
  ExecutiveDashboardData,
  ExecutiveDashboardLifecycleRow,
  ExecutiveDashboardMaintenanceIncidentTrendRow,
  ExecutiveDashboardOrganizationRow,
  ExecutiveDashboardTrendRow,
} from '../types/executive-dashboard.types';

const DASHBOARD_PERMISSION = 'REPORT_DASHBOARD:READ';
const TREND_MONTH_COUNT = 13;

function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function formatPeriod(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function createTrendPeriods(): Date[] {
  const currentMonth = getMonthStart(new Date());

  return Array.from({ length: TREND_MONTH_COUNT }, (_, index) =>
    addMonths(currentMonth, index - (TREND_MONTH_COUNT - 1)),
  );
}

function createZeroTrend(periods: Date[]): ExecutiveDashboardTrendRow[] {
  return periods.map((period) => ({
    period: formatPeriod(period),
    count: 0,
  }));
}

function createZeroLifecycleTrend(
  periods: Date[],
): ExecutiveDashboardLifecycleRow[] {
  return periods.map((period) => ({
    period: formatPeriod(period),
    count: 0,
  }));
}

function createZeroMaintenanceIncidentTrend(
  periods: Date[],
): ExecutiveDashboardMaintenanceIncidentTrendRow[] {
  return periods.map((period) => ({
    period: formatPeriod(period),
    maintenance: 0,
    incidents: 0,
  }));
}

function incrementTrend(
  rows: ExecutiveDashboardTrendRow[],
  period: string,
): void {
  const row = rows.find((item) => item.period === period);

  if (row) {
    row.count += 1;
  }
}

function incrementLifecycleTrend(
  rows: ExecutiveDashboardLifecycleRow[],
  period: string,
): void {
  const row = rows.find((item) => item.period === period);

  if (row) {
    row.count += 1;
  }
}

function incrementMaintenanceIncidentTrend(
  rows: ExecutiveDashboardMaintenanceIncidentTrendRow[],
  period: string,
  field: 'maintenance' | 'incidents',
): void {
  const row = rows.find((item) => item.period === period);

  if (row) {
    row[field] += 1;
  }
}

function toBreakdownRows(
  counts: Map<
    string,
    {
      id: string;
      code: string;
      name: string;
      count: number;
    }
  >,
): ExecutiveDashboardBreakdownRow[] {
  return Array.from(counts.values()).sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }

    return a.name.localeCompare(b.name);
  });
}

function toOrganizationRows(
  counts: Map<
    string,
    {
      id: string;
      code: string;
      name: string;
      count: number;
    }
  >,
): ExecutiveDashboardOrganizationRow[] {
  return Array.from(counts.values()).sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }

    return a.name.localeCompare(b.name);
  });
}

export async function getExecutiveDashboardData(
  userId: string,
): Promise<ExecutiveDashboardData> {
  await requirePermission({
    userId,
    permissionCode: DASHBOARD_PERMISSION,
  });

  const periods = createTrendPeriods();
  const trendStart = periods[0];

  const [
    totalProperties,
    totalBuildings,
    totalAssets,
    totalEmployees,
    totalAcquisitions,
    totalOrganizationUnits,
    assets,
    acquisitions,
    maintenances,
    incidents,
    retirements,
    disposals,
  ] = await Promise.all([
    countActiveProperties(),
    countActiveBuildings(),
    countAssets(),
    countActiveEmployees(),
    countAcquisitions(),
    countActiveOrganizationUnits(),
    getAssetsForExecutiveDashboard(),
    getAcquisitionsSince(trendStart),
    getMaintenancesSince(trendStart),
    getIncidentsSince(trendStart),
    getRetirementsSince(trendStart),
    getDisposalsSince(trendStart),
  ]);

  const byCategory = new Map<
    string,
    {
      id: string;
      code: string;
      name: string;
      count: number;
    }
  >();

  const byStatus = new Map<
    string,
    {
      id: string;
      code: string;
      name: string;
      count: number;
    }
  >();

  const byCondition = new Map<
    string,
    {
      id: string;
      code: string;
      name: string;
      count: number;
    }
  >();

  const assetsByOrganization = new Map<
    string,
    {
      id: string;
      code: string;
      name: string;
      count: number;
    }
  >();

  for (const asset of assets) {
    const category = asset.assetType.category;
    const existingCategory = byCategory.get(category.id);

    if (existingCategory) {
      existingCategory.count += 1;
    } else {
      byCategory.set(category.id, {
        id: category.id,
        code: category.code,
        name: category.name,
        count: 1,
      });
    }

    const status = asset.status;
    const existingStatus = byStatus.get(status.id);

    if (existingStatus) {
      existingStatus.count += 1;
    } else {
      byStatus.set(status.id, {
        id: status.id,
        code: status.code,
        name: status.name,
        count: 1,
      });
    }

    const condition = asset.condition;
    const existingCondition = byCondition.get(condition.id);

    if (existingCondition) {
      existingCondition.count += 1;
    } else {
      byCondition.set(condition.id, {
        id: condition.id,
        code: condition.code,
        name: condition.name,
        count: 1,
      });
    }

    const organizationUnit = asset.location?.organizationUnit;

    if (organizationUnit) {
      const existingOrganization = assetsByOrganization.get(
        organizationUnit.id,
      );

      if (existingOrganization) {
        existingOrganization.count += 1;
      } else {
        assetsByOrganization.set(organizationUnit.id, {
          id: organizationUnit.id,
          code: organizationUnit.code,
          name: organizationUnit.name,
          count: 1,
        });
      }
    }
  }

  const acquisitionTrend = createZeroTrend(periods);

  for (const acquisition of acquisitions) {
    incrementTrend(acquisitionTrend, formatPeriod(acquisition.acquisitionDate));
  }

  const maintenanceIncidentTrend = createZeroMaintenanceIncidentTrend(periods);

  for (const maintenance of maintenances) {
    incrementMaintenanceIncidentTrend(
      maintenanceIncidentTrend,
      formatPeriod(maintenance.createdAt),
      'maintenance',
    );
  }

  for (const incident of incidents) {
    incrementMaintenanceIncidentTrend(
      maintenanceIncidentTrend,
      formatPeriod(incident.incidentDate),
      'incidents',
    );
  }

  const retirementActivity = createZeroLifecycleTrend(periods);

  for (const retirement of retirements) {
    incrementLifecycleTrend(
      retirementActivity,
      formatPeriod(retirement.retirementDate),
    );
  }

  const disposalActivity = createZeroLifecycleTrend(periods);

  for (const disposal of disposals) {
    incrementLifecycleTrend(
      disposalActivity,
      formatPeriod(disposal.disposalDate),
    );
  }

  return {
    kpis: {
      totalProperties,
      totalBuildings,
      totalAssets,
      totalEmployees,
      totalAcquisitions,
      totalOrganizationUnits,
    },
    assetComposition: {
      byCategory: toBreakdownRows(byCategory),
      byStatus: toBreakdownRows(byStatus),
      byCondition: toBreakdownRows(byCondition),
    },
    assetsByOrganization: toOrganizationRows(assetsByOrganization),
    acquisitionTrend,
    maintenanceIncidentTrend,
    retirementActivity,
    disposalActivity,
  };
}
