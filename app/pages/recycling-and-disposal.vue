<script setup lang="ts">
const disposalPath = "/recycling-and-disposal/";

usePageSeo({
  title: "Responsible Waste Disposal",
  description:
    "How DBS Waste handles rubbish removal loads, restricted items, reusable material, disposal paperwork and responsible collection records.",
  path: disposalPath,
  image: {
    src: "/images/truck.webp",
    alt: "DBS Waste rubbish removal truck used for responsible collections",
    width: 1200,
    height: 900,
    srcset:
      "/images/truck-640.webp 640w, /images/truck-960.webp 960w, /images/truck.webp 1200w",
    sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
  },
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${disposalPath}#webpage`,
      name: "Responsible Waste Disposal",
      url: disposalPath,
      description:
        "How DBS Waste handles rubbish removal loads, restricted items, reusable material, disposal paperwork and responsible collection records.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "/#website",
        name: companyDetails.tradingName,
        url: "/",
      },
      about: {
        "@type": "Service",
        name: "Waste disposal handling",
        provider: {
          "@type": "LocalBusiness",
          "@id": "/#business",
          name: companyDetails.tradingName,
        },
      },
    },
    buildFaqStructuredData(disposalFaqs, `${disposalPath}#faq`),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Responsible disposal",
          item: disposalPath,
        },
      ],
    },
  ],
});

const disposalHighlights = [
  "Photos and waste type checked before booking",
  "Restricted materials flagged before loading",
  "Reusable and recyclable material separated where practical",
  "Disposal paperwork available on request where suitable",
];

const truckImage = {
  src: "/images/truck.webp",
  alt: "Rubbish removal truck used for DBS Waste collections",
  width: 1200,
  height: 900,
  srcset:
    "/images/truck-640.webp 640w, /images/truck-960.webp 960w, /images/truck.webp 1200w",
  sizes: "(min-width: 1024px) 50vw, calc(100vw - 48px)",
};
</script>

<template>
  <UiSection tone="background" spacing="md" alignment="left">
    <UiHero
      heading="Responsible waste disposal"
      description="Clearance work is not only about loading a van. The waste type, access, restricted materials and disposal records need to be understood before the job starts."
    >
      <template #actions>
        <UiButton href="/quote/" size="lg">Get a quote</UiButton>
        <UiButton href="/pricing/" variant="ghost" size="lg">
          View pricing
          <template #iconRight>
            <span aria-hidden="true">&gt;</span>
          </template>
        </UiButton>
      </template>
    </UiHero>

    <UiTrustStrip :items="[
      { value: 'Photos', label: 'Checked first' },
      { value: 'Records', label: 'On request' },
      { value: 'Restricted', label: 'Flagged early' },
    ]" class="mt-8 max-w-3xl" />

    <template #visual>
      <img
        :src="truckImage.src"
        :alt="truckImage.alt"
        :width="truckImage.width"
        :height="truckImage.height"
        :srcset="truckImage.srcset"
        :sizes="truckImage.sizes"
        fetchpriority="high"
        decoding="async"
        class="aspect-video w-full rounded-lg border border-border object-cover shadow-[0_1rem_3rem_rgba(6,53,31,0.16)]"
      />
    </template>
  </UiSection>

  <UiSection tone="secondary" spacing="md" wide>
    <UiServiceCoverage
      heading="What responsible handling means"
      description="The collection process is designed to make the load clear before arrival and avoid mixing standard waste with materials that need specialist handling."
      :items="disposalHighlights"
      :notes="disposalSteps.map((step) => `${step.title}: ${step.description}`)"
      :image="truckImage"
      meta-label="Process"
      meta-value="Checked before loading"
    />
  </UiSection>

  <UiSection
    tone="background"
    spacing="md"
    alignment="center"
    wide
    title="Restricted materials to flag early"
  >
    <UiText size="lg" tone="low" class="max-w-3xl">
      Standard household and business clearances are straightforward when the
      waste is described accurately. These materials should be raised before
      booking because they may need specialist handling or separate disposal.
    </UiText>
    <div class="grid w-full gap-4 md:grid-cols-2">
      <UiCard
        v-for="item in restrictedItems"
        :key="item.title"
        :title="item.title"
        :description="item.description"
      />
    </div>
  </UiSection>

  <UiSection
    tone="primary"
    spacing="md"
    alignment="left"
    title="Before you book"
  >
    <UiText size="lg" tone="low" class="max-w-3xl">
      Send photos of the load, note any liquids or chemicals, and explain access
      restrictions such as stairs, basements, controlled parking or rear-garden
      access. This helps the team price the collection correctly and identify
      any item that should not be mixed with a standard load.
    </UiText>
    <UiTickList :items="disposalHighlights" />
    <template #visual>
      <div
        class="rounded-lg border border-border bg-secondary p-6 text-secondary-foreground shadow-[0_1rem_3rem_rgba(6,53,31,0.12)]"
      >
        <UiHeading :level="3" size="md">Need collection records?</UiHeading>
        <UiText tone="low" class="mt-2">
          Ask before booking if you need paperwork for a landlord, managing
          agent, business or property-management file.
        </UiText>
        <div class="mt-5 flex flex-wrap gap-3">
          <UiButton href="/quote/" size="sm">Start quote</UiButton>
          <UiButton href="/services/" variant="secondary" size="sm">
            View services
          </UiButton>
        </div>
      </div>
    </template>
  </UiSection>

  <UiSection
    tone="secondary"
    spacing="md"
    alignment="center"
    title="Disposal questions"
  >
    <UiFaq :items="disposalFaqs" />
  </UiSection>
</template>
