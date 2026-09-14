'use client';

import type { PropertyCategory } from '@/generated/prisma/client';

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

type PropertyCategoryTableProps = {
  propertyCategories: PropertyCategory[];
  onEdit: (propertyCategory: PropertyCategory) => void;
  onDeactivate: (propertyCategory: PropertyCategory) => void;
  deactivatingId: string | null;
};

export function PropertyCategoryTable({
  propertyCategories,
  onEdit,
  onDeactivate,
  deactivatingId,
}: PropertyCategoryTableProps) {
  if (propertyCategories.length === 0) {
    return (
      <EmptyState
        title="No property categories found"
        description="There are no property categories to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {propertyCategories.map((propertyCategory) => (
          <TableRow key={propertyCategory.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {propertyCategory.code}
              </div>

              <div className="text-xs text-muted-foreground">
                {propertyCategory.name}
              </div>
            </TableCell>

            <TableCell>
              {propertyCategory.description ? (
                <span className="text-sm text-foreground">
                  {propertyCategory.description}
                </span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <StatusBadge active={propertyCategory.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons
                onEdit={() => onEdit(propertyCategory)}
                onDeactivate={() => onDeactivate(propertyCategory)}
                loading={deactivatingId === propertyCategory.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
