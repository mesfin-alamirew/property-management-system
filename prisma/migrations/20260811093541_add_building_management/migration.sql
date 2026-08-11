-- CreateTable
CREATE TABLE "BuildingType" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuildingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildingCondition" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuildingCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "buildingCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "propertyId" TEXT NOT NULL,
    "buildingTypeId" TEXT NOT NULL,
    "buildingConditionId" TEXT,
    "numberOfFloors" INTEGER,
    "numberOfBasements" INTEGER,
    "yearRenovated" INTEGER,
    "floorAreaSqm" DECIMAL(65,30),
    "usableAreaSqm" DECIMAL(65,30),
    "numberOfRooms" INTEGER,
    "numberOfUnits" INTEGER,
    "parkingCapacity" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildingDetail" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "buildingCode" TEXT,
    "buildingName" TEXT,
    "buildingType" TEXT,
    "numberOfFloors" INTEGER,
    "numberOfBasements" INTEGER,
    "yearBuilt" INTEGER,
    "yearRenovated" INTEGER,
    "floorAreaSqm" DECIMAL(65,30),
    "usableAreaSqm" DECIMAL(65,30),
    "numberOfRooms" INTEGER,
    "numberOfUnits" INTEGER,
    "parkingCapacity" INTEGER,
    "condition" TEXT,
    "accessibilityFeatures" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuildingDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BuildingType_code_key" ON "BuildingType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "BuildingType_name_key" ON "BuildingType"("name");

-- CreateIndex
CREATE INDEX "BuildingType_isActive_idx" ON "BuildingType"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "BuildingCondition_code_key" ON "BuildingCondition"("code");

-- CreateIndex
CREATE UNIQUE INDEX "BuildingCondition_name_key" ON "BuildingCondition"("name");

-- CreateIndex
CREATE INDEX "BuildingCondition_isActive_idx" ON "BuildingCondition"("isActive");

-- CreateIndex
CREATE INDEX "Building_propertyId_idx" ON "Building"("propertyId");

-- CreateIndex
CREATE INDEX "Building_buildingTypeId_idx" ON "Building"("buildingTypeId");

-- CreateIndex
CREATE INDEX "Building_buildingConditionId_idx" ON "Building"("buildingConditionId");

-- CreateIndex
CREATE INDEX "Building_isActive_idx" ON "Building"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Building_propertyId_buildingCode_key" ON "Building"("propertyId", "buildingCode");

-- CreateIndex
CREATE UNIQUE INDEX "BuildingDetail_propertyId_key" ON "BuildingDetail"("propertyId");

-- CreateIndex
CREATE INDEX "BuildingDetail_buildingType_idx" ON "BuildingDetail"("buildingType");

-- CreateIndex
CREATE INDEX "BuildingDetail_condition_idx" ON "BuildingDetail"("condition");

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_buildingTypeId_fkey" FOREIGN KEY ("buildingTypeId") REFERENCES "BuildingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_buildingConditionId_fkey" FOREIGN KEY ("buildingConditionId") REFERENCES "BuildingCondition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildingDetail" ADD CONSTRAINT "BuildingDetail_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
