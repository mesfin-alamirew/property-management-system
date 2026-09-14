'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { BuildingWithRelations } from '../types/building.types';

import { BuildingForm } from './building-form';

type BuildingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  building?: BuildingWithRelations | null;

  properties: {
    id: string;
    propertyCode: string;
    name: string;
  }[];

  buildingTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  buildingConditions: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function BuildingDialog({
  open,
  onOpenChange,
  building,
  properties,
  buildingTypes,
  buildingConditions,
}: BuildingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {building ? 'Edit Building' : 'Create Building'}
          </DialogTitle>

          <DialogDescription>
            {building
              ? 'Update building information.'
              : 'Enter the information required to create a building.'}
          </DialogDescription>
        </DialogHeader>

        <div className="pt-2">
          <BuildingForm
            building={building}
            properties={properties}
            buildingTypes={buildingTypes}
            buildingConditions={buildingConditions}
            onSuccess={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
