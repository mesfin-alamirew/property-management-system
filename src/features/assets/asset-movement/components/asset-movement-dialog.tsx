'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { AssetMovementForm } from './asset-movement-form';

type AssetMovementDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];

  locations: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AssetMovementDialog({
  open,
  onOpenChange,
  assets,
  locations,
}: AssetMovementDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Move Asset</DialogTitle>

          <DialogDescription>
            Select an asset and its destination location.
          </DialogDescription>
        </DialogHeader>

        <AssetMovementForm
          assets={assets}
          locations={locations}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
