'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createDocumentType,
  updateDocumentType,
  deactivateDocumentType,
} from '../commands/document-type.commands';

import { documentTypeSchema } from '../schemas/document-type.schema';

type DocumentTypeActionData = {
  id: string;
};

export async function createDocumentTypeAction(
  formData: unknown,
): Promise<ActionResult<DocumentTypeActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = documentTypeSchema.parse(formData);

    const result = await createDocumentType(user.id, data);

    revalidatePath('/document-types');

    return {
      success: true,
      data: {
        id: result.id,
      },
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

export async function updateDocumentTypeAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<DocumentTypeActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = documentTypeSchema.parse(formData);

    const result = await updateDocumentType(user.id, id, data);

    revalidatePath('/document-types');

    return {
      success: true,
      data: {
        id: result.id,
      },
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

export async function deactivateDocumentTypeAction(
  id: string,
): Promise<ActionResult<DocumentTypeActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivateDocumentType(user.id, id);

    revalidatePath('/document-types');

    return {
      success: true,
      data: {
        id: result.id,
      },
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
