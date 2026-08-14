import type { PropertyType } from '@/generated/prisma/client';

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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>

          <TableHead>Name</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {propertyTypes.map((propertyType) => (
          <TableRow key={propertyType.id}>
            <TableCell>{propertyType.code}</TableCell>

            <TableCell>{propertyType.name}</TableCell>

            <TableCell>
              <StatusBadge active={propertyType.isActive} />
            </TableCell>

            <TableCell>
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
