'use client';

import { useState } from 'react';

import type { MaintenanceWithRelations } from '../types/maintenance.types';

import { MaintenanceTable } from './maintenance-table';
import { MaintenanceDialog } from './maintenance-dialog';
import { toast } from 'sonner';
import { requestMaintenanceAction } from '../actions/maintenance.actions';
import { useRouter } from 'next/navigation';

import {
  approveMaintenanceAction,
  startMaintenanceAction,
  completeMaintenanceAction,
} from '../actions/maintenance.actions';
import { MaintenanceAssignmentDialog } from './maintenance-assignment-dialog';

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Maintenance</h1>

          <p className="text-sm text-muted-foreground">
            Create and manage maintenance requests and services.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Create Maintenance
        </button>
      </div>

      {/* Maintenance Table */}
      <MaintenanceTable
        maintenances={maintenances}
        onEdit={handleEdit}
        onRequest={handleRequest}
        onAssign={handleAssign}
        onApprove={handleApprove}
        onStart={handleStart}
        onComplete={handleComplete}
      />

      {/* Maintenance Dialog */}
      <MaintenanceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        maintenance={selectedMaintenance}
        assets={assets}
        users={users}
      />
      {/*. Assignment Dialog */}
      <MaintenanceAssignmentDialog
        open={isAssignmentDialogOpen}
        onOpenChange={setIsAssignmentDialogOpen}
        maintenance={maintenanceToAssign}
        users={users}
      />
    </div>
  );
}
