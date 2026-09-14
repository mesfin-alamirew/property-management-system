'use client';

import type { AssetConditionWithRelations } from '../types/asset-condition.types';

import { EmptyState } from '@/components/ui/empty-state';
import { RowActionButtons } from '@/components/common/row-action-buttons';
import { StatusBadge } from '@/components/common/status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AssetConditionTableProps = {
  assetConditions: AssetConditionWithRelations[];
  onEdit: (assetCondition: AssetConditionWithRelations) => void;
  onDeactivate: (assetCondition: AssetConditionWithRelations) => void;
  deactivatingId: string | null;
};

export function AssetConditionTable({
  assetConditions,
  onEdit,
  onDeactivate,
  deactivatingId,
}: AssetConditionTableProps) {
  if (assetConditions.length === 0) {
    return (
      <EmptyState
        title="No asset conditions"
        description="No asset conditions have been created yet."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assetConditions.map((assetCondition) => (
          <TableRow key={assetCondition.id}>
            <TableCell className="font-medium text-muted-foreground">
              {assetCondition.code}
            </TableCell>

            <TableCell className="font-medium">{assetCondition.name}</TableCell>

            <TableCell className="max-w-md text-muted-foreground">
              {assetCondition.description ?? '-'}
            </TableCell>

            <TableCell>
              <StatusBadge active={assetCondition.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons
                onEdit={() => onEdit(assetCondition)}
                onDeactivate={() => onDeactivate(assetCondition)}
                loading={deactivatingId === assetCondition.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
