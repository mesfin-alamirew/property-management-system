'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { BuildingSpaceType } from '@/generated/prisma/client';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateBuildingSpaceTypeAction } from '../actions/building-space-type.actions';

import { BuildingSpaceTypeTable } from './building-space-type-table';
import { BuildingSpaceTypeDialog } from './building-space-type-dialog';

type BuildingSpaceTypeWorkspaceProps = {
  spaceTypes: BuildingSpaceType[];
};

export function BuildingSpaceTypeWorkspace({
  spaceTypes,
}: BuildingSpaceTypeWorkspaceProps) {
  const router = useRouter();

  const [selectedSpaceType, setSelectedSpaceType] =
    useState<BuildingSpaceType | null>(null);

  const [spaceTypeToDeactivate, setSpaceTypeToDeactivate] =
    useState<BuildingSpaceType | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedSpaceType(null);
    setIsDialogOpen(true);
  }

  function handleEdit(spaceType: BuildingSpaceType) {
    setSelectedSpaceType(spaceType);
    setIsDialogOpen(true);
  }

  function handleDeactivate(spaceType: BuildingSpaceType) {
    setSpaceTypeToDeactivate(spaceType);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!spaceTypeToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(spaceTypeToDeactivate.id);

      const result = await deactivateBuildingSpaceTypeAction(
        spaceTypeToDeactivate.id,
      );

      if (result.success) {
        toast.success('Building Space Type deactivated successfully');

        setIsConfirmationOpen(false);
        setSpaceTypeToDeactivate(null);

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
      title="Building Space Types"
      description="Manage the types of spaces available within buildings."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Space Type
        </button>
      }
    >
      <BuildingSpaceTypeTable
        spaceTypes={spaceTypes}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <BuildingSpaceTypeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        spaceType={selectedSpaceType}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Building Space Type"
        description={
          spaceTypeToDeactivate
            ? `Are you sure you want to deactivate "${spaceTypeToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
