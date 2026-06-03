import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  type Timestamp,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import type { AdminQuoteStatus } from "~/utils/admin";

interface BookingLoadSummary {
  id?: string;
  name?: string;
  ribbon?: string;
  price?: string;
}

interface BookingTimeSummary {
  id?: string;
  label?: string;
  description?: string;
}

interface BookingAdditionalItem {
  id?: string;
  name?: string;
  quantity?: number;
  totalPriceLabel?: string;
}

interface BookingPhoto {
  id?: string;
  name?: string;
  url?: string;
  thumbnail?: {
    url?: string;
  };
}

interface BookingDocument {
  bookingId?: string;
  status?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  load?: BookingLoadSummary;
  date?: string;
  time?: BookingTimeSummary;
  postcode?: string;
  addressLine1?: string;
  name?: string;
  phone?: string;
  email?: string;
  estimatedTotalLabel?: string;
  additionalItems?: BookingAdditionalItem[];
  photos?: BookingPhoto[];
}

export interface AdminBooking {
  id: string;
  status: AdminQuoteStatus;
  createdAt: Date | null;
  updatedAt: Date | null;
  load: BookingLoadSummary;
  date: string;
  time: BookingTimeSummary;
  postcode: string;
  addressLine1: string;
  name: string;
  phone: string;
  email: string;
  estimatedTotalLabel: string;
  additionalItems: BookingAdditionalItem[];
  photos: BookingPhoto[];
}

export interface AdminBookingDayGroup {
  date: string;
  label: string;
  bookings: AdminBooking[];
}

export interface AdminBookingStageGroup {
  id: AdminQuoteStatus;
  label: string;
  description: string;
  bookings: AdminBooking[];
  dayGroups: AdminBookingDayGroup[];
}

export interface AdminBookingDetailsUpdate {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  postcode: string;
  date: string;
  estimatedTotalLabel: string;
  load: {
    name: string;
    ribbon: string;
    price: string;
  };
  time: {
    label: string;
    description: string;
  };
}

function toDate(value: Timestamp | undefined) {
  return value && typeof value.toDate === "function" ? value.toDate() : null;
}

function getCollectionTimeRank(booking: AdminBooking) {
  const rank: Record<string, number> = {
    morning: 1,
    anytime: 2,
    afternoon: 3,
    evening: 4,
  };

  return rank[String(booking.time.id ?? "").toLowerCase()] ?? 99;
}

function sortBookingsByCollection(a: AdminBooking, b: AdminBooking) {
  const dateCompare = (a.date || "9999-12-31").localeCompare(
    b.date || "9999-12-31",
  );
  if (dateCompare !== 0) return dateCompare;

  const timeCompare = getCollectionTimeRank(a) - getCollectionTimeRank(b);
  if (timeCompare !== 0) return timeCompare;

  return (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0);
}

function formatDayGroupLabel(value: string) {
  if (!value) return "Unscheduled";

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(year, month - 1, day));
}

function groupBookingsByDay(bookings: AdminBooking[]) {
  const groups = new Map<string, AdminBooking[]>();

  for (const booking of bookings) {
    const key = booking.date || "";
    groups.set(key, [...(groups.get(key) ?? []), booking]);
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => (a || "9999-12-31").localeCompare(b || "9999-12-31"))
    .map(([date, groupBookings]) => ({
      date,
      label: formatDayGroupLabel(date),
      bookings: groupBookings.sort(sortBookingsByCollection),
    }));
}

