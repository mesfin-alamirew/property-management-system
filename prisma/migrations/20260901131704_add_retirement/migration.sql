-- CreateEnum
CREATE TYPE "RetirementStatus" AS ENUM ('DRAFT', 'REQUESTED', 'APPROVED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Retirement" (
    "id" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "retirementDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "conditionId" TEXT NOT NULL,
    "status" "RetirementStatus" NOT NULL DEFAULT 'DRAFT',
    "requestedByUserId" TEXT NOT NULL,
    "approvedByUserId" TEXT,
    "approvedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Retirement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Retirement_referenceNumber_key" ON "Retirement"("referenceNumber");

-- CreateIndex
CREATE INDEX "Retirement_conditionId_idx" ON "Retirement"("conditionId");

-- CreateIndex
CREATE INDEX "Retirement_status_idx" ON "Retirement"("status");

-- CreateIndex
CREATE INDEX "Retirement_requestedByUserId_idx" ON "Retirement"("requestedByUserId");

-- CreateIndex
CREATE INDEX "Retirement_approvedByUserId_idx" ON "Retirement"("approvedByUserId");

-- CreateIndex
CREATE INDEX "Retirement_retirementDate_idx" ON "Retirement"("retirementDate");

-- CreateIndex
CREATE UNIQUE INDEX "Retirement_assetId_key" ON "Retirement"("assetId");

-- AddForeignKey
ALTER TABLE "Retirement" ADD CONSTRAINT "Retirement_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retirement" ADD CONSTRAINT "Retirement_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "AssetCondition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retirement" ADD CONSTRAINT "Retirement_requestedByUserId_fkey" FOREIGN KEY ("requestedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retirement" ADD CONSTRAINT "Retirement_approvedByUserId_fkey" FOREIGN KEY ("approvedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
