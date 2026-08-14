import { z } from 'zod';

export const ownershipSchema = z
  .object({
    propertyId: z.string().trim().min(1, 'Property is required'),

    ownershipTypeId: z.string().trim().min(1, 'Ownership Type is required'),

    startDate: z.string().trim().min(1, 'Start date is required'),

    endDate: z.string().trim().optional().or(z.literal('')),

    acquisitionDate: z.string().trim().optional().or(z.literal('')),

    acquisitionPrice: z.string().trim().optional().or(z.literal('')),

    acquisitionCurrency: z
      .string()
      .trim()
      .max(10, 'Currency must not exceed 10 characters')
      .optional()
      .or(z.literal('')),

    deedNumber: z
      .string()
      .trim()
      .max(100, 'Deed Number must not exceed 100 characters')
      .optional()
      .or(z.literal('')),

    legalReference: z
      .string()
      .trim()
      .max(200, 'Legal Reference must not exceed 200 characters')
      .optional()
      .or(z.literal('')),

    registrationAuthority: z
      .string()
      .trim()
      .max(200, 'Registration Authority must not exceed 200 characters')
      .optional()
      .or(z.literal('')),

    notes: z.string().trim().optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    const startDate = new Date(data.startDate);

    if (Number.isNaN(startDate.getTime())) {
      ctx.addIssue({
        code: 'custom',
        path: ['startDate'],
        message: 'Invalid start date',
      });
    }

    if (data.endDate) {
      const endDate = new Date(data.endDate);

      if (Number.isNaN(endDate.getTime())) {
        ctx.addIssue({
          code: 'custom',
          path: ['endDate'],
          message: 'Invalid end date',
        });
      } else if (!Number.isNaN(startDate.getTime()) && endDate < startDate) {
        ctx.addIssue({
          code: 'custom',
          path: ['endDate'],
          message: 'End date cannot be before start date',
        });
      }
    }

    if (data.acquisitionDate) {
      const acquisitionDate = new Date(data.acquisitionDate);

      if (Number.isNaN(acquisitionDate.getTime())) {
        ctx.addIssue({
          code: 'custom',
          path: ['acquisitionDate'],
          message: 'Invalid acquisition date',
        });
      }
    }

    if (data.acquisitionPrice) {
      const price = Number(data.acquisitionPrice);

      if (!Number.isFinite(price) || price < 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['acquisitionPrice'],
          message: 'Acquisition price must be a valid non-negative number',
        });
      }
    }
  });

export type OwnershipFormData = z.infer<typeof ownershipSchema>;
