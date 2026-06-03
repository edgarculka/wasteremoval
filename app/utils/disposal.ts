export interface DisposalStep {
  title: string;
  description: string;
}

export interface RestrictedItem {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    srcset: string;
    sizes: string;
  };
}

export const disposalSteps: DisposalStep[] = [
  {
    title: "Quote from photos and access notes",
    description:
      "The quote starts with the waste type, approximate volume, photos, parking information and where the items are stored.",
  },
  {
    title: "Confirm the load before removal",
    description:
      "The crew checks the load size and flags any restricted materials before anything is carried out.",
  },
  {
    title: "Separate reusable or recyclable material",
    description:
      "Reusable and recyclable material is separated where practical before the remaining waste is sent through appropriate disposal routes.",
  },
  {
    title: "Keep job records available",
    description:
      "Customers who need disposal paperwork for landlord, business or property-management records should request it before booking.",
  },
];

function restrictedImage(slug: string, alt: string): RestrictedItem["image"] {
  return {
    src: `/images/restricted-materials/${slug}.webp`,
    alt,
    width: 960,
    height: 720,
    srcset: `/images/restricted-materials/${slug}-480.webp 480w, /images/restricted-materials/${slug}.webp 960w`,
    sizes: "(min-width: 768px) 40vw, calc(100vw - 48px)",
  };
}

export const restrictedItems: RestrictedItem[] = [
  {
    title: "Asbestos",
    description:
      "Asbestos and suspected asbestos must be handled by a specialist licensed contractor.",
    image: restrictedImage(
      "asbestos",
      "Sealed asbestos warning bags and wrapped board ready for specialist handling",
    ),
  },
  {
    title: "Hazardous chemicals",
    description:
      "Chemicals, solvents, fuels and unidentified liquids need specialist handling and should be described before collection.",
    image: restrictedImage(
      "hazardous-chemicals",
      "Closed chemical containers grouped for specialist waste identification",
    ),
  },
  {
    title: "Wet paint and pressurised containers",
    description:
      "Paint tins with liquid inside, gas bottles and pressurised containers may need separate disposal routes.",
    image: restrictedImage(
      "paint-pressurised-containers",
      "Closed paint tins and pressurised containers ready for separate disposal",
    ),
  },
  {
    title: "Clinical or sanitary waste",
    description:
      "Clinical waste, sharps and sanitary waste require specialist collection and cannot be mixed with standard clearance loads.",
    image: restrictedImage(
      "clinical-sanitary-waste",
      "Sealed clinical waste sacks and sharps container ready for specialist collection",
    ),
  },
];
