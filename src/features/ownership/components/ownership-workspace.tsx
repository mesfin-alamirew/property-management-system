'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateOwnershipAction } from '../actions/ownership.actions';
import type { OwnershipWithRelations } from '../types/ownership.types';

import { OwnershipTable } from './ownership-table';
import { OwnershipDialog } from './ownership-dialog';

type OwnershipWorkspaceProps = {
  ownerships: OwnershipWithRelations[];

  properties: {
    id: string;
    propertyCode: string;
    name: string;
  }[];

  ownershipTypes: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function OwnershipWorkspace({
  ownerships,
  properties,
  ownershipTypes,
}: OwnershipWorkspaceProps) {
  const router = useRouter();

  const [selectedOwnership, setSelectedOwnership] =
    useState<OwnershipWithRelations | null>(null);

  const [ownershipToDeactivate, setOwnershipToDeactivate] =
    useState<OwnershipWithRelations | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedOwnership(null);
    setIsDialogOpen(true);
  }

  function handleEdit(ownership: OwnershipWithRelations) {
    setSelectedOwnership(ownership);
    setIsDialogOpen(true);
  }

  function handleDeactivate(ownership: OwnershipWithRelations) {
    setOwnershipToDeactivate(ownership);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!ownershipToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(ownershipToDeactivate.id);

      const result = await deactivateOwnershipAction(ownershipToDeactivate.id);

      if (result.success) {
        toast.success('Ownership deactivated successfully');

        setIsConfirmationOpen(false);
        setOwnershipToDeactivate(null);

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
      title="Ownership"
      description="Manage property ownership records."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Ownership
        </button>
      }
    >
      <OwnershipTable
        ownerships={ownerships}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <OwnershipDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        ownership={selectedOwnership}
        properties={properties}
        ownershipTypes={ownershipTypes}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Ownership"
        description={
          ownershipToDeactivate
            ? `Are you sure you want to deactivate the ownership record for "${ownershipToDeactivate.property.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
