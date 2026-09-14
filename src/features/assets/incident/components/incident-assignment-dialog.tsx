'use client';

import { useState } from 'react';

import { assignIncidentAction } from '../actions/incident.actions';

import type { IncidentWithRelations } from '../types/incident.types';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { SelectField } from '@/components/form/select-field';

type IncidentAssignmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  incident: IncidentWithRelations | null;

  users: {
    id: string;
    username: string;
    displayName: string;
  }[];
};

export function IncidentAssignmentDialog({
  open,
  onOpenChange,
  incident,
  users,
}: IncidentAssignmentDialogProps) {
  const [assignedToUserId, setAssignedToUserId] = useState(
    incident?.assignedToUserId ?? '',
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleAssign() {
    if (!incident) {
      return;
    }

    if (!assignedToUserId) {
      setError('Please select a responsible officer.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await assignIncidentAction(incident.id, assignedToUserId);

      if (!result.success) {
        setError(result.message);
        return;
      }

      onOpenChange(false);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  const userOptions = users.map((user) => ({
    value: user.id,
    label: `${user.displayName} (${user.username})`,
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Incident</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Reference Number
              </p>

              <p className="mt-1 text-sm font-medium text-foreground">
                {incident?.referenceNumber ?? '-'}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Asset
              </p>

              <p className="mt-1 text-sm text-foreground">
                {incident?.asset
                  ? `${incident.asset.assetCode} - ${incident.asset.name}`
                  : '-'}
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <SelectField
              label="Responsible Officer"
              required
              options={userOptions}
              placeholder="Select responsible officer"
              value={assignedToUserId}
              onChange={(event) => {
                setAssignedToUserId(event.target.value);
                setError(null);
              }}
              disabled={isSubmitting}
              error={error ?? undefined}
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-border pt-4">
            <Button
              type="button"
              variant="secondary"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="primary"
              disabled={isSubmitting || !assignedToUserId}
              onClick={handleAssign}
            >
              {isSubmitting ? 'Assigning...' : 'Assign Incident'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
