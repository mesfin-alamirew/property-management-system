'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createBuilding,
  updateBuilding,
  deactivateBuilding,
} from '../commands/building.commands';

import { buildingSchema } from '../schemas/building.schema';
import { requireCurrentUser } from '@/lib/auth/require-current-user';

type BuildingActionData = {
  id: string;
};

export async function createBuildingAction(
  formData: unknown,
): Promise<ActionResult<BuildingActionData>> {
  try {
    const data = buildingSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await createBuilding(user.id, data);

    revalidatePath('/building');

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

export async function updateBuildingAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<BuildingActionData>> {
  try {
    const data = buildingSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await updateBuilding(user.id, id, data);

    revalidatePath('/building');

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

export async function deactivateBuildingAction(
  id: string,
): Promise<ActionResult<BuildingActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivateBuilding(user.id, id);

    revalidatePath('/building');

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
