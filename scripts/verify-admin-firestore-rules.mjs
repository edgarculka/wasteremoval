import { readFileSync } from "node:fs";

const rules = readFileSync(new URL("../firestore.rules", import.meta.url), "utf8");

const requiredPatterns = [
  {
    label: "signed-in admins can read, update, and delete bookings",
    pattern: /allow\s+read\s*,\s*update\s*,\s*delete\s*:\s*if\s+isAuthenticated\(\)\s*;/,
  },
  {
    label: "public quote form fallback can create bookings",
    pattern: /allow\s+create\s*:\s*if\s+true\s*;/,
  },
  {
    label: "mail documents stay closed to browser clients",
    pattern: /match\s+\/mail\/\{mailId\}\s*\{[\s\S]*allow\s+read\s*,\s*write\s*:\s*if\s+false\s*;/,
  },
];

const forbiddenPatterns = [
  {
    label: "field-level booking update restrictions",
    pattern: /isValidBookingAdminUpdate|hasValidAdminEditableBookingData|changed\.hasOnly/,
  },
  {
    label: "domain-gated Firestore admin rule",
    pattern: /isVerifiedDbsWasteAdmin|dbs-waste\\\.co\\\.uk|adminEmailDomain/,
  },
];

const failures = [
  ...requiredPatterns
    .filter(({ pattern }) => !pattern.test(rules))
    .map(({ label }) => `Missing: ${label}.`),
  ...forbiddenPatterns
    .filter(({ pattern }) => pattern.test(rules))
    .map(({ label }) => `Unexpected: ${label}.`),
];

if (failures.length) {
  console.error("Admin Firestore rules verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin Firestore rules verification passed.");
