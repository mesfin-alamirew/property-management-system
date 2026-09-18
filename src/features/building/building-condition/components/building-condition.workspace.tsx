'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { BuildingCondition } from '@/generated/prisma/client';

import { ConfirmationDialog } from '@/components/common/confirmation-dialog';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';

import { deactivateBuildingConditionAction } from '../actions/building-condition.actions';

import { BuildingConditionTable } from './building-condition.table';
import { BuildingConditionDialog } from './building-condition.dialog';

type BuildingConditionWorkspaceProps = {
  buildingConditions: BuildingCondition[];
};

export function BuildingConditionWorkspace({
  buildingConditions,
}: BuildingConditionWorkspaceProps) {
  const router = useRouter();

  const [selectedBuildingCondition, setSelectedBuildingCondition] =
    useState<BuildingCondition | null>(null);

  const [buildingConditionToDeactivate, setBuildingConditionToDeactivate] =
    useState<BuildingCondition | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedBuildingCondition(null);
    setIsDialogOpen(true);
  }

  function handleEdit(buildingCondition: BuildingCondition) {
    setSelectedBuildingCondition(buildingCondition);
    setIsDialogOpen(true);
  }

  function handleDeactivate(buildingCondition: BuildingCondition) {
    setBuildingConditionToDeactivate(buildingCondition);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!buildingConditionToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(buildingConditionToDeactivate.id);

      const result = await deactivateBuildingConditionAction(
        buildingConditionToDeactivate.id,
      );

      if (result.success) {
        toast.success('Building Condition deactivated successfully');

        setIsConfirmationOpen(false);
        setBuildingConditionToDeactivate(null);

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
      title="Building Conditions"
      description="Manage the conditions used to describe buildings."
      actions={
        <Button type="button" onClick={handleCreate}>
          Add Building Condition
        </Button>
      }
    >
      <BuildingConditionTable
        buildingConditions={buildingConditions}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <BuildingConditionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        buildingCondition={selectedBuildingCondition}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Building Condition"
        description={
          buildingConditionToDeactivate
            ? `Are you sure you want to deactivate "${buildingConditionToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
