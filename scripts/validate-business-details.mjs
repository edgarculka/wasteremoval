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

const placeholderValues = new Set([
  "+442012345678",
  "020 1234 5678",
  "tel:+442012345678",
  "https://wa.me/442012345678",
  "hello@dbs-waste.co.uk",
  "mailto:hello@dbs-waste.co.uk",
]);

const failures = requiredValues
  .filter(([, value]) => !value || placeholderValues.has(value))
  .map(([name, value]) =>
    value
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
