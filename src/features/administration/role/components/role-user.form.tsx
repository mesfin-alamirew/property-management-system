'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { assignRoleToUserAction } from '../actions/role.actions';

import { Button } from '@/components/ui/button';

type AssignableUser = {
  id: string;
  username: string;
  displayName: string;
};

type RoleUserFormProps = {
  roleId: string;
  users: AssignableUser[];
  assignedUserIds: string[];
  disabled?: boolean;
};

export function RoleUserForm({
  roleId,
  users,
  assignedUserIds,
  disabled = false,
}: RoleUserFormProps) {
  const router = useRouter();

  const [userId, setUserId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableUsers = users.filter(
    (user) => !assignedUserIds.includes(user.id),
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userId) {
      toast.error('Select a user');
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await assignRoleToUserAction(userId, roleId);

      if (result.success) {
        toast.success('Role assigned successfully');

        setUserId('');
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="userId" className="mb-2 block text-sm font-medium">
          User
        </label>

        <select
          id="userId"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          disabled={disabled || isSubmitting || availableUsers.length === 0}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Select user</option>

          {availableUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.displayName} — {user.username}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" disabled={disabled || isSubmitting || !userId}>
        {isSubmitting ? 'Assigning...' : 'Assign User'}
      </Button>

      {availableUsers.length === 0 && (
        <p className="text-sm text-muted-foreground">
          There are no available active users to assign to this role.
        </p>
      )}
    </form>
  );
}
