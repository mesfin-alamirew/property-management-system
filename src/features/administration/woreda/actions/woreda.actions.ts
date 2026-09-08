'use server';

import { revalidatePath } from 'next/cache';

import { woredaSchema } from '../schemas/woreda.schema';

import {
  createWoreda,
  updateWoreda,
  deactivateWoreda,
} from '../commands/woreda.commands';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import type { ActionResult } from '@/types/action-result';
import type { Woreda } from '@/generated/prisma/client';

export async function createWoredaAction(
  formData: unknown,
): Promise<ActionResult<Woreda>> {
  try {
    const user = await requireCurrentUser();

    const data = woredaSchema.parse(formData);

    const result = await createWoreda(user.id, data);

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
    const user = await requireCurrentUser();

    const data = woredaSchema.parse(formData);

    const result = await updateWoreda(user.id, id, data);

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
    const user = await requireCurrentUser();

    const result = await deactivateWoreda(user.id, id);

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
