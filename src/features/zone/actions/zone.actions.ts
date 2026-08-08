'use server';

import { revalidatePath } from 'next/cache';

import { zoneSchema } from '../schemas/zone.schema';

import {
  createZone,
  updateZone,
  deactivateZone,
} from '../commands/zone.commands';
import { AppError } from '@/lib/errors';
import { ActionResult } from '@/types/action-result';

import type { Zone } from '@/generated/prisma/client';

export async function createZoneAction(
  formData: unknown,
): Promise<ActionResult<Zone>> {
  try {
    const data = zoneSchema.parse(formData);

    const result = await createZone(data);

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
    const data = zoneSchema.parse(formData);

    const result = await updateZone(id, data);

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
    const result = await deactivateZone(id);

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
