import type { AssetVerificationHistoryRow } from '../types/asset.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AssetVerificationHistoryTableProps = {
  rows: AssetVerificationHistoryRow[];
};

function formatDate(date: Date | null) {
  if (!date) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date));
}

export function AssetVerificationHistoryTable({
  rows,
}: AssetVerificationHistoryTableProps) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No physical verification history is available for this asset.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Verification</TableHead>
          <TableHead>Expected Employee</TableHead>
          <TableHead>Observed Employee</TableHead>
          <TableHead>Expected Location</TableHead>
          <TableHead>Observed Location</TableHead>
          <TableHead>Expected Condition</TableHead>
          <TableHead>Observed Condition</TableHead>
          <TableHead>Result</TableHead>
          <TableHead>Verified By</TableHead>
          <TableHead>Verified Date</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <div>
                <div className="font-medium text-gray-900">
                  {row.verification.referenceNumber}
                </div>
                <div className="text-xs text-gray-500">
                  {row.verification.title}
                </div>
              </div>
            </TableCell>

            <TableCell>{row.expectedEmployeeName ?? '—'}</TableCell>

            <TableCell>{row.observedEmployeeName ?? '—'}</TableCell>

            <TableCell>{row.expectedLocationName ?? '—'}</TableCell>

            <TableCell>{row.observedLocationName ?? '—'}</TableCell>

            <TableCell>{row.expectedConditionName ?? '—'}</TableCell>

            <TableCell>{row.observedConditionName ?? '—'}</TableCell>

            <TableCell>{row.result}</TableCell>

            <TableCell>{row.verifiedByUser?.displayName ?? '—'}</TableCell>

            <TableCell>{formatDate(row.verifiedAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
