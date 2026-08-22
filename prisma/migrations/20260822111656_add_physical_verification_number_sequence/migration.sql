-- CreateTable
CREATE TABLE "PhysicalVerificationNumberSequence" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "lastNumber" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhysicalVerificationNumberSequence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalVerificationNumberSequence_year_key" ON "PhysicalVerificationNumberSequence"("year");
