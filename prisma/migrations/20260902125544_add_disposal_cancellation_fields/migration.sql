-- AlterTable
ALTER TABLE "Disposal" ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "cancelledByUserId" TEXT;

-- CreateIndex
CREATE INDEX "Disposal_cancelledByUserId_idx" ON "Disposal"("cancelledByUserId");

-- AddForeignKey
ALTER TABLE "Disposal" ADD CONSTRAINT "Disposal_cancelledByUserId_fkey" FOREIGN KEY ("cancelledByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
