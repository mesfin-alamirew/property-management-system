'use client';

import type { ZoneWithRegion } from '../types/zone.types';

import type { LookupOption } from '@/types/lookup-option';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { ZoneForm } from './zone-form';

type ZoneDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  zone: ZoneWithRegion | null;

  regions: LookupOption[];
};

export function ZoneDialog({
  open,
  onOpenChange,
  zone,
  regions,
}: ZoneDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{zone ? 'Edit Zone' : 'Create Zone'}</DialogTitle>

          <DialogDescription>Enter zone information.</DialogDescription>
        </DialogHeader>

        <ZoneForm
          zone={zone}
          regions={regions}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
