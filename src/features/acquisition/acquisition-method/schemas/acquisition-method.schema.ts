import { z } from 'zod';

export const acquisitionMethodSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, 'Code is required')
    .max(50, 'Code must not exceed 50 characters'),

  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must not exceed 100 characters'),

  description: z
    .string()
    .trim()
    .max(500, 'Description must not exceed 500 characters')
    .optional()
    .or(z.literal('')),

  isActive: z.boolean(),
});

export type AcquisitionMethodFormValues = z.infer<
  typeof acquisitionMethodSchema
>;
