'use client';

import type { AcquisitionItemWithRelations } from '../types/acquisition-item.types';

import { RowActionButtons } from '@/components/common/row-action-buttons';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AcquisitionItemTableProps = {
  acquisitionItems: AcquisitionItemWithRelations[];

  onEdit: (acquisitionItem: AcquisitionItemWithRelations) => void;
};

export function AcquisitionItemTable({
  acquisitionItems,
  onEdit,
}: AcquisitionItemTableProps) {
  if (acquisitionItems.length === 0) {
    return (
      <EmptyState
        title="No acquisition items found"
        description="Add an acquisition item to associate an asset with an acquisition."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Acquisition</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Unit Cost</TableHead>
          <TableHead>Total Cost</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {acquisitionItems.map((acquisitionItem) => (
          <TableRow key={acquisitionItem.id}>
            <TableCell className="whitespace-nowrap font-medium">
              {acquisitionItem.acquisition.acquisitionNumber}
            </TableCell>

            <TableCell>
              <div className="min-w-0">
                <p className="font-medium text-foreground">
                  {acquisitionItem.asset.assetCode}
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {acquisitionItem.asset.name}
                </p>
              </div>
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {acquisitionItem.unitCost?.toString() ?? '—'}
            </TableCell>

            <TableCell className="whitespace-nowrap font-medium">
              {acquisitionItem.totalCost?.toString() ?? '—'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons onEdit={() => onEdit(acquisitionItem)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
