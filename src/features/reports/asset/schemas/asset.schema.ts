import { z } from 'zod';

export const assetReportSchema = z.object({
  search: z.string().trim().optional(),

  assetTypeId: z.string().optional(),

  assetCategoryId: z.string().optional(),

  statusId: z.string().optional(),

  conditionId: z.string().optional(),

  organizationUnitId: z.string().optional(),

  locationId: z.string().optional(),

  assignmentStatus: z
    .enum(['CURRENT', 'RETURNED', 'UNASSIGNED', 'ALL'])
    .optional(),

  acquisitionMethodId: z.string().optional(),

  acquisitionDateFrom: z.string().optional(),

  acquisitionDateTo: z.string().optional(),
});

export type AssetReportInput = z.infer<typeof assetReportSchema>;
