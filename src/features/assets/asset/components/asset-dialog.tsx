'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { AssetWithRelations } from '../types/asset.types';

import { AssetForm } from './asset-form';

type AssetDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  asset?: AssetWithRelations | null;

  assetTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  assetStatuses: {
    id: string;
    code: string;
    name: string;
  }[];

  assetConditions: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AssetDialog({
  open,
  onOpenChange,
  asset,
  assetTypes,
  assetStatuses,
  assetConditions,
}: AssetDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{asset ? 'Edit Asset' : 'Register Asset'}</DialogTitle>

          <DialogDescription>
            {asset
              ? 'Update asset information.'
              : 'Enter the information required to register an asset.'}
          </DialogDescription>
        </DialogHeader>

        <AssetForm
          asset={asset}
          assetTypes={assetTypes}
          assetStatuses={assetStatuses}
          assetConditions={assetConditions}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
