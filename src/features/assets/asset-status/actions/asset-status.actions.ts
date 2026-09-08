'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createAssetStatus,
  updateAssetStatus,
  deactivateAssetStatus,
} from '../commands/asset-status.commands';

import { assetStatusSchema } from '../schemas/asset-status.schema';

type AssetStatusActionData = {
  id: string;
};

export async function createAssetStatusAction(
  formData: unknown,
): Promise<ActionResult<AssetStatusActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = assetStatusSchema.parse(formData);

    const result = await createAssetStatus(user.id, data);

    revalidatePath('/asset-statuses');

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

export async function updateAssetStatusAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<AssetStatusActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = assetStatusSchema.parse(formData);

    const result = await updateAssetStatus(user.id, id, data);

    revalidatePath('/asset-statuses');

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

export async function deactivateAssetStatusAction(
  id: string,
): Promise<ActionResult<AssetStatusActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivateAssetStatus(user.id, id);

    revalidatePath('/asset-statuses');

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
