import {
  Prisma,
  IncidentType,
  IncidentSeverity,
} from '@/generated/prisma/client';

export type IncidentRecord =
  Prisma.IncidentGetPayload<Prisma.IncidentDefaultArgs>;

export type IncidentWithRelations = Prisma.IncidentGetPayload<{
  include: {
    asset: {
      select: {
        id: true;
        assetCode: true;
        assetTag: true;
        name: true;
      };
    };

    reportedByUser: {
      select: {
        id: true;
        username: true;
        displayName: true;
      };
    };

    assignedToUser: {
      select: {
        id: true;
        username: true;
        displayName: true;
      };
    };
  };
}>;

export type IncidentFormData = {
  assetId: string;

  type: IncidentType;

  severity: IncidentSeverity;

  title: string;

  description?: string;

  incidentDate: Date;

  notes?: string;
};
