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
      <div className="rounded-lg border border-border bg-surface-muted px-5 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          No service records have been recorded for this maintenance request.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60">
            <TableHead className="font-semibold text-foreground">
              Service Date
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Description
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Service Provider
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Quantity
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Unit Cost
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Total Cost
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Notes
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {services.map((service) => (
            <TableRow
              key={service.id}
              className="transition-colors hover:bg-surface-muted/50"
            >
              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(service.serviceDate)}
              </TableCell>

              <TableCell className="min-w-[180px] text-sm text-foreground">
                {service.description}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {service.serviceProvider ?? '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {service.quantity ?? '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatAmount(service.unitCost)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm font-medium text-foreground">
                {formatAmount(service.totalCost)}
              </TableCell>

              <TableCell className="min-w-[180px] text-sm text-foreground">
                {service.notes ?? '—'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
