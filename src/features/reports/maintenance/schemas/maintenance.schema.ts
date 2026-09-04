import { z } from 'zod';

export const maintenanceReportSchema = z.object({
  search: z.string().trim().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  assetId: z.string().optional(),
  assignedToUserId: z.string().optional(),
  requestedDateFrom: z.string().optional(),
  requestedDateTo: z.string().optional(),
  scheduledDateFrom: z.string().optional(),
  scheduledDateTo: z.string().optional(),
});

export type MaintenanceReportInput = z.infer<typeof maintenanceReportSchema>;
