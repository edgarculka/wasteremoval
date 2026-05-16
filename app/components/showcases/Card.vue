<script setup lang="ts">
import IconsMail from "~/components/icons/Mail.vue";
import IconsPhone from "~/components/icons/Phone.vue";
import IconsWhatsApp from "~/components/icons/WhatsApp.vue";
import IconsAfternoon from "~/components/icons/Afternoon.vue";
import IconsEvening from "~/components/icons/Evening.vue";
import IconsMorning from "~/components/icons/Morning.vue";

const selectedLoad = ref<string | null>("small");
const selectedTime = ref<string | null>(null);

const loads = [
  {
    id: "min",
    name: "Min Job",
    ribbon: "Single item",
    price: "£40",
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
    imageSrc: "/images/2van.svg",
    imageAlt: "Half-load van",
  },
];

const times = [
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

const contactCards = [
  {
    title: "020 1234 5678",
    description: "Mon-Fri, 7am-7pm",
    href: "tel:+442012345678",
    icon: IconsPhone,
    iconLabel: "Phone",
  },
  {
    title: "Chat on WhatsApp",
    description: "Fastest way to reach us",
    href: "https://wa.me/442012345678",
    icon: IconsWhatsApp,
    iconLabel: "WhatsApp",
  },
  {
    title: "hello@bigvanmen.com",
    description: "Replies within 1 hour",
    href: "mailto:hello@bigvanmen.com",
    icon: IconsMail,
    iconLabel: "Email",
  },
];
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Card</UiHeading>
      <UiText tone="low" class="mt-3">
        A shared card surface for static panels, clickable links, and
        radio-style selectable choices. Use <code>selectable</code> for choice
        cards, <code>href</code> for link cards, and <code>icon</code> when the
        card needs a leading symbol. Use <code>layout="option"</code> with
        <code>title</code>, <code>description</code>, <code>price</code>,
        <code>imageSrc</code>, and <code>tag</code> for compact load or pricing
        cards.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Static content</UiHeading>
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <UiCard
          title="Plain card"
          description="A neutral secondary surface for compact content."
        />
        <UiCard
          tone="primary"
          title="Primary card"
          description="Use this when the card itself is the callout."
        />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Selectable load picker</UiHeading>
      <div class="mt-4 grid gap-4 sm:grid-cols-3">
        <UiCard
          v-for="load in loads"
          :key="load.id"
          selectable
          layout="option"
          :selected="selectedLoad === load.id"
          :title="load.name"
          :description="load.ribbon"
          :price="load.price"
          :tag="load.id === 'min' ? 'Minimum price' : undefined"
          :image-src="load.imageSrc"
          :image-alt="load.imageAlt"
          @select="selectedLoad = load.id"
        />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Selectable time picker</UiHeading>
      <div class="mt-4 flex max-w-md flex-col gap-3">
        <UiCard
          v-for="time in times"
          :key="time.id"
          selectable
          :selected="selectedTime === time.id"
          :title="time.label"
          :description="time.description"
          :icon="time.icon"
          @select="selectedTime = time.id"
        />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Contact link cards</UiHeading>
      <div class="mt-4 max-w-md rounded-2xl border-2 border-foreground bg-primary p-6 text-primary-foreground shadow-[0.5rem_0.5rem_0_0_var(--foreground)]">
        <UiHeading :level="3" size="md">Still have questions?</UiHeading>
        <UiText tone="low" class="mt-2">
          Pick whichever channel suits you.
        </UiText>
        <div class="mt-5 flex flex-col gap-3">
          <UiCard
            v-for="card in contactCards"
            :key="card.href"
            v-bind="card"
            size="sm"
          />
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">States</UiHeading>
      <div class="mt-4 grid gap-4 sm:grid-cols-3">
        <UiCard title="Default" description="Unselected, hoverable." />
        <UiCard
          selectable
          selected
          title="Selected"
          description="Primary surface + tick."
        />
        <UiCard
          selectable
          disabled
          title="Disabled"
          description="Faded and not clickable."
        />
      </div>
    </section>
  </div>
</template>
