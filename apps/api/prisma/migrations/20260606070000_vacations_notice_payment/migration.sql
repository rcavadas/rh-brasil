-- AlterTable
ALTER TABLE "vacation_requests"
ADD COLUMN     "noticeIssuedAt" TIMESTAMP(3),
ADD COLUMN     "noticeProtocol" TEXT,
ADD COLUMN     "paymentDueAt" TIMESTAMP(3),
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paidBy" TEXT;
