export interface SeoImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoService {
  slug: string;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  shortDescription: string;
  description: string;
  image: SeoImage;
  searchTerms: string[];
  sellingPoints: string[];
  typicalItems: string[];
  faqs: SeoFaq[];
}

export interface SeoLocation {
  slug: string;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  shortDescription: string;
  description: string;
  image: SeoImage;
  county: string;
  region: string;
  nearbyAreas: string[];
  localSearchTerms: string[];
  serviceNotes: string[];
}

export interface ServiceLocationSeoPage {
  slug: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  description: string;
  image: SeoImage;
  service: SeoService;
  location: SeoLocation;
}

export const seoServices: SeoService[] = [
  {
    slug: "end-of-tenancy-rubbish-removal",
    name: "End of Tenancy Rubbish Removal",
    title: "End of Tenancy Rubbish Removal",
    metaTitle: "End of Tenancy Rubbish Removal",
    metaDescription:
      "Fast end of tenancy rubbish removal for landlords, tenants and letting agents.",
    shortDescription:
      "Clear unwanted furniture, bagged waste and leftover items before check-out or handover.",
    description:
      "A practical clearance service for rental properties that need to be emptied quickly, tidied for inspection or prepared for the next tenant.",
    image: {
      src: "/images/services/end-of-tenancy-rubbish-removal-no-people.png",
      alt: "Half-full waste removal van with end of tenancy boxes, bags and a mattress outside a rental property",
      width: 1600,
      height: 1200,
    },
    searchTerms: [
      "end of tenancy rubbish removal",
      "tenant rubbish clearance",
      "landlord waste clearance",
    ],
    sellingPoints: [
      "Same-day and next-day availability where possible",
      "Furniture, appliances and bagged waste removed",
      "Suitable for tenants, landlords and letting agents",
    ],
    typicalItems: [
      "Sofas and mattresses",
      "Broken furniture",
      "Bagged general rubbish",
      "Small appliances",
    ],
    faqs: [
      {
        question: "Can you clear a property before a check-out inspection?",
        answer:
          "Yes. The service is designed for time-sensitive rental property clearances before check-out, inventory review or new tenant move-in.",
      },
    ],
  },
  {
    slug: "house-clearance",
    name: "House Clearance",
    title: "House Clearance",
    metaTitle: "House Clearance",
    metaDescription:
      "House clearance for unwanted furniture, appliances, clutter and general household waste.",
    shortDescription:
      "Clear rooms, lofts, garages and full properties with a straightforward collection service.",
    description:
      "A flexible clearance service for homes that need unwanted items removed during moves, renovations, bereavement clearances or general decluttering.",
    image: {
      src: "/images/services/house-clearance-no-people.png",
      alt: "Half-full waste removal van with house clearance furniture, boxes and bags on a driveway",
      width: 1600,
      height: 1200,
    },
    searchTerms: ["house clearance", "home rubbish removal", "property clearance"],
    sellingPoints: [
      "Single-room and whole-property clearances",
      "Bulky furniture and general waste collected",
      "Clear pricing before work begins",
    ],
    typicalItems: [
      "Wardrobes and cabinets",
      "White goods",
      "Boxes and bags",
      "Carpets and underlay",
    ],
    faqs: [
      {
        question: "Can you clear only part of a house?",
        answer:
          "Yes. The service can cover a single item, one room, several rooms or a complete property.",
      },
    ],
  },
  {
    slug: "garden-waste-removal",
    name: "Garden Waste Removal",
    title: "Garden Waste Removal",
    metaTitle: "Garden Waste Removal",
    metaDescription:
      "Garden waste removal for branches, soil, grass cuttings, old fencing and outdoor clutter.",
    shortDescription:
      "Remove green waste, landscaping debris and unwanted outdoor items without hiring a skip.",
    description:
      "A garden clearance service for outdoor waste left after landscaping, pruning, seasonal tidy-ups or fence and shed work.",
    image: {
      src: "/images/services/garden-waste-removal-no-people.png",
      alt: "Half-full waste removal van with branches, fence panels and garden waste bags beside it",
      width: 1600,
      height: 1200,
    },
    searchTerms: ["garden waste removal", "green waste collection", "soil removal"],
    sellingPoints: [
      "Green waste and bulky outdoor items collected",
      "Useful after landscaping or garden tidy-ups",
      "No skip permit needed",
    ],
    typicalItems: [
      "Branches and hedge cuttings",
      "Grass and leaves",
      "Soil and rubble",
      "Old fencing",
    ],
    faqs: [
      {
        question: "Can you remove soil and rubble?",
        answer:
          "Yes, subject to volume, weight and safe access. Heavy materials should be described when requesting a quote.",
      },
    ],
  },
];

