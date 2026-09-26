import { NextResponse } from 'next/server';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getDocumentVersionById } from '@/features/document/queries/document.queries';
import { azureBlobStorage } from '@/lib/storage/azure-blob.storage';

type RouteContext = {
  params: Promise<{
    versionId: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const user = await requireCurrentUser();

    const { versionId } = await context.params;

    if (!versionId.trim()) {
      throw new AppError(
        'Document version ID is required',
        'DOCUMENT_VERSION_ID_REQUIRED',
      );
    }

    const version = await getDocumentVersionById(user.id, versionId);

    if (!version) {
      throw new AppError(
        'Document version not found',
        'DOCUMENT_VERSION_NOT_FOUND',
      );
    }

    const file = await azureBlobStorage.download(
      version.storageContainer,
      version.storageKey,
    );

    return new NextResponse(new Uint8Array(file.data), {
      status: 200,
      headers: {
        'Content-Type': file.contentType || version.mimeType,
        'Content-Length': version.fileSize.toString(),
        'Content-Disposition': `inline; filename="${encodeURIComponent(
          version.originalFileName,
        )}"`,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      const status =
        error.code === 'PERMISSION_DENIED'
          ? 403
          : error.code === 'DOCUMENT_VERSION_NOT_FOUND'
            ? 404
            : 400;

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
