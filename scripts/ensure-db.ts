import { execSync } from "child_process";
import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../src/lib/auth-server";

const prisma = new PrismaClient();

const FORMATION_LEVELS = [
  {
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
  {
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
  {
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
  {
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
  {
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
];

async function ensureDatabase() {
  console.log("⚡ Checking PostgreSQL database connection and schema...");

  // 1. Check if database tables exist
  let tablesReady = false;
  try {
    await prisma.user.count();
    tablesReady = true;
  } catch (err: any) {
    // If PostgreSQL server itself is offline
    if (err.code === "P1001" || err.message?.includes("Can't reach database server")) {
      console.warn("\n⚠️  PostgreSQL server is not reachable on port 5432.");
      console.warn("   Please verify PostgreSQL is running (e.g. in pgAdmin or Windows Services).\n");
      return;
    }
    // Database or tables missing
    tablesReady = false;
  }

  // 2. If tables are not ready, push schema
  if (!tablesReady) {
    console.log("📦 Initializing database & tables via Prisma...");
    try {
      execSync("npx prisma db push --skip-generate", { stdio: "inherit" });
    } catch (pushErr) {
      console.error("Failed to push Prisma schema:", pushErr);
      return;
    }
  }

  // 3. Ensure Formation Levels exist (non-destructive upsert)
  for (const level of FORMATION_LEVELS) {
    await prisma.level.upsert({
      where: { levelNumber: level.levelNumber },
      update: {},
      create: level,
    });
  }

  // 4. Ensure Super Admin account exists (only created if no admin exists)
  const existingAdmin = await prisma.user.findFirst({
    where: { role: Role.ADMIN },
  });

  if (!existingAdmin) {
    console.log("👑 Provisioning initial Super Admin (admin@bic.app / admin1234)...");
    const level5 = await prisma.level.findUnique({ where: { levelNumber: 5 } });
    const superAdminPasswordHash = hashPassword("admin1234");

    await prisma.user.create({
      data: {
        email: "admin@bic.app",
        passwordHash: superAdminPasswordHash,
        role: Role.ADMIN,
        currentLevelId: level5?.id,
        profile: {
          create: {
            fullName: "Super Admin",
            firstName: "Admin",
            phone: "+263 77 000 0001",
            city: "Harare",
            church: "Brothers In Christ Global",
            occupation: "Director of Formation",
          },
        },
        growthScore: {
          create: {
            overallConsistency: 100,
            prayerScore: 7,
            bibleScore: 7,
            attendanceScore: 100,
            accountabilityScore: 100,
            recentActivity: "Platform initial setup completed.",
          },
        },
      },
    });
    console.log("✅ Super Admin created successfully.");
  }

  const userCount = await prisma.user.count();
  console.log(`✅ Database ready: bic_dev (${userCount} user${userCount === 1 ? '' : 's'} registered, Super Admin active)\n`);
}

ensureDatabase()
  .catch((e) => {
    console.error("Database initialization error:", e);
  })
  .finally(() => prisma.$disconnect());
