'use client';

import type { BuildingSpaceType } from '@/generated/prisma/client';

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

type BuildingSpaceTypeTableProps = {
  spaceTypes: BuildingSpaceType[];
  onEdit: (spaceType: BuildingSpaceType) => void;
  onDeactivate: (spaceType: BuildingSpaceType) => void;
  deactivatingId: string | null;
};

export function BuildingSpaceTypeTable({
  spaceTypes,
  onEdit,
  onDeactivate,
  deactivatingId,
}: BuildingSpaceTypeTableProps) {
  if (spaceTypes.length === 0) {
    return (
      <EmptyState
        title="No building space types found"
        description="There are no building space type records to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Space Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {spaceTypes.map((spaceType) => (
          <TableRow key={spaceType.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {spaceType.code}
              </div>

              <div className="text-xs text-muted-foreground">
                {spaceType.name}
              </div>
            </TableCell>

            <TableCell>
              {spaceType.description ? (
                <span className="text-sm text-foreground">
                  {spaceType.description}
                </span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <StatusBadge active={spaceType.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons
                onEdit={() => onEdit(spaceType)}
                onDeactivate={() => onDeactivate(spaceType)}
                loading={deactivatingId === spaceType.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
