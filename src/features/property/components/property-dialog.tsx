'use client';

import type { Property } from '@/generated/prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { PropertyForm } from './property-form';

type PropertyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  property?: Property | null;

  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];

  propertyTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  propertyCategories: {
    id: string;
    code: string;
    name: string;
  }[];

  propertyTenures: {
    id: string;
    code: string;
    name: string;
  }[];

  propertyStatuses: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function PropertyDialog({
  open,
  onOpenChange,
  property,
  organizationUnits,
  propertyTypes,
  propertyCategories,
  propertyTenures,
  propertyStatuses,
}: PropertyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {property ? 'Edit Property' : 'Create Property'}
          </DialogTitle>

          <DialogDescription>Enter property information.</DialogDescription>
        </DialogHeader>

        <PropertyForm
          property={property}
          organizationUnits={organizationUnits}
          propertyTypes={propertyTypes}
          propertyCategories={propertyCategories}
          propertyTenures={propertyTenures}
          propertyStatuses={propertyStatuses}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
