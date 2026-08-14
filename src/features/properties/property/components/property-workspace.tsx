'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { Prisma } from '@/generated/prisma/client';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivatePropertyAction } from '../actions/property.actions';

import { PropertyTable } from './property-table';
import { PropertyDialog } from './property-dialog';
type PropertyWithRelations = Prisma.PropertyGetPayload<{
  include: {
    organizationUnit: {
      select: {
        id: true;
        code: true;
        name: true;
      };
    };
    propertyType: {
      select: {
        id: true;
        code: true;
        name: true;
      };
    };
    propertyCategory: {
      select: {
        id: true;
        code: true;
        name: true;
      };
    };
    propertyTenure: {
      select: {
        id: true;
        code: true;
        name: true;
      };
    };
    propertyStatus: {
      select: {
        id: true;
        code: true;
        name: true;
      };
    };
  };
}>;

type PropertyWorkspaceProps = {
  properties: PropertyWithRelations[];

  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];

  propertyTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  propertyCategories: {
    id: string;
    code: string;
    name: string;
  }[];

  propertyTenures: {
    id: string;
    code: string;
    name: string;
  }[];

  propertyStatuses: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function PropertyWorkspace({
  properties,
  organizationUnits,
  propertyTypes,
  propertyCategories,
  propertyTenures,
  propertyStatuses,
}: PropertyWorkspaceProps) {
  const router = useRouter();

  const [selectedProperty, setSelectedProperty] =
    useState<PropertyWithRelations | null>(null);

  const [propertyToDeactivate, setPropertyToDeactivate] =
    useState<PropertyWithRelations | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  function handleCreate() {
    setSelectedProperty(null);
    setIsDialogOpen(true);
  }

  function handleEdit(property: PropertyWithRelations) {
    setSelectedProperty(property);
    setIsDialogOpen(true);
  }

  function handleDeactivate(property: PropertyWithRelations) {
    setPropertyToDeactivate(property);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!propertyToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(propertyToDeactivate.id);

      const result = await deactivatePropertyAction(propertyToDeactivate.id);

      if (result.success) {
        toast.success('Property deactivated successfully');

        setIsConfirmationOpen(false);
        setPropertyToDeactivate(null);

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
      title="Properties"
      description="Manage properties and their related information."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Property{' '}
        </button>
      }
    >
      {' '}
      <PropertyTable
        properties={properties}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />
      <PropertyDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        property={selectedProperty}
        organizationUnits={organizationUnits}
        propertyTypes={propertyTypes}
        propertyCategories={propertyCategories}
        propertyTenures={propertyTenures}
        propertyStatuses={propertyStatuses}
      />
      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Property"
        description={
          propertyToDeactivate
            ? `Are you sure you want to deactivate "${propertyToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
