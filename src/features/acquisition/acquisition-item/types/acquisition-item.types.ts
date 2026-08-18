export type AcquisitionItemWithRelations = {
  id: string;

  acquisitionId: string;
  assetId: string;

  acquisition: {
    id: string;
    acquisitionNumber: string;
  };

  asset: {
    id: string;
    assetCode: string;
    name: string;
  };

  unitCost: string | null;
  totalCost: string | null;

  createdAt: Date;
  updatedAt: Date;
};
