'use client';

import type { BuildingSpaceWithRelations } from '../types/building-space.types';

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

type BuildingSpaceTableProps = {
  spaces: BuildingSpaceWithRelations[];

  onEdit: (space: BuildingSpaceWithRelations) => void;

  onDeactivate: (space: BuildingSpaceWithRelations) => void;

  deactivatingId: string | null;
};

export function BuildingSpaceTable({
  spaces,
  onEdit,
  onDeactivate,
  deactivatingId,
}: BuildingSpaceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Building</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Floor</TableHead>
          <TableHead>Area (sqm)</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {spaces.map((space) => (
          <TableRow key={space.id}>
            <TableCell>{space.code}</TableCell>

            <TableCell>{space.name}</TableCell>

            <TableCell>
              {space.building.buildingCode} - {space.building.name}
            </TableCell>

            <TableCell>{space.spaceType.name}</TableCell>

            <TableCell>{space.floorNumber ?? '-'}</TableCell>

            <TableCell>{space.areaSqm?.toString() ?? '-'}</TableCell>

            <TableCell>{space.capacity ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={space.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(space)}
                onDeactivate={() => onDeactivate(space)}
                loading={deactivatingId === space.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
