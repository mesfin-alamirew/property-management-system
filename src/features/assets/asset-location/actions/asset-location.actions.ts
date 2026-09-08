'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createAssetLocation,
  updateAssetLocation,
  deactivateAssetLocation,
} from '../commands/asset-location.commands';

import { assetLocationSchema } from '../schemas/asset-location.schema';

type AssetLocationActionData = {
  id: string;
};

export async function createAssetLocationAction(
  formData: unknown,
): Promise<ActionResult<AssetLocationActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = assetLocationSchema.parse(formData);

    const result = await createAssetLocation(user.id, data);

    revalidatePath('/asset-locations');

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

export async function updateAssetLocationAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<AssetLocationActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = assetLocationSchema.parse(formData);

    const result = await updateAssetLocation(user.id, id, data);

    revalidatePath('/asset-locations');

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

export async function deactivateAssetLocationAction(
  id: string,
): Promise<ActionResult<AssetLocationActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivateAssetLocation(user.id, id);

    revalidatePath('/asset-locations');

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
