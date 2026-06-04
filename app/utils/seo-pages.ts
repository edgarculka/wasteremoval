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
      "Office clearance for desks, chairs, cabinets, IT clutter and general business waste across West London.",
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
      "Mattress removal for single, double, king-size and landlord clearance collections across West London.",
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

export const seoLocations: SeoLocation[] = [
  {
    slug: "london",
    name: "London",
    title: "London",
    metaTitle: "Waste Removal Services in London",
    metaDescription:
      "Rubbish removal and property clearance services across London for homes, landlords and businesses.",
    shortDescription:
      "Waste removal services across London, including homes, flats, gardens and rental properties.",
    description:
      "London pages cover flexible rubbish removal for homes, landlords and businesses that need collection without arranging skip hire.",
    image: {
      src: "/images/london.webp",
      alt: "Waste removal service across London",
      width: 1200,
      height: 800,
      srcset:
        "/images/london-640.webp 640w, /images/london-960.webp 960w, /images/london.webp 1200w",
      sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
    },
    county: "Greater London",
    region: "London",
    nearbyAreas: ["Brentford", "Chiswick", "Ealing"],
    propertyTypes: [
      "Flats and mansion blocks",
      "Terraced and semi-detached homes",
      "Small offices and retail premises",
      "Rental properties between tenancies",
    ],
    accessNotes: [
      "Share lift, stairwell or basement access details before booking",
      "Confirm controlled parking, red routes or loading restrictions",
      "Send photos when bulky items are outside or in shared storage areas",
    ],
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
    metaTitle: "Waste Removal Services in Brentford",
    metaDescription:
      "Local rubbish removal and clearance services for homes, landlords and businesses in Brentford.",
    shortDescription:
      "Waste removal services for properties around Brentford, including homes, flats and rental properties.",
    description:
      "Brentford collections often involve riverside flats, family homes and rental properties where access, parking and handover timing need to be clear before arrival.",
    image: {
      src: "/images/london.webp",
      alt: "Waste removal service area in Brentford",
      width: 1200,
      height: 800,
      srcset:
        "/images/london-640.webp 640w, /images/london-960.webp 960w, /images/london.webp 1200w",
      sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
    },
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Kew", "Isleworth", "Chiswick", "Ealing"],
    propertyTypes: [
      "Riverside flats and apartment blocks",
      "Family houses near Brentford station and the river",
      "Lettings and managed rental properties",
      "Small commercial units and office spaces",
    ],
    accessNotes: [
      "Add concierge, gate or loading-bay instructions for apartment blocks",
      "Tell us whether items are in a flat, car park, bin store or garage",
      "Parking and access photos help quote narrow residential streets",
    ],
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
    metaTitle: "Waste Removal Services in Chiswick",
    metaDescription:
      "House, garden and tenancy rubbish removal services for Chiswick homes, landlords and local businesses.",
    shortDescription:
      "Clearance services for Chiswick homes, flats, gardens and commercial properties.",
    description:
      "Chiswick collections often need careful access planning on residential streets, especially for garden waste, bulky items and busy household clearances.",
    image: {
      src: "/images/london.webp",
      alt: "Waste removal service area in Chiswick",
      width: 1200,
      height: 800,
      srcset:
        "/images/london-640.webp 640w, /images/london-960.webp 960w, /images/london.webp 1200w",
      sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
    },
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Brentford", "Acton", "Hammersmith", "Kew"],
    propertyTypes: [
      "Victorian terraces and family homes",
      "Garden flats and mansion blocks",
      "Shops and small business premises",
      "Rental properties needing fast handover",
    ],
    accessNotes: [
      "Mention controlled parking zones and any loading restrictions",
      "Share stairwell, garden side-return or basement access notes",
      "List heavy or awkward items before the crew arrives",
    ],
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
    metaTitle: "Waste Removal Services in Ealing",
    metaDescription:
      "Rubbish removal and property clearance services for Ealing homes, gardens, offices and rental properties.",
    shortDescription:
      "Waste clearance for Ealing homes, gardens, offices and rental properties.",
    description:
      "Ealing collections cover a broad mix of domestic, landlord and business waste jobs across a large West London borough.",
    image: {
      src: "/images/london.webp",
      alt: "Waste removal service area in Ealing",
      width: 1200,
      height: 800,
      srcset:
        "/images/london-640.webp 640w, /images/london-960.webp 960w, /images/london.webp 1200w",
      sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
    },
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Acton", "Hanwell", "Brentford", "Chiswick"],
    propertyTypes: [
      "Homes, flats and shared houses",
      "Garden and garage clearances",
      "Rental property clearances",
      "Small office and shop clearances",
    ],
    accessNotes: [
      "Share CPZ, driveway or estate access details when booking",
      "Tell us if items are upstairs, in a loft, garage or rear garden",
      "Separate soil, rubble or heavy materials in the quote request",
    ],
    localSearchTerms: ["rubbish removal Ealing", "waste clearance Ealing"],
    serviceNotes: [
      "Useful for household, rental and office clearances",
      "Service area copy can mention West London coverage",
    ],
  },
  {
    slug: "acton",
    name: "Acton",
    title: "Acton",
    metaTitle: "Waste Removal Services in Acton",
    metaDescription:
      "Rubbish removal and clearance services for Acton homes, flats, gardens, offices and rental properties.",
    shortDescription:
      "Waste clearance for Acton homes, flats, gardens, offices and rental properties.",
    description:
      "Acton pages cover a mix of flats, terraces, shops and rental properties where access, parking and quick collections often matter.",
    image: londonAreaImage("Acton"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Ealing", "Chiswick", "Shepherd's Bush", "Hammersmith"],
    propertyTypes: [
      "Terraced homes and converted flats",
      "Shared houses and rental properties",
      "Garage and garden clearances",
      "Small office and shop units",
    ],
    accessNotes: [
      "Mention controlled parking zones and narrow residential streets",
      "Confirm whether items are upstairs, in a rear garden or in a garage",
      "Photos help estimate mixed furniture, garden and builders waste loads",
    ],
    localSearchTerms: ["rubbish removal Acton", "waste clearance Acton"],
    serviceNotes: [
      "Useful for household, rental and garden clearances",
      "Access notes help when quoting flats and converted houses",
    ],
  },
  {
    slug: "hammersmith",
    name: "Hammersmith",
    title: "Hammersmith",
    metaTitle: "Waste Removal Services in Hammersmith",
    metaDescription:
      "Rubbish removal and property clearance for Hammersmith homes, offices, flats and landlords.",
    shortDescription:
      "Clearance services for Hammersmith flats, offices, rental properties and family homes.",
    description:
      "Hammersmith collections often involve flats, offices, riverside properties and busy loading routes where timing and access notes matter.",
    image: londonAreaImage("Hammersmith"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Fulham", "Shepherd's Bush", "Chiswick", "Kensington"],
    propertyTypes: [
      "Flats and mansion blocks",
      "Office and studio premises",
      "Rental properties between tenancies",
      "Terraced and riverside homes",
    ],
    accessNotes: [
      "Share lift, concierge or loading-bay instructions before booking",
      "Confirm red routes, bus lanes or controlled parking restrictions",
      "Tell us if items are in a basement, upper floor or shared store",
    ],
    localSearchTerms: ["rubbish removal Hammersmith", "waste clearance Hammersmith"],
    serviceNotes: [
      "Useful for office, tenancy and flat clearances",
      "Parking and loading notes help with central West London routes",
    ],
  },
  {
    slug: "fulham",
    name: "Fulham",
    title: "Fulham",
    metaTitle: "Waste Removal Services in Fulham",
    metaDescription:
      "Rubbish removal and clearance services for Fulham homes, flats, gardens, offices and landlords.",
    shortDescription:
      "Waste clearance for Fulham homes, garden flats, rental properties and commercial premises.",
    description:
      "Fulham collections often involve garden flats, terraces, mansion blocks and rental properties where careful access planning is useful.",
    image: londonAreaImage("Fulham"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Hammersmith", "Chelsea", "Kensington", "Richmond"],
    propertyTypes: [
      "Garden flats and mansion blocks",
      "Terraced family homes",
      "Managed rental properties",
      "Small offices and retail premises",
    ],
    accessNotes: [
      "Mention garden side access, basements or narrow staircases",
      "Confirm CPZ restrictions and loading options near the address",
      "List bulky furniture or mattress items before the crew arrives",
    ],
    localSearchTerms: ["rubbish removal Fulham", "waste clearance Fulham"],
    serviceNotes: [
      "Useful for furniture, garden and tenancy clearances",
      "Access details help when quoting flats and mansion blocks",
    ],
  },
  {
    slug: "shepherds-bush",
    name: "Shepherd's Bush",
    title: "Shepherd's Bush",
    metaTitle: "Waste Removal Services in Shepherd's Bush",
    metaDescription:
      "Rubbish removal and clearance for Shepherd's Bush homes, flats, offices and rental properties.",
    shortDescription:
      "Clearance services for Shepherd's Bush flats, homes, shops and rental properties.",
    description:
      "Shepherd's Bush collections often involve flats, shops, shared houses and landlord clearances where parking and loading information helps.",
    image: londonAreaImage("Shepherd's Bush"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Acton", "Hammersmith", "Notting Hill", "Kensington"],
    propertyTypes: [
      "Flats above shops",
      "Shared houses and rentals",
      "Small retail and office premises",
      "Terraced homes with garden access",
    ],
    accessNotes: [
      "Confirm loading restrictions around busy high streets",
      "Share floor level, lift access and hallway width for bulky items",
      "Tell us whether items are in a shop, flat, yard or storage area",
    ],
    localSearchTerms: [
      "rubbish removal Shepherd's Bush",
      "waste clearance Shepherd's Bush",
    ],
    serviceNotes: [
      "Useful for shop, office and rental property clearances",
      "Loading details help around busy local roads",
    ],
  },
  {
    slug: "kensington",
    name: "Kensington",
    title: "Kensington",
    metaTitle: "Waste Removal Services in Kensington",
    metaDescription:
      "Rubbish removal and property clearance for Kensington flats, townhouses, offices and landlords.",
    shortDescription:
      "Waste clearance for Kensington flats, townhouses, offices and managed rental properties.",
    description:
      "Kensington collections often involve mansion blocks, townhouses, office premises and managed properties where careful timing and tidy loading matter.",
    image: londonAreaImage("Kensington"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Chelsea", "Notting Hill", "Fulham", "Hammersmith"],
    propertyTypes: [
      "Mansion blocks and apartments",
      "Townhouses and mews properties",
      "Office and retail premises",
      "Managed rental properties",
    ],
    accessNotes: [
      "Share porter, concierge or estate access instructions",
      "Confirm controlled parking, red routes or loading permissions",
      "List fragile access areas or bulky furniture before booking",
    ],
    localSearchTerms: ["rubbish removal Kensington", "waste clearance Kensington"],
    serviceNotes: [
      "Useful for furniture, office and tenancy clearances",
      "Building access notes help plan tidy collections",
    ],
  },
  {
    slug: "chelsea",
    name: "Chelsea",
    title: "Chelsea",
    metaTitle: "Waste Removal Services in Chelsea",
    metaDescription:
      "Rubbish removal and clearance services for Chelsea flats, townhouses, offices and rental homes.",
    shortDescription:
      "Clearance services for Chelsea flats, townhouses, offices and managed rental properties.",
    description:
      "Chelsea collections often involve bulky furniture, tenancy clearances and office waste where access windows and parking details should be confirmed.",
    image: londonAreaImage("Chelsea"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Fulham", "Kensington", "Notting Hill", "Hammersmith"],
    propertyTypes: [
      "Townhouses and mews properties",
      "Apartments and mansion blocks",
      "Rental properties between tenancies",
      "Small offices and studios",
    ],
    accessNotes: [
      "Confirm CPZ rules and loading points close to the property",
      "Share floor level, lift access and porter instructions",
      "Flag bulky furniture, mattresses or heavy materials before booking",
    ],
    localSearchTerms: ["rubbish removal Chelsea", "waste clearance Chelsea"],
    serviceNotes: [
      "Useful for furniture, tenancy and office clearances",
      "Clear access notes help when collections need a tight time window",
    ],
  },
  {
    slug: "notting-hill",
    name: "Notting Hill",
    title: "Notting Hill",
    metaTitle: "Waste Removal Services in Notting Hill",
    metaDescription:
      "Rubbish removal and property clearance for Notting Hill homes, flats, offices and landlords.",
    shortDescription:
      "Waste clearance for Notting Hill flats, terraces, shops and rental properties.",
    description:
      "Notting Hill collections often involve converted flats, terraces, shop premises and rental clearances where controlled parking and access need planning.",
    image: londonAreaImage("Notting Hill"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Kensington", "Shepherd's Bush", "Chelsea", "Hammersmith"],
    propertyTypes: [
      "Converted flats and terraces",
      "Basement and garden flats",
      "Shop and studio premises",
      "Managed rental properties",
    ],
    accessNotes: [
      "Mention basement, stairwell or garden access constraints",
      "Confirm parking controls and loading restrictions before booking",
      "Send photos of bulky furniture and mixed waste loads",
    ],
    localSearchTerms: ["rubbish removal Notting Hill", "waste clearance Notting Hill"],
    serviceNotes: [
      "Useful for furniture, garage and tenancy clearances",
      "Parking and floor-level details help quote accurately",
    ],
  },
  {
    slug: "kew",
    name: "Kew",
    title: "Kew",
    metaTitle: "Waste Removal Services in Kew",
    metaDescription:
      "Rubbish removal and garden clearance services for Kew homes, flats, landlords and businesses.",
    shortDescription:
      "Waste clearance for Kew homes, garden properties, flats and rental clearances.",
    description:
      "Kew collections often involve garden waste, household clearances and rental properties around residential streets and riverside homes.",
    image: londonAreaImage("Kew"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Brentford", "Chiswick", "Richmond", "Isleworth"],
    propertyTypes: [
      "Family homes and garden properties",
      "Flats and maisonettes",
      "Garages and sheds",
      "Rental homes and managed properties",
    ],
    accessNotes: [
      "Share driveway, side-return or garden access before booking",
      "Tell us if green waste is bagged or loose",
      "Separate heavy soil, rubble or tiles in the quote request",
    ],
    localSearchTerms: ["rubbish removal Kew", "garden waste removal Kew"],
    serviceNotes: [
      "Useful for garden, garage and household clearances",
      "Access details help when items are stored behind the property",
    ],
  },
  {
    slug: "richmond",
    name: "Richmond",
    title: "Richmond",
    metaTitle: "Waste Removal Services in Richmond",
    metaDescription:
      "Rubbish removal and clearance services for Richmond homes, gardens, offices and rental properties.",
    shortDescription:
      "Waste clearance for Richmond homes, gardens, offices, flats and rental properties.",
    description:
      "Richmond collections cover household, garden and office clearances across residential streets, riverside properties and managed rentals.",
    image: londonAreaImage("Richmond"),
    county: "Greater London",
    region: "South West London",
    nearbyAreas: ["Kew", "Twickenham", "Brentford", "Isleworth"],
    propertyTypes: [
      "Family homes and garden flats",
      "Riverside apartments",
      "Small offices and studios",
      "Rental properties and garages",
    ],
    accessNotes: [
      "Confirm driveway, permit or controlled parking details",
      "Share garden, garage or side access notes before booking",
      "Flag heavy soil, rubble or bulky furniture when requesting a quote",
    ],
    localSearchTerms: ["rubbish removal Richmond", "waste clearance Richmond"],
    serviceNotes: [
      "Useful for household, garden and office clearances",
      "Photos help quote mixed bulky and green waste loads",
    ],
  },
  {
    slug: "twickenham",
    name: "Twickenham",
    title: "Twickenham",
    metaTitle: "Waste Removal Services in Twickenham",
    metaDescription:
      "Rubbish removal and property clearance for Twickenham homes, gardens, offices and landlords.",
    shortDescription:
      "Clearance services for Twickenham homes, gardens, garages and rental properties.",
    description:
      "Twickenham collections cover garden waste, house clearance, furniture removal and landlord jobs across family homes and flats.",
    image: londonAreaImage("Twickenham"),
    county: "Greater London",
    region: "South West London",
    nearbyAreas: ["Richmond", "Isleworth", "Hounslow", "Kew"],
    propertyTypes: [
      "Family houses and garden properties",
      "Flats and maisonettes",
      "Garages, sheds and storage areas",
      "Rental properties between tenancies",
    ],
    accessNotes: [
      "Tell us if items are in a rear garden, shed or garage",
      "Confirm permit parking, driveway access or loading space",
      "Send photos of bulky furniture, mattresses or mixed waste",
    ],
    localSearchTerms: ["rubbish removal Twickenham", "waste clearance Twickenham"],
    serviceNotes: [
      "Useful for garden, garage and house clearances",
      "Driveway and side-access notes help plan the collection",
    ],
  },
  {
    slug: "isleworth",
    name: "Isleworth",
    title: "Isleworth",
    metaTitle: "Waste Removal Services in Isleworth",
    metaDescription:
      "Rubbish removal and clearance services for Isleworth homes, flats, gardens and rental properties.",
    shortDescription:
      "Waste clearance for Isleworth homes, flats, gardens, garages and rental properties.",
    description:
      "Isleworth collections cover household clutter, garden waste, garage clearances and landlord jobs around residential streets and estates.",
    image: londonAreaImage("Isleworth"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Brentford", "Hounslow", "Twickenham", "Richmond"],
    propertyTypes: [
      "Family homes and maisonettes",
      "Flats and estate properties",
      "Garages and garden storage",
      "Rental properties and small offices",
    ],
    accessNotes: [
      "Share estate, gate or driveway access details",
      "Tell us if items are upstairs, in a garage or in a rear garden",
      "Flag heavy materials separately from general household waste",
    ],
    localSearchTerms: ["rubbish removal Isleworth", "waste clearance Isleworth"],
    serviceNotes: [
      "Useful for garden, garage and rental property clearances",
      "Estate and parking details help with accurate quotes",
    ],
  },
  {
    slug: "hounslow",
    name: "Hounslow",
    title: "Hounslow",
    metaTitle: "Waste Removal Services in Hounslow",
    metaDescription:
      "Rubbish removal and property clearance for Hounslow homes, gardens, offices and landlords.",
    shortDescription:
      "Clearance services for Hounslow homes, gardens, offices, garages and rental properties.",
    description:
      "Hounslow collections cover household, garden, builders and office waste across a wide mix of homes, flats and commercial premises.",
    image: londonAreaImage("Hounslow"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Isleworth", "Twickenham", "Southall", "Hayes"],
    propertyTypes: [
      "Homes, flats and maisonettes",
      "Garages and garden areas",
      "Small offices and commercial units",
      "Rental properties and shared houses",
    ],
    accessNotes: [
      "Confirm parking, driveway or estate access before booking",
      "Tell us whether waste is indoors, outside or in a garage",
      "List heavy rubble, soil or builders waste separately",
    ],
    localSearchTerms: ["rubbish removal Hounslow", "waste clearance Hounslow"],
    serviceNotes: [
      "Useful for household, office and builders waste collections",
      "Photos help quote mixed domestic and commercial loads",
    ],
  },
  {
    slug: "hanwell",
    name: "Hanwell",
    title: "Hanwell",
    metaTitle: "Waste Removal Services in Hanwell",
    metaDescription:
      "Rubbish removal and clearance services for Hanwell homes, gardens, garages and landlords.",
    shortDescription:
      "Waste clearance for Hanwell homes, gardens, garages, flats and rental properties.",
    description:
      "Hanwell collections cover family homes, garden waste, garage clearances and rental property jobs close to the wider Ealing service area.",
    image: londonAreaImage("Hanwell"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Ealing", "Greenford", "Southall", "Brentford"],
    propertyTypes: [
      "Family homes and terraces",
      "Garden flats and maisonettes",
      "Garages, sheds and storage areas",
      "Rental homes and shared houses",
    ],
    accessNotes: [
      "Share side access, driveway or controlled parking details",
      "Tell us if garden waste is bagged or loose",
      "Flag bulky furniture, mattresses or heavy materials in photos",
    ],
    localSearchTerms: ["rubbish removal Hanwell", "waste clearance Hanwell"],
    serviceNotes: [
      "Useful for household, garden and garage clearances",
      "Photos help estimate bulky mixed loads before arrival",
    ],
  },
  {
    slug: "greenford",
    name: "Greenford",
    title: "Greenford",
    metaTitle: "Waste Removal Services in Greenford",
    metaDescription:
      "Rubbish removal and property clearance for Greenford homes, gardens, garages and small businesses.",
    shortDescription:
      "Clearance services for Greenford homes, garages, gardens, offices and rental properties.",
    description:
      "Greenford collections cover domestic clearances, garage clutter, garden waste and small business collections across West London.",
    image: londonAreaImage("Greenford"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Ealing", "Hanwell", "Southall", "Hayes"],
    propertyTypes: [
      "Family homes and garages",
      "Flats and maisonettes",
      "Small office and trade premises",
      "Garden and shed clearances",
    ],
    accessNotes: [
      "Confirm driveway, estate or controlled parking access",
      "Separate heavy rubble, tiles or soil from general waste",
      "Share photos of garage and garden loads before booking",
    ],
    localSearchTerms: ["rubbish removal Greenford", "waste clearance Greenford"],
    serviceNotes: [
      "Useful for garage, builders and garden waste collections",
      "Access notes help quote mixed domestic and trade loads",
    ],
  },
  {
    slug: "southall",
    name: "Southall",
    title: "Southall",
    metaTitle: "Waste Removal Services in Southall",
    metaDescription:
      "Rubbish removal and clearance services for Southall homes, shops, offices and rental properties.",
    shortDescription:
      "Waste clearance for Southall homes, shops, offices, garages and rental properties.",
    description:
      "Southall collections cover household waste, shop clearances, office items and landlord jobs across homes, high streets and estates.",
    image: londonAreaImage("Southall"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Hanwell", "Greenford", "Hounslow", "Hayes"],
    propertyTypes: [
      "Homes, flats and maisonettes",
      "Shops and small offices",
      "Garages and storage areas",
      "Rental homes and shared houses",
    ],
    accessNotes: [
      "Confirm loading space around high streets or estate roads",
      "Tell us whether waste is indoors, outside or in a storage area",
      "Flag bulky furniture, shop fittings or heavy materials before booking",
    ],
    localSearchTerms: ["rubbish removal Southall", "waste clearance Southall"],
    serviceNotes: [
      "Useful for household, shop and office clearances",
      "Loading details help around busy local streets",
    ],
  },
  {
    slug: "hayes",
    name: "Hayes",
    title: "Hayes",
    metaTitle: "Waste Removal Services in Hayes",
    metaDescription:
      "Rubbish removal and clearance for Hayes homes, gardens, garages, offices and rental properties.",
    shortDescription:
      "Clearance services for Hayes homes, gardens, garages, offices and rental properties.",
    description:
      "Hayes collections cover domestic rubbish, builders waste, garage clearances and small business jobs around West London and the Hillingdon border.",
    image: londonAreaImage("Hayes"),
    county: "Greater London",
    region: "West London",
    nearbyAreas: ["Southall", "Greenford", "Hounslow", "Ealing"],
    propertyTypes: [
      "Homes, flats and shared houses",
      "Garages and garden areas",
      "Small business premises",
      "Rental properties and storage spaces",
    ],
    accessNotes: [
      "Share driveway, loading bay or estate access details",
      "Separate rubble, soil or renovation waste from general clutter",
      "Send photos when bulky items are in garages or rear gardens",
    ],
    localSearchTerms: ["rubbish removal Hayes", "waste clearance Hayes"],
    serviceNotes: [
      "Useful for garage, builders and household waste collections",
      "Photos help quote mixed heavy and bulky loads",
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
