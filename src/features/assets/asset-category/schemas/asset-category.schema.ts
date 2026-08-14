import { z } from 'zod';

export const assetCategorySchema = z.object({
  code: z
    .string()
    .min(1, 'Asset category code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Asset category name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  parentId: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type AssetCategoryFormData = z.infer<typeof assetCategorySchema>;
