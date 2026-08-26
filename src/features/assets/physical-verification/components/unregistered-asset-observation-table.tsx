'use client';

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
      <div className="rounded-md border p-6 text-center">
        <p className="font-medium">No unregistered asset observations</p>

        <p className="mt-1 text-sm text-muted-foreground">
          No unregistered assets have been recorded for this verification.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset Name</TableHead>
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
            <TableCell className="font-medium">
              {observation.observedName}
            </TableCell>

            <TableCell>{observation.observedAssetTag ?? '-'}</TableCell>

            <TableCell>{observation.observedSerialNumber ?? '-'}</TableCell>

            <TableCell>
              {observation.observedLocation
                ? `${observation.observedLocation.code} - ${observation.observedLocation.name}`
                : '-'}
            </TableCell>

            <TableCell>
              {observation.observedCondition
                ? `${observation.observedCondition.code} - ${observation.observedCondition.name}`
                : '-'}
            </TableCell>

            <TableCell>{observation.observedAt.toLocaleDateString()}</TableCell>

            <TableCell>{observation.observedByUser.displayName}</TableCell>

            <TableCell>
              {observation.registeredAsset ? 'Registered' : 'Not Registered'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