export const seoLocations: SeoLocation[] = [
  {
    slug: "london",
    name: "London",
    title: "London",
    metaTitle: "Waste Removal in London",
    metaDescription:
      "Rubbish removal and property clearance services across London for homes, landlords and businesses.",
    shortDescription:
      "Waste removal services across London, including homes, flats, gardens and rental properties.",
    description:
      "London pages cover flexible rubbish removal for homes, landlords and businesses that need licensed collection without arranging skip hire.",
    image: {
      src: "/images/rubbish-removal.png",
      alt: "Waste removal service across London",
      width: 1600,
      height: 1200,
    },
    county: "Greater London",
    region: "London",
    nearbyAreas: ["Brentford", "Chiswick", "Ealing"],
    localSearchTerms: [
      "rubbish removal London",
      "waste clearance London",
      "property clearance London",
    ],
    serviceNotes: [
      "Useful for London homes, flats, gardens and business clearances",
      "Share photos, access notes and parking details for an accurate quote",
    ],
  },
  {
    slug: "brentford",
    name: "Brentford",
    title: "Brentford",
    metaTitle: "Waste Removal in Brentford",
    metaDescription:
      "Local rubbish removal and clearance services for homes, landlords and businesses in Brentford.",
    shortDescription:
      "Waste removal services for properties around Brentford, including homes, flats and rental properties.",
    description:
      "Brentford has a mix of riverside flats, family homes and rental properties, so clearance pages can reference access, parking and time-sensitive property handovers.",
    image: {
      src: "/images/locations/brentford.jpg",
      alt: "Residential street and properties in Brentford",
      width: 1600,
      height: 1000,
    },
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Kew", "Isleworth", "Chiswick", "Ealing"],
    localSearchTerms: [
      "rubbish removal Brentford",
      "waste clearance Brentford",
    ],
    serviceNotes: [
      "Useful for flats, maisonettes and rental property clearances",
      "Parking and access details help when quoting",
    ],
  },
  {
    slug: "chiswick",
    name: "Chiswick",
    title: "Chiswick",
    metaTitle: "Waste Removal in Chiswick",
    metaDescription:
      "House, garden and tenancy rubbish removal services for customers in Chiswick.",
    shortDescription:
      "Clearance services for Chiswick homes, flats, gardens and commercial properties.",
    description:
      "Chiswick location pages can highlight careful property access, residential streets, garden waste and clearances for busy households.",
    image: {
      src: "/images/locations/chiswick.jpg",
      alt: "Homes and local street scene in Chiswick",
      width: 1600,
      height: 1000,
    },
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Brentford", "Acton", "Hammersmith", "Kew"],
    localSearchTerms: [
      "rubbish removal Chiswick",
      "house clearance Chiswick",
    ],
    serviceNotes: [
      "Good fit for residential clearances and garden waste",
      "Access notes are helpful for mansion blocks and flats",
    ],
  },
  {
    slug: "ealing",
    name: "Ealing",
    title: "Ealing",
    metaTitle: "Waste Removal in Ealing",
    metaDescription:
      "Rubbish removal and property clearance services for customers across Ealing.",
    shortDescription:
      "Waste clearance for Ealing homes, gardens, offices and rental properties.",
    description:
      "Ealing pages can cover a broader mix of domestic, landlord and business enquiries across a large West London borough.",
    image: {
      src: "/images/locations/ealing.jpg",
      alt: "Residential and commercial properties in Ealing",
      width: 1600,
      height: 1000,
    },
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Acton", "Hanwell", "Brentford", "Chiswick"],
    localSearchTerms: ["rubbish removal Ealing", "waste clearance Ealing"],
    serviceNotes: [
      "Useful for household, rental and office clearances",
      "Service area copy can mention West London coverage",
    ],
  },
];

export function getSeoServiceBySlug(slug: string) {
  return seoServices.find((service) => service.slug === slug);
}

export function getSeoLocationBySlug(slug: string) {
  return seoLocations.find((location) => location.slug === slug);
}

export const defaultSeoLocation: SeoLocation =
  getSeoLocationBySlug("london") ?? seoLocations[0]!;

export function buildServiceLocationPath(
  service: SeoService,
  location: SeoLocation,
) {
  return `/${service.slug}/${location.slug}/`;
}

export function buildServicePath(service: SeoService) {
  return `/${service.slug}/`;
}

export function buildServiceLocationSeoPage(
  service: SeoService,
  location: SeoLocation,
): ServiceLocationSeoPage {
  const primaryServiceNote =
    location.serviceNotes[0]
      ?.replace(/^Useful for /i, "")
      .replace(/^Good fit for /i, "")
      .toLowerCase() ?? "local clearances";

  return {
    slug: `${service.slug}-${location.slug}`,
    path: buildServiceLocationPath(service, location),
    title: `${service.title} in ${location.title}`,
    metaTitle: `${service.metaTitle} in ${location.title}`,
    metaDescription: `${service.shortDescription} Available in ${location.name}.`,
    heading: `${service.title} in ${location.title}`,
    description: `${service.description} In ${location.name}, this is especially useful for ${primaryServiceNote}.`,
    image: service.image,
    service,
    location,
  };
}

export function getServiceLocationSeoPage(
  serviceSlug: string,
  locationSlug: string,
) {
  const service = getSeoServiceBySlug(serviceSlug);
  const location = getSeoLocationBySlug(locationSlug);
  if (!service || !location) return undefined;
  return buildServiceLocationSeoPage(service, location);
}

export const serviceLocationSeoPages: ServiceLocationSeoPage[] =
  seoServices.flatMap((service) =>
    seoLocations.map((location) =>
      buildServiceLocationSeoPage(service, location),
    ),
  );

export const serviceSeoPaths = seoServices.map((service) =>
  buildServicePath(service),
);
