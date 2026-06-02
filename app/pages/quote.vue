<script setup lang="ts">
const route = useRoute();
const { bookingLoads, bookingTimes, closeBookingWizard, submitBookingWizard } =
  useBookingWizard();

const initialLoadId = computed(() => {
  const load = route.query.load;

  if (typeof load !== "string") return null;

  return bookingLoads.some((item) => item.id === load) ? load : null;
});

function handleOpenChange(open: boolean) {
  if (!open) closeBookingWizard();
}

usePageSeo({
  title: "Get a Waste Removal Quote",
  description:
    "Get a fixed waste removal quote from DBS Waste. Choose your load size, collection date, arrival window and contact details.",
  path: "/quote/",
  image: {
    src: "/images/truck.webp",
    alt: "Rubbish removal truck for booked DBS Waste collections",
    width: 1200,
    height: 900,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "/quote/#webpage",
    name: "Get a Waste Removal Quote",
    url: "/quote/",
    description:
      "Get a fixed waste removal quote from DBS Waste by choosing a load size, collection date, arrival window and contact details.",
    isPartOf: {
      "@type": "WebSite",
      "@id": "/#website",
      name: companyDetails.tradingName,
      url: "/",
    },
    potentialAction: {
      "@type": "QuoteAction",
      target: "/quote/",
      name: "Request a waste removal quote",
      provider: {
        "@type": "LocalBusiness",
        "@id": "/#business",
        name: companyDetails.tradingName,
        telephone: companyDetails.contact.primaryPhone,
        areaServed: companyDetails.serviceAreas.map((area) => ({
          "@type": "Place",
          name: area,
        })),
      },
    },
  },
});
</script>

<template>
  <UiSection tone="background" spacing="sm" alignment="center">
    <UiHeading :level="1" size="lg">Get a Waste Removal Quote</UiHeading>
    <UiText size="lg" tone="low" class="mt-4 max-w-2xl">
      Choose the closest load size, pick a collection slot and share the
      collection details. The team confirms the final price before anything is
      removed.
    </UiText>
    <UiButton
      href="/recycling-and-disposal/"
      variant="secondary"
      size="sm"
      class="mt-6"
    >
      Check restricted items
    </UiButton>
  </UiSection>

  <UiBookingWizard
    :open="true"
    mode="page"
    :brand-name="companyDetails.tradingName"
    :loads="bookingLoads"
    :times="bookingTimes"
    :initial-load-id="initialLoadId"
    @update:open="handleOpenChange"
    @submit="submitBookingWizard"
  />
</template>
