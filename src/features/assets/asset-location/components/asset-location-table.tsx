'use client';

import type { AssetLocationWithRelations } from '../types/asset-location.types';

import { EmptyState } from '@/components/ui/empty-state';
import { RowActionButtons } from '@/components/common/row-action-buttons';
import { StatusBadge } from '@/components/common/status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AssetLocationTableProps = {
  assetLocations: AssetLocationWithRelations[];
  onEdit: (assetLocation: AssetLocationWithRelations) => void;
  onDeactivate: (assetLocation: AssetLocationWithRelations) => void;
  deactivatingId: string | null;
};

export function AssetLocationTable({
  assetLocations,
  onEdit,
  onDeactivate,
  deactivatingId,
}: AssetLocationTableProps) {
  if (assetLocations.length === 0) {
    return (
      <EmptyState
        title="No asset locations"
        description="No asset locations have been created yet."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assetLocations.map((assetLocation) => (
          <TableRow key={assetLocation.id}>
            <TableCell className="font-medium text-muted-foreground">
              {assetLocation.code}
            </TableCell>

            <TableCell className="font-medium">{assetLocation.name}</TableCell>

            <TableCell className="max-w-md text-muted-foreground">
              {assetLocation.description ?? '-'}
            </TableCell>

            <TableCell>
              <StatusBadge active={assetLocation.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons
                onEdit={() => onEdit(assetLocation)}
                onDeactivate={() => onDeactivate(assetLocation)}
                loading={deactivatingId === assetLocation.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
