<script setup lang="ts">
import type {
  SkipComparisonColumn,
  SkipComparisonFeature,
} from "~/components/ui/SkipComparison.vue";

const columns: SkipComparisonColumn[] = [
  {
    id: "waste-removal",
    title: "DBS Waste collection",
    label: "This website",
    featured: true,
  },
  {
    id: "skip-hire",
    title: "Hiring a skip",
    label: "Alternative",
  },
];

const features: SkipComparisonFeature[] = [
  {
    label: "Team loads everything",
    values: { "waste-removal": true, "skip-hire": false },
  },
  {
    label: "No skip permit needed",
    values: { "waste-removal": true, "skip-hire": false },
  },
  {
    label: "Works without driveway space",
    values: { "waste-removal": true, "skip-hire": false },
  },
  {
    label: "Short-notice options",
    values: { "waste-removal": "Where possible", "skip-hire": "Varies" },
  },
  {
    label: "No container left outside",
    values: { "waste-removal": true, "skip-hire": false },
  },
  {
    label: "Flexible load sizes",
    values: { "waste-removal": "Pay for volume", "skip-hire": "Fixed skip size" },
  },
  {
    label: "Help with bulky items",
    values: { "waste-removal": true, "skip-hire": false },
  },
  {
    label: "Licensed disposal included",
    values: { "waste-removal": true, "skip-hire": true },
  },
];
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Skip comparison</UiHeading>
      <UiText tone="low" class="mt-3">
        Content component for comparing waste removal against skip hire.
        <code>UiSkipComparison</code> is content, so wrap it in a
        <code>UiSection</code>; the Section owns tone, spacing, alignment, and
        width.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" wide>
          <UiSkipComparison
            lead="Compare"
            accent="clearance"
            trailing="options"
            subhead="Skips can suit building sites, but domestic clearances are usually easier when a licensed team collects, loads, and leaves the space clear."
            cta-label="Book a collection"
            cta-href="/"
            :columns="columns"
            :features="features"
          />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Secondary tone</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="secondary" spacing="md" wide>
          <UiSkipComparison
            lead="Why choose"
            accent="collection"
            trailing="instead?"
            subhead="A comparison layout with the same props on another Section tone."
            cta-label="Book a collection"
            cta-href="/"
            :columns="columns"
            :features="features"
          />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Compact</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" wide>
          <UiSkipComparison
            lead="Simple"
            accent="feature"
            trailing="table"
            :columns="columns"
            :features="features.slice(0, 5)"
          />
        </UiSection>
      </div>
    </section>
  </div>
</template>
