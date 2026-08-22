'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { PhysicalVerificationForm } from './physical-verification-form';

type PhysicalVerificationDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];

  locations: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function PhysicalVerificationDialog({
  open,
  onOpenChange,
  organizationUnits,
  locations,
}: PhysicalVerificationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Physical Verification</DialogTitle>

          <DialogDescription>
            Define the scope, location, organization unit, and schedule for the
            physical verification.
          </DialogDescription>
        </DialogHeader>

        <PhysicalVerificationForm
          organizationUnits={organizationUnits}
          locations={locations}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
