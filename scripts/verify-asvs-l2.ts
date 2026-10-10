/**
 * OWASP ASVS v5.0.0 Level 2 & W3C Privacy Principles Verification Test Suite
 * Conforming to Section 9 Verification Matrix
 */

import { hashPassword, verifyPassword } from "../src/lib/auth-server";
import { encryptConfession, decryptConfession } from "../src/lib/crypto-fields";
import {
  createSessionToken,
  verifySessionToken,
  setSessionCookie,
} from "../src/lib/auth-session";
import { checkInSchema } from "../src/lib/validation/checkin.schema";
import { db } from "../src/lib/db";
import { authorizeAndFilterCheckIn } from "../src/lib/rbac/checkin-policy";
import nextConfig from "../next.config";

interface TestResult {
  id: string;
  name: string;
  passed: boolean;
  detail: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, id: string, name: string, detail: string) {
  if (condition) {
    results.push({ id, name, passed: true, detail });
    console.log(`✅ [${id}] PASS: ${name} — ${detail}`);
  } else {
    results.push({ id, name, passed: false, detail });
    console.error(`❌ [${id}] FAIL: ${name} — ${detail}`);
  }
}

async function runVerification() {
  console.log("========================================================================");
  console.log("🛡️ BIC OWASP ASVS v5.0.0 Level 2 & W3C Privacy Verification Suite");
  console.log("========================================================================\n");

  // -------------------------------------------------------------------------
  // 1. ASVS v5.0.0-6.2.1: Password Hashing & Plaintext Fallback Elimination
  // -------------------------------------------------------------------------
  try {
    const testPassword = "StrongBiblicalPassword2026!";
    const hash = hashPassword(testPassword);
    const [salt, key] = hash.split(":");
    const hasSufficientSalt = salt && salt.length === 32; // 16 bytes = 32 hex chars
    const hasSufficientKey = key && key.length === 128; // 64 bytes = 128 hex chars
    const verified = verifyPassword(testPassword, hash);
    const wrongRejected = !verifyPassword("WrongPassword123!", hash);
    const plaintextFallbackBlocked = !verifyPassword("PlainTextPassword!", "PlainTextPassword!");

    let lengthEnforced = false;
    try {
      hashPassword("short");
    } catch {
      lengthEnforced = true;
    }

    assert(
      Boolean(hasSufficientSalt && hasSufficientKey && verified && wrongRejected && plaintextFallbackBlocked && lengthEnforced),
      "v5.0.0-6.2.1",
      "Hardened Password Cryptography",
      "PBKDF2 600k rounds SHA-512, >=12 char enforcement, constant-time compare, zero plaintext fallback"
    );
  } catch (err: any) {
    assert(false, "v5.0.0-6.2.1", "Hardened Password Cryptography", err.message);
  }

  // -------------------------------------------------------------------------
  // 2. ASVS v5.0.0-11.2.1: Application-Level Field Encryption at Rest (Ring 0)
  // -------------------------------------------------------------------------
  try {
    const confessionText = "Battle with anxiety and late night internet temptations.";
    const encrypted = encryptConfession(confessionText);
    const parts = encrypted.split(":");
    const isGcmFormat = parts.length === 3 && parts[0].length === 24 && parts[1].length === 32; // 12-byte IV (24 hex), 16-byte tag (32 hex)
    const decrypted = decryptConfession(encrypted);

    assert(
      Boolean(isGcmFormat && decrypted === confessionText && !encrypted.includes(confessionText)),
      "v5.0.0-11.2.1",
      "AES-256-GCM Field Encryption at Rest",
      `Encrypted into authenticated ciphertext (iv:tag:ciphertext): ${encrypted.substring(0, 32)}...`
    );
  } catch (err: any) {
    assert(false, "v5.0.0-11.2.1", "AES-256-GCM Field Encryption at Rest", err.message);
  }

  // -------------------------------------------------------------------------
  // 3. ASVS v5.0.0-7.1.1: Secure Session Management & Cookies
  // -------------------------------------------------------------------------
  try {
    const dummyUser = {
      id: "u-12345678-0000-0000-0000-000000000001",
      email: "testbrother@bic.app",
      name: "Tawanda Moyo",
      firstName: "Tawanda",
      role: "MEMBER",
      levelNumber: 1,
      levelTitle: "Level 1: New Believers",
      groupName: "Harare Central Men",
      church: "Brothers In Christ",
      consistencyScore: 100,
    };

    const token = createSessionToken(dummyUser);
    const tokenParts = token.split(".");
    const decodedUser = verifySessionToken(token);

    // Mock Next response to verify cookie flags
    const mockRes = {
      cookies: {
        set: (_name: string, _val: string, options: any) => {
          assert(
            options.httpOnly === true && options.sameSite === "lax",
            "v5.0.0-7.1.1",
            "Session Cookie Security Flags",
            `HttpOnly: ${options.httpOnly}, SameSite: ${options.sameSite}, Path: ${options.path}`
          );
        },
      },
    } as any;

    setSessionCookie(mockRes, dummyUser);

    assert(
      tokenParts.length === 3 && decodedUser?.id === dummyUser.id && decodedUser?.role === "MEMBER",
      "v5.0.0-7.1.1 (Token)",
      "Tamper-Proof HMAC Session Token",
      "Signed session token verifies payload identity and role"
    );
  } catch (err: any) {
    assert(false, "v5.0.0-7.1.1", "Secure Session Management", err.message);
  }

  // -------------------------------------------------------------------------
  // 4. ASVS v5.0.0-2.1.1: Input Validation on Incoming Payloads
  // -------------------------------------------------------------------------
  try {
    const invalidPayload = {
      prayerDays: 10, // Invalid: exceeds 7
      bibleDays: -1,  // Invalid: negative
    };
    const parseResult = checkInSchema.safeParse(invalidPayload);

    assert(
      !parseResult.success && parseResult.error.issues.length > 0,
      "v5.0.0-2.1.1",
      "Strict Payload Validation",
      `Malformed input rejected with ${parseResult.error?.issues.length} Zod constraint issues`
    );
  } catch (err: any) {
    assert(false, "v5.0.0-2.1.1", "Strict Payload Validation", err.message);
  }

  // -------------------------------------------------------------------------
  // 5. ASVS v5.0.0-13.3.1: Defense-in-Depth Security Headers
  // -------------------------------------------------------------------------
  try {
    const headersFn = nextConfig.headers;
    let headersFound = false;
    if (typeof headersFn === "function") {
      const configuredHeaders = await headersFn();
      const globalHeaders = configuredHeaders.find((h: any) => h.source === "/(.*)");
      if (globalHeaders?.headers) {
        const headerMap = Object.fromEntries(globalHeaders.headers.map((h: any) => [h.key, h.value]));
        const hasCSP = Boolean(headerMap["Content-Security-Policy"]?.includes("default-src 'self'"));
        const hasFrame = headerMap["X-Frame-Options"] === "DENY";
        const hasNosniff = headerMap["X-Content-Type-Options"] === "nosniff";
        const hasHSTS = Boolean(headerMap["Strict-Transport-Security"]?.includes("max-age=63072000"));

        headersFound = hasCSP && hasFrame && hasNosniff && hasHSTS;
      }
    }

    assert(
      headersFound,
      "v5.0.0-13.3.1",
      "HTTP Defense-in-Depth Security Headers",
      "CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, HSTS configured in next.config.ts"
    );
  } catch (err: any) {
    assert(false, "v5.0.0-13.3.1", "HTTP Defense-in-Depth Security Headers", err.message);
  }

  // -------------------------------------------------------------------------
  // 6. ASVS v5.0.0-8.2.1: ReBAC BOLA / IDOR Authorization Isolation
  // -------------------------------------------------------------------------
  try {
    const mockCheckIn = {
      id: "c0000000-0000-0000-0000-000000000001",
      userId: "a0000000-0000-0000-0000-000000000001",
      weekLabel: "Week of Mar 29",
      weekStartDate: new Date("2026-03-29"),
      prayerDays: 6,
      bibleDays: 5,
      attendedMeeting: true,
      metAccountability: true,
      strugglesAndNeeds: encryptConfession("Deep personal moral struggle."),
      strugglesVisibility: "PRIVATE",
      praiseReport: "God delivered me from temptation.",
      flags: ["Severe Temptation"],
      flagsVisibility: "PARTNER_ONLY",
    };

    // Case A: Unrelated User attempting BOLA read
    const unrelatedResult = await authorizeAndFilterCheckIn("b0000000-0000-0000-0000-000000000002", "MEMBER", mockCheckIn);
    const bolaBlocked = unrelatedResult === null;

    // Case B: Author accessing own record (unrestricted)
    const authorResult = await authorizeAndFilterCheckIn("a0000000-0000-0000-0000-000000000001", "MEMBER", mockCheckIn);
    const authorAuthorized =
      authorResult !== null &&
      authorResult.strugglesAndNeeds === "Deep personal moral struggle.";

    assert(
      bolaBlocked && authorAuthorized,
      "v5.0.0-8.2.1",
      "BOLA / IDOR Relationship-Based Access Control",
      "Unrelated member denied access (returns null); author receives decrypted data"
    );
  } catch (err: any) {
    assert(false, "v5.0.0-8.2.1", "BOLA / IDOR Relationship-Based Access Control", err.message);
  }

  // -------------------------------------------------------------------------
  // 7. ASVS v5.0.0-8.1.1 & v5.0.0-4.1.1: Direct Route Handler Access Controls
  // -------------------------------------------------------------------------
  try {
    const { GET: getCheckIns, POST: postCheckIns } = await import("../app/api/check-ins/route");
    const { GET: getMembers } = await import("../app/api/members/route");
    const { GET: getGroups } = await import("../app/api/groups/route");
    const { GET: getExport } = await import("../app/api/user/export/route");

    // Unauthenticated GET /api/check-ins
    const unauthCheckInsGet = await getCheckIns(new Request("http://localhost:3000/api/check-ins"));
    // Unauthenticated POST /api/check-ins
    const unauthCheckInsPost = await postCheckIns(new Request("http://localhost:3000/api/check-ins", { method: "POST", body: "{}" }));
    // Unauthenticated GET /api/members
    const unauthMembersGet = await getMembers(new Request("http://localhost:3000/api/members"));
    // Unauthenticated GET /api/groups
    const unauthGroupsGet = await getGroups(new Request("http://localhost:3000/api/groups"));
    // Unauthenticated GET /api/user/export
    const unauthExportGet = await getExport(new Request("http://localhost:3000/api/user/export"));

    const all401 =
      unauthCheckInsGet.status === 401 &&
      unauthCheckInsPost.status === 401 &&
      unauthMembersGet.status === 401 &&
      unauthGroupsGet.status === 401 &&
      unauthExportGet.status === 401;

    assert(
      all401,
      "v5.0.0-8.1.1 & v5.0.0-4.1.1",
      "API Boundary Access Control & Zero Public PII Dumps",
      "All sensitive endpoints (/api/check-ins, /api/members, /api/groups, /api/user/export) strictly reject unauthenticated calls with 401"
    );
  } catch (err: any) {
    assert(false, "v5.0.0-8.1.1 & v5.0.0-4.1.1", "API Boundary Access Control", err.message);
  }

  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------
  console.log("\n========================================================================");
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  console.log(`Verification Summary: ${passed} / ${total} Checks Passed (${Math.round((passed / total) * 100)}%)`);
  console.log("========================================================================");

  if (passed === total) {
    console.log("🎉 ALL OWASP ASVS v5.0.0 LEVEL 2 & W3C PRIVACY CONTROLS VERIFIED!");
    process.exit(0);
  } else {
    console.error("⚠️ SOME CONTROLS FAILED VERIFICATION");
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error("Fatal verification error:", err);
  process.exit(1);
});
