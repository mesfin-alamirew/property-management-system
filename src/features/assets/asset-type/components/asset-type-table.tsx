'use client';

import type { AssetTypeWithRelations } from '../types/asset-type.types';

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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Asset Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assetTypes.map((assetType) => (
          <TableRow key={assetType.id}>
            <TableCell>{assetType.code}</TableCell>

            <TableCell>{assetType.name}</TableCell>

            <TableCell>
              {assetType.category
                ? `${assetType.category.code} - ${assetType.category.name}`
                : '-'}
            </TableCell>

            <TableCell>{assetType.description ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={assetType.isActive} />
            </TableCell>

            <TableCell>
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
