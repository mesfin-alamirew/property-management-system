'use client';

import { EmptyState } from '@/components/ui/empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { PhysicalVerificationDetailWithRelations } from '../types/physical-verification.types';

type UnregisteredAssetObservationTableProps = {
  observations: PhysicalVerificationDetailWithRelations['unregisteredObservations'];
};

export function UnregisteredAssetObservationTable({
  observations,
}: UnregisteredAssetObservationTableProps) {
  if (observations.length === 0) {
    return (
      <EmptyState
        title="No unregistered asset observations"
        description="No unregistered assets have been recorded for this verification."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead>Asset Tag</TableHead>
          <TableHead>Serial Number</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Observed At</TableHead>
          <TableHead>Observed By</TableHead>
          <TableHead>Registration Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {observations.map((observation) => (
          <TableRow key={observation.id}>
            <TableCell>
              <div className="font-medium text-foreground">
                {observation.observedName}
              </div>
            </TableCell>

            <TableCell>
              {observation.observedAssetTag ? (
                observation.observedAssetTag
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              {observation.observedSerialNumber ? (
                observation.observedSerialNumber
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              {observation.observedLocation ? (
                <div>
                  <div className="font-medium text-foreground">
                    {observation.observedLocation.name}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {observation.observedLocation.code}
                  </div>
                </div>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              {observation.observedCondition ? (
                <div>
                  <div className="font-medium text-foreground">
                    {observation.observedCondition.name}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {observation.observedCondition.code}
                  </div>
                </div>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {observation.observedAt.toLocaleDateString()}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {observation.observedByUser.displayName}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <span
                className={[
                  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                  observation.registeredAsset
                    ? 'bg-success-surface text-success'
                    : 'bg-warning-surface text-warning',
                ].join(' ')}
              >
                {observation.registeredAsset ? 'Registered' : 'Not Registered'}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
