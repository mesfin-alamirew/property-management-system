'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { AssetAssignmentForm } from './asset-assignment-form';

type AssetAssignmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];

  employees: {
    id: string;
    employeeNumber: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
  }[];
};

export function AssetAssignmentDialog({
  open,
  onOpenChange,
  assets,
  employees,
}: AssetAssignmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Asset</DialogTitle>

          <DialogDescription>
            Assign an available asset to an active employee.
          </DialogDescription>
        </DialogHeader>

        <div className="pt-2">
          <AssetAssignmentForm
            assets={assets}
            employees={employees}
            onSuccess={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
