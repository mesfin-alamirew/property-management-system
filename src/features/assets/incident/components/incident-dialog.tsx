'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { IncidentForm } from './incident-form';

import type { IncidentWithRelations } from '../types/incident.types';

type IncidentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  incident?: IncidentWithRelations | null;

  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];
};

export function IncidentDialog({
  open,
  onOpenChange,
  incident,
  assets,
}: IncidentDialogProps) {
  const isEditing = Boolean(incident);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Incident' : 'Report Incident'}
          </DialogTitle>
        </DialogHeader>

        <IncidentForm
          incident={incident}
          assets={assets}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
