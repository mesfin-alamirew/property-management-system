'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
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
    const user = await requireCurrentUser();

    const data = assetConditionSchema.parse(formData);

    const result = await createAssetCondition(user.id, data);

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
    const user = await requireCurrentUser();

    const data = assetConditionSchema.parse(formData);

    const result = await updateAssetCondition(user.id, id, data);

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
    const user = await requireCurrentUser();

    const result = await deactivateAssetCondition(user.id, id);

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
