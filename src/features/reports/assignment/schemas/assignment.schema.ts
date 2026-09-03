import { z } from 'zod';

export const assignmentReportSchema = z.object({
  search: z.string().trim().optional(),

  employeeId: z.string().optional(),

  organizationUnitId: z.string().optional(),

  assetTypeId: z.string().optional(),

  status: z.enum(['CURRENT', 'RETURNED', 'ALL']).optional(),

  assignedDateFrom: z.string().optional(),

  assignedDateTo: z.string().optional(),
});

export type AssignmentReportInput = z.infer<typeof assignmentReportSchema>;
