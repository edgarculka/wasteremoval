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

export interface CompanyDetails {
  legalName: string;
  tradingName: string;
  shortName: string;
  address: UkAddress;
  contact: CompanyContactDetails;
  serviceAreas: string[];
  openingHours: string[];
  priceRange: string;
  wasteCarrierRegistration: string;
}

export const companyDetails: CompanyDetails = {
  legalName: "DBS Waste Ltd",
  tradingName: "DBS Waste",
  shortName: "DBS Waste",
  address: {
    buildingName: "",
    buildingNumber: "",
    street: "",
    addressLine2: "",
    townOrCity: "London",
    county: "Greater London",
    postcode: "",
    country: "United Kingdom",
    countryCode: "GB",
  },
  contact: {
    primaryPhone: "+442012345678",
    primaryPhoneDisplay: "020 1234 5678",
    primaryPhoneHref: "tel:+442012345678",
    secondaryPhone: "",
    whatsappHref: "https://wa.me/442012345678",
    email: "hello@dbs-waste.co.uk",
    emailHref: "mailto:hello@dbs-waste.co.uk",
    website: "https://dbs-waste.co.uk",
  },
  serviceAreas: ["London", "Brentford", "Chiswick", "Ealing", "West London"],
  openingHours: ["Mo-Fr 07:00-19:00"],
  priceRange: "GBP 40+",
  wasteCarrierRegistration: "",
};
