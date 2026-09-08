'use client';

import type { UserRoleItem } from '../types/role.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';

type RoleUsersTableProps = {
  users: UserRoleItem[];
  onRemove: (user: UserRoleItem) => void;
  removingId: string | null;
  disabled?: boolean;
};

export function RoleUsersTable({
  users,
  onRemove,
  removingId,
  disabled = false,
}: RoleUsersTableProps) {
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
        {users.map((userRole) => (
          <TableRow key={userRole.id}>
            <TableCell>{userRole.username}</TableCell>

            <TableCell>{userRole.displayName}</TableCell>

            <TableCell>{userRole.assignedAt.toLocaleDateString()}</TableCell>

            <TableCell>{userRole.assignedByUsername}</TableCell>

            <TableCell>
              <Button
                variant="danger"
                onClick={() => onRemove(userRole)}
                disabled={disabled || removingId === userRole.id}
              >
                {removingId === userRole.id ? 'Removing...' : 'Remove'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
