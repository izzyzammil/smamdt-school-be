/*
  Warnings:

  - You are about to drop the column `is_active` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lesson_schedules` MODIFY `start_teaching` TIME NOT NULL,
    MODIFY `end_teaching` TIME NOT NULL;

-- AlterTable
ALTER TABLE `students` DROP COLUMN `is_active`,
    ADD COLUMN `file` VARCHAR(191) NULL,
    ADD COLUMN `url` VARCHAR(191) NULL,
    MODIFY `status` ENUM('Siswa_Baru', 'Pindahan', 'Lulus', 'Tidak_Lulus', 'Berhenti') NOT NULL DEFAULT 'Siswa_Baru';

-- AlterTable
ALTER TABLE `teachers` ADD COLUMN `file` VARCHAR(191) NULL,
    ADD COLUMN `gender` ENUM('Laki_laki', 'Perempuan') NOT NULL DEFAULT 'Laki_laki',
    ADD COLUMN `status` ENUM('Aktif', 'Cuti', 'Mutasi', 'Berhenti') NOT NULL DEFAULT 'Aktif',
    ADD COLUMN `url` VARCHAR(191) NULL;
