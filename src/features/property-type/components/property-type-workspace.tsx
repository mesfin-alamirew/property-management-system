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

  function handleCreate() {
    setSelectedPropertyType(null);
    setIsDialogOpen(true);
  }

  function handleEdit(propertyType: PropertyType) {
    setSelectedPropertyType(propertyType);
    setIsDialogOpen(true);
  }

  async function handleDeactivate(propertyType: PropertyType) {
    const confirmed = window.confirm(
      `Are you sure you want to deactivate "${propertyType.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    const result = await deactivatePropertyTypeAction(propertyType.id);

    if (result.success) {
      toast.success('Property Type deactivated successfully');

      router.refresh();
    } else {
      toast.error(result.message);
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
      />

      <PropertyTypeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        propertyType={selectedPropertyType}
      />
    </MasterDataLayout>
  );
}
