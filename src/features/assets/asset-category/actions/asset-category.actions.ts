'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createAssetCategory,
  updateAssetCategory,
  deactivateAssetCategory,
} from '../commands/asset-category.commands';

import { assetCategorySchema } from '../schemas/asset-category.schema';

type AssetCategoryActionData = {
  id: string;
};

export async function createAssetCategoryAction(
  formData: unknown,
): Promise<ActionResult<AssetCategoryActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = assetCategorySchema.parse(formData);

    const result = await createAssetCategory(user.id, data);

    revalidatePath('/asset-categories');

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

export async function updateAssetCategoryAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<AssetCategoryActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = assetCategorySchema.parse(formData);

    const result = await updateAssetCategory(user.id, id, data);

    revalidatePath('/asset-categories');

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

export async function deactivateAssetCategoryAction(
  id: string,
): Promise<ActionResult<AssetCategoryActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivateAssetCategory(user.id, id);

    revalidatePath('/asset-categories');

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
