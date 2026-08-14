'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import { createAsset, updateAsset } from '../commands/asset.commands';

import { assetSchema } from '../schemas/asset.schema';

type AssetActionData = {
  id: string;
  assetCode: string;
};

export async function createAssetAction(
  formData: unknown,
): Promise<ActionResult<AssetActionData>> {
  try {
    const data = assetSchema.parse(formData);

    const result = await createAsset(data);

    revalidatePath('/assets');

    return {
      success: true,
      data: {
        id: result.id,
        assetCode: result.assetCode,
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

export async function updateAssetAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<AssetActionData>> {
  try {
    const data = assetSchema.parse(formData);

    const result = await updateAsset(id, data);

    revalidatePath('/assets');

    return {
      success: true,
      data: {
        id: result.id,
        assetCode: result.assetCode,
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
