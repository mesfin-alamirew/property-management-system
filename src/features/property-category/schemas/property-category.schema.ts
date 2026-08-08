import { z } from 'zod';

export const propertyCategorySchema = z.object({
  code: z
    .string()
    .min(1, 'Code is required')
    .transform((value) => value.toUpperCase().trim()),

  name: z
    .string()
    .min(1, 'Name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim()),

  parentId: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type PropertyCategoryFormData = z.infer<typeof propertyCategorySchema>;
