'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { AssetConditionWithRelations } from '../types/asset-condition.types';

import { AssetConditionForm } from './asset-condition-form';

type AssetConditionDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  assetCondition?: AssetConditionWithRelations | null;
};

export function AssetConditionDialog({
  open,
  onOpenChange,
  assetCondition,
}: AssetConditionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {assetCondition ? 'Edit Asset Condition' : 'Create Asset Condition'}
          </DialogTitle>

          <DialogDescription>
            Enter asset condition information.
          </DialogDescription>
        </DialogHeader>

        <AssetConditionForm
          assetCondition={assetCondition}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
