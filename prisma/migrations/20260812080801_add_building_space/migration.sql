-- CreateTable
CREATE TABLE "BuildingSpace" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "spaceTypeId" TEXT NOT NULL,
    "floorNumber" INTEGER,
    "areaSqm" DECIMAL(65,30),
    "capacity" INTEGER,
    "description" TEXT,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuildingSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildingSpaceType" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuildingSpaceType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BuildingSpace_buildingId_idx" ON "BuildingSpace"("buildingId");

-- CreateIndex
CREATE INDEX "BuildingSpace_spaceTypeId_idx" ON "BuildingSpace"("spaceTypeId");

-- CreateIndex
CREATE INDEX "BuildingSpace_isActive_idx" ON "BuildingSpace"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "BuildingSpace_buildingId_code_key" ON "BuildingSpace"("buildingId", "code");

-- CreateIndex
CREATE INDEX "BuildingSpaceType_isActive_idx" ON "BuildingSpaceType"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "BuildingSpaceType_code_key" ON "BuildingSpaceType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "BuildingSpaceType_name_key" ON "BuildingSpaceType"("name");

-- AddForeignKey
ALTER TABLE "BuildingSpace" ADD CONSTRAINT "BuildingSpace_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildingSpace" ADD CONSTRAINT "BuildingSpace_spaceTypeId_fkey" FOREIGN KEY ("spaceTypeId") REFERENCES "BuildingSpaceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
