'use client';

import type { AcquisitionMethodListItem } from '../types/acquisition-method.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { StatusBadge } from '@/components/common/status-badge';
import { RowActionButtons } from '@/components/common/row-action-buttons';

type AcquisitionMethodTableProps = {
  acquisitionMethods: AcquisitionMethodListItem[];

  onEdit: (acquisitionMethod: AcquisitionMethodListItem) => void;

  onDeactivate: (acquisitionMethod: AcquisitionMethodListItem) => void;

  deactivatingId: string | null;
};

export function AcquisitionMethodTable({
  acquisitionMethods,
  onEdit,
  onDeactivate,
  deactivatingId,
}: AcquisitionMethodTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {acquisitionMethods.map((acquisitionMethod) => (
          <TableRow key={acquisitionMethod.id}>
            <TableCell>{acquisitionMethod.code}</TableCell>

            <TableCell>{acquisitionMethod.name}</TableCell>

            <TableCell>{acquisitionMethod.description ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={acquisitionMethod.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(acquisitionMethod)}
                onDeactivate={() => onDeactivate(acquisitionMethod)}
                loading={deactivatingId === acquisitionMethod.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
