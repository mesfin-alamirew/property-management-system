'use client';

import { useState, type FormEvent } from 'react';

import type { AcquisitionReportFilters } from '../types/acquisition.types';

type AcquisitionMethodOption = {
  id: string;
  code: string;
  name: string;
};

type AcquisitionReportFiltersProps = {
  acquisitionMethods: AcquisitionMethodOption[];
  onFilter: (filters: AcquisitionReportFilters) => void;
};

export function AcquisitionReportFilters({
  acquisitionMethods,
  onFilter,
}: AcquisitionReportFiltersProps) {
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [acquisitionMethodId, setAcquisitionMethodId] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [fundingSource, setFundingSource] = useState('');
  const [currency, setCurrency] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onFilter({
      search: search.trim() || undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      acquisitionMethodId: acquisitionMethodId || undefined,
      supplierName: supplierName.trim() || undefined,
      fundingSource: fundingSource.trim() || undefined,
      currency: currency.trim() || undefined,
    });
  }

  function handleReset() {
    setSearch('');
    setDateFrom('');
    setDateTo('');
    setAcquisitionMethodId('');
    setSupplierName('');
    setFundingSource('');
    setCurrency('');

    onFilter({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-4"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="acquisition-report-search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search
          </label>

          <input
            id="acquisition-report-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Acquisition no., supplier, reference..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="acquisition-report-method"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Acquisition Method
          </label>

          <select
            id="acquisition-report-method"
            value={acquisitionMethodId}
            onChange={(event) => setAcquisitionMethodId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All methods</option>

            {acquisitionMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.code} - {method.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="acquisition-report-supplier"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Supplier
          </label>

          <input
            id="acquisition-report-supplier"
            type="text"
            value={supplierName}
            onChange={(event) => setSupplierName(event.target.value)}
            placeholder="Supplier name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="acquisition-report-date-from"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Date From
          </label>

          <input
            id="acquisition-report-date-from"
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="acquisition-report-date-to"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Date To
          </label>

          <input
            id="acquisition-report-date-to"
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="acquisition-report-funding-source"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Funding Source
          </label>

          <input
            id="acquisition-report-funding-source"
            type="text"
            value={fundingSource}
            onChange={(event) => setFundingSource(event.target.value)}
            placeholder="Funding source"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="acquisition-report-currency"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Currency
          </label>

          <input
            id="acquisition-report-currency"
            type="text"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            placeholder="e.g. ETB, USD"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm uppercase outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
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
