import crypto from "node:crypto";

const PBKDF2_ITERATIONS = 600_000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

/**
 * Hashes a plaintext password using PBKDF2 with SHA-512, 600,000 rounds, and a 16-byte random salt.
 * Conforming to OWASP ASVS v5.0.0-6.2.1 and ASVS v5.0.0-6.1.1 (minimum length 12 characters).
 */
export function hashPassword(password: string): string {
  if (!password || password.length < 12) {
    throw new Error("Password must be at least 12 characters.");
  }
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verifies a plaintext password against a stored salt:hash string using constant-time comparison.
 * Plaintext comparison fallbacks are unconditionally eliminated (ASVS v5.0.0-6.2.3).
 */
export function verifyPassword(password: string, storedHash: string | null): boolean {
  if (!storedHash) return false;
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, expectedHash] = parts;

  const actualHash = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");
  const actualBuffer = Buffer.from(actualHash);
  const expectedBuffer = Buffer.from(expectedHash);

  if (actualBuffer.length !== expectedBuffer.length) return false;

  // Constant-time comparison to prevent timing attacks (ASVS v5.0.0-6.2.3)
  return crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}
