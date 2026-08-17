'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { AcquisitionMethodListItem } from '../types/acquisition-method.types';

import { AcquisitionMethodForm } from './acquisition-method-form';

type AcquisitionMethodDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  acquisitionMethod?: AcquisitionMethodListItem | null;
};

export function AcquisitionMethodDialog({
  open,
  onOpenChange,
  acquisitionMethod,
}: AcquisitionMethodDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {acquisitionMethod
              ? 'Edit Acquisition Method'
              : 'Create Acquisition Method'}
          </DialogTitle>

          <DialogDescription>
            Enter acquisition method information.
          </DialogDescription>
        </DialogHeader>

        <AcquisitionMethodForm
          acquisitionMethod={acquisitionMethod}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
