'use client';

import { useState } from 'react';

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

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="disposal-search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search
          </label>

          <input
            id="disposal-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Reference, method, reason, asset..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="disposal-status"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="disposal-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Disposal Method
          </label>

          <input
            id="disposal-method"
            type="text"
            value={method}
            onChange={(event) => setMethod(event.target.value)}
            placeholder="e.g. Sale, Transfer..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="disposal-asset"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Asset
          </label>

          <select
            id="disposal-asset"
            value={assetId}
            onChange={(event) => setAssetId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Requested By
          </label>

          <select
            id="disposal-requested-by"
            value={requestedByUserId}
            onChange={(event) => setRequestedByUserId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Approved By
          </label>

          <select
            id="disposal-approved-by"
            value={approvedByUserId}
            onChange={(event) => setApprovedByUserId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Cancelled By
          </label>

          <select
            id="disposal-cancelled-by"
            value={cancelledByUserId}
            onChange={(event) => setCancelledByUserId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Disposal Date From
          </label>

          <input
            id="disposal-date-from"
            type="date"
            value={disposalDateFrom}
            onChange={(event) => setDisposalDateFrom(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="disposal-date-to"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Disposal Date To
          </label>

          <input
            id="disposal-date-to"
            type="date"
            value={disposalDateTo}
            onChange={(event) => setDisposalDateTo(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleApply}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
