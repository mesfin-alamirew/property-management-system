'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createAssetCondition,
  updateAssetCondition,
  deactivateAssetCondition,
} from '../commands/asset-condition.commands';

import { assetConditionSchema } from '../schemas/asset-condition.schema';

type AssetConditionActionData = {
  id: string;
};

export async function createAssetConditionAction(
  formData: unknown,
): Promise<ActionResult<AssetConditionActionData>> {
  try {
    const data = assetConditionSchema.parse(formData);

    const result = await createAssetCondition(data);

    revalidatePath('/asset-conditions');

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

export async function updateAssetConditionAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<AssetConditionActionData>> {
  try {
    const data = assetConditionSchema.parse(formData);

    const result = await updateAssetCondition(id, data);

    revalidatePath('/asset-conditions');

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

export async function deactivateAssetConditionAction(
  id: string,
): Promise<ActionResult<AssetConditionActionData>> {
  try {
    const result = await deactivateAssetCondition(id);

    revalidatePath('/asset-conditions');

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
