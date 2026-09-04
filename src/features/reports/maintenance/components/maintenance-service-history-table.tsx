import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { MaintenanceServiceHistoryRow } from '../types/maintenance.types';

type MaintenanceServiceHistoryTableProps = {
  services: MaintenanceServiceHistoryRow[];
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date));
}

function formatAmount(amount: string | null) {
  return amount ?? '—';
}

export function MaintenanceServiceHistoryTable({
  services,
}: MaintenanceServiceHistoryTableProps) {
  if (services.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No service records have been recorded for this maintenance request.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Service Provider</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Unit Cost</TableHead>
          <TableHead>Total Cost</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>{formatDate(service.serviceDate)}</TableCell>

            <TableCell>{service.description}</TableCell>

            <TableCell>{service.serviceProvider ?? '—'}</TableCell>

            <TableCell>{service.quantity ?? '—'}</TableCell>

            <TableCell>{formatAmount(service.unitCost)}</TableCell>

            <TableCell>{formatAmount(service.totalCost)}</TableCell>

            <TableCell>{service.notes ?? '—'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
