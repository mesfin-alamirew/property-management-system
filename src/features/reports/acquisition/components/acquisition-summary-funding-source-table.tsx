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
        <TableRow>
          <TableHead>Funding Source</TableHead>
          <TableHead>Acquisitions</TableHead>
          <TableHead>Items</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {fundingSources.map((fundingSource) => (
          <TableRow key={fundingSource.fundingSource}>
            <TableCell className="font-medium">
              {fundingSource.fundingSource}
            </TableCell>

            <TableCell>{fundingSource.acquisitionCount}</TableCell>

            <TableCell>{fundingSource.itemCount}</TableCell>
          </TableRow>
        ))}

        {fundingSources.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={3}
              className="py-6 text-center text-sm text-gray-500"
            >
              No funding source data is available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
