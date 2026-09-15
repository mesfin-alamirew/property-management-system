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
        <TableRow className="bg-surface-muted/60">
          <TableHead className="whitespace-nowrap font-semibold">
            Asset Code
          </TableHead>
          <TableHead className="font-semibold">Asset Name</TableHead>
          <TableHead className="whitespace-nowrap text-right font-semibold">
            Unit Cost
          </TableHead>
          <TableHead className="whitespace-nowrap text-right font-semibold">
            Total Cost
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow
            key={item.id}
            className="transition-colors hover:bg-surface-muted/50"
          >
            <TableCell className="whitespace-nowrap font-medium">
              {item.assetCode}
            </TableCell>

            <TableCell>{item.assetName}</TableCell>

            <TableCell className="whitespace-nowrap text-right tabular-nums">
              {formatAmount(item.unitCost)}
            </TableCell>

            <TableCell className="whitespace-nowrap text-right font-medium tabular-nums">
              {formatAmount(item.totalCost)}
            </TableCell>
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
