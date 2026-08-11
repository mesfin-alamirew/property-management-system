'use client';

import type { OrganizationUnit } from '@/generated/prisma/client';

type OrganizationUnitWithRelations = OrganizationUnit & {
  country: {
    name: string;
  } | null;

  parent: {
    name: string;
  } | null;
};

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

type OrganizationUnitTableProps = {
  organizationUnits: OrganizationUnitWithRelations[];

  onEdit: (organizationUnit: OrganizationUnit) => void;

  onDeactivate: (organizationUnit: OrganizationUnit) => void;

  deactivatingId: string | null;
};

export function OrganizationUnitTable({
  organizationUnits,
  onEdit,
  onDeactivate,
  deactivatingId,
}: OrganizationUnitTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Parent</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizationUnits.map((organizationUnit) => (
          <TableRow key={organizationUnit.id}>
            <TableCell>{organizationUnit.code}</TableCell>

            <TableCell>{organizationUnit.name}</TableCell>

            <TableCell>{organizationUnit.type}</TableCell>

            <TableCell>{organizationUnit.country?.name ?? '-'}</TableCell>

            <TableCell>{organizationUnit.parent?.name ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={organizationUnit.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(organizationUnit)}
                onDeactivate={() => onDeactivate(organizationUnit)}
                loading={deactivatingId === organizationUnit.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
