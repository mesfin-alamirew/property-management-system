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
        <TableRow>
          <TableHead>Acquisition Method</TableHead>
          <TableHead>Acquisitions</TableHead>
          <TableHead>Items</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {methods.map((method) => (
          <TableRow key={method.acquisitionMethodId}>
            <TableCell className="font-medium">
              {method.code} - {method.name}
            </TableCell>

            <TableCell>{method.acquisitionCount}</TableCell>

            <TableCell>{method.itemCount}</TableCell>
          </TableRow>
        ))}

        {methods.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={3}
              className="py-6 text-center text-sm text-gray-500"
            >
              No acquisition method data is available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
