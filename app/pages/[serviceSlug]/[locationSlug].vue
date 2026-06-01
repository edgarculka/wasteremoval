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

const { bookingLoads, openBookingWizard } = useBookingWizard();
const selectedPricingLoadId = ref<string | null>("small");

function openBookingWithPricingSelection() {
  openBookingWizard(selectedPricingLoadId.value);
}

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

const marqueeItems = [
  ...page.service.sellingPoints,
  ...page.location.localSearchTerms,
  `${page.location.region} coverage`,
];

const coverageNotes = [
  ...page.location.serviceNotes,
  `Nearby areas covered: ${page.location.nearbyAreas.join(", ")}`,
];
</script>

<template>
  <UiSection v-if="page" tone="background" spacing="md" alignment="left">
    <template #above>
      <UiRating :value="5">Rated 5 stars by West London customers</UiRating>
    </template>
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

  <UiMarquee v-if="page" tone="primary" :items="marqueeItems" />

  <UiSection
    v-if="page"
    tone="background"
    spacing="md"
    alignment="center"
    wide
    :ribbon="{ label: 'Clear pricing before loading' }"
  >
    <UiPricing
      lead="From"
      accent="GBP 40"
      trailing="per clearance"
      subhead="Choose the closest load size for your job. The final tier is confirmed before anything is removed."
      selectable
      :tiers="bookingLoads"
      :selected-tier-id="selectedPricingLoadId"
      @select="selectedPricingLoadId = $event"
    />

    <template #cta>
      <UiButton size="lg" @click="openBookingWithPricingSelection">
        Book selected load
      </UiButton>
      <UiButton href="/pricing" variant="secondary" size="lg">
        See full pricing
      </UiButton>
    </template>
  </UiSection>

  <UiSection
    v-if="page"
    tone="secondary"
    spacing="md"
    wide
  >
    <UiServiceCoverage
      :heading="`What we remove in ${page.location.name}`"
      :description="page.service.shortDescription"
      :items="page.service.typicalItems"
      :notes="coverageNotes"
      :image="page.image"
      :meta-label="page.location.region"
      :meta-value="page.location.county"
    />
  </UiSection>

  <UiSection
    v-if="page"
    tone="background"
    spacing="md"
    alignment="center"
    wide
  >
    <UiServiceProcess
      eyebrow="How it works"
      :heading="`${page.service.name} without skip hire delays`"
      :description="`A simple collection flow for ${page.location.name} homes, landlords and businesses.`"
      :steps="serviceProcessSteps"
    />
  </UiSection>

  <UiSection
    v-if="page"
    tone="secondary"
    spacing="md"
    alignment="center"
    wide
    class="border-y-2"
  >
    <UiReviews
      :average="4.9"
      :average-label="`Average rating for West London clearance work`"
      :reviews="servicePageReviews"
    />
  </UiSection>

  <UiSection
    v-if="page"
    tone="background"
    spacing="md"
    alignment="left"
    :title="`${page.location.name} collection details`"
  >
    <UiText size="lg" tone="low" class="max-w-3xl">
      {{ page.location.description }}
    </UiText>
    <UiTickList :items="page.service.sellingPoints" />
    <template #visual>
      <div
        class="rounded-2xl border-2 border-foreground bg-primary p-6 text-primary-foreground shadow-[0.5rem_0.5rem_0_0_var(--foreground)]"
      >
        <UiHeading :level="3" size="md">Useful before booking</UiHeading>
        <UiText tone="low" class="mt-2">
          Photos, access notes and parking details help the team quote the job
          accurately before arriving.
        </UiText>
        <div class="mt-5 grid gap-3">
          <UiCard
            v-for="term in page.service.searchTerms"
            :key="term"
            :title="term"
            size="sm"
          />
        </div>
      </div>
    </template>
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
