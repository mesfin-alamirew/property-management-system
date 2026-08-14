'use client';

import type { AssetConditionWithRelations } from '../types/asset-condition.types';

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
        {assetConditions.map((assetCondition) => (
          <TableRow key={assetCondition.id}>
            <TableCell>{assetCondition.code}</TableCell>

            <TableCell>{assetCondition.name}</TableCell>

            <TableCell>{assetCondition.description ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={assetCondition.isActive} />
            </TableCell>

            <TableCell>
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
