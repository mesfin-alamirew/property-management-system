'use server';

import { revalidatePath } from 'next/cache';

import { woredaSchema } from '../schemas/woreda.schema';

import {
  createWoreda,
  updateWoreda,
  deactivateWoreda,
} from '../commands/woreda.commands';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import type { Woreda } from '@/generated/prisma/client';

export async function createWoredaAction(
  formData: unknown,
): Promise<ActionResult<Woreda>> {
  try {
    const data = woredaSchema.parse(formData);

    const result = await createWoreda(data);

    revalidatePath('/woredas');

    return {
      success: true,
      data: result,
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

export async function updateWoredaAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<Woreda>> {
  try {
    const data = woredaSchema.parse(formData);

    const result = await updateWoreda(id, data);

    revalidatePath('/woredas');

    return {
      success: true,
      data: result,
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

export async function deactivateWoredaAction(
  id: string,
): Promise<ActionResult<Woreda>> {
  try {
    const result = await deactivateWoreda(id);

    revalidatePath('/woredas');

    return {
      success: true,
      data: result,
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
