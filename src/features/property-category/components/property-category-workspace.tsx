'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { PropertyCategory } from '@/generated/prisma/client';

import { Button } from '@/components/ui/button';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivatePropertyCategoryAction } from '../actions/property-category.actions';

import { PropertyCategoryDialog } from './property-category-dialog';
import { PropertyCategoryTable } from './property-category-table';

type PropertyCategoryWorkspaceProps = {
  propertyCategories: PropertyCategory[];
  parentCategories: PropertyCategory[];
};

export function PropertyCategoryWorkspace({
  propertyCategories,
  parentCategories,
}: PropertyCategoryWorkspaceProps) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedPropertyCategory, setSelectedPropertyCategory] =
    useState<PropertyCategory | null>(null);

  const [propertyCategoryToDeactivate, setPropertyCategoryToDeactivate] =
    useState<PropertyCategory | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  function handleCreate() {
    setSelectedPropertyCategory(null);
    setIsDialogOpen(true);
  }

  function handleEdit(propertyCategory: PropertyCategory) {
    setSelectedPropertyCategory(propertyCategory);
    setIsDialogOpen(true);
  }

  function handleDeactivate(propertyCategory: PropertyCategory) {
    setPropertyCategoryToDeactivate(propertyCategory);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!propertyCategoryToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(propertyCategoryToDeactivate.id);

      const result = await deactivatePropertyCategoryAction(
        propertyCategoryToDeactivate.id,
      );

      if (result.success) {
        toast.success('Property Category deactivated successfully');

        setIsConfirmationOpen(false);
        setPropertyCategoryToDeactivate(null);

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
      title="Property Categories"
      description="Manage property categories."
      actions={<Button onClick={handleCreate}>Add Property Category</Button>}
    >
      <PropertyCategoryTable
        propertyCategories={propertyCategories}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <PropertyCategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        propertyCategory={selectedPropertyCategory}
        parentCategories={parentCategories}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Property Category"
        description={
          propertyCategoryToDeactivate
            ? `Are you sure you want to deactivate "${propertyCategoryToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
