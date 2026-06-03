<script setup lang="ts">
const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Areas", href: "/areas/" },
  { label: "Disposal", href: "/recycling-and-disposal/" },
  { label: "Extra charges", href: "/additional-charges/" },
  { label: "Pricing", href: "/pricing/" },
];

const route = useRoute();
const selectedLocation = useSelectedSeoLocation();

const isFullscreenDesignSystem = computed(() =>
  route.path.startsWith("/design-system/fullscreen/"),
);

const showFooter = computed(
  () => !isFullscreenDesignSystem.value && !route.path.startsWith("/quote"),
);

const footerServiceLinks = computed(() =>
  seoServices.map((service) => ({
    label: service.title,
    href: buildServiceLocationPath(service, selectedLocation.value),
  })),
);

const footerLocationLinks = seoLocations.map((location) => ({
  label: location.title,
  href: buildAreaPath(location),
}));

useHead({
  titleTemplate: (title) =>
    title
      ? `${title} | ${companyDetails.tradingName}`
      : companyDetails.tradingName,
});

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UiFooter
    v-if="showFooter"
    :primary-links="primaryLinks"
    :service-links="footerServiceLinks"
    :location-links="footerLocationLinks"
    :selected-location-label="selectedLocation.title"
    :brand-name="companyDetails.tradingName"
  />
</template>
