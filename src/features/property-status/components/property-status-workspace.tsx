'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { PropertyStatus } from '@/generated/prisma/client';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';
import { Button } from '@/components/ui/button';

import { deactivatePropertyStatusAction } from '../actions/property-status.actions';

import { PropertyStatusDialog } from './property-status-dialog';
import { PropertyStatusTable } from './property-status-table';

type PropertyStatusWorkspaceProps = {
  propertyStatuses: PropertyStatus[];
};

export function PropertyStatusWorkspace({
  propertyStatuses,
}: PropertyStatusWorkspaceProps) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedPropertyStatus, setSelectedPropertyStatus] =
    useState<PropertyStatus | null>(null);

  const [propertyStatusToDeactivate, setPropertyStatusToDeactivate] =
    useState<PropertyStatus | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  function handleCreate() {
    setSelectedPropertyStatus(null);
    setIsDialogOpen(true);
  }

  function handleEdit(propertyStatus: PropertyStatus) {
    setSelectedPropertyStatus(propertyStatus);
    setIsDialogOpen(true);
  }

  function handleDeactivate(propertyStatus: PropertyStatus) {
    setPropertyStatusToDeactivate(propertyStatus);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!propertyStatusToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(propertyStatusToDeactivate.id);

      const result = await deactivatePropertyStatusAction(
        propertyStatusToDeactivate.id,
      );

      if (result.success) {
        toast.success('Property Status deactivated successfully');

        setIsConfirmationOpen(false);

        setPropertyStatusToDeactivate(null);

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
      title="Property Status"
      description="Manage property statuses."
      actions={<Button onClick={handleCreate}>Add Property Status</Button>}
    >
      <PropertyStatusDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        propertyStatus={selectedPropertyStatus}
      />

      <PropertyStatusTable
        propertyStatuses={propertyStatuses}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Property Status"
        description={
          propertyStatusToDeactivate
            ? `Are you sure you want to deactivate "${propertyStatusToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
