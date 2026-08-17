'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createOwnershipType,
  updateOwnershipType,
  deactivateOwnershipType,
} from '../commands/ownership-type.commands';

import { ownershipTypeSchema } from '../schemas/ownership-type.schema';

type OwnershipTypeActionData = {
  id: string;
};

export async function createOwnershipTypeAction(
  formData: unknown,
): Promise<ActionResult<OwnershipTypeActionData>> {
  try {
    const data = ownershipTypeSchema.parse(formData);

    const result = await createOwnershipType(data);

    revalidatePath('/ownership-types');

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

export async function updateOwnershipTypeAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<OwnershipTypeActionData>> {
  try {
    const data = ownershipTypeSchema.parse(formData);

    const result = await updateOwnershipType(id, data);

    revalidatePath('/ownership-types');

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

export async function deactivateOwnershipTypeAction(
  id: string,
): Promise<ActionResult<OwnershipTypeActionData>> {
  try {
    const result = await deactivateOwnershipType(id);

    revalidatePath('/ownership-types');

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
