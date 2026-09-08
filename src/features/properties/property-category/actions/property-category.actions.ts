'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createPropertyCategory,
  updatePropertyCategory,
  deactivatePropertyCategory,
} from '../commands/property-category.commands';

import { propertyCategorySchema } from '../schemas/property-category.schema';

import type { PropertyCategory } from '@/generated/prisma/client';

export async function createPropertyCategoryAction(
  formData: unknown,
): Promise<ActionResult<PropertyCategory>> {
  try {
    const user = await requireCurrentUser();

    const data = propertyCategorySchema.parse(formData);

    const result = await createPropertyCategory(user.id, data);

    revalidatePath('/property-category');

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

export async function updatePropertyCategoryAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<PropertyCategory>> {
  try {
    const user = await requireCurrentUser();

    const data = propertyCategorySchema.parse(formData);

    const result = await updatePropertyCategory(user.id, id, data);

    revalidatePath('/property-category');

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

export async function deactivatePropertyCategoryAction(
  id: string,
): Promise<ActionResult<PropertyCategory>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivatePropertyCategory(user.id, id);

    revalidatePath('/property-category');

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
