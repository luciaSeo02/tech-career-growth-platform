-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserProfileSkill" DROP CONSTRAINT "UserProfileSkill_profileId_fkey";

-- CreateTable
CREATE TABLE "JobMarket" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT,
    "location" TEXT,
    "workMode" "WorkMode",
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "source" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "publishedAt" TIMESTAMP(3),
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobMarket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobMarketSkill" (
    "id" TEXT NOT NULL,
    "jobMarketId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "JobMarketSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillDemand" (
    "id" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "period" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SkillDemand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobMarket_sourceUrl_key" ON "JobMarket"("sourceUrl");

-- CreateIndex
CREATE UNIQUE INDEX "JobMarketSkill_jobMarketId_skillId_key" ON "JobMarketSkill"("jobMarketId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "SkillDemand_skillId_region_period_key" ON "SkillDemand"("skillId", "region", "period");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileSkill" ADD CONSTRAINT "UserProfileSkill_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobMarketSkill" ADD CONSTRAINT "JobMarketSkill_jobMarketId_fkey" FOREIGN KEY ("jobMarketId") REFERENCES "JobMarket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobMarketSkill" ADD CONSTRAINT "JobMarketSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillDemand" ADD CONSTRAINT "SkillDemand_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
