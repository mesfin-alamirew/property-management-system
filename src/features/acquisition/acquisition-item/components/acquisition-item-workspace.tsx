'use client';

import { useState } from 'react';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import type { AcquisitionItemWithRelations } from '../types/acquisition-item.types';

import { AcquisitionItemTable } from './acquisition-item-table';
import { AcquisitionItemDialog } from './acquisition-item-dialog';

type AcquisitionItemWorkspaceProps = {
  acquisitionItems: AcquisitionItemWithRelations[];

  acquisitions: {
    id: string;
    acquisitionNumber: string;
  }[];

  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];
};

export function AcquisitionItemWorkspace({
  acquisitionItems,
  acquisitions,
  assets,
}: AcquisitionItemWorkspaceProps) {
  const [selectedAcquisitionItem, setSelectedAcquisitionItem] =
    useState<AcquisitionItemWithRelations | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedAcquisitionItem(null);
    setIsDialogOpen(true);
  }

  function handleEdit(acquisitionItem: AcquisitionItemWithRelations) {
    setSelectedAcquisitionItem(acquisitionItem);
    setIsDialogOpen(true);
  }

  const formAssets =
    selectedAcquisitionItem &&
    !assets.some((asset) => asset.id === selectedAcquisitionItem.assetId)
      ? [
          ...assets,
          {
            id: selectedAcquisitionItem.asset.id,
            assetCode: selectedAcquisitionItem.asset.assetCode,
            name: selectedAcquisitionItem.asset.name,
          },
        ]
      : assets;

  return (
    <MasterDataLayout
      title="Acquisition Items"
      description="Manage assets included in acquisitions."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Acquisition Item
        </button>
      }
    >
      <AcquisitionItemTable
        acquisitionItems={acquisitionItems}
        onEdit={handleEdit}
      />

      <AcquisitionItemDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        acquisitionItem={selectedAcquisitionItem}
        acquisitions={acquisitions}
        assets={formAssets}
      />
    </MasterDataLayout>
  );
}
