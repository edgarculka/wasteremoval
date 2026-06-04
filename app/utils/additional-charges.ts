export interface AdditionalChargeImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  srcset: string;
  sizes: string;
}

export interface AdditionalChargeSource {
  name: string;
  href: string;
  note: string;
}

export interface AdditionalChargeItem {
  id: string;
  name: string;
  shortName: string;
  category: string;
  pricePence: number;
  unit: string;
  note: string;
  image: AdditionalChargeImage;
  sourceIds: string[];
  quoteSelectable: boolean;
}

export interface SelectedAdditionalCharge {
  id: string;
  name: string;
  quantity: number;
  unitPricePence: number;
  unitPriceLabel: string;
  totalPricePence: number;
  totalPriceLabel: string;
}

function chargeImage(slug: string, alt: string): AdditionalChargeImage {
  return {
    src: `/images/additional-charges/${slug}.webp`,
    alt,
    width: 960,
    height: 720,
    srcset: [
      `/images/additional-charges/${slug}-480.webp 480w`,
      `/images/additional-charges/${slug}-720.webp 720w`,
      `/images/additional-charges/${slug}.webp 960w`,
    ].join(", "),
    sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 92vw",
  };
}

export function formatPounds(pricePence: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(pricePence / 100);
}

export function formatChargeUnit(unit: string) {
  return unit === "each" ? "item" : unit;
}

export const additionalChargeSources: AdditionalChargeSource[] = [
  {
    name: "Skip It London additional charges",
    href: "https://skipit.london/storage/2024/11/Additional-charges.pdf",
    note: "Detailed London price list for non-compliant items and POPs seating, listed per item before VAT.",
  },
  {
    name: "HR Waste Management London price list",
    href: "https://www.hrwastemanagement.co.uk/price-list",
    note: "London guide prices for fridges, appliances, mattresses, sofas and removals.",
  },
  {
    name: "Hurleys additional skip hire charges",
    href: "https://skiphire4london.co.uk/helpful-info/additional-charges/",
    note: "North London additional charges for mattresses, POPs seating, tyres and fridges.",
  },
  {
    name: "GOV.UK POPs seating guidance",
    href: "https://www.gov.uk/guidance/manage-waste-upholstered-domestic-seating-containing-pops",
    note: "Environment Agency guidance on sorting, storing and disposing of upholstered domestic seating containing POPs.",
  },
];

