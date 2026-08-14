'use server';

import { revalidatePath } from 'next/cache';
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
    const data = propertyStatusSchema.parse(formData);
    const result = await createPropertyStatus(data);

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
    const data = propertyStatusSchema.parse(formData);
    const result = await updatePropertyStatus(id, data);

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
    const result = await deactivatePropertyStatus(id);

    revalidatePath('/property-status');

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
}
