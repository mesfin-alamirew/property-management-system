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

import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';

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
  if (retirements.length === 0) {
    return (
      <EmptyState
        title="No retirement records found"
        description="There are no asset retirement requests to display."
        action={
          <Button type="button" onClick={() => undefined}>
            Create Retirement
          </Button>
        }
      />
    );
  }

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
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {retirements.map((retirement) => (
          <TableRow key={retirement.id}>
            <TableCell className="font-medium text-foreground">
              {retirement.referenceNumber}
            </TableCell>

            <TableCell>
              {retirement.asset ? (
                <>
                  <span className="font-medium text-foreground">
                    {retirement.asset.assetCode}
                  </span>{' '}
                  <span className="text-muted-foreground">
                    - {retirement.asset.name}
                  </span>
                </>
              ) : (
                '-'
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {retirement.retirementDate.toLocaleDateString()}
            </TableCell>

            <TableCell className="max-w-xs">
              <span className="line-clamp-2">{retirement.reason}</span>
            </TableCell>

            <TableCell>
              {retirement.condition ? (
                <>
                  <span className="font-medium text-foreground">
                    {retirement.condition.code}
                  </span>{' '}
                  <span className="text-muted-foreground">
                    - {retirement.condition.name}
                  </span>
                </>
              ) : (
                '-'
              )}
            </TableCell>

            <TableCell>
              <WorkflowStatusBadge status={retirement.status} />
            </TableCell>

            <TableCell>
              {retirement.requestedByUser?.displayName ?? '-'}
            </TableCell>

            <TableCell>
              {retirement.approvedByUser?.displayName ?? '-'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                {retirement.status === 'DRAFT' && (
                  <Button
                    type="button"
                    variant="secondary"
                    className="px-3 py-1.5"
                    onClick={() => onRequest(retirement)}
                  >
                    Request
                  </Button>
                )}

                {retirement.status === 'REQUESTED' && (
                  <Button
                    type="button"
                    variant="primary"
                    className="px-3 py-1.5"
                    onClick={() => onApprove(retirement)}
                  >
                    Approve
                  </Button>
                )}

                {(retirement.status === 'DRAFT' ||
                  retirement.status === 'REQUESTED') && (
                  <Button
                    type="button"
                    variant="danger"
                    className="px-3 py-1.5"
                    onClick={() => onCancel(retirement)}
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
