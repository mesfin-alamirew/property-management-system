'use client';

import { useState } from 'react';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import type { AcquisitionWithRelations } from '../types/acquisition.types';

import { AcquisitionTable } from './acquisition-table';
import { AcquisitionDialog } from './acquisition-dialog';

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
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Register Acquisition
        </button>
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
