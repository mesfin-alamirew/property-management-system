'use client';

import type { Prisma } from '@/generated/prisma/client';

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
  if (properties.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        description="There are no property records to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Organization Unit</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Tenure</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {property.propertyCode}
              </div>

              <div className="text-xs text-muted-foreground">
                {property.name}
              </div>
            </TableCell>

            <TableCell>
              <div className="font-medium text-foreground">
                {property.organizationUnit.code}
              </div>

              <div className="text-xs text-muted-foreground">
                {property.organizationUnit.name}
              </div>
            </TableCell>

            <TableCell>
              <div className="font-medium text-foreground">
                {property.propertyType.code}
              </div>

              <div className="text-xs text-muted-foreground">
                {property.propertyType.name}
              </div>
            </TableCell>

            <TableCell>
              {property.propertyCategory ? (
                <>
                  <div className="font-medium text-foreground">
                    {property.propertyCategory.code}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {property.propertyCategory.name}
                  </div>
                </>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              {property.propertyTenure ? (
                <>
                  <div className="font-medium text-foreground">
                    {property.propertyTenure.code}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {property.propertyTenure.name}
                  </div>
                </>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <StatusBadge active={property.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
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
