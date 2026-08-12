/*
  Warnings:

  - You are about to drop the column `description` on the `BuildingSpace` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BuildingSpace" DROP CONSTRAINT "BuildingSpace_buildingId_fkey";

-- AlterTable
ALTER TABLE "BuildingSpace" DROP COLUMN "description";

-- CreateTable
CREATE TABLE "OwnershipType" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OwnershipType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ownership" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "ownershipTypeId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "acquisitionDate" TIMESTAMP(3),
    "acquisitionPrice" DECIMAL(18,2),
    "acquisitionCurrency" TEXT,
    "deedNumber" TEXT,
    "legalReference" TEXT,
    "registrationAuthority" TEXT,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ownership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OwnershipType_code_key" ON "OwnershipType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "OwnershipType_name_key" ON "OwnershipType"("name");

-- CreateIndex
CREATE INDEX "Ownership_propertyId_idx" ON "Ownership"("propertyId");

-- CreateIndex
CREATE INDEX "Ownership_ownershipTypeId_idx" ON "Ownership"("ownershipTypeId");

-- CreateIndex
CREATE INDEX "Ownership_propertyId_isActive_idx" ON "Ownership"("propertyId", "isActive");

-- AddForeignKey
ALTER TABLE "BuildingSpace" ADD CONSTRAINT "BuildingSpace_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ownership" ADD CONSTRAINT "Ownership_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ownership" ADD CONSTRAINT "Ownership_ownershipTypeId_fkey" FOREIGN KEY ("ownershipTypeId") REFERENCES "OwnershipType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
