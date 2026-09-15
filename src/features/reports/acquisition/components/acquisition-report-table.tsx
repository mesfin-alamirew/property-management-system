'use client';

import type { AcquisitionReportRow } from '../types/acquisition.types';

import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AcquisitionReportTableProps = {
  acquisitions: AcquisitionReportRow[];
};

export function AcquisitionReportTable({
  acquisitions,
}: AcquisitionReportTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-surface-muted/60">
          <TableHead className="whitespace-nowrap font-semibold">
            Acquisition No.
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Date
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Acquisition Method
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Supplier
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Reference No.
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Funding Source
          </TableHead>
          <TableHead className="whitespace-nowrap text-right font-semibold">
            Items
          </TableHead>
          <TableHead className="whitespace-nowrap text-right font-semibold">
            Total Amount
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {acquisitions.map((acquisition) => (
          <TableRow
            key={acquisition.id}
            className="transition-colors hover:bg-surface-muted/50"
          >
            <TableCell className="whitespace-nowrap font-medium">
              <Link
                href={`/reports/acquisitions/${acquisition.id}`}
                className="text-primary hover:text-primary-hover hover:underline"
              >
                {acquisition.acquisitionNumber}
              </Link>
            </TableCell>

            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(acquisition.acquisitionDate)}
            </TableCell>

            <TableCell className="min-w-52 text-foreground">
              {acquisition.acquisitionMethod
                ? `${acquisition.acquisitionMethod.code} - ${acquisition.acquisitionMethod.name}`
                : '-'}
            </TableCell>

            <TableCell className="min-w-40 text-foreground">
              {acquisition.supplierName ?? '-'}
            </TableCell>

            <TableCell className="whitespace-nowrap text-foreground">
              {acquisition.referenceNumber ?? '-'}
            </TableCell>

            <TableCell className="min-w-40 text-foreground">
              {acquisition.fundingSource ?? '-'}
            </TableCell>

            <TableCell className="whitespace-nowrap text-right tabular-nums text-foreground">
              {acquisition.itemCount}
            </TableCell>

            <TableCell className="whitespace-nowrap text-right font-medium tabular-nums text-foreground">
              {formatAmount(acquisition.totalAmount, acquisition.currency)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat('en-GB').format(new Date(value));
}

function formatAmount(amount: string | null, currency: string | null) {
  if (!amount) {
    return '-';
  }

  const formattedAmount = Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return currency ? `${currency} ${formattedAmount}` : formattedAmount;
}
