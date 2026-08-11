'use client';

import type { BuildingWithRelations } from '../types/building.types';

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

type BuildingTableProps = {
  buildings: BuildingWithRelations[];

  onEdit: (building: BuildingWithRelations) => void;

  onDeactivate: (building: BuildingWithRelations) => void;

  deactivatingId: string | null;
};

export function BuildingTable({
  buildings,
  onEdit,
  onDeactivate,
  deactivatingId,
}: BuildingTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Floors</TableHead>
          <TableHead>Floor Area (sqm)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {buildings.map((building) => (
          <TableRow key={building.id}>
            <TableCell>{building.buildingCode}</TableCell>

            <TableCell>{building.name}</TableCell>

            <TableCell>
              {building.property.propertyCode} - {building.property.name}
            </TableCell>

            <TableCell>{building.buildingType.name}</TableCell>

            <TableCell>{building.buildingCondition?.name ?? '-'}</TableCell>

            <TableCell>{building.numberOfFloors ?? '-'}</TableCell>

            <TableCell>{building.floorAreaSqm ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={building.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(building)}
                onDeactivate={() => onDeactivate(building)}
                loading={deactivatingId === building.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
