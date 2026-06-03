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
  legalName: "DBS Waste",
  tradingName: "DBS Waste",
  shortName: "DBS Waste",
  address: {
    buildingName: "",
    buildingNumber: "1",
    street: "Main Street",
    addressLine2: "",
    townOrCity: "London",
    county: "",
    postcode: "EC1 2LU",
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
    "London",
    "Brentford",
    "Chiswick",
    "Ealing",
    "Acton",
    "Hammersmith",
    "Fulham",
    "Shepherd's Bush",
    "Kensington",
    "Chelsea",
    "Notting Hill",
    "Kew",
    "Richmond",
    "Twickenham",
    "Isleworth",
    "Hounslow",
    "Hanwell",
    "Greenford",
    "Southall",
    "Hayes",
  ],
  openingHours: ["Mo-Fr 07:00-19:00"],
  priceRange: "GBP 40+",
  wasteCarrierRegistration: "",
};
