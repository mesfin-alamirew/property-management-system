export type AssetWithRelations = {
  id: string;

  assetCode: string;
  assetTag: string | null;

  name: string;
  description: string | null;

  manufacturer: string | null;
  model: string | null;
  serialNumber: string | null;

  assetTypeId: string;
  statusId: string;
  conditionId: string;

  assetType: {
    id: string;
    code: string;
    name: string;
  };

  status: {
    id: string;
    code: string;
    name: string;
  };

  condition: {
    id: string;
    code: string;
    name: string;
  };

  createdAt: Date;
  updatedAt: Date;
};
