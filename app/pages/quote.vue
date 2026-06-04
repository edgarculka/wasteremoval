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
  description: `Get a waste removal quote from ${companyDetails.tradingName}. Choose your load size, preferred collection date, arrival window and contact details.`,
  path: "/quote/",
  image: {
    src: "/images/truck.webp",
    alt: `Rubbish removal truck for booked ${companyDetails.tradingName} collections`,
    width: 1200,
    height: 900,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "/quote/#webpage",
    name: "Get a Waste Removal Quote",
    url: "/quote/",
    description: `Get a waste removal quote from ${companyDetails.tradingName} by choosing a load size, preferred collection date, arrival window and contact details.`,
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
  <UiBookingWizard
    :open="true"
    mode="page"
    :heading-level="1"
    :brand-name="companyDetails.tradingName"
    :loads="bookingLoads"
    :times="bookingTimes"
    :initial-load-id="initialLoadId"
    @update:open="handleOpenChange"
    @submit="submitBookingWizard"
  />
</template>
