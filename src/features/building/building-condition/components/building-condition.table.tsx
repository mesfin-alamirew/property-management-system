'use client';

import type { BuildingCondition } from '@/generated/prisma/client';

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

type BuildingConditionTableProps = {
  buildingConditions: BuildingCondition[];
  onEdit: (buildingCondition: BuildingCondition) => void;
  onDeactivate: (buildingCondition: BuildingCondition) => void;
  deactivatingId: string | null;
};

export function BuildingConditionTable({
  buildingConditions,
  onEdit,
  onDeactivate,
  deactivatingId,
}: BuildingConditionTableProps) {
  if (buildingConditions.length === 0) {
    return (
      <EmptyState
        title="No building conditions found"
        description="There are no building condition records to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Building Condition</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {buildingConditions.map((buildingCondition) => (
          <TableRow key={buildingCondition.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {buildingCondition.code}
              </div>

              <div className="text-xs text-muted-foreground">
                {buildingCondition.name}
              </div>
            </TableCell>

            <TableCell>
              {buildingCondition.description ? (
                <span className="text-sm text-foreground">
                  {buildingCondition.description}
                </span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <StatusBadge active={buildingCondition.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons
                onEdit={() => onEdit(buildingCondition)}
                onDeactivate={() => onDeactivate(buildingCondition)}
                loading={deactivatingId === buildingCondition.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
