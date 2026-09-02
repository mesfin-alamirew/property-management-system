-- AlterTable
ALTER TABLE "Retirement" ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "cancelledByUserId" TEXT;

-- CreateIndex
CREATE INDEX "Retirement_cancelledByUserId_idx" ON "Retirement"("cancelledByUserId");

-- AddForeignKey
ALTER TABLE "Retirement" ADD CONSTRAINT "Retirement_cancelledByUserId_fkey" FOREIGN KEY ("cancelledByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
