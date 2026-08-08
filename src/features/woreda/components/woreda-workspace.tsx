'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateWoredaAction } from '../actions/woreda.actions';

import { WoredaDialog } from './woreda-dialog';
import { WoredaTable } from './woreda-table';

import type { WoredaWithZone } from '../types/woreda.types';

import type { LookupOption } from '@/types/lookup-option';

type WoredaWorkspaceProps = {
  woredas: WoredaWithZone[];

  zones: LookupOption[];
};

export function WoredaWorkspace({ woredas, zones }: WoredaWorkspaceProps) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedWoreda, setSelectedWoreda] = useState<WoredaWithZone | null>(
    null,
  );

  const [woredaToDeactivate, setWoredaToDeactivate] =
    useState<WoredaWithZone | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  function handleCreate() {
    setSelectedWoreda(null);
    setIsDialogOpen(true);
  }

  function handleEdit(woreda: WoredaWithZone) {
    setSelectedWoreda(woreda);
    setIsDialogOpen(true);
  }

  function handleDeactivate(woreda: WoredaWithZone) {
    setWoredaToDeactivate(woreda);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!woredaToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(woredaToDeactivate.id);

      const result = await deactivateWoredaAction(woredaToDeactivate.id);

      if (result.success) {
        toast.success('Woreda deactivated successfully');

        setIsConfirmationOpen(false);
        setWoredaToDeactivate(null);

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
      title="Woredas"
      description="Manage woredas."
      actions={<Button onClick={handleCreate}>Add Woreda</Button>}
    >
      <WoredaTable
        woredas={woredas}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <WoredaDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        woreda={selectedWoreda}
        zones={zones}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Woreda"
        description={
          woredaToDeactivate
            ? `Are you sure you want to deactivate "${woredaToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
