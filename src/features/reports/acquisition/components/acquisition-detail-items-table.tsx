'use client';

import type { AcquisitionDetailItem } from '../types/acquisition.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AcquisitionDetailItemsTableProps = {
  items: AcquisitionDetailItem[];
};

export function AcquisitionDetailItemsTable({
  items,
}: AcquisitionDetailItemsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset Code</TableHead>
          <TableHead>Asset Name</TableHead>
          <TableHead>Unit Cost</TableHead>
          <TableHead>Total Cost</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.assetCode}</TableCell>

            <TableCell>{item.assetName}</TableCell>

            <TableCell>{formatAmount(item.unitCost)}</TableCell>

            <TableCell>{formatAmount(item.totalCost)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function formatAmount(amount: string | null) {
  if (!amount) {
    return '-';
  }

  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
