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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {acquisitionMethod
              ? 'Edit Acquisition Method'
              : 'Create Acquisition Method'}
          </DialogTitle>

          <DialogDescription className="pt-2">
            {acquisitionMethod
              ? 'Update the acquisition method details and status.'
              : 'Define a method that can be used when registering asset acquisitions.'}
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
