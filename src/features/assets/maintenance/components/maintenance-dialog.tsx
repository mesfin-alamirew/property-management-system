'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { MaintenanceWithRelations } from '../types/maintenance.types';

import { MaintenanceForm } from './maintenance-form';

type MaintenanceDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  maintenance?: MaintenanceWithRelations | null;

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

export function MaintenanceDialog({
  open,
  onOpenChange,
  maintenance,
  assets,
  users,
}: MaintenanceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {maintenance ? 'Edit Maintenance' : 'Create Maintenance'}
          </DialogTitle>

          <DialogDescription>
            {maintenance
              ? 'Update maintenance information.'
              : 'Enter the information required to create a maintenance request.'}
          </DialogDescription>
        </DialogHeader>

        <MaintenanceForm
          maintenance={maintenance}
          assets={assets}
          users={users}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
