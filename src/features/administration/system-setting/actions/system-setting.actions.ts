'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import { requireCurrentUser } from '@/lib/auth/require-current-user';

import { updateSystemSetting } from '../commands/system-setting.commands';
import { updateSystemSettingSchema } from '../schemas/system-setting.schema';

type SystemSettingActionData = {
  id: string;
};

export async function updateSystemSettingAction(
  formData: unknown,
): Promise<ActionResult<SystemSettingActionData>> {
  try {
    const data = updateSystemSettingSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await updateSystemSetting(user.id, data.key, data.value);

    revalidatePath('/administration/system-settings');

    return {
      success: true,
      data: {
        id: result.id,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}
