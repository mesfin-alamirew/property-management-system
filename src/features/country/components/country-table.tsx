'use client';

import type { Country } from '@/generated/prisma/client';

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

type CountryTableProps = {
  countries: Country[];

  onEdit: (country: Country) => void;

  onDeactivate: (country: Country) => void;

  deactivatingId?: string | null;
};

export function CountryTable({
  countries,
  onEdit,
  onDeactivate,
  deactivatingId,
}: CountryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>

          <TableHead>Name</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {countries.map((country) => (
          <TableRow key={country.id}>
            <TableCell>{country.code}</TableCell>

            <TableCell>{country.name}</TableCell>

            <TableCell>
              <StatusBadge active={country.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(country)}
                onDeactivate={() => onDeactivate(country)}
                loading={deactivatingId === country.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
