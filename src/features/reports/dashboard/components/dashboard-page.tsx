import type { DashboardData } from '../types/dashboard.types';
import { DashboardWorkspace } from './dashboard-workspace';

type DashboardPageProps = {
  initialData: DashboardData;
  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];
  assetTypes: {
    id: string;
    code: string;
    name: string;
  }[];
  assetStatuses: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function DashboardPage({
  initialData,
  organizationUnits,
  assetTypes,
  assetStatuses,
}: DashboardPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Management Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Overview of asset portfolio, accountability, verification, operations,
          lifecycle activity, and organizational performance.
        </p>
      </div>

      <DashboardWorkspace
        initialData={initialData}
        organizationUnits={organizationUnits}
        assetTypes={assetTypes}
        assetStatuses={assetStatuses}
      />
    </div>
  );
}
