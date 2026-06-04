export interface SeoImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  srcset?: string;
  sizes?: string;
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
  propertyTypes: string[];
  accessNotes: string[];
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

function londonAreaImage(areaName: string): SeoImage {
  return {
    src: "/images/london.webp",
    alt: `Waste removal service area in ${areaName}`,
    width: 1200,
    height: 800,
    srcset:
      "/images/london-640.webp 640w, /images/london-960.webp 960w, /images/london.webp 1200w",
    sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
  };
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
      src: "/images/services/end-of-tenancy-rubbish-removal.webp",
      alt: "Half-full waste removal van with end of tenancy boxes, bags and a mattress outside a rental property",
      width: 1200,
      height: 900,
      srcset:
        "/images/services/end-of-tenancy-rubbish-removal-640.webp 640w, /images/services/end-of-tenancy-rubbish-removal-960.webp 960w, /images/services/end-of-tenancy-rubbish-removal.webp 1200w",
      sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
    },
    searchTerms: [
      "end of tenancy rubbish removal",
      "tenant rubbish clearance",
      "landlord waste clearance",
    ],
    sellingPoints: [
      "Same-day and next-day slots where possible",
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
      src: "/images/services/house-clearance.webp",
      alt: "Half-full waste removal van with house clearance furniture, boxes and bags on a driveway",
      width: 1200,
      height: 900,
      srcset:
        "/images/services/house-clearance-640.webp 640w, /images/services/house-clearance-960.webp 960w, /images/services/house-clearance.webp 1200w",
      sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
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
      src: "/images/services/garden-waste-removal.webp",
      alt: "Half-full waste removal van with branches, fence panels and garden waste bags beside it",
      width: 1200,
      height: 900,
      srcset:
        "/images/services/garden-waste-removal-640.webp 640w, /images/services/garden-waste-removal-960.webp 960w, /images/services/garden-waste-removal.webp 1200w",
      sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
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
  {
    slug: "office-clearance",
    name: "Office Clearance",
    title: "Office Clearance",
    metaTitle: "Office Clearance",
    metaDescription:
      "Office clearance for desks, chairs, cabinets, IT clutter and general business waste across West, Central, North and South London.",
    shortDescription:
      "Clear office furniture, filing cabinets, boxed clutter and redundant workplace items with planned access.",
    description:
      "A practical business clearance service for offices, studios, shops and small commercial units that need unwanted items removed without disrupting the working day.",
    image: {
      src: "/images/services/office-clearance.webp",
      alt: "Caged waste removal van loaded with office chairs, filing cabinets and archive boxes outside a London office",
      width: 1200,
      height: 900,
      srcset:
        "/images/services/office-clearance-640.webp 640w, /images/services/office-clearance-960.webp 960w, /images/services/office-clearance.webp 1200w",
      sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
    },
    searchTerms: ["office clearance", "business waste removal", "commercial clearance"],
    sellingPoints: [
      "Desks, chairs and storage units collected",
      "Suitable for offices, studios and retail premises",
      "Access and loading plans agreed before arrival",
    ],
    typicalItems: [
      "Desks and office chairs",
      "Filing cabinets",
      "Shelving and storage",
      "Boxed general waste",
    ],
    faqs: [
      {
        question: "Can you clear an office outside busy working hours?",
        answer:
          "Yes. Share the access window, loading details and any building rules when requesting a quote so the collection can be planned around the workplace.",
      },
    ],
  },
  {
    slug: "garage-clearance",
    name: "Garage Clearance",
    title: "Garage Clearance",
    metaTitle: "Garage Clearance",
    metaDescription:
      "Garage clearance for stored clutter, tools, boxes, bikes, shelving and bulky household waste.",
    shortDescription:
      "Clear long-stored garage clutter, bulky household items, shelving and boxed waste in one visit.",
    description:
      "A focused garage clearance service for homes that need storage space reclaimed before a move, renovation, sale or seasonal tidy-up.",
    image: {
      src: "/images/services/garage-clearance.webp",
      alt: "Caged waste removal van loaded with garage clutter, shelving, storage boxes and tools on a driveway",
      width: 1200,
      height: 900,
      srcset:
        "/images/services/garage-clearance-640.webp 640w, /images/services/garage-clearance-960.webp 960w, /images/services/garage-clearance.webp 1200w",
      sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
    },
    searchTerms: ["garage clearance", "garage rubbish removal", "stored clutter removal"],
    sellingPoints: [
      "Useful for overfilled garages and storage areas",
      "Bulky household clutter and boxed waste removed",
      "Photos help estimate mixed loads quickly",
    ],
    typicalItems: [
      "Old shelving",
      "Broken tools and equipment",
      "Boxes and stored clutter",
      "Bikes and outdoor items",
    ],
    faqs: [
      {
        question: "Do I need to sort everything before a garage clearance?",
        answer:
          "You should separate anything you want to keep and flag heavy, sharp or restricted items. The crew can then remove the agreed waste from the garage or driveway.",
      },
    ],
  },
  {
    slug: "builders-waste-removal",
    name: "Builders Waste Removal",
    title: "Builders Waste Removal",
    metaTitle: "Builders Waste Removal",
    metaDescription:
      "Builders waste removal for light renovation debris, timber, rubble, tiles and bagged trade waste.",
    shortDescription:
      "Remove light renovation debris, timber, tiles, rubble bags and DIY waste without arranging skip hire.",
    description:
      "A builders waste collection service for small refurbishments, DIY projects and trade jobs where leftover materials need clearing from a home, flat or site access point.",
    image: {
      src: "/images/services/builders-waste-removal.webp",
      alt: "Caged waste removal van with rubble bags, plasterboard, timber offcuts and renovation waste outside a London home",
      width: 1200,
      height: 900,
      srcset:
        "/images/services/builders-waste-removal-640.webp 640w, /images/services/builders-waste-removal-960.webp 960w, /images/services/builders-waste-removal.webp 1200w",
      sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
    },
    searchTerms: ["builders waste removal", "rubble removal", "renovation waste clearance"],
    sellingPoints: [
      "Good for DIY and small refurbishment waste",
      "Heavy materials quoted by volume and weight",
      "No skip permit needed for smaller loads",
    ],
    typicalItems: [
      "Rubble bags",
      "Timber offcuts",
      "Tiles and ceramics",
      "Old fixtures",
    ],
    faqs: [
      {
        question: "Can you take heavy rubble and tiles?",
        answer:
          "Yes, subject to safe access and load weight. Send photos and approximate bag counts before booking so heavy materials can be quoted accurately.",
      },
    ],
  },
  {
    slug: "furniture-removal",
    name: "Furniture Removal",
    title: "Furniture Removal",
    metaTitle: "Furniture Removal",
    metaDescription:
      "Furniture removal for sofas, wardrobes, tables, chairs, cabinets and other bulky household items.",
    shortDescription:
      "Remove bulky furniture from homes, flats, offices and rental properties without hiring a skip.",
    description:
      "A bulky furniture removal service for single items, room clear-outs and property handovers where large pieces need lifting, loading and disposal.",
    image: {
      src: "/images/services/furniture-removal.webp",
      alt: "Caged waste removal van loaded with sofas, wardrobes, chairs and bulky furniture on a London street",
      width: 1200,
      height: 900,
      srcset:
        "/images/services/furniture-removal-640.webp 640w, /images/services/furniture-removal-960.webp 960w, /images/services/furniture-removal.webp 1200w",
      sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
    },
    searchTerms: ["furniture removal", "sofa removal", "bulky furniture collection"],
    sellingPoints: [
      "Single bulky items and multi-room loads collected",
      "Useful for moves, refurbishments and rental handovers",
      "Stairs, lifts and access notes checked before arrival",
    ],
    typicalItems: [
      "Sofas and armchairs",
      "Wardrobes and drawers",
      "Tables and chairs",
      "Cabinets and shelving",
    ],
    faqs: [
      {
        question: "Can you remove furniture from upstairs flats?",
        answer:
          "Yes, if the access is safe. Share floor level, lift details, stair width and photos of awkward items when requesting a quote.",
      },
    ],
  },
  {
    slug: "mattress-removal",
    name: "Mattress Removal",
    title: "Mattress Removal",
    metaTitle: "Mattress Removal",
    metaDescription:
      "Mattress removal for single, double, king-size and landlord clearance collections across West, Central, North and South London.",
    shortDescription:
      "Collect old mattresses, bed frames and bedroom clearance items from homes, flats and rental properties.",
    description:
      "A simple mattress removal service for households, landlords and tenants who need bulky bedroom items collected without waiting for council bulky waste slots.",
    image: {
      src: "/images/services/mattress-removal.webp",
      alt: "Caged waste removal van loaded with mattresses, bed frames and bedroom furniture outside a London home",
      width: 1200,
      height: 900,
      srcset:
        "/images/services/mattress-removal-640.webp 640w, /images/services/mattress-removal-960.webp 960w, /images/services/mattress-removal.webp 1200w",
      sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
    },
    searchTerms: ["mattress removal", "old mattress collection", "bed frame removal"],
    sellingPoints: [
      "Single mattresses and bedroom loads collected",
      "Useful for landlords, tenants and households",
      "Stairwell and access details checked before collection",
    ],
    typicalItems: [
      "Single mattresses",
      "Double and king-size mattresses",
      "Bed frames",
      "Bedroom furniture",
    ],
    faqs: [
      {
        question: "Can you collect a mattress from inside a flat?",
        answer:
          "Yes. Confirm the floor level, lift access and whether the mattress needs carrying through shared hallways before booking.",
      },
    ],
  },
];

