import type { Country } from '@/generated/prisma/client';

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
  if (countries.length === 0) {
    return (
      <EmptyState
        title="No countries"
        description="No countries have been created yet."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {countries.map((country) => (
          <TableRow key={country.id}>
            <TableCell className="font-medium text-muted-foreground">
              {country.code}
            </TableCell>

            <TableCell className="font-medium">{country.name}</TableCell>

            <TableCell>
              <StatusBadge active={country.isActive} />
            </TableCell>

            <TableCell className="whitespace-nowrap">
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
