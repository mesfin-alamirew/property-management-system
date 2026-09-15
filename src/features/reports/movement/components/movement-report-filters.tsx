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

const inputClassName =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-focus-ring/20';

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
    <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <label
            htmlFor="movement-search"
            className="text-sm font-medium text-foreground"
          >
            Search
          </label>

          <input
            id="movement-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Asset, reason, notes..."
            className={inputClassName}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="movement-asset"
            className="text-sm font-medium text-foreground"
          >
            Asset
          </label>

          <select
            id="movement-asset"
            value={assetId}
            onChange={(event) => setAssetId(event.target.value)}
            className={inputClassName}
          >
            <option value="">All assets</option>

            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.assetCode} — {asset.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="movement-from-location"
            className="text-sm font-medium text-foreground"
          >
            From Location
          </label>

          <select
            id="movement-from-location"
            value={fromLocationId}
            onChange={(event) => setFromLocationId(event.target.value)}
            className={inputClassName}
          >
            <option value="">All source locations</option>

            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="movement-to-location"
            className="text-sm font-medium text-foreground"
          >
            To Location
          </label>

          <select
            id="movement-to-location"
            value={toLocationId}
            onChange={(event) => setToLocationId(event.target.value)}
            className={inputClassName}
          >
            <option value="">All destination locations</option>

            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="movement-moved-by"
            className="text-sm font-medium text-foreground"
          >
            Moved By
          </label>

          <select
            id="movement-moved-by"
            value={movedByUserId}
            onChange={(event) => setMovedByUserId(event.target.value)}
            className={inputClassName}
          >
            <option value="">All officers</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="movement-date-from"
            className="text-sm font-medium text-foreground"
          >
            Moved Date From
          </label>

          <input
            id="movement-date-from"
            type="date"
            value={movedDateFrom}
            onChange={(event) => setMovedDateFrom(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="movement-date-to"
            className="text-sm font-medium text-foreground"
          >
            Moved Date To
          </label>

          <input
            id="movement-date-to"
            type="date"
            value={movedDateTo}
            onChange={(event) => setMovedDateTo(event.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleApply}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
