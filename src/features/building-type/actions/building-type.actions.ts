'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

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

    const result = await createBuildingType(data);

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

    const result = await updateBuildingType(id, data);

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
    const result = await deactivateBuildingType(id);

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
