import type { ExecutiveDashboardData } from '../types/executive-dashboard.types';

import { ExecutiveAssetComposition } from './executive-asset-composition';
import { ExecutiveKpiCards } from './executive-kpi-cards';
import { ExecutiveLifecycle } from './executive-lifecycle';
import { ExecutiveOrganizationChart } from './executive-organization-chart';
import { ExecutiveTrends } from './executive-trends';

type ExecutiveDashboardPageProps = {
  initialData: ExecutiveDashboardData;
};

export function ExecutiveDashboardPage({
  initialData,
}: ExecutiveDashboardPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Executive Dashboard
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
          Executive overview of the organization&apos;s properties, buildings,
          assets, people, acquisitions, and operational activity.
        </p>
      </div>

      <ExecutiveKpiCards kpis={initialData.kpis} />

      <ExecutiveAssetComposition
        assetComposition={initialData.assetComposition}
      />

      <ExecutiveOrganizationChart
        assetsByOrganization={initialData.assetsByOrganization}
      />

      <ExecutiveTrends
        acquisitionTrend={initialData.acquisitionTrend}
        maintenanceIncidentTrend={initialData.maintenanceIncidentTrend}
      />

      <ExecutiveLifecycle
        retirementActivity={initialData.retirementActivity}
        disposalActivity={initialData.disposalActivity}
      />
    </div>
  );
}
