'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { PropertyType } from '@/generated/prisma/client';

import { Button } from '@/components/ui/button';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import { deactivatePropertyTypeAction } from '../actions/property-type.actions';

import { PropertyTypeDialog } from './property-type-dialog';
import { PropertyTypeTable } from './property-type-table';

import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

type PropertyTypeWorkspaceProps = {
  propertyTypes: PropertyType[];
};

export function PropertyTypeWorkspace({
  propertyTypes,
}: PropertyTypeWorkspaceProps) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedPropertyType, setSelectedPropertyType] =
    useState<PropertyType | null>(null);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [propertyTypeToDeactivate, setPropertyTypeToDeactivate] =
    useState<PropertyType | null>(null);

  function handleCreate() {
    setSelectedPropertyType(null);
    setIsDialogOpen(true);
  }

  function handleEdit(propertyType: PropertyType) {
    setSelectedPropertyType(propertyType);
    setIsDialogOpen(true);
  }

  function handleDeactivate(propertyType: PropertyType) {
    setPropertyTypeToDeactivate(propertyType);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!propertyTypeToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(propertyTypeToDeactivate.id);

      const result = await deactivatePropertyTypeAction(
        propertyTypeToDeactivate.id,
      );

      if (result.success) {
        toast.success('Property Type deactivated successfully');

        setIsConfirmationOpen(false);
        setPropertyTypeToDeactivate(null);

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
      title="Property Types"
      description="Manage property types."
      actions={<Button onClick={handleCreate}>Add Property Type</Button>}
    >
      <PropertyTypeTable
        propertyTypes={propertyTypes}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <PropertyTypeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        propertyType={selectedPropertyType}
      />
      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Property Type"
        description={
          propertyTypeToDeactivate
            ? `Are you sure you want to deactivate "${propertyTypeToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
