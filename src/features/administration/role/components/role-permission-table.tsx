'use client';

import type { RolePermissionItem } from '../types/role.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';

type RolePermissionTableProps = {
  permissions: RolePermissionItem[];

  onRemove: (permission: RolePermissionItem) => void;

  removingId: string | null;

  disabled?: boolean;
};

export function RolePermissionTable({
  permissions,
  onRemove,
  removingId,
  disabled = false,
}: RolePermissionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Resource</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {permissions.map((permission) => (
          <TableRow key={permission.id}>
            <TableCell>{permission.code}</TableCell>

            <TableCell>{permission.resource}</TableCell>

            <TableCell>{permission.action}</TableCell>

            <TableCell>{permission.description ?? '-'}</TableCell>

            <TableCell>{permission.isActive ? 'Active' : 'Inactive'}</TableCell>

            <TableCell>
              <Button
                variant="danger"
                onClick={() => onRemove(permission)}
                disabled={disabled || removingId === permission.id}
              >
                {removingId === permission.id ? 'Removing...' : 'Remove'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
