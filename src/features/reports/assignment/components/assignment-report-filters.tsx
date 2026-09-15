'use client';

import { useState } from 'react';

import type {
  AssignmentReportFilters,
  AssignmentStatus,
} from '../types/assignment.types';
import { Button } from '@/components/ui/button';

type EmployeeOption = {
  id: string;
  employeeNumber: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
};

type OrganizationUnitOption = {
  id: string;
  code: string;
  name: string;
};

type AssetTypeOption = {
  id: string;
  code: string;
  name: string;
};

type AssignmentReportFiltersProps = {
  employees: EmployeeOption[];
  organizationUnits: OrganizationUnitOption[];
  assetTypes: AssetTypeOption[];
  onApply: (filters: AssignmentReportFilters) => void;
};

const initialFilters: AssignmentReportFilters = {
  status: 'CURRENT',
};

const inputClassName =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-focus-ring/20';

export function AssignmentReportFilters({
  employees,
  organizationUnits,
  assetTypes,
  onApply,
}: AssignmentReportFiltersProps) {
  const [filters, setFilters] =
    useState<AssignmentReportFilters>(initialFilters);

  function updateFilter<K extends keyof AssignmentReportFilters>(
    key: K,
    value: AssignmentReportFilters[K],
  ) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleApply() {
    onApply({
      ...filters,
      search: filters.search?.trim() || undefined,
      employeeId: filters.employeeId || undefined,
      organizationUnitId: filters.organizationUnitId || undefined,
      assetTypeId: filters.assetTypeId || undefined,
      assignedDateFrom: filters.assignedDateFrom || undefined,
      assignedDateTo: filters.assignedDateTo || undefined,
    });
  }

  function handleReset() {
    setFilters(initialFilters);
    onApply(initialFilters);
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <label
            htmlFor="assignment-search"
            className="text-sm font-medium text-foreground"
          >
            Search
          </label>

          <input
            id="assignment-search"
            type="search"
            value={filters.search ?? ''}
            onChange={(event) => updateFilter('search', event.target.value)}
            placeholder="Asset or employee..."
            className={inputClassName}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="assignment-employee"
            className="text-sm font-medium text-foreground"
          >
            Employee
          </label>

          <select
            id="assignment-employee"
            value={filters.employeeId ?? ''}
            onChange={(event) => updateFilter('employeeId', event.target.value)}
            className={inputClassName}
          >
            <option value="">All employees</option>

            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.employeeNumber} — {employee.lastName},{' '}
                {employee.firstName}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="assignment-organization-unit"
            className="text-sm font-medium text-foreground"
          >
            Organization Unit
          </label>

          <select
            id="assignment-organization-unit"
            value={filters.organizationUnitId ?? ''}
            onChange={(event) =>
              updateFilter('organizationUnitId', event.target.value)
            }
            className={inputClassName}
          >
            <option value="">All organization units</option>

            {organizationUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.code} — {unit.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="assignment-asset-type"
            className="text-sm font-medium text-foreground"
          >
            Asset Type
          </label>

          <select
            id="assignment-asset-type"
            value={filters.assetTypeId ?? ''}
            onChange={(event) =>
              updateFilter('assetTypeId', event.target.value)
            }
            className={inputClassName}
          >
            <option value="">All asset types</option>

            {assetTypes.map((assetType) => (
              <option key={assetType.id} value={assetType.id}>
                {assetType.code} — {assetType.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="assignment-status"
            className="text-sm font-medium text-foreground"
          >
            Assignment Status
          </label>

          <select
            id="assignment-status"
            value={filters.status ?? 'CURRENT'}
            onChange={(event) =>
              updateFilter(
                'status',
                event.target.value as AssignmentStatus | 'ALL',
              )
            }
            className={inputClassName}
          >
            <option value="CURRENT">Current</option>
            <option value="RETURNED">Returned</option>
            <option value="ALL">All</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="assignment-date-from"
            className="text-sm font-medium text-foreground"
          >
            Assigned Date From
          </label>

          <input
            id="assignment-date-from"
            type="date"
            value={filters.assignedDateFrom ?? ''}
            onChange={(event) =>
              updateFilter('assignedDateFrom', event.target.value)
            }
            className={inputClassName}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="assignment-date-to"
            className="text-sm font-medium text-foreground"
          >
            Assigned Date To
          </label>

          <input
            id="assignment-date-to"
            type="date"
            value={filters.assignedDateTo ?? ''}
            onChange={(event) =>
              updateFilter('assignedDateTo', event.target.value)
            }
            className={inputClassName}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <Button type="button" variant="primary" onClick={handleApply}>
          Apply
        </Button>

        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
