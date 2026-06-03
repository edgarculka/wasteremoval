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
    <div class="w-full overflow-hidden rounded-lg border border-border bg-background">
      <article
        v-for="item in additionalChargeItems"
        :key="item.id"
        class="grid grid-cols-[5.5rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-border p-3 text-foreground last:border-b-0 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:gap-5 sm:p-4"
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
          class="aspect-square w-full rounded-lg object-cover"
        />
        <div class="min-w-0">
          <UiText as="p" size="xs" tone="low" weight="semibold">
            {{ item.category }}
          </UiText>
          <UiHeading :level="2" size="sm" class="mt-1">
            {{ item.name }}
          </UiHeading>
          <UiText size="sm" tone="low">
            {{ item.note }}
          </UiText>
        </div>
        <div class="shrink-0 text-right">
          <UiText as="p" size="lg" weight="bold">
            {{ formatPounds(item.pricePence) }}
          </UiText>
          <UiText as="p" size="xs" tone="low">
            per {{ formatChargeUnit(item.unit) }}
          </UiText>
        </div>
      </article>
    </div>
  </UiSection>

  <UiSection id="faq" tone="primary" spacing="md" title="Additional charge FAQs">
    <UiFaq :items="chargeFaqs" />
  </UiSection>
</template>
