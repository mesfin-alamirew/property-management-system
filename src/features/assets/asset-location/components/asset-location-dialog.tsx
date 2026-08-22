'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { AssetLocationWithRelations } from '../types/asset-location.types';

import { AssetLocationForm } from './asset-location-form';

type AssetLocationDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  assetLocation?: AssetLocationWithRelations | null;

  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AssetLocationDialog({
  open,
  onOpenChange,
  assetLocation,
  organizationUnits,
}: AssetLocationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {assetLocation ? 'Edit Asset Location' : 'Create Asset Location'}
          </DialogTitle>

          <DialogDescription>
            Enter asset location information.
          </DialogDescription>
        </DialogHeader>

        <AssetLocationForm
          assetLocation={assetLocation}
          organizationUnits={organizationUnits}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
