'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { BuildingType } from '@/generated/prisma/client';

import { ConfirmationDialog } from '@/components/common/confirmation-dialog';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';

import { deactivateBuildingTypeAction } from '../actions/building-type.actions';

import { BuildingTypeTable } from './building-type.table';
import { BuildingTypeDialog } from './building-type.dialog';

type BuildingTypeWorkspaceProps = {
  buildingTypes: BuildingType[];
};

export function BuildingTypeWorkspace({
  buildingTypes,
}: BuildingTypeWorkspaceProps) {
  const router = useRouter();

  const [selectedBuildingType, setSelectedBuildingType] =
    useState<BuildingType | null>(null);

  const [buildingTypeToDeactivate, setBuildingTypeToDeactivate] =
    useState<BuildingType | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedBuildingType(null);
    setIsDialogOpen(true);
  }

  function handleEdit(buildingType: BuildingType) {
    setSelectedBuildingType(buildingType);
    setIsDialogOpen(true);
  }

  function handleDeactivate(buildingType: BuildingType) {
    setBuildingTypeToDeactivate(buildingType);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!buildingTypeToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(buildingTypeToDeactivate.id);

      const result = await deactivateBuildingTypeAction(
        buildingTypeToDeactivate.id,
      );

      if (result.success) {
        toast.success('Building Type deactivated successfully');

        setIsConfirmationOpen(false);
        setBuildingTypeToDeactivate(null);

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
      title="Building Types"
      description="Manage the types of buildings available within properties."
      actions={
        <Button type="button" onClick={handleCreate}>
          Add Building Type
        </Button>
      }
    >
      <BuildingTypeTable
        buildingTypes={buildingTypes}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <BuildingTypeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        buildingType={selectedBuildingType}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Building Type"
        description={
          buildingTypeToDeactivate
            ? `Are you sure you want to deactivate "${buildingTypeToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
