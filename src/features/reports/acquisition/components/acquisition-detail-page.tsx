import Link from 'next/link';

import { AcquisitionDetailItemsTable } from './acquisition-detail-items-table';

import type { AcquisitionDetail } from '../types/acquisition.types';

type AcquisitionDetailPageProps = {
  acquisition: AcquisitionDetail;
};

export function AcquisitionDetailPage({
  acquisition,
}: AcquisitionDetailPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Acquisition Detail
          </h1>

          <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
            View the acquisition record and its associated assets.
          </p>
        </div>

        <Link
          href="/reports/acquisitions"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Back to Acquisition Report
        </Link>
      </div>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Acquisition Information
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <DetailField
            label="Acquisition Number"
            value={acquisition.acquisitionNumber}
          />

          <DetailField
            label="Acquisition Date"
            value={formatDate(acquisition.acquisitionDate)}
          />

          <DetailField
            label="Acquisition Method"
            value={`${acquisition.acquisitionMethod.code} - ${acquisition.acquisitionMethod.name}`}
          />

          <DetailField label="Supplier" value={acquisition.supplierName} />

          <DetailField
            label="Reference Number"
            value={acquisition.referenceNumber}
          />

          <DetailField
            label="Funding Source"
            value={acquisition.fundingSource}
          />

          <DetailField
            label="Total Amount"
            value={formatAmount(acquisition.totalAmount, acquisition.currency)}
          />

          <DetailField label="Description" value={acquisition.description} />

          <DetailField label="Notes" value={acquisition.notes} />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Acquisition Items
            </h2>

            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              {acquisition.items.length} item
              {acquisition.items.length === 1 ? '' : 's'} associated with this
              acquisition.
            </p>
          </div>
        </div>

        {acquisition.items.length > 0 ? (
          <AcquisitionDetailItemsTable items={acquisition.items} />
        ) : (
          <div className="rounded-md border border-border bg-surface-muted p-6 text-center">
            <p className="text-sm text-muted-foreground">
              No acquisition items have been recorded for this acquisition.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

type DetailFieldProps = {
  label: string;
  value: string | null;
};

function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>

      <dd className="mt-1 text-sm text-foreground">{value || '-'}</dd>
    </div>
  );
}

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat('en-GB').format(new Date(value));
}

function formatAmount(amount: string | null, currency: string | null) {
  if (!amount) {
    return '-';
  }

  const formattedAmount = Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return currency ? `${currency} ${formattedAmount}` : formattedAmount;
}
