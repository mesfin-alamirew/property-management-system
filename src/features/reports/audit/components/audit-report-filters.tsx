'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

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

  const fieldClassName =
    'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-focus-ring/20 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <div className="space-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="audit-search"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Search
          </label>

          <input
            id="audit-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Action, entity, description..."
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="audit-user"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            User
          </label>

          <select
            id="audit-user"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            className={fieldClassName}
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
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Action
          </label>

          <select
            id="audit-action"
            value={action}
            onChange={(event) => setAction(event.target.value)}
            className={fieldClassName}
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
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Entity Type
          </label>

          <select
            id="audit-entity-type"
            value={entityType}
            onChange={(event) => setEntityType(event.target.value)}
            className={fieldClassName}
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
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Date From
          </label>

          <input
            id="audit-date-from"
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="audit-date-to"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Date To
          </label>

          <input
            id="audit-date-to"
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
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
