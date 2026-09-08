'use server';

import { revalidatePath } from 'next/cache';

import { zoneSchema } from '../schemas/zone.schema';

import {
  createZone,
  updateZone,
  deactivateZone,
} from '../commands/zone.commands';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import type { ActionResult } from '@/types/action-result';
import type { Zone } from '@/generated/prisma/client';

export async function createZoneAction(
  formData: unknown,
): Promise<ActionResult<Zone>> {
  try {
    const user = await requireCurrentUser();

    const data = zoneSchema.parse(formData);

    const result = await createZone(user.id, data);

    revalidatePath('/zones');

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

export async function updateZoneAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<Zone>> {
  try {
    const user = await requireCurrentUser();

    const data = zoneSchema.parse(formData);

    const result = await updateZone(user.id, id, data);

    revalidatePath('/zones');

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

export async function deactivateZoneAction(
  id: string,
): Promise<ActionResult<Zone>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivateZone(user.id, id);

    revalidatePath('/zones');

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
