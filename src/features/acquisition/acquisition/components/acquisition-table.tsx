'use client';

import { EmptyState } from '@/components/ui/empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RowActionButtons } from '@/components/common/row-action-buttons';

import type { AcquisitionWithRelations } from '../types/acquisition.types';

type AcquisitionTableProps = {
  acquisitions: AcquisitionWithRelations[];
  onEdit: (acquisition: AcquisitionWithRelations) => void;
};

export function AcquisitionTable({
  acquisitions,
  onEdit,
}: AcquisitionTableProps) {
  if (acquisitions.length === 0) {
    return (
      <EmptyState
        title="No acquisitions"
        description="No acquisitions have been registered yet."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Acquisition</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Method</TableHead>
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
            <TableCell>
              <div className="font-medium text-foreground">
                {acquisition.acquisitionNumber}
              </div>

              {acquisition.description && (
                <div className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">
                  {acquisition.description}
                </div>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {new Date(acquisition.acquisitionDate).toLocaleDateString()}
            </TableCell>

            <TableCell>
              {acquisition.acquisitionMethod ? (
                <div>
                  <div className="font-medium text-foreground">
                    {acquisition.acquisitionMethod.name}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {acquisition.acquisitionMethod.code}
                  </div>
                </div>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              {acquisition.supplierName ? (
                acquisition.supplierName
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              {acquisition.referenceNumber ? (
                acquisition.referenceNumber
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap text-right">
              {acquisition.totalAmount?.toString() ?? '—'}
            </TableCell>

            <TableCell>
              {acquisition.currency ?? (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>{acquisition.items.length}</TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons onEdit={() => onEdit(acquisition)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
