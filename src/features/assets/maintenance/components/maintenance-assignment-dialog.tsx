'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SelectField } from '@/components/form/select-field';

import { assignMaintenanceAction } from '../actions/maintenance.actions';
import type { MaintenanceWithRelations } from '../types/maintenance.types';

type MaintenanceAssignmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  maintenance: MaintenanceWithRelations | null;

  users: {
    id: string;
    username: string;
    displayName: string;
  }[];
};

export function MaintenanceAssignmentDialog({
  open,
  onOpenChange,
  maintenance,
  users,
}: MaintenanceAssignmentDialogProps) {
  const [assignedToUserId, setAssignedToUserId] = useState(
    maintenance?.assignedToUserId ?? '',
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAssign() {
    if (!maintenance) {
      return;
    }

    if (!assignedToUserId) {
      setError('Please select a maintenance officer.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await assignMaintenanceAction(
        maintenance.id,
        assignedToUserId,
      );

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

  if (!maintenance) {
    return null;
  }

  const userOptions = users.map((user) => ({
    value: user.id,
    label: `${user.displayName} (${user.username})`,
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Assign Maintenance</DialogTitle>

          <DialogDescription>
            Assign this maintenance request to the concerned officer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          <div className="rounded-md border border-border bg-surface-muted p-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Reference Number
                </p>

                <p className="mt-1 text-sm font-medium text-foreground">
                  {maintenance.referenceNumber}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Asset
                </p>

                <p className="mt-1 text-sm text-foreground">
                  {maintenance.asset
                    ? `${maintenance.asset.assetCode} - ${maintenance.asset.name}`
                    : '-'}
                </p>
              </div>
            </div>
          </div>

          <SelectField
            label="Maintenance Officer"
            required
            options={userOptions}
            placeholder="Select maintenance officer"
            value={assignedToUserId}
            onChange={(event) => {
              setAssignedToUserId(event.target.value);
              setError(null);
            }}
            disabled={isSubmitting}
            error={error ?? undefined}
          />

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
              disabled={isSubmitting || !assignedToUserId}
              onClick={handleAssign}
            >
              {isSubmitting ? 'Assigning...' : 'Assign Maintenance'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
