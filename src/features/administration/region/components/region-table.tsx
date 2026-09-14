import type { Prisma } from '@/generated/prisma/client';

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
  if (regions.length === 0) {
    return (
      <EmptyState
        title="No regions"
        description="No regions have been created yet."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {regions.map((region) => (
          <TableRow key={region.id}>
            <TableCell className="font-medium text-muted-foreground">
              {region.code}
            </TableCell>

            <TableCell className="font-medium">{region.name}</TableCell>

            <TableCell>{region.country.name}</TableCell>

            <TableCell>
              <StatusBadge active={region.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
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
