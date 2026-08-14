'use client';

import type { PropertyTenure } from '@/generated/prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { PropertyTenureForm } from './property-tenure-form';

type PropertyTenureDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  propertyTenure: PropertyTenure | null;
};

export function PropertyTenureDialog({
  open,
  onOpenChange,
  propertyTenure,
}: PropertyTenureDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {propertyTenure ? 'Edit Property Tenure' : 'Create Property Tenure'}
          </DialogTitle>

          <DialogDescription>
            Enter property tenure information.
          </DialogDescription>
        </DialogHeader>

        <PropertyTenureForm
          propertyTenure={propertyTenure}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
