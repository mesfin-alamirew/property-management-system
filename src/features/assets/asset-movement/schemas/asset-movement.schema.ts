import { z } from 'zod';

export const assetMovementSchema = z
  .object({
    assetId: z.string().min(1, 'Asset is required'),

    fromLocationId: z.string().optional().or(z.literal('')),

    toLocationId: z.string().min(1, 'Destination location is required'),

    reason: z
      .string()
      .trim()
      .max(200, 'Reason must not exceed 200 characters')
      .optional()
      .or(z.literal('')),

    notes: z
      .string()
      .trim()
      .max(500, 'Notes must not exceed 500 characters')
      .optional()
      .or(z.literal('')),
  })
  .refine(
    (data) => {
      if (!data.fromLocationId) {
        return true;
      }

      return data.fromLocationId !== data.toLocationId;
    },
    {
      message: 'Destination must be different from the current location',
      path: ['toLocationId'],
    },
  );

export type AssetMovementFormData = z.infer<typeof assetMovementSchema>;
