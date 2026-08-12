'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createBuildingSpaceType,
  updateBuildingSpaceType,
  deactivateBuildingSpaceType,
} from '../commands/building-space-type.commands';

import { buildingSpaceTypeSchema } from '../schemas/building-space-type.schema';

type BuildingSpaceTypeActionData = {
  id: string;
};

export async function createBuildingSpaceTypeAction(
  formData: unknown,
): Promise<ActionResult<BuildingSpaceTypeActionData>> {
  try {
    const data = buildingSpaceTypeSchema.parse(formData);

    const result = await createBuildingSpaceType(data);

    revalidatePath('/building-space-types');

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

export async function updateBuildingSpaceTypeAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<BuildingSpaceTypeActionData>> {
  try {
    const data = buildingSpaceTypeSchema.parse(formData);

    const result = await updateBuildingSpaceType(id, data);

    revalidatePath('/building-space-types');

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

export async function deactivateBuildingSpaceTypeAction(
  id: string,
): Promise<ActionResult<BuildingSpaceTypeActionData>> {
  try {
    const result = await deactivateBuildingSpaceType(id);

    revalidatePath('/building-space-types');

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
