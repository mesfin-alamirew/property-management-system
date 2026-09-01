import type { Prisma } from '@/generated/prisma/client';

export type IncidentResolutionRecord = {
  id: string;

  incidentId: string;

  rootCause: string;

  resolution: string;

  correctiveAction: string | null;

  resolvedByUserId: string;

  notes: string | null;

  createdAt: Date;

  updatedAt: Date;
};

export type IncidentResolutionWithRelations =
  Prisma.IncidentResolutionGetPayload<{
    include: {
      incident: {
        select: {
          id: true;
          referenceNumber: true;
          title: true;
          assetId: true;
        };
      };

      resolvedByUser: {
        select: {
          id: true;
          username: true;
          displayName: true;
        };
      };
    };
  }>;

export type IncidentResolutionFormData = {
  incidentId: string;

  rootCause: string;

  resolution: string;

  correctiveAction?: string;

  notes?: string;
};
