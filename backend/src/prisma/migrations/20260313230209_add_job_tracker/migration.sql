-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('SAVED', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'GHOSTED');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('STARTUP', 'SCALEUP', 'CORPORATE', 'CONSULTORA', 'AGENCY', 'OTHER');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('REMOTE', 'HYBRID', 'ONSITE');

-- CreateEnum
CREATE TYPE "ApplicationSource" AS ENUM ('LINKEDIN', 'INFOJOBS', 'INDEED', 'COMPANY_SITE', 'REFERRAL', 'OTHER');

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "url" TEXT,
    "location" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SAVED',
    "source" "ApplicationSource" NOT NULL DEFAULT 'OTHER',
    "companyType" "CompanyType",
    "workMode" "WorkMode",
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "notes" TEXT,
    "appliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplicationSkill" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "JobApplicationSkill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobApplicationSkill_applicationId_skillId_key" ON "JobApplicationSkill"("applicationId", "skillId");

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicationSkill" ADD CONSTRAINT "JobApplicationSkill_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "JobApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicationSkill" ADD CONSTRAINT "JobApplicationSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
