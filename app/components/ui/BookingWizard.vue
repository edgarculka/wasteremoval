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

export type {
  BookingLoad,
  BookingQuestion,
  BookingTextField,
  BookingTimeSlot,
} from "~/utils/booking-form";

export interface BookingFormData {
  load: BookingLoad;
  date: string;
  time: BookingTimeSlot;
  postcode: string;
  addressLine1: string;
  name: string;
  phone: string;
  email: string;
}

interface Props {
  open: boolean;
  loads: BookingLoad[];
  times: BookingTimeSlot[];
  mode?: "dialog" | "page";
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  questions?: BookingQuestion[];
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
});

const emit = defineEmits<{
  "update:open": [value: boolean];
  submit: [data: BookingFormData];
}>();

const stepIndex = ref(0);
const isSubmitting = ref(false);
const scrollContainer = ref<HTMLElement | null>(null);
const selectedLoadId = ref<string | null>(null);
const selectedDate = ref<string | null>(null);
const selectedTimeId = ref<string | null>(null);
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

const priceLabel = computed(() =>
  selectedLoad.value ? selectedLoad.value.price : props.defaultPriceLabel,
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

function isFieldValid(field: BookingTextField) {
  const value = fieldValues[field.id].trim();
  switch (field.validator) {
    case "postcode":
      return postcodePattern.test(value);
    case "name":
      return value.length >= 2;
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

const stepValid = computed(() => {
  switch (currentQuestion.value.type) {
    case "load":
      return Boolean(selectedLoad.value);
    case "date":
      return Boolean(selectedDate.value);
    case "time":
      return Boolean(selectedTime.value);
    case "fields":
      return currentQuestion.value.fields.every(isFieldValid);
    case "review":
      return true;
    default:
      return false;
  }
});

const isLastStep = computed(() => stepIndex.value === questions.value.length - 1);

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
  const initialLoadId = props.initialLoadId ?? null;
  const hasInitialLoad = props.loads.some((load) => load.id === initialLoadId);
  selectedLoadId.value = hasInitialLoad ? initialLoadId : null;
  // When a load is already chosen (e.g. picked from the pricing page), skip the
  // load-size step and open directly on the following step (collection date).
  const loadStepIndex = questions.value.findIndex((q) => q.type === "load");
  stepIndex.value =
    hasInitialLoad &&
    loadStepIndex !== -1 &&
    loadStepIndex + 1 < questions.value.length
      ? loadStepIndex + 1
      : 0;
  selectedDate.value = null;
  selectedTimeId.value = null;
  for (const key of Object.keys(fieldValues) as BookingTextField["id"][]) {
    fieldValues[key] = "";
  }
}

function goBack() {
  if (stepIndex.value > 0) stepIndex.value -= 1;
}

function goNext() {
  if (!stepValid.value || isSubmitting.value) return;
  if (isLastStep.value) {
    if (!selectedLoad.value || !selectedDate.value || !selectedTime.value)
      return;
    // Lock the form so the submit can't be fired twice while it's in flight.
    isSubmitting.value = true;
    emit("submit", {
      load: selectedLoad.value,
      date: selectedDate.value,
      time: selectedTime.value,
      postcode: fieldValues.postcode.trim().toUpperCase(),
      addressLine1: fieldValues.addressLine1.trim(),
      name: fieldValues.name.trim(),
      phone: fieldValues.phone.trim(),
      email: fieldValues.email.trim(),
    });
    return;
  }
  stepIndex.value += 1;
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
          <div v-if="mode === 'page'" class="mb-8 pr-16 sm:pr-20">
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
            class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <UiCard
              v-for="load in loads"
              :key="load.id"
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
              />
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
            :disabled="!stepValid || isSubmitting"
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
            :disabled="!stepValid || isSubmitting"
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
