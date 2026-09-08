'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
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
    const user = await requireCurrentUser();

    const data = propertyTenureSchema.parse(formData);
    const result = await createPropertyTenure(user.id, data);

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
    const user = await requireCurrentUser();

    const data = propertyTenureSchema.parse(formData);
    const result = await updatePropertyTenure(user.id, id, data);

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
    const user = await requireCurrentUser();

    const result = await deactivatePropertyTenure(user.id, id);

    revalidatePath('/property-tenure');

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Something went wrong' };
  }
}
