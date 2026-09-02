'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { RetirementForm } from './retirement-form';

type RetirementDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];

  conditions: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function RetirementDialog({
  open,
  onOpenChange,
  assets,
  conditions,
}: RetirementDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Retirement</DialogTitle>

          <DialogDescription>
            Enter the information required to create an asset retirement record.
          </DialogDescription>
        </DialogHeader>

        <RetirementForm
          assets={assets}
          conditions={conditions}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
