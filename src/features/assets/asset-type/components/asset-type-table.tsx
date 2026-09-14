'use client';

import type { AssetTypeWithRelations } from '../types/asset-type.types';

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

type AssetTypeTableProps = {
  assetTypes: AssetTypeWithRelations[];
  onEdit: (assetType: AssetTypeWithRelations) => void;
  onDeactivate: (assetType: AssetTypeWithRelations) => void;
  deactivatingId: string | null;
};

export function AssetTypeTable({
  assetTypes,
  onEdit,
  onDeactivate,
  deactivatingId,
}: AssetTypeTableProps) {
  if (assetTypes.length === 0) {
    return (
      <EmptyState
        title="No asset types"
        description="No asset types have been created yet."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Asset Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assetTypes.map((assetType) => (
          <TableRow key={assetType.id}>
            <TableCell className="font-medium text-muted-foreground">
              {assetType.code}
            </TableCell>

            <TableCell className="font-medium">{assetType.name}</TableCell>

            <TableCell>
              {assetType.category
                ? `${assetType.category.code} - ${assetType.category.name}`
                : '-'}
            </TableCell>

            <TableCell className="max-w-md text-muted-foreground">
              {assetType.description ?? '-'}
            </TableCell>

            <TableCell>
              <StatusBadge active={assetType.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons
                onEdit={() => onEdit(assetType)}
                onDeactivate={() => onDeactivate(assetType)}
                loading={deactivatingId === assetType.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
