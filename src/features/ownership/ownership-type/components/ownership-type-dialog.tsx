'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { OwnershipType } from '@/generated/prisma/client';

import { OwnershipTypeForm } from './ownership-type-form';

type OwnershipTypeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ownershipType?: OwnershipType | null;
};

export function OwnershipTypeDialog({
  open,
  onOpenChange,
  ownershipType,
}: OwnershipTypeDialogProps) {
  const isEditing = Boolean(ownershipType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Ownership Type' : 'Create Ownership Type'}
          </DialogTitle>

          <DialogDescription className="pt-2">
            {isEditing
              ? 'Update the ownership type code, name, and description.'
              : 'Create an ownership type and provide its identifying information.'}
          </DialogDescription>
        </DialogHeader>

        <OwnershipTypeForm
          ownershipType={ownershipType}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
