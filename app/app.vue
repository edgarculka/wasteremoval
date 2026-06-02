<script setup lang="ts">
const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
];

const route = useRoute();
const selectedLocation = useSelectedSeoLocation();
const selectedService = computed(() => {
  const serviceSlug = route.params.serviceSlug;

  if (typeof serviceSlug === "string") {
    return getSeoServiceBySlug(serviceSlug) ?? seoServices[0];
  }

  return seoServices[0];
});

const isFullscreenDesignSystem = computed(() =>
  route.path.startsWith("/design-system/fullscreen/"),
);

const footerServiceLinks = computed(() =>
  seoServices.map((service) => ({
    label: service.title,
    href: buildServiceLocationPath(service, selectedLocation.value),
  })),
);

const footerLocationLinks = computed(() => {
  const service = selectedService.value ?? seoServices[0];

  return seoLocations.map((location) => ({
    label: location.title,
    href: service ? buildServiceLocationPath(service, location) : "/services",
  }));
});

useHead({
  titleTemplate: (title) =>
    title
      ? `${title} | ${companyDetails.tradingName}`
      : companyDetails.tradingName,
});

const {
  bookingWizardOpen,
  bookingWizardPreselectedLoadId,
  bookingLoads,
  bookingTimes,
  submitBookingWizard,
} = useBookingWizard();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UiFooter
    v-if="!isFullscreenDesignSystem"
    :primary-links="primaryLinks"
    :service-links="footerServiceLinks"
    :location-links="footerLocationLinks"
    :selected-location-label="selectedLocation.title"
    :brand-name="companyDetails.tradingName"
  />
  <UiBookingWizard
    v-if="!isFullscreenDesignSystem"
    v-model:open="bookingWizardOpen"
    brand-name="Big Van Men"
    :loads="bookingLoads"
    :times="bookingTimes"
    :initial-load-id="bookingWizardPreselectedLoadId"
    @submit="submitBookingWizard"
  />
</template>
