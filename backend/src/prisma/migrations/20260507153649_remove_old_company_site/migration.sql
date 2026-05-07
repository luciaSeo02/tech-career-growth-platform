/*
  Warnings:

  - The values [COMPANY_SITE] on the enum `ApplicationSource` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationSource_new" AS ENUM ('LINKEDIN', 'INDEED', 'INFOJOBS', 'GLASSDOOR', 'COMPANY_WEBSITE', 'REFERRAL', 'RECRUITER', 'JOB_BOARD', 'OTHER');
ALTER TABLE "public"."JobApplication" ALTER COLUMN "source" DROP DEFAULT;
ALTER TABLE "JobApplication" ALTER COLUMN "source" TYPE "ApplicationSource_new" USING ("source"::text::"ApplicationSource_new");
ALTER TYPE "ApplicationSource" RENAME TO "ApplicationSource_old";
ALTER TYPE "ApplicationSource_new" RENAME TO "ApplicationSource";
DROP TYPE "public"."ApplicationSource_old";
ALTER TABLE "JobApplication" ALTER COLUMN "source" SET DEFAULT 'OTHER';
COMMIT;
