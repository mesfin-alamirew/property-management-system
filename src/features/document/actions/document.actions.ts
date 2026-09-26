'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import { updateDocument, deleteDocument } from '../commands/document.commands';

import { documentSchema } from '../schemas/document.schema';

type DocumentActionData = {
  id: string;
};

export async function updateDocumentAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<DocumentActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = documentSchema.parse(formData);

    const result = await updateDocument(user.id, id, data);

    revalidatePath('/documents');
    revalidatePath(`/documents/${id}`);

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

export async function deleteDocumentAction(
  id: string,
): Promise<ActionResult<DocumentActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await deleteDocument(user.id, id);

    revalidatePath('/documents');
    revalidatePath(`/documents/${id}`);

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
