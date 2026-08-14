'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { PropertyTenure } from '@/generated/prisma/client';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';
import { Button } from '@/components/ui/button';

import { deactivatePropertyTenureAction } from '../actions/property-tenure.actions';

import { PropertyTenureDialog } from './property-tenure-dialog';
import { PropertyTenureTable } from './property-tenure-table';

type PropertyTenureWorkspaceProps = {
  propertyTenures: PropertyTenure[];
};

export function PropertyTenureWorkspace({
  propertyTenures,
}: PropertyTenureWorkspaceProps) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedPropertyTenure, setSelectedPropertyTenure] =
    useState<PropertyTenure | null>(null);

  const [propertyTenureToDeactivate, setPropertyTenureToDeactivate] =
    useState<PropertyTenure | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  function handleCreate() {
    setSelectedPropertyTenure(null);
    setIsDialogOpen(true);
  }

  function handleEdit(propertyTenure: PropertyTenure) {
    setSelectedPropertyTenure(propertyTenure);
    setIsDialogOpen(true);
  }

  function handleDeactivate(propertyTenure: PropertyTenure) {
    setPropertyTenureToDeactivate(propertyTenure);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!propertyTenureToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(propertyTenureToDeactivate.id);

      const result = await deactivatePropertyTenureAction(
        propertyTenureToDeactivate.id,
      );

      if (result.success) {
        toast.success('Property Tenure deactivated successfully');

        setIsConfirmationOpen(false);

        setPropertyTenureToDeactivate(null);

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
      title="Property Tenure"
      description="Manage property tenures."
      actions={<Button onClick={handleCreate}>Add Property Tenure</Button>}
    >
      <PropertyTenureDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        propertyTenure={selectedPropertyTenure}
      />

      <PropertyTenureTable
        propertyTenures={propertyTenures}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Property Tenure"
        description={
          propertyTenureToDeactivate
            ? `Are you sure you want to deactivate "${propertyTenureToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
