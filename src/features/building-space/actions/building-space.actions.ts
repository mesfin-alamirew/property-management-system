'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createBuildingSpace,
  updateBuildingSpace,
  deactivateBuildingSpace,
} from '../commands/building-space.commands';

import { buildingSpaceSchema } from '../schemas/building-space.schema';

type BuildingSpaceActionData = {
  id: string;
};

export async function createBuildingSpaceAction(
  formData: unknown,
): Promise<ActionResult<BuildingSpaceActionData>> {
  try {
    const data = buildingSpaceSchema.parse(formData);

    const result = await createBuildingSpace(data);

    revalidatePath('/building-spaces');

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

export async function updateBuildingSpaceAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<BuildingSpaceActionData>> {
  try {
    const data = buildingSpaceSchema.parse(formData);

    const result = await updateBuildingSpace(id, data);

    revalidatePath('/building-spaces');

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

export async function deactivateBuildingSpaceAction(
  id: string,
): Promise<ActionResult<BuildingSpaceActionData>> {
  try {
    const result = await deactivateBuildingSpace(id);

    revalidatePath('/building-spaces');

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
