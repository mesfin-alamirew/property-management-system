'use client';

import type { OwnershipType } from '@/generated/prisma/client';

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
  if (ownershipTypes.length === 0) {
    return (
      <EmptyState
        title="No ownership types found"
        description="There are no property ownership types to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ownership Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {ownershipTypes.map((ownershipType) => (
          <TableRow key={ownershipType.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {ownershipType.code}
              </div>

              <div className="text-xs text-muted-foreground">
                {ownershipType.name}
              </div>
            </TableCell>

            <TableCell>
              {ownershipType.description ? (
                <span className="text-sm text-foreground">
                  {ownershipType.description}
                </span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <StatusBadge active={ownershipType.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
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
