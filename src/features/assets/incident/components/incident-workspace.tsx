'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import type { IncidentWithRelations } from '../types/incident.types';

import { IncidentTable } from './incident-table';
import { IncidentDialog } from './incident-dialog';
import { IncidentAssignmentDialog } from './incident-assignment-dialog';

import {
  reportIncidentAction,
  assignIncidentAction,
  startIncidentAction,
  resolveIncidentAction,
  closeIncidentAction,
  cancelIncidentAction,
} from '../actions/incident.actions';

type IncidentWorkspaceProps = {
  incidents: IncidentWithRelations[];

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

export function IncidentWorkspace({
  incidents,
  assets,
  users,
}: IncidentWorkspaceProps) {
  const router = useRouter();

  const [selectedIncident, setSelectedIncident] =
    useState<IncidentWithRelations | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [incidentToAssign, setIncidentToAssign] =
    useState<IncidentWithRelations | null>(null);

  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedIncident(null);
    setIsDialogOpen(true);
  }

  function handleEdit(incident: IncidentWithRelations) {
    setSelectedIncident(incident);
    setIsDialogOpen(true);
  }

  function handleAssign(incident: IncidentWithRelations) {
    setIncidentToAssign(incident);
    setIsAssignmentDialogOpen(true);
  }

  async function handleReport(incident: IncidentWithRelations) {
    const result = await reportIncidentAction(incident.id);

    if (result.success) {
      toast.success('Incident reported successfully');

      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleStart(incident: IncidentWithRelations) {
    const result = await startIncidentAction(incident.id);

    if (result.success) {
      toast.success('Incident started successfully');

      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleResolve(incident: IncidentWithRelations) {
    const result = await resolveIncidentAction(incident.id);

    if (result.success) {
      toast.success('Incident resolved successfully');

      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleClose(incident: IncidentWithRelations) {
    const result = await closeIncidentAction(incident.id);

    if (result.success) {
      toast.success('Incident closed successfully');

      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleCancel(incident: IncidentWithRelations) {
    const result = await cancelIncidentAction(incident.id);

    if (result.success) {
      toast.success('Incident cancelled successfully');

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
          <h1 className="text-xl font-semibold">Incidents</h1>

          <p className="text-sm text-muted-foreground">
            Create and manage asset incidents and their resolution.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Create Incident
        </button>
      </div>

      {/* Incident Table */}
      <IncidentTable
        incidents={incidents}
        onEdit={handleEdit}
        onReport={handleReport}
        onAssign={handleAssign}
        onStart={handleStart}
        onResolve={handleResolve}
        onClose={handleClose}
        onCancel={handleCancel}
      />

      {/* Incident Dialog */}
      <IncidentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        incident={selectedIncident}
        assets={assets}
      />

      {/* Incident Assignment Dialog */}
      <IncidentAssignmentDialog
        open={isAssignmentDialogOpen}
        onOpenChange={setIsAssignmentDialogOpen}
        incident={incidentToAssign}
        users={users}
      />
    </div>
  );
}