export function useAdminBookings(user: Ref<User | null>, enabled: Ref<boolean>) {
  const bookings = ref<AdminBooking[]>([]);
  const bookingsError = ref("");
  const isLoading = ref(false);
  const deletingBookingId = ref<string | null>(null);
  const movingBookingId = ref<string | null>(null);
  const savingBookingId = ref<string | null>(null);

  const groupedBookings = computed<AdminBookingStageGroup[]>(() =>
    adminQuoteStages.map((stage) => {
      const stageBookings = bookings.value
        .filter((booking) => booking.status === stage.id)
        .sort(sortBookingsByCollection);

      return {
        ...stage,
        bookings: stageBookings,
        dayGroups: groupBookingsByDay(stageBookings),
      };
    }),
  );

  watchEffect((onCleanup) => {
    if (!import.meta.client || !enabled.value) return;

    const services = useFirebaseClient();
    if (!services) return;

    isLoading.value = true;
    bookingsError.value = "";

    const bookingsQuery = query(collection(services.db, "bookings"));

    const unsubscribe = onSnapshot(
      bookingsQuery,
      (snapshot) => {
        bookings.value = snapshot.docs
          .map((bookingDoc) => {
            const data = bookingDoc.data() as BookingDocument;

            return {
              id: data.bookingId || bookingDoc.id,
              status: normalizeAdminQuoteStatus(data.status),
              createdAt: toDate(data.createdAt),
              updatedAt: toDate(data.updatedAt),
              load: data.load ?? {},
              date: data.date ?? "",
              time: data.time ?? {},
              postcode: data.postcode ?? "",
              addressLine1: data.addressLine1 ?? "",
              name: data.name ?? "",
              phone: data.phone ?? "",
              email: data.email ?? "",
              estimatedTotalLabel:
                data.estimatedTotalLabel ?? data.load?.price ?? "",
              additionalItems: Array.isArray(data.additionalItems)
                ? data.additionalItems
                : [],
              photos: Array.isArray(data.photos) ? data.photos : [],
            };
          })
          .sort(sortBookingsByCollection);
        isLoading.value = false;
      },
      (error) => {
        bookingsError.value = error.message;
        isLoading.value = false;
      },
    );

    onCleanup(unsubscribe);
  });

  async function moveBooking(bookingId: string, status: AdminQuoteStatus) {
    if (!user.value) return;

    const services = useFirebaseClient();
    if (!services) return;

    movingBookingId.value = bookingId;
    bookingsError.value = "";

    try {
      await updateDoc(doc(services.db, "bookings", bookingId), {
        status,
        updatedAt: serverTimestamp(),
        updatedBy: {
          uid: user.value.uid,
          email: user.value.email,
          name: user.value.displayName ?? "",
        },
      });
    } catch (error) {
      bookingsError.value =
        error instanceof Error ? error.message : "Could not update quote status.";
    } finally {
      movingBookingId.value = null;
    }
  }

  async function updateBookingDetails(
    bookingId: string,
    details: AdminBookingDetailsUpdate,
  ) {
    if (!user.value) return;

    const services = useFirebaseClient();
    if (!services) return;

    savingBookingId.value = bookingId;
    bookingsError.value = "";

    try {
      const existingBooking = bookings.value.find((booking) => booking.id === bookingId);

      await updateDoc(doc(services.db, "bookings", bookingId), {
        name: details.name.trim(),
        email: details.email.trim().toLowerCase(),
        phone: details.phone.trim(),
        addressLine1: details.addressLine1.trim(),
        postcode: details.postcode.trim().toUpperCase(),
        date: details.date,
        estimatedTotalLabel: details.estimatedTotalLabel.trim(),
        load: {
          id: existingBooking?.load.id ?? "",
          name: details.load.name.trim(),
          ribbon: details.load.ribbon.trim(),
          price: details.load.price.trim(),
        },
        time: {
          id: existingBooking?.time.id ?? "",
          label: details.time.label.trim(),
          description: details.time.description.trim(),
        },
        updatedAt: serverTimestamp(),
        updatedBy: {
          uid: user.value.uid,
          email: user.value.email,
          name: user.value.displayName ?? "",
        },
      });
    } catch (error) {
      bookingsError.value =
        error instanceof Error ? error.message : "Could not save quote details.";
    } finally {
      savingBookingId.value = null;
    }
  }

  async function deleteBooking(bookingId: string) {
    if (!user.value) return;

    const services = useFirebaseClient();
    if (!services) return;

    deletingBookingId.value = bookingId;
    bookingsError.value = "";

    try {
      await deleteDoc(doc(services.db, "bookings", bookingId));
    } catch (error) {
      bookingsError.value =
        error instanceof Error ? error.message : "Could not delete quote.";
    } finally {
      deletingBookingId.value = null;
    }
  }

  return {
    bookings,
    bookingsError,
    deletingBookingId,
    deleteBooking,
    groupedBookings,
    isLoading,
    moveBooking,
    movingBookingId,
    savingBookingId,
    updateBookingDetails,
  };
}
