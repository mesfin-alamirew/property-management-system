import { z } from 'zod';

export const buildingConditionSchema = z.object({
  code: z
    .string()
    .min(1, 'Building Condition code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Building Condition name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type BuildingConditionFormData = z.infer<typeof buildingConditionSchema>;
