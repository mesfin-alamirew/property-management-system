'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
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
      <div className="rounded-md border p-6 text-center">
        <p className="font-medium">No verification items</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Verification items have not been generated yet.
        </p>
      </div>
    );
  }

  function handleVerify(itemId: string) {
    router.push(`/physical-verifications/${verificationId}/items/${itemId}`);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset Code</TableHead>
          <TableHead>Asset Name</TableHead>
          <TableHead>Asset Tag</TableHead>
          <TableHead>Serial Number</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Result</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              {item.expectedAssetCode}
            </TableCell>

            <TableCell>{item.expectedAssetName}</TableCell>

            <TableCell>{item.expectedAssetTag ?? '-'}</TableCell>

            <TableCell>{item.expectedSerialNumber ?? '-'}</TableCell>

            <TableCell>{item.expectedEmployeeName ?? '-'}</TableCell>

            <TableCell>{item.expectedLocationName ?? '-'}</TableCell>

            <TableCell>{item.expectedConditionName ?? '-'}</TableCell>

            <TableCell>{item.result}</TableCell>

            <TableCell className="text-right">
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
