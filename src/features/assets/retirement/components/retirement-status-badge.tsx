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

export function WorkflowStatusBadge({ status }: WorkflowStatusBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
        status === 'DRAFT' && 'bg-gray-100 text-gray-700',
        status === 'REQUESTED' && 'bg-blue-100 text-blue-700',
        status === 'APPROVED' && 'bg-green-100 text-green-700',
        status === 'CANCELLED' && 'bg-red-100 text-red-700',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {statusLabels[status]}
    </span>
  );
}
