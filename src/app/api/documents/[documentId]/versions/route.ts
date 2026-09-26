import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { createDocumentVersion } from '@/features/document/commands/document.commands';

type RouteContext = {
  params: Promise<{
    documentId: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  try {
    const user = await requireCurrentUser();

    const { documentId } = await context.params;

    if (!documentId.trim()) {
      throw new AppError('Document ID is required', 'DOCUMENT_ID_REQUIRED');
    }

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

    const arrayBuffer = await file.arrayBuffer();

    const result = await createDocumentVersion(user.id, documentId, {
      originalFileName: file.name,
      mimeType: file.type,
      data: Buffer.from(arrayBuffer),
    });

    revalidatePath('/documents');
    revalidatePath(`/documents/${documentId}`);

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
