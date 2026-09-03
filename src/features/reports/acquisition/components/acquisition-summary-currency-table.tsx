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
        <TableRow>
          <TableHead>Currency</TableHead>
          <TableHead>Acquisitions</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {currencies.map((currency) => (
          <TableRow key={currency.currency}>
            <TableCell className="font-medium">{currency.currency}</TableCell>

            <TableCell>{currency.acquisitionCount}</TableCell>

            <TableCell>{currency.itemCount}</TableCell>

            <TableCell>{formatAmount(currency.totalAmount)}</TableCell>
          </TableRow>
        ))}

        {currencies.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={4}
              className="py-6 text-center text-sm text-gray-500"
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
