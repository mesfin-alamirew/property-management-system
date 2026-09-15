'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import type { IncidentReportFilters as IncidentReportFiltersType } from '../types/incident.types';

type IncidentReportFiltersProps = {
  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];
  users: {
    id: string;
    displayName: string;
  }[];
  onApply: (filters: IncidentReportFiltersType) => void;
};

const incidentTypes = [
  'ACCIDENT',
  'DAMAGE',
  'LOSS',
  'THEFT',
  'MALFUNCTION',
  'OTHER',
];

const incidentSeverities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

const incidentStatuses = [
  'DRAFT',
  'REPORTED',
  'ASSIGNED',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED',
  'CANCELLED',
];

export function IncidentReportFilters({
  assets,
  users,
  onApply,
}: IncidentReportFiltersProps) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [severity, setSeverity] = useState('');
  const [status, setStatus] = useState('');
  const [assetId, setAssetId] = useState('');
  const [reportedByUserId, setReportedByUserId] = useState('');
  const [assignedToUserId, setAssignedToUserId] = useState('');
  const [incidentDateFrom, setIncidentDateFrom] = useState('');
  const [incidentDateTo, setIncidentDateTo] = useState('');
  const [reportedDateFrom, setReportedDateFrom] = useState('');
  const [reportedDateTo, setReportedDateTo] = useState('');

  function handleApply() {
    onApply({
      search: search || undefined,
      type: type || undefined,
      severity: severity || undefined,
      status: status || undefined,
      assetId: assetId || undefined,
      reportedByUserId: reportedByUserId || undefined,
      assignedToUserId: assignedToUserId || undefined,
      incidentDateFrom: incidentDateFrom || undefined,
      incidentDateTo: incidentDateTo || undefined,
      reportedDateFrom: reportedDateFrom || undefined,
      reportedDateTo: reportedDateTo || undefined,
    });
  }

  function handleReset() {
    setSearch('');
    setType('');
    setSeverity('');
    setStatus('');
    setAssetId('');
    setReportedByUserId('');
    setAssignedToUserId('');
    setIncidentDateFrom('');
    setIncidentDateTo('');
    setReportedDateFrom('');
    setReportedDateTo('');

    onApply({});
  }

  const fieldClassName =
    'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-focus-ring/20';

  const labelClassName = 'mb-1.5 block text-sm font-medium text-foreground';

  const sectionTitleClassName = 'mb-3 text-sm font-semibold text-foreground';

  return (
    <div className="space-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="incident-search" className={labelClassName}>
            Search
          </label>

          <input
            id="incident-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Reference, title, description, asset..."
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="incident-type" className={labelClassName}>
            Incident Type
          </label>

          <select
            id="incident-type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All types</option>

            {incidentTypes.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="incident-severity" className={labelClassName}>
            Severity
          </label>

          <select
            id="incident-severity"
            value={severity}
            onChange={(event) => setSeverity(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All severities</option>

            {incidentSeverities.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="incident-status" className={labelClassName}>
            Status
          </label>

          <select
            id="incident-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All statuses</option>

            {incidentStatuses.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="incident-asset" className={labelClassName}>
            Asset
          </label>

          <select
            id="incident-asset"
            value={assetId}
            onChange={(event) => setAssetId(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All assets</option>

            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.assetCode} — {asset.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="incident-reported-by" className={labelClassName}>
            Reported By
          </label>

          <select
            id="incident-reported-by"
            value={reportedByUserId}
            onChange={(event) => setReportedByUserId(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All reporters</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="incident-assigned-to" className={labelClassName}>
            Assigned Officer
          </label>

          <select
            id="incident-assigned-to"
            value={assignedToUserId}
            onChange={(event) => setAssignedToUserId(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All officers</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <h3 className={sectionTitleClassName}>Incident Date Range</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="incident-date-from" className={labelClassName}>
              From
            </label>

            <input
              id="incident-date-from"
              type="date"
              value={incidentDateFrom}
              onChange={(event) => setIncidentDateFrom(event.target.value)}
              className={fieldClassName}
            />
          </div>

          <div>
            <label htmlFor="incident-date-to" className={labelClassName}>
              To
            </label>

            <input
              id="incident-date-to"
              type="date"
              value={incidentDateTo}
              onChange={(event) => setIncidentDateTo(event.target.value)}
              className={fieldClassName}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <h3 className={sectionTitleClassName}>Reported Date Range</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="reported-date-from" className={labelClassName}>
              From
            </label>

            <input
              id="reported-date-from"
              type="date"
              value={reportedDateFrom}
              onChange={(event) => setReportedDateFrom(event.target.value)}
              className={fieldClassName}
            />
          </div>

          <div>
            <label htmlFor="reported-date-to" className={labelClassName}>
              To
            </label>

            <input
              id="reported-date-to"
              type="date"
              value={reportedDateTo}
              onChange={(event) => setReportedDateTo(event.target.value)}
              className={fieldClassName}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <Button type="button" variant="primary" onClick={handleApply}>
          Apply Filters
        </Button>

        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
