import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../src/lib/auth-server";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Resetting BIC database: wiping mock data & initializing Super Admin...");

  // 1. Wipe all existing records in reverse dependency order
  await prisma.attendance.deleteMany();
  await prisma.event.deleteMany();
  await prisma.checkIn.deleteMany();
  await prisma.growthScore.deleteMany();
  await prisma.leaderReport.deleteMany();
  await prisma.levelReview.deleteMany();
  await prisma.groupMember.deleteMany();
  await prisma.accountabilityPartner.deleteMany();
  await prisma.group.deleteMany();
  await prisma.devotion.deleteMany();
  await prisma.readingPlan.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.level.deleteMany();

  // 2. Seed the 5 Core Formation Levels
  const level1 = await prisma.level.create({
    data: {
      id: "b0000000-0000-0000-0000-000000000001",
      levelNumber: 1,
      title: "Level 1: New Believers",
      description: "Foundations in prayer, Scripture, brotherhood, and personal surrender to Christ.",
      requirements: [
        "Attend weekly discipleship meeting",
        "Complete foundational devotion plan",
        "Submit weekly check-in",
      ],
      expectations: [
        "Pray daily",
        "Read Scripture at least 4x a week",
        "Stay connected with small group leader",
      ],
      curriculum: ["Identity in Christ", "Spiritual Disciplines", "Repentance & Obedience"],
      growthMarkers: ["Consistent devotion", "Visible humility", "Reliable attendance"],
      meetings: ["Monday Foundations", "Thursday Prayer Circle"],
    },
  });

  const level2 = await prisma.level.create({
    data: {
      id: "b0000000-0000-0000-0000-000000000002",
      levelNumber: 2,
      title: "Level 2: Rooted",
      description: "Growing into daily spiritual consistency, Scripture literacy, and disciplined Christian manhood.",
      requirements: [
        "Maintain 80%+ attendance",
        "Engage actively with an accountability partner",
        "Complete Rooted curriculum track",
      ],
      expectations: [
        "Lead personal devotion rhythm",
        "Demonstrate honest accountability",
        "Practice bodily and mental discipline",
      ],
      curriculum: ["Renewing the Mind", "Biblical Manhood", "Personal Holiness"],
      growthMarkers: ["Devotional consistency", "Serving heart", "Teachability"],
      meetings: ["Rooted Huddle", "Thursday Prayer Circle"],
    },
  });

  const level3 = await prisma.level.create({
    data: {
      id: "b0000000-0000-0000-0000-000000000003",
      levelNumber: 3,
      title: "Level 3: Steady",
      description: "Stable discipleship marked by reliability, spiritual maturity, and reproducible habits.",
      requirements: [
        "Disciple one younger brother",
        "Serve monthly in ministry",
        "Complete Steady formation review",
      ],
      expectations: [
        "Keep daily Scripture journal",
        "Follow through on brotherhood commitments",
        "Model faithfulness in speech and conduct",
      ],
      curriculum: ["Biblical Stewardship", "Discipling Men", "Emotional Maturity"],
      growthMarkers: ["Dependability", "Brotherly care", "Emerging leadership"],
      meetings: ["Steady Men Forum"],
    },
  });

  const level4 = await prisma.level.create({
    data: {
      id: "b0000000-0000-0000-0000-000000000004",
      levelNumber: 4,
      title: "Level 4: Serving",
      description: "Men who serve, influence, and help carry the spiritual culture of the brotherhood.",
      requirements: [
        "Co-lead small group or prayer circles",
        "Provide direct pastoral follow-up to assigned brothers",
        "Complete servant leadership module",
      ],
      expectations: [
        "Model deep spiritual discipline",
        "Build brotherhood unity",
        "Carry pastoral responsibility well",
      ],
      curriculum: ["Servant Leadership", "Peacemaking & Conflict", "Kingdom Responsibility"],
      growthMarkers: ["Initiative", "Care for others", "Visible fruitfulness"],
      meetings: ["Serving Circle", "Leaders Council"],
    },
  });

  const level5 = await prisma.level.create({
    data: {
      id: "b0000000-0000-0000-0000-000000000005",
      levelNumber: 5,
      title: "Level 5: Leaders",
      description: "Mature men entrusted with forming other men through oversight, prayer, and wise leadership.",
      requirements: [
        "Oversee a group, region, or formation level",
        "Submit regular leader reports",
        "Mentor and multiply emerging leaders",
      ],
      expectations: [
        "Shepherd with humility",
        "Guard biblical doctrine and integrity",
        "Pray continually for the brotherhood",
      ],
      curriculum: ["Leadership Theology", "Shepherding Men", "Kingdom Multiplication"],
      growthMarkers: ["Spiritual oversight", "Multiplication", "Fatherly care"],
      meetings: ["Leaders Council", "National Oversight"],
    },
  });

  // 3. Seed ONLY ONE Super Admin User
  // Login: admin@bic.app / admin1234
  const superAdminPasswordHash = hashPassword("admin1234");

  const superAdmin = await prisma.user.create({
    data: {
      email: "admin@bic.app",
      passwordHash: superAdminPasswordHash,
      role: Role.ADMIN,
      currentLevelId: level5.id,
      profile: {
        create: {
          fullName: "Super Admin",
          firstName: "Admin",
          phone: "+263 77 000 0000",
          city: "Harare",
          church: "Brothers In Christ Global",
          occupation: "System Administrator & Oversight",
          testimony: "Appointed to steward the brotherhood, preserve biblical order, and multiply faithful leaders across nations.",
        },
      },
      growthScore: {
        create: {
          overallConsistency: 100,
          prayerScore: 7,
          bibleScore: 7,
          attendanceScore: 10,
          accountabilityScore: 10,
          recentActivity: "Super Admin account initialized.",
        },
      },
    },
  });

  console.log("✅ Database reset complete!");
  console.log(`👑 Super Admin created: ${superAdmin.email} (Password: admin1234)`);
  console.log(`📚 Formation Levels created: 5 (Level 1 to Level 5)`);
  console.log("👥 All other users must now sign up (/signup) or be created by the Super Admin.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
