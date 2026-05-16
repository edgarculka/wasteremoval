<script setup lang="ts">
import type { PricingTier } from "~/components/ui/Pricing.vue";

const selectedTierId = ref<string | null>("small");

const tiers: PricingTier[] = [
  {
    id: "min",
    ribbon: "Single item",
    name: "Min Job",
    price: "£40",
    imageSrc: "/images/0van.svg",
    imageAlt: "Single item",
  },
  {
    id: "mini",
    ribbon: "1/4 van",
    name: "Mini Load",
    price: "£100",
    imageSrc: "/images/1van.svg",
    imageAlt: "Quarter-load van",
  },
  {
    id: "small",
    ribbon: "1/2 van",
    name: "Small Load",
    price: "£180",
    tag: "Most popular",
    imageSrc: "/images/2van.svg",
    imageAlt: "Half-load van",
  },
  {
    id: "large",
    ribbon: "3/4 van",
    name: "Large Load",
    price: "£240",
    imageSrc: "/images/3van.svg",
    imageAlt: "Three-quarter-load van",
  },
  {
    id: "full",
    ribbon: "Full van",
    name: "Full Load",
    price: "£300",
    imageSrc: "/images/4van.svg",
    imageAlt: "Full-load van",
  },
];
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Pricing</UiHeading>
      <UiText tone="low" class="mt-3">
        Content component for pricing tier comparisons. Headline with an
        accent-coloured price phrase plus a row of shared
        <code>UiCard</code> option cards. <code>UiPricing</code> is content — always
        wrap it in a <code>UiSection</code> (use <code>wide</code> for the
        5-column grid). The Section owns tone, spacing, alignment, and any
        ribbon.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default (background tone)</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" alignment="center" wide>
          <UiPricing
            lead="From"
            accent="£40"
            trailing="per clearance"
            subhead="with no hidden fees"
            :tiers="tiers"
          />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Card</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        The same <code>UiCard layout="option"</code> shape used by booking load
        choices, with optional tag support.
      </UiText>
      <div class="mt-4 grid max-w-3xl gap-4 sm:grid-cols-3">
        <UiCard
          layout="option"
          title="Mini Load"
          description="1/4 van"
          price="£100"
        />
        <UiCard
          layout="option"
          title="Small Load"
          description="1/2 van"
          price="£180"
          tag="Most popular"
        />
        <UiCard
          layout="option"
          title="Full Load"
          description="Full van"
          price="£300"
        />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Selectable</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Set <code>selectable</code>, bind <code>selectedTierId</code>, and
        listen for <code>select</code> to reuse the same selectable
        <code>UiCard</code> load choices as the booking wizard.
      </UiText>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" alignment="center" wide>
          <UiPricing
            lead="Select"
            accent="a load"
            trailing="before booking"
            selectable
            :tiers="tiers"
            :selected-tier-id="selectedTierId"
            @select="selectedTierId = $event"
          />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Tones</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        The Section's <code>tone</code> drives the surface — pricing content
        adapts via <code>currentColor</code>.
      </UiText>
      <div class="mt-4 space-y-6">
        <div class="overflow-hidden rounded-md border border-border">
          <UiSection tone="secondary" spacing="md" alignment="center" wide>
            <UiPricing
              lead="From"
              accent="£40"
              trailing="per clearance"
              :tiers="tiers"
            />
          </UiSection>
        </div>
        <div class="overflow-hidden rounded-md border border-border">
          <UiSection tone="dark" spacing="md" alignment="center" wide>
            <UiPricing
              lead="Pricing starts"
              accent="from £40"
              subhead="with no hidden fees"
              :tiers="tiers"
            />
          </UiSection>
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">With ribbon</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Because <code>UiPricing</code> goes inside <code>UiSection</code>, the
        section's <code>ribbon</code> prop becomes a transition CTA that
        overhangs the top of the pricing block. Wrapper below uses extra top
        padding so the overhang stays visible inside the demo card.
      </UiText>
      <div class="mt-4 pt-8">
        <div class="overflow-visible rounded-md border border-border">
          <UiSection
            tone="background"
            spacing="md"
            alignment="center"
            wide
            :ribbon="{ label: 'See how we stack up', href: '#' }"
          >
            <UiPricing
              lead="From"
              accent="£40"
              trailing="per clearance"
              subhead="with no hidden fees"
              :tiers="tiers"
            />
          </UiSection>
        </div>
      </div>
    </section>
  </div>
</template>
