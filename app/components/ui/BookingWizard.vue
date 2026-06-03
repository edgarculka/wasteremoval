<script setup lang="ts">
import {
  computed,
  nextTick,
  onScopeDispose,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { bookingFormConfig } from "~/utils/booking-form";
import type {
  BookingLoad,
  BookingQuestion,
  BookingTextField,
  BookingTimeSlot,
} from "~/utils/booking-form";
import {
  buildSelectedAdditionalCharge,
  formatChargeUnit,
  formatPounds,
  quoteAdditionalChargeItems,
  type AdditionalChargeItem,
  type SelectedAdditionalCharge,
} from "~/utils/additional-charges";

export type {
  BookingLoad,
  BookingQuestion,
  BookingTextField,
  BookingTimeSlot,
} from "~/utils/booking-form";

export interface BookingSubmitControls {
  fail: () => void;
}

export interface BookingPhotoData {
  id: string;
  name: string;
  mimeType: "image/jpeg";
  width: number;
  height: number;
  size: number;
  dataUrl: string;
  thumbnail: {
    dataUrl: string;
    width: number;
    height: number;
    size: number;
  };
}

export interface BookingFormData {
  load: BookingLoad;
  date: string;
  time: BookingTimeSlot;
  postcode: string;
  addressLine1: string;
  name: string;
  phone: string;
  email: string;
  photos: BookingPhotoData[];
  additionalItems: SelectedAdditionalCharge[];
  estimatedTotalPence: number;
  estimatedTotalLabel: string;
}

interface Props {
  open: boolean;
  loads: BookingLoad[];
  times: BookingTimeSlot[];
  mode?: "dialog" | "page";
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  questions?: BookingQuestion[];
  additionalChargeItems?: AdditionalChargeItem[];
  brandName?: string;
  defaultPriceLabel?: string;
  initialLoadId?: string | null;
  minDaysAhead?: number;
  monthsToShow?: number;
  today?: Date;
}

const props = withDefaults(defineProps<Props>(), {
  brandName: "Booking",
  mode: "dialog",
  defaultPriceLabel: "From £40",
  minDaysAhead: 1,
  monthsToShow: 3,
  questions: () => bookingFormConfig.questions,
  additionalChargeItems: () => quoteAdditionalChargeItems,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
  submit: [data: BookingFormData, controls: BookingSubmitControls];
}>();

const stepIndex = ref(0);
const isSubmitting = ref(false);
const scrollContainer = ref<HTMLElement | null>(null);
const uploadInput = ref<HTMLInputElement | null>(null);
const selectedLoadId = ref<string | null>(null);
const selectedDate = ref<string | null>(null);
const selectedTimeId = ref<string | null>(null);
const photos = ref<BookingPhotoData[]>([]);
const additionalQuantities = reactive<Record<string, number>>({});
const attemptedQuestionIds = reactive<Record<string, boolean>>({});
const photoError = ref("");
const isProcessingPhotos = ref(false);
const fieldValues = reactive<Record<BookingTextField["id"], string>>({
  postcode: "",
  addressLine1: "",
  name: "",
  phone: "",
  email: "",
});

const selectedLoad = computed(
  () => props.loads.find((l) => l.id === selectedLoadId.value) ?? null,
);
const selectedTime = computed(
  () => props.times.find((t) => t.id === selectedTimeId.value) ?? null,
);

const selectedAdditionalItems = computed(() =>
  props.additionalChargeItems
    .map((item) =>
      buildSelectedAdditionalCharge(
        item,
        Math.max(0, additionalQuantities[item.id] ?? 0),
      ),
    )
    .filter((item) => item.quantity > 0),
);

const additionalTotalPence = computed(() =>
  selectedAdditionalItems.value.reduce(
    (total, item) => total + item.totalPricePence,
    0,
  ),
);

const estimatedTotalPence = computed(() =>
  selectedLoad.value ? selectedLoad.value.pricePence + additionalTotalPence.value : 0,
);

const priceLabel = computed(() =>
  selectedLoad.value
    ? formatPounds(estimatedTotalPence.value)
    : props.defaultPriceLabel,
);

const questions = computed(() =>
  props.questions.length ? props.questions : bookingFormConfig.questions,
);
const currentQuestion = computed(
  () => questions.value[stepIndex.value] ?? questions.value[0]!,
);

const phonePattern = /^[+\d][\d\s()-]{6,}$/;
const emailPattern = /^\S+@\S+\.\S+$/;
const postcodePattern = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const maxPhotoCount = computed(() =>
  currentQuestion.value.type === "photos" ? currentQuestion.value.maxPhotos : 4,
);
const remainingPhotoSlots = computed(() =>
  Math.max(maxPhotoCount.value - photos.value.length, 0),
);

function isFieldValid(field: BookingTextField) {
  const value = fieldValues[field.id].trim();
  switch (field.validator) {
    case "postcode":
      return postcodePattern.test(value);
    case "name":
      return value.split(/\s+/).filter(Boolean).length >= 2;
    case "phone":
      return phonePattern.test(value);
    case "email":
      return emailPattern.test(value);
    case "minLength3":
      return value.length >= 3;
    default:
      return false;
  }
}

function fieldErrorMessage(field: BookingTextField) {
  switch (field.validator) {
    case "postcode":
      return "Enter a valid UK postcode.";
    case "name":
      return "Enter your full name.";
    case "phone":
      return "Enter a valid phone number.";
    case "email":
      return "Enter a valid email address.";
    case "minLength3":
      return "Enter at least 3 characters.";
    default:
      return "Enter a valid value.";
  }
}

function shouldShowFieldError(field: BookingTextField) {
  const value = fieldValues[field.id].trim();
  return (
    !isFieldValid(field) &&
    (attemptedQuestionIds[currentQuestion.value.id] || value.length > 0)
  );
}

const stepValid = computed(() => {
  switch (currentQuestion.value.type) {
    case "load":
      return Boolean(selectedLoad.value);
    case "date":
      return Boolean(selectedDate.value);
    case "time":
      return Boolean(selectedTime.value);
    case "photos":
      return !isProcessingPhotos.value;
    case "additionalCharges":
      return true;
    case "fields":
      return currentQuestion.value.fields.every(isFieldValid);
    case "review":
      return true;
    default:
      return false;
  }
});

const isLastStep = computed(() => stepIndex.value === questions.value.length - 1);
const primaryDisabled = computed(
  () =>
    isSubmitting.value ||
    (!stepValid.value && currentQuestion.value.type !== "fields"),
);

const primaryLabel = computed(() =>
  isSubmitting.value ? "Submitting…" : isLastStep.value ? "Submit" : "Continue",
);

const selectedDateLabel = computed(() => {
  if (!selectedDate.value) return null;
  const [y, m, d] = selectedDate.value.split("-").map(Number);
  return new Date(y!, m! - 1, d!).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
});

function close() {
  emit("update:open", false);
}

function reset() {
  isSubmitting.value = false;
  applyInitialLoadSelection();
  selectedDate.value = null;
  selectedTimeId.value = props.times[0]?.id ?? null;
  for (const key of Object.keys(additionalQuantities)) {
    delete additionalQuantities[key];
  }
  for (const key of Object.keys(attemptedQuestionIds)) {
    delete attemptedQuestionIds[key];
  }
  for (const key of Object.keys(fieldValues) as BookingTextField["id"][]) {
    fieldValues[key] = "";
  }
  photos.value = [];
  photoError.value = "";
  if (uploadInput.value) uploadInput.value.value = "";
}

function applyInitialLoadSelection() {
  const initialLoadId = props.initialLoadId ?? null;
  const hasInitialLoad = props.loads.some((load) => load.id === initialLoadId);
  selectedLoadId.value = hasInitialLoad ? initialLoadId : null;
  // When a load is already chosen (e.g. picked from the pricing page), skip the
  // load-size step and open directly on the following step.
  const loadStepIndex = questions.value.findIndex((q) => q.type === "load");
  stepIndex.value =
    hasInitialLoad &&
    loadStepIndex !== -1 &&
    loadStepIndex + 1 < questions.value.length
      ? loadStepIndex + 1
      : 0;
}

function goBack() {
  if (stepIndex.value > 0) stepIndex.value -= 1;
}

function goNext() {
  attemptedQuestionIds[currentQuestion.value.id] = true;
  if (!stepValid.value || isSubmitting.value) return;
  if (isLastStep.value) {
    if (!selectedLoad.value || !selectedDate.value || !selectedTime.value)
      return;
    // Lock the form so the submit can't be fired twice while it's in flight.
    isSubmitting.value = true;
    emit(
      "submit",
      {
        load: selectedLoad.value,
        date: selectedDate.value,
        time: selectedTime.value,
        postcode: fieldValues.postcode.trim().toUpperCase(),
        addressLine1: fieldValues.addressLine1.trim(),
        name: fieldValues.name.trim(),
        phone: fieldValues.phone.trim(),
        email: fieldValues.email.trim(),
        photos: photos.value,
        additionalItems: selectedAdditionalItems.value,
        estimatedTotalPence: estimatedTotalPence.value,
        estimatedTotalLabel: priceLabel.value,
      },
      {
        fail: () => {
          isSubmitting.value = false;
        },
      },
    );
    return;
  }
  stepIndex.value += 1;
}

function triggerUploadPicker() {
  uploadInput.value?.click();
}

function getAdditionalQuantity(itemId: string) {
  return additionalQuantities[itemId] ?? 0;
}

function setAdditionalQuantity(itemId: string, quantity: number) {
  const nextQuantity = Math.max(0, Math.min(99, quantity));
  if (nextQuantity === 0) {
    delete additionalQuantities[itemId];
    return;
  }

  additionalQuantities[itemId] = nextQuantity;
}

function incrementAdditionalItem(itemId: string) {
  setAdditionalQuantity(itemId, getAdditionalQuantity(itemId) + 1);
}

function decrementAdditionalItem(itemId: string) {
  setAdditionalQuantity(itemId, getAdditionalQuantity(itemId) - 1);
}

function removePhoto(photoId: string) {
  photos.value = photos.value.filter((photo) => photo.id !== photoId);
  photoError.value = "";
}

function canvasToDataUrl(
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not process image."));
          return;
        }

        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("Could not read image."));
        reader.readAsDataURL(blob);
      },
      "image/jpeg",
      quality,
    );
  });
}

