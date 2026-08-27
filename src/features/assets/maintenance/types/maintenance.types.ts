import type {
  MaintenanceType,
  MaintenanceStatus,
} from '@/generated/prisma/client';
export type MaintenanceServiceWithRelations = {
  id: string;

  maintenanceId: string;

  serviceDate: Date;

  description: string;

  serviceProvider: string | null;

  quantity: string | null;

  unitCost: string | null;

  totalCost: string | null;

  notes: string | null;

  createdAt: Date;

  updatedAt: Date;
};

export type MaintenanceWithRelations = {
  id: string;

  referenceNumber: string;

  assetId: string;

  type: MaintenanceType;

  status: MaintenanceStatus;

  title: string;

  description: string | null;

  requestedAt: Date | null;

  scheduledAt: Date | null;

  startedAt: Date | null;

  completedAt: Date | null;

  requestedByUserId: string;

  assignedToUserId: string | null;

  approvedByUserId: string | null;

  approvedAt: Date | null;

  notes: string | null;

  asset: {
    id: string;

    assetCode: string;

    assetTag: string | null;

    name: string;
  };

  requestedByUser: {
    id: string;

    username: string;

    displayName: string;
  };

  assignedToUser: {
    id: string;

    username: string;

    displayName: string;
  } | null;

  approvedByUser: {
    id: string;

    username: string;

    displayName: string;
  } | null;

  createdAt: Date;

  updatedAt: Date;
};

export type MaintenanceDetailWithRelations = {
  id: string;

  referenceNumber: string;

  assetId: string;

  type: string;

  status: string;

  title: string;

  description: string | null;

  requestedAt: Date | null;

  scheduledAt: Date | null;

  startedAt: Date | null;

  completedAt: Date | null;

  requestedByUserId: string;

  assignedToUserId: string | null;

  approvedByUserId: string | null;

  approvedAt: Date | null;

  notes: string | null;

  asset: {
    id: string;

    assetCode: string;

    assetTag: string | null;

    name: string;
  };

  requestedByUser: {
    id: string;

    username: string;

    displayName: string;
  };

  assignedToUser: {
    id: string;

    username: string;

    displayName: string;
  } | null;

  approvedByUser: {
    id: string;

    username: string;

    displayName: string;
  } | null;

  services: MaintenanceServiceWithRelations[];

  createdAt: Date;

  updatedAt: Date;
};
