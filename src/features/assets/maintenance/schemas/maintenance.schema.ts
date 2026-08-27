import { z } from 'zod';

export const maintenanceSchema = z.object({
  assetId: z.string().min(1, 'Asset is required'),

  type: z
    .union([
      z.enum([
        'PREVENTIVE',
        'CORRECTIVE',
        'EMERGENCY',
        'PREDICTIVE',
        'INSPECTION',
      ]),
      z.literal(''),
    ])
    .refine((value) => value !== '', {
      message: 'Maintenance type is required',
    }),

  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must not exceed 200 characters'),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  requestedAt: z.coerce.date().optional(),

  scheduledAt: z.coerce.date().optional(),

  assignedToUserId: z.string().optional().or(z.literal('')),

  notes: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type MaintenanceFormData = z.infer<typeof maintenanceSchema>;
