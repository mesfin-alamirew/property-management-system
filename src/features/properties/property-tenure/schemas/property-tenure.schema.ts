import { z } from 'zod';

export const propertyTenureSchema = z.object({
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
});

export type PropertyTenureFormData = z.infer<typeof propertyTenureSchema>;
