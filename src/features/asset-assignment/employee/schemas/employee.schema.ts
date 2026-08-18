import { z } from 'zod';

export const employeeSchema = z.object({
  employeeNumber: z
    .string()
    .min(1, 'Employee number is required')
    .transform((value) => value.trim().toUpperCase()),

  firstName: z
    .string()
    .min(1, 'First name is required')
    .transform((value) => value.trim()),

  middleName: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .transform((value) => value.trim()),

  organizationUnitId: z.string().min(1, 'Organization Unit is required'),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
