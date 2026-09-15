'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import type { DisposalReportFilters as DisposalReportFiltersType } from '../types/disposal.types';

type DisposalReportFiltersProps = {
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
  onApply: (filters: DisposalReportFiltersType) => void;
};

const disposalStatuses = ['DRAFT', 'REQUESTED', 'APPROVED', 'CANCELLED'];

export function DisposalReportFilters({
  assets,
  users,
  onApply,
}: DisposalReportFiltersProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [method, setMethod] = useState('');
  const [assetId, setAssetId] = useState('');
  const [requestedByUserId, setRequestedByUserId] = useState('');
  const [approvedByUserId, setApprovedByUserId] = useState('');
  const [cancelledByUserId, setCancelledByUserId] = useState('');
  const [disposalDateFrom, setDisposalDateFrom] = useState('');
  const [disposalDateTo, setDisposalDateTo] = useState('');

  function handleApply() {
    onApply({
      search: search || undefined,
      status: status || undefined,
      method: method || undefined,
      assetId: assetId || undefined,
      requestedByUserId: requestedByUserId || undefined,
      approvedByUserId: approvedByUserId || undefined,
      cancelledByUserId: cancelledByUserId || undefined,
      disposalDateFrom: disposalDateFrom || undefined,
      disposalDateTo: disposalDateTo || undefined,
    });
  }

  function handleReset() {
    setSearch('');
    setStatus('');
    setMethod('');
    setAssetId('');
    setRequestedByUserId('');
    setApprovedByUserId('');
    setCancelledByUserId('');
    setDisposalDateFrom('');
    setDisposalDateTo('');

    onApply({});
  }

  const fieldClassName =
    'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-focus-ring/20 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <div className="space-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="disposal-search"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Search
          </label>

          <input
            id="disposal-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Reference, method, reason, asset..."
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="disposal-status"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Status
          </label>

          <select
            id="disposal-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All statuses</option>

            {disposalStatuses.map((disposalStatus) => (
              <option key={disposalStatus} value={disposalStatus}>
                {disposalStatus}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="disposal-method"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Disposal Method
          </label>

          <input
            id="disposal-method"
            type="text"
            value={method}
            onChange={(event) => setMethod(event.target.value)}
            placeholder="e.g. Sale, Transfer..."
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="disposal-asset"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Asset
          </label>

          <select
            id="disposal-asset"
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
            htmlFor="disposal-requested-by"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Requested By
          </label>

          <select
            id="disposal-requested-by"
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
            htmlFor="disposal-approved-by"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Approved By
          </label>

          <select
            id="disposal-approved-by"
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
            htmlFor="disposal-cancelled-by"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Cancelled By
          </label>

          <select
            id="disposal-cancelled-by"
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
            htmlFor="disposal-date-from"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Disposal Date From
          </label>

          <input
            id="disposal-date-from"
            type="date"
            value={disposalDateFrom}
            onChange={(event) => setDisposalDateFrom(event.target.value)}
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="disposal-date-to"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Disposal Date To
          </label>

          <input
            id="disposal-date-to"
            type="date"
            value={disposalDateTo}
            onChange={(event) => setDisposalDateTo(event.target.value)}
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
