'use client';

import type { RoleListItem } from '../types/role.types';
import { useRouter } from 'next/navigation';

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
import { Button } from '@/components/ui/button';

type RoleTableProps = {
  roles: RoleListItem[];
  onEdit: (role: RoleListItem) => void;
  onDeactivate: (role: RoleListItem) => void;
  onActivate: (role: RoleListItem) => void;
  deactivatingId: string | null;
  activatingId: string | null;
};

export function RoleTable({
  roles,
  onEdit,
  onDeactivate,
  onActivate,
  deactivatingId,
  activatingId,
}: RoleTableProps) {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell>{role.code}</TableCell>

            <TableCell>{role.name}</TableCell>

            <TableCell>{role.description ?? '-'}</TableCell>

            <TableCell>
              <StatusBadge active={role.isActive} />
            </TableCell>

            <TableCell>
              <div className="flex gap-2">
                <RowActionButtons
                  onEdit={() => onEdit(role)}
                  onDeactivate={
                    role.isActive && role.code !== 'SYSTEM_ADMIN'
                      ? () => onDeactivate(role)
                      : undefined
                  }
                  loading={
                    deactivatingId === role.id || activatingId === role.id
                  }
                />

                {role.isActive === false && role.code !== 'SYSTEM_ADMIN' && (
                  <Button
                    variant="secondary"
                    onClick={() => onActivate(role)}
                    disabled={
                      deactivatingId === role.id || activatingId === role.id
                    }
                  >
                    {activatingId === role.id ? 'Activating...' : 'Activate'}
                  </Button>
                )}

                <Button
                  variant="secondary"
                  onClick={() =>
                    router.push(`/administration/roles/${role.id}/permissions`)
                  }
                  disabled={
                    deactivatingId === role.id || activatingId === role.id
                  }
                >
                  Permissions
                </Button>

                <Button
                  variant="secondary"
                  onClick={() =>
                    router.push(`/administration/roles/${role.id}/users`)
                  }
                  disabled={
                    deactivatingId === role.id || activatingId === role.id
                  }
                >
                  Users
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
