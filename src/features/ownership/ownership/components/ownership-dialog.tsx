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
  const isEditing = Boolean(ownership);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Ownership' : 'Create Ownership'}
          </DialogTitle>

          <DialogDescription className="pt-2">
            {isEditing
              ? 'Update the ownership record and its related legal and acquisition information.'
              : 'Create a property ownership record and provide its ownership, acquisition, and legal information.'}
          </DialogDescription>
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
