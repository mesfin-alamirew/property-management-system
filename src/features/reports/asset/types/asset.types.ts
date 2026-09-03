export type AssetReportFilters = {
  search?: string;
  assetTypeId?: string;
  statusId?: string;
  conditionId?: string;
};

export type AssetReportRow = {
  id: string;
  assetCode: string;
  assetTag: string | null;
  name: string;
  serialNumber: string | null;

  assetType: {
    id: string;
    code: string;
    name: string;
  } | null;

  status: {
    id: string;
    code: string;
    name: string;
  };

  condition: {
    id: string;
    code: string;
    name: string;
  } | null;
};
