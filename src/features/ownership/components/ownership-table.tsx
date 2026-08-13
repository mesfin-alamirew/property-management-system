'use client';

import type { OwnershipWithRelations } from '../types/ownership.types';

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

type OwnershipTableProps = {
  ownerships: OwnershipWithRelations[];

  onEdit: (ownership: OwnershipWithRelations) => void;

  onDeactivate: (ownership: OwnershipWithRelations) => void;

  deactivatingId: string | null;
};

export function OwnershipTable({
  ownerships,
  onEdit,
  onDeactivate,
  deactivatingId,
}: OwnershipTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Ownership Type</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Acquisition Date</TableHead>
          <TableHead>Acquisition Price</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Deed Number</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {ownerships.map((ownership) => (
          <TableRow key={ownership.id}>
            <TableCell>
              {ownership.property.propertyCode} - {ownership.property.name}
            </TableCell>

            <TableCell>
              {ownership.ownershipType.code} - {ownership.ownershipType.name}
            </TableCell>

            <TableCell>
              {new Date(ownership.startDate).toLocaleDateString()}
            </TableCell>

            <TableCell>
              {ownership.endDate
                ? new Date(ownership.endDate).toLocaleDateString()
                : '-'}
            </TableCell>

            <TableCell>
              {ownership.acquisitionDate
                ? new Date(ownership.acquisitionDate).toLocaleDateString()
                : '-'}
            </TableCell>

            <TableCell>{ownership.acquisitionPrice ?? '-'}</TableCell>

            <TableCell>{ownership.acquisitionCurrency ?? '-'}</TableCell>

            <TableCell>{ownership.deedNumber ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={ownership.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(ownership)}
                onDeactivate={() => onDeactivate(ownership)}
                loading={deactivatingId === ownership.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
