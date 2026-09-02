'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { DisposalItemWithRelations } from '../types/disposal-item.types';

import { DisposalItemForm } from './disposal-item-form';

type DisposalItemDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  disposalItem?: DisposalItemWithRelations | null;

  disposalId: string;

  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];
};

export function DisposalItemDialog({
  open,
  onOpenChange,
  disposalItem,
  disposalId,
  assets,
}: DisposalItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {disposalItem ? 'Edit Disposal Item' : 'Add Disposal Item'}
          </DialogTitle>

          <DialogDescription>
            {disposalItem
              ? 'Update disposal item information.'
              : 'Select the asset to add to this disposal.'}
          </DialogDescription>
        </DialogHeader>

        <DisposalItemForm
          disposalItem={disposalItem}
          disposalId={disposalId}
          assets={assets}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
