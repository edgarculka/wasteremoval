<script setup lang="ts">
import type {
  AdminBookingDetailsUpdate,
} from "~/composables/useAdminBookings";
import type { AdminQuoteStatus } from "~/utils/admin";

definePageMeta({
  layout: "default",
});

useHead({
  title: "Admin",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

const {
  authError,
  isAllowedAdmin,
  isSigningIn,
  ready,
  signInWithGoogle,
  signOutAdmin,
  user,
} = useAdminAuth();

const {
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
} = useAdminBookings(user, isAllowedAdmin);

const selectedBookingId = ref<string | null>(null);
const draggedBookingId = ref<string | null>(null);
const editor = reactive<AdminBookingDetailsUpdate>({
  name: "",
  email: "",
  phone: "",
  addressLine1: "",
  postcode: "",
  date: "",
  estimatedTotalLabel: "",
  load: {
    name: "",
    ribbon: "",
    price: "",
  },
  time: {
    label: "",
    description: "",
  },
});

const selectedBooking = computed(() =>
  bookings.value.find((booking) => booking.id === selectedBookingId.value) ?? null,
);

const emailActionHref = computed(() => {
  const email = editor.email.trim();
  return email ? `mailto:${email}` : undefined;
});

const phoneActionHref = computed(() => {
  const phone = editor.phone.replace(/[^\d+]/g, "");
  return phone ? `tel:${phone}` : undefined;
});

watch(selectedBooking, (booking) => {
  if (!booking) return;

  editor.name = booking.name;
  editor.email = booking.email;
  editor.phone = booking.phone;
  editor.addressLine1 = booking.addressLine1;
  editor.postcode = booking.postcode;
  editor.date = booking.date;
  editor.estimatedTotalLabel = booking.estimatedTotalLabel;
  editor.load.name = booking.load.name ?? "";
  editor.load.ribbon = booking.load.ribbon ?? "";
  editor.load.price = booking.load.price ?? "";
  editor.time.label = booking.time.label ?? "";
  editor.time.description = booking.time.description ?? "";
});

watch(bookings, (nextBookings) => {
  if (
    selectedBookingId.value &&
    !nextBookings.some((booking) => booking.id === selectedBookingId.value)
  ) {
    selectedBookingId.value = null;
  }
});

function formatDateTime(date: Date | null) {
  if (!date) return "Pending";

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatCollectionDate(value: string) {
  if (!value) return "No date";

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function toggleBooking(bookingId: string) {
  selectedBookingId.value =
    selectedBookingId.value === bookingId ? null : bookingId;
}

function closeDrawer() {
  selectedBookingId.value = null;
}

function handleDragStart(event: DragEvent, bookingId: string) {
  draggedBookingId.value = bookingId;
  event.dataTransfer?.setData("text/plain", bookingId);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
}

function handleDragEnd() {
  draggedBookingId.value = null;
}

async function handleDrop(event: DragEvent, status: AdminQuoteStatus) {
  const bookingId =
    event.dataTransfer?.getData("text/plain") || draggedBookingId.value;
  draggedBookingId.value = null;

  if (!bookingId) return;

  const booking = bookings.value.find((item) => item.id === bookingId);
  if (!booking || booking.status === status) return;

  await moveBooking(bookingId, status);
}

async function saveSelectedBooking() {
  if (!selectedBooking.value) return;
  await updateBookingDetails(selectedBooking.value.id, editor);
}

function autosaveSelectedBooking() {
  void saveSelectedBooking();
}

async function confirmDeleteSelectedBooking() {
  if (!selectedBooking.value) return;

  const label = selectedBooking.value.name || selectedBooking.value.id;
  const confirmed = window.confirm(
    `Delete quote ${label}? This cannot be undone.`,
  );

  if (!confirmed) return;

  const bookingId = selectedBooking.value.id;
  await deleteBooking(bookingId);
  if (selectedBookingId.value === bookingId) {
    selectedBookingId.value = null;
  }
}
</script>

<template>
  <main class="min-h-screen bg-background text-foreground">
    <ClientOnly>
      <template #fallback>
        <UiSection spacing="lg" alignment="center">
          <UiHeading :level="1" size="lg">Admin</UiHeading>
          <UiText tone="low">Loading Google authentication...</UiText>
        </UiSection>
      </template>

      <UiSection v-if="!ready" spacing="lg" alignment="center">
        <UiHeading :level="1" size="lg">Admin</UiHeading>
        <UiText tone="low">Checking your Google session...</UiText>
      </UiSection>

      <UiSection v-else-if="!isAllowedAdmin" spacing="lg" alignment="center">
        <div class="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
          <UiHeading :level="1" size="lg">Sign in with Google</UiHeading>
          <UiButton :disabled="isSigningIn" @click="signInWithGoogle">
            {{ isSigningIn ? "Opening Google..." : "Sign in" }}
          </UiButton>
          <UiText
            v-if="authError"
            size="sm"
            weight="semibold"
            class="text-destructive"
            role="alert"
          >
            {{ authError }}
          </UiText>
        </div>
      </UiSection>

      <div v-else class="flex h-dvh min-h-0 flex-col overflow-hidden">
        <header class="shrink-0 border-b border-border bg-surface-raised text-foreground">
          <div class="flex h-14 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <UiHeading :level="1" size="sm">Admin</UiHeading>
            <UiButton variant="secondary" size="sm" @click="signOutAdmin">
              Sign out
            </UiButton>
            <UiText
              v-if="bookingsError"
              size="sm"
              weight="semibold"
              class="absolute left-4 top-14 z-20 rounded-b-md bg-background px-3 py-2 text-destructive shadow-sm sm:left-6 lg:left-8"
              role="alert"
            >
              {{ bookingsError }}
            </UiText>
          </div>
        </header>

        <section class="min-h-0 flex-1 overflow-hidden bg-background px-4 py-4 sm:px-6 lg:px-8" aria-label="Quote pipeline">
          <div class="flex h-full min-h-0 gap-3 overflow-x-auto overflow-y-hidden pb-1">
            <article
              v-for="stage in groupedBookings"
              :key="stage.id"
              class="flex min-h-0 w-[18rem] shrink-0 flex-col rounded-md border border-border bg-surface-muted xl:w-auto xl:min-w-0 xl:flex-1"
              :class="draggedBookingId ? 'border-primary bg-primary/10 ring-2 ring-primary/70' : ''"
              @dragover.prevent
              @drop.prevent="handleDrop($event, stage.id)"
            >
              <header class="shrink-0 px-3 py-3">
                <div class="flex min-w-0 items-center gap-2">
                  <UiHeading :level="2" size="xs">
                    {{ stage.label }}
                  </UiHeading>
                  <UiText
                    as="span"
                    size="xs"
                    weight="bold"
                    class="min-w-6 rounded-full bg-primary px-2 py-0.5 text-center text-primary-foreground"
                  >
                    {{ stage.bookings.length }}
                  </UiText>
                </div>
              </header>

              <div class="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
                <UiText v-if="isLoading" size="sm" tone="low">
                  Loading
                </UiText>
                <UiText v-else-if="!stage.bookings.length" size="sm" tone="low">
                  Empty
                </UiText>

                <div
                  v-for="dayGroup in stage.dayGroups"
                  :key="dayGroup.date || 'unscheduled'"
                  class="mb-3 last:mb-0"
                >
                  <div class="mb-1.5 flex items-center gap-1.5 px-1">
                    <UiText as="span" size="xs" weight="bold">
                      {{ dayGroup.label }}
                    </UiText>
                    <UiText
                      as="span"
                      size="xs"
                      weight="semibold"
                      class="rounded-full bg-surface-raised px-1.5 py-0.5 text-foreground"
                    >
                      {{ dayGroup.bookings.length }}
                    </UiText>
                  </div>

                  <div class="grid gap-2">
                    <div
                      v-for="booking in dayGroup.bookings"
                      :key="booking.id"
                      draggable="true"
                      class="group overflow-hidden rounded-md border bg-surface-raised shadow-[0_0.35rem_1rem_rgb(var(--shadow-color)/0.08)] transition hover:-translate-y-0.5 hover:border-foreground hover:shadow-[0_0.5rem_1.35rem_rgb(var(--shadow-color)/0.14)]"
                      :class="[
                        selectedBookingId === booking.id
                          ? 'border-foreground ring-2 ring-primary'
                          : 'border-border',
                        movingBookingId === booking.id ? 'opacity-60' : '',
                      ]"
                      @dragstart="handleDragStart($event, booking.id)"
                      @dragend="handleDragEnd"
                    >
                      <img
                        v-if="booking.photos[0]?.thumbnail?.url || booking.photos[0]?.url"
                        :src="booking.photos[0]?.thumbnail?.url || booking.photos[0]?.url"
                        :alt="booking.photos[0]?.name || 'Quote photo preview'"
                        class="aspect-[2.8/1] w-full object-cover"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        class="w-full cursor-grab p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring active:cursor-grabbing"
                        @click="toggleBooking(booking.id)"
                      >
                        <span class="mb-2 flex items-start justify-between gap-3">
                          <UiText as="span" size="sm" weight="bold" class="min-w-0 truncate">
                            {{ booking.name || booking.id }}
                          </UiText>
                          <UiText
                            as="span"
                            size="xs"
                            weight="bold"
                            class="shrink-0 rounded-full bg-surface-muted px-2 py-1 text-foreground"
                          >
                            {{ booking.estimatedTotalLabel }}
                          </UiText>
                        </span>
                        <span class="grid gap-1">
                          <UiText as="span" size="xs" tone="low" class="truncate">
                            {{ booking.load.name || "Load" }}
                          </UiText>
                          <UiText as="span" size="xs" tone="low" class="truncate">
                            {{ formatCollectionDate(booking.date) }} - {{ booking.time.label || "Any time" }}
                          </UiText>
                          <UiText as="span" size="xs" weight="semibold" class="truncate">
                            {{ booking.postcode || "No postcode" }}
                          </UiText>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="selectedBooking"
            class="fixed inset-0 z-40 bg-black/35"
            @click.self="closeDrawer"
          >
            <Transition
              appear
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-x-full"
              enter-to-class="translate-x-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-x-0"
              leave-to-class="translate-x-full"
            >
              <aside
                class="ms-auto flex h-full w-full max-w-full flex-col overflow-x-hidden border-l border-border bg-background text-foreground shadow-2xl sm:max-w-[32rem]"
              >
                <header class="flex shrink-0 items-start justify-between gap-4 border-b border-border bg-background p-5">
                  <div class="min-w-0">
                    <UiText size="xs" tone="low" weight="semibold">
                      {{ selectedBooking.id }}
                    </UiText>
                    <UiHeading :level="2" size="md" class="mt-1">
                      {{ selectedBooking.name || "Unnamed quote" }}
                    </UiHeading>
                    <UiText size="sm" tone="low" class="mt-2">
                      Received {{ formatDateTime(selectedBooking.createdAt) }}
                    </UiText>
                    <UiText
                      v-if="savingBookingId === selectedBooking.id"
                      size="xs"
                      tone="low"
                      class="mt-2"
                    >
                      Saving changes...
                    </UiText>
                  </div>
                  <UiButton
                    size="icon"
                    variant="secondary"
                    aria-label="Close quote details"
                    @click="closeDrawer"
                  >
                    <IconsClose />
                  </UiButton>
                </header>

                <form class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 sm:p-5" @submit.prevent>
                  <div class="grid min-w-0 gap-6">
                    <div class="min-w-0">
                      <UiHeading :level="3" size="xs">Contact</UiHeading>
                      <div class="mt-3 grid min-w-0 gap-3">
                        <label class="grid min-w-0 gap-1.5">
                          <UiText as="span" size="xs" weight="semibold">Name</UiText>
                          <UiInput
                            v-model="editor.name"
                            autocomplete="name"
                            @blur="autosaveSelectedBooking"
                          />
                        </label>
                        <div class="grid min-w-0 gap-1.5">
                          <UiText as="span" size="xs" weight="semibold">Email</UiText>
                          <div class="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2">
                            <UiInput
                              v-model="editor.email"
                              type="email"
                              autocomplete="email"
                              @blur="autosaveSelectedBooking"
                            />
                            <UiButton
                              :href="emailActionHref"
                              size="md"
                              variant="secondary"
                              :disabled="!emailActionHref"
                              aria-label="Send email"
                            >
                              Email
                            </UiButton>
                          </div>
                        </div>
                        <div class="grid min-w-0 gap-1.5">
                          <UiText as="span" size="xs" weight="semibold">Phone</UiText>
                          <div class="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2">
                            <UiInput
                              v-model="editor.phone"
                              type="tel"
                              autocomplete="tel"
                              @blur="autosaveSelectedBooking"
                            />
                            <UiButton
                              :href="phoneActionHref"
                              size="md"
                              variant="secondary"
                              :disabled="!phoneActionHref"
                              aria-label="Call customer"
                            >
                              Call
                            </UiButton>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="min-w-0">
                      <UiHeading :level="3" size="xs">Collection</UiHeading>
                      <div class="mt-3 grid min-w-0 gap-3">
                        <label class="grid min-w-0 gap-1.5">
                          <UiText as="span" size="xs" weight="semibold">Address line 1</UiText>
                          <UiInput
                            v-model="editor.addressLine1"
                            autocomplete="street-address"
                            @blur="autosaveSelectedBooking"
                          />
                        </label>
                        <label class="grid min-w-0 gap-1.5">
                          <UiText as="span" size="xs" weight="semibold">Postcode</UiText>
                          <UiInput
                            v-model="editor.postcode"
                            transform="uppercase"
                            @blur="autosaveSelectedBooking"
                          />
                        </label>
                        <label class="grid min-w-0 gap-1.5">
                          <UiText as="span" size="xs" weight="semibold">Collection date</UiText>
                          <input
                            v-model="editor.date"
                            type="date"
                            class="h-12 w-full rounded-lg border-2 border-foreground bg-secondary px-4 text-secondary-foreground placeholder:text-current/50 focus:outline-none focus:ring-2 focus:ring-primary disabled:pointer-events-none disabled:opacity-50"
                            @change="autosaveSelectedBooking"
                            @blur="autosaveSelectedBooking"
                          />
                        </label>
                        <div class="grid min-w-0 gap-3 sm:grid-cols-2">
                          <label class="grid min-w-0 gap-1.5">
                            <UiText as="span" size="xs" weight="semibold">Time label</UiText>
                            <UiInput
                              v-model="editor.time.label"
                              @blur="autosaveSelectedBooking"
                            />
                          </label>
                          <label class="grid min-w-0 gap-1.5">
                            <UiText as="span" size="xs" weight="semibold">Time detail</UiText>
                            <UiInput
                              v-model="editor.time.description"
                              @blur="autosaveSelectedBooking"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="min-w-0">
                      <UiHeading :level="3" size="xs">Quote</UiHeading>
                      <div class="mt-3 grid min-w-0 gap-3">
                        <div class="grid min-w-0 gap-3 sm:grid-cols-2">
                          <label class="grid min-w-0 gap-1.5">
                            <UiText as="span" size="xs" weight="semibold">Load</UiText>
                            <UiInput
                              v-model="editor.load.name"
                              @blur="autosaveSelectedBooking"
                            />
                          </label>
                          <label class="grid min-w-0 gap-1.5">
                            <UiText as="span" size="xs" weight="semibold">Load detail</UiText>
                            <UiInput
                              v-model="editor.load.ribbon"
                              @blur="autosaveSelectedBooking"
                            />
                          </label>
                        </div>
                        <div class="grid min-w-0 gap-3 sm:grid-cols-2">
                          <label class="grid min-w-0 gap-1.5">
                            <UiText as="span" size="xs" weight="semibold">Load price</UiText>
                            <UiInput
                              v-model="editor.load.price"
                              @blur="autosaveSelectedBooking"
                            />
                          </label>
                          <label class="grid min-w-0 gap-1.5">
                            <UiText as="span" size="xs" weight="semibold">Estimated total</UiText>
                            <UiInput
                              v-model="editor.estimatedTotalLabel"
                              @blur="autosaveSelectedBooking"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div v-if="selectedBooking.additionalItems.length">
                      <UiHeading :level="3" size="xs">Additional items</UiHeading>
                      <ul class="mt-3 grid gap-2">
                        <li
                          v-for="item in selectedBooking.additionalItems"
                          :key="item.id"
                          class="rounded-md bg-secondary px-3 py-2"
                        >
                          <UiText size="sm">
                            {{ item.quantity }} x {{ item.name }} {{ item.totalPriceLabel }}
                          </UiText>
                        </li>
                      </ul>
                    </div>

                    <div v-if="selectedBooking.photos.length">
                      <UiHeading :level="3" size="xs">Photos</UiHeading>
                      <div class="mt-3 grid min-w-0 grid-cols-2 gap-2">
                        <img
                          v-for="photo in selectedBooking.photos"
                          :key="photo.id"
                          :src="photo.thumbnail?.url || photo.url"
                          :alt="photo.name || 'Quote photo'"
                          class="aspect-[4/3] w-full rounded-md bg-secondary object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <footer class="shrink-0 border-t border-border bg-background px-4 py-4 sm:px-5">
                  <UiButton
                    variant="ghost"
                    size="md"
                    :disabled="deletingBookingId === selectedBooking.id"
                    @click="confirmDeleteSelectedBooking"
                  >
                    {{ deletingBookingId === selectedBooking.id ? "Deleting..." : "Delete quote" }}
                  </UiButton>
                </footer>
              </aside>
            </Transition>
          </div>
        </Transition>
      </div>
    </ClientOnly>
  </main>
</template>
