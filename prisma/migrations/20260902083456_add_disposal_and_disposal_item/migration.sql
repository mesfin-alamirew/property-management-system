-- CreateEnum
CREATE TYPE "DisposalStatus" AS ENUM ('DRAFT', 'REQUESTED', 'APPROVED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Disposal" (
    "id" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "disposalDate" TIMESTAMP(3) NOT NULL,
    "method" TEXT NOT NULL,
    "reason" TEXT,
    "status" "DisposalStatus" NOT NULL DEFAULT 'DRAFT',
    "requestedByUserId" TEXT NOT NULL,
    "approvedByUserId" TEXT,
    "approvedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Disposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisposalItem" (
    "id" TEXT NOT NULL,
    "disposalId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DisposalItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Disposal_referenceNumber_key" ON "Disposal"("referenceNumber");

-- CreateIndex
CREATE INDEX "Disposal_status_idx" ON "Disposal"("status");

-- CreateIndex
CREATE INDEX "Disposal_requestedByUserId_idx" ON "Disposal"("requestedByUserId");

-- CreateIndex
CREATE INDEX "Disposal_approvedByUserId_idx" ON "Disposal"("approvedByUserId");

-- CreateIndex
CREATE INDEX "Disposal_disposalDate_idx" ON "Disposal"("disposalDate");

-- CreateIndex
CREATE INDEX "DisposalItem_assetId_idx" ON "DisposalItem"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "DisposalItem_disposalId_assetId_key" ON "DisposalItem"("disposalId", "assetId");

-- AddForeignKey
ALTER TABLE "Disposal" ADD CONSTRAINT "Disposal_requestedByUserId_fkey" FOREIGN KEY ("requestedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disposal" ADD CONSTRAINT "Disposal_approvedByUserId_fkey" FOREIGN KEY ("approvedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisposalItem" ADD CONSTRAINT "DisposalItem_disposalId_fkey" FOREIGN KEY ("disposalId") REFERENCES "Disposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisposalItem" ADD CONSTRAINT "DisposalItem_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
