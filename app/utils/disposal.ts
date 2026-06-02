export interface DisposalStep {
  title: string;
  description: string;
}

export interface RestrictedItem {
  title: string;
  description: string;
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

export const restrictedItems: RestrictedItem[] = [
  {
    title: "Asbestos",
    description:
      "Asbestos and suspected asbestos must be handled by a specialist licensed contractor.",
  },
  {
    title: "Hazardous chemicals",
    description:
      "Chemicals, solvents, fuels and unidentified liquids need specialist handling and should be described before collection.",
  },
  {
    title: "Wet paint and pressurised containers",
    description:
      "Paint tins with liquid inside, gas bottles and pressurised containers may need separate disposal routes.",
  },
  {
    title: "Clinical or sanitary waste",
    description:
      "Clinical waste, sharps and sanitary waste require specialist collection and cannot be mixed with standard clearance loads.",
  },
];

export const disposalFaqs = [
  {
    question: "Can you provide disposal paperwork?",
    answer:
      "Ask before booking if you need disposal paperwork for landlord, business or property-management records. The team can confirm what can be supplied for your job type.",
  },
  {
    question: "What happens to reusable items?",
    answer:
      "Reusable and recyclable material is separated where practical before the remaining waste is sent through appropriate disposal routes.",
  },
  {
    question: "What should I mention before booking?",
    answer:
      "Mention heavy materials, liquids, chemicals, paint, gas bottles, electrical items, access restrictions and any items you think may need specialist handling.",
  },
];