function getDataUrlSize(dataUrl: string) {
  const encoded = dataUrl.split(",")[1] ?? "";
  return Math.floor((encoded.length * 3) / 4);
}

async function resizeImage(
  file: File,
  maxEdge: number,
  maxBytes: number,
  initialQuality: number,
) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.decoding = "async";
    const loaded = new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Could not load image."));
    });
    image.src = objectUrl;
    await loaded;

    const scale = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not process image.");
    context.drawImage(image, 0, 0, width, height);

    let quality = initialQuality;
    let dataUrl = await canvasToDataUrl(canvas, quality);
    while (getDataUrlSize(dataUrl) > maxBytes && quality > 0.48) {
      quality -= 0.08;
      dataUrl = await canvasToDataUrl(canvas, quality);
    }

    return {
      dataUrl,
      width,
      height,
      size: getDataUrlSize(dataUrl),
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function processPhotoFile(file: File): Promise<BookingPhotoData> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file.");
  }

  const full = await resizeImage(file, 1280, 520_000, 0.74);
  const thumbnail = await resizeImage(file, 360, 90_000, 0.68);

  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: file.name || "collection-photo.jpg",
    mimeType: "image/jpeg",
    width: full.width,
    height: full.height,
    size: full.size,
    dataUrl: full.dataUrl,
    thumbnail,
  };
}

