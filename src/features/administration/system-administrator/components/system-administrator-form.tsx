'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { SelectField } from '@/components/form/select-field';

import {
  assignSystemAdministratorSchema,
  type AssignSystemAdministratorFormData,
} from '../schemas/system-administrator.schema';

import { assignSystemAdministratorAction } from '../actions/system-administrator.actions';

type AssignableUser = {
  id: string;
  username: string;
  displayName: string;
};

type SystemAdministratorFormProps = {
  users: AssignableUser[];
  onSuccess?: () => void;
};

export function SystemAdministratorForm({
  users,
  onSuccess,
}: SystemAdministratorFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AssignSystemAdministratorFormData>({
    resolver: zodResolver(assignSystemAdministratorSchema),
    defaultValues: {
      targetUserId: '',
    },
  });

  async function onSubmit(data: AssignSystemAdministratorFormData) {
    const result = await assignSystemAdministratorAction(data);

    if (result.success) {
      toast.success('System Administrator assigned successfully');

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  const options = users.map((user) => ({
    value: user.id,
    label: `${user.displayName} (${user.username})`,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">System Administrator</h3>

        <SelectField
          label="User"
          options={options}
          placeholder="Select a user"
          required
          disabled={isSubmitting}
          error={errors.targetUserId?.message}
          {...register('targetUserId')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting || users.length === 0}>
        {isSubmitting ? 'Assigning...' : 'Assign System Administrator'}
      </Button>
    </form>
  );
}
