import type { RetirementStatus } from '@/generated/prisma/client';

type WorkflowStatusBadgeProps = {
  status: RetirementStatus;
};

const statusLabels: Record<RetirementStatus, string> = {
  DRAFT: 'Draft',
  REQUESTED: 'Requested',
  APPROVED: 'Approved',
  CANCELLED: 'Cancelled',
};

const statusClasses: Record<RetirementStatus, string> = {
  DRAFT: 'bg-surface-muted text-muted-foreground',
  REQUESTED: 'bg-info-surface text-info',
  APPROVED: 'bg-success-surface text-success',
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
