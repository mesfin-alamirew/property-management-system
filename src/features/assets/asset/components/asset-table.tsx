'use client';

import type { AssetWithRelations } from '../types/asset.types';

import { EmptyState } from '@/components/ui/empty-state';
import { StatusBadge } from '@/components/common/status-badge';
import { RowActionButtons } from '@/components/common/row-action-buttons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AssetTableProps = {
  assets: AssetWithRelations[];
  onEdit: (asset: AssetWithRelations) => void;
};

export function AssetTable({ assets, onEdit }: AssetTableProps) {
  if (assets.length === 0) {
    return (
      <EmptyState
        title="No assets"
        description="No assets have been registered yet."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset Code</TableHead>
          <TableHead>Asset Tag</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Asset Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Serial Number</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assets.map((asset) => (
          <TableRow key={asset.id}>
            <TableCell className="font-medium text-muted-foreground">
              {asset.assetCode}
            </TableCell>

            <TableCell className="font-medium">
              {asset.assetTag ?? '-'}
            </TableCell>

            <TableCell className="font-medium">{asset.name}</TableCell>

            <TableCell>
              {asset.assetType
                ? `${asset.assetType.code} - ${asset.assetType.name}`
                : '-'}
            </TableCell>

            <TableCell>
              <StatusBadge active={asset.status.code === 'ACTIVE'} />
            </TableCell>

            <TableCell>
              {asset.condition
                ? `${asset.condition.code} - ${asset.condition.name}`
                : '-'}
            </TableCell>

            <TableCell className="text-muted-foreground">
              {asset.serialNumber ?? '-'}
            </TableCell>

            <TableCell className="whitespace-nowrap">
              <RowActionButtons onEdit={() => onEdit(asset)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
