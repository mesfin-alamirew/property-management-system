'use client';

import type { IncidentWithRelations } from '../types/incident.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { RowActionButtons } from '@/components/common/row-action-buttons';
import { WorkflowStatusBadge } from './incident-status-badge';

type IncidentTableProps = {
  incidents: IncidentWithRelations[];

  onEdit: (incident: IncidentWithRelations) => void;

  onReport: (incident: IncidentWithRelations) => void;

  onAssign: (incident: IncidentWithRelations) => void;

  onStart: (incident: IncidentWithRelations) => void;

  onResolve: (incident: IncidentWithRelations) => void;

  onClose: (incident: IncidentWithRelations) => void;

  onCancel: (incident: IncidentWithRelations) => void;
};

export function IncidentTable({
  incidents,
  onEdit,
  onReport,
  onAssign,
  onStart,
  onResolve,
  onClose,
  onCancel,
}: IncidentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference Number</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Reported By</TableHead>
          <TableHead>Incident Date</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {incidents.map((incident) => (
          <TableRow key={incident.id}>
            <TableCell className="font-medium">
              {incident.referenceNumber}
            </TableCell>

            <TableCell>
              {incident.asset
                ? `${incident.asset.assetCode} - ${incident.asset.name}`
                : '-'}
            </TableCell>

            <TableCell>{incident.type}</TableCell>

            <TableCell>{incident.severity}</TableCell>

            <TableCell>{incident.title}</TableCell>

            <TableCell>
              <WorkflowStatusBadge status={incident.status} />
            </TableCell>

            <TableCell>
              {incident.reportedByUser
                ? incident.reportedByUser.displayName
                : '-'}
            </TableCell>

            <TableCell>
              {incident.incidentDate
                ? incident.incidentDate.toLocaleString()
                : '-'}
            </TableCell>

            <TableCell>
              {incident.assignedToUser
                ? incident.assignedToUser.displayName
                : '-'}
            </TableCell>

            <TableCell>
              {incident.status === 'DRAFT' && (
                <RowActionButtons onEdit={() => onEdit(incident)} />
              )}

              {incident.status === 'DRAFT' && (
                <button
                  type="button"
                  onClick={() => onReport(incident)}
                  className="ml-2 rounded-md border px-3 py-1 text-sm"
                >
                  Report
                </button>
              )}

              {incident.status === 'REPORTED' && (
                <button
                  type="button"
                  onClick={() => onAssign(incident)}
                  className="ml-2 rounded-md border px-3 py-1 text-sm"
                >
                  Assign
                </button>
              )}

              {incident.status === 'ASSIGNED' && (
                <button
                  type="button"
                  onClick={() => onStart(incident)}
                  className="ml-2 rounded-md border px-3 py-1 text-sm"
                >
                  Start
                </button>
              )}

              {incident.status === 'IN_PROGRESS' && (
                <button
                  type="button"
                  onClick={() => onResolve(incident)}
                  className="ml-2 rounded-md border px-3 py-1 text-sm"
                >
                  Resolve
                </button>
              )}

              {incident.status === 'RESOLVED' && (
                <button
                  type="button"
                  onClick={() => onClose(incident)}
                  className="ml-2 rounded-md border px-3 py-1 text-sm"
                >
                  Close
                </button>
              )}

              {(incident.status === 'DRAFT' ||
                incident.status === 'REPORTED' ||
                incident.status === 'ASSIGNED') && (
                <button
                  type="button"
                  onClick={() => onCancel(incident)}
                  className="ml-2 rounded-md border px-3 py-1 text-sm"
                >
                  Cancel
                </button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
