'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';

import type { SystemAdministratorListItem } from '../types/system-administrator.types';

type SystemAdministratorTableProps = {
  administrators: SystemAdministratorListItem[];
  onRemove: (administrator: SystemAdministratorListItem) => void;
  removingId: string | null;
  canDelete: boolean;
};

export function SystemAdministratorTable({
  administrators,
  onRemove,
  removingId,
  canDelete,
}: SystemAdministratorTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Display Name</TableHead>
          <TableHead>Assigned At</TableHead>
          <TableHead>Assigned By</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {administrators.map((administrator) => (
          <TableRow key={administrator.id}>
            <TableCell>{administrator.username}</TableCell>

            <TableCell>{administrator.displayName}</TableCell>

            <TableCell>{administrator.assignedAt.toLocaleString()}</TableCell>

            <TableCell>{administrator.assignedByUsername}</TableCell>

            <TableCell>
              {canDelete && (
                <Button
                  variant="danger"
                  onClick={() => onRemove(administrator)}
                  disabled={removingId === administrator.id}
                >
                  {removingId === administrator.id ? 'Removing...' : 'Remove'}
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
