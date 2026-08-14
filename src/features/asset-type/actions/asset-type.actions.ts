'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createAssetType,
  updateAssetType,
  deactivateAssetType,
} from '../commands/asset-type.commands';

import { assetTypeSchema } from '../schemas/asset-type.schema';

type AssetTypeActionData = {
  id: string;
};

export async function createAssetTypeAction(
  formData: unknown,
): Promise<ActionResult<AssetTypeActionData>> {
  try {
    const data = assetTypeSchema.parse(formData);

    const result = await createAssetType(data);

    revalidatePath('/asset-types');

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

export async function updateAssetTypeAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<AssetTypeActionData>> {
  try {
    const data = assetTypeSchema.parse(formData);

    const result = await updateAssetType(id, data);

    revalidatePath('/asset-types');

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

export async function deactivateAssetTypeAction(
  id: string,
): Promise<ActionResult<AssetTypeActionData>> {
  try {
    const result = await deactivateAssetType(id);

    revalidatePath('/asset-types');

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
