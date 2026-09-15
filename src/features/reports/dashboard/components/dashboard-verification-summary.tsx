import Link from 'next/link';
import { DashboardData } from '../types/dashboard.types';

type DashboardVerificationSummaryProps = {
  verification: DashboardData['verification'];
};
type VerificationItemProps = {
  label: string;
  value: number;
  emphasis?: 'default' | 'success' | 'danger';
};

function VerificationItem({
  label,
  value,
  emphasis = 'default',
}: VerificationItemProps) {
  const styles = {
    default: {
      container: 'border-border bg-surface-muted',
      value: 'text-foreground',
    },
    success: {
      container: 'border-success/20 bg-success-surface',
      value: 'text-success',
    },
    danger: {
      container: 'border-danger/20 bg-danger-surface',
      value: 'text-danger',
    },
  };

  const currentStyles = styles[emphasis];

  return (
    <div
      className={[
        'rounded-md border p-4',
        'transition-shadow duration-200',
        'hover:shadow-sm',
        currentStyles.container,
      ].join(' ')}
    >
      <p className="text-xs font-medium leading-5 text-muted-foreground">
        {label}
      </p>

      <p
        className={[
          'mt-2 text-2xl font-semibold tracking-tight',
          currentStyles.value,
        ].join(' ')}
      >
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export function DashboardVerificationSummary({
  verification,
}: DashboardVerificationSummaryProps) {
  return (
    <section aria-labelledby="dashboard-verification-heading">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="dashboard-verification-heading"
            className="text-sm font-semibold text-foreground"
          >
            Physical Verification
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Verification progress and asset identification discrepancies.
          </p>
        </div>

        <Link
          href="/reports/verifications"
          className={[
            'text-xs font-medium text-primary',
            'transition-colors hover:text-primary-hover',
            'focus:outline-none focus:ring-2 focus:ring-focus-ring',
            'focus:ring-offset-1',
          ].join(' ')}
        >
          View verification report →
        </Link>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Verification status
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <VerificationItem label="Pending" value={verification.pending} />

          <VerificationItem
            label="Verified"
            value={verification.verified}
            emphasis="success"
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Discrepancies
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <VerificationItem
            label="Not Found"
            value={verification.notFound}
            emphasis="danger"
          />

          <VerificationItem
            label="Location Mismatch"
            value={verification.locationMismatch}
            emphasis="danger"
          />

          <VerificationItem
            label="Custodian Mismatch"
            value={verification.custodianMismatch}
            emphasis="danger"
          />

          <VerificationItem
            label="Condition Mismatch"
            value={verification.conditionMismatch}
            emphasis="danger"
          />

          <VerificationItem
            label="Identification Mismatch"
            value={verification.identificationMismatch}
            emphasis="danger"
          />

          <VerificationItem
            label="Multiple Discrepancies"
            value={verification.multipleDiscrepancies}
            emphasis="danger"
          />
        </div>
      </div>
    </section>
  );
}
