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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {ownershipType ? 'Edit Ownership Type' : 'Create Ownership Type'}
          </DialogTitle>

          <DialogDescription>
            Enter ownership type information.
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
