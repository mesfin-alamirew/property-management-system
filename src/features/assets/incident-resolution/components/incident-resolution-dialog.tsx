'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { IncidentResolutionForm } from './incident-resolution-form';

type IncidentResolutionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  incident: {
    id: string;
    referenceNumber: string;
    title: string;
  } | null;
};

export function IncidentResolutionDialog({
  open,
  onOpenChange,
  incident,
}: IncidentResolutionDialogProps) {
  if (!incident) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Resolve Incident</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border bg-muted/30 p-4">
            <div className="text-xs font-medium uppercase text-muted-foreground">
              Incident
            </div>

            <div className="mt-1 font-medium">{incident.referenceNumber}</div>

            <div className="text-sm text-muted-foreground">
              {incident.title}
            </div>
          </div>

          <IncidentResolutionForm
            incidentId={incident.id}
            onSuccess={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
