/*
  Warnings:

  - You are about to drop the `BuildingDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BuildingDetail" DROP CONSTRAINT "BuildingDetail_propertyId_fkey";

-- AlterTable
ALTER TABLE "Building" ADD COLUMN     "accessibilityFeatures" TEXT,
ADD COLUMN     "yearBuilt" INTEGER;

-- DropTable
DROP TABLE "BuildingDetail";
