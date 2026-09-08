import { z } from 'zod';

export const roleSchema = z.object({
  code: z
    .string()
    .min(1, 'Role code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Role name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type RoleFormData = z.infer<typeof roleSchema>;

export const updateRoleSchema = z.object({
  name: z
    .string()
    .min(1, 'Role name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type UpdateRoleFormData = z.infer<typeof updateRoleSchema>;
