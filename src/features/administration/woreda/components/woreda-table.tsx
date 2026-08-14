'use client';

import type { WoredaWithZone } from '../types/woreda.types';

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

type WoredaTableProps = {
  woredas: WoredaWithZone[];

  onEdit: (woreda: WoredaWithZone) => void;

  onDeactivate: (woreda: WoredaWithZone) => void;

  deactivatingId?: string | null;
};

export function WoredaTable({
  woredas,
  onEdit,
  onDeactivate,
  deactivatingId,
}: WoredaTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Zone</TableHead>

          <TableHead>Code</TableHead>

          <TableHead>Name</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {woredas.map((woreda) => (
          <TableRow key={woreda.id}>
            <TableCell>{woreda.zone.name}</TableCell>

            <TableCell>{woreda.code}</TableCell>

            <TableCell>{woreda.name}</TableCell>

            <TableCell>
              <StatusBadge active={woreda.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(woreda)}
                onDeactivate={() => onDeactivate(woreda)}
                loading={deactivatingId === woreda.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
