'use client';

import type { Country } from '@/generated/prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CountryForm } from './country-form';

type CountryDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  country: Country | null;
};

export function CountryDialog({
  open,
  onOpenChange,
  country,
}: CountryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {country ? 'Edit Country' : 'Create Country'}
          </DialogTitle>

          <DialogDescription>Enter country information.</DialogDescription>
        </DialogHeader>

        <CountryForm country={country} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
