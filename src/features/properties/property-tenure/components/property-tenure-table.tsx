'use client';

import type { PropertyTenure } from '@/generated/prisma/client';

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

type PropertyTenureTableProps = {
  propertyTenures: PropertyTenure[];
  onEdit: (propertyTenure: PropertyTenure) => void;
  onDeactivate: (propertyTenure: PropertyTenure) => void;
  deactivatingId: string | null;
};

export function PropertyTenureTable({
  propertyTenures,
  onEdit,
  onDeactivate,
  deactivatingId,
}: PropertyTenureTableProps) {
  if (propertyTenures.length === 0) {
    return (
      <EmptyState
        title="No property tenures found"
        description="There are no property tenures to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property Tenure</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {propertyTenures.map((propertyTenure) => (
          <TableRow key={propertyTenure.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {propertyTenure.code}
              </div>

              <div className="text-xs text-muted-foreground">
                {propertyTenure.name}
              </div>
            </TableCell>

            <TableCell>
              {propertyTenure.description ? (
                <span className="text-sm text-foreground">
                  {propertyTenure.description}
                </span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <StatusBadge active={propertyTenure.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons
                onEdit={() => onEdit(propertyTenure)}
                onDeactivate={() => onDeactivate(propertyTenure)}
                loading={deactivatingId === propertyTenure.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
