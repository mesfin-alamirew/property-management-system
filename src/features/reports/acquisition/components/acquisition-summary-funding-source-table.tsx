'use client';

import type { AcquisitionSummaryByFundingSource } from '../types/acquisition.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AcquisitionSummaryFundingSourceTableProps = {
  fundingSources: AcquisitionSummaryByFundingSource[];
};

export function AcquisitionSummaryFundingSourceTable({
  fundingSources,
}: AcquisitionSummaryFundingSourceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-surface-muted/60">
          <TableHead className="font-semibold">Funding Source</TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Acquisitions
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Items
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {fundingSources.map((fundingSource) => (
          <TableRow
            key={fundingSource.fundingSource}
            className="transition-colors hover:bg-surface-muted/50"
          >
            <TableCell className="font-medium">
              {fundingSource.fundingSource}
            </TableCell>

            <TableCell className="whitespace-nowrap tabular-nums">
              {fundingSource.acquisitionCount}
            </TableCell>

            <TableCell className="whitespace-nowrap tabular-nums">
              {fundingSource.itemCount}
            </TableCell>
          </TableRow>
        ))}

        {fundingSources.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={3}
              className="px-5 py-4 text-center text-sm text-muted-foreground"
            >
              No funding source data is available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
