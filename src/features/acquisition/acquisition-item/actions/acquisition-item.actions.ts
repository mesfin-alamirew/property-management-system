'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createAcquisitionItem,
  updateAcquisitionItem,
} from '../commands/acquisition-item.commands';

import { acquisitionItemSchema } from '../schemas/acquisition-item.schema';

type AcquisitionItemActionData = {
  id: string;
};

export async function createAcquisitionItemAction(
  formData: unknown,
): Promise<ActionResult<AcquisitionItemActionData>> {
  try {
    const data = acquisitionItemSchema.parse(formData);

    const result = await createAcquisitionItem(data);

    revalidatePath('/acquisitions');

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

export async function updateAcquisitionItemAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<AcquisitionItemActionData>> {
  try {
    const data = acquisitionItemSchema.parse(formData);

    const result = await updateAcquisitionItem(id, data);

    revalidatePath('/acquisitions');

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
