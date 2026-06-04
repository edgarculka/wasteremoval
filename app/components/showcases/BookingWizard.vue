<script setup lang="ts">
import type {
  BookingFormData,
  BookingLoad,
  BookingTimeSlot,
} from "~/components/ui/BookingWizard.vue";
import IconsAfternoon from "~/components/icons/Afternoon.vue";
import IconsEvening from "~/components/icons/Evening.vue";
import IconsMorning from "~/components/icons/Morning.vue";
import { bookingFormConfig } from "~/utils/booking-form";

const loads: BookingLoad[] = [
  {
    id: "min",
    name: "Min Job",
    ribbon: "Single item",
    weightLimit: "Up to 50kg",
    price: "£40",
    pricePence: 4000,
    tag: "Minimum price",
    imageSrc: "/images/0van.svg",
    imageAlt: "Single item",
  },
  {
    id: "mini",
    name: "Mini Load",
    ribbon: "1/4 van",
    weightLimit: "Up to 250kg",
    price: "£100",
    pricePence: 10000,
    imageSrc: "/images/1van.svg",
    imageAlt: "Quarter-load van",
  },
  {
    id: "small",
    name: "Small Load",
    ribbon: "1/2 van",
    weightLimit: "Up to 500kg",
    price: "£180",
    pricePence: 18000,
    tag: "Most popular",
    imageSrc: "/images/2van.svg",
    imageAlt: "Half-load van",
  },
  {
    id: "large",
    name: "Large Load",
    ribbon: "3/4 van",
    weightLimit: "Up to 750kg",
    price: "£240",
    pricePence: 24000,
    imageSrc: "/images/3van.svg",
    imageAlt: "Three-quarter-load van",
  },
  {
    id: "full",
    name: "Full Load",
    ribbon: "Full van",
    weightLimit: "Up to 1,000kg",
    price: "£300",
    pricePence: 30000,
    imageSrc: "/images/4van.svg",
    imageAlt: "Full-load van",
  },
];

const times: BookingTimeSlot[] = [
  {
    id: "morning",
    label: "Morning",
    description: "8am – 12pm",
    icon: IconsMorning,
  },
  {
    id: "afternoon",
    label: "Afternoon",
    description: "12pm – 4pm",
    icon: IconsAfternoon,
  },
  {
    id: "evening",
    label: "Evening",
    description: "4pm – 8pm",
    icon: IconsEvening,
  },
];

const open = ref(false);

function onSubmit(data: BookingFormData) {
  // eslint-disable-next-line no-console
  console.log("Booking submitted", data);
  open.value = false;
  navigateTo("/");
}
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Booking wizard</UiHeading>
      <UiText tone="low" class="mt-3">
        Full-page takeover form. Eight steps — load size, specialist items,
        date, time, photos, address, contact, review — with a persistent step
        counter and price summary.
        Step order and field definitions come from
        <code>bookingFormConfig.questions</code>. Use
        <code>v-model:open</code> to control visibility, listen to
        <code>@submit</code> for the form payload.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Live demo</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Opens via <code>Teleport</code> into <code>document.body</code> at
        <code>z-50</code>, locks body scroll, and listens for
        <code>Escape</code>. On submit it logs the payload to the console and
        redirects to <code>/</code> — the production wiring. Use the close
        button (×) to dismiss without submitting.
      </UiText>
      <div class="mt-4">
        <UiButton @click="open = true">Open booking wizard</UiButton>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Props</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        <code>loads: BookingLoad[]</code> — tier options for step 1, including
        optional image and tag fields.
        <code>questions: BookingQuestion[]</code> controls the ordered form
        steps and defaults to <code>bookingFormConfig.questions</code>.
        <code>times: BookingTimeSlot[]</code> — slots for step 3.
        <code>brandName?: string</code> — top-bar label.
        <code>defaultPriceLabel?: string</code> — shown in the footer until a
        load is picked. <code>minDaysAhead?: number</code> (default
        <code>1</code>) — earliest selectable day relative to today.
        <code>monthsToShow?: number</code> (default <code>3</code>) — how far
        forward the calendar can scroll.
      </UiText>
    </section>

    <UiBookingWizard
      v-model:open="open"
      brand-name="Waste Removal"
      :questions="bookingFormConfig.questions"
      :loads="loads"
      :times="times"
      @submit="onSubmit"
    />
  </div>
</template>
