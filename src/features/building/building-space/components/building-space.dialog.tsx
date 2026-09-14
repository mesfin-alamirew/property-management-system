'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { BuildingSpaceWithRelations } from '../types/building-space.types';

import { BuildingSpaceForm } from './building-space.form';

type BuildingSpaceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  space?: BuildingSpaceWithRelations | null;

  buildings: {
    id: string;
    buildingCode: string;
    name: string;
  }[];

  spaceTypes: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function BuildingSpaceDialog({
  open,
  onOpenChange,
  space,
  buildings,
  spaceTypes,
}: BuildingSpaceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {space ? 'Edit Building Space' : 'Create Building Space'}
          </DialogTitle>

          <DialogDescription>
            {space
              ? 'Update the building space information.'
              : 'Enter the information required to create a building space.'}
          </DialogDescription>
        </DialogHeader>

        <div className="pt-2">
          <BuildingSpaceForm
            space={space}
            buildings={buildings}
            spaceTypes={spaceTypes}
            onSuccess={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
