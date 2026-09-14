'use client';

import type { IncidentWithRelations } from '../types/incident.types';

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
  if (incidents.length === 0) {
    return (
      <EmptyState
        title="No incidents"
        description="No asset incidents have been recorded yet."
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
          <TableHead>Severity</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Reported By</TableHead>
          <TableHead>Incident Date</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {incidents.map((incident) => (
          <TableRow key={incident.id}>
            <TableCell className="font-medium text-muted-foreground">
              {incident.referenceNumber}
            </TableCell>

            <TableCell className="font-medium">
              {incident.asset
                ? `${incident.asset.assetCode} - ${incident.asset.name}`
                : '-'}
            </TableCell>

            <TableCell>{incident.type}</TableCell>

            <TableCell>{incident.severity}</TableCell>

            <TableCell className="font-medium">{incident.title}</TableCell>

            <TableCell>
              <WorkflowStatusBadge status={incident.status} />
            </TableCell>

            <TableCell>
              {incident.reportedByUser
                ? incident.reportedByUser.displayName
                : '-'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {incident.incidentDate
                ? incident.incidentDate.toLocaleString()
                : '-'}
            </TableCell>

            <TableCell>
              {incident.assignedToUser
                ? incident.assignedToUser.displayName
                : '-'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                {incident.status === 'DRAFT' && (
                  <RowActionButtons onEdit={() => onEdit(incident)} />
                )}

                {incident.status === 'DRAFT' && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => onReport(incident)}
                  >
                    Report
                  </Button>
                )}

                {incident.status === 'REPORTED' && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => onAssign(incident)}
                  >
                    Assign
                  </Button>
                )}

                {incident.status === 'ASSIGNED' && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => onStart(incident)}
                  >
                    Start
                  </Button>
                )}

                {incident.status === 'IN_PROGRESS' && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => onResolve(incident)}
                  >
                    Resolve
                  </Button>
                )}

                {incident.status === 'RESOLVED' && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => onClose(incident)}
                  >
                    Close
                  </Button>
                )}

                {(incident.status === 'DRAFT' ||
                  incident.status === 'REPORTED' ||
                  incident.status === 'ASSIGNED') && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => onCancel(incident)}
                  >
                    Cancel
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
