import { z } from 'zod';
import { requiredString } from '@/lib/validation';

export const propertyTypeSchema = z.object({
  code: requiredString('Code')
    .max(20, 'Code cannot exceed 20 characters')
    .transform((value) => value.toUpperCase()),

  name: requiredString('Name').max(100, 'Name cannot exceed 100 characters'),

  description: z
    .string()
    .trim()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
});

export type PropertyTypeFormData = z.infer<typeof propertyTypeSchema>;
