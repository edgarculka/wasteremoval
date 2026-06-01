<script setup lang="ts">
const primaryLocation = seoLocations[0];

const headerNav = [
  {
    label: "Services",
    href: "/services",
    children: seoServices.map((service) => ({
      label: service.name,
      href: primaryLocation
        ? buildServiceLocationPath(service, primaryLocation)
        : `/services#${service.slug}`,
    })),
  },
  { label: "Pricing", href: "/pricing" },
];

const { openBookingWizard } = useBookingWizard();
</script>

<template>
  <div class="flex flex-1 flex-col">
    <UiHeader :nav="headerNav" phone="020 1234 5678" @cta="openBookingWizard" />
    <slot />
  </div>
</template>
