'use server';

import { revalidatePath } from 'next/cache';

import { regionSchema } from '../schemas/region.schema';

import {
  createRegion,
  updateRegion,
  deactivateRegion,
} from '../commands/region.commands';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import type { ActionResult } from '@/types/action-result';
import type { Region } from '@/generated/prisma/client';

export async function createRegionAction(
  formData: unknown,
): Promise<ActionResult<Region>> {
  try {
    const user = await requireCurrentUser();

    const data = regionSchema.parse(formData);

    const result = await createRegion(user.id, data);

    revalidatePath('/regions');

    return {
      success: true,
      data: result,
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

export async function updateRegionAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<Region>> {
  try {
    const user = await requireCurrentUser();

    const data = regionSchema.parse(formData);

    const result = await updateRegion(user.id, id, data);

    revalidatePath('/regions');

    return {
      success: true,
      data: result,
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

export async function deactivateRegionAction(
  id: string,
): Promise<ActionResult<Region>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivateRegion(user.id, id);

    revalidatePath('/regions');

    return {
      success: true,
      data: result,
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
