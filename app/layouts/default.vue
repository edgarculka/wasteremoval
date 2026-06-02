<script setup lang="ts">
const selectedLocation = useSelectedSeoLocation();

const headerNav = computed(() => [
  {
    label: "Services",
    href: "/services",
    children: seoServices.map((service) => ({
      label: service.name,
      href: buildServiceLocationPath(service, selectedLocation.value),
    })),
  },
  { label: "Pricing", href: "/pricing" },
]);

const { openBookingWizard } = useBookingWizard();
</script>

<template>
  <div class="flex flex-1 flex-col">
    <UiHeader :nav="headerNav" phone="020 1234 5678" @cta="openBookingWizard" />
    <slot />
  </div>
</template>
