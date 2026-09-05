import Link from 'next/link';
import type { DashboardVerificationSummary } from '../types/dashboard.types';

type DashboardVerificationSummaryProps = {
  verification: DashboardVerificationSummary;
};

type VerificationItemProps = {
  label: string;
  value: number;
  description: string;
};

function VerificationItem({
  label,
  value,
  description,
}: VerificationItemProps) {
  return (
    <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-900">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}

export function DashboardVerificationSummary({
  verification,
}: DashboardVerificationSummaryProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Physical Verification
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Latest verification result for each asset in the current scope.
          </p>
        </div>

        <Link
          href="/reports/verifications"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
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
        />

        <VerificationItem
          label="Not Found"
          value={verification.notFound}
          description="Expected asset not found"
        />

        <VerificationItem
          label="Location Mismatch"
          value={verification.locationMismatch}
          description="Observed location differs"
        />

        <VerificationItem
          label="Custodian Mismatch"
          value={verification.custodianMismatch}
          description="Observed custodian differs"
        />

        <VerificationItem
          label="Condition Mismatch"
          value={verification.conditionMismatch}
          description="Observed condition differs"
        />

        <VerificationItem
          label="Identification Mismatch"
          value={verification.identificationMismatch}
          description="Asset identification differs"
        />

        <VerificationItem
          label="Multiple Discrepancies"
          value={verification.multipleDiscrepancies}
          description="Multiple verification issues"
        />
      </div>
    </div>
  );
}
