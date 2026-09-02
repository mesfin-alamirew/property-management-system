export type DisposalItemWithRelations = {
  id: string;

  disposalId: string;
  assetId: string;

  disposal: {
    id: string;
    referenceNumber: string;
  };

  asset: {
    id: string;
    assetCode: string;
    name: string;
  };

  createdAt: Date;
  updatedAt: Date;
};

export type DisposalItemFormData = {
  disposalId: string;
  assetId: string;
};
