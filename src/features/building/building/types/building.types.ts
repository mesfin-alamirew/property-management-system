export type BuildingWithRelations = {
  id: string;

  propertyId: string;
  buildingCode: string;
  name: string;
  description: string | null;

  buildingTypeId: string;
  buildingConditionId: string | null;

  numberOfFloors: number | null;
  numberOfBasements: number | null;
  yearBuilt: number | null;
  yearRenovated: number | null;

  floorAreaSqm: string | null;
  usableAreaSqm: string | null;

  numberOfRooms: number | null;
  numberOfUnits: number | null;
  parkingCapacity: number | null;

  isActive: boolean;
  accessibilityFeatures: string | null;
  notes: string | null;

  createdAt: Date;
  updatedAt: Date;

  property: {
    id: string;
    propertyCode: string;
    name: string;
  };

  buildingType: {
    id: string;
    code: string;
    name: string;
  };

  buildingCondition: {
    id: string;
    code: string;
    name: string;
  } | null;
};
