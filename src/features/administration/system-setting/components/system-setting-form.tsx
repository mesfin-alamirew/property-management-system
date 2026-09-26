'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';

import {
  updateSystemSettingSchema,
  type UpdateSystemSettingFormData,
} from '../schemas/system-setting.schema';

import { updateSystemSettingAction } from '../actions/system-setting.actions';

import type { SystemSettingRecord } from '../types/system-setting.types';

type SystemSettingFormProps = {
  setting: SystemSettingRecord;
  onSuccess?: () => void;
};

export function SystemSettingForm({
  setting,
  onSuccess,
}: SystemSettingFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateSystemSettingFormData>({
    resolver: zodResolver(updateSystemSettingSchema),
    defaultValues: {
      key: setting.key as UpdateSystemSettingFormData['key'],
      value: setting.value,
    },
  });

  async function onSubmit(data: UpdateSystemSettingFormData) {
    const result = await updateSystemSettingAction(data);

    if (result.success) {
      toast.success('System setting updated successfully');

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" {...register('key')} />

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Document Upload Settings</h3>

        <TextField
          label="Maximum Document File Size (MB)"
          type="number"
          min={1}
          step={1}
          required
          disabled={isSubmitting}
          error={errors.value?.message}
          {...register('value')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
