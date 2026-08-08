'use server';

import { revalidatePath } from 'next/cache';

import { countrySchema } from '../schemas/country.schema';

import {
  createCountry,
  updateCountry,
  deactivateCountry,
} from '../commands/country.commands';

import { AppError } from '@/lib/errors';
import { ActionResult } from '@/types/action-result';

import type { Country } from '@/generated/prisma/client';

export async function createCountryAction(
  formData: unknown,
): Promise<ActionResult<Country>> {
  try {
    const data = countrySchema.parse(formData);

    const result = await createCountry(data);

    revalidatePath('/countries');

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

export async function updateCountryAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<Country>> {
  try {
    const data = countrySchema.parse(formData);

    const result = await updateCountry(id, data);

    revalidatePath('/countries');

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

export async function deactivateCountryAction(
  id: string,
): Promise<ActionResult<Country>> {
  try {
    const result = await deactivateCountry(id);

    revalidatePath('/countries');

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
