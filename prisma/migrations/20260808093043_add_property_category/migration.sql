-- DropIndex
DROP INDEX "Property_name_idx";

-- DropIndex
DROP INDEX "Property_propertyCode_idx";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "propertyCategoryId" TEXT;

-- CreateTable
CREATE TABLE "PropertyCategory" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parentId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyCategory_code_key" ON "PropertyCategory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyCategory_name_key" ON "PropertyCategory"("name");

-- CreateIndex
CREATE INDEX "PropertyCategory_parentId_idx" ON "PropertyCategory"("parentId");

-- CreateIndex
CREATE INDEX "PropertyCategory_isActive_idx" ON "PropertyCategory"("isActive");

-- CreateIndex
CREATE INDEX "Property_propertyCategoryId_idx" ON "Property"("propertyCategoryId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_propertyCategoryId_fkey" FOREIGN KEY ("propertyCategoryId") REFERENCES "PropertyCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyCategory" ADD CONSTRAINT "PropertyCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "PropertyCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
