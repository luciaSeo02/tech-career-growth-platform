/*
  Warnings:

  - The `level` column on the `UserProfileSkill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `experienceLevel` on the `UserProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('JUNIOR', 'MID', 'SENIOR', 'LEAD');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "experienceLevel",
ADD COLUMN     "experienceLevel" "ExperienceLevel" NOT NULL;

-- AlterTable
ALTER TABLE "UserProfileSkill" DROP COLUMN "level",
ADD COLUMN     "level" "SkillLevel";
