import { z } from 'zod';

export const dashboardSchema = z.object({
  organizationUnitId: z.string().optional(),
  assetTypeId: z.string().optional(),
  assetStatusId: z.string().optional(),
});

export type DashboardInput = z.infer<typeof dashboardSchema>;
