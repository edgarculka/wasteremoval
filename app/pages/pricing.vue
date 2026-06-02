<script setup lang="ts">
import type { Component } from "vue";
import IconsMail from "~/components/icons/Mail.vue";
import IconsPhone from "~/components/icons/Phone.vue";
import IconsWhatsApp from "~/components/icons/WhatsApp.vue";
import type { FaqItem } from "~/components/ui/Faq.vue";
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
    label: "Disposal handling included",
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
      "Pricing is based on load size. Labour, transport, and standard disposal handling are included, so you can choose the closest tier before booking.",
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

usePageSeo({
  title: "Rubbish Removal Pricing",
  description:
    "Clear rubbish removal pricing with load-size tiers, skip hire comparison, photo estimates and booking support.",
  path: "/pricing/",
  image: {
    src: "/images/truck.webp",
    alt: "Rubbish removal truck used for priced load-size collections",
    width: 1200,
    height: 900,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
});

const contactCards: ContactCardLink[] = [
  {
    title: companyDetails.contact.primaryPhoneDisplay,
    description: "Call for help choosing a load size",
    href: companyDetails.contact.primaryPhoneHref,
    icon: IconsPhone,
    iconLabel: "Phone",
  },
  {
    title: "Chat on WhatsApp",
    description: "Send photos for a fast estimate",
    href: companyDetails.contact.whatsappHref,
    icon: IconsWhatsApp,
    iconLabel: "WhatsApp",
  },
  {
    title: companyDetails.contact.email,
    description: "Email photos or access notes",
    href: companyDetails.contact.emailHref,
    icon: IconsMail,
    iconLabel: "Email",
  },
];

const { bookingLoads, openBookingWizard } = useBookingWizard();
const selectedPricingLoadId = ref<string | null>("small");

const trustItems = [
  { value: "No hidden fees", label: "Standard waste" },
  { value: "Photos accepted", label: "Fast estimates" },
  { value: "Loaded for you", label: "No skip hire" },
];

function openBookingWithPricingSelection() {
  openBookingWizard(selectedPricingLoadId.value);
}
</script>

<template>
  <UiSection tone="background" spacing="sm" alignment="center" wide>
    <UiPricing
      :heading-level="1"
      lead="From"
      accent="GBP 40"
      trailing="per clearance"
      subhead="Pick the load size closest to your job. The team confirms the final tier before loading."
      selectable
      :tiers="bookingLoads"
      :selected-tier-id="selectedPricingLoadId"
      @select="selectedPricingLoadId = $event"
    />
    <UiTrustStrip :items="trustItems" class="mt-8" />

    <template #cta>
      <UiButton size="lg" @click="openBookingWithPricingSelection">
        Book selected load
      </UiButton>
      <UiButton variant="secondary" size="lg" href="#pricing-faq">
        Ask a pricing question
      </UiButton>
      <UiButton variant="ghost" size="lg" href="/recycling-and-disposal/">
        Disposal process
      </UiButton>
    </template>
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
  >
    <UiFaq :items="faqItems" />
    <template #visual>
      <div
        class="rounded-lg border border-border bg-secondary p-6 text-secondary-foreground shadow-[0_1rem_3rem_rgba(6,53,31,0.12)]"
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
        <UiButton
          href="/recycling-and-disposal/"
          variant="secondary"
          size="sm"
          class="mt-5"
        >
          Read disposal guidance
        </UiButton>
      </div>
    </template>
  </UiSection>
</template>
