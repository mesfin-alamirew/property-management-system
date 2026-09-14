'use client';

import { useState } from 'react';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';

import type { AcquisitionWithRelations } from '../types/acquisition.types';

import { AcquisitionDialog } from './acquisition-dialog';
import { AcquisitionTable } from './acquisition-table';

type AcquisitionWorkspaceProps = {
  acquisitions: AcquisitionWithRelations[];

  acquisitionMethods: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AcquisitionWorkspace({
  acquisitions,
  acquisitionMethods,
}: AcquisitionWorkspaceProps) {
  const [selectedAcquisition, setSelectedAcquisition] =
    useState<AcquisitionWithRelations | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedAcquisition(null);
    setIsDialogOpen(true);
  }

  function handleEdit(acquisition: AcquisitionWithRelations) {
    setSelectedAcquisition(acquisition);
    setIsDialogOpen(true);
  }

  return (
    <MasterDataLayout
      title="Acquisitions"
      description="Register and manage asset acquisitions."
      actions={
        <Button type="button" onClick={handleCreate}>
          Register Acquisition
        </Button>
      }
    >
      <AcquisitionTable acquisitions={acquisitions} onEdit={handleEdit} />

      <AcquisitionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        acquisition={selectedAcquisition}
        acquisitionMethods={acquisitionMethods}
      />
    </MasterDataLayout>
  );
}
