<script setup lang="ts">
const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
];

const route = useRoute();
const isFullscreenDesignSystem = computed(() =>
  route.path.startsWith("/design-system/fullscreen/"),
);

const serviceLinkGroups = computed(() =>
  seoServices.map((service) => ({
    heading: service.title,
    links: serviceLocationSeoPages
      .filter((page) => page.service.slug === service.slug)
      .map((page) => ({
        label: page.location.title,
        href: page.path,
      })),
  })),
);

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
    :service-groups="serviceLinkGroups"
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
