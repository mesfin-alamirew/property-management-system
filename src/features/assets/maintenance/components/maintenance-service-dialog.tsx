'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { MaintenanceServiceRecord } from '../types/maintenance-service.types';
import { MaintenanceServiceForm } from './maintenance-service.form';

type MaintenanceServiceDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  maintenanceService?: MaintenanceServiceRecord | null;

  maintenances: {
    id: string;
    referenceNumber: string;
    title: string;
  }[];
};

export function MaintenanceServiceDialog({
  open,
  onOpenChange,
  maintenanceService,
  maintenances,
}: MaintenanceServiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {maintenanceService
              ? 'Edit Maintenance Service'
              : 'Add Maintenance Service'}
          </DialogTitle>

          <DialogDescription>
            {maintenanceService
              ? 'Update maintenance service information.'
              : 'Enter the information required to record a maintenance service.'}
          </DialogDescription>
        </DialogHeader>

        <MaintenanceServiceForm
          maintenanceService={maintenanceService}
          maintenances={maintenances}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
