'use client';

import type { AssetLocationWithRelations } from '../types/asset-location.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { StatusBadge } from '@/components/common/status-badge';
import { RowActionButtons } from '@/components/common/row-action-buttons';

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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assetLocations.map((assetLocation) => (
          <TableRow key={assetLocation.id}>
            <TableCell>{assetLocation.code}</TableCell>

            <TableCell>{assetLocation.name}</TableCell>

            <TableCell>{assetLocation.description ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={assetLocation.isActive} />
            </TableCell>

            <TableCell>
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
