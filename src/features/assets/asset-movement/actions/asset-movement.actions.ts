'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import { requireCurrentUser } from '@/lib/auth/require-current-user';

import { createAssetMovement } from '../commands/asset-movement.commands';

import { assetMovementSchema } from '../schemas/asset-movement.schema';

type AssetMovementActionData = {
  id: string;
};

export async function createAssetMovementAction(
  formData: unknown,
): Promise<ActionResult<AssetMovementActionData>> {
  try {
    const data = assetMovementSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await createAssetMovement(user.id, data);

    revalidatePath('/asset-movements');

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
