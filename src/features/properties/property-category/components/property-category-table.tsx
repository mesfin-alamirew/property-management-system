'use client';

import type { PropertyCategory } from '@/generated/prisma/client';

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
        {propertyCategories.map((propertyCategory) => (
          <TableRow key={propertyCategory.id}>
            <TableCell>{propertyCategory.code}</TableCell>

            <TableCell>{propertyCategory.name}</TableCell>

            <TableCell>{propertyCategory.description ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={propertyCategory.isActive} />
            </TableCell>

            <TableCell>
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
