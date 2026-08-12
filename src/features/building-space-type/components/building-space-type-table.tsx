'use client';

import type { BuildingSpaceType } from '@/generated/prisma/client';

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
        {spaceTypes.map((spaceType) => (
          <TableRow key={spaceType.id}>
            <TableCell>{spaceType.code}</TableCell>

            <TableCell>{spaceType.name}</TableCell>

            <TableCell>{spaceType.description ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={spaceType.isActive} />
            </TableCell>

            <TableCell>
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
