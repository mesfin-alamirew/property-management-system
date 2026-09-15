'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import type { PhysicalVerificationReportFilters } from '../types/verification.types';

type OrganizationUnitOption = {
  id: string;
  code: string;
  name: string;
};

type LocationOption = {
  id: string;
  code: string;
  name: string;
};

type VerificationReportFiltersProps = {
  organizationUnits: OrganizationUnitOption[];
  locations: LocationOption[];
  onApply: (filters: PhysicalVerificationReportFilters) => void;
};

const fieldClassName =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-focus-ring/20 disabled:cursor-not-allowed disabled:opacity-50';

export function VerificationReportFilters({
  organizationUnits,
  locations,
  onApply,
}: VerificationReportFiltersProps) {
  const [search, setSearch] = useState('');
  const [organizationUnitId, setOrganizationUnitId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [scope, setScope] =
    useState<PhysicalVerificationReportFilters['scope']>('ALL');
  const [status, setStatus] =
    useState<PhysicalVerificationReportFilters['status']>('ALL');
  const [scheduledDateFrom, setScheduledDateFrom] = useState('');
  const [scheduledDateTo, setScheduledDateTo] = useState('');
  const [completedDateFrom, setCompletedDateFrom] = useState('');
  const [completedDateTo, setCompletedDateTo] = useState('');

  function handleApply() {
    onApply({
      search: search.trim() || undefined,
      organizationUnitId: organizationUnitId || undefined,
      locationId: locationId || undefined,
      scope,
      status,
      scheduledDateFrom: scheduledDateFrom || undefined,
      scheduledDateTo: scheduledDateTo || undefined,
      completedDateFrom: completedDateFrom || undefined,
      completedDateTo: completedDateTo || undefined,
    });
  }

  function handleReset() {
    setSearch('');
    setOrganizationUnitId('');
    setLocationId('');
    setScope('ALL');
    setStatus('ALL');
    setScheduledDateFrom('');
    setScheduledDateTo('');
    setCompletedDateFrom('');
    setCompletedDateTo('');

    onApply({
      scope: 'ALL',
      status: 'ALL',
    });
  }

  return (
    <div className="space-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="verification-search"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Search
          </label>

          <input
            id="verification-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Reference number or title"
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="verification-organization-unit"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Organization Unit
          </label>

          <select
            id="verification-organization-unit"
            value={organizationUnitId}
            onChange={(event) => setOrganizationUnitId(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All Organization Units</option>

            {organizationUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.code} - {unit.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="verification-location"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Location
          </label>

          <select
            id="verification-location"
            value={locationId}
            onChange={(event) => setLocationId(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All Locations</option>

            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.code} - {location.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="verification-scope"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Scope
          </label>

          <select
            id="verification-scope"
            value={scope}
            onChange={(event) =>
              setScope(
                event.target
                  .value as PhysicalVerificationReportFilters['scope'],
              )
            }
            className={fieldClassName}
          >
            <option value="ALL">All Scopes</option>
            <option value="ORGANIZATION">Organization</option>
            <option value="ORGANIZATION_UNIT">Organization Unit</option>
            <option value="LOCATION">Location</option>
            <option value="ORGANIZATION_UNIT_LOCATION">
              Organization Unit + Location
            </option>
            <option value="SELECTED_ASSETS">Selected Assets</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="verification-status"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Status
          </label>

          <select
            id="verification-status"
            value={status}
            onChange={(event) =>
              setStatus(
                event.target
                  .value as PhysicalVerificationReportFilters['status'],
              )
            }
            className={fieldClassName}
          >
            <option value="ALL">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="verification-scheduled-from"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Scheduled Date From
          </label>

          <input
            id="verification-scheduled-from"
            type="date"
            value={scheduledDateFrom}
            onChange={(event) => setScheduledDateFrom(event.target.value)}
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="verification-scheduled-to"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Scheduled Date To
          </label>

          <input
            id="verification-scheduled-to"
            type="date"
            value={scheduledDateTo}
            onChange={(event) => setScheduledDateTo(event.target.value)}
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="verification-completed-from"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Completed Date From
          </label>

          <input
            id="verification-completed-from"
            type="date"
            value={completedDateFrom}
            onChange={(event) => setCompletedDateFrom(event.target.value)}
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="verification-completed-to"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Completed Date To
          </label>

          <input
            id="verification-completed-to"
            type="date"
            value={completedDateTo}
            onChange={(event) => setCompletedDateTo(event.target.value)}
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
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
