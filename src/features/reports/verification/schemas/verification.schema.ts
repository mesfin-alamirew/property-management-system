import { z } from 'zod';

export const physicalVerificationReportSchema = z.object({
  search: z.string().trim().optional(),

  organizationUnitId: z.string().optional(),

  locationId: z.string().optional(),

  scope: z
    .enum([
      'ORGANIZATION',
      'ORGANIZATION_UNIT',
      'LOCATION',
      'ORGANIZATION_UNIT_LOCATION',
      'SELECTED_ASSETS',
      'ALL',
    ])
    .optional(),

  status: z
    .enum(['DRAFT', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'ALL'])
    .optional(),

  scheduledDateFrom: z.string().optional(),

  scheduledDateTo: z.string().optional(),

  completedDateFrom: z.string().optional(),

  completedDateTo: z.string().optional(),
});

export type PhysicalVerificationReportInput = z.infer<
  typeof physicalVerificationReportSchema
>;
