'use client';

import type { AcquisitionSummaryByMethod } from '../types/acquisition.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AcquisitionSummaryMethodTableProps = {
  methods: AcquisitionSummaryByMethod[];
};

export function AcquisitionSummaryMethodTable({
  methods,
}: AcquisitionSummaryMethodTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-surface-muted/60">
          <TableHead className="font-semibold">Acquisition Method</TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Acquisitions
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Items
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {methods.map((method) => (
          <TableRow
            key={method.acquisitionMethodId}
            className="transition-colors hover:bg-surface-muted/50"
          >
            <TableCell className="font-medium">
              {method.code} - {method.name}
            </TableCell>

            <TableCell className="whitespace-nowrap tabular-nums">
              {method.acquisitionCount}
            </TableCell>

            <TableCell className="whitespace-nowrap tabular-nums">
              {method.itemCount}
            </TableCell>
          </TableRow>
        ))}

        {methods.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={3}
              className="px-5 py-4 text-center text-sm text-muted-foreground"
            >
              No acquisition method data is available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
