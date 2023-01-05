/*
  Warnings:

  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[registration_id,nisn]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nisn` to the `alumnis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `classroom_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `extracurricular_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nisn` to the `students_pass` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "alumnis" DROP CONSTRAINT "alumnis_student_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_members" DROP CONSTRAINT "classroom_members_nisn_fkey";

-- DropForeignKey
ALTER TABLE "extracurricular_members" DROP CONSTRAINT "extracurricular_members_nisn_fkey";

-- DropForeignKey
ALTER TABLE "students_pass" DROP CONSTRAINT "students_pass_student_id_fkey";

-- DropIndex
DROP INDEX "students_registration_id_key";

-- AlterTable
ALTER TABLE "alumnis" ADD COLUMN     "nisn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "classroom_members" ADD COLUMN     "student_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "extracurricular_members" ADD COLUMN     "student_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP CONSTRAINT "students_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "students_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "students_pass" ADD COLUMN     "nisn" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_registration_id_nisn_key" ON "students"("registration_id", "nisn");

-- AddForeignKey
ALTER TABLE "classroom_members" ADD CONSTRAINT "classroom_members_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students_pass" ADD CONSTRAINT "students_pass_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumnis" ADD CONSTRAINT "alumnis_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extracurricular_members" ADD CONSTRAINT "extracurricular_members_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
