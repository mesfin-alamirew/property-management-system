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
      <p className="px-5 py-4 text-sm text-muted-foreground">
        No physical verification history is available for this asset.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-surface-muted/60">
          <TableHead className="whitespace-nowrap font-semibold">
            Verification
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Expected Employee
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Observed Employee
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Expected Location
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Observed Location
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Expected Condition
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Observed Condition
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Result
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Verified By
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Verified Date
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            className="transition-colors hover:bg-surface-muted/50"
          >
            <TableCell className="min-w-48 text-foreground">
              <div className="space-y-1">
                <div className="font-medium">
                  {row.verification.referenceNumber}
                </div>
                <div className="text-xs text-muted-foreground">
                  {row.verification.title}
                </div>
              </div>
            </TableCell>

            <TableCell className="min-w-40 text-foreground">
              {row.expectedEmployeeName ?? '—'}
            </TableCell>

            <TableCell className="min-w-40 text-foreground">
              {row.observedEmployeeName ?? '—'}
            </TableCell>

            <TableCell className="min-w-40 text-foreground">
              {row.expectedLocationName ?? '—'}
            </TableCell>

            <TableCell className="min-w-40 text-foreground">
              {row.observedLocationName ?? '—'}
            </TableCell>

            <TableCell className="min-w-40 text-foreground">
              {row.expectedConditionName ?? '—'}
            </TableCell>

            <TableCell className="min-w-40 text-foreground">
              {row.observedConditionName ?? '—'}
            </TableCell>

            <TableCell className="whitespace-nowrap font-medium text-foreground">
              {row.result}
            </TableCell>

            <TableCell className="whitespace-nowrap text-foreground">
              {row.verifiedByUser?.displayName ?? '—'}
            </TableCell>

            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(row.verifiedAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
