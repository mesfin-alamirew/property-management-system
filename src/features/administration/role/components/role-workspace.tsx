'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import {
  deactivateRoleAction,
  activateRoleAction,
} from '../actions/role.actions';
import type { RoleListItem } from '../types/role.types';

import { RoleTable } from './role-table';
import { RoleDialog } from './role-dialog';

type RoleWorkspaceProps = {
  roles: RoleListItem[];
};

export function RoleWorkspace({ roles }: RoleWorkspaceProps) {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<RoleListItem | null>(null);

  const [roleToDeactivate, setRoleToDeactivate] = useState<RoleListItem | null>(
    null,
  );

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [roleToActivate, setRoleToActivate] = useState<RoleListItem | null>(
    null,
  );

  const [isActivationConfirmationOpen, setIsActivationConfirmationOpen] =
    useState(false);

  const [activatingId, setActivatingId] = useState<string | null>(null);

  function handleCreate() {
    setSelectedRole(null);
    setIsDialogOpen(true);
  }

  function handleEdit(role: RoleListItem) {
    setSelectedRole(role);
    setIsDialogOpen(true);
  }

  function handleDeactivate(role: RoleListItem) {
    setRoleToDeactivate(role);
    setIsConfirmationOpen(true);
  }
  function handleActivate(role: RoleListItem) {
    setRoleToActivate(role);
    setIsActivationConfirmationOpen(true);
  }
  async function confirmDeactivate() {
    if (!roleToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(roleToDeactivate.id);

      const result = await deactivateRoleAction(roleToDeactivate.id);

      if (result.success) {
        toast.success('Role deactivated successfully');

        setIsConfirmationOpen(false);
        setRoleToDeactivate(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setDeactivatingId(null);
    }
  }
  async function confirmActivate() {
    if (!roleToActivate) {
      return;
    }

    try {
      setActivatingId(roleToActivate.id);

      const result = await activateRoleAction(roleToActivate.id);

      if (result.success) {
        toast.success('Role activated successfully');

        setIsActivationConfirmationOpen(false);
        setRoleToActivate(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setActivatingId(null);
    }
  }
  return (
    <MasterDataLayout
      title="Roles"
      description="Manage application roles and their lifecycle."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Role
        </button>
      }
    >
      <RoleTable
        roles={roles}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        onActivate={handleActivate}
        deactivatingId={deactivatingId}
        activatingId={activatingId}
      />

      <RoleDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        role={selectedRole}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Role"
        description={
          roleToDeactivate
            ? `Are you sure you want to deactivate "${roleToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
      <ConfirmationDialog
        open={isActivationConfirmationOpen}
        onOpenChange={setIsActivationConfirmationOpen}
        title="Activate Role"
        description={
          roleToActivate
            ? `Are you sure you want to activate "${roleToActivate.name}"?`
            : ''
        }
        confirmLabel="Activate"
        loading={activatingId !== null}
        onConfirm={confirmActivate}
      />
    </MasterDataLayout>
  );
}
