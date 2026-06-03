import type {
  BookingFormData,
  BookingSubmitControls,
  BookingLoad,
  BookingTimeSlot,
} from "~/components/ui/BookingWizard.vue";
import IconsAfternoon from "~/components/icons/Afternoon.vue";
import IconsEvening from "~/components/icons/Evening.vue";
import IconsMorning from "~/components/icons/Morning.vue";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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

function wait(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Submission cancelled.", "AbortError"));
      return;
    }

    const timeout = window.setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timeout);
        reject(new DOMException("Submission cancelled.", "AbortError"));
      },
      { once: true },
    );
  });
}

async function postBooking(data: BookingFormData, signal?: AbortSignal) {
  return fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    signal,
  });
}

function stripPhotoData(data: BookingFormData) {
  return data.photos.map((photo) => ({
    id: photo.id,
    name: photo.name,
    mimeType: photo.mimeType,
    width: photo.width,
    height: photo.height,
    size: photo.size,
    thumbnail: {
      width: photo.thumbnail.width,
      height: photo.thumbnail.height,
      size: photo.thumbnail.size,
    },
  }));
}

async function createFallbackBooking(data: BookingFormData) {
  const services = useFirebaseClient();
  if (!services) throw new Error("Firebase is unavailable.");

  const docRef = await addDoc(collection(services.db, "bookings"), {
    submissionId: data.submissionId,
    load: {
      id: data.load.id,
      name: data.load.name,
      ribbon: data.load.ribbon,
      price: data.load.price,
    },
    date: data.date,
    time: {
      id: data.time.id,
      label: data.time.label,
      description: data.time.description ?? "",
    },
    fields: data.fields,
    postcode: data.postcode,
    addressLine1: data.addressLine1,
    name: data.name,
    phone: data.phone,
    email: data.email,
    photos: stripPhotoData(data),
    photoCount: data.photos.length,
    additionalItems: data.additionalItems,
    estimatedTotalPence: data.estimatedTotalPence,
    estimatedTotalLabel: data.estimatedTotalLabel,
    status: "quote-received",
    createdAt: serverTimestamp(),
    source: "quote-form-firestore-fallback",
  });

  return docRef.id;
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

async function readBookingError(response: Response) {
  try {
    const body = await response.json();
    if (Array.isArray(body?.details) && body.details.length) {
      return body.details.join(" ");
    }
    if (typeof body?.error === "string" && body.error) {
      return body.error;
    }
  } catch {
    // Fall back to a generic message below.
  }

  return "";
}

async function waitForRetry(signal?: AbortSignal) {
  try {
    await wait(700, signal);
    return true;
  } catch (error) {
    if (isAbortError(error)) return false;
    throw error;
  }
}

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
    let response: Response | null = null;
    let apiErrorMessage = "";
    const signal = controls?.signal;

    if (signal?.aborted || controls?.isCurrent?.() === false) return;

    try {
      response = await postBooking(data, signal);
    } catch (error) {
      if (isAbortError(error) || controls?.isCurrent?.() === false) return;
      if (!(await waitForRetry(signal))) return;
      try {
        response = await postBooking(data, signal);
      } catch (retryError) {
        if (isAbortError(retryError) || controls?.isCurrent?.() === false) return;
        response = null;
      }
    }

    if (
      response &&
      [502, 503, 504].includes(response.status) &&
      controls?.isCurrent?.() !== false
    ) {
      if (!(await waitForRetry(signal))) return;
      try {
        response = await postBooking(data, signal);
      } catch (error) {
        if (isAbortError(error) || controls?.isCurrent?.() === false) return;
        response = null;
      }
    }

    if (signal?.aborted || controls?.isCurrent?.() === false) return;

    if (response?.ok) {
      try {
        await navigateTo("/thank-you/");
      } catch {
        window.location.assign("/thank-you/");
      }
      return;
    }

    apiErrorMessage = response ? await readBookingError(response) : "";
    if (signal?.aborted || controls?.isCurrent?.() === false) return;

    try {
      await createFallbackBooking(data);
      if (signal?.aborted || controls?.isCurrent?.() === false) return;
      try {
        await navigateTo("/thank-you/");
      } catch {
        window.location.assign("/thank-you/");
      }
      return;
    } catch (error) {
      console.error("Failed to create fallback booking", error);
    }

    if (signal?.aborted || controls?.isCurrent?.() === false) return;

    controls?.fail(
      apiErrorMessage
        ? `Please check your quote details. ${apiErrorMessage}`
        : "Sorry, we couldn't submit your booking. Please try again.",
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
