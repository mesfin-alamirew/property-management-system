'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createPropertyStatus,
  updatePropertyStatus,
  deactivatePropertyStatus,
} from '../commands/property-status.commands';

import { propertyStatusSchema } from '../schemas/property-status.schema';

import type { PropertyStatus } from '@/generated/prisma/client';

export async function createPropertyStatusAction(
  formData: unknown,
): Promise<ActionResult<PropertyStatus>> {
  try {
    const user = await requireCurrentUser();

    const data = propertyStatusSchema.parse(formData);
    const result = await createPropertyStatus(user.id, data);

    revalidatePath('/property-status');

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Something went wrong' };
  }
}

export async function updatePropertyStatusAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<PropertyStatus>> {
  try {
    const user = await requireCurrentUser();

    const data = propertyStatusSchema.parse(formData);
    const result = await updatePropertyStatus(user.id, id, data);

    revalidatePath('/property-status');

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Something went wrong' };
  }
}

export async function deactivatePropertyStatusAction(
  id: string,
): Promise<ActionResult<PropertyStatus>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivatePropertyStatus(user.id, id);

    revalidatePath('/property-status');

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Something went wrong' };
  }
}
