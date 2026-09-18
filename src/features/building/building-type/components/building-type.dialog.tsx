'use client';

import type { BuildingType } from '@/generated/prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { BuildingTypeForm } from './building-type.form';

type BuildingTypeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buildingType: BuildingType | null;
};

export function BuildingTypeDialog({
  open,
  onOpenChange,
  buildingType,
}: BuildingTypeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {buildingType ? 'Edit Building Type' : 'Create Building Type'}
          </DialogTitle>

          <DialogDescription>
            {buildingType
              ? 'Update the building type information.'
              : 'Enter the information required to create a building type.'}
          </DialogDescription>
        </DialogHeader>

        <div className="pt-2">
          <BuildingTypeForm
            buildingType={buildingType}
            onSuccess={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
