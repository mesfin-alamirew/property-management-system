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
      <div className="rounded-lg border border-border bg-surface-muted px-5 py-4 text-sm text-muted-foreground">
        No assets are associated with this disposal.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60 hover:bg-surface-muted/60">
            <TableHead className="font-semibold text-foreground">
              Asset Code
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Asset Tag
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Asset Name
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Asset Type
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Status
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Condition
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {assets.map((asset) => (
            <TableRow
              key={asset.id}
              className="transition-colors hover:bg-surface-muted/50"
            >
              <TableCell className="whitespace-nowrap">
                <Link
                  href={`/reports/assets/${asset.id}`}
                  className="font-medium text-primary transition-colors hover:text-primary-hover hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring/20"
                >
                  {asset.assetCode}
                </Link>
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {asset.assetTag ?? '—'}
              </TableCell>

              <TableCell className="text-sm text-foreground">
                {asset.name}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {asset.assetType.name}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {asset.status.name}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {asset.condition.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
