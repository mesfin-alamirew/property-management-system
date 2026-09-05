import { z } from 'zod';

export const auditReportSchema = z.object({
  search: z.string().trim().optional(),
  userId: z.string().optional(),
  action: z.string().optional(),
  entityType: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export type AuditReportInput = z.infer<typeof auditReportSchema>;
