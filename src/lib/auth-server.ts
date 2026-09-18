import crypto from "node:crypto";

/**
 * Hashes a plaintext password using standard PBKDF2 with SHA-512 and a random salt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verifies a plaintext password against a stored salt:hash string.
 */
export function verifyPassword(password: string, storedHash: string | null): boolean {
  if (!storedHash) return false;
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) {
    // Fallback for plain text during testing
    return password === storedHash;
  }
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return key === hash;
}
