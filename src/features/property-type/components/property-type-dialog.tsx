'use client';

import type { PropertyType } from '@/generated/prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { PropertyTypeForm } from './property-type-form';

type PropertyTypeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyType: PropertyType | null;
};

export function PropertyTypeDialog({
  open,
  onOpenChange,
  propertyType,
}: PropertyTypeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {propertyType ? 'Edit Property Type' : 'Create Property Type'}
          </DialogTitle>

          <DialogDescription>
            Enter the property type information.
          </DialogDescription>
        </DialogHeader>

        <PropertyTypeForm
          propertyType={propertyType}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
