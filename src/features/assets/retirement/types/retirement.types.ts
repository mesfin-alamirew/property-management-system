import type { Prisma } from '@/generated/prisma/client';

export type RetirementRecord = {
  id: string;
  referenceNumber: string;
  assetId: string;
  retirementDate: Date;
  reason: string;
  conditionId: string;
  status: string;

  requestedByUserId: string;

  approvedByUserId: string | null;
  approvedAt: Date | null;

  cancelledByUserId: string | null;
  cancelledAt: Date | null;
  cancellationReason: string | null;

  notes: string | null;

  createdAt: Date;
  updatedAt: Date;
};
export type RetirementWithRelations = Prisma.RetirementGetPayload<{
  include: {
    asset: {
      select: { id: true; assetCode: true; name: true };
    };

    condition: {
      select: { id: true; code: true; name: true };
    };

    requestedByUser: {
      select: { id: true; username: true; displayName: true };
    };

    approvedByUser: {
      select: { id: true; username: true; displayName: true };
    };

    cancelledByUser: {
      select: { id: true; username: true; displayName: true };
    };
  };
}>;

export type RetirementFormData = {
  assetId: string;

  retirementDate?: Date;

  reason: string;

  conditionId: string;

  notes?: string;
};
