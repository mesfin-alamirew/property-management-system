'use client';

import type { PropertyStatus } from '@/generated/prisma/client';

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
        {propertyStatuses.map((propertyStatus) => (
          <TableRow key={propertyStatus.id}>
            <TableCell>{propertyStatus.code}</TableCell>

            <TableCell>{propertyStatus.name}</TableCell>

            <TableCell>{propertyStatus.description ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={propertyStatus.isActive} />
            </TableCell>

            <TableCell>
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
