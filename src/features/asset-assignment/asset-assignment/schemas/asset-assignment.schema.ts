import { z } from 'zod';

export const createAssetAssignmentSchema = z.object({
  assetId: z.string().min(1, 'Asset is required'),

  employeeId: z.string().min(1, 'Employee is required'),

  assignedAt: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) =>
        value === undefined || !Number.isNaN(new Date(value).getTime()),
      'Assignment date must be a valid date',
    ),

  notes: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export const returnAssetAssignmentSchema = z.object({
  returnedAt: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) =>
        value === undefined || !Number.isNaN(new Date(value).getTime()),
      'Return date must be a valid date',
    ),

  notes: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type CreateAssetAssignmentFormData = z.infer<
  typeof createAssetAssignmentSchema
>;

export type ReturnAssetAssignmentFormData = z.infer<
  typeof returnAssetAssignmentSchema
>;
