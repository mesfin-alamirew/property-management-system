-- CreateEnum
CREATE TYPE "PhysicalVerificationScope" AS ENUM ('ORGANIZATION', 'ORGANIZATION_UNIT', 'LOCATION', 'ORGANIZATION_UNIT_LOCATION', 'SELECTED_ASSETS');

-- CreateEnum
CREATE TYPE "PhysicalVerificationStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PhysicalVerificationResult" AS ENUM ('PENDING', 'VERIFIED', 'NOT_FOUND', 'LOCATION_MISMATCH', 'CUSTODIAN_MISMATCH', 'CONDITION_MISMATCH', 'IDENTIFICATION_MISMATCH', 'MULTIPLE_DISCREPANCIES');

-- CreateTable
CREATE TABLE "PhysicalVerification" (
    "id" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "scope" "PhysicalVerificationScope" NOT NULL,
    "organizationUnitId" TEXT,
    "locationId" TEXT,
    "status" "PhysicalVerificationStatus" NOT NULL DEFAULT 'DRAFT',
    "scheduledAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhysicalVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhysicalVerificationItem" (
    "id" TEXT NOT NULL,
    "verificationId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "expectedAssetCode" TEXT NOT NULL,
    "expectedAssetTag" TEXT,
    "expectedSerialNumber" TEXT,
    "expectedAssetName" TEXT NOT NULL,
    "expectedEmployeeId" TEXT,
    "expectedEmployeeNumber" TEXT,
    "expectedEmployeeName" TEXT,
    "expectedLocationId" TEXT,
    "expectedLocationCode" TEXT,
    "expectedLocationName" TEXT,
    "expectedConditionId" TEXT,
    "expectedConditionCode" TEXT,
    "expectedConditionName" TEXT,
    "observedAssetTag" TEXT,
    "observedSerialNumber" TEXT,
    "observedEmployeeId" TEXT,
    "observedEmployeeNumber" TEXT,
    "observedEmployeeName" TEXT,
    "observedLocationId" TEXT,
    "observedLocationCode" TEXT,
    "observedLocationName" TEXT,
    "observedConditionId" TEXT,
    "observedConditionCode" TEXT,
    "observedConditionName" TEXT,
    "result" "PhysicalVerificationResult" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "verifiedByUserId" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhysicalVerificationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnregisteredAssetObservation" (
    "id" TEXT NOT NULL,
    "verificationId" TEXT NOT NULL,
    "observedAssetTag" TEXT,
    "observedSerialNumber" TEXT,
    "observedName" TEXT NOT NULL,
    "observedLocationId" TEXT,
    "observedLocationCode" TEXT,
    "observedLocationName" TEXT,
    "observedConditionId" TEXT,
    "observedConditionCode" TEXT,
    "observedConditionName" TEXT,
    "notes" TEXT,
    "observedByUserId" TEXT NOT NULL,
    "observedAt" TIMESTAMP(3) NOT NULL,
    "registeredAssetId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnregisteredAssetObservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalVerification_referenceNumber_key" ON "PhysicalVerification"("referenceNumber");

-- CreateIndex
CREATE INDEX "PhysicalVerification_status_idx" ON "PhysicalVerification"("status");

-- CreateIndex
CREATE INDEX "PhysicalVerification_scope_idx" ON "PhysicalVerification"("scope");

-- CreateIndex
CREATE INDEX "PhysicalVerification_organizationUnitId_idx" ON "PhysicalVerification"("organizationUnitId");

-- CreateIndex
CREATE INDEX "PhysicalVerification_locationId_idx" ON "PhysicalVerification"("locationId");

-- CreateIndex
CREATE INDEX "PhysicalVerification_createdByUserId_idx" ON "PhysicalVerification"("createdByUserId");

-- CreateIndex
CREATE INDEX "PhysicalVerificationItem_assetId_idx" ON "PhysicalVerificationItem"("assetId");

-- CreateIndex
CREATE INDEX "PhysicalVerificationItem_verificationId_idx" ON "PhysicalVerificationItem"("verificationId");

-- CreateIndex
CREATE INDEX "PhysicalVerificationItem_result_idx" ON "PhysicalVerificationItem"("result");

-- CreateIndex
CREATE INDEX "PhysicalVerificationItem_expectedEmployeeId_idx" ON "PhysicalVerificationItem"("expectedEmployeeId");

-- CreateIndex
CREATE INDEX "PhysicalVerificationItem_expectedLocationId_idx" ON "PhysicalVerificationItem"("expectedLocationId");

-- CreateIndex
CREATE INDEX "PhysicalVerificationItem_expectedConditionId_idx" ON "PhysicalVerificationItem"("expectedConditionId");

-- CreateIndex
CREATE INDEX "PhysicalVerificationItem_verifiedByUserId_idx" ON "PhysicalVerificationItem"("verifiedByUserId");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalVerificationItem_verificationId_assetId_key" ON "PhysicalVerificationItem"("verificationId", "assetId");

-- CreateIndex
CREATE INDEX "UnregisteredAssetObservation_verificationId_idx" ON "UnregisteredAssetObservation"("verificationId");

-- CreateIndex
CREATE INDEX "UnregisteredAssetObservation_observedLocationId_idx" ON "UnregisteredAssetObservation"("observedLocationId");

-- CreateIndex
CREATE INDEX "UnregisteredAssetObservation_observedConditionId_idx" ON "UnregisteredAssetObservation"("observedConditionId");

-- CreateIndex
CREATE INDEX "UnregisteredAssetObservation_observedByUserId_idx" ON "UnregisteredAssetObservation"("observedByUserId");

-- CreateIndex
CREATE INDEX "UnregisteredAssetObservation_registeredAssetId_idx" ON "UnregisteredAssetObservation"("registeredAssetId");

-- AddForeignKey
ALTER TABLE "PhysicalVerification" ADD CONSTRAINT "PhysicalVerification_organizationUnitId_fkey" FOREIGN KEY ("organizationUnitId") REFERENCES "OrganizationUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalVerification" ADD CONSTRAINT "PhysicalVerification_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "AssetLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalVerification" ADD CONSTRAINT "PhysicalVerification_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalVerificationItem" ADD CONSTRAINT "PhysicalVerificationItem_verificationId_fkey" FOREIGN KEY ("verificationId") REFERENCES "PhysicalVerification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalVerificationItem" ADD CONSTRAINT "PhysicalVerificationItem_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalVerificationItem" ADD CONSTRAINT "PhysicalVerificationItem_expectedEmployeeId_fkey" FOREIGN KEY ("expectedEmployeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalVerificationItem" ADD CONSTRAINT "PhysicalVerificationItem_expectedLocationId_fkey" FOREIGN KEY ("expectedLocationId") REFERENCES "AssetLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalVerificationItem" ADD CONSTRAINT "PhysicalVerificationItem_expectedConditionId_fkey" FOREIGN KEY ("expectedConditionId") REFERENCES "AssetCondition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalVerificationItem" ADD CONSTRAINT "PhysicalVerificationItem_verifiedByUserId_fkey" FOREIGN KEY ("verifiedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnregisteredAssetObservation" ADD CONSTRAINT "UnregisteredAssetObservation_verificationId_fkey" FOREIGN KEY ("verificationId") REFERENCES "PhysicalVerification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnregisteredAssetObservation" ADD CONSTRAINT "UnregisteredAssetObservation_observedLocationId_fkey" FOREIGN KEY ("observedLocationId") REFERENCES "AssetLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnregisteredAssetObservation" ADD CONSTRAINT "UnregisteredAssetObservation_observedConditionId_fkey" FOREIGN KEY ("observedConditionId") REFERENCES "AssetCondition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnregisteredAssetObservation" ADD CONSTRAINT "UnregisteredAssetObservation_observedByUserId_fkey" FOREIGN KEY ("observedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnregisteredAssetObservation" ADD CONSTRAINT "UnregisteredAssetObservation_registeredAssetId_fkey" FOREIGN KEY ("registeredAssetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
