import type { Prisma } from '@/generated/prisma/client';

export type MaintenanceServiceRecord = {
  id: string;

  maintenanceId: string;

  serviceDate: Date;

  description: string;

  serviceProvider: string | null;

  quantity: number | null;

  unitCost: number | null;

  totalCost: number | null;

  notes: string | null;

  createdAt: Date;

  updatedAt: Date;
};

export type MaintenanceServiceWithRelations = Omit<
  Prisma.MaintenanceServiceGetPayload<{
    include: {
      maintenance: {
        select: {
          id: true;
          referenceNumber: true;
          title: true;
        };
      };
    };
  }>,
  'quantity' | 'unitCost' | 'totalCost'
> & {
  quantity: number | null;
  unitCost: number | null;
  totalCost: number | null;
};

export type MaintenanceServiceFormData = {
  maintenanceId: string;

  serviceDate?: Date;

  description: string;

  serviceProvider?: string;

  quantity?: number;

  unitCost?: number;

  totalCost?: number;

  notes?: string;
};