async function handlePhotoSelection(event: Event) {
  const input = event.target as HTMLInputElement;
  const selectedFiles = Array.from(input.files ?? []);
  input.value = "";
  if (!selectedFiles.length) return;

  photoError.value = "";
  const files = selectedFiles.slice(0, remainingPhotoSlots.value);
  if (selectedFiles.length > remainingPhotoSlots.value) {
    photoError.value = `Only ${maxPhotoCount.value} photos can be added.`;
  }

  isProcessingPhotos.value = true;
  try {
    const processed = [];
    for (const file of files) {
      processed.push(await processPhotoFile(file));
    }
    photos.value = [...photos.value, ...processed].slice(0, maxPhotoCount.value);
  } catch (error) {
    photoError.value =
      error instanceof Error
        ? error.message
        : "Could not process one of the selected photos.";
  } finally {
    isProcessingPhotos.value = false;
  }
}

function scrollToStepTop() {
  if (typeof window === "undefined") return;

  // "instant" overrides the global `scroll-behavior: smooth`, which would
  // otherwise turn each step jump into an interruptible animated scroll that
  // often never reaches the top.
  scrollContainer.value?.scrollTo({ top: 0, behavior: "instant" });
  window.scrollTo({ top: 0, behavior: "instant" });
}

function focusFirstField() {
  if (typeof document === "undefined") return;
  if (currentQuestion.value.type !== "fields") return;

  const input = scrollContainer.value?.querySelector<HTMLElement>(
    "input, textarea, select",
  );
  // preventScroll keeps the step pinned to the top we just scrolled to.
  input?.focus({ preventScroll: true });
}

