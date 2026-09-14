'use client';

import type { BuildingSpaceType } from '@/generated/prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { BuildingSpaceTypeForm } from './building-space-type-form';

type BuildingSpaceTypeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spaceType: BuildingSpaceType | null;
};

export function BuildingSpaceTypeDialog({
  open,
  onOpenChange,
  spaceType,
}: BuildingSpaceTypeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {spaceType
              ? 'Edit Building Space Type'
              : 'Create Building Space Type'}
          </DialogTitle>

          <DialogDescription>
            {spaceType
              ? 'Update the building space type information.'
              : 'Enter the information required to create a building space type.'}
          </DialogDescription>
        </DialogHeader>

        <div className="pt-2">
          <BuildingSpaceTypeForm
            spaceType={spaceType}
            onSuccess={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
