'use client';

import type { AcquisitionReportRow } from '../types/acquisition.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
type AcquisitionReportTableProps = {
  acquisitions: AcquisitionReportRow[];
};

export function AcquisitionReportTable({
  acquisitions,
}: AcquisitionReportTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Acquisition No.</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Acquisition Method</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Reference No.</TableHead>
          <TableHead>Funding Source</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {acquisitions.map((acquisition) => (
          <TableRow key={acquisition.id}>
            <TableCell className="font-medium">
              <Link
                href={`/reports/acquisitions/${acquisition.id}`}
                className="text-blue-600 hover:underline"
              >
                {acquisition.acquisitionNumber}
              </Link>
            </TableCell>
            <TableCell>{formatDate(acquisition.acquisitionDate)}</TableCell>

            <TableCell>
              {acquisition.acquisitionMethod
                ? `${acquisition.acquisitionMethod.code} - ${acquisition.acquisitionMethod.name}`
                : '-'}
            </TableCell>

            <TableCell>{acquisition.supplierName ?? '-'}</TableCell>

            <TableCell>{acquisition.referenceNumber ?? '-'}</TableCell>

            <TableCell>{acquisition.fundingSource ?? '-'}</TableCell>

            <TableCell>{acquisition.itemCount}</TableCell>

            <TableCell>
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
