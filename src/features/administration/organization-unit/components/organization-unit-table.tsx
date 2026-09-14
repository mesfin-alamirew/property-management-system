'use client';

import type { OrganizationUnit } from '@/generated/prisma/client';

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

type OrganizationUnitWithRelations = OrganizationUnit & {
  country: {
    name: string;
  } | null;

  parent: {
    name: string;
  } | null;
};

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
  if (organizationUnits.length === 0) {
    return (
      <EmptyState
        title="No organization units"
        description="No organization units have been created yet."
      />
    );
  }

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
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {organizationUnits.map((organizationUnit) => (
          <TableRow key={organizationUnit.id}>
            <TableCell className="font-medium text-muted-foreground">
              {organizationUnit.code}
            </TableCell>

            <TableCell className="font-medium">
              {organizationUnit.name}
            </TableCell>

            <TableCell>{organizationUnit.type}</TableCell>

            <TableCell>{organizationUnit.country?.name ?? '-'}</TableCell>

            <TableCell>{organizationUnit.parent?.name ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={organizationUnit.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
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
