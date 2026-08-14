import { z } from 'zod';

export const assetStatusSchema = z.object({
  code: z
    .string()
    .min(1, 'Asset status code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Asset status name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type AssetStatusFormData = z.infer<typeof assetStatusSchema>;
