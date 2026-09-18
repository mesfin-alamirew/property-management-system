'use client';

import type { BuildingCondition } from '@/generated/prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { BuildingConditionForm } from './building-condition.form';

type BuildingConditionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buildingCondition: BuildingCondition | null;
};

export function BuildingConditionDialog({
  open,
  onOpenChange,
  buildingCondition,
}: BuildingConditionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {buildingCondition
              ? 'Edit Building Condition'
              : 'Create Building Condition'}
          </DialogTitle>

          <DialogDescription>
            {buildingCondition
              ? 'Update the building condition information.'
              : 'Enter the information required to create a building condition.'}
          </DialogDescription>
        </DialogHeader>

        <div className="pt-2">
          <BuildingConditionForm
            buildingCondition={buildingCondition}
            onSuccess={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
