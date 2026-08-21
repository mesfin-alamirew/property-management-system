/*
  Warnings:

  - Added the required column `assignedByUserId` to the `AssetAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssetAssignment" ADD COLUMN     "assignedByUserId" TEXT NOT NULL,
ADD COLUMN     "returnedByUserId" TEXT;

-- CreateIndex
CREATE INDEX "AssetAssignment_assignedByUserId_idx" ON "AssetAssignment"("assignedByUserId");

-- CreateIndex
CREATE INDEX "AssetAssignment_returnedByUserId_idx" ON "AssetAssignment"("returnedByUserId");

-- AddForeignKey
ALTER TABLE "AssetAssignment" ADD CONSTRAINT "AssetAssignment_assignedByUserId_fkey" FOREIGN KEY ("assignedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetAssignment" ADD CONSTRAINT "AssetAssignment_returnedByUserId_fkey" FOREIGN KEY ("returnedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
