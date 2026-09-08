'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import {
  createOwnership,
  updateOwnership,
  deactivateOwnership,
} from '../commands/ownership.commands';

import { ownershipSchema } from '../schemas/ownership.schema';

type OwnershipActionData = {
  id: string;
};

export async function createOwnershipAction(
  formData: unknown,
): Promise<ActionResult<OwnershipActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = ownershipSchema.parse(formData);

    const result = await createOwnership(user.id, data);

    revalidatePath('/ownership');

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

export async function updateOwnershipAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<OwnershipActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = ownershipSchema.parse(formData);

    const result = await updateOwnership(user.id, id, data);

    revalidatePath('/ownership');

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

export async function deactivateOwnershipAction(
  id: string,
): Promise<ActionResult<OwnershipActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivateOwnership(user.id, id);

    revalidatePath('/ownership');

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
