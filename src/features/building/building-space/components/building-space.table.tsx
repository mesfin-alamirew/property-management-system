'use client';

import type { BuildingSpaceWithRelations } from '../types/building-space.types';

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
  if (spaces.length === 0) {
    return (
      <EmptyState
        title="No building spaces found"
        description="There are no building space records to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Space</TableHead>
          <TableHead>Building</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Floor</TableHead>
          <TableHead>Area (sqm)</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {spaces.map((space) => (
          <TableRow key={space.id}>
            <TableCell>
              <div className="font-medium text-foreground">{space.code}</div>

              <div className="text-xs text-muted-foreground">{space.name}</div>
            </TableCell>

            <TableCell>
              <div className="font-medium text-foreground">
                {space.building.buildingCode}
              </div>

              <div className="text-xs text-muted-foreground">
                {space.building.name}
              </div>
            </TableCell>

            <TableCell>
              <div className="font-medium text-foreground">
                {space.spaceType.code}
              </div>

              <div className="text-xs text-muted-foreground">
                {space.spaceType.name}
              </div>
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {space.floorNumber ?? '—'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {space.areaSqm?.toString() ?? '—'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {space.capacity ?? '—'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <StatusBadge active={space.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
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
