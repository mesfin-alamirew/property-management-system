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
  const isEditing = Boolean(acquisition);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Acquisition' : 'Register Acquisition'}
          </DialogTitle>

          <DialogDescription className="pt-2">
            {isEditing
              ? 'Update the acquisition information below.'
              : 'Enter the information required to register an asset acquisition.'}
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
