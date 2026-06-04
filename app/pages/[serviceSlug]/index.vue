<script setup lang="ts">
const route = useRoute();
const serviceSlug = route.params.serviceSlug as string;
const service = getSeoServiceBySlug(serviceSlug);

if (!service) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

const servicePath = buildServicePath(service);
const serviceAreaNames = seoLocations.map((location) => location.name);
const serviceHubTitle = `${service.metaTitle} Services in West London`;
const serviceHubDescription = `${service.metaDescription} Available across London, West London and nearby service areas.`;
const serviceFaqs = buildServiceFaqs(service);

usePageSeo({
  title: serviceHubTitle,
  description: serviceHubDescription,
  path: servicePath,
  image: service.image,
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${servicePath}#service`,
      name: service.name,
      description: service.description,
      url: servicePath,
      image: service.image.src,
      provider: {
        "@type": "LocalBusiness",
        "@id": "/#business",
        name: companyDetails.tradingName,
      },
      areaServed: seoLocations.map((location) => ({
        "@type": "Place",
        name: location.name,
      })),
      serviceType: service.name,
      offers: {
        "@type": "Offer",
        price: "40",
        priceCurrency: "GBP",
        url: "/quote/",
        availability: "https://schema.org/InStock",
      },
    },
    buildFaqStructuredData(serviceFaqs, `${servicePath}#faq`),
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
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: servicePath,
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
  .filter((item) => item.slug !== service.slug)
  .map((item) => ({
    title: item.name,
    description: item.shortDescription,
    href: buildServicePath(item),
    image: item.image,
    meta: item.searchTerms[0],
    highlights: item.sellingPoints.slice(0, 2),
  }));

const locationLinks = seoLocations.map((location) => ({
  label: location.name,
  href: buildServiceLocationPath(service, location),
}));

const marqueeItems = [
  ...service.sellingPoints,
  ...service.searchTerms,
  "West London coverage",
];

const coverageNotes = [
  `Available across ${serviceAreaNames.join(", ")}.`,
  "Share photos, access notes and parking details for an accurate quote.",
  "The crew confirms the final load size before removing anything.",
];

const trustItems = [
  { value: "Fixed tiers", label: "Pricing" },
  { value: "2-hour", label: "Arrival windows" },
  { value: "Photos", label: "Fast estimates" },
];

const workerSrcset =
  "/images/waste-removal-service-worker-640.webp 640w, /images/waste-removal-service-worker-960.webp 960w, /images/waste-removal-service-worker.webp 1200w";
</script>

<template>
  <UiSection tone="background" spacing="md" alignment="left" wide>
    <UiHero
      :heading="`${service.title} in West London`"
      :description="service.description"
    >
      <template #actions>
        <UiButton size="lg" @click="openBookingWizard">Get a quote</UiButton>
        <UiButton href="/services/" variant="ghost" size="lg">
          See all services
          <template #iconRight>
            <IconsChevronRight />
          </template>
        </UiButton>
      </template>
      <template #visual>
        <img
          :src="service.image.src"
          :alt="service.image.alt"
          :width="service.image.width"
          :height="service.image.height"
          :srcset="service.image.srcset"
          :sizes="service.image.sizes"
          fetchpriority="high"
          decoding="async"
          class="aspect-video w-full rounded-lg border border-border object-cover shadow-[0_1rem_3rem_rgb(var(--shadow-color)/0.16)]"
        />
      </template>
    </UiHero>
    <UiTrustStrip :items="trustItems" class="mt-8 max-w-3xl" />
  </UiSection>

  <UiMarquee tone="primary" :items="marqueeItems" />

  <UiSection
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
      <UiButton href="/pricing/" variant="secondary" size="lg">
        See full pricing
      </UiButton>
    </template>
  </UiSection>

  <UiSection tone="secondary" spacing="md" wide>
    <UiServiceCoverage
      :heading="`What we remove for ${service.name.toLowerCase()}`"
      :description="service.shortDescription"
      :items="service.typicalItems"
      :notes="coverageNotes"
      :image="service.image"
      meta-label="Service area"
      meta-value="West London"
    />
  </UiSection>

  <UiSection tone="background" spacing="md" alignment="center" wide>
    <UiServiceProcess
      eyebrow="How it works"
      :heading="`${service.name} without hiring a skip`"
      description="A simple collection flow for West London homes, landlords and businesses."
      :steps="serviceProcessSteps"
    />
  </UiSection>

  <UiSection
    tone="background"
    spacing="md"
    alignment="left"
    :title="`${service.name} details`"
  >
    <UiText size="lg" tone="low" class="max-w-3xl">
      {{ service.shortDescription }} {{ companyDetails.tradingName }} covers
      this service across West London, including
      {{ serviceAreaNames.join(", ") }}.
    </UiText>
    <UiTickList :items="service.sellingPoints" />
    <template #visual>
      <div
        class="rounded-lg border border-border bg-primary p-6 text-primary-foreground shadow-[0_1rem_3rem_rgb(var(--shadow-color)/0.12)]"
      >
        <UiHeading :level="3" size="md">Useful before booking</UiHeading>
        <UiText tone="low" class="mt-2">
          Photos, access notes and parking details help the team quote the job
          accurately before arriving.
        </UiText>
        <div class="mt-5 grid gap-3">
          <UiCard
            v-for="term in service.searchTerms"
            :key="term"
            :title="term"
            size="sm"
          />
        </div>
      </div>
    </template>
  </UiSection>

  <UiSection
    tone="secondary"
    spacing="md"
    alignment="center"
    title="Common questions"
  >
    <UiFaq :items="serviceFaqs" />
  </UiSection>

  <UiSection
    v-if="relatedServices.length"
    tone="background"
    spacing="md"
    alignment="center"
    wide
  >
    <UiServices
      heading="Other clearance services"
      description="Other rubbish removal options available across West London."
      :services="relatedServices"
      :locations="locationLinks"
      location-label="Available in"
      cta-label="View service"
    />
  </UiSection>

  <UiSection tone="secondary" spacing="md">
    <UiCallToAction
      :heading="`Book ${service.name.toLowerCase()} in West London`"
      :points="service.sellingPoints"
      image-src="/images/waste-removal-service-worker.webp"
      image-width="1200"
      image-height="800"
      :image-srcset="workerSrcset"
      image-sizes="(min-width: 1024px) 20rem, calc(100vw - 96px)"
      :image-alt="service.image.alt"
    >
      <template #cta>
        <UiButton size="lg" variant="secondary" @click="openBookingWizard">
          Get a quote
        </UiButton>
      </template>
    </UiCallToAction>
  </UiSection>
</template>
