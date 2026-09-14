import Link from 'next/link';

import type { DashboardVerificationSummary } from '../types/dashboard.types';

type DashboardVerificationSummaryProps = {
  verification: DashboardVerificationSummary;
};

type VerificationItemProps = {
  label: string;
  value: number;
  description: string;
  emphasis?: 'default' | 'success' | 'danger';
};

function VerificationItem({
  label,
  value,
  description,
  emphasis = 'default',
}: VerificationItemProps) {
  const styles = {
    default: {
      container: 'border-border bg-surface-muted',
      label: 'text-muted-foreground',
      value: 'text-foreground',
      description: 'text-muted-foreground',
    },
    success: {
      container: 'border-success/20 bg-success-surface',
      label: 'text-success',
      value: 'text-success',
      description: 'text-success',
    },
    danger: {
      container: 'border-danger/20 bg-danger-surface',
      label: 'text-danger',
      value: 'text-danger',
      description: 'text-danger',
    },
  };

  const style = styles[emphasis];

  return (
    <div className={`rounded-md border p-4 ${style.container}`}>
      <p className={`text-sm font-medium ${style.label}`}>{label}</p>

      <p
        className={`mt-1 text-2xl font-semibold tracking-tight ${style.value}`}
      >
        {value.toLocaleString()}
      </p>

      <p className={`mt-1 text-sm ${style.description}`}>{description}</p>
    </div>
  );
}

export function DashboardVerificationSummary({
  verification,
}: DashboardVerificationSummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Physical Verification
          </h2>

          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Latest verification result for each asset in the current scope.
          </p>
        </div>

        <Link
          href="/reports/verifications"
          className="text-sm font-medium text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1"
        >
          View Verification Report
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <VerificationItem
          label="Pending"
          value={verification.pending}
          description="Verification still pending"
        />

        <VerificationItem
          label="Verified"
          value={verification.verified}
          description="Assets verified successfully"
          emphasis="success"
        />

        <VerificationItem
          label="Not Found"
          value={verification.notFound}
          description="Expected asset not found"
          emphasis="danger"
        />

        <VerificationItem
          label="Location Mismatch"
          value={verification.locationMismatch}
          description="Observed location differs"
          emphasis="danger"
        />

        <VerificationItem
          label="Custodian Mismatch"
          value={verification.custodianMismatch}
          description="Observed custodian differs"
          emphasis="danger"
        />

        <VerificationItem
          label="Condition Mismatch"
          value={verification.conditionMismatch}
          description="Observed condition differs"
          emphasis="danger"
        />

        <VerificationItem
          label="Identification Mismatch"
          value={verification.identificationMismatch}
          description="Asset identification differs"
          emphasis="danger"
        />

        <VerificationItem
          label="Multiple Discrepancies"
          value={verification.multipleDiscrepancies}
          description="Multiple verification issues"
          emphasis="danger"
        />
      </div>
    </div>
  );
}
