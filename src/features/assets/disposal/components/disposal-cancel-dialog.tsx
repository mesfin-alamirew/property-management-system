'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { DisposalCancelForm } from './disposal-cancel-form';

import type { DisposalWithRelations } from '../types/disposal.types';

type DisposalCancelDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disposal: DisposalWithRelations | null;
  onSuccess: () => void;
};

export function DisposalCancelDialog({
  open,
  onOpenChange,
  disposal,
  onSuccess,
}: DisposalCancelDialogProps) {
  if (!disposal) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cancel Disposal</DialogTitle>

          <DialogDescription>
            Cancel disposal{' '}
            <span className="font-medium">{disposal.referenceNumber}</span>.
            Please provide a reason for the cancellation.
          </DialogDescription>
        </DialogHeader>

        <DisposalCancelForm
          disposalId={disposal.id}
          onSuccess={() => {
            onSuccess();
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
