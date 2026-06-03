<script setup lang="ts">
import type { Component } from "vue";
import IconsMail from "~/components/icons/Mail.vue";
import IconsPhone from "~/components/icons/Phone.vue";
import IconsWhatsApp from "~/components/icons/WhatsApp.vue";
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
    title: "DBS Waste collection",
    label: "This website",
    featured: true,
  },
  {
    id: "skip-hire",
    title: "Skip hire",
    label: "Alternative",
  },
  {
    id: "council",
    title: "Council bulky waste",
    label: "Alternative",
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
  structuredData: buildFaqStructuredData(pricingFaqs, "/pricing/#faq"),
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
      <UiButton variant="ghost" size="lg" href="/additional-charges/">
        Extra item charges
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
      subhead="DBS Waste is the loaded collection option on this site. Skip hire and council bulky waste are shown as alternatives so you can compare the trade-offs quickly."
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
    <UiFaq :items="pricingFaqs" />
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
        <UiButton
          href="/additional-charges/"
          variant="ghost"
          size="sm"
          class="mt-3"
        >
          View extra charges
        </UiButton>
      </div>
    </template>
  </UiSection>
</template>
