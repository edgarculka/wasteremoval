<script setup lang="ts">
import type { ServicesLocation, ServicesService } from "~/components/ui/Services.vue";

const services: ServicesService[] = seoServices.map((service) => ({
  title: service.name,
  description: service.shortDescription,
  href: buildServicePath(service),
  image: service.image,
  meta: service.searchTerms.join(", "),
  highlights: service.sellingPoints.slice(0, 2),
}));

const serviceJumpLinks: ServicesLocation[] = seoServices.map((service) => ({
  label: service.name,
  href: `#${service.slug}`,
}));

const serviceGroups = seoServices.map((service) => ({
  service,
  pages: serviceLocationSeoPages.filter(
    (page) => page.service.slug === service.slug,
  ),
}));

usePageSeo({
  title: "Waste Removal Services in London",
  description:
    "Browse rubbish removal and clearance services for homes, landlords and businesses across West, Central, North and South London.",
  path: "/services/",
  image: seoServices[0]?.image,
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "/services/#collection",
      name: "Waste Removal Services",
      url: "/services/",
      description:
        "Waste removal service pages for West, Central, North and South London homes, landlords and businesses.",
      hasPart: seoServices.map((service) => ({
        "@type": "Service",
        name: service.name,
        url: buildServicePath(service),
        description: service.shortDescription,
        areaServed: seoLocations.map((location) => location.name),
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
          name: "Services",
          item: "/services/",
        },
      ],
    },
  ],
});
</script>

<template>
  <UiSection tone="background" spacing="md" alignment="center" wide>
    <UiServices
      eyebrow="Services"
      :heading-level="1"
      heading="Waste removal services across West, Central, North and South London"
      description="Choose a clearance service, then pick the local area page that matches where the job is. Each page has service-specific details for that location."
      :services="services"
      :locations="serviceJumpLinks"
      location-label="Jump to service type"
      cta-label="View service"
    />
  </UiSection>

  <UiSection
    v-for="group in serviceGroups"
    :id="group.service.slug"
    :key="group.service.slug"
    tone="secondary"
    spacing="md"
    alignment="left"
    wide
    :title="group.service.name"
  >
    <UiText size="lg" tone="low" class="max-w-3xl">
      {{ group.service.description }}
    </UiText>

    <div class="grid w-full gap-4 md:grid-cols-3">
      <UiCard
        v-for="page in group.pages"
        :key="page.path"
        :href="page.path"
        :title="page.title"
        :description="page.metaDescription"
      />
    </div>
  </UiSection>
</template>
