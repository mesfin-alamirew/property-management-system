'use client';

import type { DisposalWithRelations } from '../types/disposal.types';

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

          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {disposals.map((disposal) => (
          <TableRow key={disposal.id}>
            <TableCell className="font-medium">
              {disposal.referenceNumber}
            </TableCell>

            <TableCell>
              {disposal.items.length > 0 ? (
                <div className="space-y-1">
                  {disposal.items.map((item) => (
                    <div key={item.id}>
                      {item.asset.assetCode} - {item.asset.name}
                    </div>
                  ))}
                </div>
              ) : (
                '-'
              )}
            </TableCell>

            <TableCell>{disposal.disposalDate.toLocaleDateString()}</TableCell>

            <TableCell>{disposal.method}</TableCell>

            <TableCell>{disposal.reason ?? '-'}</TableCell>

            <TableCell>
              <WorkflowStatusBadge status={disposal.status} />
            </TableCell>

            <TableCell>
              {disposal.requestedByUser
                ? disposal.requestedByUser.displayName
                : '-'}
            </TableCell>

            <TableCell>
              {disposal.approvedByUser
                ? disposal.approvedByUser.displayName
                : '-'}
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                {disposal.status === 'DRAFT' && (
                  <button
                    type="button"
                    onClick={() => onRequest(disposal)}
                    className="rounded-md border px-3 py-1 text-sm"
                  >
                    Request
                  </button>
                )}
                {disposal.status === 'DRAFT' && (
                  <button
                    type="button"
                    onClick={() => onAddItem(disposal)}
                    className="rounded-md border px-3 py-1 text-sm"
                  >
                    Add Asset
                  </button>
                )}

                {disposal.status === 'REQUESTED' && (
                  <button
                    type="button"
                    onClick={() => onApprove(disposal)}
                    className="rounded-md border px-3 py-1 text-sm"
                  >
                    Approve
                  </button>
                )}

                {(disposal.status === 'DRAFT' ||
                  disposal.status === 'REQUESTED') && (
                  <button
                    type="button"
                    onClick={() => onCancel(disposal)}
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