export const additionalChargeItems: AdditionalChargeItem[] = [
  {
    id: "mattress",
    name: "Mattress",
    shortName: "Mattress",
    category: "Beds and mattresses",
    pricePence: 3000,
    unit: "each",
    note: "Any size mattress that needs separate handling from standard mixed waste.",
    image: chargeImage(
      "mattress",
      "Used mattress ready for specialist kerbside collection",
    ),
    sourceIds: ["Skip It London", "HR Waste", "Hurleys"],
    quoteSelectable: true,
  },
  {
    id: "small-tyre",
    name: "Small tyre",
    shortName: "Small tyre",
    category: "Tyres and rubber",
    pricePence: 1500,
    unit: "each",
    note: "Car, motorcycle or similar small tyre.",
    image: chargeImage("small-tyre", "Small used tyre ready for specialist disposal"),
    sourceIds: ["Skip It London", "Hurleys"],
    quoteSelectable: true,
  },
  {
    id: "large-tyre",
    name: "Large tyre",
    shortName: "Large tyre",
    category: "Tyres and rubber",
    pricePence: 5000,
    unit: "each",
    note: "Large van, 4x4 or oversized tyre where disposal costs are higher.",
    image: chargeImage("large-tyre", "Large used tyre ready for specialist disposal"),
    sourceIds: ["Skip It London"],
    quoteSelectable: true,
  },
  {
    id: "small-fridge",
    name: "Small fridge or freezer",
    shortName: "Small fridge",
    category: "Cooling appliances",
    pricePence: 5500,
    unit: "each",
    note: "Under-counter or small domestic fridge/freezer.",
    image: chargeImage(
      "small-fridge",
      "Small fridge freezer ready for WEEE disposal",
    ),
    sourceIds: ["Skip It London", "HR Waste", "Hurleys"],
    quoteSelectable: true,
  },
  {
    id: "large-fridge",
    name: "Large fridge or freezer",
    shortName: "Large fridge",
    category: "Cooling appliances",
    pricePence: 8500,
    unit: "each",
    note: "Tall or large domestic fridge/freezer.",
    image: chargeImage(
      "large-fridge",
      "Large fridge freezer ready for WEEE disposal",
    ),
    sourceIds: ["Skip It London", "HR Waste", "Hurleys"],
    quoteSelectable: true,
  },
  {
    id: "paint-pot",
    name: "Full paint pot",
    shortName: "Paint pot",
    category: "Paint, liquids and containers",
    pricePence: 3000,
    unit: "each",
    note: "Full or part-full paint tins. Empty dry tins do not usually need this charge.",
    image: chargeImage("paint-pot", "Paint tins ready for specialist disposal"),
    sourceIds: ["Skip It London"],
    quoteSelectable: true,
  },
  {
    id: "rubble-plasterboard",
    name: "Rubble or plasterboard bag",
    shortName: "Rubble bag",
    category: "Heavy building waste",
    pricePence: 3000,
    unit: "bag",
    note: "Rubble, tiles, soil, hardcore or plasterboard should be declared because weight and disposal routes are limited.",
    image: chargeImage(
      "rubble-plasterboard",
      "Rubble bags and plasterboard ready for separate disposal",
    ),
    sourceIds: ["Skip It London"],
    quoteSelectable: true,
  },
  {
    id: "adhesive-tin",
    name: "Adhesive tin or tube",
    shortName: "Adhesive tin",
    category: "Paint, liquids and containers",
    pricePence: 3000,
    unit: "each",
    note: "Adhesive, sealant or similar container needing separate disposal.",
    image: chargeImage(
      "adhesive-tin",
      "Sealed tins ready for specialist disposal",
    ),
    sourceIds: ["Skip It London"],
    quoteSelectable: true,
  },
  {
    id: "fluorescent-tubes",
    name: "Fluorescent tube",
    shortName: "Light tube",
    category: "Electrical items",
    pricePence: 1500,
    unit: "each",
    note: "Fluorescent tubes and lamps need separate WEEE handling and should not be mixed with standard waste.",
    image: chargeImage(
      "fluorescent-tubes",
      "Fluorescent light tubes ready for WEEE disposal",
    ),
    sourceIds: ["Skip It London"],
    quoteSelectable: true,
  },
  {
    id: "fire-extinguisher",
    name: "Fire extinguisher",
    shortName: "Extinguisher",
    category: "Pressurised containers",
    pricePence: 2500,
    unit: "each",
    note: "Pressurised fire extinguishers must be flagged before loading.",
    image: chargeImage(
      "fire-extinguisher",
      "Fire extinguisher ready for specialist disposal",
    ),
    sourceIds: ["Skip It London"],
    quoteSelectable: true,
  },
  {
    id: "gas-bottle",
    name: "Gas bottle",
    shortName: "Gas bottle",
    category: "Pressurised containers",
    pricePence: 8000,
    unit: "each",
    note: "Gas bottles and cylinders require specialist handling and may be refused if not declared.",
    image: chargeImage(
      "gas-bottle",
      "Gas bottle ready for specialist disposal",
    ),
    sourceIds: ["Skip It London", "Skip It guidance"],
    quoteSelectable: true,
  },
  {
    id: "tv-monitor",
    name: "TV or monitor",
    shortName: "TV/monitor",
    category: "Electrical items",
    pricePence: 5500,
    unit: "each",
    note: "Screens and monitors need WEEE handling rather than standard mixed disposal.",
    image: chargeImage("tv-monitor", "TV monitor ready for WEEE disposal"),
    sourceIds: ["Skip It London", "London Rubbish Clearance"],
    quoteSelectable: true,
  },
  {
    id: "dishwasher",
    name: "Dishwasher",
    shortName: "Dishwasher",
    category: "Electrical items",
    pricePence: 4500,
    unit: "each",
    note: "Large electrical appliance requiring WEEE disposal routing.",
    image: chargeImage(
      "dishwasher",
      "Dishwasher ready for WEEE disposal",
    ),
    sourceIds: ["Skip It London", "HR Waste"],
    quoteSelectable: true,
  },
  {
    id: "washing-machine",
    name: "Washing machine",
    shortName: "Washing machine",
    category: "Electrical items",
    pricePence: 4000,
    unit: "each",
    note: "Large electrical appliance requiring WEEE disposal routing.",
    image: chargeImage(
      "washing-machine",
      "Washing machine ready for WEEE disposal",
    ),
    sourceIds: ["Skip It London", "HR Waste"],
    quoteSelectable: true,
  },
  {
    id: "microwave",
    name: "Microwave",
    shortName: "Microwave",
    category: "Electrical items",
    pricePence: 2500,
    unit: "each",
    note: "Small WEEE item that should be listed before collection.",
    image: chargeImage(
      "small-electricals",
      "Microwave and small electrical items ready for WEEE disposal",
    ),
    sourceIds: ["Skip It London"],
    quoteSelectable: true,
  },
  {
    id: "cooker",
    name: "Cooker",
    shortName: "Cooker",
    category: "Electrical items",
    pricePence: 5000,
    unit: "each",
    note: "Domestic cooker or oven requiring appliance disposal handling.",
    image: chargeImage("cooker", "Domestic cooker ready for disposal"),
    sourceIds: ["Skip It London", "HR Waste"],
    quoteSelectable: true,
  },
  {
    id: "armchair",
    name: "Chair or armchair",
    shortName: "Armchair",
    category: "POPs upholstered seating",
    pricePence: 5000,
    unit: "each",
    note: "Waste upholstered domestic seating can require POPs disposal routing.",
    image: chargeImage(
      "armchair",
      "Upholstered armchair ready for POPs disposal",
    ),
    sourceIds: ["Skip It London", "GOV.UK POPs"],
    quoteSelectable: true,
  },
  {
    id: "two-seat-sofa",
    name: "Two seater sofa",
    shortName: "2 seat sofa",
    category: "POPs upholstered seating",
    pricePence: 7500,
    unit: "each",
    note: "Upholstered sofas are priced separately because of POPs handling.",
    image: chargeImage(
      "two-seat-sofa",
      "Two seater sofa ready for POPs disposal",
    ),
    sourceIds: ["Skip It London", "GOV.UK POPs", "HR Waste"],
    quoteSelectable: true,
  },
  {
    id: "three-seat-sofa",
    name: "Three seater sofa",
    shortName: "3 seat sofa",
    category: "POPs upholstered seating",
    pricePence: 10000,
    unit: "each",
    note: "Larger upholstered sofas are priced separately because of POPs handling.",
    image: chargeImage(
      "three-seat-sofa",
      "Three seater sofa ready for POPs disposal",
    ),
    sourceIds: ["Skip It London", "GOV.UK POPs", "HR Waste"],
    quoteSelectable: true,
  },
  {
    id: "small-pops",
    name: "Footstool, pouffe, bean bag or bed base",
    shortName: "Small POPs item",
    category: "POPs upholstered seating",
    pricePence: 5000,
    unit: "each",
    note: "Small upholstered seating and soft furniture items needing POPs handling.",
    image: chargeImage(
      "small-pops",
      "Small upholstered furniture ready for POPs disposal",
    ),
    sourceIds: ["Skip It London", "GOV.UK POPs", "Hurleys"],
    quoteSelectable: true,
  },
  {
    id: "pops-full-load",
    name: "POPs contaminated full load",
    shortName: "POPs full load",
    category: "POPs upholstered seating",
    pricePence: 25000,
    unit: "load",
    note: "Full load affected by upholstered domestic seating waste containing POPs.",
    image: chargeImage(
      "pops-full-load",
      "Upholstered furniture load ready for POPs disposal",
    ),
    sourceIds: ["Skip It London", "GOV.UK POPs"],
    quoteSelectable: false,
  },
  {
    id: "rubber-tracks",
    name: "Rubber tracks",
    shortName: "Rubber tracks",
    category: "Tyres and rubber",
    pricePence: 5000,
    unit: "each",
    note: "Specialist rubber item with a separate recycling route.",
    image: chargeImage("rubber-tracks", "Rubber waste ready for specialist disposal"),
    sourceIds: ["Skip It London"],
    quoteSelectable: false,
  },
  {
    id: "scrap-machine-track",
    name: "Scrap machine track",
    shortName: "Machine track",
    category: "Industrial items",
    pricePence: 17500,
    unit: "each",
    note: "Industrial item that needs a separate quote before collection.",
    image: chargeImage(
      "scrap-machine-track",
      "Heavy construction waste ready for specialist disposal",
    ),
    sourceIds: ["Skip It London"],
    quoteSelectable: false,
  },
  {
    id: "scrap-conveyor-belt",
    name: "Scrap conveyor belt",
    shortName: "Conveyor belt",
    category: "Industrial items",
    pricePence: 15000,
    unit: "each",
    note: "Industrial item that needs a separate quote before collection.",
    image: chargeImage(
      "scrap-conveyor-belt",
      "Heavy industrial waste ready for specialist disposal",
    ),
    sourceIds: ["Skip It London"],
    quoteSelectable: false,
  },
];

export const quoteAdditionalChargeItems = additionalChargeItems.filter(
  (item) => item.quoteSelectable,
);

export const additionalChargeCategories = Array.from(
  new Set(additionalChargeItems.map((item) => item.category)),
);

export function buildSelectedAdditionalCharge(
  item: AdditionalChargeItem,
  quantity: number,
): SelectedAdditionalCharge {
  const totalPricePence = item.pricePence * quantity;

  return {
    id: item.id,
    name: item.name,
    quantity,
    unitPricePence: item.pricePence,
    unitPriceLabel: formatPounds(item.pricePence),
    totalPricePence,
    totalPriceLabel: formatPounds(totalPricePence),
  };
}
