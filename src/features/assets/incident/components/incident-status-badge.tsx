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

export function WorkflowStatusBadge({ status }: WorkflowStatusBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
        status === 'DRAFT' && 'bg-gray-100 text-gray-700',
        status === 'REPORTED' && 'bg-blue-100 text-blue-700',
        status === 'ASSIGNED' && 'bg-purple-100 text-purple-700',
        status === 'IN_PROGRESS' && 'bg-yellow-100 text-yellow-700',
        status === 'RESOLVED' && 'bg-emerald-100 text-emerald-700',
        status === 'CLOSED' && 'bg-green-100 text-green-700',
        status === 'CANCELLED' && 'bg-red-100 text-red-700',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {statusLabels[status]}
    </span>
  );
}
