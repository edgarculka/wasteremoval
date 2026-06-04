export interface UkAddress {
  buildingName: string;
  buildingNumber: string;
  street: string;
  addressLine2: string;
  townOrCity: string;
  county: string;
  postcode: string;
  country: "United Kingdom";
  countryCode: "GB";
}

export interface CompanyContactDetails {
  primaryPhone: string;
  primaryPhoneDisplay: string;
  primaryPhoneHref: string;
  secondaryPhone: string;
  whatsappHref: string;
  email: string;
  emailHref: string;
  website: string;
}

export interface WasteCarrierDetails {
  registrationNumber: string;
  registeredCarrierName: string;
  businessName: string;
  registrationDate: string;
  expiryDate: string;
  regulator: string;
  registerUrl: string;
}

export interface CompanyDetails {
  legalName: string;
  tradingName: string;
  shortName: string;
  registeredIn: string;
  companyRegistrationNumber: string;
  vatRegistrationNumber: string;
  address: UkAddress;
  contact: CompanyContactDetails;
  serviceAreas: string[];
  openingHours: string[];
  openingHoursDisplay: string;
  priceRange: string;
  wasteCarrier: WasteCarrierDetails;
}

export const companyDetails: CompanyDetails = {
  legalName: "DBS BUILDING LTD",
  tradingName: "DBS-Waste",
  shortName: "DBS-Waste",
  registeredIn: "England and Wales",
  companyRegistrationNumber: "",
  vatRegistrationNumber: "",
  address: {
    buildingName: "",
    buildingNumber: "2",
    street: "Winchester Road",
    addressLine2: "",
    townOrCity: "Feltham",
    county: "",
    postcode: "TW13 5JY",
    country: "United Kingdom",
    countryCode: "GB",
  },
  contact: {
    primaryPhone: "+447747251550",
    primaryPhoneDisplay: "+44 7747 251550",
    primaryPhoneHref: "tel:+447747251550",
    secondaryPhone: "",
    whatsappHref: "https://wa.me/447747251550",
    email: "contact@dbs-waste.co.uk",
    emailHref: "mailto:contact@dbs-waste.co.uk",
    website: "https://dbs-waste.co.uk",
  },
  serviceAreas: [
    "West London",
    "Central London",
    "North London",
    "South London",
  ],
  openingHours: ["Mo-Fr 08:00-18:00"],
  openingHoursDisplay: "Mon-Fri, 8am-6pm",
  priceRange: "GBP 40+",
  wasteCarrier: {
    registrationNumber: "CBDU595600",
    registeredCarrierName: "DBS BUILDING LTD",
    businessName: "",
    registrationDate: "26/07/2025",
    expiryDate: "26/07/2028",
    regulator: "Environment Agency",
    registerUrl: "https://environment.data.gov.uk/public-register/view/search-waste-carriers-brokers",
  },
};

export function formatCompanyAddress(address: UkAddress) {
  return [
    address.buildingName,
    [address.buildingNumber, address.street].filter(Boolean).join(" "),
    address.addressLine2,
    address.townOrCity,
    address.county,
    address.postcode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}

export function getWasteCarrierRegistrationLabel(
  wasteCarrier: WasteCarrierDetails,
) {
  return `${wasteCarrier.regulator} waste carrier registration ${wasteCarrier.registrationNumber}`;
}

export function getBusinessInformationItems(details: CompanyDetails) {
  return [
    details.legalName,
    `trading as ${details.tradingName}`,
    details.companyRegistrationNumber
      ? `Company no. ${details.companyRegistrationNumber}`
      : "",
    details.registeredIn ? `Registered in ${details.registeredIn}` : "",
    `Registered contact address: ${formatCompanyAddress(details.address)}`,
    details.vatRegistrationNumber ? `VAT no. ${details.vatRegistrationNumber}` : "",
    getWasteCarrierRegistrationLabel(details.wasteCarrier),
    `expires ${details.wasteCarrier.expiryDate}`,
    details.contact.email,
  ].filter(Boolean);
}

export function getBusinessInformationLine(details: CompanyDetails) {
  return getBusinessInformationItems(details).join(" | ");
}
