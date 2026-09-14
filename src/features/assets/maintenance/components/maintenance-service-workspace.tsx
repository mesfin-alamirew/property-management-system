'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import type { MaintenanceServiceWithRelations } from '../types/maintenance-service.types';

import { MaintenanceServiceDialog } from './maintenance-service-dialog';
import { MaintenanceServiceTable } from './maintenance-service-table';

type MaintenanceServiceWorkspaceProps = {
  maintenanceServices: MaintenanceServiceWithRelations[];

  maintenances: {
    id: string;
    referenceNumber: string;
    title: string;
  }[];
};

export function MaintenanceServiceWorkspace({
  maintenanceServices,
  maintenances,
}: MaintenanceServiceWorkspaceProps) {
  const [selectedMaintenanceService, setSelectedMaintenanceService] =
    useState<MaintenanceServiceWithRelations | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedMaintenanceService(null);
    setIsDialogOpen(true);
  }

  function handleEdit(maintenanceService: MaintenanceServiceWithRelations) {
    setSelectedMaintenanceService(maintenanceService);
    setIsDialogOpen(true);
  }

  return (
    <MasterDataLayout
      title="Maintenance Services"
      description="Manage services performed for maintenance records."
      actions={
        <Button type="button" onClick={handleCreate}>
          Add Maintenance Service
        </Button>
      }
    >
      <MaintenanceServiceTable
        maintenanceServices={maintenanceServices}
        onEdit={handleEdit}
      />

      <MaintenanceServiceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        maintenanceService={selectedMaintenanceService}
        maintenances={maintenances}
      />
    </MasterDataLayout>
  );
}
