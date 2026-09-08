'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';
import { requireCurrentUser } from '@/lib/auth/require-current-user';

import {
  createBuildingType,
  updateBuildingType,
  deactivateBuildingType,
} from '../commands/building-type.commands';

import { buildingTypeSchema } from '../schemas/building-type.schema';

import { BuildingType } from '@/generated/prisma/browser';

export async function createBuildingTypeAction(
  formData: unknown,
): Promise<ActionResult<BuildingType>> {
  try {
    const data = buildingTypeSchema.parse(formData);
    const user = await requireCurrentUser();

    const result = await createBuildingType(user.id, data);

    revalidatePath('/building-type');

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

export async function updateBuildingTypeAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<BuildingType>> {
  try {
    const data = buildingTypeSchema.parse(formData);
    const user = await requireCurrentUser();

    const result = await updateBuildingType(user.id, id, data);

    revalidatePath('/building-type');

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

export async function deactivateBuildingTypeAction(
  id: string,
): Promise<ActionResult<BuildingType>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivateBuildingType(user.id, id);

    revalidatePath('/building-type');

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
