'use client';

import type { AcquisitionItemWithRelations } from '../types/acquisition-item.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { RowActionButtons } from '@/components/common/row-action-buttons';

type AcquisitionItemTableProps = {
  acquisitionItems: AcquisitionItemWithRelations[];

  onEdit: (acquisitionItem: AcquisitionItemWithRelations) => void;
};

export function AcquisitionItemTable({
  acquisitionItems,
  onEdit,
}: AcquisitionItemTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Acquisition Number</TableHead>
          <TableHead>Asset Code</TableHead>
          <TableHead>Asset Name</TableHead>
          <TableHead>Unit Cost</TableHead>
          <TableHead>Total Cost</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {acquisitionItems.map((acquisitionItem) => (
          <TableRow key={acquisitionItem.id}>
            <TableCell className="font-medium">
              {acquisitionItem.acquisition.acquisitionNumber}
            </TableCell>

            <TableCell>{acquisitionItem.asset.assetCode}</TableCell>

            <TableCell>{acquisitionItem.asset.name}</TableCell>

            <TableCell>{acquisitionItem.unitCost?.toString() ?? '-'}</TableCell>

            <TableCell>
              {acquisitionItem.totalCost?.toString() ?? '-'}
            </TableCell>

            <TableCell>
              <RowActionButtons onEdit={() => onEdit(acquisitionItem)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
