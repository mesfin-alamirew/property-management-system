'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createProperty,
  updateProperty,
  deactivateProperty,
} from '../commands/property.commands';

import { propertySchema } from '../schemas/property.schema';
import type { Property } from '@/generated/prisma/client';
export async function createPropertyAction(
  formData: unknown,
): Promise<ActionResult<Property>> {
  try {
    const data = propertySchema.parse(formData);

    const result = await createProperty(data);

    revalidatePath('/property');

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

export async function updatePropertyAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<Property>> {
  try {
    const data = propertySchema.parse(formData);

    const result = await updateProperty(id, data);

    revalidatePath('/property');

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

export async function deactivatePropertyAction(
  id: string,
): Promise<ActionResult<Property>> {
  try {
    const result = await deactivateProperty(id);

    revalidatePath('/property');

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
