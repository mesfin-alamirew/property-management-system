'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateAssetConditionAction } from '../actions/asset-condition.actions';
import type { AssetConditionWithRelations } from '../types/asset-condition.types';

import { AssetConditionTable } from './asset-condition-table';
import { AssetConditionDialog } from './asset-condition-dialog';

type AssetConditionWorkspaceProps = {
  assetConditions: AssetConditionWithRelations[];
};

export function AssetConditionWorkspace({
  assetConditions,
}: AssetConditionWorkspaceProps) {
  const router = useRouter();

  const [selectedAssetCondition, setSelectedAssetCondition] =
    useState<AssetConditionWithRelations | null>(null);

  const [assetConditionToDeactivate, setAssetConditionToDeactivate] =
    useState<AssetConditionWithRelations | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedAssetCondition(null);
    setIsDialogOpen(true);
  }

  function handleEdit(assetCondition: AssetConditionWithRelations) {
    setSelectedAssetCondition(assetCondition);
    setIsDialogOpen(true);
  }

  function handleDeactivate(assetCondition: AssetConditionWithRelations) {
    setAssetConditionToDeactivate(assetCondition);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!assetConditionToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(assetConditionToDeactivate.id);

      const result = await deactivateAssetConditionAction(
        assetConditionToDeactivate.id,
      );

      if (result.success) {
        toast.success('Asset condition deactivated successfully');

        setIsConfirmationOpen(false);
        setAssetConditionToDeactivate(null);

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
      title="Asset Conditions"
      description="Manage asset conditions."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Asset Condition
        </button>
      }
    >
      <AssetConditionTable
        assetConditions={assetConditions}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <AssetConditionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        assetCondition={selectedAssetCondition}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Asset Condition"
        description={
          assetConditionToDeactivate
            ? `Are you sure you want to deactivate "${assetConditionToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
