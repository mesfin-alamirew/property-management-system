'use client';

import { useState, type FormEvent } from 'react';

import type { AcquisitionSummaryFilters } from '../types/acquisition.types';

import { Button } from '@/components/ui/button';

type AcquisitionSummaryFiltersProps = {
  onFilter: (filters: AcquisitionSummaryFilters) => void;
};

export function AcquisitionSummaryFilters({
  onFilter,
}: AcquisitionSummaryFiltersProps) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onFilter({
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
    });
  }

  function handleReset() {
    setDateFrom('');
    setDateTo('');

    onFilter({});
  }

  const inputClassName =
    'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-focus-ring/20';

  return (
    <form
      className="space-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="mb-1.5 text-sm font-medium text-foreground">
          Acquisition Date Range
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="summary-date-from"
              className="mb-1.5 block text-sm text-muted-foreground"
            >
              Date From
            </label>

            <input
              id="summary-date-from"
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="summary-date-to"
              className="mb-1.5 block text-sm text-muted-foreground"
            >
              Date To
            </label>

            <input
              id="summary-date-to"
              type="date"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
              className={inputClassName}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <Button type="submit" variant="primary">
          Apply Filters
        </Button>

        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}
