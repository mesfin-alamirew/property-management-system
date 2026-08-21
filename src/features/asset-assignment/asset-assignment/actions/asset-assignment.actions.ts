'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createAssetAssignment,
  returnAssetAssignment,
} from '../commands/asset-assignment.commands';

import {
  createAssetAssignmentSchema,
  returnAssetAssignmentSchema,
} from '../schemas/asset-assignment.schema';

import { requireCurrentUser } from '@/lib/auth/require-current-user';

type AssetAssignmentActionData = {
  id: string;
};

export async function createAssetAssignmentAction(
  formData: unknown,
): Promise<ActionResult<AssetAssignmentActionData>> {
  try {
    const data = createAssetAssignmentSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await createAssetAssignment(user.id, data);

    revalidatePath('/asset-assignments');

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

export async function returnAssetAssignmentAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<AssetAssignmentActionData>> {
  try {
    const data = returnAssetAssignmentSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await returnAssetAssignment(user.id, id, data);

    revalidatePath('/asset-assignments');

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
