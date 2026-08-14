import { z } from 'zod';

export const assetConditionSchema = z.object({
  code: z
    .string()
    .min(1, 'Asset condition code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Asset condition name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type AssetConditionFormData = z.infer<typeof assetConditionSchema>;
