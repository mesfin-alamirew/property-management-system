'use client';

import type { AcquisitionSummaryByCurrency } from '../types/acquisition.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AcquisitionSummaryCurrencyTableProps = {
  currencies: AcquisitionSummaryByCurrency[];
};

export function AcquisitionSummaryCurrencyTable({
  currencies,
}: AcquisitionSummaryCurrencyTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-surface-muted/60">
          <TableHead className="font-semibold">Currency</TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Acquisitions
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Items
          </TableHead>
          <TableHead className="whitespace-nowrap text-right font-semibold">
            Total Amount
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {currencies.map((currency) => (
          <TableRow
            key={currency.currency}
            className="transition-colors hover:bg-surface-muted/50"
          >
            <TableCell className="font-medium">{currency.currency}</TableCell>

            <TableCell className="whitespace-nowrap tabular-nums">
              {currency.acquisitionCount}
            </TableCell>

            <TableCell className="whitespace-nowrap tabular-nums">
              {currency.itemCount}
            </TableCell>

            <TableCell className="whitespace-nowrap text-right font-medium tabular-nums">
              {formatAmount(currency.totalAmount)}
            </TableCell>
          </TableRow>
        ))}

        {currencies.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={4}
              className="px-5 py-4 text-center text-sm text-muted-foreground"
            >
              No currency data is available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function formatAmount(amount: string) {
  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
