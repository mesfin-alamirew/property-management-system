'use server';

import { revalidatePath } from 'next/cache';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createPropertyTenure,
  updatePropertyTenure,
  deactivatePropertyTenure,
} from '../commands/property-tenure.commands';

import { propertyTenureSchema } from '../schemas/property-tenure.schema';

import type { PropertyTenure } from '@/generated/prisma/client';

export async function createPropertyTenureAction(
  formData: unknown,
): Promise<ActionResult<PropertyTenure>> {
  try {
    const data = propertyTenureSchema.parse(formData);
    const result = await createPropertyTenure(data);

    revalidatePath('/property-tenure');

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
}

export async function updatePropertyTenureAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<PropertyTenure>> {
  try {
    const data = propertyTenureSchema.parse(formData);
    const result = await updatePropertyTenure(id, data);

    revalidatePath('/property-tenure');

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
}

export async function deactivatePropertyTenureAction(
  id: string,
): Promise<ActionResult<PropertyTenure>> {
  try {
    const result = await deactivatePropertyTenure(id);

    revalidatePath('/property-tenure');

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
}
