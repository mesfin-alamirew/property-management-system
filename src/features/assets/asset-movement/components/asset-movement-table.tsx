'use client';

import type { AssetMovementWithRelations } from '../types/asset-movement.types';

import { EmptyState } from '@/components/ui/empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AssetMovementTableProps = {
  assetMovements: AssetMovementWithRelations[];
};

export function AssetMovementTable({
  assetMovements,
}: AssetMovementTableProps) {
  if (assetMovements.length === 0) {
    return (
      <EmptyState
        title="No asset movements"
        description="No asset movements have been recorded yet."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead>From Location</TableHead>
          <TableHead>To Location</TableHead>
          <TableHead>Moved By</TableHead>
          <TableHead>Moved At</TableHead>
          <TableHead>Reason</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assetMovements.map((movement) => (
          <TableRow key={movement.id}>
            <TableCell className="font-medium">
              {movement.asset.assetCode}
              {movement.asset.assetTag ? ` - ${movement.asset.assetTag}` : ''}
              {' - '}
              {movement.asset.name}
            </TableCell>

            <TableCell>
              {movement.fromLocation
                ? `${movement.fromLocation.code} - ${movement.fromLocation.name}`
                : '-'}
            </TableCell>

            <TableCell className="font-medium">
              {movement.toLocation.code} - {movement.toLocation.name}
            </TableCell>

            <TableCell>{movement.movedByUser.displayName}</TableCell>

            <TableCell className="whitespace-nowrap">
              {movement.movedAt.toLocaleDateString()}
            </TableCell>

            <TableCell className="max-w-md text-muted-foreground">
              {movement.reason}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
