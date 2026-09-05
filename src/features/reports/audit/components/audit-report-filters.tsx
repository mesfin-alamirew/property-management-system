'use client';

import { useState } from 'react';

import type { AuditReportFilters } from '../types/audit.types';

type AuditReportFiltersProps = {
  users: {
    id: string;
    displayName: string;
    username: string;
    isActive: boolean;
  }[];
  actions: string[];
  entityTypes: string[];
  onApply: (filters: AuditReportFilters) => void;
};

export function AuditReportFilters({
  users,
  actions,
  entityTypes,
  onApply,
}: AuditReportFiltersProps) {
  const [search, setSearch] = useState('');
  const [userId, setUserId] = useState('');
  const [action, setAction] = useState('');
  const [entityType, setEntityType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  function handleApply() {
    onApply({
      search: search.trim() || undefined,
      userId: userId || undefined,
      action: action || undefined,
      entityType: entityType || undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
    });
  }

  function handleReset() {
    setSearch('');
    setUserId('');
    setAction('');
    setEntityType('');
    setDateFrom('');
    setDateTo('');

    onApply({});
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="audit-search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <input
            id="audit-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Action, entity, description..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="audit-user"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            User
          </label>
          <select
            id="audit-user"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName} ({user.username})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="audit-action"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Action
          </label>
          <select
            id="audit-action"
            value={action}
            onChange={(event) => setAction(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All actions</option>
            {actions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="audit-entity-type"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Entity Type
          </label>
          <select
            id="audit-entity-type"
            value={entityType}
            onChange={(event) => setEntityType(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All entity types</option>
            {entityTypes.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="audit-date-from"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Date From
          </label>
          <input
            id="audit-date-from"
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="audit-date-to"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Date To
          </label>
          <input
            id="audit-date-to"
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleApply}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
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
