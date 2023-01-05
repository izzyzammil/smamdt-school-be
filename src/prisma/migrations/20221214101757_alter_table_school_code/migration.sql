/*
  Warnings:

  - Added the required column `next_counter` to the `school_code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "school_code" ADD COLUMN     "counter_length" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "next_counter" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
