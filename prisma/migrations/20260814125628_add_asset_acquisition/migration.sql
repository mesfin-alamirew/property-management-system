-- CreateTable
CREATE TABLE "AcquisitionMethod" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcquisitionMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Acquisition" (
    "id" TEXT NOT NULL,
    "acquisitionNumber" TEXT NOT NULL,
    "acquisitionDate" TIMESTAMP(3) NOT NULL,
    "acquisitionMethodId" TEXT NOT NULL,
    "supplierName" TEXT,
    "referenceNumber" TEXT,
    "description" TEXT,
    "fundingSource" TEXT,
    "totalAmount" DECIMAL(65,30),
    "currency" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Acquisition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcquisitionItem" (
    "id" TEXT NOT NULL,
    "acquisitionId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "unitCost" DECIMAL(65,30),
    "totalCost" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcquisitionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AcquisitionMethod_code_key" ON "AcquisitionMethod"("code");

-- CreateIndex
CREATE INDEX "AcquisitionMethod_isActive_idx" ON "AcquisitionMethod"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Acquisition_acquisitionNumber_key" ON "Acquisition"("acquisitionNumber");

-- CreateIndex
CREATE INDEX "Acquisition_acquisitionMethodId_idx" ON "Acquisition"("acquisitionMethodId");

-- CreateIndex
CREATE INDEX "Acquisition_acquisitionDate_idx" ON "Acquisition"("acquisitionDate");

-- CreateIndex
CREATE UNIQUE INDEX "AcquisitionItem_assetId_key" ON "AcquisitionItem"("assetId");

-- CreateIndex
CREATE INDEX "AcquisitionItem_acquisitionId_idx" ON "AcquisitionItem"("acquisitionId");

-- AddForeignKey
ALTER TABLE "Acquisition" ADD CONSTRAINT "Acquisition_acquisitionMethodId_fkey" FOREIGN KEY ("acquisitionMethodId") REFERENCES "AcquisitionMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcquisitionItem" ADD CONSTRAINT "AcquisitionItem_acquisitionId_fkey" FOREIGN KEY ("acquisitionId") REFERENCES "Acquisition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcquisitionItem" ADD CONSTRAINT "AcquisitionItem_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
