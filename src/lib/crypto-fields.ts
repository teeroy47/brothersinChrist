import crypto from "node:crypto";

const ALGORITHM = "aes-256-gcm";

function getMasterKey(): Buffer {
  const hexKey = process.env.CONFESSION_ENCRYPTION_KEY || "d214507a0e3d38f4b567e04a9f1145e403b7c13c07df4f9d08de550a4a6f7d1c";
  return Buffer.from(hexKey, "hex");
}

export interface EncryptedPayload {
  iv: string;         // 12 bytes initialization vector
  ciphertext: string; // Encrypted text
  tag: string;        // 16 bytes authentication tag
}

/**
 * Encrypt Ring 0 content (strugglesAndNeeds) using authenticated AES-256-GCM before writing to the database.
 * Conforming to ASVS v5.0.0-11.2.1 and W3C §2.4 (Sensitive Information).
 */
export function encryptConfession(plainText: string): string {
  if (!plainText) return "";
  const masterKey = getMasterKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, masterKey, iv);

  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag().toString("hex");

  // Format: iv:tag:ciphertext
  return `${iv.toString("hex")}:${tag}:${encrypted}`;
}

/**
 * Decrypts AES-256-GCM encrypted confession text.
 * Gracefully returns original text if unencrypted/legacy record.
 */
export function decryptConfession(formattedCiphertext: string | null | undefined): string {
  if (!formattedCiphertext) return "";
  const parts = formattedCiphertext.split(":");
  if (parts.length !== 3) return formattedCiphertext; // Fallback for legacy plain records

  const [ivHex, tagHex, cipherHex] = parts;
  if (!ivHex || !tagHex || !cipherHex) return formattedCiphertext;

  try {
    const masterKey = getMasterKey();
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      masterKey,
      Buffer.from(ivHex, "hex")
    );
    decipher.setAuthTag(Buffer.from(tagHex, "hex"));

    let decrypted = decipher.update(cipherHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch {
    return formattedCiphertext;
  }
}
