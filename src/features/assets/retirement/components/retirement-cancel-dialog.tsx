'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { RetirementCancelForm } from './retirement-cancel-form';

import type { RetirementWithRelations } from '../types/retirement.types';

type RetirementCancelDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  retirement: RetirementWithRelations | null;
  onSuccess: () => void;
};

export function RetirementCancelDialog({
  open,
  onOpenChange,
  retirement,
  onSuccess,
}: RetirementCancelDialogProps) {
  if (!retirement) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cancel Retirement</DialogTitle>

          <DialogDescription>
            Cancel retirement{' '}
            <span className="font-medium">{retirement.referenceNumber}</span>.
            Please provide a reason for the cancellation.
          </DialogDescription>
        </DialogHeader>

        <RetirementCancelForm
          retirementId={retirement.id}
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
