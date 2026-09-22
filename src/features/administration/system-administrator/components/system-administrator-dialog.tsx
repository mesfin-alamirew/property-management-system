'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { SystemAdministratorForm } from './system-administrator-form';

type AssignableUser = {
  id: string;
  username: string;
  displayName: string;
};

type SystemAdministratorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  users: AssignableUser[];
};

export function SystemAdministratorDialog({
  open,
  onOpenChange,
  users,
}: SystemAdministratorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign System Administrator</DialogTitle>

          <DialogDescription>
            Select an active PMS user with an Azure AD identity to assign the
            System Administrator role.
          </DialogDescription>
        </DialogHeader>

        <SystemAdministratorForm
          users={users}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
