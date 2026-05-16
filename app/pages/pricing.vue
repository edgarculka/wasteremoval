<script setup lang="ts">
import type { Component } from "vue";
import IconsMail from "~/components/icons/Mail.vue";
import IconsPhone from "~/components/icons/Phone.vue";
import IconsWhatsApp from "~/components/icons/WhatsApp.vue";
import type { FaqItem } from "~/components/ui/Faq.vue";
import type { ReviewItem } from "~/components/ui/Reviews.vue";
import type {
  SkipComparisonColumn,
  SkipComparisonFeature,
} from "~/components/ui/SkipComparison.vue";

interface ContactCardLink {
  title: string;
  description: string;
  href: string;
  icon: Component;
  iconLabel: string;
}

useSeoMeta({
  title: "Pricing",
  description:
    "Clear rubbish removal pricing with load-size tiers, customer reviews, skip hire comparison, and booking support.",
});

const reviews: ReviewItem[] = [
  {
    author: "Aisha Khan",
    meta: "House clearance",
    rating: 5,
    quote: "Booked in minutes, arrived on time, and left the place spotless.",
  },
  {
    author: "Tom Bradley",
    meta: "Sofa removal",
    rating: 5,
    quote:
      "Clear pricing, friendly crew, and no fuss getting a bulky sofa out.",
  },
  {
    author: "Maya Roberts",
    meta: "Garden waste",
    rating: 4.5,
    quote: "Fast collection and they swept up after loading everything.",
  },
  {
    author: "Daniel Green",
    meta: "Office clear-out",
    rating: 5,
    quote: "Professional from quote to pickup. Exactly what we needed.",
  },
  {
    author: "Nina Patel",
    meta: "Garage clearance",
    rating: 5,
    quote: "They handled years of clutter in one visit and kept me updated.",
  },
  {
    author: "George Wilson",
    meta: "Appliance removal",
    rating: 4.5,
    quote: "Simple, tidy, and much easier than hiring a skip.",
  },
];

const comparisonColumns: SkipComparisonColumn[] = [
  {
    id: "waste-removal",
    title: "Waste removal",
    label: "Recommended",
    featured: true,
  },
  {
    id: "skip-hire",
    title: "Skip hire",
  },
  {
    id: "council",
    title: "Council bulky waste",
  },
];

const comparisonFeatures: SkipComparisonFeature[] = [
  {
    label: "Published starting price",
    values: {
      "waste-removal": true,
      "skip-hire": "Varies",
      council: true,
    },
  },
  {
    label: "Team loads everything",
    values: {
      "waste-removal": true,
      "skip-hire": false,
      council: false,
    },
  },
  {
    label: "Same-day options",
    values: {
      "waste-removal": true,
      "skip-hire": "Often delayed",
      council: false,
    },
  },
  {
    label: "No permit or driveway needed",
    values: {
      "waste-removal": true,
      "skip-hire": false,
      council: true,
    },
  },
  {
    label: "Flexible load sizes",
    values: {
      "waste-removal": "Pay by volume",
      "skip-hire": "Fixed skip",
      council: "Item limits",
    },
  },
  {
    label: "Licensed disposal included",
    values: {
      "waste-removal": true,
      "skip-hire": true,
      council: true,
    },
  },
];

const faqItems: FaqItem[] = [
  {
    question: "How is the price worked out?",
    answer:
      "Pricing is based on load size. Labour, transport, and licensed disposal are included, so you can choose the closest tier before booking.",
  },
  {
    question: "What happens if my load is smaller or larger on the day?",
    answer:
      "The crew confirms the final load size before anything is removed. If it is different from your selection, they agree the correct tier with you first.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No hidden fees for standard household and business waste. Specialist items or restricted materials are flagged before collection if they need separate handling.",
  },
  {
    question: "Can I get a price before booking?",
    answer:
      "Yes. Send photos by WhatsApp or email and we can confirm the best tier before you choose a slot.",
  },
  {
    question: "Do I need to arrange a skip permit?",
    answer:
      "No. The team arrives, loads the waste, and takes it away in one visit, so there is no skip left on the road.",
  },
];

const contactCards: ContactCardLink[] = [
  {
    title: "020 1234 5678",
    description: "Call for help choosing a load size",
    href: "tel:+442012345678",
    icon: IconsPhone,
    iconLabel: "Phone",
  },
  {
    title: "Chat on WhatsApp",
    description: "Send photos for a fast estimate",
    href: "https://wa.me/442012345678",
    icon: IconsWhatsApp,
    iconLabel: "WhatsApp",
  },
  {
    title: "hello@bigvanmen.com",
    description: "Email photos or access notes",
    href: "mailto:hello@bigvanmen.com",
    icon: IconsMail,
    iconLabel: "Email",
  },
];

const { bookingLoads, openBookingWizard } = useBookingWizard();
const selectedPricingLoadId = ref<string | null>("small");

function openBookingWithPricingSelection() {
  openBookingWizard(selectedPricingLoadId.value);
}
</script>

<template>
  <UiSection tone="background" spacing="sm" alignment="center" wide>
    <UiPricing
      lead="From"
      accent="GBP 40"
      trailing="per clearance"
      subhead="Pick the load size closest to your job. The team confirms the final tier before loading."
      selectable
      :tiers="bookingLoads"
      :selected-tier-id="selectedPricingLoadId"
      @select="selectedPricingLoadId = $event"
    />

    <template #cta>
      <UiButton size="lg" @click="openBookingWithPricingSelection">
        Book selected load
      </UiButton>
      <UiButton variant="secondary" size="lg" href="#pricing-faq">
        Ask a pricing question
      </UiButton>
    </template>
  </UiSection>

  <UiSection
    tone="secondary"
    spacing="md"
    alignment="center"
    wide
    class="border-y-2"
  >
    <UiReviews
      :average="4.9"
      average-label="Average from 240+ customer reviews"
      :reviews="reviews"
    />
  </UiSection>

  <UiSection tone="background" spacing="md" wide>
    <UiSkipComparison
      lead="Compare"
      accent="collection"
      trailing="options"
      subhead="For most home and business clearances, a loaded collection is simpler than hiring a skip or waiting for a bulky waste slot."
      :columns="comparisonColumns"
      :features="comparisonFeatures"
    />
  </UiSection>

  <UiSection
    id="pricing-faq"
    tone="primary"
    spacing="md"
    alignment="left"
    title="Pricing questions"
    class="border-t-2"
  >
    <UiFaq :items="faqItems" />
    <template #visual>
      <div
        class="rounded-2xl border-2 border-foreground bg-secondary p-6 text-secondary-foreground shadow-[0.5rem_0.5rem_0_0_var(--foreground)]"
      >
        <UiHeading :level="3" size="md">Need a hand pricing it?</UiHeading>
        <UiText tone="low" class="mt-2">
          Share a few photos or call us. We will help pick the closest load size
          before you book.
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
    </template>
  </UiSection>
</template>
