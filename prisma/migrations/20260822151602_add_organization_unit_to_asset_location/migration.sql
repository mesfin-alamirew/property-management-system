/*
  Add organizationUnitId to AssetLocation.

  Existing locations are assigned to:
  HQ - Headquarters
*/

-- 1. Add the column temporarily as nullable
ALTER TABLE "AssetLocation"
ADD COLUMN "organizationUnitId" TEXT;

-- 2. Assign all existing locations to Headquarters
UPDATE "AssetLocation"
SET "organizationUnitId" = (
  SELECT "id"
  FROM "OrganizationUnit"
  WHERE "code" = 'HQ'
);

-- 3. Make the column mandatory
ALTER TABLE "AssetLocation"
ALTER COLUMN "organizationUnitId" SET NOT NULL;

-- 4. Create the index
CREATE INDEX "AssetLocation_organizationUnitId_idx"
ON "AssetLocation"("organizationUnitId");

-- 5. Create the foreign key
ALTER TABLE "AssetLocation"
ADD CONSTRAINT "AssetLocation_organizationUnitId_fkey"
FOREIGN KEY ("organizationUnitId")
REFERENCES "OrganizationUnit"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;