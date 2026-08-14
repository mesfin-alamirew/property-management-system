'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateBuildingSpaceAction } from '../actions/building-space.actions';
import type { BuildingSpaceWithRelations } from '../types/building-space.types';

import { BuildingSpaceTable } from './building-space.table';
import { BuildingSpaceDialog } from './building-space.dialog';

type BuildingSpaceWorkspaceProps = {
  spaces: BuildingSpaceWithRelations[];

  buildings: {
    id: string;
    buildingCode: string;
    name: string;
  }[];

  spaceTypes: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function BuildingSpaceWorkspace({
  spaces,
  buildings,
  spaceTypes,
}: BuildingSpaceWorkspaceProps) {
  const router = useRouter();

  const [selectedSpace, setSelectedSpace] =
    useState<BuildingSpaceWithRelations | null>(null);

  const [spaceToDeactivate, setSpaceToDeactivate] =
    useState<BuildingSpaceWithRelations | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedSpace(null);
    setIsDialogOpen(true);
  }

  function handleEdit(space: BuildingSpaceWithRelations) {
    setSelectedSpace(space);
    setIsDialogOpen(true);
  }

  function handleDeactivate(space: BuildingSpaceWithRelations) {
    setSpaceToDeactivate(space);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!spaceToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(spaceToDeactivate.id);

      const result = await deactivateBuildingSpaceAction(spaceToDeactivate.id);

      if (result.success) {
        toast.success('Building Space deactivated successfully');

        setIsConfirmationOpen(false);
        setSpaceToDeactivate(null);

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
      title="Building Spaces"
      description="Manage spaces within buildings."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Building Space
        </button>
      }
    >
      <BuildingSpaceTable
        spaces={spaces}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <BuildingSpaceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        space={selectedSpace}
        buildings={buildings}
        spaceTypes={spaceTypes}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Building Space"
        description={
          spaceToDeactivate
            ? `Are you sure you want to deactivate "${spaceToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
