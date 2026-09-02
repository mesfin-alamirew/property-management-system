'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { DisposalForm } from './disposal-form';

type DisposalDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;
};

export function DisposalDialog({ open, onOpenChange }: DisposalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Disposal</DialogTitle>

          <DialogDescription>
            Enter the information required to create an asset disposal record.
          </DialogDescription>
        </DialogHeader>

        <DisposalForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
