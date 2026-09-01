'use client';

import { useState } from 'react';

import { assignIncidentAction } from '../actions/incident.actions';

import type { IncidentWithRelations } from '../types/incident.types';

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

  if (!open || !incident) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Assign Incident</h2>

          <p className="text-sm text-muted-foreground">
            Assign this incident to the responsible officer.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <div className="text-sm font-medium">Reference Number</div>

            <div className="mt-1 text-sm text-muted-foreground">
              {incident.referenceNumber}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">Asset</div>

            <div className="mt-1 text-sm text-muted-foreground">
              {incident.asset
                ? `${incident.asset.assetCode} - ${incident.asset.name}`
                : '-'}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="assignedToUserId" className="text-sm font-medium">
              Responsible Officer
            </label>

            <select
              id="assignedToUserId"
              value={assignedToUserId}
              onChange={(event) => setAssignedToUserId(event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Select Responsible Officer</option>

              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.displayName} ({user.username})
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAssign}
              disabled={isSubmitting || !assignedToUserId}
              className="rounded-md border px-4 py-2 text-sm"
            >
              {isSubmitting ? 'Assigning...' : 'Assign Incident'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
