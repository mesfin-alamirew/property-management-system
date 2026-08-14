'use client';

import type { WoredaWithZone } from '../types/woreda.types';

import type { LookupOption } from '@/types/lookup-option';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { WoredaForm } from './woreda-form';

type WoredaDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  woreda: WoredaWithZone | null;

  zones: LookupOption[];
};

export function WoredaDialog({
  open,
  onOpenChange,
  woreda,
  zones,
}: WoredaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{woreda ? 'Edit Woreda' : 'Create Woreda'}</DialogTitle>

          <DialogDescription>Enter woreda information.</DialogDescription>
        </DialogHeader>

        <WoredaForm
          woreda={woreda}
          zones={zones}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
