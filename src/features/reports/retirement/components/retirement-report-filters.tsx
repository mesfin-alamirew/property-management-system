'use client';

import { useState } from 'react';

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
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="retirement-search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search
          </label>

          <input
            id="retirement-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Reference, reason, asset..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="retirement-status"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="retirement-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Asset
          </label>

          <select
            id="retirement-asset"
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
            htmlFor="retirement-condition"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Condition
          </label>

          <select
            id="retirement-condition"
            value={conditionId}
            onChange={(event) => setConditionId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Requested By
          </label>

          <select
            id="retirement-requested-by"
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
            htmlFor="retirement-approved-by"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Approved By
          </label>

          <select
            id="retirement-approved-by"
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
            htmlFor="retirement-cancelled-by"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Cancelled By
          </label>

          <select
            id="retirement-cancelled-by"
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
            htmlFor="retirement-date-from"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Retirement Date From
          </label>

          <input
            id="retirement-date-from"
            type="date"
            value={retirementDateFrom}
            onChange={(event) => setRetirementDateFrom(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="retirement-date-to"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Retirement Date To
          </label>

          <input
            id="retirement-date-to"
            type="date"
            value={retirementDateTo}
            onChange={(event) => setRetirementDateTo(event.target.value)}
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
