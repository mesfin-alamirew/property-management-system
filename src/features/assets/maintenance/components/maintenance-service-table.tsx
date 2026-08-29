'use client';

import type { MaintenanceServiceWithRelations } from '../types/maintenance-service.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { RowActionButtons } from '@/components/common/row-action-buttons';

type MaintenanceServiceTableProps = {
  maintenanceServices: MaintenanceServiceWithRelations[];

  onEdit: (maintenanceService: MaintenanceServiceWithRelations) => void;
};

export function MaintenanceServiceTable({
  maintenanceServices,
  onEdit,
}: MaintenanceServiceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service Date</TableHead>
          <TableHead>Maintenance</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Service Provider</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Unit Cost</TableHead>
          <TableHead>Total Cost</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {maintenanceServices.map((service) => (
          <TableRow key={service.id}>
            <TableCell className="font-medium">
              {service.serviceDate.toLocaleDateString()}
            </TableCell>

            <TableCell className="font-medium">
              {service.maintenance.referenceNumber}
            </TableCell>
            <TableCell>{service.maintenance.title}</TableCell>

            <TableCell>{service.description}</TableCell>

            <TableCell>{service.serviceProvider ?? '-'}</TableCell>

            <TableCell>{service.quantity?.toString() ?? '-'}</TableCell>

            <TableCell>{service.unitCost?.toString() ?? '-'}</TableCell>

            <TableCell>{service.totalCost?.toString() ?? '-'}</TableCell>

            <TableCell>
              <RowActionButtons onEdit={() => onEdit(service)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
