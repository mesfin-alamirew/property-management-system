export type AssetAssignmentWithRelations = {
  id: string;

  assetId: string;
  employeeId: string;

  assignedAt: Date;
  assignedByUserId: string;

  returnedAt: Date | null;
  returnedByUserId: string | null;

  notes: string | null;

  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  };

  employee: {
    id: string;
    employeeNumber: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
  };

  assignedByUser: {
    id: string;
    username: string;
    displayName: string;
  };

  returnedByUser: {
    id: string;
    username: string;
    displayName: string;
  } | null;

  createdAt: Date;
  updatedAt: Date;
};
