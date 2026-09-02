import type { DisposalStatus } from '@/generated/prisma/client';

export type DisposalWithRelations = {
  id: string;

  referenceNumber: string;
  disposalDate: Date;

  method: string;
  reason: string | null;

  status: DisposalStatus;

  requestedByUserId: string;

  approvedByUserId: string | null;
  approvedAt: Date | null;

  cancelledByUserId: string | null;
  cancelledAt: Date | null;
  cancellationReason: string | null;

  notes: string | null;

  requestedByUser: {
    id: string;
    username: string;
    displayName: string;
  };

  approvedByUser: {
    id: string;
    username: string;
    displayName: string;
  } | null;

  cancelledByUser: {
    id: string;
    username: string;
    displayName: string;
  } | null;

  items: {
    id: string;

    disposalId: string;
    assetId: string;

    asset: {
      id: string;
      assetCode: string;
      name: string;
    };

    createdAt: Date;
    updatedAt: Date;
  }[];

  createdAt: Date;
  updatedAt: Date;
};
