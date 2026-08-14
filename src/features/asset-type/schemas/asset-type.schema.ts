import { z } from 'zod';

export const assetTypeSchema = z.object({
  code: z
    .string()
    .min(1, 'Asset type code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Asset type name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  categoryId: z.string().min(1, 'Asset category is required'),
});

export type AssetTypeFormData = z.infer<typeof assetTypeSchema>;
