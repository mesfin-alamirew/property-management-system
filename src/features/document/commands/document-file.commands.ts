import { createHash } from 'node:crypto';

import path from 'node:path';

import { AppError } from '@/lib/errors';

import { findSystemSettingByKey } from '@/features/administration/system-setting/repositories/system-setting.repository';
import { SYSTEM_SETTING_KEYS } from '@/features/administration/system-setting/types/system-setting.types';

import type {
  DocumentFileInput,
  ValidatedDocumentFile,
} from '../types/document-file.types';

const ALLOWED_FILE_TYPES: Record<string, string[]> = {
  '.pdf': ['application/pdf'],

  '.docx': [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],

  '.xlsx': [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],

  '.jpg': ['image/jpeg'],

  '.jpeg': ['image/jpeg'],

  '.png': ['image/png'],

  '.webp': ['image/webp'],
};

async function getMaximumDocumentFileSize(): Promise<{
  megabytes: number;
  bytes: number;
}> {
  const setting = await findSystemSettingByKey(
    SYSTEM_SETTING_KEYS.DOCUMENT_MAX_FILE_SIZE_MB,
  );

  if (!setting) {
    throw new AppError(
      'Document maximum file size setting is not configured',
      'DOCUMENT_MAX_FILE_SIZE_NOT_CONFIGURED',
    );
  }

  const megabytes = Number(setting.value);

  if (!Number.isInteger(megabytes) || megabytes <= 0) {
    throw new AppError(
      'Document maximum file size setting is invalid',
      'INVALID_DOCUMENT_MAX_FILE_SIZE',
    );
  }

  return {
    megabytes,
    bytes: megabytes * 1024 * 1024,
  };
}

export async function validateDocumentFile(
  file: DocumentFileInput,
): Promise<ValidatedDocumentFile> {
  const originalFileName = file.originalFileName.trim();

  if (!originalFileName) {
    throw new AppError('File name is required', 'DOCUMENT_FILE_NAME_REQUIRED');
  }

  const extension = path.extname(originalFileName).toLowerCase();

  if (!extension) {
    throw new AppError(
      'File extension is required',
      'DOCUMENT_FILE_EXTENSION_REQUIRED',
    );
  }

  const allowedMimeTypes = ALLOWED_FILE_TYPES[extension];

  if (!allowedMimeTypes) {
    throw new AppError(
      'File type is not supported',
      'DOCUMENT_FILE_TYPE_NOT_SUPPORTED',
    );
  }

  if (!allowedMimeTypes.includes(file.mimeType)) {
    throw new AppError(
      'File MIME type does not match the file extension',
      'DOCUMENT_FILE_MIME_TYPE_MISMATCH',
    );
  }

  if (file.data.length === 0) {
    throw new AppError('File cannot be empty', 'DOCUMENT_FILE_EMPTY');
  }

  const maximumFileSize = await getMaximumDocumentFileSize();

  if (file.data.length > maximumFileSize.bytes) {
    throw new AppError(
      `File size exceeds the maximum allowed size of ${maximumFileSize.megabytes} MB`,
      'DOCUMENT_FILE_TOO_LARGE',
    );
  }

  return {
    originalFileName,
    extension,
    mimeType: file.mimeType,
    data: file.data,
    fileSize: BigInt(file.data.length),
  };
}

export function calculateDocumentFileChecksum(data: Buffer): string {
  return createHash('sha256').update(data).digest('hex');
}
