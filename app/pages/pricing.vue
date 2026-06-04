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
    title: `${companyDetails.tradingName} collection`,
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
    label: "Short-notice options",
    values: {
      "waste-removal": "Where possible",
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
const visibleAdditionalChargeItems = featuredAdditionalChargeItems;

const trustItems = [
  { value: "No hidden fees", label: "Standard waste" },
  { value: "Weight limits", label: "Shown by load" },
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
      subhead="Pick the load size closest to your job. Heavy waste is capped by weight as well as volume, and specialist items can be added before booking."
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
        Pricing questions
      </UiButton>
      <UiButton variant="ghost" size="lg" href="#extra-item-prices">
        Common extra prices
      </UiButton>
      <UiButton variant="ghost" size="lg" href="/additional-charges/">
        Extra item charges
      </UiButton>
      <UiButton variant="ghost" size="lg" href="/recycling-and-disposal/">
        Disposal process
      </UiButton>
    </template>
  </UiSection>

  <UiSection
    id="extra-item-prices"
    tone="secondary"
    spacing="md"
    alignment="left"
    wide
    title="Common extra item charges"
  >
    <UiText size="lg" tone="low" class="max-w-3xl">
      These specialist items are added separately to the selected load size when
      they apply. They are also selectable in the quote form before booking.
    </UiText>

    <div class="mt-7 grid gap-4 md:grid-cols-3">
      <UiCard
        v-for="item in visibleAdditionalChargeItems"
        :key="item.id"
        size="sm"
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
          class="aspect-[4/3] w-full rounded-lg object-cover"
        />
        <div class="mt-4 flex items-start justify-between gap-4">
          <span class="min-w-0">
            <UiHeading :level="2" size="sm">{{ item.name }}</UiHeading>
            <UiText size="sm" tone="low" class="mt-1">
              {{ item.note }}
            </UiText>
          </span>
          <span class="shrink-0 text-right">
            <UiText as="span" size="lg" weight="bold">
              {{ formatPounds(item.pricePence) }}
            </UiText>
            <UiText as="span" size="xs" tone="low" class="block">
              per {{ formatChargeUnit(item.unit) }}
            </UiText>
          </span>
        </div>
      </UiCard>
    </div>

    <template #cta>
      <UiButton href="/quote/" size="lg">Add these in quote</UiButton>
      <UiButton href="/additional-charges/" variant="secondary" size="lg">
        View all extra charges
      </UiButton>
    </template>
  </UiSection>

  <UiSection tone="background" spacing="md" wide>
    <UiSkipComparison
      lead="Compare"
      accent="collection"
      trailing="options"
      :subhead="`${companyDetails.tradingName} is the loaded collection option on this site. Skip hire and council bulky waste are shown as alternatives so you can compare the trade-offs quickly.`"
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
        class="rounded-lg border border-border bg-secondary p-6 text-secondary-foreground shadow-[0_1rem_3rem_rgb(var(--shadow-color)/0.12)]"
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
