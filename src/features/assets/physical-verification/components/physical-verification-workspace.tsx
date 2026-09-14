'use client';

import { useState } from 'react';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';

import type { PhysicalVerificationWithRelations } from '../types/physical-verification.types';

import { PhysicalVerificationTable } from './physical-verification-table';
import { PhysicalVerificationDialog } from './physical-verification-dialog';

type PhysicalVerificationWorkspaceProps = {
  physicalVerifications: PhysicalVerificationWithRelations[];

  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];

  locations: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function PhysicalVerificationWorkspace({
  physicalVerifications,
  organizationUnits,
  locations,
}: PhysicalVerificationWorkspaceProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setIsDialogOpen(true);
  }

  return (
    <MasterDataLayout
      title="Physical Verifications"
      description="Plan, perform, and review physical asset verifications."
      actions={
        <Button type="button" onClick={handleCreate}>
          Create Physical Verification
        </Button>
      }
    >
      <PhysicalVerificationTable
        physicalVerifications={physicalVerifications}
      />

      <PhysicalVerificationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        organizationUnits={organizationUnits}
        locations={locations}
      />
    </MasterDataLayout>
  );
}
