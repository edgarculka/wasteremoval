import type {
  BookingFormData,
  BookingSubmitControls,
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
    pricePence: 4000,
    tag: "Minimum price",
    imageSrc: "/images/0van.svg",
    imageAlt: "Single item",
    imageWidth: 88,
    imageHeight: 41,
  },
  {
    id: "mini",
    name: "Mini Load",
    ribbon: "1/4 van",
    price: "£100",
    pricePence: 10000,
    imageSrc: "/images/1van.svg",
    imageAlt: "Quarter-load van",
    imageWidth: 88,
    imageHeight: 41,
  },
  {
    id: "small",
    name: "Small Load",
    ribbon: "1/2 van",
    price: "£180",
    pricePence: 18000,
    tag: "Most popular",
    imageSrc: "/images/2van.svg",
    imageAlt: "Half-load van",
    imageWidth: 88,
    imageHeight: 41,
  },
  {
    id: "large",
    name: "Large Load",
    ribbon: "3/4 van",
    price: "£240",
    pricePence: 24000,
    imageSrc: "/images/3van.svg",
    imageAlt: "Three-quarter-load van",
    imageWidth: 88,
    imageHeight: 41,
  },
  {
    id: "full",
    name: "Full Load",
    ribbon: "Full van",
    price: "£300",
    pricePence: 30000,
    imageSrc: "/images/4van.svg",
    imageAlt: "Full-load van",
    imageWidth: 88,
    imageHeight: 41,
  },
];

const bookingTimes: BookingTimeSlot[] = [
  {
    id: "anytime",
    label: "Any time",
    description: "First available slot",
  },
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
  function openBookingWizard(loadId?: string | null | Event) {
    const selectedLoadId = typeof loadId === "string" ? loadId : null;

    return navigateTo({
      path: "/quote/",
      query: selectedLoadId ? { load: selectedLoadId } : undefined,
    });
  }

  function closeBookingWizard() {
    return navigateTo("/");
  }

  async function submitBookingWizard(
    data: BookingFormData,
    controls?: BookingSubmitControls,
  ) {
    let response: Response;

    try {
      response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      controls?.fail();
      window.alert(
        "Sorry, we couldn't confirm your booking request. Please check whether you receive a confirmation, or contact DBS Waste directly.",
      );
      return;
    }

    if (response.ok) {
      try {
        await navigateTo("/thank-you/");
      } catch {
        window.location.assign("/thank-you/");
      }
      return;
    }

    controls?.fail();
    window.alert(
      "Sorry, we couldn't submit your booking. Please try again or contact DBS Waste directly.",
    );
  }

  return {
    bookingLoads,
    bookingTimes,
    openBookingWizard,
    closeBookingWizard,
    submitBookingWizard,
  };
}
