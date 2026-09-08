'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import { propertyTypeSchema } from '../schemas/property-type.schema';

import {
  createPropertyType,
  updatePropertyType,
  deactivatePropertyType,
} from '../commands/property-type.commands';

import type { PropertyType } from '@/generated/prisma/client';

export async function createPropertyTypeAction(
  formData: unknown,
): Promise<ActionResult<PropertyType>> {
  try {
    const user = await requireCurrentUser();

    const data = propertyTypeSchema.parse(formData);

    const result = await createPropertyType(user.id, data);

    revalidatePath('/property-types');

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

export async function updatePropertyTypeAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<PropertyType>> {
  try {
    const user = await requireCurrentUser();

    const data = propertyTypeSchema.parse(formData);

    const result = await updatePropertyType(user.id, id, data);

    revalidatePath('/property-types');

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

export async function deactivatePropertyTypeAction(
  id: string,
): Promise<ActionResult<PropertyType>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivatePropertyType(user.id, id);

    revalidatePath('/property-types');

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
