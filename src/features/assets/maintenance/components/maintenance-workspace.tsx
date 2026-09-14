'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import type { MaintenanceWithRelations } from '../types/maintenance.types';

import {
  approveMaintenanceAction,
  completeMaintenanceAction,
  requestMaintenanceAction,
  startMaintenanceAction,
} from '../actions/maintenance.actions';

import { MaintenanceAssignmentDialog } from './maintenance-assignment-dialog';
import { MaintenanceDialog } from './maintenance-dialog';
import { MaintenanceTable } from './maintenance-table';

type MaintenanceWorkspaceProps = {
  maintenances: MaintenanceWithRelations[];

  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];

  users: {
    id: string;
    username: string;
    displayName: string;
  }[];
};

export function MaintenanceWorkspace({
  maintenances,
  assets,
  users,
}: MaintenanceWorkspaceProps) {
  const router = useRouter();

  const [selectedMaintenance, setSelectedMaintenance] =
    useState<MaintenanceWithRelations | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [maintenanceToAssign, setMaintenanceToAssign] =
    useState<MaintenanceWithRelations | null>(null);

  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedMaintenance(null);
    setIsDialogOpen(true);
  }

  function handleEdit(maintenance: MaintenanceWithRelations) {
    setSelectedMaintenance(maintenance);
    setIsDialogOpen(true);
  }

  function handleAssign(maintenance: MaintenanceWithRelations) {
    setMaintenanceToAssign(maintenance);
    setIsAssignmentDialogOpen(true);
  }

  async function handleRequest(maintenance: MaintenanceWithRelations) {
    const result = await requestMaintenanceAction(maintenance.id);

    if (result.success) {
      toast.success('Maintenance requested successfully');
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleApprove(maintenance: MaintenanceWithRelations) {
    const result = await approveMaintenanceAction(maintenance.id);

    if (result.success) {
      toast.success('Maintenance approved successfully');
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleStart(maintenance: MaintenanceWithRelations) {
    const result = await startMaintenanceAction(maintenance.id);

    if (result.success) {
      toast.success('Maintenance started successfully');
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleComplete(maintenance: MaintenanceWithRelations) {
    const result = await completeMaintenanceAction(maintenance.id);

    if (result.success) {
      toast.success('Maintenance completed successfully');
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <MasterDataLayout
      title="Maintenance"
      description="Create and manage maintenance requests and services."
      actions={
        <Button type="button" onClick={handleCreate}>
          Create Maintenance
        </Button>
      }
    >
      <MaintenanceTable
        maintenances={maintenances}
        onEdit={handleEdit}
        onRequest={handleRequest}
        onAssign={handleAssign}
        onApprove={handleApprove}
        onStart={handleStart}
        onComplete={handleComplete}
      />

      <MaintenanceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        maintenance={selectedMaintenance}
        assets={assets}
        users={users}
      />

      <MaintenanceAssignmentDialog
        open={isAssignmentDialogOpen}
        onOpenChange={(open) => {
          setIsAssignmentDialogOpen(open);

          if (!open) {
            setMaintenanceToAssign(null);
          }
        }}
        maintenance={maintenanceToAssign}
        users={users}
      />
    </MasterDataLayout>
  );
}
