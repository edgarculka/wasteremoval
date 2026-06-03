<script setup lang="ts">
import type { ServicesLocation, ServicesService } from "~/components/ui/Services.vue";

const route = useRoute();
const locationSlug = route.params.locationSlug as string;
const location = getSeoLocationBySlug(locationSlug);

if (!location) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

const areaPath = buildAreaPath(location);
const rememberSeoLocation = useRememberSeoLocation();

onMounted(() => {
  rememberSeoLocation(location);
});

const services: ServicesService[] = seoServices.map((service) => ({
  title: service.name,
  description: service.shortDescription,
  href: buildServiceLocationPath(service, location),
  image: service.image,
  meta: service.searchTerms[0],
  highlights: service.sellingPoints.slice(0, 2),
}));

const nearbyAreaLinks: ServicesLocation[] = seoLocations
  .filter((item) => item.slug !== location.slug)
  .map((item) => ({
    label: item.name,
    href: buildAreaPath(item),
  }));

const collectionNotes = [
  ...location.serviceNotes,
  ...location.accessNotes,
  `Nearby coverage includes ${location.nearbyAreas.join(", ")}.`,
];

const serviceItemList = seoServices.map((service, index) => ({
  "@type": "ListItem",
  position: index + 1,
  name: `${service.name} in ${location.name}`,
  url: buildServiceLocationPath(service, location),
}));

usePageSeo({
  title: location.metaTitle,
  description: location.metaDescription,
  path: areaPath,
  image: location.image,
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${areaPath}#area`,
      name: location.metaTitle,
      url: areaPath,
      description: location.description,
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
      hasPart: seoServices.map((service) => ({
        "@type": "Service",
        name: `${service.name} in ${location.name}`,
        url: buildServiceLocationPath(service, location),
        provider: {
          "@type": "LocalBusiness",
          "@id": "/#business",
          name: companyDetails.tradingName,
        },
        areaServed: {
          "@type": "Place",
          name: location.name,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${areaPath}#services`,
      name: `Waste removal services in ${location.name}`,
      itemListElement: serviceItemList,
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
        {
          "@type": "ListItem",
          position: 3,
          name: location.name,
          item: areaPath,
        },
      ],
    },
  ],
});
</script>

<template>
  <UiSection tone="background" spacing="md" alignment="left">
    <UiHero
      :heading="`Waste removal in ${location.name}`"
      :description="location.shortDescription"
    >
      <template #actions>
        <UiButton href="/quote/" size="lg">Get a quote</UiButton>
        <UiButton href="/areas/" variant="ghost" size="lg">
          All areas
          <template #iconRight>
            <IconsChevronRight />
          </template>
        </UiButton>
      </template>
    </UiHero>

    <template #visual>
      <img
        :src="location.image.src"
        :alt="location.image.alt"
        :width="location.image.width"
        :height="location.image.height"
        :srcset="location.image.srcset"
        :sizes="location.image.sizes"
        fetchpriority="high"
        decoding="async"
        class="aspect-video w-full rounded-lg border border-border object-cover shadow-[0_1rem_3rem_rgba(6,53,31,0.16)]"
      />
    </template>
  </UiSection>

  <UiMarquee
    tone="primary"
    :items="[...location.localSearchTerms, `${location.region} coverage`, ...location.propertyTypes]"
  />

  <UiSection tone="background" spacing="md" alignment="center" wide>
    <UiServices
      :heading="`Clearance services in ${location.name}`"
      :description="location.description"
      :services="services"
      :locations="nearbyAreaLinks"
      location-label="Nearby areas"
      cta-label="View local service"
    />
  </UiSection>

  <UiSection tone="secondary" spacing="md" wide>
    <UiServiceCoverage
      :heading="`Local collection notes for ${location.name}`"
      description="A few details help the team quote accurately and plan access before arrival."
      :items="location.propertyTypes"
      :notes="collectionNotes"
      :image="location.image"
      meta-label="Region"
      :meta-value="location.region"
    />
  </UiSection>

  <UiSection
    tone="background"
    spacing="md"
    alignment="left"
    :title="`How collections work in ${location.name}`"
  >
    <UiText size="lg" tone="low" class="max-w-3xl">
      Send photos of the waste, confirm where the items are stored, and include
      any access or parking notes. The crew confirms the final load size before
      removing items, so the quote is tied to the actual collection.
    </UiText>
    <UiTickList :items="location.accessNotes" />
    <template #visual>
      <div
        class="rounded-lg border border-border bg-primary p-6 text-primary-foreground shadow-[0_1rem_3rem_rgba(6,53,31,0.12)]"
      >
        <UiHeading :level="3" size="md">Common local searches</UiHeading>
        <div class="mt-5 grid gap-3">
          <UiCard
            v-for="term in location.localSearchTerms"
            :key="term"
            :title="term"
            size="sm"
          />
        </div>
      </div>
    </template>
  </UiSection>
</template>
