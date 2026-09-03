'use client';

import { useState, type FormEvent } from 'react';

import type { AcquisitionSummaryFilters } from '../types/acquisition.types';

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

  return (
    <form
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-4"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="summary-date-from"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Date From
          </label>

          <input
            id="summary-date-from"
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="summary-date-to"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Date To
          </label>

          <input
            id="summary-date-to"
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="submit"
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
    </form>
  );
}