const serviceRegionNames = [
  "West London",
  "Central London",
  "North London",
  "South London",
];

const sharedPropertyTypes = [
  "Homes, flats and maisonettes",
  "Rental properties between tenancies",
  "Small offices, studios and retail premises",
  "Garages, gardens and storage areas",
];

const sharedAccessNotes = [
  "Share floor level, lift access, stairs or basement details before booking",
  "Confirm controlled parking, loading bays, red routes or estate access",
  "Send photos of bulky, heavy or mixed waste before the crew arrives",
];

interface LocationSeed {
  slug: string;
  name: string;
  region: string;
  nearbyAreas: string[];
  propertyTypes?: string[];
  accessNotes?: string[];
  serviceNotes?: string[];
}

function buildLondonLocation(seed: LocationSeed): SeoLocation {
  const areaPhrase = seed.region === "London service areas"
    ? "West, Central, North and South London"
    : seed.region;

  return {
    slug: seed.slug,
    name: seed.name,
    title: seed.name,
    metaTitle: `Waste Removal Services in ${seed.name}`,
    metaDescription: `Rubbish removal and property clearance for homes, landlords and businesses in ${seed.name}.`,
    shortDescription: `Waste removal services for properties around ${seed.name}, including homes, flats, gardens and managed rental properties.`,
    description: `${seed.name} collections cover rubbish removal, bulky-item collection and property clearance across ${areaPhrase}, with access and parking details checked before arrival.`,
    image: londonAreaImage(seed.name),
    county: "Greater London",
    region: seed.region,
    nearbyAreas: seed.nearbyAreas,
    propertyTypes: seed.propertyTypes ?? sharedPropertyTypes,
    accessNotes: seed.accessNotes ?? sharedAccessNotes,
    localSearchTerms: [
      `rubbish removal ${seed.name}`,
      `waste clearance ${seed.name}`,
      `property clearance ${seed.name}`,
    ],
    serviceNotes: seed.serviceNotes ?? [
      `Useful for homes, flats, landlords and businesses in ${areaPhrase}`,
      "Photos, access notes and parking details help produce a clearer quote",
    ],
  };
}