async function settleStep() {
  await nextTick();
  scrollToStepTop();
  focusFirstField();
}

watch(
  () => questions.value.length,
  (length) => {
    if (stepIndex.value >= length) stepIndex.value = Math.max(length - 1, 0);
  },
);

watch(
  () => props.open,
  (open, prev) => {
    if (typeof document === "undefined") return;
    if (open && props.mode === "dialog") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    if (open && !prev) {
      reset();
      void settleStep();
    }
  },
  { immediate: true },
);

watch(
  () => props.initialLoadId,
  (loadId, previousLoadId) => {
    if (!props.open || loadId === previousLoadId) return;
    const hasProgress =
      Boolean(selectedDate.value) ||
      Boolean(selectedTimeId.value) ||
      photos.value.length > 0 ||
      selectedAdditionalItems.value.length > 0 ||
      Object.values(fieldValues).some(Boolean);

    if (!hasProgress) {
      applyInitialLoadSelection();
      void settleStep();
    }
  },
);

watch(stepIndex, () => {
  void settleStep();
});

watchEffect((onCleanup) => {
  if (typeof window === "undefined") return;
  if (!props.open) return;
  const handler = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };
  window.addEventListener("keydown", handler);
  onCleanup(() => window.removeEventListener("keydown", handler));
});

