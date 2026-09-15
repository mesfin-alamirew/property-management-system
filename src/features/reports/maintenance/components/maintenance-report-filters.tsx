'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import type { MaintenanceReportFilters } from '../types/maintenance.types';

type MaintenanceReportFiltersProps = {
  initialFilters?: MaintenanceReportFilters;
  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];
  assignedUsers: {
    id: string;
    displayName: string;
  }[];
  onApply: (filters: MaintenanceReportFilters) => void;
  loading?: boolean;
};

const maintenanceTypes = ['PREVENTIVE', 'CORRECTIVE', 'EMERGENCY'];

const maintenanceStatuses = [
  'DRAFT',
  'REQUESTED',
  'APPROVED',
  'SCHEDULED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
];

const defaultFilters: MaintenanceReportFilters = {
  type: '',
  status: '',
  assetId: '',
  assignedToUserId: '',
};

export function MaintenanceReportFilters({
  initialFilters,
  assets,
  assignedUsers,
  onApply,
  loading = false,
}: MaintenanceReportFiltersProps) {
  const [filters, setFilters] = useState<MaintenanceReportFilters>({
    ...defaultFilters,
    ...initialFilters,
  });

  function updateFilter(key: keyof MaintenanceReportFilters, value: string) {
    setFilters((current) => ({
      ...current,
      [key]: value || undefined,
    }));
  }

  function handleApply() {
    onApply(filters);
  }

  function handleReset() {
    const resetFilters: MaintenanceReportFilters = {
      ...defaultFilters,
    };

    setFilters(resetFilters);
    onApply(resetFilters);
  }

  const fieldClassName =
    'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-focus-ring/20 disabled:cursor-not-allowed disabled:opacity-50';

  const labelClassName = 'mb-1 block text-sm font-medium text-foreground';

  return (
    <div className="space-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="maintenance-search" className={labelClassName}>
            Search
          </label>

          <input
            id="maintenance-search"
            type="text"
            value={filters.search ?? ''}
            onChange={(event) => updateFilter('search', event.target.value)}
            placeholder="Reference, title, asset code or tag"
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="maintenance-type" className={labelClassName}>
            Maintenance Type
          </label>

          <select
            id="maintenance-type"
            value={filters.type ?? ''}
            onChange={(event) => updateFilter('type', event.target.value)}
            className={fieldClassName}
          >
            <option value="">All Types</option>

            {maintenanceTypes.map((type) => (
              <option key={type} value={type}>
                {type.replaceAll('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="maintenance-status" className={labelClassName}>
            Status
          </label>

          <select
            id="maintenance-status"
            value={filters.status ?? ''}
            onChange={(event) => updateFilter('status', event.target.value)}
            className={fieldClassName}
          >
            <option value="">All Statuses</option>

            {maintenanceStatuses.map((status) => (
              <option key={status} value={status}>
                {status.replaceAll('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="maintenance-asset" className={labelClassName}>
            Asset
          </label>

          <select
            id="maintenance-asset"
            value={filters.assetId ?? ''}
            onChange={(event) => updateFilter('assetId', event.target.value)}
            className={fieldClassName}
          >
            <option value="">All Assets</option>

            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.assetCode} — {asset.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="maintenance-assigned-user" className={labelClassName}>
            Assigned Officer
          </label>

          <select
            id="maintenance-assigned-user"
            value={filters.assignedToUserId ?? ''}
            onChange={(event) =>
              updateFilter('assignedToUserId', event.target.value)
            }
            className={fieldClassName}
          >
            <option value="">All Officers</option>

            {assignedUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="maintenance-requested-from"
            className={labelClassName}
          >
            Requested From
          </label>

          <input
            id="maintenance-requested-from"
            type="date"
            value={filters.requestedDateFrom ?? ''}
            onChange={(event) =>
              updateFilter('requestedDateFrom', event.target.value)
            }
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="maintenance-requested-to" className={labelClassName}>
            Requested To
          </label>

          <input
            id="maintenance-requested-to"
            type="date"
            value={filters.requestedDateTo ?? ''}
            onChange={(event) =>
              updateFilter('requestedDateTo', event.target.value)
            }
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="maintenance-scheduled-from"
            className={labelClassName}
          >
            Scheduled From
          </label>

          <input
            id="maintenance-scheduled-from"
            type="date"
            value={filters.scheduledDateFrom ?? ''}
            onChange={(event) =>
              updateFilter('scheduledDateFrom', event.target.value)
            }
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="maintenance-scheduled-to" className={labelClassName}>
            Scheduled To
          </label>

          <input
            id="maintenance-scheduled-to"
            type="date"
            value={filters.scheduledDateTo ?? ''}
            onChange={(event) =>
              updateFilter('scheduledDateTo', event.target.value)
            }
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <Button
          type="button"
          variant="primary"
          onClick={handleApply}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Apply Filters'}
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
          disabled={loading}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
