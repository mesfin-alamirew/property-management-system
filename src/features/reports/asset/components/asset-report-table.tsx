'use client';

import type { AssetReportRow } from '../types/asset.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { StatusBadge } from '@/components/common/status-badge';

type AssetReportTableProps = {
  assets: AssetReportRow[];
};

export function AssetReportTable({ assets }: AssetReportTableProps) {
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
