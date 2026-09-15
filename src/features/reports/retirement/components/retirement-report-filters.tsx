'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import type { RetirementReportFilters as RetirementReportFiltersType } from '../types/retirement.types';

type RetirementReportFiltersProps = {
  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];
  conditions: {
    id: string;
    name: string;
  }[];
  users: {
    id: string;
    displayName: string;
  }[];
  onApply: (filters: RetirementReportFiltersType) => void;
};

const retirementStatuses = ['DRAFT', 'REQUESTED', 'APPROVED', 'CANCELLED'];

const fieldClassName =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-focus-ring/20 disabled:cursor-not-allowed disabled:opacity-50';

export function RetirementReportFilters({
  assets,
  conditions,
  users,
  onApply,
}: RetirementReportFiltersProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [assetId, setAssetId] = useState('');
  const [conditionId, setConditionId] = useState('');
  const [requestedByUserId, setRequestedByUserId] = useState('');
  const [approvedByUserId, setApprovedByUserId] = useState('');
  const [cancelledByUserId, setCancelledByUserId] = useState('');
  const [retirementDateFrom, setRetirementDateFrom] = useState('');
  const [retirementDateTo, setRetirementDateTo] = useState('');

  function handleApply() {
    onApply({
      search: search || undefined,
      status: status || undefined,
      assetId: assetId || undefined,
      conditionId: conditionId || undefined,
      requestedByUserId: requestedByUserId || undefined,
      approvedByUserId: approvedByUserId || undefined,
      cancelledByUserId: cancelledByUserId || undefined,
      retirementDateFrom: retirementDateFrom || undefined,
      retirementDateTo: retirementDateTo || undefined,
    });
  }

  function handleReset() {
    setSearch('');
    setStatus('');
    setAssetId('');
    setConditionId('');
    setRequestedByUserId('');
    setApprovedByUserId('');
    setCancelledByUserId('');
    setRetirementDateFrom('');
    setRetirementDateTo('');

    onApply({});
  }

  return (
    <div className="space-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="retirement-search"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Search
          </label>

          <input
            id="retirement-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Reference, reason, asset..."
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="retirement-status"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Status
          </label>

          <select
            id="retirement-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All statuses</option>

            {retirementStatuses.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="retirement-asset"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Asset
          </label>

          <select
            id="retirement-asset"
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
          <label
            htmlFor="retirement-condition"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Condition
          </label>

          <select
            id="retirement-condition"
            value={conditionId}
            onChange={(event) => setConditionId(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All conditions</option>

            {conditions.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="retirement-requested-by"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Requested By
          </label>

          <select
            id="retirement-requested-by"
            value={requestedByUserId}
            onChange={(event) => setRequestedByUserId(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All requesters</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="retirement-approved-by"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Approved By
          </label>

          <select
            id="retirement-approved-by"
            value={approvedByUserId}
            onChange={(event) => setApprovedByUserId(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All approvers</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="retirement-cancelled-by"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Cancelled By
          </label>

          <select
            id="retirement-cancelled-by"
            value={cancelledByUserId}
            onChange={(event) => setCancelledByUserId(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All cancellers</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="retirement-date-from"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Retirement Date From
          </label>

          <input
            id="retirement-date-from"
            type="date"
            value={retirementDateFrom}
            onChange={(event) => setRetirementDateFrom(event.target.value)}
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="retirement-date-to"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Retirement Date To
          </label>

          <input
            id="retirement-date-to"
            type="date"
            value={retirementDateTo}
            onChange={(event) => setRetirementDateTo(event.target.value)}
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
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
