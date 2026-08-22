'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateAssetLocationAction } from '../actions/asset-location.actions';
import type { AssetLocationWithRelations } from '../types/asset-location.types';

import { AssetLocationTable } from './asset-location-table';
import { AssetLocationDialog } from './asset-location-dialog';

type AssetLocationWorkspaceProps = {
  assetLocations: AssetLocationWithRelations[];

  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AssetLocationWorkspace({
  assetLocations,
  organizationUnits,
}: AssetLocationWorkspaceProps) {
  const router = useRouter();

  const [selectedAssetLocation, setSelectedAssetLocation] =
    useState<AssetLocationWithRelations | null>(null);

  const [assetLocationToDeactivate, setAssetLocationToDeactivate] =
    useState<AssetLocationWithRelations | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedAssetLocation(null);
    setIsDialogOpen(true);
  }

  function handleEdit(assetLocation: AssetLocationWithRelations) {
    setSelectedAssetLocation(assetLocation);
    setIsDialogOpen(true);
  }

  function handleDeactivate(assetLocation: AssetLocationWithRelations) {
    setAssetLocationToDeactivate(assetLocation);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!assetLocationToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(assetLocationToDeactivate.id);

      const result = await deactivateAssetLocationAction(
        assetLocationToDeactivate.id,
      );

      if (result.success) {
        toast.success('Asset location deactivated successfully');

        setIsConfirmationOpen(false);
        setAssetLocationToDeactivate(null);

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
      title="Asset Locations"
      description="Manage asset locations."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Asset Location
        </button>
      }
    >
      <AssetLocationTable
        assetLocations={assetLocations}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <AssetLocationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        assetLocation={selectedAssetLocation}
        organizationUnits={organizationUnits}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Asset Location"
        description={
          assetLocationToDeactivate
            ? `Are you sure you want to deactivate "${assetLocationToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
