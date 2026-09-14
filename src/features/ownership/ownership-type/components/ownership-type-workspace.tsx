'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { ConfirmationDialog } from '@/components/common/confirmation-dialog';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';

import { deactivateOwnershipTypeAction } from '../actions/ownership-type.actions';
import type { OwnershipType } from '@/generated/prisma/client';

import { OwnershipTypeTable } from './ownership-type-table';
import { OwnershipTypeDialog } from './ownership-type-dialog';

type OwnershipTypeWorkspaceProps = {
  ownershipTypes: OwnershipType[];
};

export function OwnershipTypeWorkspace({
  ownershipTypes,
}: OwnershipTypeWorkspaceProps) {
  const router = useRouter();

  const [selectedOwnershipType, setSelectedOwnershipType] =
    useState<OwnershipType | null>(null);

  const [ownershipTypeToDeactivate, setOwnershipTypeToDeactivate] =
    useState<OwnershipType | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedOwnershipType(null);
    setIsDialogOpen(true);
  }

  function handleEdit(ownershipType: OwnershipType) {
    setSelectedOwnershipType(ownershipType);
    setIsDialogOpen(true);
  }

  function handleDeactivate(ownershipType: OwnershipType) {
    setOwnershipTypeToDeactivate(ownershipType);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!ownershipTypeToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(ownershipTypeToDeactivate.id);

      const result = await deactivateOwnershipTypeAction(
        ownershipTypeToDeactivate.id,
      );

      if (result.success) {
        toast.success('Ownership Type deactivated successfully');

        setIsConfirmationOpen(false);
        setOwnershipTypeToDeactivate(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setDeactivatingId(null);
    }
  }

  return (
    <MasterDataLayout
      title="Ownership Types"
      description="Manage property ownership types."
      actions={
        <Button type="button" onClick={handleCreate}>
          Add Ownership Type
        </Button>
      }
    >
      <OwnershipTypeTable
        ownershipTypes={ownershipTypes}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <OwnershipTypeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        ownershipType={selectedOwnershipType}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Ownership Type"
        description={
          ownershipTypeToDeactivate
            ? `Are you sure you want to deactivate "${ownershipTypeToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
