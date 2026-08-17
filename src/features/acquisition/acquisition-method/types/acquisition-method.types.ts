export type AcquisitionMethodListItem = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAcquisitionMethodInput = {
  code: string;
  name: string;
  description?: string;
};

export type UpdateAcquisitionMethodInput = {
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
};
