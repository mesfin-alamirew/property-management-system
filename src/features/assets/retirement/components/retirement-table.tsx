'use client';

import type { RetirementWithRelations } from '../types/retirement.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { WorkflowStatusBadge } from './retirement-status-badge';

type RetirementTableProps = {
  retirements: RetirementWithRelations[];
  onRequest: (retirement: RetirementWithRelations) => void;
  onApprove: (retirement: RetirementWithRelations) => void;
  onCancel: (retirement: RetirementWithRelations) => void;
};

export function RetirementTable({
  retirements,
  onRequest,
  onApprove,
  onCancel,
}: RetirementTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference Number</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Retirement Date</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Requested By</TableHead>
          <TableHead>Approved By</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {retirements.map((retirement) => (
          <TableRow key={retirement.id}>
            <TableCell className="font-medium">
              {retirement.referenceNumber}
            </TableCell>

            <TableCell>
              {retirement.asset
                ? `${retirement.asset.assetCode} - ${retirement.asset.name}`
                : '-'}
            </TableCell>

            <TableCell>
              {retirement.retirementDate.toLocaleDateString()}
            </TableCell>

            <TableCell>{retirement.reason}</TableCell>

            <TableCell>
              {retirement.condition
                ? `${retirement.condition.code} - ${retirement.condition.name}`
                : '-'}
            </TableCell>

            <TableCell>
              <WorkflowStatusBadge status={retirement.status} />
            </TableCell>

            <TableCell>
              {retirement.requestedByUser
                ? retirement.requestedByUser.displayName
                : '-'}
            </TableCell>

            <TableCell>
              {retirement.approvedByUser
                ? retirement.approvedByUser.displayName
                : '-'}
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                {retirement.status === 'DRAFT' && (
                  <button
                    type="button"
                    onClick={() => onRequest(retirement)}
                    className="rounded-md border px-3 py-1 text-sm"
                  >
                    Request
                  </button>
                )}

                {retirement.status === 'REQUESTED' && (
                  <button
                    type="button"
                    onClick={() => onApprove(retirement)}
                    className="rounded-md border px-3 py-1 text-sm"
                  >
                    Approve
                  </button>
                )}

                {(retirement.status === 'DRAFT' ||
                  retirement.status === 'REQUESTED') && (
                  <button
                    type="button"
                    onClick={() => onCancel(retirement)}
                    className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
