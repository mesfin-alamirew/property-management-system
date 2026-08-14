'use client';

import type { Prisma } from '@/generated/prisma/client';

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

type RegionWithCountry = Prisma.RegionGetPayload<{
  include: {
    country: true;
  };
}>;

type RegionTableProps = {
  regions: RegionWithCountry[];

  onEdit: (region: RegionWithCountry) => void;

  onDeactivate: (region: RegionWithCountry) => void;

  deactivatingId?: string | null;
};

export function RegionTable({
  regions,
  onEdit,
  onDeactivate,
  deactivatingId,
}: RegionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>

          <TableHead>Name</TableHead>

          <TableHead>Country</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {regions.map((region) => (
          <TableRow key={region.id}>
            <TableCell>{region.code}</TableCell>

            <TableCell>{region.name}</TableCell>

            <TableCell>{region.country.name}</TableCell>

            <TableCell>
              <StatusBadge active={region.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(region)}
                onDeactivate={() => onDeactivate(region)}
                loading={deactivatingId === region.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
