import { z } from 'zod';

export const incidentReportSchema = z.object({
  search: z.string().trim().optional(),
  type: z.string().optional(),
  severity: z.string().optional(),
  status: z.string().optional(),
  assetId: z.string().optional(),
  reportedByUserId: z.string().optional(),
  assignedToUserId: z.string().optional(),
  incidentDateFrom: z.string().optional(),
  incidentDateTo: z.string().optional(),
  reportedDateFrom: z.string().optional(),
  reportedDateTo: z.string().optional(),
});

export type IncidentReportInput = z.infer<typeof incidentReportSchema>;
