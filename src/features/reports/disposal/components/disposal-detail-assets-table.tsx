import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { DisposalDetailAsset } from '../types/disposal.types';

type DisposalDetailAssetsTableProps = {
  assets: DisposalDetailAsset[];
};

export function DisposalDetailAssetsTable({
  assets,
}: DisposalDetailAssetsTableProps) {
  if (assets.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-6 py-10 text-center">
        <p className="text-sm text-gray-500">
          No assets are associated with this disposal.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset Code</TableHead>
            <TableHead>Asset Tag</TableHead>
            <TableHead>Asset Name</TableHead>
            <TableHead>Asset Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Condition</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>
                <Link
                  href={`/reports/assets/${asset.id}`}
                  className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {asset.assetCode}
                </Link>
              </TableCell>

              <TableCell>{asset.assetTag ?? '—'}</TableCell>

              <TableCell>{asset.name}</TableCell>

              <TableCell>{asset.assetType.name}</TableCell>

              <TableCell>{asset.status.name}</TableCell>

              <TableCell>{asset.condition.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
