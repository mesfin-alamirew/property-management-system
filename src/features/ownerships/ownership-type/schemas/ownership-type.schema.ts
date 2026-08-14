import { z } from 'zod';

export const ownershipTypeSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, 'Code is required')
    .max(50, 'Code must not exceed 50 characters')
    .transform((value) => value.toUpperCase()),

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
});

export type OwnershipTypeFormData = z.infer<typeof ownershipTypeSchema>;
