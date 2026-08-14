'use client';

import type { OrganizationUnit } from '@/generated/prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { OrganizationUnitForm } from './organization-unit-form';

type OrganizationUnitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  organizationUnit?: OrganizationUnit | null;

  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];

  countries: {
    id: string;
    name: string;
  }[];

  organizationUnitTypes: string[];
};

export function OrganizationUnitDialog({
  open,
  onOpenChange,
  organizationUnit,
  organizationUnits,
  countries,
  organizationUnitTypes,
}: OrganizationUnitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {organizationUnit
              ? 'Edit Organization Unit'
              : 'Create Organization Unit'}{' '}
          </DialogTitle>
          <DialogDescription>
            Enter organization unit information.
          </DialogDescription>
        </DialogHeader>
        <OrganizationUnitForm
          organizationUnit={organizationUnit}
          organizationUnits={organizationUnits}
          countries={countries}
          organizationUnitTypes={organizationUnitTypes}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
