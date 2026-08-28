'use client';

import type { MaintenanceWithRelations } from '../types/maintenance.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { RowActionButtons } from '@/components/common/row-action-buttons';
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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {maintenances.map((maintenance) => (
          <TableRow key={maintenance.id}>
            <TableCell className="font-medium">
              {maintenance.referenceNumber}
            </TableCell>

            <TableCell>
              {maintenance.asset
                ? `${maintenance.asset.assetCode} - ${maintenance.asset.name}`
                : '-'}
            </TableCell>

            <TableCell>{maintenance.type}</TableCell>

            <TableCell>{maintenance.title}</TableCell>

            <TableCell>
              <WorkflowStatusBadge status={maintenance.status} />
            </TableCell>

            <TableCell>
              {maintenance.requestedByUser
                ? maintenance.requestedByUser.displayName
                : '-'}
            </TableCell>

            <TableCell>
              {maintenance.scheduledAt
                ? maintenance.scheduledAt.toLocaleString()
                : '-'}
            </TableCell>

            <TableCell>
              {maintenance.assignedToUser
                ? maintenance.assignedToUser.displayName
                : '-'}
            </TableCell>

            <TableCell>
              <RowActionButtons onEdit={() => onEdit(maintenance)} />

              {maintenance.status === 'DRAFT' && (
                <button
                  type="button"
                  onClick={() => onRequest(maintenance)}
                  className="ml-2 rounded-md border px-3 py-1 text-sm"
                >
                  Request
                </button>
              )}

              {maintenance.status === 'ASSIGNED' && (
                <button
                  type="button"
                  onClick={() => onApprove(maintenance)}
                  className="ml-2 rounded-md border px-3 py-1 text-sm"
                >
                  Approve
                </button>
              )}
              {maintenance.status === 'REQUESTED' && (
                <button
                  type="button"
                  onClick={() => onAssign(maintenance)}
                  className="ml-2 rounded-md border px-3 py-1 text-sm"
                >
                  Assign
                </button>
              )}
              {maintenance.status === 'APPROVED' && (
                <button
                  type="button"
                  onClick={() => onStart(maintenance)}
                  className="ml-2 rounded-md border px-3 py-1 text-sm"
                >
                  Start
                </button>
              )}

              {maintenance.status === 'IN_PROGRESS' && (
                <button
                  type="button"
                  onClick={() => onComplete(maintenance)}
                  className="ml-2 rounded-md border px-3 py-1 text-sm"
                >
                  Complete
                </button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
