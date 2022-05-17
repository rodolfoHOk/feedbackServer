/*
  Warnings:

  - Added the required column `created_at` to the `feedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('PENDING', 'REJECTED', 'RESOLVED', 'UNDER_ANALYSIS');

-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "modified_at" TIMESTAMP(3),
ADD COLUMN     "status" "FeedbackStatus" NOT NULL;
