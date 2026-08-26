'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { UnregisteredAssetObservationForm } from './unregistered-asset-observation-form';

type AssetLocationOption = {
  id: string;
  code: string;
  name: string;
};

type AssetConditionOption = {
  id: string;
  code: string;
  name: string;
};

type UnregisteredAssetObservationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  verificationId: string;

  assetLocations: AssetLocationOption[];

  assetConditions: AssetConditionOption[];
};

export function UnregisteredAssetObservationDialog({
  open,
  onOpenChange,
  verificationId,
  assetLocations,
  assetConditions,
}: UnregisteredAssetObservationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Record Unregistered Asset Observation</DialogTitle>

          <DialogDescription>
            Record an asset that was physically observed but is not included in
            the registered verification items.
          </DialogDescription>
        </DialogHeader>

        <UnregisteredAssetObservationForm
          verificationId={verificationId}
          assetLocations={assetLocations}
          assetConditions={assetConditions}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
