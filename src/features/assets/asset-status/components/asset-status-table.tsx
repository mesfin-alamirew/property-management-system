'use client';

import type { AssetStatusWithRelations } from '../types/asset-status.types';

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

type AssetStatusTableProps = {
  assetStatuses: AssetStatusWithRelations[];

  onEdit: (assetStatus: AssetStatusWithRelations) => void;

  onDeactivate: (assetStatus: AssetStatusWithRelations) => void;

  deactivatingId: string | null;
};

export function AssetStatusTable({
  assetStatuses,
  onEdit,
  onDeactivate,
  deactivatingId,
}: AssetStatusTableProps) {
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
        {assetStatuses.map((assetStatus) => (
          <TableRow key={assetStatus.id}>
            <TableCell>{assetStatus.code}</TableCell>

            <TableCell>{assetStatus.name}</TableCell>

            <TableCell>{assetStatus.description ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={assetStatus.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(assetStatus)}
                onDeactivate={() => onDeactivate(assetStatus)}
                loading={deactivatingId === assetStatus.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
