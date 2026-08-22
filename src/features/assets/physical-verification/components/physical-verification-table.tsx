'use client';

import type { PhysicalVerificationWithRelations } from '../types/physical-verification.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type PhysicalVerificationTableProps = {
  physicalVerifications: PhysicalVerificationWithRelations[];
};

export function PhysicalVerificationTable({
  physicalVerifications,
}: PhysicalVerificationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference Number</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Scope</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Organization Unit</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Unregistered</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {physicalVerifications.map((verification) => (
          <TableRow key={verification.id}>
            <TableCell className="font-medium">
              {verification.referenceNumber}
            </TableCell>

            <TableCell>{verification.title}</TableCell>

            <TableCell>{verification.scope}</TableCell>

            <TableCell>{verification.status}</TableCell>

            <TableCell>
              {verification.organizationUnit
                ? `${verification.organizationUnit.code} - ${verification.organizationUnit.name}`
                : '-'}
            </TableCell>

            <TableCell>
              {verification.location
                ? `${verification.location.code} - ${verification.location.name}`
                : '-'}
            </TableCell>

            <TableCell>{verification._count.items}</TableCell>

            <TableCell>
              {verification._count.unregisteredObservations}
            </TableCell>

            <TableCell>{verification.createdByUser.displayName}</TableCell>

            <TableCell>{verification.createdAt.toLocaleDateString()}</TableCell>

            <TableCell>
              <a
                href={`/physical-verifications/${verification.id}`}
                className="text-sm font-medium underline"
              >
                View
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
