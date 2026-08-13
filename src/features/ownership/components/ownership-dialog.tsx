'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { OwnershipWithRelations } from '../types/ownership.types';

import { OwnershipForm } from './ownership-form';

type OwnershipDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  ownership?: OwnershipWithRelations | null;

  properties: {
    id: string;
    propertyCode: string;
    name: string;
  }[];

  ownershipTypes: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function OwnershipDialog({
  open,
  onOpenChange,
  ownership,
  properties,
  ownershipTypes,
}: OwnershipDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {ownership ? 'Edit Ownership' : 'Create Ownership'}
          </DialogTitle>

          <DialogDescription>Enter ownership information.</DialogDescription>
        </DialogHeader>

        <OwnershipForm
          ownership={ownership}
          properties={properties}
          ownershipTypes={ownershipTypes}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
