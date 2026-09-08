'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createAcquisitionMethod,
  updateAcquisitionMethod,
  deactivateAcquisitionMethod,
} from '../commands/acquisition-method.commands';

import { acquisitionMethodSchema } from '../schemas/acquisition-method.schema';

type AcquisitionMethodActionData = {
  id: string;
  code: string;
};

export async function createAcquisitionMethodAction(
  formData: unknown,
): Promise<ActionResult<AcquisitionMethodActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = acquisitionMethodSchema.parse(formData);

    const result = await createAcquisitionMethod(user.id, data);

    revalidatePath('/acquisition-methods');

    return {
      success: true,
      data: {
        id: result.id,
        code: result.code,
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

export async function updateAcquisitionMethodAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<AcquisitionMethodActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = acquisitionMethodSchema.parse(formData);

    const result = await updateAcquisitionMethod(user.id, id, data);

    revalidatePath('/acquisition-methods');

    return {
      success: true,
      data: {
        id: result.id,
        code: result.code,
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

export async function deactivateAcquisitionMethodAction(
  id: string,
): Promise<ActionResult<AcquisitionMethodActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivateAcquisitionMethod(user.id, id);

    revalidatePath('/acquisition-methods');

    return {
      success: true,
      data: {
        id: result.id,
        code: result.code,
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
