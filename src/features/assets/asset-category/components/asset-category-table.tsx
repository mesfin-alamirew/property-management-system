'use client';

import type { AssetCategoryWithRelations } from '../types/asset-category.types';

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
  if (assetCategories.length === 0) {
    return (
      <EmptyState
        title="No asset categories"
        description="No asset categories have been created yet."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Parent Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assetCategories.map((assetCategory) => (
          <TableRow key={assetCategory.id}>
            <TableCell className="font-medium text-muted-foreground">
              {assetCategory.code}
            </TableCell>

            <TableCell className="font-medium">{assetCategory.name}</TableCell>

            <TableCell>
              {assetCategory.parent
                ? `${assetCategory.parent.code} - ${assetCategory.parent.name}`
                : '-'}
            </TableCell>

            <TableCell className="max-w-md text-muted-foreground">
              {assetCategory.description ?? '-'}
            </TableCell>

            <TableCell>
              <StatusBadge active={assetCategory.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
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
