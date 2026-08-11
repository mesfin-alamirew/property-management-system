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

type BuildingActionData = {
  id: string;
};

export async function createBuildingAction(
  formData: unknown,
): Promise<ActionResult<BuildingActionData>> {
  try {
    const data = buildingSchema.parse(formData);

    const result = await createBuilding(data);

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

    const result = await updateBuilding(id, data);

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
    const result = await deactivateBuilding(id);

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
