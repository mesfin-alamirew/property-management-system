export type AcquisitionWithRelations = {
  id: string;

  acquisitionNumber: string;
  acquisitionDate: Date;

  acquisitionMethodId: string;

  acquisitionMethod: {
    id: string;
    code: string;
    name: string;
  };

  supplierName: string | null;
  referenceNumber: string | null;
  description: string | null;
  fundingSource: string | null;

  totalAmount: string | null;
  currency: string | null;
  notes: string | null;

  items: {
    id: string;

    acquisitionId: string;
    assetId: string;

    asset: {
      id: string;
      assetCode: string;
      name: string;
    };

    unitCost: string | null;
    totalCost: string | null;

    createdAt: Date;
    updatedAt: Date;
  }[];

  createdAt: Date;
  updatedAt: Date;
};
