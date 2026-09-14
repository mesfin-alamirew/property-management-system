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
  const isEditing = Boolean(propertyTenure);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Property Tenure' : 'Create Property Tenure'}
          </DialogTitle>

          <DialogDescription className="pt-2">
            {isEditing
              ? 'Update the property tenure code, name, and description.'
              : 'Create a property tenure and provide its identifying information.'}
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
