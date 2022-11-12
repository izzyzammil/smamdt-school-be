-- CreateTable
CREATE TABLE `admins` (
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `nisn` VARCHAR(191) NOT NULL,
    `registration_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `place_of_birth` VARCHAR(191) NOT NULL,
    `birth_date` DATE NOT NULL,
    `address` VARCHAR(191) NULL,
    `mother_name` VARCHAR(191) NOT NULL,
    `father_name` VARCHAR(191) NULL,
    `gender` ENUM('Laki_laki', 'Perempuan') NOT NULL DEFAULT 'Laki_laki',
    `email` VARCHAR(191) NULL,
    `date_of_entry` DATE NOT NULL,
    `status` ENUM('Siswa_Baru', 'Pindahan') NOT NULL DEFAULT 'Siswa_Baru',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `students_registration_id_key`(`registration_id`),
    PRIMARY KEY (`nisn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `place_of_birth` VARCHAR(191) NOT NULL,
    `birth_date` DATE NOT NULL,
    `address` VARCHAR(191) NULL,
    `nik` VARCHAR(191) NULL,
    `nuptk` VARCHAR(191) NULL,
    `nip` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `teachers_nuptk_key`(`nuptk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classrooms` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `homeroom` VARCHAR(191) NOT NULL,
    `program` ENUM('IPA', 'IPS', 'BAHASA') NOT NULL DEFAULT 'IPA',
    `school_year` VARCHAR(191) NOT NULL,
    `total_students` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classroom_members` (
    `classroom_id` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `student_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`classroom_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `learnings` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `teacher_id` VARCHAR(191) NOT NULL,
    `classromm_id` VARCHAR(191) NOT NULL,
    `number_of_hours` INTEGER NOT NULL DEFAULT 0,
    `assignment_decree_number` VARCHAR(191) NULL,
    `assignment_date` DATE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lesson_Schedules` (
    `id` VARCHAR(191) NOT NULL,
    `classroom_id` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `clock_order` INTEGER NOT NULL,
    `start_teaching` TIME NOT NULL,
    `end_teaching` TIME NOT NULL,
    `learning_id` VARCHAR(191) NOT NULL,
    `teacher_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students_pass` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` VARCHAR(191) NOT NULL,
    `student_name` VARCHAR(191) NOT NULL,
    `out_date` DATE NOT NULL,
    `reason_to_leave` ENUM('Lulus', 'Tidak_Lulus', 'Drop_Out', 'Berhenti_Sekolah', 'Pindah_Sekolah', 'Lainnya') NOT NULL DEFAULT 'Lulus',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `students_pass_student_id_key`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alumnis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` VARCHAR(191) NOT NULL,
    `student_name` VARCHAR(191) NOT NULL,
    `gender` ENUM('Laki_laki', 'Perempuan') NOT NULL DEFAULT 'Laki_laki',
    `place_of_birth` VARCHAR(191) NULL,
    `birth_date` DATE NULL,
    `address` VARCHAR(191) NULL,
    `number_handphone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `profession` VARCHAR(191) NULL,
    `mother_name` VARCHAR(191) NULL,
    `class_year` VARCHAR(191) NOT NULL,
    `graduation_year` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `alumnis_student_id_key`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `extracurriculars` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mentor` VARCHAR(191) NOT NULL,
    `practice_day` VARCHAR(191) NULL,
    `place` VARCHAR(191) NULL,
    `school_year` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `extracurricular_members` (
    `extracurricular_id` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `student_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`extracurricular_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `school_code` (
    `header_code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`header_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `classrooms` ADD CONSTRAINT `classrooms_homeroom_fkey` FOREIGN KEY (`homeroom`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classroom_members` ADD CONSTRAINT `classroom_members_nisn_fkey` FOREIGN KEY (`nisn`) REFERENCES `students`(`nisn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `learnings` ADD CONSTRAINT `learnings_classromm_id_fkey` FOREIGN KEY (`classromm_id`) REFERENCES `classrooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `learnings` ADD CONSTRAINT `learnings_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lesson_Schedules` ADD CONSTRAINT `lesson_Schedules_classroom_id_fkey` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lesson_Schedules` ADD CONSTRAINT `lesson_Schedules_learning_id_fkey` FOREIGN KEY (`learning_id`) REFERENCES `learnings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lesson_Schedules` ADD CONSTRAINT `lesson_Schedules_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students_pass` ADD CONSTRAINT `students_pass_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`nisn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alumnis` ADD CONSTRAINT `alumnis_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`nisn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `extracurriculars` ADD CONSTRAINT `extracurriculars_mentor_fkey` FOREIGN KEY (`mentor`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `extracurricular_members` ADD CONSTRAINT `extracurricular_members_nisn_fkey` FOREIGN KEY (`nisn`) REFERENCES `students`(`nisn`) ON DELETE RESTRICT ON UPDATE CASCADE;
