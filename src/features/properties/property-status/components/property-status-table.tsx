'use client';

import type { PropertyStatus } from '@/generated/prisma/client';

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

type PropertyStatusTableProps = {
  propertyStatuses: PropertyStatus[];
  onEdit: (propertyStatus: PropertyStatus) => void;
  onDeactivate: (propertyStatus: PropertyStatus) => void;
  deactivatingId: string | null;
};

export function PropertyStatusTable({
  propertyStatuses,
  onEdit,
  onDeactivate,
  deactivatingId,
}: PropertyStatusTableProps) {
  if (propertyStatuses.length === 0) {
    return (
      <EmptyState
        title="No property statuses found"
        description="There are no property statuses to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property Status</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {propertyStatuses.map((propertyStatus) => (
          <TableRow key={propertyStatus.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {propertyStatus.code}
              </div>

              <div className="text-xs text-muted-foreground">
                {propertyStatus.name}
              </div>
            </TableCell>

            <TableCell>
              {propertyStatus.description ? (
                <span className="text-sm text-foreground">
                  {propertyStatus.description}
                </span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <StatusBadge active={propertyStatus.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons
                onEdit={() => onEdit(propertyStatus)}
                onDeactivate={() => onDeactivate(propertyStatus)}
                loading={deactivatingId === propertyStatus.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
