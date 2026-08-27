import type { MaintenanceStatus } from '@/generated/prisma/client';

type WorkflowStatusBadgeProps = {
  status: MaintenanceStatus;
};

const statusLabels: Record<MaintenanceStatus, string> = {
  DRAFT: 'Draft',
  REQUESTED: 'Requested',
  APPROVED: 'Approved',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
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
        status === 'IN_PROGRESS' && 'bg-yellow-100 text-yellow-700',
        status === 'COMPLETED' && 'bg-emerald-100 text-emerald-700',
        status === 'CANCELLED' && 'bg-red-100 text-red-700',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {statusLabels[status]}
    </span>
  );
}
