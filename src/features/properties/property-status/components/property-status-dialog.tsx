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
  const isEditing = Boolean(propertyStatus);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Property Status' : 'Create Property Status'}
          </DialogTitle>

          <DialogDescription className="pt-2">
            {isEditing
              ? 'Update the property status code, name, and description.'
              : 'Create a property status and provide its identifying information.'}
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
