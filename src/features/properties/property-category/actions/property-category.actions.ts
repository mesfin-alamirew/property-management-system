'use server';

import { revalidatePath } from 'next/cache';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createPropertyCategory,
  updatePropertyCategory,
  deactivatePropertyCategory,
} from '../commands/property-category.commands';
import type { PropertyCategory } from '@/generated/prisma/client';

import { propertyCategorySchema } from '../schemas/property-category.schema';
export async function createPropertyCategoryAction(
  formData: unknown,
): Promise<ActionResult<PropertyCategory>> {
  try {
    const data = propertyCategorySchema.parse(formData);

    const result = await createPropertyCategory(data);

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
    const data = propertyCategorySchema.parse(formData);

    const result = await updatePropertyCategory(id, data);

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
    const result = await deactivatePropertyCategory(id);

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
