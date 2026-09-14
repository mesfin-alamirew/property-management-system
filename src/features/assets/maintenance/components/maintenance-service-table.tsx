'use client';

import type { MaintenanceServiceWithRelations } from '../types/maintenance-service.types';

import { RowActionButtons } from '@/components/common/row-action-buttons';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type MaintenanceServiceTableProps = {
  maintenanceServices: MaintenanceServiceWithRelations[];

  onEdit: (maintenanceService: MaintenanceServiceWithRelations) => void;
};

export function MaintenanceServiceTable({
  maintenanceServices,
  onEdit,
}: MaintenanceServiceTableProps) {
  if (maintenanceServices.length === 0) {
    return (
      <EmptyState
        title="No maintenance services found"
        description="There are no maintenance service records to display."
      />
    );
  }

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
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {maintenanceServices.map((service) => (
          <TableRow key={service.id}>
            <TableCell className="whitespace-nowrap font-medium text-foreground">
              {service.serviceDate.toLocaleDateString()}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <span className="font-medium text-foreground">
                {service.maintenance.referenceNumber}
              </span>
            </TableCell>

            <TableCell className="max-w-xs">
              <span className="line-clamp-2">{service.maintenance.title}</span>
            </TableCell>

            <TableCell className="max-w-sm">
              <span className="line-clamp-2">{service.description || '-'}</span>
            </TableCell>

            <TableCell>{service.serviceProvider ?? '-'}</TableCell>

            <TableCell className="whitespace-nowrap">
              {service.quantity?.toString() ?? '-'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {service.unitCost?.toString() ?? '-'}
            </TableCell>

            <TableCell className="whitespace-nowrap font-medium">
              {service.totalCost?.toString() ?? '-'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons onEdit={() => onEdit(service)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
