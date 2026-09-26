import { z } from 'zod';

import { DOCUMENT_ENTITY_TYPES } from '../document-type/types/document.types';

export const documentSchema = z.object({
  documentTypeId: z.string().min(1, 'Document Type is required'),

  entityType: z.enum(DOCUMENT_ENTITY_TYPES),

  entityId: z.string().min(1, 'Related record is required'),

  title: z
    .string()
    .min(1, 'Document title is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type DocumentFormData = z.infer<typeof documentSchema>;
