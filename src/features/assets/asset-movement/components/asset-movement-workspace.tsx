'use client';

import { useState } from 'react';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import type { AssetMovementWithRelations } from '../types/asset-movement.types';

import { AssetMovementTable } from './asset-movement-table';
import { AssetMovementDialog } from './asset-movement-dialog';

type AssetMovementWorkspaceProps = {
  assetMovements: AssetMovementWithRelations[];

  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];

  locations: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AssetMovementWorkspace({
  assetMovements,
  assets,
  locations,
}: AssetMovementWorkspaceProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setIsDialogOpen(true);
  }

  return (
    <MasterDataLayout
      title="Asset Movements"
      description="Record and review asset location movements."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Move Asset
        </button>
      }
    >
      <AssetMovementTable assetMovements={assetMovements} />

      <AssetMovementDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        assets={assets}
        locations={locations}
      />
    </MasterDataLayout>
  );
}
