'use client';

import { useState } from 'react';

import { getAcquisitionSummaryAction } from '../actions/acquisition.actions';
import { AcquisitionSummaryFilters } from './acquisition-summary-filters';

import type {
  AcquisitionSummary,
  AcquisitionSummaryFilters as AcquisitionSummaryFiltersType,
} from '../types/acquisition.types';
import { AcquisitionSummaryTotals } from './acquisition-summary-totals';
import { AcquisitionSummaryMethodTable } from './acquisition-summary-method-table';
import { AcquisitionSummaryFundingSourceTable } from './acquisition-summary-funding-source-table';
import { AcquisitionSummaryCurrencyTable } from './acquisition-summary-currency-table';
type AcquisitionSummaryWorkspaceProps = {
  initialData: AcquisitionSummary;
};

export function AcquisitionSummaryWorkspace({
  initialData,
}: AcquisitionSummaryWorkspaceProps) {
  const [summary, setSummary] = useState<AcquisitionSummary>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFilter(filters: AcquisitionSummaryFiltersType) {
    setLoading(true);
    setError(null);

    const result = await getAcquisitionSummaryAction(filters);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setSummary(result.data);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <AcquisitionSummaryFilters onFilter={handleFilter} />

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-start justify-center bg-white/60 pt-8">
            <p className="text-sm text-gray-600">Loading summary...</p>
          </div>
        )}

        {/* Summary presentation components will be added here. */}
        <div className="space-y-6">
          <AcquisitionSummaryTotals totals={summary.totals} />

          <section className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                By Acquisition Method
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Acquisition volume and acquired items grouped by acquisition
                method.
              </p>
            </div>

            <AcquisitionSummaryMethodTable methods={summary.byMethod} />
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                By Funding Source
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Acquisition volume and acquired items grouped by funding source.
              </p>
            </div>

            <AcquisitionSummaryFundingSourceTable
              fundingSources={summary.byFundingSource}
            />
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                By Currency
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Acquisition values are reported separately for each currency.
              </p>
            </div>

            <AcquisitionSummaryCurrencyTable currencies={summary.byCurrency} />
          </section>
        </div>
      </div>
    </div>
  );
}
