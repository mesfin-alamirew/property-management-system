'use server';

import { revalidatePath } from 'next/cache';

import { propertyTypeSchema } from '../schemas/property-type.schema';

import {
  createPropertyType,
  updatePropertyType,
  deactivatePropertyType,
} from '../commands/property-type.commands';

import { AppError } from '@/lib/errors';
import { ActionResult } from '@/types/action-result';
import { PropertyType } from '@/generated/prisma/client';

export async function createPropertyTypeAction(
  formData: unknown,
): Promise<ActionResult<PropertyType>> {
  try {
    const data = propertyTypeSchema.parse(formData);

    const result = await createPropertyType(data);

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
    const data = propertyTypeSchema.parse(formData);

    const result = await updatePropertyType(id, data);

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
    const result = await deactivatePropertyType(id);

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
