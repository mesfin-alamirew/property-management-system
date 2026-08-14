'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateAssetStatusAction } from '../actions/asset-status.actions';
import type { AssetStatusWithRelations } from '../types/asset-status.types';

import { AssetStatusTable } from './asset-status-table';
import { AssetStatusDialog } from './asset-status-dialog';

type AssetStatusWorkspaceProps = {
  assetStatuses: AssetStatusWithRelations[];
};

export function AssetStatusWorkspace({
  assetStatuses,
}: AssetStatusWorkspaceProps) {
  const router = useRouter();

  const [selectedAssetStatus, setSelectedAssetStatus] =
    useState<AssetStatusWithRelations | null>(null);

  const [assetStatusToDeactivate, setAssetStatusToDeactivate] =
    useState<AssetStatusWithRelations | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedAssetStatus(null);
    setIsDialogOpen(true);
  }

  function handleEdit(assetStatus: AssetStatusWithRelations) {
    setSelectedAssetStatus(assetStatus);
    setIsDialogOpen(true);
  }

  function handleDeactivate(assetStatus: AssetStatusWithRelations) {
    setAssetStatusToDeactivate(assetStatus);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!assetStatusToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(assetStatusToDeactivate.id);

      const result = await deactivateAssetStatusAction(
        assetStatusToDeactivate.id,
      );

      if (result.success) {
        toast.success('Asset status deactivated successfully');

        setIsConfirmationOpen(false);
        setAssetStatusToDeactivate(null);

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
      title="Asset Statuses"
      description="Manage asset statuses."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Asset Status
        </button>
      }
    >
      <AssetStatusTable
        assetStatuses={assetStatuses}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <AssetStatusDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        assetStatus={selectedAssetStatus}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Asset Status"
        description={
          assetStatusToDeactivate
            ? `Are you sure you want to deactivate "${assetStatusToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
