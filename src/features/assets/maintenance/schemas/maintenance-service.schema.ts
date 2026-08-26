import { z } from 'zod';

export const maintenanceServiceSchema = z.object({
  maintenanceId: z.string().min(1, 'Maintenance is required'),

  serviceDate: z.coerce.date({
    message: 'Service date is required',
  }),

  description: z.string().trim().min(1, 'Service description is required'),

  serviceProvider: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  quantity: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  unitCost: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  totalCost: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  notes: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type MaintenanceServiceFormData = z.infer<
  typeof maintenanceServiceSchema
>;
