import type { ReviewItem } from "~/components/ui/Reviews.vue";
import type { ServiceProcessStep } from "~/components/ui/ServiceProcess.vue";

export const servicePageReviews: ReviewItem[] = [
  {
    author: "Aisha Khan",
    meta: "House clearance",
    rating: 5,
    quote: "Booked in minutes, arrived on time, and left the place spotless.",
  },
  {
    author: "Tom Bradley",
    meta: "Sofa removal",
    rating: 5,
    quote:
      "Clear pricing, friendly crew, and no fuss getting a bulky sofa out.",
  },
  {
    author: "Maya Roberts",
    meta: "Garden waste",
    rating: 4.5,
    quote: "Fast collection and they swept up after loading everything.",
  },
  {
    author: "Daniel Green",
    meta: "Office clear-out",
    rating: 5,
    quote: "Professional from quote to pickup. Exactly what we needed.",
  },
];

export const serviceProcessSteps: ServiceProcessStep[] = [
  {
    title: "Send the details",
    description:
      "Share the service type, address, access notes and photos so the team can estimate the right load size.",
  },
  {
    title: "Confirm the quote",
    description:
      "The crew confirms the likely price band before arrival and agrees any access or parking details.",
  },
  {
    title: "We load everything",
    description:
      "Items are lifted from the agreed location, swept up where practical and removed in one visit.",
  },
  {
    title: "Licensed disposal",
    description:
      "Waste is taken to licensed facilities, with reusable and recyclable material separated where possible.",
  },
];
