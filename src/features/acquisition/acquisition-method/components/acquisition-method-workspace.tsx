'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { ConfirmationDialog } from '@/components/common/confirmation-dialog';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';

import { deactivateAcquisitionMethodAction } from '../actions/acquisition-method.actions';
import type { AcquisitionMethodListItem } from '../types/acquisition-method.types';

import { AcquisitionMethodDialog } from './acquisition-method-dialog';
import { AcquisitionMethodTable } from './acquisition-method-table';

type AcquisitionMethodWorkspaceProps = {
  acquisitionMethods: AcquisitionMethodListItem[];
};

export function AcquisitionMethodWorkspace({
  acquisitionMethods,
}: AcquisitionMethodWorkspaceProps) {
  const router = useRouter();

  const [selectedAcquisitionMethod, setSelectedAcquisitionMethod] =
    useState<AcquisitionMethodListItem | null>(null);

  const [acquisitionMethodToDeactivate, setAcquisitionMethodToDeactivate] =
    useState<AcquisitionMethodListItem | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedAcquisitionMethod(null);
    setIsDialogOpen(true);
  }

  function handleEdit(acquisitionMethod: AcquisitionMethodListItem) {
    setSelectedAcquisitionMethod(acquisitionMethod);
    setIsDialogOpen(true);
  }

  function handleDeactivate(acquisitionMethod: AcquisitionMethodListItem) {
    setAcquisitionMethodToDeactivate(acquisitionMethod);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!acquisitionMethodToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(acquisitionMethodToDeactivate.id);

      const result = await deactivateAcquisitionMethodAction(
        acquisitionMethodToDeactivate.id,
      );

      if (result.success) {
        toast.success('Acquisition method deactivated successfully');

        setIsConfirmationOpen(false);
        setAcquisitionMethodToDeactivate(null);

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
      title="Acquisition Methods"
      description="Define and manage the methods used to acquire assets."
      actions={
        <Button type="button" onClick={handleCreate}>
          Add Acquisition Method
        </Button>
      }
    >
      <AcquisitionMethodTable
        acquisitionMethods={acquisitionMethods}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <AcquisitionMethodDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        acquisitionMethod={selectedAcquisitionMethod}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Acquisition Method"
        description={
          acquisitionMethodToDeactivate
            ? `Are you sure you want to deactivate "${acquisitionMethodToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
