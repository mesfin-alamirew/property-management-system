'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createDisposalItem,
  updateDisposalItem,
} from '../commands/disposal-item.commands';

import { disposalItemSchema } from '../schemas/disposal-item.schema';

type DisposalItemActionData = {
  id: string;
};

export async function createDisposalItemAction(
  formData: unknown,
): Promise<ActionResult<DisposalItemActionData>> {
  try {
    const data = disposalItemSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await createDisposalItem(user.id, data);

    revalidatePath('/disposals');

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

export async function updateDisposalItemAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<DisposalItemActionData>> {
  try {
    const data = disposalItemSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await updateDisposalItem(user.id, id, data);

    revalidatePath('/disposals');

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
