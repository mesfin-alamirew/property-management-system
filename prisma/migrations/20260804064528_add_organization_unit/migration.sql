-- CreateEnum
CREATE TYPE "OrganizationUnitType" AS ENUM ('HEADQUARTERS', 'REGIONAL_OFFICE', 'COUNTRY_OFFICE', 'LIAISON_OFFICE', 'PROJECT_OFFICE', 'FIELD_OFFICE');

-- CreateTable
CREATE TABLE "OrganizationUnit" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "OrganizationUnitType" NOT NULL,
    "countryId" TEXT,
    "parentId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUnit_code_key" ON "OrganizationUnit"("code");

-- CreateIndex
CREATE INDEX "OrganizationUnit_countryId_idx" ON "OrganizationUnit"("countryId");

-- CreateIndex
CREATE INDEX "OrganizationUnit_parentId_idx" ON "OrganizationUnit"("parentId");

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "OrganizationUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
