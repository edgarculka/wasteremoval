<script setup lang="ts">
const chargeFaqs = [
  {
    question: "Why do some items cost extra?",
    answer:
      "Some items need separate disposal routes, extra handling or specialist processing. Mattresses, fridges, tyres, paint, pressurised containers and upholstered seating are the common examples.",
  },
  {
    question: "Are these prices added to the load-size price?",
    answer:
      "Yes. The load-size price covers standard mixed waste volume. Any selected specialist item is added to that estimate so the quote request is clearer before collection.",
  },
  {
    question: "What if my item is not listed?",
    answer:
      "Send photos before booking. The team will confirm whether the item can go in a standard load, needs a specialist charge or requires a separate disposal route.",
  },
  {
    question: "Can upholstered sofas and chairs be mixed with normal waste?",
    answer:
      "Waste upholstered domestic seating may contain POPs and is handled separately. It should be declared before collection so the correct disposal route can be planned.",
  },
];

const visibleSources = additionalChargeSources.map((source) => ({
  ...source,
  host: new URL(source.href).hostname.replace(/^www\./, ""),
}));

usePageSeo({
  title: "Additional Waste Disposal Charges",
  description:
    "Exact additional disposal charges for mattresses, tyres, fridges, paint, gas bottles, WEEE appliances and upholstered furniture collections in London.",
  path: "/additional-charges/",
  image: {
    src: "/images/additional-charges/mattress.webp",
    alt: "Mattress ready for specialist waste collection",
    width: 960,
    height: 720,
  },
  structuredData: [
    buildFaqStructuredData(chargeFaqs, "/additional-charges/#faq"),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": "/additional-charges/#charges",
      name: "Additional waste disposal charges",
      itemListElement: additionalChargeItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        description: `${formatPounds(item.pricePence)} per ${formatChargeUnit(item.unit)}. ${item.note}`,
      })),
    },
  ],
});
</script>

<template>
  <UiSection
    tone="background"
    spacing="md"
    alignment="left"
    wide
  >
    <UiHeading :level="1" size="lg">Additional disposal charges</UiHeading>
    <UiText size="lg" tone="low" class="max-w-3xl">
      Standard rubbish removal is priced by load size. These items can add a
      separate disposal charge because they need specialist handling, WEEE
      routing, POPs treatment, tyre recycling or separate disposal paperwork.
    </UiText>
    <template #cta>
      <UiButton href="/quote/" size="lg">Start quote</UiButton>
      <UiButton href="#charge-list" variant="secondary" size="lg">
        View item prices
      </UiButton>
    </template>
  </UiSection>

  <UiSection id="charge-list" tone="secondary" spacing="md" wide>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="item in additionalChargeItems"
        :key="item.id"
        class="overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-[0_0.75rem_2rem_rgba(6,53,31,0.08)]"
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
          class="aspect-[4/3] w-full object-cover"
        />
        <div class="grid gap-3 p-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <UiText as="p" size="xs" tone="low" weight="semibold">
                {{ item.category }}
              </UiText>
              <UiHeading :level="2" size="sm" class="mt-1">
                {{ item.name }}
              </UiHeading>
            </div>
            <div class="shrink-0 text-right">
              <UiText as="p" size="lg" weight="bold">
                {{ formatPounds(item.pricePence) }}
              </UiText>
              <UiText as="p" size="xs" tone="low">
                per {{ formatChargeUnit(item.unit) }}
              </UiText>
            </div>
          </div>
          <UiText size="sm" tone="low">
            {{ item.note }}
          </UiText>
        </div>
      </article>
    </div>
  </UiSection>

  <UiSection tone="background" spacing="md" wide>
    <div
      class="overflow-hidden rounded-lg border border-border bg-secondary text-secondary-foreground shadow-[0_0.75rem_2rem_rgba(6,53,31,0.08)]"
    >
      <div class="border-b border-border p-5 sm:p-6">
        <UiHeading :level="2" size="md">Price research sources</UiHeading>
        <UiText tone="low" class="mt-2">
          These DBS Waste quote add-ons are based on published London waste
          removal and skip-hire surcharge lists, with specialist handling
          guidance checked against GOV.UK where relevant.
        </UiText>
      </div>
      <div class="grid divide-y divide-border">
        <a
          v-for="source in visibleSources"
          :key="source.href"
          :href="source.href"
          class="grid gap-2 p-5 text-foreground transition hover:bg-primary/20 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <UiText as="span" weight="bold" class="block">
              {{ source.name }}
            </UiText>
            <UiText as="span" size="sm" tone="low" class="block">
              {{ source.note }}
            </UiText>
          </span>
          <UiText as="span" size="sm" weight="semibold">
            {{ source.host }}
          </UiText>
        </a>
      </div>
    </div>
  </UiSection>

  <UiSection id="faq" tone="primary" spacing="md" title="Additional charge FAQs">
    <UiFaq :items="chargeFaqs" />
  </UiSection>
</template>
