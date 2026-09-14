import type { MaintenanceStatus } from '@/generated/prisma/client';

type WorkflowStatusBadgeProps = {
  status: MaintenanceStatus;
};

const statusLabels: Record<MaintenanceStatus, string> = {
  DRAFT: 'Draft',
  REQUESTED: 'Requested',
  ASSIGNED: 'Assigned',
  APPROVED: 'Approved',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const statusClasses: Record<MaintenanceStatus, string> = {
  DRAFT: 'bg-surface-muted text-muted-foreground',
  REQUESTED: 'bg-info-surface text-info',
  ASSIGNED: 'bg-warning-surface text-warning',
  APPROVED: 'bg-success-surface text-success',
  IN_PROGRESS: 'bg-warning-surface text-warning',
  COMPLETED: 'bg-success-surface text-success',
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
