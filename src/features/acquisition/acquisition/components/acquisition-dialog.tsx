'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { AcquisitionWithRelations } from '../types/acquisition.types';

import { AcquisitionForm } from './acquisition-form';

type AcquisitionDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  acquisition?: AcquisitionWithRelations | null;

  acquisitionMethods: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AcquisitionDialog({
  open,
  onOpenChange,
  acquisition,
  acquisitionMethods,
}: AcquisitionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {acquisition ? 'Edit Acquisition' : 'Register Acquisition'}
          </DialogTitle>

          <DialogDescription>
            {acquisition
              ? 'Update acquisition information.'
              : 'Enter the information required to register an acquisition.'}
          </DialogDescription>
        </DialogHeader>

        <AcquisitionForm
          acquisition={acquisition}
          acquisitionMethods={acquisitionMethods}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
