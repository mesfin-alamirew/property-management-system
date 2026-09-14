import type { IncidentStatus } from '@/generated/prisma/client';

type WorkflowStatusBadgeProps = {
  status: IncidentStatus;
};

const statusLabels: Record<IncidentStatus, string> = {
  DRAFT: 'Draft',
  REPORTED: 'Reported',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
  CANCELLED: 'Cancelled',
};

const statusClasses: Record<IncidentStatus, string> = {
  DRAFT: 'bg-surface-muted text-muted-foreground',
  REPORTED: 'bg-info-surface text-info',
  ASSIGNED: 'bg-warning-surface text-warning',
  IN_PROGRESS: 'bg-warning-surface text-warning',
  RESOLVED: 'bg-success-surface text-success',
  CLOSED: 'bg-success-surface text-success',
  CANCELLED: 'bg-danger-surface text-danger',
};

export function WorkflowStatusBadge({ status }: WorkflowStatusBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
        statusClasses[status],
      ].join(' ')}
    >
      {statusLabels[status]}
    </span>
  );
}
