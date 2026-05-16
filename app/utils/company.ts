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
  secondaryPhone: string;
  email: string;
  website: string;
}

export interface CompanyDetails {
  legalName: string;
  tradingName: string;
  shortName: string;
  address: UkAddress;
  contact: CompanyContactDetails;
}

export const companyDetails: CompanyDetails = {
  legalName: "Waste Removal Ltd",
  tradingName: "Waste Removal",
  shortName: "Waste Removal",
  address: {
    buildingName: "",
    buildingNumber: "",
    street: "",
    addressLine2: "",
    townOrCity: "",
    county: "",
    postcode: "",
    country: "United Kingdom",
    countryCode: "GB",
  },
  contact: {
    primaryPhone: "",
    secondaryPhone: "",
    email: "",
    website: "",
  },
};
