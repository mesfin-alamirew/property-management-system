import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { createDocument } from '@/features/document/commands/document.commands';
import { documentSchema } from '@/features/document/schemas/document.schema';

function getFormDataString(
  formData: FormData,
  fieldName: string,
): string | undefined {
  const value = formData.get(fieldName);

  if (typeof value !== 'string') {
    return undefined;
  }

  return value;
}

export async function POST(request: Request) {
  try {
    const user = await requireCurrentUser();

    const formData = await request.formData();

    const file = formData.get('file');

    if (!(file instanceof File)) {
      throw new AppError('File is required', 'DOCUMENT_FILE_REQUIRED');
    }

    if (!file.name.trim()) {
      throw new AppError(
        'File name is required',
        'DOCUMENT_FILE_NAME_REQUIRED',
      );
    }

    const documentData = documentSchema.parse({
      documentTypeId: getFormDataString(formData, 'documentTypeId'),
      entityType: getFormDataString(formData, 'entityType'),
      entityId: getFormDataString(formData, 'entityId'),
      title: getFormDataString(formData, 'title'),
      description: getFormDataString(formData, 'description'),
    });

    const arrayBuffer = await file.arrayBuffer();

    const result = await createDocument(user.id, documentData, {
      originalFileName: file.name,
      mimeType: file.type,
      data: Buffer.from(arrayBuffer),
    });

    revalidatePath('/documents');

    return NextResponse.json({
      success: true,
      data: {
        id: result.id,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      const status = error.code === 'PERMISSION_DENIED' ? 403 : 400;

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong',
      },
      { status: 500 },
    );
  }
}
