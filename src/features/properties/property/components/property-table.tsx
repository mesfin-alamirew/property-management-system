'use client';

import type { Prisma } from '@/generated/prisma/client';

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

type PropertyWithRelations = Prisma.PropertyGetPayload<{
  include: {
    organizationUnit: {
      select: {
        id: true;
        code: true;
        name: true;
      };
    };
    propertyType: {
      select: {
        id: true;
        code: true;
        name: true;
      };
    };
    propertyCategory: {
      select: {
        id: true;
        code: true;
        name: true;
      };
    };
    propertyTenure: {
      select: {
        id: true;
        code: true;
        name: true;
      };
    };
    propertyStatus: {
      select: {
        id: true;
        code: true;
        name: true;
      };
    };
  };
}>;

type PropertyTableProps = {
  properties: PropertyWithRelations[];

  onEdit: (property: PropertyWithRelations) => void;

  onDeactivate: (property: PropertyWithRelations) => void;

  deactivatingId: string | null;
};

export function PropertyTable({
  properties,
  onEdit,
  onDeactivate,
  deactivatingId,
}: PropertyTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Organization Unit</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Tenure</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>{property.propertyCode}</TableCell>
            <TableCell>{property.name}</TableCell>
            <TableCell>{property.organizationUnit.name}</TableCell>
            <TableCell>{property.propertyType.name}</TableCell>
            <TableCell>{property.propertyCategory?.name ?? '-'}</TableCell>
            <TableCell>{property.propertyTenure?.name ?? '-'}</TableCell>
            <TableCell>
              <StatusBadge active={property.isActive} />
            </TableCell>
            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(property)}
                onDeactivate={() => onDeactivate(property)}
                loading={deactivatingId === property.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
