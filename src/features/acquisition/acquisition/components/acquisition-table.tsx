'use client';

import type { AcquisitionWithRelations } from '../types/acquisition.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { RowActionButtons } from '@/components/common/row-action-buttons';

type AcquisitionTableProps = {
  acquisitions: AcquisitionWithRelations[];

  onEdit: (acquisition: AcquisitionWithRelations) => void;
};

export function AcquisitionTable({
  acquisitions,
  onEdit,
}: AcquisitionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Acquisition Number</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Acquisition Method</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Reference Number</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {acquisitions.map((acquisition) => (
          <TableRow key={acquisition.id}>
            <TableCell className="font-medium">
              {acquisition.acquisitionNumber}
            </TableCell>

            <TableCell>
              {new Date(acquisition.acquisitionDate).toLocaleDateString()}
            </TableCell>

            <TableCell>
              {acquisition.acquisitionMethod
                ? `${acquisition.acquisitionMethod.code} - ${acquisition.acquisitionMethod.name}`
                : '-'}
            </TableCell>

            <TableCell>{acquisition.supplierName ?? '-'}</TableCell>

            <TableCell>{acquisition.referenceNumber ?? '-'}</TableCell>

            <TableCell>{acquisition.totalAmount?.toString() ?? '-'}</TableCell>

            <TableCell>{acquisition.currency ?? '-'}</TableCell>

            <TableCell>{acquisition.items.length}</TableCell>

            <TableCell>
              <RowActionButtons onEdit={() => onEdit(acquisition)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
