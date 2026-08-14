'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { AssetTypeWithRelations } from '../types/asset-type.types';

import { AssetTypeForm } from './asset-type-form';

type AssetTypeDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  assetType?: AssetTypeWithRelations | null;

  assetCategories: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AssetTypeDialog({
  open,
  onOpenChange,
  assetType,
  assetCategories,
}: AssetTypeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {assetType ? 'Edit Asset Type' : 'Create Asset Type'}
          </DialogTitle>

          <DialogDescription>Enter asset type information.</DialogDescription>
        </DialogHeader>

        <AssetTypeForm
          assetType={assetType}
          assetCategories={assetCategories}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
