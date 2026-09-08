'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createBuildingCondition,
  updateBuildingCondition,
  deactivateBuildingCondition,
} from '../commands/building-condition.commands';

import { buildingConditionSchema } from '../schemas/building-condition.schema';
import { requireCurrentUser } from '@/lib/auth/require-current-user';

import { BuildingCondition } from '@/generated/prisma/browser';

export async function createBuildingConditionAction(
  formData: unknown,
): Promise<ActionResult<BuildingCondition>> {
  try {
    const data = buildingConditionSchema.parse(formData);
    const user = await requireCurrentUser();

    const result = await createBuildingCondition(user.id, data);

    revalidatePath('/building-condition');

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

export async function updateBuildingConditionAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<BuildingCondition>> {
  try {
    const data = buildingConditionSchema.parse(formData);
    const user = await requireCurrentUser();
    const result = await updateBuildingCondition(user.id, id, data);

    revalidatePath('/building-condition');

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

export async function deactivateBuildingConditionAction(
  id: string,
): Promise<ActionResult<BuildingCondition>> {
  try {
    const user = await requireCurrentUser();
    const result = await deactivateBuildingCondition(user.id, id);

    revalidatePath('/building-condition');

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
