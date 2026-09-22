import { z } from 'zod';

export const assignSystemAdministratorSchema = z.object({
  targetUserId: z.string().min(1, 'User is required'),
});

export type AssignSystemAdministratorFormData = z.infer<
  typeof assignSystemAdministratorSchema
>;