export const seoLocations: SeoLocation[] = [
  {
    slug: "london",
    name: "London service areas",
    region: "London service areas",
    nearbyAreas: serviceRegionNames,
    serviceNotes: [
      "Coverage is focused on West, Central, North and South London",
      "Share the collection postcode so route availability can be confirmed",
    ],
  },
  {
    slug: "west-london",
    name: "West London",
    region: "West London",
    nearbyAreas: ["Ealing", "Chiswick", "Hammersmith", "Richmond"],
    serviceNotes: [
      "Useful for homes, flats, landlords and businesses across West London",
      "Access and parking notes help with mansion blocks, estates and residential streets",
    ],
  },
  {
    slug: "central-london",
    name: "Central London",
    region: "Central London",
    nearbyAreas: ["Westminster", "Mayfair", "Soho", "Marylebone"],
    serviceNotes: [
      "Useful for flats, offices, retail premises and managed buildings in Central London",
      "Loading restrictions, concierge details and access windows should be confirmed before booking",
    ],
  },
  {
    slug: "north-london",
    name: "North London",
    region: "North London",
    nearbyAreas: ["Camden", "Islington", "Hampstead", "Finchley"],
    serviceNotes: [
      "Useful for homes, flats, landlords and small businesses across North London",
      "Estate, CPZ and floor-level details help plan collections cleanly",
    ],
  },
  {
    slug: "south-london",
    name: "South London",
    region: "South London",
    nearbyAreas: ["Clapham", "Wandsworth", "Wimbledon", "Brixton"],
    serviceNotes: [
      "Useful for homes, garden flats, landlords and businesses across South London",
      "Driveway, garden access and controlled parking notes help quote accurately",
    ],
  },
  { slug: "brentford", name: "Brentford", region: "West London", nearbyAreas: ["Kew", "Chiswick", "Ealing", "Hammersmith"] },
  { slug: "chiswick", name: "Chiswick", region: "West London", nearbyAreas: ["Brentford", "Acton", "Hammersmith", "Kew"] },
  { slug: "ealing", name: "Ealing", region: "West London", nearbyAreas: ["Acton", "Hanwell", "Chiswick", "Greenford"] },
  { slug: "acton", name: "Acton", region: "West London", nearbyAreas: ["Ealing", "Chiswick", "Hammersmith", "Shepherd's Bush"] },
  { slug: "hammersmith", name: "Hammersmith", region: "West London", nearbyAreas: ["Fulham", "Chiswick", "Kensington", "Shepherd's Bush"] },
  { slug: "fulham", name: "Fulham", region: "West London", nearbyAreas: ["Hammersmith", "Chelsea", "Kensington", "Putney"] },
  { slug: "kensington", name: "Kensington", region: "West London", nearbyAreas: ["Chelsea", "Notting Hill", "Fulham", "Westminster"] },
  { slug: "chelsea", name: "Chelsea", region: "West London", nearbyAreas: ["Fulham", "Kensington", "Battersea", "Westminster"] },
  { slug: "notting-hill", name: "Notting Hill", region: "West London", nearbyAreas: ["Kensington", "Paddington", "Shepherd's Bush", "Hammersmith"] },
  { slug: "kew", name: "Kew", region: "West London", nearbyAreas: ["Brentford", "Chiswick", "Richmond", "Hammersmith"] },
  { slug: "richmond", name: "Richmond", region: "West London", nearbyAreas: ["Kew", "Twickenham", "Putney", "Wandsworth"] },
  { slug: "twickenham", name: "Twickenham", region: "West London", nearbyAreas: ["Richmond", "Hounslow", "Kew", "Isleworth"] },
  { slug: "hounslow", name: "Hounslow", region: "West London", nearbyAreas: ["Isleworth", "Twickenham", "Ealing", "Hayes"] },
  { slug: "hayes", name: "Hayes", region: "West London", nearbyAreas: ["Hounslow", "Southall", "Ealing", "Greenford"] },
  { slug: "westminster", name: "Westminster", region: "Central London", nearbyAreas: ["Mayfair", "Soho", "Chelsea", "Marylebone"] },
  { slug: "mayfair", name: "Mayfair", region: "Central London", nearbyAreas: ["Westminster", "Soho", "Marylebone", "Paddington"] },
  { slug: "soho", name: "Soho", region: "Central London", nearbyAreas: ["Mayfair", "Fitzrovia", "Covent Garden", "Marylebone"] },
  { slug: "marylebone", name: "Marylebone", region: "Central London", nearbyAreas: ["Paddington", "Mayfair", "Soho", "Camden"] },
  { slug: "paddington", name: "Paddington", region: "Central London", nearbyAreas: ["Marylebone", "Notting Hill", "Mayfair", "Kensington"] },
  { slug: "bloomsbury", name: "Bloomsbury", region: "Central London", nearbyAreas: ["Fitzrovia", "Covent Garden", "Camden", "Soho"] },
  { slug: "fitzrovia", name: "Fitzrovia", region: "Central London", nearbyAreas: ["Soho", "Bloomsbury", "Marylebone", "Camden"] },
  { slug: "covent-garden", name: "Covent Garden", region: "Central London", nearbyAreas: ["Soho", "Bloomsbury", "Westminster", "Fitzrovia"] },
  { slug: "camden", name: "Camden", region: "North London", nearbyAreas: ["Islington", "Hampstead", "Highgate", "Fitzrovia"] },
  { slug: "islington", name: "Islington", region: "North London", nearbyAreas: ["Camden", "Highgate", "Crouch End", "Bloomsbury"] },
  { slug: "hampstead", name: "Hampstead", region: "North London", nearbyAreas: ["Camden", "Highgate", "Finchley", "Barnet"] },
  { slug: "highgate", name: "Highgate", region: "North London", nearbyAreas: ["Hampstead", "Crouch End", "Muswell Hill", "Finchley"] },
  { slug: "finchley", name: "Finchley", region: "North London", nearbyAreas: ["Highgate", "Barnet", "Muswell Hill", "Hampstead"] },
  { slug: "barnet", name: "Barnet", region: "North London", nearbyAreas: ["Finchley", "Highgate", "Muswell Hill", "Hampstead"] },
  { slug: "crouch-end", name: "Crouch End", region: "North London", nearbyAreas: ["Highgate", "Muswell Hill", "Islington", "Camden"] },
  { slug: "muswell-hill", name: "Muswell Hill", region: "North London", nearbyAreas: ["Crouch End", "Highgate", "Finchley", "Barnet"] },
  { slug: "battersea", name: "Battersea", region: "South London", nearbyAreas: ["Clapham", "Wandsworth", "Chelsea", "Putney"] },
  { slug: "clapham", name: "Clapham", region: "South London", nearbyAreas: ["Battersea", "Balham", "Brixton", "Wandsworth"] },
  { slug: "wandsworth", name: "Wandsworth", region: "South London", nearbyAreas: ["Putney", "Battersea", "Clapham", "Wimbledon"] },
  { slug: "putney", name: "Putney", region: "South London", nearbyAreas: ["Wandsworth", "Fulham", "Richmond", "Wimbledon"] },
  { slug: "wimbledon", name: "Wimbledon", region: "South London", nearbyAreas: ["Wandsworth", "Putney", "Balham", "Streatham"] },
  { slug: "brixton", name: "Brixton", region: "South London", nearbyAreas: ["Clapham", "Balham", "Dulwich", "Streatham"] },
  { slug: "balham", name: "Balham", region: "South London", nearbyAreas: ["Clapham", "Brixton", "Streatham", "Wimbledon"] },
  { slug: "streatham", name: "Streatham", region: "South London", nearbyAreas: ["Balham", "Brixton", "Dulwich", "Wimbledon"] },
  { slug: "dulwich", name: "Dulwich", region: "South London", nearbyAreas: ["Brixton", "Streatham", "Clapham", "Balham"] },
  { slug: "croydon", name: "Croydon", region: "South London", nearbyAreas: ["Streatham", "Dulwich", "Balham", "Wimbledon"] },
].map(buildLondonLocation);
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

export function buildAreaPath(location: SeoLocation) {
  return `/areas/${location.slug}/`;
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

export const areaSeoPaths = seoLocations.map((location) =>
  buildAreaPath(location),
);
