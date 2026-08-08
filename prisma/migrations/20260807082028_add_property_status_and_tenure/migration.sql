/*
  Warnings:

  - You are about to drop the column `ownership` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Property` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Property_status_idx";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "ownership",
DROP COLUMN "status",
ADD COLUMN     "propertyStatusId" TEXT,
ADD COLUMN     "propertyTenureId" TEXT;

-- DropEnum
DROP TYPE "OwnershipType";

-- DropEnum
DROP TYPE "PropertyStatus";

-- CreateTable
CREATE TABLE "PropertyStatus" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyTenure" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyTenure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyStatus_code_key" ON "PropertyStatus"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyStatus_name_key" ON "PropertyStatus"("name");

-- CreateIndex
CREATE INDEX "PropertyStatus_isActive_idx" ON "PropertyStatus"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyTenure_code_key" ON "PropertyTenure"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyTenure_name_key" ON "PropertyTenure"("name");

-- CreateIndex
CREATE INDEX "PropertyTenure_isActive_idx" ON "PropertyTenure"("isActive");

-- CreateIndex
CREATE INDEX "Property_propertyTenureId_idx" ON "Property"("propertyTenureId");

-- CreateIndex
CREATE INDEX "Property_propertyStatusId_idx" ON "Property"("propertyStatusId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_propertyTenureId_fkey" FOREIGN KEY ("propertyTenureId") REFERENCES "PropertyTenure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_propertyStatusId_fkey" FOREIGN KEY ("propertyStatusId") REFERENCES "PropertyStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
