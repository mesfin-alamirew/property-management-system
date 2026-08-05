import type { PropertyType } from '@/generated/prisma/client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';

type PropertyTypeTableProps = {
  propertyTypes: PropertyType[];
  onEdit: (propertyType: PropertyType) => void;
};

export function PropertyTypeTable({
  propertyTypes,
  onEdit,
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
              {propertyType.isActive ? 'Active' : 'Inactive'}
            </TableCell>

            <TableCell>
              <Button variant="secondary" onClick={() => onEdit(propertyType)}>
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
