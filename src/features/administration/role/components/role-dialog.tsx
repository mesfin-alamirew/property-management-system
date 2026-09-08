'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { RoleListItem } from '../types/role.types';

import { RoleForm } from './role-form';

type RoleDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  role?: RoleListItem | null;
};

export function RoleDialog({ open, onOpenChange, role }: RoleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{role ? 'Edit Role' : 'Create Role'}</DialogTitle>

          <DialogDescription>Enter role information.</DialogDescription>
        </DialogHeader>

        <RoleForm role={role} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
