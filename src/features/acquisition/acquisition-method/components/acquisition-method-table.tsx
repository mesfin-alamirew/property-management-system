'use client';

import type { AcquisitionMethodListItem } from '../types/acquisition-method.types';

import { RowActionButtons } from '@/components/common/row-action-buttons';
import { StatusBadge } from '@/components/common/status-badge';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
  if (acquisitionMethods.length === 0) {
    return (
      <EmptyState
        title="No acquisition methods found"
        description="Add an acquisition method to make it available when registering acquisitions."
      />
    );
  }

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
            <TableCell className="whitespace-nowrap font-medium">
              {acquisitionMethod.code}
            </TableCell>

            <TableCell className="font-medium">
              {acquisitionMethod.name}
            </TableCell>

            <TableCell className="max-w-md">
              <span className="line-clamp-2 text-sm text-muted-foreground">
                {acquisitionMethod.description ?? '—'}
              </span>
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <StatusBadge active={acquisitionMethod.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
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
