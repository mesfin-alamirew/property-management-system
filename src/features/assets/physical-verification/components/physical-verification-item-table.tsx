'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { PhysicalVerificationItemWithRelations } from '../types/physical-verification.types';

type PhysicalVerificationItemTableProps = {
  items: PhysicalVerificationItemWithRelations[];
  verificationId: string;
};

export function PhysicalVerificationItemTable({
  items,
  verificationId,
}: PhysicalVerificationItemTableProps) {
  const router = useRouter();

  if (items.length === 0) {
    return (
      <EmptyState
        title="No verification items"
        description="Verification items have not been generated yet."
      />
    );
  }

  function handleVerify(itemId: string) {
    router.push(`/physical-verifications/${verificationId}/items/${itemId}`);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead>Asset Tag</TableHead>
          <TableHead>Serial Number</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Result</TableHead>
          <TableHead className="whitespace-nowrap">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {item.expectedAssetCode}
              </div>

              <div className="text-xs text-muted-foreground">
                {item.expectedAssetName}
              </div>
            </TableCell>

            <TableCell>
              {item.expectedAssetTag ? (
                item.expectedAssetTag
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              {item.expectedSerialNumber ? (
                item.expectedSerialNumber
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              {item.expectedEmployeeName ? (
                item.expectedEmployeeName
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              {item.expectedLocationName ? (
                item.expectedLocationName
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              {item.expectedConditionName ? (
                item.expectedConditionName
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <span
                className={[
                  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                  item.result === 'PENDING'
                    ? 'bg-warning-surface text-warning'
                    : 'bg-success-surface text-success',
                ].join(' ')}
              >
                {item.result}
              </span>
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleVerify(item.id)}
              >
                {item.result === 'PENDING' ? 'Verify' : 'Review'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
