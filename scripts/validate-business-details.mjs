import fs from "node:fs";
import path from "node:path";

const companyFile = path.resolve("app/utils/company.ts");
const source = fs.readFileSync(companyFile, "utf8");

function readStringProperty(name) {
  const match = source.match(new RegExp(`${name}:\\s*"([^"]*)"`));
  return match?.[1]?.trim() ?? "";
}

const requiredValues = [
  ["legalName", readStringProperty("legalName")],
  ["tradingName", readStringProperty("tradingName")],
  ["primaryPhone", readStringProperty("primaryPhone")],
  ["primaryPhoneDisplay", readStringProperty("primaryPhoneDisplay")],
  ["primaryPhoneHref", readStringProperty("primaryPhoneHref")],
  ["whatsappHref", readStringProperty("whatsappHref")],
  ["email", readStringProperty("email")],
  ["emailHref", readStringProperty("emailHref")],
  ["website", readStringProperty("website")],
  ["buildingNumber or buildingName", readStringProperty("buildingNumber") || readStringProperty("buildingName")],
  ["street", readStringProperty("street")],
  ["townOrCity", readStringProperty("townOrCity")],
  ["postcode", readStringProperty("postcode")],
  ["wasteCarrierRegistration", readStringProperty("wasteCarrierRegistration")],
];

const canonicalPhoneValues = new Map([
  ["primaryPhone", "+447747251550"],
  ["primaryPhoneDisplay", "+44 7747 251550"],
  ["primaryPhoneHref", "tel:+447747251550"],
  ["whatsappHref", "https://wa.me/447747251550"],
]);

const placeholderValues = new Set([
  "+447880234934",
  "07880 234934",
  "tel:+447880234934",
  "https://wa.me/447880234934",
  "+442012345678",
  "020 1234 5678",
  "tel:+442012345678",
  "https://wa.me/442012345678",
  "hello@dbs-waste.co.uk",
  "mailto:hello@dbs-waste.co.uk",
]);

const failures = requiredValues
  .filter(([name, value]) => {
    const canonicalValue = canonicalPhoneValues.get(name);

    return !value || placeholderValues.has(value) || (canonicalValue && value !== canonicalValue);
  })
  .map(([name, value]) =>
    canonicalPhoneValues.has(name) && value
      ? `${name} must be "${canonicalPhoneValues.get(name)}", not "${value}"`
      : value
      ? `${name} is still using placeholder value "${value}"`
      : `${name} is blank`,
  );

if (failures.length > 0) {
  console.error("Business details are not deployment-ready:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  console.error(
    "\nUpdate app/utils/company.ts with verified NAP details before running npm run deploy.",
  );
  process.exit(1);
}

console.log("Business details validation passed.");
