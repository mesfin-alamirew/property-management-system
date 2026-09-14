'use client';

import type { OwnershipWithRelations } from '../types/ownership.types';

import { RowActionButtons } from '@/components/common/row-action-buttons';
import { StatusBadge } from '@/components/common/status-badge';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type OwnershipTableProps = {
  ownerships: OwnershipWithRelations[];
  onEdit: (ownership: OwnershipWithRelations) => void;
  onDeactivate: (ownership: OwnershipWithRelations) => void;
  deactivatingId: string | null;
};

export function OwnershipTable({
  ownerships,
  onEdit,
  onDeactivate,
  deactivatingId,
}: OwnershipTableProps) {
  if (ownerships.length === 0) {
    return (
      <EmptyState
        title="No ownership records found"
        description="There are no property ownership records to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Ownership Type</TableHead>
          <TableHead>Ownership Period</TableHead>
          <TableHead>Acquisition</TableHead>
          <TableHead>Legal Information</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {ownerships.map((ownership) => (
          <TableRow key={ownership.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {ownership.property.propertyCode}
              </div>

              <div className="text-xs text-muted-foreground">
                {ownership.property.name}
              </div>
            </TableCell>

            <TableCell>
              <div className="font-medium text-foreground">
                {ownership.ownershipType.code}
              </div>

              <div className="text-xs text-muted-foreground">
                {ownership.ownershipType.name}
              </div>
            </TableCell>

            <TableCell>
              <div className="whitespace-nowrap text-sm text-foreground">
                {new Date(ownership.startDate).toLocaleDateString()}
              </div>

              <div className="text-xs text-muted-foreground">
                {ownership.endDate
                  ? `to ${new Date(ownership.endDate).toLocaleDateString()}`
                  : 'Current'}
              </div>
            </TableCell>

            <TableCell>
              {ownership.acquisitionDate ||
              ownership.acquisitionPrice !== null ||
              ownership.acquisitionCurrency ? (
                <>
                  <div className="whitespace-nowrap text-sm text-foreground">
                    {ownership.acquisitionDate
                      ? new Date(ownership.acquisitionDate).toLocaleDateString()
                      : '—'}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {ownership.acquisitionPrice !== null &&
                    ownership.acquisitionPrice !== undefined
                      ? `${ownership.acquisitionPrice} ${ownership.acquisitionCurrency ?? ''}`.trim()
                      : (ownership.acquisitionCurrency ?? '—')}
                  </div>
                </>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              {ownership.deedNumber || ownership.legalReference ? (
                <>
                  <div className="font-medium text-foreground">
                    {ownership.deedNumber ?? '—'}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {ownership.legalReference ??
                      ownership.registrationAuthority ??
                      '—'}
                  </div>
                </>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <StatusBadge active={ownership.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons
                onEdit={() => onEdit(ownership)}
                onDeactivate={() => onDeactivate(ownership)}
                loading={deactivatingId === ownership.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
