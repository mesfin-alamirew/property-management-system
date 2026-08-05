'use client';

import { useState } from 'react';

import type { PropertyType } from '@/generated/prisma/client';

import { Button } from '@/components/ui/button';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import { PropertyTypeDialog } from './property-type-dialog';
import { PropertyTypeTable } from './property-type-table';

type PropertyTypeWorkspaceProps = {
  propertyTypes: PropertyType[];
};

export function PropertyTypeWorkspace({
  propertyTypes,
}: PropertyTypeWorkspaceProps) {
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

  return (
    <MasterDataLayout
      title="Property Types"
      description="Manage property types."
      actions={<Button onClick={handleCreate}>Add Property Type</Button>}
    >
      <PropertyTypeTable propertyTypes={propertyTypes} onEdit={handleEdit} />

      <PropertyTypeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        propertyType={selectedPropertyType}
      />
    </MasterDataLayout>
  );
}
