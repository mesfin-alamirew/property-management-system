'use client';

import type { AcquisitionSummaryTotals } from '../types/acquisition.types';

type AcquisitionSummaryTotalsProps = {
  totals: AcquisitionSummaryTotals;
};

export function AcquisitionSummaryTotals({
  totals,
}: AcquisitionSummaryTotalsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <SummaryCard
        label="Total Acquisitions"
        value={totals.acquisitionCount.toLocaleString('en-US')}
      />

      <SummaryCard
        label="Total Acquired Items"
        value={totals.itemCount.toLocaleString('en-US')}
      />
    </div>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
};

function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <p className="text-sm font-medium text-gray-500">{label}</p>

      <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}
