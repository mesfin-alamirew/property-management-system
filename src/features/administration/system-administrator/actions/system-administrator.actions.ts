'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import { assignSystemAdministrator } from '../commands/assign-system-administrator';
import { removeSystemAdministrator } from '../commands/remove-system-administrator';
import { assignSystemAdministratorSchema } from '../schemas/system-administrator.schema';

type SystemAdministratorActionData = {
  id: string;
};

export async function assignSystemAdministratorAction(
  formData: unknown,
): Promise<ActionResult<SystemAdministratorActionData>> {
  try {
    const data = assignSystemAdministratorSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await assignSystemAdministrator(user.id, data.targetUserId);

    revalidatePath('/administration/system-administration');

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

export async function removeSystemAdministratorAction(
  targetUserId: string,
): Promise<ActionResult<SystemAdministratorActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await removeSystemAdministrator(user.id, targetUserId);

    revalidatePath('/administration/system-administration');

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
