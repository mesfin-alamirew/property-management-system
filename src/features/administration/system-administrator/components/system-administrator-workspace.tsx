'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { removeSystemAdministratorAction } from '../actions/system-administrator.actions';
import type { SystemAdministratorListItem } from '../types/system-administrator.types';

import { SystemAdministratorTable } from './system-administrator-table';
import { SystemAdministratorDialog } from './system-administrator-dialog';

type AssignableUser = {
  id: string;
  username: string;
  displayName: string;
};

type SystemAdministratorWorkspaceProps = {
  administrators: SystemAdministratorListItem[];
  assignableUsers: AssignableUser[];
  canCreate: boolean;
  canDelete: boolean;
};

export function SystemAdministratorWorkspace({
  administrators,
  assignableUsers,
  canCreate,
  canDelete,
}: SystemAdministratorWorkspaceProps) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [administratorToRemove, setAdministratorToRemove] =
    useState<SystemAdministratorListItem | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [removingId, setRemovingId] = useState<string | null>(null);

  function handleCreate() {
    setIsDialogOpen(true);
  }

  function handleRemove(administrator: SystemAdministratorListItem) {
    setAdministratorToRemove(administrator);
    setIsConfirmationOpen(true);
  }

  async function confirmRemove() {
    if (!administratorToRemove) {
      return;
    }

    try {
      setRemovingId(administratorToRemove.id);

      const result = await removeSystemAdministratorAction(
        administratorToRemove.userId,
      );

      if (result.success) {
        toast.success('System Administrator removed successfully');

        setIsConfirmationOpen(false);
        setAdministratorToRemove(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <MasterDataLayout
      title="System Administrators"
      description="Manage users assigned to the System Administrator role."
      actions={
        canCreate ? (
          <Button type="button" variant="primary" onClick={handleCreate}>
            Add System Administrator
          </Button>
        ) : undefined
      }
    >
      <SystemAdministratorTable
        administrators={administrators}
        onRemove={handleRemove}
        removingId={removingId}
        canDelete={canDelete}
      />

      <SystemAdministratorDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        users={assignableUsers}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Remove System Administrator"
        description={
          administratorToRemove
            ? `Are you sure you want to remove "${administratorToRemove.displayName}" from the System Administrator role?`
            : ''
        }
        confirmLabel="Remove"
        loading={removingId !== null}
        onConfirm={confirmRemove}
      />
    </MasterDataLayout>
  );
}
