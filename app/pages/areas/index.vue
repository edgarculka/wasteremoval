<script setup lang="ts">
import type { ServicesService } from "~/components/ui/Services.vue";

const primaryImage = seoLocations[0]?.image;
const areaCards = seoLocations.map((location) => ({
  title: location.metaTitle,
  description: location.shortDescription,
  href: buildAreaPath(location),
  meta: location.region,
  notes: location.serviceNotes,
}));

const services: ServicesService[] = seoServices.map((service) => ({
  title: service.name,
  description: service.shortDescription,
  href: buildServicePath(service),
  image: service.image,
  meta: service.searchTerms[0],
  highlights: service.sellingPoints.slice(0, 2),
}));

usePageSeo({
  title: "Waste Removal Areas in London",
  description: `Find rubbish removal and clearance service areas for ${companyDetails.tradingName} across West, Central, North and South London.`,
  path: "/areas/",
  image: primaryImage,
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "/areas/#collection",
      name: "Waste Removal Areas",
      url: "/areas/",
      description: `Service area pages for ${companyDetails.tradingName} rubbish removal and property clearance.`,
      hasPart: seoLocations.map((location) => ({
        "@type": "WebPage",
        name: location.metaTitle,
        url: buildAreaPath(location),
        about: {
          "@type": "Place",
          name: location.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: location.name,
            addressRegion: location.region,
            addressCountry: "GB",
          },
        },
      })),
    },
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
          name: "Areas",
          item: "/areas/",
        },
      ],
    },
  ],
});
</script>

<template>
  <UiSection tone="background" spacing="md" alignment="left" wide>
    <UiHero
      heading="Waste removal areas across West, Central, North and South London"
      description="Choose the area closest to your collection address, then view service pages for local house, tenancy, garden, office, garage, builders, furniture and mattress clearances."
    >
      <template #actions>
        <UiButton href="/quote/" size="lg">Get a quote</UiButton>
        <UiButton href="/services/" variant="ghost" size="lg">
          View services
          <template #iconRight>
            <IconsChevronRight />
          </template>
        </UiButton>
      </template>
      <template v-if="primaryImage" #visual>
        <img
          :src="primaryImage.src"
          :alt="primaryImage.alt"
          :width="primaryImage.width"
          :height="primaryImage.height"
          :srcset="primaryImage.srcset"
          :sizes="primaryImage.sizes"
          fetchpriority="high"
          decoding="async"
          class="aspect-video w-full rounded-lg border border-border object-cover shadow-[0_1rem_3rem_rgb(var(--shadow-color)/0.16)]"
        />
      </template>
    </UiHero>
  </UiSection>

  <UiSection
    tone="secondary"
    spacing="md"
    alignment="center"
    wide
    title="Service areas"
  >
    <div class="grid w-full gap-4 md:grid-cols-2">
      <UiCard
        v-for="area in areaCards"
        :key="area.href"
      >
        <article class="flex h-full flex-col gap-4">
          <div>
            <UiText size="xs" weight="bold" tone="primary">
              {{ area.meta }}
            </UiText>
            <UiHeading :level="3" size="sm" class="mt-2">
              {{ area.title }}
            </UiHeading>
            <UiText size="sm" tone="low" class="mt-2">
              {{ area.description }}
            </UiText>
          </div>
          <UiTickList :items="area.notes" />
          <UiButton
            :href="area.href"
            variant="ghost"
            size="sm"
            class="mt-auto w-full sm:w-fit"
          >
            View area page
            <template #iconRight>
              <IconsChevronRight />
            </template>
          </UiButton>
        </article>
      </UiCard>
    </div>
  </UiSection>

  <UiSection tone="background" spacing="md" alignment="center" wide>
    <UiServices
      heading="Services available across these areas"
      description="Each service has a local page with access notes, nearby areas and practical collection details."
      :services="services"
      cta-label="View service hub"
    />
  </UiSection>
</template>
