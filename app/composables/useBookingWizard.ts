import type {
  BookingFormData,
  BookingLoad,
  BookingTimeSlot,
} from "~/components/ui/BookingWizard.vue";
import IconsAfternoon from "~/components/icons/Afternoon.vue";
import IconsEvening from "~/components/icons/Evening.vue";
import IconsMorning from "~/components/icons/Morning.vue";

const bookingLoads: BookingLoad[] = [
  {
    id: "min",
    name: "Min Job",
    ribbon: "Single item",
    price: "£40",
    tag: "Minimum price",
    imageSrc: "/images/0van.svg",
    imageAlt: "Single item",
  },
  {
    id: "mini",
    name: "Mini Load",
    ribbon: "1/4 van",
    price: "£100",
    imageSrc: "/images/1van.svg",
    imageAlt: "Quarter-load van",
  },
  {
    id: "small",
    name: "Small Load",
    ribbon: "1/2 van",
    price: "£180",
    tag: "Most popular",
    imageSrc: "/images/2van.svg",
    imageAlt: "Half-load van",
  },
  {
    id: "large",
    name: "Large Load",
    ribbon: "3/4 van",
    price: "£240",
    imageSrc: "/images/3van.svg",
    imageAlt: "Three-quarter-load van",
  },
  {
    id: "full",
    name: "Full Load",
    ribbon: "Full van",
    price: "£300",
    imageSrc: "/images/4van.svg",
    imageAlt: "Full-load van",
  },
];

const bookingTimes: BookingTimeSlot[] = [
  {
    id: "morning",
    label: "Morning",
    description: "8am - 12pm",
    icon: IconsMorning,
  },
  {
    id: "afternoon",
    label: "Afternoon",
    description: "12pm - 4pm",
    icon: IconsAfternoon,
  },
  {
    id: "evening",
    label: "Evening",
    description: "4pm - 8pm",
    icon: IconsEvening,
  },
];

export function useBookingWizard() {
  const open = useState<boolean>("booking-wizard-open", () => false);
  const preselectedLoadId = useState<string | null>(
    "booking-wizard-preselected-load-id",
    () => null,
  );

  function openBookingWizard(loadId?: string | null | Event) {
    preselectedLoadId.value = typeof loadId === "string" ? loadId : null;
    open.value = true;
  }

  function closeBookingWizard() {
    open.value = false;
  }

  async function submitBookingWizard(_data: BookingFormData) {
    closeBookingWizard();
    await navigateTo("/thank-you");
  }

  return {
    bookingWizardOpen: open,
    bookingWizardPreselectedLoadId: preselectedLoadId,
    bookingLoads,
    bookingTimes,
    openBookingWizard,
    closeBookingWizard,
    submitBookingWizard,
  };
}
