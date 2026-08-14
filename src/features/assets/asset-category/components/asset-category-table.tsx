'use client';

import type { AssetCategoryWithRelations } from '../types/asset-category.types';

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

type AssetCategoryTableProps = {
  assetCategories: AssetCategoryWithRelations[];

  onEdit: (assetCategory: AssetCategoryWithRelations) => void;

  onDeactivate: (assetCategory: AssetCategoryWithRelations) => void;

  deactivatingId: string | null;
};

export function AssetCategoryTable({
  assetCategories,
  onEdit,
  onDeactivate,
  deactivatingId,
}: AssetCategoryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Parent Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assetCategories.map((assetCategory) => (
          <TableRow key={assetCategory.id}>
            <TableCell>{assetCategory.code}</TableCell>

            <TableCell>{assetCategory.name}</TableCell>

            <TableCell>
              {assetCategory.parent
                ? `${assetCategory.parent.code} - ${assetCategory.parent.name}`
                : '-'}
            </TableCell>

            <TableCell>{assetCategory.description ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={assetCategory.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(assetCategory)}
                onDeactivate={() => onDeactivate(assetCategory)}
                loading={deactivatingId === assetCategory.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
