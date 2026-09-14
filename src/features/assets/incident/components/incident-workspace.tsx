'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import type { IncidentWithRelations } from '../types/incident.types';

import { IncidentTable } from './incident-table';
import { IncidentDialog } from './incident-dialog';
import { IncidentAssignmentDialog } from './incident-assignment-dialog';
import { IncidentResolutionDialog } from '@/features/assets/incident-resolution/components/incident-resolution-dialog';

import {
  reportIncidentAction,
  startIncidentAction,
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

  const [incidentToResolve, setIncidentToResolve] =
    useState<IncidentWithRelations | null>(null);

  const [isResolutionDialogOpen, setIsResolutionDialogOpen] = useState(false);

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

  function handleResolve(incident: IncidentWithRelations) {
    setIncidentToResolve(incident);
    setIsResolutionDialogOpen(true);
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
    <MasterDataLayout
      title="Incidents"
      description="Create and manage asset incidents and their resolution."
      actions={
        <Button type="button" onClick={handleCreate}>
          Create Incident
        </Button>
      }
    >
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

      <IncidentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        incident={selectedIncident}
        assets={assets}
      />

      <IncidentAssignmentDialog
        open={isAssignmentDialogOpen}
        onOpenChange={setIsAssignmentDialogOpen}
        incident={incidentToAssign}
        users={users}
      />

      <IncidentResolutionDialog
        open={isResolutionDialogOpen}
        onOpenChange={setIsResolutionDialogOpen}
        incident={
          incidentToResolve
            ? {
                id: incidentToResolve.id,
                referenceNumber: incidentToResolve.referenceNumber,
                title: incidentToResolve.title,
              }
            : null
        }
      />
    </MasterDataLayout>
  );
}
