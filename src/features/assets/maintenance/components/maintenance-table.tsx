'use client';

import type { MaintenanceWithRelations } from '../types/maintenance.types';

import { RowActionButtons } from '@/components/common/row-action-buttons';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { WorkflowStatusBadge } from './maintenance-status-badge';

type MaintenanceTableProps = {
  maintenances: MaintenanceWithRelations[];

  onEdit: (maintenance: MaintenanceWithRelations) => void;
  onRequest: (maintenance: MaintenanceWithRelations) => void;
  onAssign: (maintenance: MaintenanceWithRelations) => void;
  onApprove: (maintenance: MaintenanceWithRelations) => void;
  onStart: (maintenance: MaintenanceWithRelations) => void;
  onComplete: (maintenance: MaintenanceWithRelations) => void;
};

export function MaintenanceTable({
  maintenances,
  onEdit,
  onRequest,
  onAssign,
  onApprove,
  onStart,
  onComplete,
}: MaintenanceTableProps) {
  if (maintenances.length === 0) {
    return (
      <EmptyState
        title="No maintenance records found"
        description="There are no maintenance requests to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference Number</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Requested By</TableHead>
          <TableHead>Scheduled At</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {maintenances.map((maintenance) => (
          <TableRow key={maintenance.id}>
            <TableCell className="font-medium text-foreground">
              {maintenance.referenceNumber}
            </TableCell>

            <TableCell>
              {maintenance.asset ? (
                <>
                  <span className="font-medium text-foreground">
                    {maintenance.asset.assetCode}
                  </span>{' '}
                  <span className="text-muted-foreground">
                    - {maintenance.asset.name}
                  </span>
                </>
              ) : (
                '-'
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {maintenance.type}
            </TableCell>

            <TableCell className="max-w-xs">
              <span className="line-clamp-2">{maintenance.title}</span>
            </TableCell>

            <TableCell>
              <WorkflowStatusBadge status={maintenance.status} />
            </TableCell>

            <TableCell>
              {maintenance.requestedByUser?.displayName ?? '-'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {maintenance.scheduledAt
                ? maintenance.scheduledAt.toLocaleString()
                : '-'}
            </TableCell>

            <TableCell>
              {maintenance.assignedToUser?.displayName ?? '-'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                <RowActionButtons onEdit={() => onEdit(maintenance)} />

                {maintenance.status === 'DRAFT' && (
                  <Button
                    type="button"
                    variant="secondary"
                    className="px-3 py-1.5"
                    onClick={() => onRequest(maintenance)}
                  >
                    Request
                  </Button>
                )}

                {maintenance.status === 'REQUESTED' && (
                  <Button
                    type="button"
                    variant="secondary"
                    className="px-3 py-1.5"
                    onClick={() => onAssign(maintenance)}
                  >
                    Assign
                  </Button>
                )}

                {maintenance.status === 'ASSIGNED' && (
                  <Button
                    type="button"
                    variant="primary"
                    className="px-3 py-1.5"
                    onClick={() => onApprove(maintenance)}
                  >
                    Approve
                  </Button>
                )}

                {maintenance.status === 'APPROVED' && (
                  <Button
                    type="button"
                    variant="primary"
                    className="px-3 py-1.5"
                    onClick={() => onStart(maintenance)}
                  >
                    Start
                  </Button>
                )}

                {maintenance.status === 'IN_PROGRESS' && (
                  <Button
                    type="button"
                    variant="primary"
                    className="px-3 py-1.5"
                    onClick={() => onComplete(maintenance)}
                  >
                    Complete
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
