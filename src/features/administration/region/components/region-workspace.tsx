'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateRegionAction } from '../actions/region.actions';

import { RegionDialog } from './region-dialog';
import { RegionTable } from './region-table';

import type { Prisma } from '@/generated/prisma/client';

import type { LookupOption } from '@/types/lookup-option';

type RegionWithCountry = Prisma.RegionGetPayload<{
  include: {
    country: true;
  };
}>;

type RegionWorkspaceProps = {
  regions: RegionWithCountry[];

  countries: LookupOption[];
};

export function RegionWorkspace({ regions, countries }: RegionWorkspaceProps) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedRegion, setSelectedRegion] =
    useState<RegionWithCountry | null>(null);

  const [regionToDeactivate, setRegionToDeactivate] =
    useState<RegionWithCountry | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  function handleCreate() {
    setSelectedRegion(null);
    setIsDialogOpen(true);
  }

  function handleEdit(region: RegionWithCountry) {
    setSelectedRegion(region);
    setIsDialogOpen(true);
  }

  function handleDeactivate(region: RegionWithCountry) {
    setRegionToDeactivate(region);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!regionToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(regionToDeactivate.id);

      const result = await deactivateRegionAction(regionToDeactivate.id);

      if (result.success) {
        toast.success('Region deactivated successfully');

        setIsConfirmationOpen(false);
        setRegionToDeactivate(null);

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
      title="Regions"
      description="Manage regions."
      actions={<Button onClick={handleCreate}>Add Region</Button>}
    >
      <RegionTable
        regions={regions}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <RegionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        region={selectedRegion}
        countries={countries}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Region"
        description={
          regionToDeactivate
            ? `Are you sure you want to deactivate "${regionToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
