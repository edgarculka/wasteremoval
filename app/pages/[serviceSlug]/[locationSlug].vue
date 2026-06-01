<script setup lang="ts">
const route = useRoute();
const serviceSlug = route.params.serviceSlug as string;
const locationSlug = route.params.locationSlug as string;

const page = getServiceLocationSeoPage(serviceSlug, locationSlug);

if (!page) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

usePageSeo({
  title: page.metaTitle,
  description: page.metaDescription,
  path: page.path,
  image: page.image,
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      description: page.description,
      provider: {
        "@type": "LocalBusiness",
        name: companyDetails.tradingName,
      },
      areaServed: {
        "@type": "Place",
        name: page.location.name,
      },
      serviceType: page.service.name,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.service.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
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
          name: "Services",
          item: "/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: page.title,
          item: page.path,
        },
      ],
    },
  ],
});

const { openBookingWizard } = useBookingWizard();

const relatedServices = seoServices
  .filter((service) => service.slug !== page.service.slug)
  .map((service) => ({
    title: service.name,
    description: service.shortDescription,
    href: buildServiceLocationPath(service, page.location),
    image: service.image,
    meta: service.searchTerms[0],
    highlights: service.sellingPoints.slice(0, 2),
  }));

const locationLinks = seoLocations.map((location) => ({
  label: location.name,
  href: buildServiceLocationPath(page.service, location),
}));
</script>

<template>
  <UiSection v-if="page" tone="background" spacing="md" alignment="left">
    <UiHero :heading="page.heading" :description="page.description">
      <template #actions>
        <UiButton size="lg" @click="openBookingWizard">Get a quote</UiButton>
        <UiButton href="/services" variant="ghost" size="lg">
          See all services
          <template #iconRight>
            <span aria-hidden="true">&gt;</span>
          </template>
        </UiButton>
      </template>
    </UiHero>
    <template #visual>
      <img
        :src="page.image.src"
        :alt="page.image.alt"
        class="aspect-video w-full rounded-2xl border-2 border-foreground object-cover shadow-[0.5rem_0.5rem_0_0_var(--foreground)]"
      />
    </template>
  </UiSection>

  <UiMarquee v-if="page" tone="primary" :items="page.service.sellingPoints" />

  <UiSection
    v-if="page"
    tone="secondary"
    spacing="md"
    alignment="center"
    wide
    :title="`What we remove in ${page.location.name}`"
  >
    <UiText size="lg" tone="low" class="max-w-3xl">
      {{ page.service.shortDescription }}
    </UiText>
    <div class="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UiCard
        v-for="item in page.service.typicalItems"
        :key="item"
        :title="item"
        size="sm"
      />
    </div>
  </UiSection>

  <UiSection
    v-if="page"
    tone="background"
    spacing="md"
    alignment="left"
    wide
    :title="`Why ${page.location.name}`"
  >
    <UiText size="sm" weight="medium" tone="primary">
      {{ page.location.region }} - {{ page.location.county }}
    </UiText>
    <UiText size="lg" tone="low" class="max-w-2xl">
      {{ page.location.description }}
    </UiText>
    <div class="grid w-full gap-4 md:grid-cols-2">
      <UiCard
        v-for="note in page.location.serviceNotes"
        :key="note"
        :description="note"
      />
    </div>
    <UiCard class="max-w-3xl" size="sm">
      <UiText size="sm" tone="low">Nearby areas covered</UiText>
      <UiText weight="semibold" class="mt-1">
        {{ page.location.nearbyAreas.join(", ") }}
      </UiText>
    </UiCard>
  </UiSection>

  <UiSection
    v-if="page"
    tone="secondary"
    spacing="md"
    alignment="center"
    title="Common questions"
  >
    <UiFaq :items="page.service.faqs" />
  </UiSection>

  <UiSection
    v-if="page && relatedServices.length"
    tone="background"
    spacing="md"
    alignment="center"
    wide
  >
    <UiServices
      heading="Other clearance services"
      :description="`More rubbish removal options available in ${page.location.name}.`"
      :services="relatedServices"
      :locations="locationLinks"
      location-label="Also available in"
      cta-label="View local page"
    />
  </UiSection>

  <UiSection v-if="page" tone="secondary" spacing="md">
    <UiCallToAction
      :heading="`Book ${page.service.name.toLowerCase()} in ${page.location.name}`"
      :points="page.service.sellingPoints"
      :image-src="'/images/waste-removal-service-worker.png'"
      :image-alt="page.image.alt"
    >
      <template #cta>
        <UiButton size="lg" variant="secondary" @click="openBookingWizard"
          >Get a quote</UiButton
        >
      </template>
    </UiCallToAction>
  </UiSection>
</template>
