<script setup lang="ts">
const selectedLocation = useSelectedSeoLocation();
const route = useRoute();
const showHeader = computed(() => !route.path.startsWith("/quote"));

const headerNav = computed(() => [
  {
    label: "Services",
    href: "/services",
    children: seoServices.map((service) => ({
      label: service.name,
      href: buildServiceLocationPath(service, selectedLocation.value),
      description: service.shortDescription,
      image: {
        src: service.image.src,
        alt: service.image.alt,
      },
    })),
  },
  { label: "Pricing", href: "/pricing" },
]);

const { openBookingWizard } = useBookingWizard();
</script>

<template>
  <div class="flex flex-1 flex-col">
    <UiHeader
      v-if="showHeader"
      :nav="headerNav"
      phone="020 1234 5678"
      @cta="openBookingWizard"
    />
    <slot />
  </div>
</template>
