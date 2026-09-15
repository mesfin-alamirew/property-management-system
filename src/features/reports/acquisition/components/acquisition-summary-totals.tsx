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
    <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>

      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground tabular-nums">
        {value}
      </p>
    </div>
  );
}
