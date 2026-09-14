'use client';

import type { AssetStatusWithRelations } from '../types/asset-status.types';

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
  if (assetStatuses.length === 0) {
    return (
      <EmptyState
        title="No asset statuses"
        description="No asset statuses have been created yet."
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
        {assetStatuses.map((assetStatus) => (
          <TableRow key={assetStatus.id}>
            <TableCell className="font-medium text-muted-foreground">
              {assetStatus.code}
            </TableCell>

            <TableCell className="font-medium">{assetStatus.name}</TableCell>

            <TableCell className="max-w-md text-muted-foreground">
              {assetStatus.description ?? '-'}
            </TableCell>

            <TableCell>
              <StatusBadge active={assetStatus.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
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
