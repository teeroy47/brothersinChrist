-- CreateTable
CREATE TABLE "roles" (
    "id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_statuses" (
    "id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "attendance_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_roles" (
    "id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "group_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_statuses" (
    "id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "review_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journey_stages" (
    "id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "journey_stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "roleId" INTEGER NOT NULL DEFAULT 10,
    "currentLevelId" UUID,
    "journeyStageId" INTEGER NOT NULL DEFAULT 10,
    "joinedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "fullName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT,
    "ageRange" TEXT,
    "church" TEXT,
    "occupation" TEXT,
    "maritalStatus" TEXT,
    "testimony" TEXT,
    "spiritualGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "fitnessGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journey_stage_history" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "stageId" INTEGER NOT NULL,
    "enteredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "journey_stage_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "levels" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "levelNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "expectations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "curriculum" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "growthMarkers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "meetings" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_practices" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "practiceDate" DATE NOT NULL,
    "prayed" BOOLEAN NOT NULL DEFAULT false,
    "readBible" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_practices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "weekLabel" TEXT NOT NULL,
    "weekStartDate" DATE NOT NULL,
    "prayerDays" INTEGER NOT NULL DEFAULT 0,
    "bibleDays" INTEGER NOT NULL DEFAULT 0,
    "attendedMeeting" BOOLEAN NOT NULL DEFAULT false,
    "metAccountability" BOOLEAN NOT NULL DEFAULT false,
    "servingContribution" TEXT,
    "strugglesAndNeeds" TEXT,
    "praiseReport" TEXT,
    "flags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading_plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "daysTotal" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reading_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devotions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "planId" UUID NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "scriptureReference" TEXT NOT NULL,
    "passageText" TEXT NOT NULL,
    "reflection" TEXT NOT NULL,
    "prayerFocus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "leaderId" UUID NOT NULL,
    "nextMeeting" TIMESTAMP(3),
    "prayerRequests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "encouragements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_members" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "groupId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "groupRoleId" INTEGER NOT NULL DEFAULT 10,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "group_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountability_partners" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user1Id" UUID NOT NULL,
    "user2Id" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "establishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accountability_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "audience" TEXT NOT NULL DEFAULT 'all',
    "location" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "attendanceStatusId" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "growth_scores" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "overallConsistency" INTEGER NOT NULL DEFAULT 0,
    "prayerScore" INTEGER NOT NULL DEFAULT 0,
    "bibleScore" INTEGER NOT NULL DEFAULT 0,
    "attendanceScore" INTEGER NOT NULL DEFAULT 0,
    "servingScore" INTEGER NOT NULL DEFAULT 0,
    "accountabilityScore" INTEGER NOT NULL DEFAULT 0,
    "recentActivity" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "growth_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leader_reports" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "leaderId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "prayerNeeds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "memberIdsNeedingFollowUp" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leader_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "level_reviews" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "reviewerId" UUID NOT NULL,
    "targetLevelId" UUID NOT NULL,
    "reviewStatusId" INTEGER NOT NULL DEFAULT 10,
    "feedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "level_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migration_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "appliedBy" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "migration_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_code_key" ON "roles"("code");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_statuses_code_key" ON "attendance_statuses"("code");

-- CreateIndex
CREATE UNIQUE INDEX "group_roles_code_key" ON "group_roles"("code");

-- CreateIndex
CREATE UNIQUE INDEX "review_statuses_code_key" ON "review_statuses"("code");

-- CreateIndex
CREATE UNIQUE INDEX "journey_stages_code_key" ON "journey_stages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_journeyStageId_idx" ON "users"("journeyStageId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE INDEX "journey_stage_history_userId_idx" ON "journey_stage_history"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "levels_levelNumber_key" ON "levels"("levelNumber");

-- CreateIndex
CREATE INDEX "daily_practices_practiceDate_idx" ON "daily_practices"("practiceDate");

-- CreateIndex
CREATE UNIQUE INDEX "daily_practices_userId_practiceDate_key" ON "daily_practices"("userId", "practiceDate");

-- CreateIndex
CREATE INDEX "check_ins_weekStartDate_idx" ON "check_ins"("weekStartDate");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_userId_weekLabel_key" ON "check_ins"("userId", "weekLabel");

-- CreateIndex
CREATE UNIQUE INDEX "devotions_planId_dayNumber_key" ON "devotions"("planId", "dayNumber");

-- CreateIndex
CREATE UNIQUE INDEX "group_members_groupId_userId_key" ON "group_members"("groupId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "accountability_partners_user1Id_user2Id_key" ON "accountability_partners"("user1Id", "user2Id");

-- CreateIndex
CREATE INDEX "events_dateTime_idx" ON "events"("dateTime");

-- CreateIndex
CREATE INDEX "attendance_eventId_idx" ON "attendance"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_userId_eventId_key" ON "attendance"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "growth_scores_userId_key" ON "growth_scores"("userId");

-- CreateIndex
CREATE INDEX "leader_reports_leaderId_idx" ON "leader_reports"("leaderId");

-- CreateIndex
CREATE INDEX "level_reviews_userId_idx" ON "level_reviews"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "migration_logs_name_key" ON "migration_logs"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_currentLevelId_fkey" FOREIGN KEY ("currentLevelId") REFERENCES "levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_journeyStageId_fkey" FOREIGN KEY ("journeyStageId") REFERENCES "journey_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journey_stage_history" ADD CONSTRAINT "journey_stage_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journey_stage_history" ADD CONSTRAINT "journey_stage_history_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "journey_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_practices" ADD CONSTRAINT "daily_practices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devotions" ADD CONSTRAINT "devotions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "reading_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_groupRoleId_fkey" FOREIGN KEY ("groupRoleId") REFERENCES "group_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountability_partners" ADD CONSTRAINT "accountability_partners_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountability_partners" ADD CONSTRAINT "accountability_partners_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_attendanceStatusId_fkey" FOREIGN KEY ("attendanceStatusId") REFERENCES "attendance_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "growth_scores" ADD CONSTRAINT "growth_scores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leader_reports" ADD CONSTRAINT "leader_reports_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "level_reviews" ADD CONSTRAINT "level_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "level_reviews" ADD CONSTRAINT "level_reviews_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "level_reviews" ADD CONSTRAINT "level_reviews_targetLevelId_fkey" FOREIGN KEY ("targetLevelId") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "level_reviews" ADD CONSTRAINT "level_reviews_reviewStatusId_fkey" FOREIGN KEY ("reviewStatusId") REFERENCES "review_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

