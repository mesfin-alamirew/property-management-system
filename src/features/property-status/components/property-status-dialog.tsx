'use client';

import type { PropertyStatus } from '@/generated/prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { PropertyStatusForm } from './property-status-form';

type PropertyStatusDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  propertyStatus: PropertyStatus | null;
};

export function PropertyStatusDialog({
  open,
  onOpenChange,
  propertyStatus,
}: PropertyStatusDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {propertyStatus ? 'Edit Property Status' : 'Create Property Status'}
          </DialogTitle>

          <DialogDescription>
            Enter property status information.
          </DialogDescription>
        </DialogHeader>

        <PropertyStatusForm
          propertyStatus={propertyStatus}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
