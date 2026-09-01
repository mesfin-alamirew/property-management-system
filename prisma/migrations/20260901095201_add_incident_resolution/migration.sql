-- CreateTable
CREATE TABLE "IncidentResolution" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "rootCause" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "correctiveAction" TEXT,
    "resolvedByUserId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IncidentResolution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IncidentResolution_incidentId_key" ON "IncidentResolution"("incidentId");

-- CreateIndex
CREATE INDEX "IncidentResolution_resolvedByUserId_idx" ON "IncidentResolution"("resolvedByUserId");

-- AddForeignKey
ALTER TABLE "IncidentResolution" ADD CONSTRAINT "IncidentResolution_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentResolution" ADD CONSTRAINT "IncidentResolution_resolvedByUserId_fkey" FOREIGN KEY ("resolvedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
