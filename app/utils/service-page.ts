import type { ServiceProcessStep } from "~/components/ui/ServiceProcess.vue";

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
    title: "Responsible disposal",
    description:
      "Waste is taken through appropriate disposal routes, with reusable and recyclable material separated where practical.",
  },
];
