'use client';

import type { OwnershipType } from '@/generated/prisma/client';

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

type OwnershipTypeTableProps = {
  ownershipTypes: OwnershipType[];

  onEdit: (ownershipType: OwnershipType) => void;

  onDeactivate: (ownershipType: OwnershipType) => void;

  deactivatingId: string | null;
};

export function OwnershipTypeTable({
  ownershipTypes,
  onEdit,
  onDeactivate,
  deactivatingId,
}: OwnershipTypeTableProps) {
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
        {ownershipTypes.map((ownershipType) => (
          <TableRow key={ownershipType.id}>
            <TableCell>{ownershipType.code}</TableCell>

            <TableCell>{ownershipType.name}</TableCell>

            <TableCell>{ownershipType.description ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={ownershipType.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(ownershipType)}
                onDeactivate={() => onDeactivate(ownershipType)}
                loading={deactivatingId === ownershipType.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
