'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateZoneAction } from '../actions/zone.actions';

import { ZoneDialog } from './zone-dialog';
import { ZoneTable } from './zone-table';

import type { ZoneWithRegion } from '../types/zone.types';

import type { LookupOption } from '@/types/lookup-option';

type ZoneWorkspaceProps = {
  zones: ZoneWithRegion[];

  regions: LookupOption[];
};

export function ZoneWorkspace({ zones, regions }: ZoneWorkspaceProps) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedZone, setSelectedZone] = useState<ZoneWithRegion | null>(null);

  const [zoneToDeactivate, setZoneToDeactivate] =
    useState<ZoneWithRegion | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  function handleCreate() {
    setSelectedZone(null);
    setIsDialogOpen(true);
  }

  function handleEdit(zone: ZoneWithRegion) {
    setSelectedZone(zone);
    setIsDialogOpen(true);
  }

  function handleDeactivate(zone: ZoneWithRegion) {
    setZoneToDeactivate(zone);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!zoneToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(zoneToDeactivate.id);

      const result = await deactivateZoneAction(zoneToDeactivate.id);

      if (result.success) {
        toast.success('Zone deactivated successfully');

        setIsConfirmationOpen(false);
        setZoneToDeactivate(null);

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
      title="Zones"
      description="Manage zones."
      actions={<Button onClick={handleCreate}>Add Zone</Button>}
    >
      <ZoneTable
        zones={zones}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <ZoneDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        zone={selectedZone}
        regions={regions}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Zone"
        description={
          zoneToDeactivate
            ? `Are you sure you want to deactivate "${zoneToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
