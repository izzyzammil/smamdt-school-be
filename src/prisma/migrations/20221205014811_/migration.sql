-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Laki_laki', 'Perempuan');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('Siswa_Baru', 'Pindahan', 'Lulus', 'Tidak_Lulus', 'Berhenti');

-- CreateEnum
CREATE TYPE "TeacherStatus" AS ENUM ('Aktif', 'Cuti', 'Mutasi', 'Berhenti');

-- CreateEnum
CREATE TYPE "Program" AS ENUM ('IPA', 'IPS', 'BAHASA');

-- CreateEnum
CREATE TYPE "ReasonToLeave" AS ENUM ('Lulus', 'Tidak_Lulus', 'Drop_Out', 'Berhenti_Sekolah', 'Pindah_Sekolah', 'Lainnya');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin', 'Student', 'Teacher');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Roles" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "username" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "students" (
    "nisn" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "registration_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'Laki_laki',
    "place_of_birth" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "address" TEXT,
    "mother_name" TEXT NOT NULL,
    "father_name" TEXT,
    "email" TEXT,
    "date_of_entry" DATE NOT NULL,
    "status" "StudentStatus" NOT NULL DEFAULT 'Siswa_Baru',
    "file" TEXT,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("nisn")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'Laki_laki',
    "place_of_birth" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "address" TEXT,
    "nik" TEXT,
    "nuptk" TEXT,
    "nip" TEXT,
    "email" TEXT,
    "status" "TeacherStatus" NOT NULL DEFAULT 'Aktif',
    "file" TEXT,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "homeroom" TEXT NOT NULL,
    "program" "Program" NOT NULL DEFAULT 'IPA',
    "school_year" TEXT NOT NULL,
    "total_students" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classroom_members" (
    "classroom_id" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classroom_members_pkey" PRIMARY KEY ("classroom_id")
);

-- CreateTable
CREATE TABLE "learnings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "classromm_id" TEXT NOT NULL,
    "number_of_hours" INTEGER NOT NULL DEFAULT 0,
    "assignment_decree_number" TEXT,
    "assignment_date" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "learnings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_Schedules" (
    "id" TEXT NOT NULL,
    "classroom_id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "clock_order" INTEGER NOT NULL,
    "start_teaching" TIME NOT NULL,
    "end_teaching" TIME NOT NULL,
    "learning_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_Schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students_pass" (
    "id" SERIAL NOT NULL,
    "student_id" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "out_date" DATE NOT NULL,
    "reason_to_leave" "ReasonToLeave" NOT NULL DEFAULT 'Lulus',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alumnis" (
    "id" SERIAL NOT NULL,
    "student_id" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'Laki_laki',
    "place_of_birth" TEXT,
    "birth_date" DATE,
    "address" TEXT,
    "number_handphone" TEXT,
    "email" TEXT,
    "profession" TEXT,
    "mother_name" TEXT,
    "class_year" TEXT NOT NULL,
    "graduation_year" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alumnis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extracurriculars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mentor" TEXT NOT NULL,
    "practice_day" TEXT,
    "place" TEXT,
    "school_year" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "extracurriculars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extracurricular_members" (
    "extracurricular_id" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "extracurricular_members_pkey" PRIMARY KEY ("extracurricular_id")
);

-- CreateTable
CREATE TABLE "school_code" (
    "header_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "school_code_pkey" PRIMARY KEY ("header_code")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_registration_id_key" ON "students"("registration_id");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_nuptk_key" ON "teachers"("nuptk");

-- CreateIndex
CREATE UNIQUE INDEX "students_pass_student_id_key" ON "students_pass"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "alumnis_student_id_key" ON "alumnis"("student_id");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_homeroom_fkey" FOREIGN KEY ("homeroom") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom_members" ADD CONSTRAINT "classroom_members_nisn_fkey" FOREIGN KEY ("nisn") REFERENCES "students"("nisn") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learnings" ADD CONSTRAINT "learnings_classromm_id_fkey" FOREIGN KEY ("classromm_id") REFERENCES "classrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learnings" ADD CONSTRAINT "learnings_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_Schedules" ADD CONSTRAINT "lesson_Schedules_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_Schedules" ADD CONSTRAINT "lesson_Schedules_learning_id_fkey" FOREIGN KEY ("learning_id") REFERENCES "learnings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_Schedules" ADD CONSTRAINT "lesson_Schedules_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students_pass" ADD CONSTRAINT "students_pass_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("nisn") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumnis" ADD CONSTRAINT "alumnis_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("nisn") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extracurriculars" ADD CONSTRAINT "extracurriculars_mentor_fkey" FOREIGN KEY ("mentor") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extracurricular_members" ADD CONSTRAINT "extracurricular_members_nisn_fkey" FOREIGN KEY ("nisn") REFERENCES "students"("nisn") ON DELETE RESTRICT ON UPDATE CASCADE;
