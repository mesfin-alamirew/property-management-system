'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import type { AssetWithRelations } from '../types/asset.types';

import { AssetTable } from './asset-table';
import { AssetDialog } from './asset-dialog';

type AssetWorkspaceProps = {
  assets: AssetWithRelations[];

  assetTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  assetStatuses: {
    id: string;
    code: string;
    name: string;
  }[];

  assetConditions: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AssetWorkspace({
  assets,
  assetTypes,
  assetStatuses,
  assetConditions,
}: AssetWorkspaceProps) {
  const [selectedAsset, setSelectedAsset] = useState<AssetWithRelations | null>(
    null,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedAsset(null);
    setIsDialogOpen(true);
  }

  function handleEdit(asset: AssetWithRelations) {
    setSelectedAsset(asset);
    setIsDialogOpen(true);
  }

  return (
    <MasterDataLayout
      title="Assets"
      description="Register and manage organizational assets."
      actions={
        <Button type="button" onClick={handleCreate}>
          Register Asset
        </Button>
      }
    >
      <AssetTable assets={assets} onEdit={handleEdit} />

      <AssetDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        asset={selectedAsset}
        assetTypes={assetTypes}
        assetStatuses={assetStatuses}
        assetConditions={assetConditions}
      />
    </MasterDataLayout>
  );
}
