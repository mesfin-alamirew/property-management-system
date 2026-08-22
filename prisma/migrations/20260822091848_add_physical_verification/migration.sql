/*
  Warnings:

  - You are about to drop the column `observedConditionId` on the `PhysicalVerificationItem` table. All the data in the column will be lost.
  - You are about to drop the column `observedEmployeeId` on the `PhysicalVerificationItem` table. All the data in the column will be lost.
  - You are about to drop the column `observedLocationId` on the `PhysicalVerificationItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PhysicalVerificationItem" DROP COLUMN "observedConditionId",
DROP COLUMN "observedEmployeeId",
DROP COLUMN "observedLocationId";
