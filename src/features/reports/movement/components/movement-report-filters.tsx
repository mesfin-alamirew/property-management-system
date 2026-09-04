'use client';

import { useState } from 'react';

import type { MovementReportFilters as MovementReportFiltersType } from '../types/movement.types';

type MovementReportFiltersProps = {
  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];
  locations: {
    id: string;
    name: string;
  }[];
  users: {
    id: string;
    displayName: string;
  }[];
  onApply: (filters: MovementReportFiltersType) => void;
};

export function MovementReportFilters({
  assets,
  locations,
  users,
  onApply,
}: MovementReportFiltersProps) {
  const [search, setSearch] = useState('');
  const [assetId, setAssetId] = useState('');
  const [fromLocationId, setFromLocationId] = useState('');
  const [toLocationId, setToLocationId] = useState('');
  const [movedByUserId, setMovedByUserId] = useState('');
  const [movedDateFrom, setMovedDateFrom] = useState('');
  const [movedDateTo, setMovedDateTo] = useState('');

  function handleApply() {
    onApply({
      search: search || undefined,
      assetId: assetId || undefined,
      fromLocationId: fromLocationId || undefined,
      toLocationId: toLocationId || undefined,
      movedByUserId: movedByUserId || undefined,
      movedDateFrom: movedDateFrom || undefined,
      movedDateTo: movedDateTo || undefined,
    });
  }

  function handleReset() {
    setSearch('');
    setAssetId('');
    setFromLocationId('');
    setToLocationId('');
    setMovedByUserId('');
    setMovedDateFrom('');
    setMovedDateTo('');

    onApply({});
  }

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="movement-search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search
          </label>

          <input
            id="movement-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Asset, reason, notes..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="movement-asset"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Asset
          </label>

          <select
            id="movement-asset"
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
            htmlFor="movement-from-location"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            From Location
          </label>

          <select
            id="movement-from-location"
            value={fromLocationId}
            onChange={(event) => setFromLocationId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All source locations</option>

            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="movement-to-location"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            To Location
          </label>

          <select
            id="movement-to-location"
            value={toLocationId}
            onChange={(event) => setToLocationId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All destination locations</option>

            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="movement-moved-by"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Moved By
          </label>

          <select
            id="movement-moved-by"
            value={movedByUserId}
            onChange={(event) => setMovedByUserId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All officers</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="movement-date-from"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Moved Date From
          </label>

          <input
            id="movement-date-from"
            type="date"
            value={movedDateFrom}
            onChange={(event) => setMovedDateFrom(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="movement-date-to"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Moved Date To
          </label>

          <input
            id="movement-date-to"
            type="date"
            value={movedDateTo}
            onChange={(event) => setMovedDateTo(event.target.value)}
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
