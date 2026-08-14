'use client';

import type { BuildingSpaceType } from '@/generated/prisma/client';

import {
  Dialog,
  DialogContent,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {spaceType ? 'Edit Building Space Type' : 'Add Building Space Type'}
          </DialogTitle>
        </DialogHeader>

        <BuildingSpaceTypeForm
          spaceType={spaceType}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
