'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { AcquisitionItemWithRelations } from '../types/acquisition-item.types';

import { AcquisitionItemForm } from './acquisition-item-form';

type AcquisitionItemDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  acquisitionItem?: AcquisitionItemWithRelations | null;

  acquisitions: {
    id: string;
    acquisitionNumber: string;
  }[];

  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];
};

export function AcquisitionItemDialog({
  open,
  onOpenChange,
  acquisitionItem,
  acquisitions,
  assets,
}: AcquisitionItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {acquisitionItem ? 'Edit Acquisition Item' : 'Add Acquisition Item'}
          </DialogTitle>

          <DialogDescription className="pt-2">
            {acquisitionItem
              ? 'Update the acquisition and cost information for this asset.'
              : 'Associate an asset with an acquisition and record its costs.'}
          </DialogDescription>
        </DialogHeader>

        <AcquisitionItemForm
          acquisitionItem={acquisitionItem}
          acquisitions={acquisitions}
          assets={assets}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
