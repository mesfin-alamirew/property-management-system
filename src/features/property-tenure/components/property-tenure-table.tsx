'use client';

import type { PropertyTenure } from '@/generated/prisma/client';

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
        {propertyTenures.map((propertyTenure) => (
          <TableRow key={propertyTenure.id}>
            <TableCell>{propertyTenure.code}</TableCell>

            <TableCell>{propertyTenure.name}</TableCell>

            <TableCell>{propertyTenure.description ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={propertyTenure.isActive} />
            </TableCell>

            <TableCell>
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
