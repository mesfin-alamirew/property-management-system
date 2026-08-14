'use client';

import type { Region } from '@/generated/prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { LookupOption } from '@/types/lookup-option';

import { RegionForm } from './region-form';

type RegionDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  region: Region | null;

  countries: LookupOption[];
};

export function RegionDialog({
  open,
  onOpenChange,
  region,
  countries,
}: RegionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{region ? 'Edit Region' : 'Create Region'}</DialogTitle>

          <DialogDescription>Enter region information.</DialogDescription>
        </DialogHeader>

        <RegionForm
          region={region}
          countries={countries}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
