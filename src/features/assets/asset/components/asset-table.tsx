'use client';

import type { AssetWithRelations } from '../types/asset.types';

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

type AssetTableProps = {
  assets: AssetWithRelations[];

  onEdit: (asset: AssetWithRelations) => void;
};

export function AssetTable({ assets, onEdit }: AssetTableProps) {
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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assets.map((asset) => (
          <TableRow key={asset.id}>
            <TableCell className="font-medium">{asset.assetCode}</TableCell>

            <TableCell>{asset.assetTag ?? '-'}</TableCell>

            <TableCell>{asset.name}</TableCell>

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

            <TableCell>{asset.serialNumber ?? '-'}</TableCell>

            <TableCell>
              <RowActionButtons onEdit={() => onEdit(asset)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
