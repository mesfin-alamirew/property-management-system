'use client';

import type { BuildingType } from '@/generated/prisma/client';

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

type BuildingTypeTableProps = {
  buildingTypes: BuildingType[];
  onEdit: (buildingType: BuildingType) => void;
  onDeactivate: (buildingType: BuildingType) => void;
  deactivatingId: string | null;
};

export function BuildingTypeTable({
  buildingTypes,
  onEdit,
  onDeactivate,
  deactivatingId,
}: BuildingTypeTableProps) {
  if (buildingTypes.length === 0) {
    return (
      <EmptyState
        title="No building types found"
        description="There are no building type records to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Building Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {buildingTypes.map((buildingType) => (
          <TableRow key={buildingType.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {buildingType.code}
              </div>

              <div className="text-xs text-muted-foreground">
                {buildingType.name}
              </div>
            </TableCell>

            <TableCell>
              {buildingType.description ? (
                <span className="text-sm text-foreground">
                  {buildingType.description}
                </span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <StatusBadge active={buildingType.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons
                onEdit={() => onEdit(buildingType)}
                onDeactivate={() => onDeactivate(buildingType)}
                loading={deactivatingId === buildingType.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
