'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createAcquisition,
  updateAcquisition,
} from '../commands/acquisition.commands';

import { acquisitionSchema } from '../schemas/acquisition.schema';

type AcquisitionActionData = {
  id: string;
  acquisitionNumber: string;
};

export async function createAcquisitionAction(
  formData: unknown,
): Promise<ActionResult<AcquisitionActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = acquisitionSchema.parse(formData);

    const result = await createAcquisition(user.id, data);

    revalidatePath('/acquisitions');

    return {
      success: true,
      data: {
        id: result.id,
        acquisitionNumber: result.acquisitionNumber,
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

export async function updateAcquisitionAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<AcquisitionActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = acquisitionSchema.parse(formData);

    const result = await updateAcquisition(user.id, id, data);

    revalidatePath('/acquisitions');

    return {
      success: true,
      data: {
        id: result.id,
        acquisitionNumber: result.acquisitionNumber,
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
