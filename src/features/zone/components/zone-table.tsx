'use client';

import type { ZoneWithRegion } from '../types/zone.types';

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

type ZoneTableProps = {
  zones: ZoneWithRegion[];

  onEdit: (zone: ZoneWithRegion) => void;

  onDeactivate: (zone: ZoneWithRegion) => void;

  deactivatingId?: string | null;
};

export function ZoneTable({
  zones,
  onEdit,
  onDeactivate,
  deactivatingId,
}: ZoneTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Region</TableHead>

          <TableHead>Code</TableHead>

          <TableHead>Name</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {zones.map((zone) => (
          <TableRow key={zone.id}>
            <TableCell>{zone.region.name}</TableCell>

            <TableCell>{zone.code}</TableCell>

            <TableCell>{zone.name}</TableCell>

            <TableCell>
              <StatusBadge active={zone.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(zone)}
                onDeactivate={() => onDeactivate(zone)}
                loading={deactivatingId === zone.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
