'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateAssetCategoryAction } from '../actions/asset-category.actions';
import type { AssetCategoryWithRelations } from '../types/asset-category.types';

import { AssetCategoryTable } from './asset-category-table';
import { AssetCategoryDialog } from './asset-category-dialog';

type AssetCategoryWorkspaceProps = {
  assetCategories: AssetCategoryWithRelations[];

  parentCategories: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AssetCategoryWorkspace({
  assetCategories,
  parentCategories,
}: AssetCategoryWorkspaceProps) {
  const router = useRouter();

  const [selectedAssetCategory, setSelectedAssetCategory] =
    useState<AssetCategoryWithRelations | null>(null);

  const [assetCategoryToDeactivate, setAssetCategoryToDeactivate] =
    useState<AssetCategoryWithRelations | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedAssetCategory(null);
    setIsDialogOpen(true);
  }

  function handleEdit(assetCategory: AssetCategoryWithRelations) {
    setSelectedAssetCategory(assetCategory);
    setIsDialogOpen(true);
  }

  function handleDeactivate(assetCategory: AssetCategoryWithRelations) {
    setAssetCategoryToDeactivate(assetCategory);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!assetCategoryToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(assetCategoryToDeactivate.id);

      const result = await deactivateAssetCategoryAction(
        assetCategoryToDeactivate.id,
      );

      if (result.success) {
        toast.success('Asset category deactivated successfully');

        setIsConfirmationOpen(false);
        setAssetCategoryToDeactivate(null);

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
      title="Asset Categories"
      description="Manage asset categories and their hierarchy."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Asset Category
        </button>
      }
    >
      <AssetCategoryTable
        assetCategories={assetCategories}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <AssetCategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        assetCategory={selectedAssetCategory}
        parentCategories={parentCategories}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Asset Category"
        description={
          assetCategoryToDeactivate
            ? `Are you sure you want to deactivate "${assetCategoryToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