onScopeDispose(() => {
  if (typeof document !== "undefined") document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body" :disabled="mode === 'page'">
    <div
      v-if="open"
      class="flex flex-col bg-background text-foreground"
      :class="mode === 'dialog' ? 'fixed inset-0 z-50' : 'min-h-screen'"
      :role="mode === 'dialog' ? 'dialog' : undefined"
      :aria-modal="mode === 'dialog' ? true : undefined"
      :aria-label="`${brandName} booking`"
    >
      <header
        v-if="mode === 'dialog'"
        class="border-foreground bg-secondary text-secondary-foreground border-b-2"
      >
        <div
          class="mx-auto flex flex-col w-full max-w-4xl items-center justify-between gap-4 px-6 pt-4 sm:px-10 lg:px-16"
        >
          <div class="flex gap-4 justify-between w-full items-center">
            <UiText as="span" size="sm" tone="low">
              Step {{ stepIndex + 1 }} of {{ questions.length }}
            </UiText>
            <UiButton
              size="icon"
              variant="secondary"
              aria-label="Close booking"
              @click="close"
            >
              <IconsClose />
            </UiButton>
          </div>
          <div
            class="h-1.5 w-full mb-1"
            role="progressbar"
            :aria-valuenow="stepIndex + 1"
            :aria-valuemin="1"
            :aria-valuemax="questions.length"
          >
            <div
              class="h-full bg-foreground transition-[width] duration-300 rounded"
              :style="{ width: `${((stepIndex + 1) / questions.length) * 100}%` }"
            />
          </div>
        </div>
      </header>

      <div
        v-else
        class="fixed right-4 top-4 z-20 sm:right-6 sm:top-6"
      >
        <UiButton
          size="icon"
          variant="secondary"
          aria-label="Close booking"
          @click="close"
        >
          <IconsClose />
        </UiButton>
      </div>

      <div ref="scrollContainer" class="flex-1 overflow-y-auto">
        <div
          class="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-16"
          :class="mode === 'page' ? 'pt-20 pb-36 sm:pt-24' : ''"
        >
          <div v-if="mode === 'page'" class="mb-8">
            <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
              <div class="flex flex-col text-start">
                <UiText as="span" size="xs" tone="low">Estimated total</UiText>
                <UiText as="span" weight="bold" size="lg">
                  {{ priceLabel }}
                </UiText>
              </div>
              <UiText as="span" size="sm" tone="low">
                Step {{ stepIndex + 1 }} of {{ questions.length }}
              </UiText>
            </div>
            <div
              class="mt-4 h-1.5 w-full rounded bg-border"
              role="progressbar"
              :aria-valuenow="stepIndex + 1"
              :aria-valuemin="1"
              :aria-valuemax="questions.length"
            >
              <div
                class="h-full rounded bg-foreground transition-[width] duration-300"
                :style="{ width: `${((stepIndex + 1) / questions.length) * 100}%` }"
              />
            </div>
          </div>
          <UiHeading :level="headingLevel ?? 2" size="lg">
            {{ currentQuestion.title }}
          </UiHeading>
          <UiText tone="low" class="mt-3">
            {{ currentQuestion.description }}
          </UiText>

          <div
            v-if="currentQuestion.type === 'load'"
            class="mt-8 flex snap-x gap-4 overflow-x-auto overscroll-x-contain pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
          >
            <UiCard
              v-for="load in loads"
              :key="load.id"
              class="w-72 shrink-0 snap-start sm:w-auto sm:shrink"
              selectable
              layout="option"
              :selected="selectedLoadId === load.id"
              :title="load.name"
              :description="load.ribbon"
              :price="load.price"
              :tag="load.tag"
              :image-src="load.imageSrc"
              :image-alt="load.imageAlt"
              :image-width="load.imageWidth"
              :image-height="load.imageHeight"
              @select="selectedLoadId = load.id"
            />
          </div>

          <div v-else-if="currentQuestion.type === 'additionalCharges'" class="mt-8">
            <div class="flex items-end justify-between gap-4">
              <div>
                <UiText size="sm" weight="semibold">
                  Specialist items added:
                  {{ selectedAdditionalItems.length }}
                </UiText>
                <UiText size="sm" tone="low">
                  Extra total: {{ formatPounds(additionalTotalPence) }}
                </UiText>
              </div>
            </div>

            <div class="mt-4 max-h-[30rem] overflow-y-auto pr-1">
              <div
                v-for="item in additionalChargeItems"
                :key="item.id"
                class="grid grid-cols-[4.75rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-border py-3 last:border-b-0 sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:gap-4 sm:py-4"
              >
                <img
                  :src="item.image.src"
                  :srcset="item.image.srcset"
                  :sizes="item.image.sizes"
                  :alt="item.image.alt"
                  :width="item.image.width"
                  :height="item.image.height"
                  loading="lazy"
                  decoding="async"
                  data-no-lightbox
                  class="aspect-square w-full rounded-lg border border-border object-cover"
                />
                <div class="min-w-0">
                  <UiText as="p" size="sm" weight="bold" class="truncate">
                    {{ item.shortName }}
                  </UiText>
                  <UiText as="p" size="xs" tone="low" class="mt-1">
                    {{ item.category }}
                  </UiText>
                  <UiText as="p" size="sm" weight="semibold" class="mt-1">
                    {{ formatPounds(item.pricePence) }} per {{ formatChargeUnit(item.unit) }}
                  </UiText>
                </div>
                <div class="grid grid-cols-[2.5rem_2.5rem_2.5rem] items-center">
                  <button
                    type="button"
                    class="grid size-10 place-items-center rounded-full border border-border bg-background text-lg font-bold transition hover:border-foreground disabled:pointer-events-none disabled:opacity-40"
                    :disabled="getAdditionalQuantity(item.id) === 0"
                    :aria-label="`Remove one ${item.name}`"
                    @click="decrementAdditionalItem(item.id)"
                  >
                    -
                  </button>
                  <UiText
                    as="span"
                    size="md"
                    weight="bold"
                    class="text-center tabular-nums"
                  >
                    {{ getAdditionalQuantity(item.id) }}
                  </UiText>
                  <button
                    type="button"
                    class="grid size-10 place-items-center rounded-full border border-foreground bg-primary text-lg font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/80"
                    :aria-label="`Add one ${item.name}`"
                    @click="incrementAdditionalItem(item.id)"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <UiText size="sm" tone="low" class="mt-4">
              The crew still confirms the final load size and item count before
              removal. Leave this step blank if none of these items are included.
            </UiText>
          </div>

          <div v-else-if="currentQuestion.type === 'date'" class="mt-8">
            <UiCalendar
              v-model="selectedDate"
              :min-days-ahead="minDaysAhead"
              :months-to-show="monthsToShow"
              :today="today"
            />
            <UiText v-if="selectedDateLabel" tone="low" class="mt-4 italic">
              {{ currentQuestion.selectedLabelPrefix ?? "Booked for" }}
              {{ selectedDateLabel }}.
            </UiText>
          </div>

          <div
            v-else-if="currentQuestion.type === 'time'"
            class="mt-8"
          >
            <UiTimePicker v-model="selectedTimeId" :options="times" />
          </div>

          <div v-else-if="currentQuestion.type === 'photos'" class="mt-6">
            <input
              ref="uploadInput"
              class="sr-only"
              type="file"
              accept="image/*"
              multiple
              :disabled="remainingPhotoSlots === 0 || isProcessingPhotos"
              @change="handlePhotoSelection"
            />

            <div class="flex flex-col items-center text-center">
              <div class="grid size-32 place-items-center rounded-full border-2 border-border bg-secondary text-5xl text-foreground">
                <IconsCamera />
              </div>

              <UiButton
                class="mt-5"
                variant="secondary"
                :disabled="remainingPhotoSlots === 0 || isProcessingPhotos"
                @click="triggerUploadPicker"
              >
                Upload photos
              </UiButton>

              <UiText size="sm" tone="low" class="mx-auto mt-3 max-w-md">
                Optional - add up to {{ maxPhotoCount }} photos.
                <template v-if="isProcessingPhotos"> Optimising photos...</template>
              </UiText>
              <UiText as="span" size="xs" weight="semibold" tone="low" class="mt-2">
                {{ photos.length }}/{{ maxPhotoCount }} added
              </UiText>

              <UiText
                v-if="photoError"
                size="sm"
                weight="semibold"
                class="mt-4 text-red-700"
                role="alert"
              >
                {{ photoError }}
              </UiText>

              <div
                v-if="photos.length"
                class="mt-6 grid w-full grid-cols-2 gap-3 sm:grid-cols-4"
              >
                <figure
                  v-for="photo in photos"
                  :key="photo.id"
                  class="group relative overflow-hidden rounded-xl border-2 border-foreground bg-secondary text-left"
                >
                  <img
                    :src="photo.thumbnail.dataUrl"
                    :alt="`Selected quote photo: ${photo.name}`"
                    :width="photo.thumbnail.width"
                    :height="photo.thumbnail.height"
                    class="aspect-[4/3] w-full object-cover"
                  />
                  <button
                    type="button"
                    class="absolute right-2 top-2 grid size-8 place-items-center rounded-full border border-foreground bg-background text-sm font-bold shadow disabled:pointer-events-none disabled:opacity-50"
                    :disabled="isProcessingPhotos"
                    :aria-label="`Remove ${photo.name}`"
                    @click="removePhoto(photo.id)"
                  >
                    x
                  </button>
                  <figcaption class="p-2">
                    <UiText size="xs" weight="semibold" class="truncate">
                      {{ photo.name }}
                    </UiText>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>

          <form
            v-else-if="currentQuestion.type === 'fields'"
            class="mt-8 flex flex-col gap-5"
            @submit.prevent="goNext"
          >
            <label
              v-for="field in currentQuestion.fields"
              :key="field.id"
              class="flex flex-col gap-2"
            >
              <UiText as="span" size="sm" weight="semibold">
                {{ field.label }}
              </UiText>
              <UiInput
                v-model="fieldValues[field.id]"
                :type="field.type"
                :autocomplete="field.autocomplete"
                :required="field.required"
                :placeholder="field.placeholder"
                :transform="field.transform"
                :aria-invalid="shouldShowFieldError(field) ? true : undefined"
                :aria-describedby="
                  shouldShowFieldError(field) ? `${field.id}-error` : undefined
                "
              />
              <UiText
                v-if="shouldShowFieldError(field)"
                :id="`${field.id}-error`"
                size="sm"
                weight="semibold"
                class="text-red-700"
                role="alert"
              >
                {{ fieldErrorMessage(field) }}
              </UiText>
            </label>
            <button
              type="submit"
              class="sr-only"
              aria-hidden="true"
              tabindex="-1"
            >
              Continue
            </button>
          </form>

          <dl
            v-else-if="currentQuestion.type === 'review'"
            class="mt-8 divide-y-2 divide-foreground rounded-2xl border-2 border-foreground bg-secondary text-secondary-foreground"
          >
            <div class="flex items-center justify-between gap-6 p-5">
              <UiText as="dt" size="sm" tone="low" weight="semibold">
                Load size
              </UiText>
              <UiText as="dd" size="md" weight="semibold" class="text-right">
                {{ selectedLoad?.name }} — {{ selectedLoad?.price }}
              </UiText>
            </div>
            <div class="flex flex-col gap-4 p-5 sm:flex-row sm:justify-between sm:gap-6">
              <UiText as="dt" size="sm" tone="low" weight="semibold">
                Additional items
              </UiText>
              <dd class="sm:max-w-lg sm:text-right">
                <UiText size="md" weight="semibold">
                  {{
                    selectedAdditionalItems.length
                      ? `${selectedAdditionalItems.length} item types selected`
                      : "None selected"
                  }}
                </UiText>
                <ul v-if="selectedAdditionalItems.length" class="mt-3 grid gap-2">
                  <li
                    v-for="item in selectedAdditionalItems"
                    :key="item.id"
                    class="flex justify-between gap-4 rounded-lg border border-border bg-background px-3 py-2 text-left"
                  >
                    <UiText size="sm">
                      {{ item.quantity }} x {{ item.name }}
                    </UiText>
                    <UiText size="sm" weight="bold">
                      {{ item.totalPriceLabel }}
                    </UiText>
                  </li>
                </ul>
              </dd>
            </div>
            <div class="flex items-center justify-between gap-6 bg-background p-5">
              <UiText as="dt" size="sm" tone="low" weight="semibold">
                Estimated total
              </UiText>
              <UiText as="dd" size="lg" weight="bold" class="text-right">
                {{ priceLabel }}
              </UiText>
            </div>
            <div class="flex items-center justify-between gap-6 p-5">
              <UiText as="dt" size="sm" tone="low" weight="semibold">
                Date
              </UiText>
              <UiText as="dd" size="md" weight="semibold" class="text-right">
                {{ selectedDateLabel }}
              </UiText>
            </div>
            <div class="flex items-center justify-between gap-6 p-5">
              <UiText as="dt" size="sm" tone="low" weight="semibold">
                Time
              </UiText>
              <UiText as="dd" size="md" weight="semibold" class="text-right">
                {{ selectedTime?.label
                }}<template v-if="selectedTime?.description">
                  ({{ selectedTime.description }})</template
                >
              </UiText>
            </div>
            <div class="flex items-start justify-between gap-6 p-5">
              <UiText as="dt" size="sm" tone="low" weight="semibold">
                Address
              </UiText>
              <UiText as="dd" size="md" weight="semibold" class="text-right">
                {{ fieldValues.addressLine1.trim() }}<br />
                {{ fieldValues.postcode.trim().toUpperCase() }}
              </UiText>
            </div>
            <div class="flex items-start justify-between gap-6 p-5">
              <UiText as="dt" size="sm" tone="low" weight="semibold">
                Contact
              </UiText>
              <UiText as="dd" size="md" weight="semibold" class="text-right">
                {{ fieldValues.name.trim() }}<br />
                {{ fieldValues.phone.trim() }}<br />
                {{ fieldValues.email.trim() }}
              </UiText>
            </div>
            <div class="flex flex-col gap-4 p-5 sm:flex-row sm:justify-between sm:gap-6">
              <UiText as="dt" size="sm" tone="low" weight="semibold">
                Photos
              </UiText>
              <dd class="sm:max-w-lg sm:text-right">
                <UiText size="md" weight="semibold">
                  {{ photos.length ? `${photos.length} added` : "None added" }}
                </UiText>

                <div
                  v-if="photos.length"
                  class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4"
                >
                  <figure
                    v-for="photo in photos"
                    :key="photo.id"
                    class="overflow-hidden rounded-xl border-2 border-foreground bg-background text-left"
                  >
                    <img
                      :src="photo.thumbnail.dataUrl"
                      :alt="`Review photo: ${photo.name}`"
                      :width="photo.thumbnail.width"
                      :height="photo.thumbnail.height"
                      class="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption class="p-2">
                      <UiText size="xs" weight="semibold" class="truncate">
                        {{ photo.name }}
                      </UiText>
                    </figcaption>
                  </figure>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <footer
        class="border-foreground bg-secondary text-secondary-foreground"
        :class="
          mode === 'page'
            ? 'fixed inset-x-0 bottom-0 z-20 border-t-2'
            : 'border-y-2'
        "
      >
        <div
          v-if="mode === 'page'"
          class="mx-auto flex w-full max-w-4xl items-center gap-3 px-6 py-4 sm:px-10 lg:px-16"
        >
          <UiButton
            variant="secondary"
            size="md"
            :disabled="stepIndex === 0 || isSubmitting"
            @click="goBack"
          >
            Back
          </UiButton>
          <UiButton
            variant="primary"
            size="md"
            class="flex-1"
            :disabled="primaryDisabled"
            @click="goNext"
          >
            <template v-if="isSubmitting" #iconLeft>
              <IconsSpinner />
            </template>
            {{ primaryLabel }}
          </UiButton>
        </div>
        <div
          v-else
          class="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-16"
        >
          <UiButton
            variant="secondary"
            size="md"
            :disabled="stepIndex === 0 || isSubmitting"
            @click="goBack"
          >
            Back
          </UiButton>
          <div class="flex flex-col text-start">
            <UiText as="span" size="xs" tone="low">Estimated total</UiText>
            <UiText as="span" weight="bold" size="lg">
              {{ priceLabel }}
            </UiText>
          </div>
          <UiButton
            variant="primary"
            size="md"
            :disabled="primaryDisabled"
            @click="goNext"
          >
            <template v-if="isSubmitting" #iconLeft>
              <IconsSpinner />
            </template>
            {{ primaryLabel }}
          </UiButton>
        </div>
      </footer>
    </div>
  </Teleport>
</template>
