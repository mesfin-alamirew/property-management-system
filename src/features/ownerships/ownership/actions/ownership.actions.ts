'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
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
    const data = ownershipSchema.parse(formData);

    const result = await createOwnership(data);

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
    const data = ownershipSchema.parse(formData);

    const result = await updateOwnership(id, data);

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
    const result = await deactivateOwnership(id);

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
