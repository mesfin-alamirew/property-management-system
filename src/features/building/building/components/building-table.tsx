'use client';

import type { BuildingWithRelations } from '../types/building.types';

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
  if (buildings.length === 0) {
    return (
      <EmptyState
        title="No buildings found"
        description="There are no building records to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Building</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Year Built</TableHead>
          <TableHead>Floors</TableHead>
          <TableHead>Floor Area (sqm)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {buildings.map((building) => (
          <TableRow key={building.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {building.buildingCode}
              </div>

              <div className="text-xs text-muted-foreground">
                {building.name}
              </div>
            </TableCell>

            <TableCell>
              <div className="font-medium text-foreground">
                {building.property.propertyCode}
              </div>

              <div className="text-xs text-muted-foreground">
                {building.property.name}
              </div>
            </TableCell>

            <TableCell>
              <div className="font-medium text-foreground">
                {building.buildingType.code}
              </div>

              <div className="text-xs text-muted-foreground">
                {building.buildingType.name}
              </div>
            </TableCell>

            <TableCell>
              {building.buildingCondition ? (
                <>
                  <div className="font-medium text-foreground">
                    {building.buildingCondition.code}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {building.buildingCondition.name}
                  </div>
                </>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {building.yearBuilt ?? '—'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {building.numberOfFloors ?? '—'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {building.floorAreaSqm ?? '—'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <StatusBadge active={building.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
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
