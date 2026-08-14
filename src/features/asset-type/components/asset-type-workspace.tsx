'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateAssetTypeAction } from '../actions/asset-type.actions';
import type { AssetTypeWithRelations } from '../types/asset-type.types';

import { AssetTypeTable } from './asset-type-table';
import { AssetTypeDialog } from './asset-type-dialog';

type AssetTypeWorkspaceProps = {
  assetTypes: AssetTypeWithRelations[];

  assetCategories: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AssetTypeWorkspace({
  assetTypes,
  assetCategories,
}: AssetTypeWorkspaceProps) {
  const router = useRouter();

  const [selectedAssetType, setSelectedAssetType] =
    useState<AssetTypeWithRelations | null>(null);

  const [assetTypeToDeactivate, setAssetTypeToDeactivate] =
    useState<AssetTypeWithRelations | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedAssetType(null);
    setIsDialogOpen(true);
  }

  function handleEdit(assetType: AssetTypeWithRelations) {
    setSelectedAssetType(assetType);
    setIsDialogOpen(true);
  }

  function handleDeactivate(assetType: AssetTypeWithRelations) {
    setAssetTypeToDeactivate(assetType);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!assetTypeToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(assetTypeToDeactivate.id);

      const result = await deactivateAssetTypeAction(assetTypeToDeactivate.id);

      if (result.success) {
        toast.success('Asset type deactivated successfully');

        setIsConfirmationOpen(false);
        setAssetTypeToDeactivate(null);

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
      title="Asset Types"
      description="Manage asset types and their asset categories."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Asset Type
        </button>
      }
    >
      <AssetTypeTable
        assetTypes={assetTypes}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <AssetTypeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        assetType={selectedAssetType}
        assetCategories={assetCategories}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Asset Type"
        description={
          assetTypeToDeactivate
            ? `Are you sure you want to deactivate "${assetTypeToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
