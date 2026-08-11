'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateBuildingAction } from '../actions/building.actions';
import type { BuildingWithRelations } from '../types/building.types';

import { BuildingTable } from './building-table';
import { BuildingDialog } from './building-dialog';

type BuildingWorkspaceProps = {
  buildings: BuildingWithRelations[];

  properties: {
    id: string;
    propertyCode: string;
    name: string;
  }[];

  buildingTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  buildingConditions: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function BuildingWorkspace({
  buildings,
  properties,
  buildingTypes,
  buildingConditions,
}: BuildingWorkspaceProps) {
  const router = useRouter();

  const [selectedBuilding, setSelectedBuilding] =
    useState<BuildingWithRelations | null>(null);

  const [buildingToDeactivate, setBuildingToDeactivate] =
    useState<BuildingWithRelations | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedBuilding(null);
    setIsDialogOpen(true);
  }

  function handleEdit(building: BuildingWithRelations) {
    setSelectedBuilding(building);
    setIsDialogOpen(true);
  }

  function handleDeactivate(building: BuildingWithRelations) {
    setBuildingToDeactivate(building);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!buildingToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(buildingToDeactivate.id);

      const result = await deactivateBuildingAction(buildingToDeactivate.id);

      if (result.success) {
        toast.success('Building deactivated successfully');

        setIsConfirmationOpen(false);
        setBuildingToDeactivate(null);

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
      title="Buildings"
      description="Manage buildings and their related information."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Building
        </button>
      }
    >
      <BuildingTable
        buildings={buildings}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <BuildingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        building={selectedBuilding}
        properties={properties}
        buildingTypes={buildingTypes}
        buildingConditions={buildingConditions}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Building"
        description={
          buildingToDeactivate
            ? `Are you sure you want to deactivate "${buildingToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
