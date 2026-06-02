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
  title: "Waste Removal Areas in West London",
  description:
    "Find rubbish removal and clearance service areas for DBS Waste across London, Brentford, Chiswick and Ealing.",
  path: "/areas/",
  image: primaryImage,
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "/areas/#collection",
      name: "Waste Removal Areas",
      url: "/areas/",
      description:
        "Service area pages for DBS Waste rubbish removal and property clearance.",
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
  <UiSection tone="background" spacing="md" alignment="left">
    <UiHero
      heading="Waste removal areas across West London"
      description="Choose the area closest to your collection address, then view service pages for local house clearance, tenancy clearance and garden waste removal."
    >
      <template #actions>
        <UiButton href="/quote/" size="lg">Get a quote</UiButton>
        <UiButton href="/services/" variant="ghost" size="lg">
          View services
          <template #iconRight>
            <span aria-hidden="true">&gt;</span>
          </template>
        </UiButton>
      </template>
    </UiHero>

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
        class="aspect-video w-full rounded-lg border border-border object-cover shadow-[0_1rem_3rem_rgba(6,53,31,0.16)]"
      />
    </template>
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
        :href="area.href"
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
          <UiText as="span" size="sm" weight="bold">
            View area page <span aria-hidden="true">&gt;</span>
          </UiText>
        </article>
      </UiCard>
    </div>
  </UiSection>

  <UiSection tone="background" spacing="md" alignment="center" wide>
    <UiServices
      heading="Services available across these areas"
      description="Each service has a dedicated local page for London, Brentford, Chiswick and Ealing."
      :services="services"
      cta-label="View service hub"
    />
  </UiSection>
</template>
