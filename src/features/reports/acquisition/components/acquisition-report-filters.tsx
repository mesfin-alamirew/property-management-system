'use client';

import { useState, type FormEvent } from 'react';

import type { AcquisitionReportFilters } from '../types/acquisition.types';

import { Button } from '@/components/ui/button';

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

  const inputClassName =
    'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-focus-ring/20';

  const labelClassName = 'mb-1.5 block text-sm font-medium text-foreground';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="acquisition-report-search" className={labelClassName}>
            Search
          </label>

          <input
            id="acquisition-report-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Acquisition no., supplier, reference..."
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="acquisition-report-method" className={labelClassName}>
            Acquisition Method
          </label>

          <select
            id="acquisition-report-method"
            value={acquisitionMethodId}
            onChange={(event) => setAcquisitionMethodId(event.target.value)}
            className={inputClassName}
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
            className={labelClassName}
          >
            Supplier
          </label>

          <input
            id="acquisition-report-supplier"
            type="text"
            value={supplierName}
            onChange={(event) => setSupplierName(event.target.value)}
            placeholder="Supplier name"
            className={inputClassName}
          />
        </div>

        <div className="md:col-span-2 lg:col-span-1">
          <div className="mb-1.5 text-sm font-medium text-foreground">
            Acquisition Date Range
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="acquisition-report-date-from" className="sr-only">
                Date From
              </label>

              <input
                id="acquisition-report-date-from"
                type="date"
                value={dateFrom}
                onChange={(event) => setDateFrom(event.target.value)}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="acquisition-report-date-to" className="sr-only">
                Date To
              </label>

              <input
                id="acquisition-report-date-to"
                type="date"
                value={dateTo}
                onChange={(event) => setDateTo(event.target.value)}
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="acquisition-report-funding-source"
            className={labelClassName}
          >
            Funding Source
          </label>

          <input
            id="acquisition-report-funding-source"
            type="text"
            value={fundingSource}
            onChange={(event) => setFundingSource(event.target.value)}
            placeholder="Funding source"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="acquisition-report-currency"
            className={labelClassName}
          >
            Currency
          </label>

          <input
            id="acquisition-report-currency"
            type="text"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            placeholder="e.g. ETB, USD"
            className={`${inputClassName} uppercase`}
          />
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
