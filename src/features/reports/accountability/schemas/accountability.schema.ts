import { z } from 'zod';

export const accountabilityReportSchema = z.object({
  search: z.string().trim().optional(),
  exceptionType: z.string().optional(),
  severity: z.string().optional(),
  organizationUnitId: z.string().optional(),
  locationId: z.string().optional(),
  assetTypeId: z.string().optional(),
  assetStatusId: z.string().optional(),
});

export type AccountabilityReportInput = z.infer<
  typeof accountabilityReportSchema
>;
