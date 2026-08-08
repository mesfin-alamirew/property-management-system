import { z } from 'zod';

export const propertyStatusSchema = z.object({
  code: z
    .string()
    .min(1, 'Code is required')
    .transform((value) => value.toUpperCase().trim()),

  name: z
    .string()
    .min(1, 'Name is required')
    .transform((value) => value.trim()),

  description: z.string().optional(),
});

export type PropertyStatusFormData = z.infer<typeof propertyStatusSchema>;
