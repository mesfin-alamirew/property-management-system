import { z } from 'zod';

export const documentTypeSchema = z.object({
  code: z
    .string()
    .min(1, 'Document type code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Document type name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type DocumentTypeFormData = z.infer<typeof documentTypeSchema>;
