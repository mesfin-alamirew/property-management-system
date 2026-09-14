import type { PropertyType } from '@/generated/prisma/client';

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

type PropertyTypeTableProps = {
  propertyTypes: PropertyType[];
  onEdit: (propertyType: PropertyType) => void;
  onDeactivate: (propertyType: PropertyType) => void;
  deactivatingId: string | null;
};

export function PropertyTypeTable({
  propertyTypes,
  onEdit,
  onDeactivate,
  deactivatingId,
}: PropertyTypeTableProps) {
  if (propertyTypes.length === 0) {
    return (
      <EmptyState
        title="No property types"
        description="No property types have been created yet."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {propertyTypes.map((propertyType) => (
          <TableRow key={propertyType.id}>
            <TableCell className="font-medium text-muted-foreground">
              {propertyType.code}
            </TableCell>

            <TableCell className="font-medium">{propertyType.name}</TableCell>

            <TableCell>
              <StatusBadge active={propertyType.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons
                onEdit={() => onEdit(propertyType)}
                onDeactivate={() => onDeactivate(propertyType)}
                loading={deactivatingId === propertyType.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
