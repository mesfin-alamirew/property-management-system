import type { DisposalStatus } from '@/generated/prisma/client';

type WorkflowStatusBadgeProps = {
  status: DisposalStatus;
};

const statusLabels: Record<DisposalStatus, string> = {
  DRAFT: 'Draft',
  REQUESTED: 'Requested',
  APPROVED: 'Approved',
  CANCELLED: 'Cancelled',
};

export function WorkflowStatusBadge({ status }: WorkflowStatusBadgeProps) {
  const statusClasses: Record<DisposalStatus, string> = {
    DRAFT: 'bg-surface-muted text-muted-foreground',
    REQUESTED: 'bg-info-surface text-info',
    APPROVED: 'bg-success-surface text-success',
    CANCELLED: 'bg-danger-surface text-danger',
  };

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
