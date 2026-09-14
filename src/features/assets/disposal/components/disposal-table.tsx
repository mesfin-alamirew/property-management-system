'use client';

import type { DisposalWithRelations } from '../types/disposal.types';

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

import { WorkflowStatusBadge } from './disposal-status-badge';

type DisposalTableProps = {
  disposals: DisposalWithRelations[];

  onRequest: (disposal: DisposalWithRelations) => void;

  onApprove: (disposal: DisposalWithRelations) => void;

  onCancel: (disposal: DisposalWithRelations) => void;

  onAddItem: (disposal: DisposalWithRelations) => void;
};

export function DisposalTable({
  disposals,
  onRequest,
  onApprove,
  onCancel,
  onAddItem,
}: DisposalTableProps) {
  if (disposals.length === 0) {
    return (
      <EmptyState
        title="No disposals"
        description="No asset disposal requests have been created yet."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference Number</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Disposal Date</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Requested By</TableHead>
          <TableHead>Approved By</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {disposals.map((disposal) => (
          <TableRow key={disposal.id}>
            <TableCell className="font-medium text-muted-foreground">
              {disposal.referenceNumber}
            </TableCell>

            <TableCell>
              {disposal.items.length > 0 ? (
                <div className="space-y-1">
                  {disposal.items.map((item) => (
                    <div key={item.id} className="whitespace-nowrap">
                      <span className="font-medium">
                        {item.asset.assetCode}
                      </span>{' '}
                      - {item.asset.name}
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {disposal.disposalDate.toLocaleDateString()}
            </TableCell>

            <TableCell>{disposal.method}</TableCell>

            <TableCell className="max-w-md text-muted-foreground">
              {disposal.reason ?? '-'}
            </TableCell>

            <TableCell>
              <WorkflowStatusBadge status={disposal.status} />
            </TableCell>

            <TableCell>
              {disposal.requestedByUser?.displayName ?? '-'}
            </TableCell>

            <TableCell>{disposal.approvedByUser?.displayName ?? '-'}</TableCell>

            <TableCell className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                {disposal.status === 'DRAFT' && (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => onRequest(disposal)}
                    >
                      Request
                    </Button>

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => onAddItem(disposal)}
                    >
                      Add Asset
                    </Button>
                  </>
                )}

                {disposal.status === 'REQUESTED' && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => onApprove(disposal)}
                  >
                    Approve
                  </Button>
                )}

                {(disposal.status === 'DRAFT' ||
                  disposal.status === 'REQUESTED') && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => onCancel(disposal)}
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
