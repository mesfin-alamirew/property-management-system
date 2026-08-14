'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { AssetStatusWithRelations } from '../types/asset-status.types';

import { AssetStatusForm } from './asset-status-form';

type AssetStatusDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  assetStatus?: AssetStatusWithRelations | null;
};

export function AssetStatusDialog({
  open,
  onOpenChange,
  assetStatus,
}: AssetStatusDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {assetStatus ? 'Edit Asset Status' : 'Create Asset Status'}
          </DialogTitle>

          <DialogDescription>Enter asset status information.</DialogDescription>
        </DialogHeader>

        <AssetStatusForm
          assetStatus={assetStatus}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
