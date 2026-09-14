'use client';

import Link from 'next/link';

import type { PhysicalVerificationWithRelations } from '../types/physical-verification.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';

type PhysicalVerificationTableProps = {
  physicalVerifications: PhysicalVerificationWithRelations[];
};

export function PhysicalVerificationTable({
  physicalVerifications,
}: PhysicalVerificationTableProps) {
  if (physicalVerifications.length === 0) {
    return (
      <EmptyState
        title="No physical verifications found"
        description="There are no physical verification records to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Verification</TableHead>
          <TableHead>Scope</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Organization Unit</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Unregistered</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {physicalVerifications.map((verification) => (
          <TableRow key={verification.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {verification.referenceNumber}
              </div>

              <div className="text-xs text-muted-foreground">
                {verification.title}
              </div>
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <span className="text-sm text-foreground">
                {verification.scope}
              </span>
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <span className="inline-flex items-center rounded-full bg-info-surface px-2 py-1 text-xs font-medium text-info">
                {verification.status}
              </span>
            </TableCell>

            <TableCell>
              {verification.organizationUnit ? (
                <>
                  <div className="font-medium text-foreground">
                    {verification.organizationUnit.code}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {verification.organizationUnit.name}
                  </div>
                </>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              {verification.location ? (
                <>
                  <div className="font-medium text-foreground">
                    {verification.location.code}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {verification.location.name}
                  </div>
                </>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap text-right">
              {verification._count.items}
            </TableCell>

            <TableCell className="whitespace-nowrap text-right">
              {verification._count.unregisteredObservations}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {verification.createdByUser.displayName}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {verification.createdAt.toLocaleDateString()}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <Button asChild variant="secondary">
                <Link href={`/physical-verifications/${verification.id}`}>
                  View
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
