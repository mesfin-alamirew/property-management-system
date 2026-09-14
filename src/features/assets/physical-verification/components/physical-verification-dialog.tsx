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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Physical Verification</DialogTitle>

          <DialogDescription className="pt-2">
            Define the verification scope, organizational or location
            boundaries, schedule, and any additional notes.
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
