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
  onDeactivate: (propertyType: PropertyType) => void;
};

export function PropertyTypeTable({
  propertyTypes,
  onEdit,
  onDeactivate,
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

            <TableCell className="space-x-2">
              <Button variant="secondary" onClick={() => onEdit(propertyType)}>
                Edit
              </Button>

              <Button
                variant="danger"
                onClick={() => onDeactivate(propertyType)}
              >
                Deactivate
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
